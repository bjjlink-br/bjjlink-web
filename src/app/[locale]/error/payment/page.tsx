import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Payment() {
    const t = useTranslations("payment")

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-1300">
            <div className="flex flex-col items-center gap-4 max-w-md p-6 bg-white rounded-lg shadow-lg">
                <AlertCircle className="text-red-500 w-10 h-10" />
                <p className="text-lg font-semibold text-center text-brand-blue-950">{t("error-title")}</p>
                <Button
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-md text-center p-2"
                >
                    {t("error-button")}
                </Button>
            </div>
        </div>
    )
}