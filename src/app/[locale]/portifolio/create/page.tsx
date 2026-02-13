"use client"
import * as z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { VerticalMenu } from "@/components/shared/VerticalMenu";
import { Button } from "@/components/ui/button";
import { CirclePlus, Copy } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { PreviewPortifolio } from "../components/PreviewPortifolio";
import { BioAccordion } from '../components/BioAccordion';
import { useEffect, useState } from "react";
import { createPortifolioSchema } from '@/utils/schema';
import { Form } from '@/components/ui/form';
import { PerfilAccordion } from '../components/PerfilAccordion';
import { SocialAccordion } from '../components/SocialAccordion';
import { PhotoGallery } from '../components/PhotoGallery';
import { defaultDataSections, useDataSections } from '@/contexts/DataSectionsContext';
import { validateDataSections, isPortfolioReadyToPublish } from '@/utils/functions';
import { toast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation';
import { GET_COMPONENTS_KEY, USER_DATA_STORAGE_KEY } from '@/contexts/AuthContext';
import { UserAccountInfo } from '@/utils/types';
import { KEYS_STORAGE } from '@/utils/constants';

export default function Create() {
  const t = useTranslations("create-portfolio");
  const router = useRouter();
  const locale = useLocale();
  const [user, setUser] = useState<UserAccountInfo>();
  const [isPublishEnabled, setIsPublishEnabled] = useState(false);
  const form = useForm<z.infer<typeof createPortifolioSchema>>({
    resolver: zodResolver(createPortifolioSchema),
  });
  const [activeSteps, setActiveSteps] = useState([1]);
  const [portfolioData, setPortfolioData] = useState({
    profile: {},
    bio: {},
    socialMedia: {},
    galleryPhotos: [],
  });
  const { dataSections, setDataSections } = useDataSections();

  const addSection = () => {
    // setPortfolioData((prev) => ({ ...prev, [currentStep]: data }));
    setActiveSteps((prev) => [...prev, prev.length + 1]); 
  };

  // const removeSection = (section: number) => {
  //   setActiveSteps((prev) => prev.filter((s) => s !== section));
  // };

  function handleFinalSubmit(values: z.infer<typeof createPortifolioSchema>) {}

  function handlePublishPortifolio() {
    const validate = validateDataSections(dataSections);

    if (!validate.isValid) {
      toast({
        title: `${t("publish.toast.error")}`,
        description: `${validate.errors.join(', ')}`,
        duration: 3000,
      });
      return;
    }

    toast({
      title: `${t("publish.toast.success")}`,
      duration: 3000,
    });
    setDataSections(defaultDataSections);
    localStorage.removeItem(KEYS_STORAGE.sections);
    localStorage.removeItem(GET_COMPONENTS_KEY);
    router.push(`/portifolio/${user?.domain}`);
    router.push(`/dashboard`);
  }

  const handleCopyPotifolioUrl = () => {
    if(!user?.domain) return;
    navigator.clipboard.writeText(`https://bjjlink.com.br/${user?.domain}`);
    toast({
      title: `${t("copy-link-toast.success")}`,
      duration: 3000,
    });
  }

  useEffect(() => {
    const userData = localStorage.getItem(USER_DATA_STORAGE_KEY);
    
    if (!userData) {
      toast({
          title: `${t('toast.title-no-authenticated')}`,
          description: `${t('toast.description-no-authenticated')}`,
          duration: 3000
      });
      router.push(`/${locale}/login`);
    } else {
      setUser(JSON.parse(userData));
    }
  }, [locale, router, t]);

  // Monitora mudanças no localStorage para habilitar/desabilitar o botão de publicar
  useEffect(() => {
    const checkPortfolioStatus = () => {
      setIsPublishEnabled(isPortfolioReadyToPublish());
    };

    // Verifica inicialmente
    checkPortfolioStatus();

    // Monitora mudanças no localStorage
    const handleStorageChange = () => {
      checkPortfolioStatus();
    };

    window.addEventListener('storage', handleStorageChange);

    // Também monitora mudanças no contexto dataSections
    const interval = setInterval(checkPortfolioStatus, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, [dataSections]);

  return (
    <div className="bg-gray-1300 min-h-screen flex">
      <VerticalMenu activeMenu='portifolio' />

      <main className="flex-1 p-8">
          <div className="flex items-start w-full justify-between">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleFinalSubmit)} className="flex flex-col md:flex-row items-start w-full justify-between">
                <div className="flex-1 pr-4">
                  <div className="w-full max-w-xl flex justify-between items-end text-white mb-4">
                    <div>
                      <h1 className="text-xl text-gray-50 font-semibold">{t('title')}</h1>
                      <p className="text-gray-200 text-sm">{t('subtitle')}</p>
                    </div>
                    {/* <button className="text-brand-blue-500 hover:text-blue-400">{t('button-change-layout')}</button> */}
                  </div>

                  <div className="my-4 flex flex-col gap-2">
                    <PerfilAccordion />
                    <BioAccordion />
                    <SocialAccordion />
                    <PhotoGallery />
                  </div>
                  
                  {/* <Button 
                    className="flex gap-1 items-center w-full max-w-xl bg-brand-blue-600 hover:bg-blue-700" 
                    size="lg"
                    onClick={addSection}
                  >
                    <CirclePlus size={18} color="#D8D8E1" />
                    {t('add-section-button')}
                  </Button> */}
                </div>

                <div className="flex flex-col gap-3">
                  <div className='hidden md:block'>
                    <PreviewPortifolio />
                  </div>
                  <Button 
                    className="w-full max-w-xl bg-blue-700 hover:bg-blue-800 disabled:bg-gray-600 disabled:cursor-not-allowed" 
                    size="lg"
                    onClick={handlePublishPortifolio}
                    disabled={!isPublishEnabled}
                  >
                    {t('publish-portifolio-button')}
                  </Button>
                  
                  <Button onClick={handleCopyPotifolioUrl} className="w-full max-w-xl bg-transparent border-gray-100 text-brand-blue-50" variant="outline" size="lg">
                    <Copy size={14} color="#D8D8E1" />
                    {t('copy-link-button')}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </main>
    </div>
  )
}