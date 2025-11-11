"use client"
import Link from "next/link";

import HomeIcon from '@/assets/icons/home.svg'
import NotebookIcon from '@/assets/icons/notebook.svg'
import SettingsIcon from '@/assets/icons/settings.svg'
import AnalyticsIcon from '@/assets/icons/analytics-chart.svg'
import UserIcon from '@/assets/icons/user.svg'
import LogoutIcon from '@/assets/icons/logout.svg'
import { LogoTitle } from "@/components/shared/LogoTitle";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { Button } from "../ui/button";
import { signOut } from "@/utils/functions";
import { useRouter } from "next/navigation";

export const VerticalMenu = ({ activeMenu = 'dashboard' }: {activeMenu?: string; }) => {
    const t = useTranslations("vertical-menu");
    const router = useRouter()
    const locale = useLocale()

    const handleLogout = () => {
        signOut();
        router.push(`/${locale}`);
    }

    return (
        <aside className="w-56 bg-gray-900 p-4 flex flex-col items-start">
                <div className="mb-8 px-3">
                    <LogoTitle />
                </div>
                
                <nav className="flex-1 space-y-2">
                    <Link
                        href={`/${locale}/dashboard`}
                        className={`font-sans text-base flex items-center gap-3 px-3 py-2 text-gray-200 hover:text-white hover:bg-zinc-900 rounded-lg transition-colors ${activeMenu === 'dashboard' ? 'bg-zinc-900' : ''}`}
                    >
                        <Image src={HomeIcon} alt={t('navbar.dashboard-alt-icon')} />
                        {t('navbar.dashboard')}
                    </Link>
                    <Link
                        href={`/${locale}/portifolio/create`}
                        className={`font-sans text-base flex items-center gap-3 px-3 py-2 text-gray-200 hover:text-white hover:bg-zinc-900 rounded-lg transition-colors ${activeMenu === 'portifolio' ? 'bg-zinc-900' : ''}`}
                    >
                        <Image src={NotebookIcon} alt={t('navbar.portifolio-alt-icon')} />
                        {t('navbar.portifolio')}
                    </Link>
                    <Link
                        href="#"
                        className={`font-sans text-base flex items-center gap-3 px-3 py-2 text-gray-200 hover:text-white hover:bg-zinc-900 rounded-lg transition-colors ${activeMenu === 'analytics' ? 'bg-zinc-900' : ''}`}
                    >
                        <Image src={AnalyticsIcon} alt={t('navbar.analytics-alt-icon')} />
                        {t('navbar.analytics')}
                    </Link>
                    <Link
                        href={`/${locale}/settings`}
                        className={`font-sans text-base flex items-center gap-3 px-3 py-2 text-gray-200 hover:text-white hover:bg-zinc-900 rounded-lg transition-colors ${activeMenu === 'account' ? 'bg-zinc-900' : ''}`}
                    >
                        <Image src={UserIcon} alt={t('navbar.my-account-alt-icon')} />
                        {t('navbar.my-account')}
                    </Link>
                    <Link
                        href={`/${locale}/settings`}
                        className={`font-sans text-base flex items-center gap-3 px-3 py-2 text-gray-200 hover:text-white hover:bg-zinc-900 rounded-lg transition-colors ${activeMenu === 'settings' ? 'bg-zinc-900' : ''}`}
                    >
                        <Image src={SettingsIcon} alt={t('navbar.settings-alt-icon')} />
                        {t('navbar.settings')}
                    </Link>
                </nav>

                <div className="mt-auto pt-4 border-t border-zinc-800">
                    <Button
                        variant="ghost"
                        onClick={handleLogout}
                        className="font-sans text-base flex items-center gap-3 px-3 py-2 text-gray-200 hover:text-white hover:bg-zinc-900 rounded-lg transition-colors"
                    >
                        <Image src={LogoutIcon} alt={t('navbar.logout-alt-icon')} />
                        {t('navbar.logout')}
                    </Button>
                </div>
            </aside>
    )
}