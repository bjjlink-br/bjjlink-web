"use client"

import { CircleUserRound, Pencil, Save, Trash2 } from 'lucide-react'
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
import { useState } from 'react'
import { Upload } from '@/components/shared/Upload'

export function PerfilAccordion() {
  const [headline, setHeadline] = useState("")
  const [supportingText, setSupportingText] = useState("")
  const [buttonName, setButtonName] = useState("")
  const [buttonUrl, setButtonUrl] = useState("")

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
                  <h1 className="text-base font-bold no-underline text-gray-50 font-secondary">Seu Perfil</h1>
                  <p className='text-gray-200 text-sm font-secondary'>Fale sobre você</p>
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
                <h2 className="text-lg font-medium">Perfil</h2>
                <Upload />
                <div className="space-y-2">
                  <Label htmlFor="headline" className='text-gray-200 font-secondary text-sm'>Título em destaque</Label>
                  <Input
                    id="headline"
                    value={headline}
                    onChange={(e) => setHeadline(e.target.value)}
                    maxLength={150}
                    placeholder="Escreva"
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                  <div className="text-xs text-gray-400 text-right">
                    {headline.length}/150
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