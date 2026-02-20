"use client"

import { CircleUserRound, Loader, Save } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { toast } from '@/hooks/use-toast'
import { Toaster } from "@/components/ui/toaster"
import { UploadSingleImage } from '@/components/shared/UploadSingleImage'
import { useDataSections } from '@/contexts/DataSectionsContext'
import { AUTH_STORAGE_KEY } from '@/contexts/AuthContext'
import { saveSectionPortifolio } from '@/services/portifolio.service'
import { useRouter } from 'next/navigation'
import { DataSections } from '@/utils/dataSections'
import { useEditMode } from '@/contexts/EditModeContext'

export function PerfilAccordion() {
  const t = useTranslations("create-portfolio");
  const locale = useLocale()
  const router = useRouter()
  const { dataSections ,setDataSections } = useDataSections();
  const [loading, setLoading] = useState(false);
  
  const { getStorageKey } = useEditMode();
  const storageKey = getStorageKey();

  const [headline, setHeadline] = useState("")

  const handleImageUpload = async (file: File | null) => {
    try {
      setDataSections((prev) => ({
        ...prev,
        profile: {
          type: 'PROFILE',
          image: file,
          texts: [
            {
              order: 1,
              text: headline
            }
          ]
        },
      }));
    } catch (error) {
      console.log(error)
      toast({
        title: `${t("steps.profile.toast-upload-error")}`,
        variant: "destructive",
        duration: 3000,
      });
    }
  }

  const handleSubmitSave = async () => {
    setLoading(true)
    const token = localStorage.getItem(AUTH_STORAGE_KEY);
    const tokenObj = JSON.parse(token!)

    if(dataSections.profile.image && !!headline.length) {
      const formData = new FormData();

      // 1. Adiciona o arquivo (ou vários arquivos, se quiser)
      formData.append('images', dataSections.profile.image as any) // Se tiver mais de um, faça um loop

      // 2. Adiciona os campos normais, mas precisa converter para string os que são objetos
      formData.append('type', 'PROFILE')

      formData.append('texts', JSON.stringify([
        { order: 1, text: headline },
      ]))

      
      await saveSectionPortifolio(tokenObj.acess_token as string, locale, formData)
      .then(response => {

        const updated = {
          ...dataSections,
          profile: {
            type: 'PROFILE',
            image: response.images[0].url,
            texts: [
              {
                order: 1,
                text: response.texts[0].text
              }
            ]
          }
        };

        localStorage.setItem(storageKey, JSON.stringify(updated));

        toast({
          title: `${t("steps.profile.toast-upload-success")}`,
          duration: 3000,
        });
      })
      .catch(error => {
        console.log(error)
      })
      .finally(() => {
        setLoading(false);
      });
  
    }
  }

  useEffect(() => {
    const token = localStorage.getItem(AUTH_STORAGE_KEY);
    if(!token){
      router.push(`/${locale}/login`);
    }

    const stored = localStorage.getItem(storageKey);
    if (stored) {
      const parsed: DataSections = JSON.parse(stored);

      setHeadline(parsed.profile.texts?.[0]?.text || "");
      setDataSections(parsed);
    }
  },[locale, router, setDataSections, storageKey])

  return (
    <div className="w-full max-w-[575px] space-y-4 bg-gray-900 text-white rounded-lg overflow-hidden">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="profile" className='border-none'>
          <AccordionTrigger className="px-4 py-3 bg-gray-900 hover:bg-gray-800 transition-colors">
            <div className="flex items-center justify-between w-full">
              <div className='flex items-center gap-2'>
                <div className='rounded-md p-2 bg-brand-blue-600/15'>
                  <CircleUserRound size={20} color='#85CBFF' />
                </div>
                <div className='flex flex-col items-start'>
                  <h1 className="text-base font-bold no-underline text-gray-50 font-secondary">{t("steps.profile.title")}</h1>
                  <p className='text-gray-200 text-sm font-secondary'>{t("steps.profile.subtitle")}</p>
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
                <h2 className="text-lg font-medium">{t("steps.profile.description")}</h2>
                <UploadSingleImage  
                  className='border-dashed border-2 border-brand-blue-600 bg-brand-blue-600/15 cursor-pointer' 
                  maxSize={5} 
                  onImageUpload={handleImageUpload}
                />
                <div className="space-y-2">
                  <Label htmlFor="headline" className='text-gray-200 font-secondary text-sm'>Título em destaque</Label>
                  <Input
                    id="headline"
                    value={headline}
                    onChange={(e) => {
                      setHeadline(e.target.value);
                      setDataSections((prev) => ({
                        ...prev,
                        profile: {
                          type: 'PROFILE',
                          image: prev.profile.image,
                          texts: [
                            {
                              order: 1,
                              text: e.target.value
                            }
                          ]
                        },
                      }));
                    }}
                    maxLength={22}
                    placeholder="Escreva"
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                  <div className="text-xs text-gray-400 text-right">
                    {headline.length}/22
                  </div>
                </div>
              </div>

              <Button 
                className="w-full bg-transparent border border-gray-100 text-brand-blue-50 hover:bg-transparent font-secondary disabled:cursor-not-allowed" 
                size="lg"
                disabled={loading || !headline.length}
                onClick={handleSubmitSave}
              >
                {loading? (
                  <>
                    <Loader className="w-4 h-4" />
                    Carregando...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Salvar
                  </>
                )}
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Toaster />
    </div>
  )
}
