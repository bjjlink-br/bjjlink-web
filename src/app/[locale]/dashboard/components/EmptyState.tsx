import { Card } from "@/components/ui/card"
import { Plus } from "lucide-react"
import { useTranslations } from "next-intl";

export const EmptyState = () => {
    const t = useTranslations("dashboard");

    return (
        <Card className="bg-brand-blue-600/15 border-2 border-dashed border-brand-blue-600 p-4 text-center max-w-52">
            <div className="flex flex-col items-center gap-4">
                <div>
                    <h3 className="font-semibold text-base font-secondary text-gray-50 mb-1">{t('create-title')}</h3>
                    <p className="text-sm text-gray-200 font-secondary">
                        {t('create-description')}
                    </p>
                </div>
                <div className="w-7 h-7 rounded-full bg-transparent border-2 border-brand-blue-500 flex items-center justify-center">
                    <Plus className="w-5 h-5 text-brand-blue-500" />
                </div>
            </div>
        </Card>
    )
}