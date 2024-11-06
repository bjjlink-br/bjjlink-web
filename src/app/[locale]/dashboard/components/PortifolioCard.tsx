import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Pencil, Trash2 } from "lucide-react"
import Image from "next/image"

export const PortifolioCard = () => {
    return (
        <Card className="bg-gray-900 border-gray-700">
            <CardContent className="p-6">
                <div className="flex items-center gap-2">
                    <Image
                        src="https://github.com/gabriellennon.png"
                        alt="Profile avatar"
                        className="rounded-full"
                        width={48}
                        height={48}
                    />
                    <div className="flex-1">
                        <h3 className="text-base font-semibold text-gray-50">Big Tiger</h3>
                        <p className="text-sm text-gray-200">@jlink.site/bigtiger</p>
                    </div>
                </div>
                <Separator className="bg-gray-600 my-4" />
                <div className="flex items-center justify-between">
                    <Button className="bg-brand-blue-600/15 text-brand-blue-300">
                        Editar link
                    </Button>
                    <div className="flex gap-2">
                        <Button variant="ghost" size="icon" className="text-brand-blue-500 hover:text-brand-blue-600 hover:bg-brand-blue-600/15">
                            <Pencil className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                        </Button>
                        <Button variant="ghost" size="icon" className="text-brand-blue-500 hover:text-brand-blue-600  hover:bg-brand-blue-600/15">
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}