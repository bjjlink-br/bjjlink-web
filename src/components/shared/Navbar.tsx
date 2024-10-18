'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, User, X } from 'lucide-react'
import { Separator } from '../ui/separator'

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className="bg-gray-900 text-gray-200 md:border md:border-gray-700 md:rounded-md md:mx-24 md:mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-6 w-6 bg-blue-600 rounded"></div>
              <span className="text-2xl font-primary text-brand-blue-50">BJJ<b>Link</b></span>
            </Link>
          </div>

          {/* Menu Web */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link href="/" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 hover:text-brand-blue-50 hover:font-semibold">Inicio</Link>
              <Link href="/planos" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 hover:text-brand-blue-50 hover:font-semibold">Planos</Link>
              <Link href="/blog" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 hover:text-brand-blue-50 hover:font-semibold">Blog</Link>
              <Link href="/ajuda" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 hover:text-brand-blue-50 hover:font-semibold">Ajuda</Link>
              <Link href="/como-funciona" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 hover:text-brand-blue-50 hover:font-semibold">Como funciona</Link>
              <Link href="/contato" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 hover:text-brand-blue-50 hover:font-semibold">Contato</Link>
            </div>
          </div>
          <div className="hidden md:flex md:flex-row md:items-center">
            <button className="flex flex-row items-center px-3 py-2 gap-1 rounded-md text-base font-medium font-secondary text-brand-blue-50 hover:bg-gray-700">
              <User size={18} color="#D8D8E1" />
              Login
            </button>
            <button className="ml-4 px-4 py-2 rounded-md text-base font-medium font-secondary text-brand-blue-50 bg-blue-600 hover:bg-blue-700">Começar agora</button>
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
              <button className="block w-full text-left px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700">Login</button>
              <button className="block w-full text-left px-3 py-2 rounded-md text-base font-medium">Começar agora</button>
            </div>
          </div>
          <Separator className="my-2" />
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 font-secondary">
            <Link href="/" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700">Inicio</Link>
            <Link href="/planos" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700">Planos</Link>
            <Link href="/blog" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700">Blog</Link>
            <Link href="/ajuda" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700">Ajuda</Link>
            <Link href="/como-funciona" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700">Como funciona</Link>
            <Link href="/contato" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700">Contato</Link>
          </div>
        </div>
      )}
    </nav>
  )
}