"use client"
import { VerticalMenu } from "@/components/shared/VerticalMenu";
import { Tabs, TabsTrigger, TabsList, TabsContent } from "@/components/ui/tabs";
import { useLocale, useTranslations } from "next-intl";
import { ProfileSettings } from "./components/ProfileSettings";
import { useEffect, useState } from "react";
import { ManageSubscription } from "./components/ManageSubscription";
import { AUTH_STORAGE_KEY, GET_COMPONENTS_KEY, USER_DATA_STORAGE_KEY } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { UserAccountInfo } from "@/utils/types";
import { Section } from "@/utils/dataSections";

export default function Settings() {
    const t = useTranslations("settings");
    const [activeTab, setActiveTab] = useState("profile");
    const [user, setUser] = useState<UserAccountInfo>();
    const [components, setComponents] = useState<Section[]>([]);
    const router = useRouter();
    const locale = useLocale();

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
                setUser(JSON.parse(userData));
            }
        }
    }, [locale, router, t]);

    useEffect(() => {
        const components = localStorage.getItem(GET_COMPONENTS_KEY);
        if (components) {
            setComponents(JSON.parse(components));
        }
    },[locale, router, t])

    return (
        <div className="bg-gray-1300 min-h-screen flex flex-col md:flex-row overflow-x-hidden">
            <VerticalMenu activeMenu="settings" />
            <main className="flex-1 p-4 md:p-8 pb-24 md:pb-8 w-full overflow-x-hidden">
                <Tabs defaultValue="profile">
                    <TabsList className="grid grid-cols-2 bg-gray-900 w-full max-w-[400px]">
                        <TabsTrigger 
                            value="profile"
                            onClick={() => setActiveTab('profile')}
                            style={{ 
                                backgroundColor: `${activeTab === "profile" ? '#3A3A44' : ''}`,
                                color: `${activeTab === "profile" ? '#D8D8E1' : ''}`
                            }}
                        >
                            {t("tabs.profile")}
                        </TabsTrigger>
                        <TabsTrigger
                            style={{ 
                                backgroundColor: `${activeTab === "subscription" ? '#3A3A44' : ''}`,
                                color: `${activeTab === "subscription" ? '#D8D8E1' : ''}`
                            }}
                            value="subscription"
                            onClick={() => setActiveTab('subscription')}
                        >
                            {t("tabs.subscription")}
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent 
                        value="profile"
                        className="flex justify-start items-start mt-6 w-full overflow-x-hidden"
                    >
                        {user && <ProfileSettings user={user} components={components} />}
                    </TabsContent>
                    <TabsContent value="subscription" className="w-full overflow-x-hidden">
                        <ManageSubscription user={user} />
                    </TabsContent>
                </Tabs>
            </main>
            <Toaster />
        </div>
    )
}