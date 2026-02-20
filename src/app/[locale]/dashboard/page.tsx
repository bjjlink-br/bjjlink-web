"use client"
import { useLocale, useTranslations } from "next-intl";
import { VerticalMenu } from "@/components/shared/VerticalMenu";
import { PromotionalBanner } from "./components/PromotionalBanner";
import { PortifolioCard } from "./components/PortifolioCard";
import { useEffect, useState } from "react";
import { AUTH_STORAGE_KEY, USER_DATA_STORAGE_KEY } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { useGetListPortifolio } from "@/hooks/usePortifolio";
import { PortfolioSkeleton } from "./components/PortfolioSkeleton";
import { Button } from "@/components/ui/button";
import { EmptyState } from "./components/EmptyState";
import { AccountStatus, UserAccountInfo } from "@/utils/types";

interface AxiosError {
    response?: {
        status?: number;
        data?: {
            statusCode?: number;
            message?: string;
        };
    };
}

export default function Dashboard() {
    const t = useTranslations("dashboard");
    const [user, setUser] = useState<UserAccountInfo>();
    const [acess_token, setAccessToken] = useState<string | null>(null);
    const router = useRouter();
    const locale = useLocale();
    
    const handleError = (error: Error | unknown) => {
        // Verifica se o erro é 401 (token expirado)
        if (error && typeof error === 'object' && 'response' in error) {
            const axiosError = error as AxiosError;
            if (axiosError.response?.status === 401 || 
                (axiosError.response?.data?.statusCode === 401 && axiosError.response?.data?.message === "Unauthorized")) {
                localStorage.removeItem(AUTH_STORAGE_KEY);
                
                toast({
                    title: "Sessão expirada",
                    description: "Sua sessão expirou. Faça login novamente.",
                    duration: 3000
                });
                
                router.push(`/${locale}/login`);
                return;
            }
        }
    };
    
    const { isError, isPending, data, error } = useGetListPortifolio(acess_token, locale);

    useEffect(() => {
        const userToken = localStorage.getItem(AUTH_STORAGE_KEY);
        const userData = localStorage.getItem(USER_DATA_STORAGE_KEY);
        
        if (!userToken || !userData) {
            toast({
                title: `${t('toast.title-no-authenticated')}`,
                description: `${t('toast.description-no-authenticated')}`,
                duration: 3000
            });
            router.push(`/${locale}/login`);
        } else {
            if (userToken && userData) {
                setAccessToken(JSON.parse(userToken).acess_token);
                setUser(JSON.parse(userData));
            }
        }
    }, [locale, router, t]);

    // Handle query errors
    useEffect(() => {
        if (error) {
            handleError(error);
        }
    }, [error]);

    return (
        <div className="bg-gray-1300 min-h-screen flex">
            <VerticalMenu />

            <main className="flex-1 p-8">
                {(user?.status !== AccountStatus.ACTIVE)  && (
                    <PromotionalBanner />
                )}
                <h2 className="text-2xl font-semibold mb-1 text-gray-50">{t('title')}</h2>
                <p className="text-gray-200 text-base mb-6">
                    {t('description')}
                </p>

                {isPending && <PortfolioSkeleton />}
                {!isPending && !isError && data && (
                    <div>
                        <div className="w-full max-w-3xl grid gap-4 grid-cols-1 md:grid-cols-2">
                            {data && data.length > 0 ? <PortifolioCard user={user!} acess_token={acess_token!} components={data} /> : <EmptyState />}
                            {/* <UpgradePlanCard /> */}
                        </div>
                    </div>
                )}
                {!isPending && isError && (
                    <div>
                        <h2 className="text-xl font-semibold mb-1 text-gray-50">
                            Algo deu errado!
                        </h2>
                        <Button
                            className="w-full max-w-xl bg-blue-700 hover:bg-blue-800"
                            size="lg"
                            onClick={() => window.location.reload()}
                        >
                            Tentar novamente
                        </Button>
                    </div>
                )}
            </main>
            <Toaster />
        </div>
    );
}