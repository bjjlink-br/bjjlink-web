import Image from "next/image"
import { Button } from "@/components/ui/button"
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
import { FaqCards } from "@/components/shared/FaqCards"
import { Footer } from "@/components/shared/Footer"
import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-1300 text-gray-50">
        <div className="hidden md:flex md:justify-end md:pt-1">
            <LanguageSwitcher />
        </div>
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

        <section className="bg-gray-1100 py-16" id="how-works">
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

        <section className="mx-auto md:px-12 pt-10 md:py-20" id="plans">
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

        <section className="mx-auto pt-10 md:py-20 mb-16" id="blog">
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

        <section className="container mx-auto py-10 px-4 md:py-20" id="help">
          <div className="container mx-auto px-4 mb-8">
            <h5 className="text-xl md:text-3xl text-center font-semibold text-brand-blue-50">
              Perguntas frequentes
            </h5>
            <p className="text-sm md:text-base text-gray-200 text-center">
              Rorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus.
            </p>
          </div>
          <FaqCards />
        </section>
      </main>

      <Footer />
    </div>
  )
}