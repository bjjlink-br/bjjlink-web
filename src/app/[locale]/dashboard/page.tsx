import { useTranslations } from "next-intl";
import { VerticalMenu } from "@/components/shared/VerticalMenu";
import { PromotionalBanner } from "./components/PromotionalBanner";
import { EmptyState } from "./components/EmptyState";

export default function Dashboard() {
    const t = useTranslations("dashboard");

    return(
        <div className="bg-gray-1300 min-h-screen flex">
            <VerticalMenu />

            <main className="flex-1 p-8">
                <PromotionalBanner />

                <div>
                    <h2 className="text-2xl font-semibold mb-1 text-gray-50">{t('title')}</h2>
                    <p className="text-gray-200 text-base mb-6">
                        {t('description')}
                    </p>

                    <EmptyState />
                </div>
            </main>
        </div>
    )
}