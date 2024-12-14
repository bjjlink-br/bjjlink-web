import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import PlaceholderDash from '@/assets/images/placeholder-dash.svg';
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useLocale, useTranslations } from "next-intl";
import { AUTH_STORAGE_KEY } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

export const PromotionalBanner = () => {
    const t = useTranslations("dashboard");
    const locale = useLocale()
    const router = useRouter()
    
    const selectPlan = () => {
        const dataUser = localStorage.getItem('@Bjjlink-user');
        const userToken = localStorage.getItem(AUTH_STORAGE_KEY);
        if(dataUser && userToken){
          window.open(`/${locale}/loadingpage?token=${userToken}&selectedPlan=Premium`, '_blank');
        } else {
          router.push(`/${locale}/login`);
        }
    }

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
                <div className="absolute inset-0 bg-brand-blue-300 md:bg-black/20" />
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
                    onClick={selectPlan}
                >
                    {t('acquire-button')} 
                    <ArrowUpRight size={16} color="#D8D8E1" />
                </Button>
            </div>
        </Card>
    )
}