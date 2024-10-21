import Link from "next/link"
import { Facebook, Instagram, Linkedin } from "lucide-react"
import { LogoTitle } from "./LogoTitle"
import XLogoSvg from '@/assets/icons/x.svg'
import Image from "next/image"

export function Footer() {
  return (
    <footer className="text-gray-300" id="contact">
      <div className="mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-gray-1100 py-8 px-12">
          {/* Logo and description */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <LogoTitle />
            <p className="text-sm text-center md:text-left">
              Porem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie,
              dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem
              sollicitudin lacus.
            </p>
          </div>

          <div className="flex flex-col gap-4 items-center">
            <div className="flex flex-col gap-1 text-center md:text-left md:min-w-[186px]">
                <h3 className="text-gray-50 text-lg font-semibold">Contato</h3>
                <p className="text-sm">contato@bjjlink.com.br</p>
                <p className="text-sm">(61) 9997-5826</p>
            </div>
            <div className="text-center md:text-left md:min-w-[186px]">
                <h3 className="text-gray-50 text-lg font-semibold">Rede sociais</h3>
                <div className="flex items-center space-x-2">
                    <Link href="#" className="hover:text-brand-blue-100">
                        <Instagram size={24} color="#85CBFF" />
                    </Link>
                    <Link href="#" className="hover:text-brand-blue-100">
                        <Facebook size={24} color="#85CBFF" />
                    </Link>
                    <Link href="#" className="hover:text-brand-blue-100">
                        <Image src={XLogoSvg} alt="Logo X antigo twitter" width={24} height={24} />
                    </Link>
                    <Link href="#" className="hover:text-brand-blue-100">
                        <Linkedin size={24} color="#85CBFF" />
                    </Link>
                </div>
            </div>
          </div>

          <div className="text-center md:text-left">
            <h3 className="text-gray-50 text-lg font-semibold mb-1">Privacidade</h3>
            <Link href="/terms" className="block hover:text-white">
              Termos e condições de uso
            </Link>
            <Link href="/privacy" className="block hover:text-white">
              Política de Privacidade
            </Link>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-gray-800 bg-gray-900 flex flex-col md:flex-row justify-between items-center py-6 px-12">
          <p className="text-sm mb-4 md:mb-0 text-center md:text-left">
            Copyright © 2023 Todos os direitores reservados para BJJLink
          </p>
          <nav className="hidden md:block">
            <ul className="flex flex-wrap justify-center md:justify-end space-x-4">
              <li>
                <Link href="/" className="hover:text-white">
                  Início
                </Link>
              </li>
              <li>
                <Link href="/planos" className="hover:text-white">
                  Planos
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/ajuda" className="hover:text-white">
                  Ajuda
                </Link>
              </li>
              <li>
                <Link href="/como-funciona" className="hover:text-white">
                  Como funciona
                </Link>
              </li>
              <li>
                <Link href="/contato" className="hover:text-white">
                  Contato
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  )
}