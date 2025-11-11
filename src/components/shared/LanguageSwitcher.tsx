'use client'

import { useLocale } from 'next-intl';

import clsx from 'clsx';

import usaIcon from '../../assets/icons/usaFlag.svg';
import brazilIcon from '../../assets/icons/brazilFlag.svg';
import Image from 'next/image';
import { usePathname, useRouter } from '@/i18n/routing';

export function LanguageSwitcher({ isMobileMenuOpen = false }) {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const languageOptions = [
        {
            name: "Português",
            value: "pt-BR",
            flag: brazilIcon
        },
        {
            name: "English",
            value: "en",
            flag: usaIcon
        },
    ];

    const handleChangeLanguage = (newLocale: string) => {
        router.replace(pathname, { locale: newLocale });
    };

    return (
        <div
            className={clsx("flex items-center gap-2 md:flex", {
                visible: isMobileMenuOpen,
                hidden: !isMobileMenuOpen,
            })}
        >
            {languageOptions.map(option => (
                <button
                    key={option.value}
                    onClick={() => handleChangeLanguage(option.value)}
                    className={clsx("bg-[#3F3F46] rounded-lg h-8 w-8 flex items-center justify-center hover:cursor-pointer",{
                        'border border-brand-blue-600': locale === option.value
                    })}
                    title={`Switch to ${option.name}`}
                >
                    <Image 
                        src={option.flag} 
                        alt={option.name} 
                        className="w-6 h-6"
                    />
                </button>
            ))}
        </div>
    );
}