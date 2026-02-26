"use client"

import PortfolioLoadingSkeleton from "@/components/shared/PortfolioLoadingSkeleton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { usePortifolioByDomain } from "@/hooks/usePortifolio";
import { ChevronLeft, ChevronRight, Facebook, Instagram, Twitter } from "lucide-react";
import Image from "next/image";
import React, { useRef } from "react";

type ImageObject = { preview?: string; url?: string };
type ImageType = string | ImageObject | File | null;

type RemoteImage = {
    url?: string;
    preview?: string;
    filename?: string;
    order?: string | number;
};

type PortfolioSection = {
    _id?: string;
    type: "PROFILE" | "BIOGRAPHY" | "SOCIAL_MEDIA" | "GALLERY";
    account_id?: string;
    images?: RemoteImage[];
    texts?: { order: number; text: string }[];
    image?: ImageType;
};

export default function PortifolioViewPage({ params }: { params: { id: string } }) {
    const { data, isLoading, isError } = usePortifolioByDomain(params.id);
    const scrollRef = useRef<HTMLDivElement>(null);

    const exampleImage = 'https://i.ibb.co/gFg9NLy1/young-woman-doing-karate.jpg';
    const exampleImage2 = "https://i.ibb.co/SDV9sVSf/black-belt-athlete-practicing-jujitsu-with-determination-generative-ai.jpg";

    const getImageUrl = (image: ImageType | RemoteImage | undefined): string => {
        if (!image) return exampleImage;
      
        if (typeof image === 'string') {
          return image;
        }
      
        if (image instanceof File) {
          return URL.createObjectURL(image);
        }

        if (typeof image === 'object') {
          const imageObj = image as ImageObject & RemoteImage;
          if (imageObj.preview) {
            return imageObj.preview;
          }
          if (imageObj.url) {
            return imageObj.url;
          }
        }
      
        return exampleImage;
    };

    const sections = (data ?? []) as PortfolioSection[];

    const getTextByOrder = (section: PortfolioSection | undefined, order: number) => {
      return section?.texts?.find((text) => text.order === order)?.text?.trim() ?? "";
    };

    const normalizeLink = (url?: string) => {
      if (!url) return "";
      if (/^https?:\/\//i.test(url)) return url;
      return `https://${url}`;
    };

    const profileSection = sections.find((section) => section.type === "PROFILE");
    const biographySection = sections.find((section) => section.type === "BIOGRAPHY");
    const socialSection = sections.find((section) => section.type === "SOCIAL_MEDIA");
    const gallerySection = sections.find((section) => section.type === "GALLERY");

    const profileTitle = getTextByOrder(profileSection, 1) || "BJJ Master";
    const profileSubtitle = getTextByOrder(profileSection, 2) || "Atleta/BR";
    const biographyTitle = getTextByOrder(biographySection, 1) || "Meu objetivo como atleta!";
    const biographyDescription = getTextByOrder(biographySection, 2) || "Com disciplina e maestria, BJJ Master é um ícone do jiu-jitsu. Sua jornada é uma fusão de valores e superação, inspirando outros a alcançarem seus objetivos. Além do tatame, ele inspira como mestre, mostrando que a paixão e a determinação transcendem fronteiras.";
    const biographyButtonLabel = getTextByOrder(biographySection, 3) || "Vamos conversar";
    const biographyButtonLink = normalizeLink(getTextByOrder(biographySection, 4));

    const socialLinks = {
      facebook: normalizeLink(getTextByOrder(socialSection, 1)),
      instagram: normalizeLink(getTextByOrder(socialSection, 2)),
      twitter: normalizeLink(getTextByOrder(socialSection, 3)),
    };

    console.log('AQUI ->',socialLinks)

    const profileImageSource = profileSection?.images?.[0] ?? profileSection?.image ?? null;
    const galleryTitle = getTextByOrder(gallerySection, 1) || "Sobre o meu trabalho";

    const galleryImages = (gallerySection?.images?.length ? gallerySection.images : [exampleImage, exampleImage2, exampleImage2, exampleImage]) as (RemoteImage | ImageType)[];

    const handleScroll = (direction: "left" | "right") => {
      if (!scrollRef.current) return;
      const scrollAmount = 100;
      if (direction === "left") {
        scrollRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      } else {
        scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    };

    const handleOpenLink = (url?: string) => {
      if (!url) return;
      window.open(url, '_blank', 'noopener,noreferrer');
    };

    if(isLoading) {
        return <PortfolioLoadingSkeleton />
    }

    return (
        <div className="min-h-screen bg-[#0D0D18]">
            <div className="max-w-[490px] mx-auto py-12">
                {!isLoading && !isError && data && data.length > 0 && (
                    <Card className="w-full h-full bg-gray-1300 text-white border-none rounded-none">
                        <CardContent className="p-4 space-y-4">
                            <div className="flex items-center gap-3">
                                <Image
                                    src={getImageUrl(profileImageSource)} 
                                    alt="Profile photo"
                                    width={40}
                                    height={40}
                                    className="rounded-full h-10 w-10 object-cover"
                                />
                                <div>
                                    <div className="font-semibold">{profileTitle}</div>
                                    {profileSubtitle && (
                                      <div className="text-xs text-zinc-400">{profileSubtitle}</div>
                                    )}
                                </div>
                            </div>
                            <div className="space-y-2 mt-8">
                                <h2 className="font-semibold text-2xl">
                                    {biographyTitle}
                                </h2>
                                <p className="text-base text-zinc-400">
                                    {biographyDescription}
                                </p>
                            </div>
                            <Button
                                className="mt-4 w-full md:w-40 bg-brand-blue-600 hover:bg-brand-blue-700 text-xs py-2 rounded-full font-semibold" 
                                onClick={() => handleOpenLink(biographyButtonLink)}
                                disabled={!biographyButtonLink}
                            >
                                {biographyButtonLabel}
                            </Button>
                            <div className="space-y-2 mt-8">
                                <h3 className="font-semibold text-xl">Minhas redes:</h3>
                                <div className="flex gap-4">
                                    {socialLinks.facebook.length > 0 && (
                                        <Button 
                                            variant="ghost" 
                                            size="icon" 
                                            className="h-6 w-6 p-0" 
                                            onClick={() => handleOpenLink(socialLinks.facebook)}
                                        >
                                            <Facebook 
                                                className={`w-6 h-6 ${socialLinks.facebook ? "text-brand-blue-300 hover:text-brand-blue-400 cursor-pointer" : "text-zinc-600"}`}
                                            />
                                        </Button>
                                    )}
                                    {socialLinks.instagram.length > 0 && (
                                        <Button 
                                            variant="ghost" 
                                            size="icon" 
                                            className="h-6 w-6 p-0" 
                                            onClick={() => handleOpenLink(socialLinks.instagram)}
                                        >
                                            <Instagram 
                                                className={`w-6 h-6 ${socialLinks.instagram ? "text-brand-blue-300 hover:text-brand-blue-400 cursor-pointer" : "text-zinc-600"}`}
                                            />
                                        </Button>
                                    )}
                                    {socialLinks.twitter.length > 0 && (
                                        <Button 
                                            variant="ghost" 
                                            size="icon" 
                                            className="h-6 w-6 p-0" 
                                            onClick={() => handleOpenLink(socialLinks.twitter)}
                                        >
                                            <Twitter 
                                                className={`w-6 h-6 ${socialLinks.twitter ? "text-brand-blue-300 hover:text-brand-blue-400 cursor-pointer" : "text-zinc-600"}`}
                                            />
                                        </Button>
                                    )}
                                </div>
                            </div>
                            <div className="space-y-2 mt-8">
                                <div className="flex justify-between items-center">
                                    <h3 className="font-semibold text-sm">{galleryTitle}</h3>
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
                                    {galleryImages.map((image, index) => (
                                        <div key={`preview-${index}`} className="relative flex-shrink-0">
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
                        <CardFooter className="py-2 border-t border-zinc-800">
                            <p className="text-base text-zinc-500">Página criada na plataforma <a className="font-semibold no-underline" href="https://bjjlink.com.br" target="_blank">BjjLink</a></p>
                        </CardFooter>
                    </Card>
                )}
                {!isLoading && isError && (
                    <div className="flex flex-col gap-2 items-center justify-center">
                        <h2 className="font-semibold text-2xl">
                            Erro ao carregar o portifólio.
                        </h2>
                        <Button
                            className="mt-4 w-full md:w-40 bg-brand-blue-600 hover:bg-brand-blue-700 text-xs py-2 rounded-full font-semibold" 
                        >
                            Tentar novamente
                        </Button>
                    </div>
                )}
                {!isLoading && !isError && data?.length === 0 && (
                    <Card className="w-full h-full bg-gray-1300 text-white border-none rounded-none">
                        <CardContent className="p-4 space-y-4">
                            <h2 className="font-semibold text-2xl">Nenhum portifólio encontrado.</h2>
                        </CardContent>
                        <CardFooter className="py-2 border-t border-zinc-800">
                            <p className="text-base text-zinc-500">Página criada na plataforma BjjLink</p>
                        </CardFooter>
                    </Card>
                )}
            </div>
        </div>
    )
} 