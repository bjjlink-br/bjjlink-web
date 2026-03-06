"use client"
import { VerticalMenu } from "@/components/shared/VerticalMenu"
import { useLocale, useTranslations } from "next-intl"
import { ProfileSettings } from "./components/ProfileSettings"
import { useEffect, useState } from "react"
import { SecuritySettings } from "./components/SecuritySettings"
import { PrivacySettings } from "./components/PrivacySettings"
import { DonationSettings } from "./components/DonationSettings"
import { AccountActions } from "./components/AccountActions"
import { AUTH_STORAGE_KEY, GET_COMPONENTS_KEY, USER_DATA_STORAGE_KEY } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"
import { toast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { UserAccountInfo } from "@/utils/types"
import { Section } from "@/utils/dataSections"

export default function Settings() {
    const t = useTranslations("settings")
    const [user, setUser] = useState<UserAccountInfo>()
    const [components, setComponents] = useState<Section[]>([])
    const router = useRouter()
    const locale = useLocale()

    useEffect(() => {
        const userToken = localStorage.getItem(AUTH_STORAGE_KEY)
        const userData = localStorage.getItem(USER_DATA_STORAGE_KEY)

        if (!userToken || !userData) {
            toast({
                title: `${t('toast.title-no-authenticated')}`,
                description: `${t('toast.description-no-authenticated')}`,
                duration: 3000
            })
            router.push(`/${locale}/login`)
        } else {
            setUser(JSON.parse(userData))
        }
    }, [locale, router, t])

    useEffect(() => {
        const components = localStorage.getItem(GET_COMPONENTS_KEY)
        if (components) {
            setComponents(JSON.parse(components))
        }
    }, [locale, router, t])

    return (
        <div className="bg-gray-1300 min-h-screen flex flex-col md:flex-row overflow-x-hidden">
            <VerticalMenu activeMenu="settings" />
            <main className="flex-1 p-4 md:p-8 md:pt-12 pb-24 md:pb-8 w-full overflow-x-hidden">
                <div className="max-w-[900px]">
                    {/* Page header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-semibold text-gray-50 font-poppins">{t("page-title")}</h1>
                        <p className="text-sm text-gray-400 mt-1">{t("page-subtitle")}</p>
                    </div>

                    <div className="space-y-6">
                        {/* Profile Section */}
                        <section className="bg-gray-900 rounded-lg p-6">
                            {user && <ProfileSettings user={user} components={components} />}
                        </section>

                        {/* Security Section */}
                        <section className="bg-gray-900 rounded-lg p-6">
                            <SecuritySettings />
                        </section>

                        {/* Privacy Section */}
                        <section className="bg-gray-900 rounded-lg p-6">
                            <PrivacySettings />
                        </section>

                        {/* Donations Section */}
                        <section className="bg-gray-900 rounded-lg p-6">
                            {user && <DonationSettings user={user} />}
                        </section>

                        {/* Account Actions (Danger Zone) */}
                       {/* <AccountActions user={user} /> */}
                      
                    </div>
                </div>
            </main>
            <Toaster />
        </div>
    )
}
