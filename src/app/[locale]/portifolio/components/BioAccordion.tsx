"use client"

import { BookText, Save } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from '@/hooks/use-toast'
import { useLocale, useTranslations } from 'next-intl'
import { useDataSections } from '@/contexts/DataSectionsContext'
import { AUTH_STORAGE_KEY } from '@/contexts/AuthContext'
import { saveSectionPortifolioWIthouFormData } from '@/services/portifolio.service'

export function BioAccordion() {
  const t = useTranslations("create-portifolio");
  const locale = useLocale()
  const { dataSections ,setDataSections } = useDataSections();

  const updateBiographyText = (order: number, text: string) => {
    setDataSections((prev) => {
      const existingTexts = prev.biography.texts || [];
  
      const updatedTexts = existingTexts.some((tx) => tx.order === order)
        ? existingTexts.map((tx) =>
            tx.order === order ? { ...tx, text } : tx
          )
        : [...existingTexts, { order, text }];
  
      return {
        ...prev,
        biography: {
          type: 'biography',
          texts: updatedTexts,
        },
      };
    });
  };
  

  const handleSave = async () => {
    const token = localStorage.getItem(AUTH_STORAGE_KEY);
    const tokenObj = JSON.parse(token!);

    if(dataSections.biography.texts) {
      const response = await saveSectionPortifolioWIthouFormData(tokenObj.acess_token as string, locale, {
        type: 'biography',
        texts: dataSections.biography.texts
      });
  
      console.log(response)
  
      toast({
        title: `${t("steps.profile.toast-upload-success")}`,
        duration: 3000,
      });
    }
  }

  return (
    <div className="w-full max-w-[575px] space-y-4 bg-gray-900 text-white rounded-lg overflow-hidden">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="profile" className='border-none'>
          <AccordionTrigger className="px-4 py-3 bg-gray-900 hover:bg-gray-800 transition-colors">
            <div className="flex items-center justify-between w-full">
              <div className='flex items-center gap-2'>
                <div className='rounded-md p-2 bg-brand-blue-600/15'>
                  <BookText size={20} color='#85CBFF' />
                </div>
                <div className='flex flex-col items-start'>
                  <h1 className="text-base font-bold no-underline text-gray-50 font-secondary">Sua Bio</h1>
                  <p className='text-gray-200 text-sm font-secondary'>Fale sobre você</p>
                </div>
              </div>
              {/* <div className="flex items-center gap-3 mr-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="bg-semantic-green-500/5 text-semantic-green-500 hover:bg-semantic-green-500/5 hover:text-semantic-green-500"
                >
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="bg-semantic-red-500/5 text-semantic-red-500 hover:bg-semantic-red-500/5 hover:text-semantic-red-500">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div> */}
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="p-4 space-y-6">
              <div className="space-y-4">
                <h2 className="text-lg font-medium">Sua bio</h2>
                <div className="space-y-2">
                  <Label htmlFor="headline" className='text-gray-200 font-secondary text-sm'>Título em destaque</Label>
                  <Input
                    id="headline"
                    value={dataSections.biography.texts?.[0]?.text || ''}
                    onChange={(e) => updateBiographyText(1, e.target.value)}
                    maxLength={150}
                    placeholder="Escreva"
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                  <div className="text-xs text-gray-400 text-right">
                    {dataSections.biography.texts?.[0]?.text || '0'}/150
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="supportingText" className='text-gray-200 font-secondary text-sm'>Texto de apoio</Label>
                  <Textarea
                    id="supportingText"
                    value={dataSections.biography.texts?.[1]?.text || ''}
                    onChange={(e) => updateBiographyText(2, e.target.value)}
                    maxLength={150}
                    placeholder="Escreva"
                    className="bg-gray-800 border-gray-600 text-white min-h-[100px]"
                  />
                  <div className="text-xs text-gray-400 text-right">
                    {dataSections.biography.texts?.[1]?.text || '0'}/150
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-lg font-medium">Botão</h2>
                <div className="space-y-2">
                  <Label htmlFor="buttonName" className='text-gray-200 font-secondary text-sm'>Nome do botão</Label>
                  <Input
                    id="buttonName"
                    value={dataSections.biography.texts?.[2]?.text || ''}
                    onChange={(e) => updateBiographyText(3, e.target.value)}
                    maxLength={50}
                    placeholder="Escreva o nome do botão"
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                  <div className="text-xs text-gray-400 text-right">
                    {dataSections.biography.texts?.[2]?.text || '0'}/50
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="buttonUrl">Link</Label>
                  <div className="flex">
                    <div className="bg-gray-1100 px-3 py-2 rounded-l-md border border-r-0 border-gray-700 text-[#D0D1D3]">
                      http://
                    </div>
                    <Input
                      id="buttonUrl"
                      value={dataSections.biography.texts?.[3]?.text || ''}
                      onChange={(e) => updateBiographyText(4, e.target.value)}
                      placeholder="Colocar link"
                      className="bg-gray-800 border-gray-600 text-white rounded-l-none"
                    />
                  </div>
                </div>
              </div>

              <Button 
                className="w-full bg-transparent border border-gray-100 text-brand-blue-50 hover:bg-transparent font-secondary" 
                size="lg"
                onClick={handleSave}
              >
                <Save className="w-4 h-4" />
                Salvar
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}