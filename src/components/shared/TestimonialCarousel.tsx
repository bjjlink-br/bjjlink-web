'use client'

import { useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

const testimonials = [
  {
    text: '"Porem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar."',
    name: 'Tigrão - Clevinho',
    title: 'Corredor de maratona'
  },
  {
    text: '"Porem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar."',
    name: 'Tigrão - Clevinho',
    title: 'Corredor de maratona'
  },
  {
    text: '"Porem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar."',
    name: 'Tigrão - Clevinho',
    title: 'Corredor de maratona'
  },
  {
    text: '"Porem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar."',
    name: 'Tigrão - Clevinho',
    title: 'Corredor de maratona'
  },
  {
    text: '"Porem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar."',
    name: 'Tigrão - Clevinho',
    title: 'Corredor de maratona'
  },
]

export default function TestimonialCarousel() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const scrollToCard = (index: number) => {
    if (scrollContainerRef.current) {
      const cardWidth = 256 + 16 // card width (w-64) + gap (space-x-4)
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
    const newIndex = Math.min(currentIndex + 1, testimonials.length - 1)
    scrollToCard(newIndex)
  }

  return (
    <div className="bg-transparen">
      <div className="w-full mx-auto">
        <div 
          ref={scrollContainerRef}
          className="flex space-x-4 overflow-x-auto scrollbar-hide mb-4"
        >
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-gray-900 border-gray-700 w-64 flex-shrink-0">
              <CardContent className="p-4 h-full flex flex-col">
                <p className="text-xs mb-4 text-gray-200 font-secondary flex-grow overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
                  {testimonial.text}
                </p>
                <div className="mt-auto flex items-center">
                  <div className="bg-gray-700 p-1 rounded-full mr-2">
                    <Image src="https://github.com/gabriellennon.png" alt="Testimonial author photo" width={38} height={38} className="rounded-full" />
                  </div>
                  <div>
                    <p className="font-semibold text-xs text-gray-50 font-secondary">{testimonial.name}</p>
                    <p className="text-xs text-gray-200 font-secondary">{testimonial.title}</p>
                  </div>
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
            <span className="sr-only">Previous testimonial</span>
          </Button>
          <div className="flex space-x-2">
            {testimonials.map((_, index) => (
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
            disabled={currentIndex === testimonials.length - 1}
            className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next testimonial</span>
          </Button>
        </div>
      </div>
    </div>
  )
}