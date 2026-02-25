'use client'
import Link from "next/link"
import { Facebook, Instagram, Linkedin } from "lucide-react"
import { LogoTitle } from "./LogoTitle"
import XLogoSvg from '@/assets/icons/x.svg'
import Image from "next/image"
import { useTranslations, useLocale } from "next-intl"

export function Footer() {
  const t = useTranslations("footer")
  const locale = useLocale()

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <footer className="text-gray-300" id="contact">
      <div className="mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-gray-1100 py-8 px-12">
          {/* Logo and description */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <LogoTitle />
            <p className="text-sm text-center md:text-left">
              {t('description')}
            </p>
          </div>

          <div className="flex flex-col gap-4 items-center">
            <div className="flex flex-col gap-1 text-center md:text-left md:min-w-[186px]">
                <h3 className="text-gray-50 text-lg font-semibold">{t('contact-title')}</h3>
                <p className="text-sm">{t('email')}</p>
                <p className="text-sm">{t('phone')}</p>
            </div>
            <div className="text-center md:text-left md:min-w-[186px]">
                <h3 className="text-gray-50 text-lg font-semibold">{t('social-networks')}</h3>
                <div className="flex items-center space-x-2">
                    <Link href="https://www.instagram.com/bjjlinkpro" target="_blank" className="hover:text-brand-blue-100">
                        <Instagram size={24} color="#85CBFF" />
                    </Link>
                      {/* <Link href="#" target="_blank" className="hover:text-brand-blue-100">
                          <Facebook size={24} color="#85CBFF" />
                      </Link> */}
                    {/* <Link href="https://x.com/bjjlinkpro" target="_blank" className="hover:text-brand-blue-100">
                        <Image src={XLogoSvg} alt={t('x-logo-alt')} width={24} height={24} />
                    </Link> */}
                    {/* <Link href="https://www.linkedin.com/company/bjjlinkpro" target="_blank" className="hover:text-brand-blue-100">
                        <Linkedin size={24} color="#85CBFF" />
                    </Link> */}
                </div>
            </div>
          </div>

          <div className="text-center md:text-left">
            <h3 className="text-gray-50 text-lg font-semibold mb-1">{t('privacy-title')}</h3>
            <Link href={`/${locale}/terms`} className="block hover:text-white">
              {t('terms-link')}
            </Link>
            <Link href={`/${locale}/privacy`} className="block hover:text-white">
              {t('privacy-link')}
            </Link>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-gray-800 bg-gray-900 flex flex-col md:flex-row justify-between items-center py-6 px-12">
          <p className="text-sm mb-4 md:mb-0 text-center md:text-left">
            {t('copyright')}
          </p>
          <nav className="hidden md:block">
            <ul className="flex flex-wrap justify-center md:justify-end space-x-4">
              <li>
                <Link href="/" className="hover:text-white">
                  {t('home')}
                </Link>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('plans')}
                  className="hover:text-brand-blue-50 border-none"
                >
                  {t('plans')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('plans')}
                  className="hover:text-brand-blue-50 border-none"
                >
                  {t('blog')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('plans')}
                  className="hover:text-brand-blue-50 border-none"
                >
                  {t('help')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('plans')}
                  className="hover:text-brand-blue-50 border-none"
                >
                  {t('how-works')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('plans')}
                  className="hover:text-brand-blue-50 border-none"
                >
                  {t('contact')}
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  )
}