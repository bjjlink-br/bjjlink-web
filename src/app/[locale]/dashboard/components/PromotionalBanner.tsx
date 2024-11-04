import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import PlaceholderDash from '@/assets/images/placeholder-dash.svg';
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useTranslations } from "next-intl";

export const PromotionalBanner = () => {
    const t = useTranslations("dashboard");
    
    return (
        <Card className="bg-blue-600 mb-8 overflow-hidden relative border-none">
            <div className="absolute inset-0">
                <Image
                    src={PlaceholderDash}
                    alt={t('alt-image-background')}
                    fill
                    className="object-cover"
                />
                {/* Overlay escuro para melhorar a legibilidade do texto */}
                <div className="absolute inset-0 bg-black/20" />
            </div>
            <div className="relative z-10 p-8">
                <h2 className="text-2xl font-semibold mb-1 text-gray-1300">{t('acquire-title')}</h2>
                <p className="text-gray-1300 text-sm mb-4">
                    Yorem ipsum dolor sit amet,<br/> consectetur adipiscing elit.
                </p>
                <Button 
                    variant="secondary" 
                    size="lg" 
                    className="font-semibold font-secondary text-brand-blue-50 bg-brand-blue-600 hover:bg-brand-blue-700 flex items-center gap-1 justify-center"
                >
                    {t('acquire-button')} 
                    <ArrowUpRight size={16} color="#D8D8E1" />
                </Button>
            </div>
        </Card>
    )
}