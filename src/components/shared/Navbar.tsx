'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, User, X } from 'lucide-react'
import { Separator } from '../ui/separator'
import { LogoTitle } from './LogoTitle'
import { useTranslations } from 'next-intl'

export function Navbar() {
  const t = useTranslations("navbar")
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setIsMenuOpen(false)
  };

  return (
    <nav className="bg-gray-900 text-gray-200 md:border md:border-gray-700 md:rounded-md md:mx-24 md:mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <LogoTitle />

          {/* Menu Web */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link 
                href="/" 
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 hover:text-brand-blue-50 hover:font-semibold"
              >
                {t('home')}
              </Link>
              <button
                onClick={() => scrollToSection('plans')}
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 hover:text-brand-blue-50 hover:font-semibold"
              >
                Planos
              </button>
              <button
                onClick={() => scrollToSection('blog')}
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 hover:text-brand-blue-50 hover:font-semibold"
              >
                Blog
              </button>
              <button
                onClick={() => scrollToSection('help')}
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 hover:text-brand-blue-50 hover:font-semibold"
              >
                Ajuda
              </button>
              <button
                onClick={() => scrollToSection('how-works')}
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 hover:text-brand-blue-50 hover:font-semibold"
              >
                Como funciona
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 hover:text-brand-blue-50 hover:font-semibold"
              >
                Contato
              </button>
            </div>
          </div>
          <div className="hidden md:flex md:flex-row md:items-center">
            <Link
              href="/login"
              className="flex flex-row items-center px-3 py-2 gap-1 rounded-md text-base font-medium font-secondary text-brand-blue-50 hover:bg-gray-700"
            >
              <User size={18} color="#D8D8E1" />
              Login
            </Link>
            <Link
              href="/register"
              className="ml-4 px-4 py-2 rounded-md text-base font-medium font-secondary text-brand-blue-50 bg-blue-600 hover:bg-blue-700"
            >
              Começar agora
            </Link>
          </div>
          <div className="md:hidden">
            <button onClick={toggleMenu} className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <X className="block h-6 w-6 bg-[#D831220D] p-1 rounded-sm" color='#F39678' /> : <Menu className="block h-7 w-7 bg-gray-1100 p-1 rounded-sm" />}
            </button>
          </div>
        </div>
      </div>

      {/* Menu Mobile */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="pt-4 pb-3 border-t border-gray-700 font-secondary">
            <div className="px-2 space-y-1">
              <Link
                href="/login"
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium"
              >
                Começar agora
              </Link>
            </div>
          </div>
          <Separator className="my-2" />
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 font-secondary">
            <Link href="/" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700">Inicio</Link>
            <button
              onClick={() => scrollToSection('plans')}
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700"
            >
              Planos
            </button>
            <button
              onClick={() => scrollToSection('blog')}
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700"
            >
              Blog
            </button>
            <button
              onClick={() => scrollToSection('help')}
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700"
            >
              Ajuda
            </button>
            <button
              onClick={() => scrollToSection('how-works')}
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700"
            >
              Como funciona
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700"
            >
              Contato
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}