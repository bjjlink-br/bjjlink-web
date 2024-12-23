"use client"
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
import { useLocale } from "next-intl";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { PlanType } from "@/utils/types"
import { AUTH_STORAGE_KEY } from "@/contexts/AuthContext"

export default function Home() {
  const t = useTranslations("home")
  const router = useRouter()
  const locale = useLocale()

  const selectPlan = ({ plan, isAnnual }: { plan: PlanType; isAnnual: boolean }) => {
    const dataUser = localStorage.getItem('@Bjjlink-user');
    const userToken = localStorage.getItem(AUTH_STORAGE_KEY);
    if(dataUser && userToken){
      console.log({ isAnnual})
      router.push(`/${locale}/loadingpage?token=${userToken}&selectedPlan=${plan.name}`);
    } else {
      router.push(`/${locale}/login`);
    }
  }

  return (
    <div className="min-h-screen bg-gray-1300 text-gray-50 hidden-scroll-bar">
        {/* <div className="hidden md:flex md:justify-end md:pt-1">
            <LanguageSwitcher />
        </div> */}
      <Navbar />

      <main>
        <section className="container mx-auto md:px-12 pt-10 md:py-20 flex flex-col md:flex-row items-center justify-center gap-4">
          <div className="md:w-1/2 space-y-4 md:space-y-6 px-4">
            <div className="flex items-center gap-2 font-secondary">
              <Badge className="bg-brand-blue-600 rounded-sm">{t("new")}</Badge>
              <p className="text-sm text-gray-400">{t("subtitle-tag")}</p>
            </div>
            <h1 className="text-4xl md:text-6xl text-brand-blue-50">
              {t("title")}<br/>
              <span className="font-bold">{t("subtitle")}</span>
            </h1>
            <p className="text-sm md:text-base text-gray-200">
              {t("description")}
            </p>
            <div className="flex flex-col md:flex-row gap-4">
              <Button size="lg" className="flex flex-row gap-1 items-center text-white bg-brand-blue-600 hover:bg-brand-blue-700">
                {t("create-portifolio-button")}
                <ArrowUpRight size={18} color="#fff" />
              </Button>
              <Button className="text-brand-blue-50 hover:bg-gray-700 hover:text-white" size="lg" variant="ghost">{t("access-button")}</Button>
            </div>
          </div>
          <div className="md:w-1/2 mt-10 md:mt-0">
            <Image src={AthleteSvg} width={500} height={500} alt="Athlete in blue gi" className="rounded-lg" />
          </div>
        </section>

        <section className="bg-gray-1100 py-16" id="how-works">
          <div className="container mx-auto px-4 flex flex-col justify-center items-center">
            <h2 className="text-2xl md:text-4xl text-center font-semibold text-brand-blue-50">
              {t("what-bjj-title")}
            </h2>
            <p className="text-sm md:text-base text-gray-200 text-center">
              {t("what-bjj-description")}
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
              <Badge className="bg-brand-blue-600 rounded-sm">{t("create")}</Badge>
              <h3 className="text-3xl md:text-4xl font-medium text-brand-blue-50 my-2">
                {t("create-subtitle")}
              </h3>
              <p className="text-sm md:text-base text-gray-200">
                {t("create-description")}
              </p>
            </div>
          </div>
            
          <div className="flex flex-col-reverse md:flex-row items-center mb-20">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <Image src={AppSvg} width={400} height={400} alt="Print screen of the app" className="rounded-lg" />
            </div>
            <div className="md:w-1/2 md:pr-10 md:pl-0 px-4">
              <Badge className="bg-brand-blue-600 rounded-sm">{t("badge-description")}</Badge>
              <h3 className="text-3xl md:text-4xl font-medium text-brand-blue-50 my-2">
                {t("your-portifolio")}
              </h3>
              <p className="text-sm md:text-base text-gray-200">
                {t("your-portifolio-description")}
              </p>
            </div>
          </div>

          <div className="flex flex-col-reverse md:flex-row-reverse items-center md:py-16">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <Image src={AtlheteWomanSvg} width={400} height={400} alt="Athlete woman with a cell phone" className="rounded-lg" />
            </div>
            <div className="md:w-1/2 md:pr-10 md:pl-0 px-4">
              <Badge className="bg-brand-blue-600 rounded-sm">{t("social-media-badge")}</Badge>
              <h3 className="text-3xl md:text-4xl font-medium text-brand-blue-50 my-2">
                {t("social-media-title")}
              </h3>
              <p className="text-sm md:text-base text-gray-200">
                {t("social-media-description")}
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto md:px-12 pt-10 md:py-20" id="plans">
          <div className="container mx-auto px-4">
            <h2 className="text-xl md:text-3xl text-center font-semibold text-brand-blue-50">
              {t("our-plans-title")}
            </h2>
            <p className="text-sm md:text-base text-gray-200 text-center">
              {t("our-plans-subtitle")}
            </p>
            <PricingComponent handleSelectPlan={selectPlan} />
          </div>
        </section>
        <div className="md:block hidden py-10 md:px-12">
          <Separator className="bg-gray-600"/>
        </div>

        <section className="mx-auto pt-10 md:py-20 mb-16">
          <div className="container mx-auto px-4 mb-4">
            <h2 className="text-xl md:text-3xl text-center font-semibold text-brand-blue-50">
              {t("testimonials-title")}
            </h2>
            <p className="text-sm md:text-base text-gray-200 text-center">
              {t("testimonials-subtitle")}
            </p>
          </div>
          <TestimonialCarousel />
        </section>

        <section className="bg-transparent px-4 md:px-0">
          <div className="container flex flex-col items-center justify-center bg-gray-900 rounded-2xl max-w-[930px] mx-auto p-8 md:px-52 md:py-16">
            <div className="container mx-auto px-4 mb-4">
              <h2 className="text-xl md:text-3xl text-center font-semibold text-brand-blue-50 mb-2">
                {t("create-portifolio-now-title")}
              </h2>
              <p className="text-sm md:text-base text-gray-200 text-center">
                {t("create-portifolio-now-subtitle")}
              </p>
            </div>
            <Button className="max-w-44 text-white bg-brand-blue-600 hover:bg-brand-blue-700 mt-1">{t("start-now")}</Button>
          </div>
        </section>

        <section className="mx-auto pt-10 md:py-20 mb-16" id="blog">
          <div className="container mx-auto px-4 mb-4 flex flex-row justify-between items-end">
            <div>
              <h4 className="text-xl md:text-3xl font-semibold text-brand-blue-50 mb-2">
                {t("blog-title")}
              </h4>
              <p className="text-sm md:text-base text-gray-200">
                {t("blog-description")}
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
              {t("faq-title")}
            </h5>
            <p className="text-sm md:text-base text-gray-200 text-center">
              {t("faq-subtitle")}
            </p>
          </div>
          <FaqCards />
        </section>
      </main>

      <Footer />
    </div>
  )
}