import { UploadImage } from "@/components/shared/UploadImage";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button";
import { Image as ImageIcon, Save } from "lucide-react"
import { useLocale, useTranslations } from "next-intl";
import { toast } from '@/hooks/use-toast'
import { Toaster } from "@/components/ui/toaster"
import { useDataSections } from "@/contexts/DataSectionsContext";
import { AUTH_STORAGE_KEY } from "@/contexts/AuthContext";
import { saveSectionPortifolio } from "@/services/portifolio.service";

export const PhotoGallery = () => {
    const t = useTranslations("create-portifolio");
    const locale = useLocale()
    const { dataSections ,setDataSections } = useDataSections();

    const handleImageUpload = async (files: File[] | null) => {
        try {
            setDataSections((prev) => ({
                ...prev,
                gallery: {
                    type: 'GALLERY',
                    imagesGallery: files
                },
            }));
    
          toast({
            title: `${t("steps.profile.toast-upload-success")}`,
            duration: 3000,
          });
        } catch (error) {
            console.log(error)
            toast({
                title: `${t("steps.profile.toast-upload-error")}`,
                variant: "destructive",
                duration: 3000,
            });
        }
    }

    const handleSubmitSave = async () => {
        const token = localStorage.getItem(AUTH_STORAGE_KEY);
        const tokenObj = JSON.parse(token!)

        if(dataSections.gallery.imagesGallery) {
            const formData = new FormData();

            dataSections.gallery.imagesGallery.forEach((file) => {
                formData.append('images', file);
            });

            formData.append('type', 'GALLERY')

            
            const response = await saveSectionPortifolio(tokenObj.acess_token as string, locale, formData);
        
            console.log(response)
        
        
        
            toast({
                title: `${t("steps.profile.toast-upload-success")}`,
                duration: 3000,
            });
        }
    }

    return (
        <div className="w-full max-w-[575px] space-y-4 bg-gray-900 text-white rounded-lg overflow-hidden">
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="gallery" className='border-none'>
                    <AccordionTrigger className="px-4 py-3 bg-gray-900 hover:bg-gray-800 transition-colors">
                        <div className="flex items-center justify-between w-full">
                            <div className='flex items-center gap-2'>
                                <div className='rounded-md p-2 bg-brand-blue-600/15'>
                                    <ImageIcon size={20} color='#85CBFF' />
                                </div>
                                <div className='flex flex-col items-start'>
                                    <h1 className="text-base font-bold no-underline text-gray-50 font-secondary">{t("steps.photo-gallery.title")}</h1>
                                    <p className='text-gray-200 text-sm font-secondary'>{t("steps.photo-gallery.subtitle")}</p>
                                </div>
                            </div>
                            {/* <div className="flex items-center gap-3 mr-2">
                                <Button
                                    variant="ghost" 
                                    size="icon" 
                                    className="bg-semantic-green-500/5 text-semantic-green-500 hover:bg-semantic-green-500/5 hover:text-semantic-green-500"
                                >
                                    <Pencil className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="bg-semantic-red-500/5 text-semantic-red-500 hover:bg-semantic-red-500/5 hover:text-semantic-red-500">
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div> */}
                        </div>
                    </AccordionTrigger>
                    <AccordionContent>
                        <div className="p-4 space-y-6">
                            <div className="space-y-4">
                                <h2 className="text-lg font-medium">{t("steps.photo-gallery.description")}</h2>
                                <UploadImage  
                                    className='border-dashed border-2 border-brand-blue-600 bg-brand-blue-600/15 cursor-pointer' 
                                    maxSize={5} 
                                    onImageUpload={handleImageUpload}
                                    sectionUpload="GALLERY"
                                />
                            </div>

                            <Button 
                                className="w-full bg-transparent border border-gray-100 text-brand-blue-50 hover:bg-transparent font-secondary" 
                                size="lg"
                                onClick={handleSubmitSave}
                            >
                                <Save className="w-4 h-4" />
                                {t("steps.photo-gallery.button-save")}
                            </Button>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
            <Toaster />
        </div>
    )
}