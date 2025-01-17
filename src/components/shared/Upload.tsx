import { Button } from "@/components/ui/button"
import { Plus, X } from "lucide-react"
import Image from "next/image"

type UploadProps = {
    pictures?: string[];
}

export function Upload({ pictures = [] }: UploadProps) {
  return (
    <div className="flex flex-col gap-4">
        <div className="border-dashed border-2 border-gray-200 rounded-lg w-full h-[200px] flex items-center justify-center transition-colors dark:border-gray-700 hover:border-gray-400">
            <Plus className="w-5 h-5 text-brand-blue-500" />
            <span className="text-gray-500 text-sm dark:text-gray-400">Adicionar sua foto</span>
        </div>
        <div className="grid grid-cols-2 gap-4">
            <div className="relative">
                <Button variant="ghost" size="icon" className="absolute top-0 right-0 translate-x-1/2 group-hover:visible">
                    <X className="w-4 h-4" />
                    <span className="sr-only">Remove</span>
                </Button>
                <Image
                    src="https://github.com/gabriellennon.png"
                    width="150"
                    height="100"
                    alt="Thumbnail"
                    className="aspect-16/9 rounded-md object-cover overflow-hidden border"
                />
            </div>
            <div className="relative">
                <Button variant="ghost" size="icon" className="absolute top-0 right-0 translate-x-1/2 group-hover:visible">
                    <X className="w-4 h-4" />
                    <span className="sr-only">Remove</span>
                </Button>
                <Image
                    src="https://github.com/gabriellennon.png"
                    width="150"
                    height="100"
                    alt="Thumbnail"
                    className="aspect-16/9 rounded-md object-cover overflow-hidden border"
                />
            </div>
        </div>
    </div>
  )
}