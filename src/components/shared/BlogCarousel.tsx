'use client'

import { useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import WomanAthlete from "@/assets/images/womanfight.png"

const blogContentCards = [
    {
      image: WomanAthlete,
      sport: "Luta",
      title: "Porem ipsum dolor sit amet, consectetur adipiscing elit",
      date: "10/12/2023",
      description: "Porem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus.",
    },
    {
      image: WomanAthlete,
      sport: "Corrida",
      title: "Porem ipsum dolor sit amet, consectetur adipiscing elit",
      date: "10/12/2023",
      description: "Porem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus.",
    },
    {
      image: WomanAthlete,
      sport: "Basquete",
      title: "Porem ipsum dolor sit amet, consectetur adipiscing elit",
      date: "10/12/2023",
      description: "Porem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus.",
    },
    {
      image: WomanAthlete,
      sport: "Acessibilidade",
      title: "Porem ipsum dolor sit amet, consectetur adipiscing elit",
      date: "10/12/2023",
      description: "Porem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus.",
    },
    {
      image: WomanAthlete,
      sport: "Obstáculos",
      title: "Porem ipsum dolor sit amet, consectetur adipiscing elit",
      date: "10/12/2023",
      description: "Porem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus.",
    },
  ]

export function BlogCarousel() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const scrollToCard = (index: number) => {
    if (scrollContainerRef.current) {
      const cardWidth = 320 + 16 // card width (w-80) + gap (space-x-4)
      scrollContainerRef.current.scrollTo({
        left: cardWidth * index,
        behavior: 'smooth'
      })
      setCurrentIndex(index)
    }
  }

  const handlePrevious = () => {
    const newIndex = Math.max(currentIndex - 1, 0)
    scrollToCard(newIndex)
  }

  const handleNext = () => {
    const newIndex = Math.min(currentIndex + 1, blogContentCards.length - 1)
    scrollToCard(newIndex)
  }

  return (
    <div className="bg-transparent md:pl-32 pl-4">
      <div className="w-full mx-auto">
        <div 
          ref={scrollContainerRef}
          className="flex space-x-4 overflow-x-auto scrollbar-hide mb-4"
        >
          {blogContentCards.map((card, index) => (
            <Card key={index} className="bg-gray-800 border-gray-700 w-80 flex-shrink-0">
              <CardContent className="p-0">
                <div className="relative h-48">
                  <Image
                    src={card.image}
                    alt={card.sport}
                    layout="fill"
                    objectFit="cover"
                  />
                  <div className="absolute bottom-4 left-4 flex gap-2">
                    <Badge className="bg-blue-600 hover:bg-blue-700 rounded-md">Esporte</Badge>
                    <Badge className="bg-blue-600 hover:bg-blue-700 rounded-md">{card.sport}</Badge>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-gray-400 text-sm mb-2">{card.date}</p>
                  <h3 className="text-brand-blue-50 text-xl font-bold mb-2">{card.title}</h3>
                  <p className="text-gray-200 text-sm mb-4 line-clamp-3">{card.description}</p>
                  <Button variant="ghost" className="flex font-secondary text-base font-semibold flex-row gap-1 items-center text-brand-blue-50">
                    Leia mais
                    <ChevronRight size={16} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="flex justify-center md:justify-end items-center space-x-4 mt-6">
          <Button
            variant="outline"
            size="icon"
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous article</span>
          </Button>
          <div className="flex space-x-2">
            {blogContentCards.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-2 rounded-full ${
                  index === currentIndex ? 'bg-blue-600' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={handleNext}
            disabled={currentIndex === blogContentCards.length - 1}
            className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next article</span>
          </Button>
        </div>
      </div>
    </div>
  )
}