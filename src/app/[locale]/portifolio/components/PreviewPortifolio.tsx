"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Facebook, Instagram, Twitter } from "lucide-react";
import { useDataSections } from "@/contexts/DataSectionsContext";
import { useRef } from "react";

export const PreviewPortifolio = () => {
  const { dataSections } = useDataSections();

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
    const scrollAmount = 100; // você pode ajustar a distância do scroll
    if (direction === "left") {
      scrollRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    } else {
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const images = dataSections.gallery.imagesGallery || examplegallery;

  return (
      <div className="relative w-[320px] h-[650px] bg-black rounded-[50px] overflow-hidden shadow-xl border-8 border-gray-800">
              {/* Notch */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-6 bg-black rounded-b-3xl"></div>
              
              {/* Screen content */}
              <div className="absolute top-6 left-0 right-0 bottom-6 bg-gray-1300 overflow-y-auto">
                <Card className="w-full h-full bg-gray-1300  text-white border-none rounded-none">
                  <CardContent className="p-4 space-y-4">
                    <div className="flex items-center gap-3">
                      <Image
                        key={dataSections.profile.image ? `${dataSections.profile.image}` : exampleImage}
                        src={dataSections.profile.image ? URL.createObjectURL(dataSections.profile.image) : exampleImage} 
                        alt="Profile"
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <div>
                        {dataSections.profile.texts && dataSections.profile.texts.map((tx) => (
                            <>
                              <div key={tx.order} className="font-semibold break-words whitespace-normal">
                                {tx.text ? tx.text : "BJJ Master"}
                              </div>

                              {tx.order !== 1 && <div key={`${tx.order}-${tx.text}`} className="text-xs text-zinc-400">{tx.text ? tx.text : "Atleta/BR"}</div>}
                            </>
                        ))}
                        {!dataSections.profile.texts && (
                          <>
                            <div className="font-semibold">BJJ Master</div>
                            <div className="text-xs text-zinc-400">Atleta/BR</div>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h2 className="font-semibold text-sm">{dataSections.biography.texts?.[0]?.text || 'Meu objetivo como atleta!'}</h2>
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
                      <h3 className="font-semibold text-sm">Minhas redes:</h3>
                      <div className="flex gap-4">
                        <Facebook className="w-4 h-4 text-brand-blue-300 hover:text-brand-blue-400 cursor-pointer" />
                        <Instagram className="w-4 h-4 text-brand-blue-300 hover:text-brand-blue-400 cursor-pointer" />
                        {/* <Linkedin className="w-4 h-4 text-brand-blue-300 hover:text-brand-blue-400 cursor-pointer" /> */}
                        <Twitter className="w-4 h-4 text-brand-blue-300 hover:text-brand-blue-400 cursor-pointer" />
                      </div>
                    </div>

                    <div className="space-y-2">
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
                            disabled={images.length <= 3} 
                            onClick={() => handleScroll("right")}
                          >
                            <ChevronRight className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <div
                        ref={scrollRef}
                        className="flex gap-2 overflow-x-auto scrollbar-hide"
                      >
                        {images.map((image: any, index: number) => (
                          <Image
                            key={`${index}-${image}`}
                            src={dataSections.gallery.imagesGallery ? URL.createObjectURL(image) : image}
                            alt="Exemplo de imagem de portifólio"
                            width={80}
                            height={80}
                            className="rounded-lg object-cover h-20 flex-shrink-0"
                          />
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="px-4 py-2 border-t border-zinc-800">
                    <p className="text-[10px] text-zinc-500">Página criada na plataforma BjjLink</p>
                  </CardFooter>
                </Card>
              </div>

              {/* Home indicator */}
              <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-white rounded-full"></div>
            </div>
  )
}