"use client"
import * as z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { VerticalMenu } from "@/components/shared/VerticalMenu";
import { Button } from "@/components/ui/button";
import { Copy, ArrowLeft } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { PreviewPortifolio } from "../../components/PreviewPortifolio";
import { BioAccordion } from '../../components/BioAccordion';
import { useEffect, useState } from "react";
import { createPortifolioSchema } from '@/utils/schema';
import { Form } from '@/components/ui/form';
import { PerfilAccordion } from '../../components/PerfilAccordion';
import { SocialAccordion } from '../../components/SocialAccordion';
import { PhotoGallery } from '../../components/PhotoGallery';
import { useDataSections } from '@/contexts/DataSectionsContext';
import { validateDataSections, isPortfolioReadyToPublish } from '@/utils/functions';
import { toast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation';
import { USER_DATA_STORAGE_KEY } from '@/contexts/AuthContext';
import { UserAccountInfo } from '@/utils/types';
import { KEYS_STORAGE } from '@/utils/constants';
import { usePortifolioByDomain } from '@/hooks/usePortifolio';
import PortfolioLoadingSkeleton from '@/components/shared/PortfolioLoadingSkeleton';
import Link from 'next/link';
import { EditModeProvider } from '@/contexts/EditModeContext';

export default function EditPortfolio({ params }: { params: { id: string } }) {
  const t = useTranslations("create-portfolio");
  const router = useRouter();
  const locale = useLocale();
  const [user, setUser] = useState<UserAccountInfo>();
  const [isPublishEnabled, setIsPublishEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Busca dados do portfólio da API
  const { data: portfolioData, isLoading: isLoadingPortfolio, isError } = usePortifolioByDomain(params.id);
  
  const form = useForm<z.infer<typeof createPortifolioSchema>>({
    resolver: zodResolver(createPortifolioSchema),
  });
  
  const { dataSections, setDataSections } = useDataSections();

  // Função para converter dados da API para o formato do contexto
  const convertApiDataToSections = (apiData: any[]) => {
    const sections = {
      profile: { type: 'PROFILE' as const, image: null, texts: [] },
      biography: { type: 'BIOGRAPHY' as const, texts: [] },
      social_media: { type: 'SOCIAL_MEDIA' as const, texts: [] },
      gallery: { type: 'GALLERY' as const, imagesGallery: [] }
    };

    apiData.forEach((section: any) => {
      switch (section.type) {
        case 'PROFILE':
          sections.profile = {
            type: 'PROFILE',
            image: section.images?.[0]?.url || null,
            texts: section.texts || []
          };
          break;
        case 'BIOGRAPHY':
          sections.biography = {
            type: 'BIOGRAPHY',
            texts: section.texts || []
          };
          break;
        case 'SOCIAL_MEDIA':
          sections.social_media = {
            type: 'SOCIAL_MEDIA',
            texts: section.texts || []
          };
          break;
        case 'GALLERY':
          sections.gallery = {
            type: 'GALLERY',
            imagesGallery: section.images?.map((img: any, index: number) => ({
              id: img.id || `api-${index}-${Date.now()}`,
              name: img.filename,
              preview: img.url,
              isRemote: true
            })) || []
          };
          break;
      }
    });

    return sections;
  };

  function handleFinalSubmit(values: z.infer<typeof createPortifolioSchema>) {
    console.log(values);
  }

  function handleUpdatePortfolio() {
    const validate = validateDataSections(dataSections);

    if (!validate.isValid) {
      toast({
        title: "Erro na validação",
        description: `${validate.errors.join(', ')}`,
        duration: 3000,
      });
      return;
    }

    toast({
      title: "Portfólio atualizado com sucesso!",
      duration: 3000,
    });
    
    // Redireciona para o dashboard após atualizar
    router.push(`/${locale}/dashboard`);
  }

  const handleCopyPotifolioUrl = () => {
    if(!user?.domain) return;
    navigator.clipboard.writeText(`https://bjjlink.com.br/${user?.domain}`);
    toast({
      title: "Link copiado com sucesso!",
      duration: 3000,
    });
  }

  useEffect(() => {
    const userData = localStorage.getItem(USER_DATA_STORAGE_KEY);
    
    if (!userData) {
      toast({
          title: "Usuário não autenticado",
          description: "Faça login para continuar",
          duration: 3000
      });
      router.push(`/${locale}/login`);
    } else {
      setUser(JSON.parse(userData));
    }
  }, [locale, router]);

  // Carrega dados do portfólio quando disponível
  useEffect(() => {
    if (portfolioData && portfolioData.length > 0) {
      const convertedSections = convertApiDataToSections(portfolioData);
      setDataSections(convertedSections);
      
      // Salva no localStorage para que os componentes funcionem (usando chave específica para edição)
      localStorage.setItem(KEYS_STORAGE.sectionsEdit, JSON.stringify(convertedSections));
      setIsLoading(false);
    }
  }, [portfolioData, setDataSections]);

  // Monitora mudanças no localStorage para habilitar/desabilitar o botão de atualizar
  useEffect(() => {
    const checkPortfolioStatus = () => {
      setIsPublishEnabled(isPortfolioReadyToPublish(KEYS_STORAGE.sectionsEdit));
    };

    checkPortfolioStatus();
    const interval = setInterval(checkPortfolioStatus, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [dataSections]);

  if (isLoadingPortfolio || isLoading) {
    return <PortfolioLoadingSkeleton />;
  }

  if (isError || !portfolioData || portfolioData.length === 0) {
    return (
      <div className="bg-gray-1300 min-h-screen flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-2xl font-bold mb-4">Portfólio não encontrado</h1>
          <p className="mb-4">O portfólio que você está tentando editar não foi encontrado.</p>
          <Link href={`/${locale}/dashboard`}>
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar ao Dashboard
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <EditModeProvider isEditMode={true}>
      <div className="bg-gray-1300 min-h-screen flex">
        <VerticalMenu activeMenu='edit-portifolio' />

        <main className="flex-1 p-8">
            <div className="flex items-start w-full justify-between">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleFinalSubmit)} className="flex flex-col md:flex-row items-start w-full justify-between">
                  <div className="flex-1 pr-4">
                    <div className="w-full max-w-xl flex justify-between items-end text-white mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Link href={`/${locale}/dashboard`}>
                            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                              <ArrowLeft className="w-4 h-4" />
                            </Button>
                          </Link>
                          <h1 className="text-xl text-gray-50 font-semibold">{t("edit-title")}</h1>
                        </div>
                        <p className="text-gray-200 text-sm">{t("edit-subtitle")}</p>
                      </div>
                    </div>

                    <div className="my-4 flex flex-col gap-2">
                      <PerfilAccordion />
                      <BioAccordion />
                      <SocialAccordion />
                      <PhotoGallery />
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <div className='hidden md:block'>
                      <PreviewPortifolio />
                    </div>
                    <Button 
                      className="w-full max-w-xl bg-blue-700 hover:bg-blue-800 disabled:bg-gray-600 disabled:cursor-not-allowed" 
                      size="lg"
                      onClick={handleUpdatePortfolio}
                      disabled={!isPublishEnabled}
                    >
                      {t("publish-portifolio-button")}
                    </Button>
                    
                    <Button onClick={handleCopyPotifolioUrl} className="w-full max-w-xl bg-transparent border-gray-100 text-brand-blue-50" variant="outline" size="lg">
                      <Copy size={14} color="#D8D8E1" />
                      {t("copy-link-button")}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </main>
      </div>
    </EditModeProvider>
  )
}
