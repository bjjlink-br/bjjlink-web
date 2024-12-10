import { VerticalMenu } from "@/components/shared/VerticalMenu";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import { useTranslations } from "next-intl";
import { PreviewPortifolio } from "../components/PreviewPortifolio";

export default function Create() {
  const t = useTranslations("create-portifolio");

  return (
    <div className="bg-gray-1300 min-h-screen flex">
      <VerticalMenu />

      <main className="flex-1 p-8">
          <div className="flex items-start w-full justify-between">
            <div className="flex-1">
              <div className="w-full max-w-xl flex justify-between items-end text-white mb-4">
                <div>
                  <h1 className="text-xl text-gray-50 font-semibold">{t('title')}</h1>
                  <p className="text-gray-200 text-sm">{t('subtitle')}</p>
                </div>
                <button className="text-brand-blue-500 hover:text-blue-400">{t('button-change-layout')}</button>
              </div>
              
              <Button className="flex gap-1 items-center w-full max-w-xl bg-brand-blue-600 hover:bg-blue-700" size="lg">
                <CirclePlus size={18} color="#D8D8E1" />
                {t('add-section-button')}
              </Button>
            </div>

            <div>
              <PreviewPortifolio />
              <Button className="w-full max-w-xl bg-blue-600 hover:bg-blue-700 mt-8" size="lg">
                Publicar portfólio
              </Button>
              
              <Button className="w-full max-w-xl" variant="outline" size="lg">
                Copiar link
              </Button>
            </div>
          </div>
        </main>
    </div>
  )
}