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

export default function PortifolioViewPage({ params }: { params: { id: string } }) {
    const { data, isLoading, isError } = usePortifolioByDomain(params.id);
    const scrollRef = useRef<HTMLDivElement>(null);

    console.log("Data fetched:", data);
    console.log("loading:", isLoading);

    const getImageUrl = (image: ImageType): string => {
        if (!image) return exampleImage;
      
        if (typeof image === 'string') {
          return image;
        }
      
        if (typeof image === 'object' && !(image instanceof File)) {
          const imageObj = image as ImageObject;
          if (imageObj.preview) {
            return imageObj.preview;
          }
          if (imageObj.url) {
            return imageObj.url;
          }
        }
      
        if (image instanceof File) {
          return URL.createObjectURL(image);
        }
      
        return exampleImage;
    };

    const handleScroll = (direction: "left" | "right") => {
      if (!scrollRef.current) return;
      const scrollAmount = 100;
      if (direction === "left") {
        scrollRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      } else {
        scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    };

    const exampleImage = 'https://i.ibb.co/gFg9NLy1/young-woman-doing-karate.jpg';
    const exampleImage2 = "https://i.ibb.co/SDV9sVSf/black-belt-athlete-practicing-jujitsu-with-determination-generative-ai.jpg"
    const galleryImages = [exampleImage, exampleImage2, exampleImage2, exampleImage];

    if(isLoading) {
        return <PortfolioLoadingSkeleton />
    }

    return (
        <div className="min-h-screen bg-[#0D0D18]">
            <div className="max-w-[490px] mx-auto py-12">
                {!isLoading && !isError && (
                    <Card className="w-full h-full bg-gray-1300 text-white border-none rounded-none">
                        <CardContent className="p-4 space-y-4">
                            <div className="flex items-center gap-3">
                                <Image
                                    src="https://github.com/gabriellennon.png" 
                                    alt="Profile photo"
                                    width={40}
                                    height={40}
                                    className="rounded-full h-10 w-10 object-cover"
                                />
                                <div>
                                    <div className="font-semibold">BJJ Master</div>
                                    <div className="text-xs text-zinc-400">Atleta/BR</div>
                                </div>
                            </div>
                            <div className="space-y-2 mt-8">
                                <h2 className="font-semibold text-2xl">
                                    Meu objetivo como atleta!
                                </h2>
                                <p className="text-base text-zinc-400">
                                    Com disciplina e maestria, BJJ Master é um ícone do jiu-jitsu. Sua jornada é uma fusão de valores e superação, inspirando outros a alcançarem seus objetivos. Além do tatame, ele inspira como mestre, mostrando que a paixão e a determinação transcendem fronteiras.
                                </p>
                            </div>
                            <Button
                                className="mt-4 w-full md:w-40 bg-brand-blue-600 hover:bg-brand-blue-700 text-xs py-2 rounded-full font-semibold" 
                            >
                                Vamos conversar
                            </Button>
                            <div className="space-y-2 mt-8">
                                <h3 className="font-semibold text-xl">Minhas redes:</h3>
                                <div className="flex gap-4">
                                    <Facebook className="w-6 h-6 text-brand-blue-300 hover:text-brand-blue-400 cursor-pointer" />
                                    <Instagram className="w-6 h-6 text-brand-blue-300 hover:text-brand-blue-400 cursor-pointer" />
                                    <Twitter className="w-6 h-6 text-brand-blue-300 hover:text-brand-blue-400 cursor-pointer" />
                                </div>
                            </div>
                            <div className="space-y-2 mt-8">
                                <div className="flex justify-between items-center">
                                    <h3 className="font-semibold text-sm">Sobre o meu trabalho</h3>
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
                            <p className="text-base text-zinc-500">Página criada na plataforma BjjLink</p>
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
            </div>
        </div>
    )
} 