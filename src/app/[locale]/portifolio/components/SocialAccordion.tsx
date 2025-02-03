"use client"

import { Pencil, Save, Smartphone, Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from 'react'
import { useTranslations } from 'next-intl'

export function SocialAccordion() {
    const t = useTranslations("create-portifolio");
    const [socialUrls, setSocialUrls] = useState({
        facebook: '',
        instagram: '',
        x: ''
    })

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
                            <div className="flex items-center gap-3 mr-2">
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
                            </div>
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
                                            onChange={(e) => setSocialUrls({...socialUrls, facebook: e.target.value})}
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
                                            value={socialUrls.facebook}
                                            onChange={(e) => setSocialUrls({...socialUrls, instagram: e.target.value})}
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
                                            onChange={(e) => setSocialUrls({...socialUrls, x: e.target.value})}
                                            placeholder="Colocar link"
                                            className="bg-gray-800 border-gray-600 text-white rounded-l-none"
                                        />
                                    </div>
                                </div>
                            </div>

                            <Button 
                                className="w-full bg-transparent border border-gray-100 text-brand-blue-50 hover:bg-transparent font-secondary" 
                                size="lg"
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