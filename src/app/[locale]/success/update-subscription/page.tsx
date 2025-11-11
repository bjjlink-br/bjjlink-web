import { CheckCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import Link from "next/link";

export default function UpadateSubscription() {
    const t = useTranslations("payment")
    const locale = useLocale()

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-1300">
            <div className="flex flex-col items-center gap-4 max-w-md p-6 bg-white rounded-lg shadow-lg">
                <CheckCircle className="text-green-500 w-10 h-10" />
                <p className="text-lg font-semibold text-center text-brand-blue-950">{t("update-success-title")}</p>
                <Link
                    href={`/${locale}/dashboard`}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-md text-center p-2"
                >
                    {t("update-button-back")}
                </Link>
            </div>
        </div>
    )
}