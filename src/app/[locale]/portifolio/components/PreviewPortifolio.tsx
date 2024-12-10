import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

export const PreviewPortifolio = () => {
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
                          src="https://github.com/gabriellennon.png"
                          alt="Profile"
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                        <div>
                          <div className="font-semibold">Big Tiger</div>
                          <div className="text-xs text-zinc-400">Atleta/BR</div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h2 className="font-semibold text-sm">Meu objetivo como atleta!</h2>
                        <p className="text-xs text-zinc-400">
                          Com disciplina e maestria, Big tiger é um ícone do jiu-jitsu. Sua jornada é uma fusão de valores e superação, inspirando outros a alcançarem seus objetivos. Além do tatame, ele inspira como mestre, mostrando que a paixão e a determinação transcendem fronteiras.
                        </p>
                      </div>

                      <Button className="w-full md:w-40 bg-brand-blue-600 hover:bg-brand-blue-700 text-xs py-1">
                        Vamos conversar
                      </Button>

                      <div className="space-y-2">
                        <h3 className="font-semibold text-sm">Minhas redes:</h3>
                        <div className="flex gap-4">
                          <Facebook className="w-4 h-4 text-brand-blue-300 hover:text-brand-blue-400 cursor-pointer" />
                          <Instagram className="w-4 h-4 text-brand-blue-300 hover:text-brand-blue-400 cursor-pointer" />
                          <Linkedin className="w-4 h-4 text-brand-blue-300 hover:text-brand-blue-400 cursor-pointer" />
                          <Twitter className="w-4 h-4 text-brand-blue-300 hover:text-brand-blue-400 cursor-pointer" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <h3 className="font-semibold text-sm">Sobre o meu trabalho</h3>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="icon" className="h-6 w-6 p-0">
                              <ChevronLeft className="h-3 w-3" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-6 w-6 p-0">
                              <ChevronRight className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-1">
                          <Image
                            src="https://github.com/gabriellennon.png"
                            alt="Work sample 1"
                            width={80}
                            height={80}
                            className="rounded-lg object-cover w-full h-20"
                          />
                          <Image
                            src="https://github.com/gabriellennon.png"
                            alt="Work sample 2"
                            width={80}
                            height={80}
                            className="rounded-lg object-cover w-full h-20"
                          />
                          <Image
                            src="https://github.com/gabriellennon.png"
                            alt="Work sample 3"
                            width={80}
                            height={80}
                            className="rounded-lg object-cover w-full h-20"
                          />
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