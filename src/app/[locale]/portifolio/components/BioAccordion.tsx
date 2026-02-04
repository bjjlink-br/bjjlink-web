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
import { KEYS_STORAGE } from '@/utils/constants'
import { useEffect, useState, useMemo } from 'react'
import { DataSections } from '@/utils/dataSections'
import { useEditMode } from '@/contexts/EditModeContext'

export function BioAccordion() {
  const t = useTranslations("create-portfolio");
  const locale = useLocale()
  const { dataSections ,setDataSections } = useDataSections();
  const [loading, setLoading] = useState(false);
  
  // Verifica se está em modo de edição (com fallback para modo criação)
  const { isEditMode, storageKey } = useMemo(() => {
    try {
      const editModeContext = useEditMode();
      return {
        isEditMode: editModeContext.isEditMode,
        storageKey: editModeContext.getStorageKey()
      };
    } catch {
      // Se não estiver dentro do EditModeProvider, usa o modo padrão (criação)
      return {
        isEditMode: false,
        storageKey: KEYS_STORAGE.sections
      };
    }
  }, []);

  const updateBiographyText = (order: number, text: string) => {
    // Tratamento especial para o campo de URL (order === 4)
    let processedText = text;
    
    if (order === 4) {
      // Remove http:// ou https:// do início do texto para exibição no campo
      processedText = text.replace(/^(https?:\/\/)/i, '');
    }
    
    setDataSections((prev) => {
      const existingTexts = prev.biography.texts || [];
  
      // Garante que todos os 4 campos estejam preenchidos, mesmo que seja com texto vazio
      const orders = [1, 2, 3, 4];
      const filledTexts = orders.map((ord) => {
        if (ord === order) {
          return { order: ord, text: processedText }; // atualiza o que está sendo alterado agora
        }
  
        const existing = existingTexts.find((t) => t.order === ord);
        return { order: ord, text: existing?.text || "" }; // mantém valor anterior ou vazio
      });
  
      return {
        ...prev,
        biography: {
          type: "BIOGRAPHY",
          texts: filledTexts,
        },
      };
    });
  };

  // Função auxiliar para pegar o texto pelo order
  const getBiographyText = (order: number) => dataSections.biography.texts?.find((tx) => tx.order === order)?.text || '';
  

  const handleSave = async () => {
    setLoading(true);
    const token = localStorage.getItem(AUTH_STORAGE_KEY);
    const tokenObj = JSON.parse(token!);

    if(dataSections.biography.texts) {
      // Cria uma cópia dos textos para não modificar o estado diretamente
      const processedTexts = dataSections.biography.texts.map(item => {
        // Se for o campo de URL (order === 4) e não estiver vazio
        if (item.order === 4 && item.text) {
          // Verifica se o texto já começa com http:// ou https://
          if (!item.text.match(/^(https?:\/\/)/i)) {
            // Adiciona https:// no início do texto
            return { ...item, text: `https://${item.text}` };
          }
        }
        return item;
      });

      await saveSectionPortifolioWIthouFormData(tokenObj.acess_token as string, locale, {
        type: 'BIOGRAPHY',
        texts: processedTexts
      }).then(() => {
        // Mantém o estado local sem o prefixo para exibição no campo
        const updated = {
          ...dataSections,
          biography: {
            type: 'BIOGRAPHY',
            texts: dataSections.biography.texts
          }
        };

        localStorage.setItem(storageKey, JSON.stringify(updated));

        toast({
          title: `${t("steps.profile.toast-success")}`,
          duration: 3000,
        });
      }).catch(error => {
        console.log(error)
      }).finally(() => {
        setLoading(false);
      });
    }
  }

  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      const parsed: DataSections = JSON.parse(stored);
      setDataSections(parsed);
    }
  },[locale, setDataSections, storageKey])

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
                  <h1 className="text-base font-bold no-underline text-gray-50 font-secondary">{t("steps.bio.title")}</h1>
                  <p className='text-gray-200 text-sm font-secondary'>{t("steps.bio.description")}</p>
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
                <h2 className="text-lg font-medium">{t("steps.bio.title")}</h2>
                <div className="space-y-2">
                  <Label htmlFor="headline" className='text-gray-200 font-secondary text-sm'>{t("steps.bio.headline")}</Label>
                  <Input
                    id="headline"
                    value={getBiographyText(1)}
                    onChange={(e) => updateBiographyText(1, e.target.value)}
                    maxLength={150}
                    placeholder="Meu objetivo como atleta!"
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                  <div className="text-xs text-gray-400 text-right">
                    {dataSections.biography.texts?.[0]?.text.length || '0'}/150
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="supportingText" className='text-gray-200 font-secondary text-sm'>{t("steps.bio.supporting-text")}</Label>
                  <Textarea
                    id="supportingText"
                    value={getBiographyText(2)}
                    onChange={(e) => updateBiographyText(2, e.target.value)}
                    maxLength={200}
                    placeholder="Com disciplina e maestria, BJJ Master é um ícone do jiu-jitsu..."
                    className="bg-gray-800 border-gray-600 text-white min-h-[100px]"
                  />
                  <div className="text-xs text-gray-400 text-right">
                    {dataSections.biography.texts?.[1]?.text.length || '0'}/200
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-lg font-medium">{t("steps.bio.button-section")}</h2>
                <div className="space-y-2">
                  <Label htmlFor="buttonName" className='text-gray-200 font-secondary text-sm'>{t("steps.bio.button-name")}</Label>
                  <Input
                    id="buttonName"
                    value={getBiographyText(3)}
                    onChange={(e) => updateBiographyText(3, e.target.value)}
                    maxLength={20}
                    placeholder="Vamos conversar"
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                  <div className="text-xs text-gray-400 text-right">
                    {dataSections.biography.texts?.[2]?.text.length || '0'}/20
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="buttonUrl">{t("steps.bio.button-link")}</Label>
                  <div className="flex">
                    <div className="bg-gray-1100 px-3 py-2 rounded-l-md border border-r-0 border-gray-700 text-[#D0D1D3]">
                      https://
                    </div>
                    <Input
                      id="buttonUrl"
                      value={getBiographyText(4)}
                      onChange={(e) => updateBiographyText(4, e.target.value)}
                      placeholder={t("steps.bio.button-link-placeholder")}
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
                <Save className="w-4 h-4" />
                {loading ? t('steps.bio.loading') : t('steps.bio.save-button')}
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}