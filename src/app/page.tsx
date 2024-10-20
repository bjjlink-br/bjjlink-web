import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Navbar } from "@/components/shared/Navbar"
import { ArrowUpRight, ChevronRight } from "lucide-react"
import AthleteSvg from "@/assets/images/athlete-man.svg";
import { Badge } from "@/components/ui/badge"
import { cardsInfoAdvantages } from "@/utils/constants"
import { CardInfo } from "@/components/shared/CardInfo"
import ManTypeSvg from "@/assets/images/man-type.svg";
import AtlheteWomanSvg from "@/assets/images/athlete-woman.svg";
import AppSvg from "@/assets/images/app.svg";
import PricingComponent from "@/components/shared/PricingComponent"
import { Separator } from "@/components/ui/separator"
import TestimonialCarousel from "@/components/shared/TestimonialCarousel"
import { BlogCarousel } from "@/components/shared/BlogCarousel"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-1300 text-gray-50">
      <Navbar />

      <main>
        <section className="container mx-auto md:px-12 pt-10 md:py-20 flex flex-col md:flex-row items-center justify-center gap-4">
          <div className="md:w-1/2 space-y-4 md:space-y-6 px-4">
            <div className="flex items-center gap-2 font-secondary">
              <Badge className="bg-brand-blue-600 rounded-sm">Novo</Badge>
              <p className="text-sm text-gray-400">Aumente sua visibilidade!</p>
            </div>
            <h1 className="text-4xl md:text-6xl text-brand-blue-50">
              Seu portfólio<br/>
              <span className="font-bold">DE ATLETA</span>
            </h1>
            <p className="text-sm md:text-base text-gray-200">
              Saiba como se apresentar na internet mostrando todo o seu potencial e experiência, 
              tudo em um só lugar com alto nível e perfomace no seu portfólio.
            </p>
            <div className="flex flex-col md:flex-row gap-4">
              <Button size="lg" className="flex flex-row gap-1 items-center text-white bg-brand-blue-600 hover:bg-brand-blue-700">
                Criar portfólio grátis
                <ArrowUpRight size={18} color="#fff" />
              </Button>
              <Button className="text-brand-blue-50 hover:bg-gray-700 hover:text-white" size="lg" variant="ghost">Acessar agora</Button>
            </div>
          </div>
          <div className="md:w-1/2 mt-10 md:mt-0">
            <Image src={AthleteSvg} width={500} height={500} alt="Athlete in blue gi" className="rounded-lg" />
          </div>
        </section>

        <section className="bg-gray-1100 py-16">
          <div className="container mx-auto px-4 flex flex-col justify-center items-center">
            <h2 className="text-2xl md:text-4xl text-center font-semibold text-brand-blue-50">
              Como BjjLink vai te ajudar?
            </h2>
            <p className="text-sm md:text-base text-gray-200 text-center">
              Rorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
              {cardsInfoAdvantages.map((card, index) => (
                <CardInfo key={index} title={card.title} img={card.img} bgColor={card.bgColor} />
              ))}
            </div>
          </div>
        </section>

        <section className="container mx-auto md:px-12 pt-10 md:py-20">
          <div className="flex flex-col-reverse md:flex-row-reverse items-center md:py-16">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <Image src={ManTypeSvg} width={400} height={400} alt="Man typing on a cell phone" className="rounded-lg" />
            </div>
            <div className="md:w-1/2 md:pr-10 md:pl-0 px-4">
              <Badge className="bg-brand-blue-600 rounded-sm">Crie em poucos minutos</Badge>
              <h3 className="text-3xl md:text-4xl font-medium text-brand-blue-50 my-2">
                Seu portfólio pronto em poucos minutos
              </h3>
              <p className="text-sm md:text-base text-gray-200">
                Rorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus.
              </p>
            </div>
          </div>
            
          <div className="flex flex-col-reverse md:flex-row items-center mb-20">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <Image src={AppSvg} width={400} height={400} alt="Print screen of the app" className="rounded-lg" />
            </div>
            <div className="md:w-1/2 md:pr-10 md:pl-0 px-4">
              <Badge className="bg-brand-blue-600 rounded-sm">Bem apresentável</Badge>
              <h3 className="text-3xl md:text-4xl font-medium text-brand-blue-50 my-2">
                O seu portfólio com design profissional
              </h3>
              <p className="text-sm md:text-base text-gray-200">
                Rorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus.
              </p>
            </div>
          </div>

          <div className="flex flex-col-reverse md:flex-row-reverse items-center md:py-16">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <Image src={AtlheteWomanSvg} width={400} height={400} alt="Athlete woman with a cell phone" className="rounded-lg" />
            </div>
            <div className="md:w-1/2 md:pr-10 md:pl-0 px-4">
              <Badge className="bg-brand-blue-600 rounded-sm">Rede sociais</Badge>
              <h3 className="text-3xl md:text-4xl font-medium text-brand-blue-50 my-2">
                Centralizar todas as suas informações em único lugar!
              </h3>
              <p className="text-sm md:text-base text-gray-200">
                Rorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto md:px-12 pt-10 md:py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-xl md:text-3xl text-center font-semibold text-brand-blue-50">
              Nossos planos
            </h2>
            <p className="text-sm md:text-base text-gray-200 text-center">
              Rorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus.
            </p>
            <PricingComponent />
          </div>
        </section>
        <div className="md:block hidden py-10 md:px-12">
          <Separator className="bg-gray-600"/>
        </div>

        <section className="mx-auto pt-10 md:py-20 mb-16">
          <div className="container mx-auto px-4 mb-4">
            <h2 className="text-xl md:text-3xl text-center font-semibold text-brand-blue-50">
              Atletas que já usam a plataforma
            </h2>
            <p className="text-sm md:text-base text-gray-200 text-center">
              Rorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus.
            </p>
          </div>
          <TestimonialCarousel />
        </section>

        <section className="bg-transparent px-4 md:px-0">
          <div className="container flex flex-col items-center justify-center bg-gray-900 rounded-2xl max-w-[930px] mx-auto p-8 md:px-52 md:py-16">
            <div className="container mx-auto px-4 mb-4">
              <h2 className="text-xl md:text-3xl text-center font-semibold text-brand-blue-50 mb-2">
                Comece a criar o seu portfólio gratuitamente
              </h2>
              <p className="text-sm md:text-base text-gray-200 text-center">
                Rorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus.
              </p>
            </div>
            <Button className="max-w-44 text-white bg-brand-blue-600 hover:bg-brand-blue-700 mt-1">Comece agora</Button>
          </div>
        </section>

        <section className="mx-auto pt-10 md:py-20 mb-16">
          <div className="container mx-auto px-4 mb-4 flex flex-row justify-between items-end">
            <div>
              <h4 className="text-xl md:text-3xl font-semibold text-brand-blue-50 mb-2">
                Publicações do blog
              </h4>
              <p className="text-sm md:text-base text-gray-200">
                Rorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis
              </p>
            </div>
            <Button variant="ghost" className="hidden md:flex font-secondary font-semibold flex-row gap-1 items-center text-brand-blue-50">
              Ghost
              <ChevronRight size={16} />
            </Button>
          </div>
          <BlogCarousel />
        </section>

        <section className="container mx-auto px-4 py-20">
          <h2 className="text-3xl font-bold text-center mb-10">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="max-w-2xl mx-auto">
            {[...Array(4)].map((_, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>Question {index + 1}</AccordionTrigger>
                <AccordionContent>
                  Answer to question {index + 1} goes here. This is where you would provide detailed information to address common inquiries from users.
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </main>

      <footer className="bg-gray-900 py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">BJJLink</h3>
              <p className="text-gray-400">Your ultimate platform for creating and managing your athlete portfolio.</p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-400 hover:text-blue-400">Home</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-blue-400">About</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-blue-400">Pricing</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-blue-400">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-400 hover:text-blue-400">Terms of Service</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-blue-400">Privacy Policy</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Connect</h3>
              <div className="flex space-x-4">
                <Link href="#" className="text-gray-400 hover:text-blue-400">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </Link>
                <Link href="#" className="text-gray-400 hover:text-blue-400">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292  4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </Link>
                <Link href="#" className="text-gray-400 hover:text-blue-400">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; 2024 BJJLink. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}