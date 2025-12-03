"use client"
import Link from "next/link";
import { useState } from "react";

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
import { ChevronLeft, ChevronRight } from "lucide-react";

export const VerticalMenu = ({ activeMenu = 'dashboard' }: {activeMenu?: string; }) => {
    const t = useTranslations("vertical-menu");
    const router = useRouter()
    const locale = useLocale()
    const [isExpanded, setIsExpanded] = useState(true);

    const handleLogout = () => {
        signOut();
        router.push(`/${locale}`);
    }

    const toggleMenu = () => {
        setIsExpanded(!isExpanded);
    }

    return (
        <aside className={`${isExpanded ? 'w-56' : 'w-16'} bg-gray-900 p-4 flex flex-col items-start transition-all duration-300 ease-in-out`}>
                <div className="mb-8 px-3 flex items-center justify-between w-full">
                    {isExpanded && <LogoTitle />}
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={toggleMenu}
                        className="p-1 h-8 w-8 text-gray-400 hover:text-white hover:bg-zinc-800 rounded-md transition-colors"
                    >
                        {isExpanded ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
                    </Button>
                </div>
                
                <nav className="flex-1 space-y-2 w-full">
                    <Link
                        href={`/${locale}/dashboard`}
                        className={`font-sans text-base flex items-center ${isExpanded ? 'gap-3 px-3' : 'justify-center px-2'} py-2 text-gray-200 hover:text-white hover:bg-zinc-900 rounded-lg transition-colors ${activeMenu === 'dashboard' ? 'bg-zinc-900' : ''}`}
                        title={!isExpanded ? t('navbar.dashboard') : undefined}
                    >
                        <Image src={HomeIcon} alt={t('navbar.dashboard-alt-icon')} />
                        {isExpanded && t('navbar.dashboard')}
                    </Link>
                    <Link
                        href={`/${locale}/portifolio/create`}
                        className={`font-sans text-base flex items-center ${isExpanded ? 'gap-3 px-3' : 'justify-center px-2'} py-2 text-gray-200 hover:text-white hover:bg-zinc-900 rounded-lg transition-colors ${activeMenu === 'portifolio' ? 'bg-zinc-900' : ''}`}
                        title={!isExpanded ? t('navbar.portifolio') : undefined}
                    >
                        <Image src={NotebookIcon} alt={t('navbar.portifolio-alt-icon')} />
                        {isExpanded && t('navbar.portifolio')}
                    </Link>
                    <Link
                        href="#"
                        className={`font-sans text-base flex items-center ${isExpanded ? 'gap-3 px-3' : 'justify-center px-2'} py-2 text-gray-200 hover:text-white hover:bg-zinc-900 rounded-lg transition-colors ${activeMenu === 'analytics' ? 'bg-zinc-900' : ''}`}
                        title={!isExpanded ? t('navbar.analytics') : undefined}
                    >
                        <Image src={AnalyticsIcon} alt={t('navbar.analytics-alt-icon')} />
                        {isExpanded && t('navbar.analytics')}
                    </Link>
                    {/* <Link
                        href={`/${locale}/settings`}
                        className={`font-sans text-base flex items-center gap-3 px-3 py-2 text-gray-200 hover:text-white hover:bg-zinc-900 rounded-lg transition-colors ${activeMenu === 'account' ? 'bg-zinc-900' : ''}`}
                    >
                        <Image src={UserIcon} alt={t('navbar.my-account-alt-icon')} />
                        {t('navbar.my-account')}
                    </Link> */}
                    <Link
                        href={`/${locale}/settings`}
                        className={`font-sans text-base flex items-center ${isExpanded ? 'gap-3 px-3' : 'justify-center px-2'} py-2 text-gray-200 hover:text-white hover:bg-zinc-900 rounded-lg transition-colors ${activeMenu === 'settings' ? 'bg-zinc-900' : ''}`}
                        title={!isExpanded ? t('navbar.settings') : undefined}
                    >
                        <Image src={SettingsIcon} alt={t('navbar.settings-alt-icon')} />
                        {isExpanded && t('navbar.settings')}
                    </Link>
                </nav>

                <div className="mt-auto pt-4 border-t border-zinc-800 w-full">
                    <Button
                        variant="ghost"
                        onClick={handleLogout}
                        className={`font-sans text-base flex items-center ${isExpanded ? 'gap-3 px-3' : 'justify-center px-2'} py-2 text-gray-200 hover:text-white hover:bg-zinc-900 rounded-lg transition-colors w-full`}
                        title={!isExpanded ? t('navbar.logout') : undefined}
                    >
                        <Image src={LogoutIcon} alt={t('navbar.logout-alt-icon')} />
                        {isExpanded && t('navbar.logout')}
                    </Button>
                </div>
            </aside>
    )
}