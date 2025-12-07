"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Facebook, Instagram, Twitter } from "lucide-react";
import { useDataSections } from "@/contexts/DataSectionsContext";
import { useTranslations } from "next-intl";
import React, { useRef } from "react";

export const PreviewPortifolio = () => {
  const { dataSections } = useDataSections();
  const t = useTranslations("preview");

  const exampleImage = 'https://i.ibb.co/gFg9NLy1/young-woman-doing-karate.jpg';
  const exampleImage2 = "https://i.ibb.co/SDV9sVSf/black-belt-athlete-practicing-jujitsu-with-determination-generative-ai.jpg"
  const examplegallery = [exampleImage, exampleImage2, exampleImage2, exampleImage]

  const handleGoTo = (route: string | null) => {
    if(route) {
      window.open(`${route}`, '_blank', 'noopener,noreferrer');
    }
  }

  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmount = 100;
    if (direction === "left") {
      scrollRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    } else {
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // Função para obter a URL da imagem, tratando tanto File quanto string
  // const getImageUrl = (image: File | string | null): string => {
  //   if (!image) return exampleImage;
  //   return typeof image === 'string' ? image : URL.createObjectURL(image);
  // };

  const getImageUrl = (image: any): string => {
    if (!image) {
      return exampleImage;
    }
  
    // Se for string (URL direta)
    if (typeof image === 'string') {
      return image;
    }
  
    // Se for File (arquivo local)
    if (image instanceof File) {
      const url = URL.createObjectURL(image);
      return url;
    }
  
    // Se for objeto (GalleryImage ou RemoteImage)
    if (typeof image === 'object') {
      
      // Para GalleryImage, sempre usar preview
      if (image.preview) {
        return image.preview;
      }
      // Fallback para url (compatibilidade com formato antigo)
      if (image.url) {
        return image.url;
      }
      // Se tem file, cria URL
      if (image.file && image.file instanceof File) {
        const url = URL.createObjectURL(image.file);
        return url;
      }
      // Se tem name e é string, pode ser uma URL
      if (typeof image.name === 'string' && image.name.startsWith('http')) {
        return image.name;
      }
    }
  
    return exampleImage;
  };

  // Obter imagens para a galeria de forma segura
  const getGalleryImages = () => {
    // Se for galeria e tiver imagens, retorna elas
    if (dataSections.gallery.type === 'GALLERY' && dataSections.gallery.imagesGallery?.length) {
      return dataSections.gallery.imagesGallery;
    }
    // Se for perfil e tiver imagem, retorna array com essa imagem
    if (dataSections.gallery.type === 'PROFILE' && dataSections.gallery.image) {
      return [dataSections.gallery.image];
    }
    // Caso contrário, retorna as imagens padrão
    return examplegallery;
  };

  const galleryImages = getGalleryImages();

  // Limpeza das URLs quando o componente for desmontado
  React.useEffect(() => {
    return () => {
      if (galleryImages && Array.isArray(galleryImages)) {
        galleryImages.forEach((image: any) => {
          if (image && typeof image === 'object' && image.preview && !image.isRemote && image.file) {
            URL.revokeObjectURL(image.preview);
          }
        });
      }
    };
  }, [galleryImages]);

  return (
    <div className="relative w-[320px] h-[650px] bg-black rounded-[50px] overflow-hidden shadow-xl border-8 border-gray-800">
      {/* Notch */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-6 bg-black rounded-b-3xl"></div>
      
      {/* Screen content */}
      <div className="absolute top-6 left-0 right-0 bottom-6 bg-gray-1300 overflow-y-auto">
        <Card className="w-full h-full bg-gray-1300 text-white border-none rounded-none">
          <CardContent className="p-4 space-y-4">
            <div className="flex items-center gap-3">
              <Image
                key={dataSections.profile.image ? `${dataSections.profile.image}` : exampleImage}
                src={getImageUrl(dataSections.profile.image || null)} 
                alt="Profile"
                width={40}
                height={40}
                className="rounded-full h-10 w-10 object-cover"
              />
              <div>
                {dataSections.profile.texts?.map((tx) => (
                  <React.Fragment key={tx.order}>
                    <div className="font-semibold break-words whitespace-normal">
                      {tx.text || "BJJ Master"}
                    </div>
                    {tx.order !== 1 && (
                      <div className="text-xs text-zinc-400">
                        {tx.text || "Atleta/BR"}
                      </div>
                    )}
                  </React.Fragment>
                ))}
                {!dataSections.profile.texts?.length && (
                  <>
                    <div className="font-semibold">BJJ Master</div>
                    <div className="text-xs text-zinc-400">Atleta/BR</div>
                  </>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="font-semibold text-sm">
                {dataSections.biography.texts?.[0]?.text || 'Meu objetivo como atleta!'}
              </h2>
              <p className="text-xs text-zinc-400">
                {dataSections.biography.texts?.[1]?.text || 'Com disciplina e maestria, BJJ Master é um ícone do jiu-jitsu. Sua jornada é uma fusão de valores e superação, inspirando outros a alcançarem seus objetivos. Além do tatame, ele inspira como mestre, mostrando que a paixão e a determinação transcendem fronteiras.'}
              </p>
            </div>

            <Button 
              className="w-full md:w-40 bg-brand-blue-600 hover:bg-brand-blue-700 text-xs py-2 rounded-md" 
              onClick={() => handleGoTo(dataSections.biography.texts?.[3]?.text || null)}
            >
              {dataSections.biography.texts?.[2]?.text || 'Vamos conversar'}
            </Button>

            <div className="space-y-2">
              <h3 className="font-semibold text-sm">{t("my-networks")}</h3>
              <div className="flex gap-4">
                <Facebook className="w-4 h-4 text-brand-blue-300 hover:text-brand-blue-400 cursor-pointer" />
                <Instagram className="w-4 h-4 text-brand-blue-300 hover:text-brand-blue-400 cursor-pointer" />
                <Twitter className="w-4 h-4 text-brand-blue-300 hover:text-brand-blue-400 cursor-pointer" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-sm">{t("about-my-work")}</h3>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="h-6 w-6 p-0" onClick={() => handleScroll("left")}>
                    <ChevronLeft className="h-3 w-3" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-6 w-6 p-0 disabled:cursor-not-allowed" 
                    disabled={galleryImages.length <= 3} 
                    onClick={() => handleScroll("right")}
                  >
                    <ChevronRight className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              <div ref={scrollRef} className="flex gap-2 overflow-x-auto scrollbar-hide">
                {galleryImages.map((image: any, index: number) => (
                  <div key={image?.id || `gallery-${index}-${image?.name || image?.filename || index}`} className="relative flex-shrink-0">
                    <Image
                      src={getImageUrl(image)}
                      alt={`Preview imagem ${index + 1}`}
                      width={80}
                      height={80}
                      className="rounded-lg object-cover h-20 w-20"
                    />
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter className="px-4 py-2 border-t border-zinc-800">
            <p className="text-[10px] text-zinc-500">{t("page-created")}</p>
          </CardFooter>
        </Card>
      </div>

      {/* Home indicator */}
      <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-white rounded-full"></div>
    </div>
  )
}