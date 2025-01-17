"use client"
import { useLocale, useTranslations } from "next-intl";
import { VerticalMenu } from "@/components/shared/VerticalMenu";
import { PromotionalBanner } from "./components/PromotionalBanner";
import { PortifolioCard } from "./components/PortifolioCard";
import { UpgradePlanCard } from "./components/UpgradePlanCard";
import { useEffect } from "react";
import { AUTH_STORAGE_KEY } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";

export default function Dashboard() {
    const t = useTranslations("dashboard");
    const router = useRouter()
    const locale = useLocale()

    useEffect(() => {
        const dataUser = localStorage.getItem('@Bjjlink-user');
        const userToken = localStorage.getItem(AUTH_STORAGE_KEY);
        // if(!dataUser && !userToken) {
        //     toast({
        //         title: `${t('toast.title-no-authenticated')}`,
        //         description: `${t('toast.description-no-authenticated')}`,
        //         duration: 3000
        //     });
        //     router.push(`/${locale}/login`);
        // }
    },[locale, router, t])

    return(
        <div className="bg-gray-1300 min-h-screen flex">
            <VerticalMenu />

            <main className="flex-1 p-8">
                <PromotionalBanner />

                <div>
                    <h2 className="text-2xl font-semibold mb-1 text-gray-50">{t('title')}</h2>
                    <p className="text-gray-200 text-base mb-6">
                        {t('description')}
                    </p>

                    {/* <EmptyState /> */}

                    <div className="w-full max-w-3xl grid gap-4 grid-cols-1 md:grid-cols-2">
                        <PortifolioCard />
                        <UpgradePlanCard />
                    </div>
                </div>
            </main>
            <Toaster />
        </div>
    )
}