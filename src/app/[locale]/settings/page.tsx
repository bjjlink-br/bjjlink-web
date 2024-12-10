"use client"
import { VerticalMenu } from "@/components/shared/VerticalMenu";
import { Tabs, TabsTrigger, TabsList, TabsContent } from "@/components/ui/tabs";
import { useTranslations } from "next-intl";
import { ProfileSettings } from "./components/ProfileSettings";
import { useState } from "react";
import { ManageSubscription } from "./components/ManageSubscription";

export default function Settings() {
    const t = useTranslations("settings");
    const [activeTab, setActiveTab] = useState("profile")

    return (
        <div className="bg-gray-1300 min-h-screen flex">
            <VerticalMenu activeMenu="settings" />
            <main className="flex-1 p-8">
                <Tabs 
                    defaultValue="profile" 
                    // className="w-[400px]"
                >
                    <TabsList className="grid w-full grid-cols-2 bg-gray-900 w-[400px]">
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
                        className="flex justify-start items-start mt-6"
                    >
                        <ProfileSettings />
                    </TabsContent>
                    <TabsContent value="subscription">
                        <ManageSubscription />
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    )
}