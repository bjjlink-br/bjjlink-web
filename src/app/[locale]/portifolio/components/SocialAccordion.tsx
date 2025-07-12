"use client"

import { Loader, Save, Smartphone } from 'lucide-react'
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
import { useDataSections } from '@/contexts/DataSectionsContext'
import { AUTH_STORAGE_KEY } from '@/contexts/AuthContext'
import { saveSectionPortifolioWIthouFormData } from '@/services/portifolio.service'
import { KEYS_STORAGE } from '@/utils/constants'
import { DataSections } from '@/utils/dataSections'

export function SocialAccordion() {
    const t = useTranslations("create-portifolio");
    const locale = useLocale();
    const [loading, setLoading] = useState(false);
    const [socialUrls, setSocialUrls] = useState({
        facebook: '',
        instagram: '',
        x: ''
    })
    const { dataSections ,setDataSections } = useDataSections();

    const updateBiographyText = (order: number, text: string) => {
        setDataSections((prev) => {
        const existingTexts = prev.social_media.texts || [];
    
        const updatedTexts = existingTexts.some((tx) => tx.order === order)
            ? existingTexts.map((tx) =>
                tx.order === order ? { ...tx, text } : tx
            )
            : [...existingTexts, { order, text }];
    
        return {
            ...prev,
            social_media: {
            type: 'social_media',
            texts: updatedTexts,
            },
        };
        });
    };


  const handleSave = async () => {
    setLoading(true);
    const token = localStorage.getItem(AUTH_STORAGE_KEY);
    const tokenObj = JSON.parse(token!);

    if(dataSections.biography.texts) {
      const response = await saveSectionPortifolioWIthouFormData(tokenObj.acess_token as string, locale, {
        type: 'SOCIAL_MEDIA',
        texts: dataSections.social_media.texts
      });
  
      const updated = {
        ...dataSections,
        social_media: {
          type: 'SOCIAL_MEDIA',
          texts: dataSections.social_media.texts
        }
      };
      
      localStorage.setItem(KEYS_STORAGE.sections, JSON.stringify(updated));

      toast({
        title: `${t("steps.social.toast-success")}`,
        duration: 3000,
      });
      setLoading(false);
    }

    setLoading(false)
  }

  useEffect(() => {
    const stored = localStorage.getItem(KEYS_STORAGE.sections);
    if (stored) {
      const parsed: DataSections = JSON.parse(stored);
      setDataSections(parsed);
      setSocialUrls({
        facebook: parsed.social_media.texts?.find(tx => tx.order === 1)?.text || '',
        instagram: parsed.social_media.texts?.find(tx => tx.order === 2)?.text || '',
        x: parsed.social_media.texts?.find(tx => tx.order === 3)?.text || ''
      })
    }
  },[locale, setDataSections])

    return (
        <div className="w-full max-w-[575px] space-y-4 bg-gray-900 text-white rounded-lg overflow-hidden">
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="profile" className='border-none'>
                    <AccordionTrigger className="px-4 py-3 bg-gray-900 hover:bg-gray-800 transition-colors">
                        <div className="flex items-center justify-between w-full">
                            <div className='flex items-center gap-2'>
                                <div className='rounded-md p-2 bg-brand-blue-600/15'>
                                    <Smartphone size={20} color='#85CBFF' />
                                </div>
                                <div className='flex flex-col items-start'>
                                    <h1 className="text-base font-bold no-underline text-gray-50 font-secondary">{t("steps.social.title")}</h1>
                                    <p className='text-gray-200 text-sm font-secondary'>{t("steps.social.subtitle")}</p>
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
                                <div className="space-y-2">
                                    <Label htmlFor="buttonUrl">{t("steps.social.facebook")}</Label>
                                    <div className="flex">
                                        <div className="bg-gray-1100 px-3 py-2 rounded-l-md border border-r-0 border-gray-700 text-[#D0D1D3]">
                                            http://
                                        </div>
                                        <Input
                                            id="facebookURL"
                                            value={socialUrls.facebook}
                                            onChange={(e) => {
                                                setSocialUrls({...socialUrls, facebook: e.target.value})
                                                updateBiographyText(1, e.target.value)
                                            }}
                                            placeholder="Colocar link"
                                            className="bg-gray-800 border-gray-600 text-white rounded-l-none"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="buttonUrl">{t("steps.social.insta")}</Label>
                                    <div className="flex">
                                        <div className="bg-gray-1100 px-3 py-2 rounded-l-md border border-r-0 border-gray-700 text-[#D0D1D3]">
                                            http://
                                        </div>
                                        <Input
                                            id="instagramURL"
                                            value={socialUrls.instagram}
                                            onChange={(e) => {
                                                setSocialUrls({...socialUrls, instagram: e.target.value})
                                                updateBiographyText(2, e.target.value)
                                            }}
                                            placeholder="Colocar link"
                                            className="bg-gray-800 border-gray-600 text-white rounded-l-none"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="buttonUrl">{t("steps.social.x")}</Label>
                                    <div className="flex">
                                        <div className="bg-gray-1100 px-3 py-2 rounded-l-md border border-r-0 border-gray-700 text-[#D0D1D3]">
                                            http://
                                        </div>
                                        <Input
                                            id="xURL"
                                            value={socialUrls.x}
                                            onChange={(e) => {
                                                setSocialUrls({...socialUrls, x: e.target.value})
                                                updateBiographyText(3, e.target.value)
                                            }}
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
                                disabled={loading}
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
        </div>
    )
}