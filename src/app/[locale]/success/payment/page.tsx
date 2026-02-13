"use client"
import { CheckCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import Link from "next/link";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function SuccessPayment() {
    const t = useTranslations("payment")
    const locale = useLocale()
    const searchParams = useSearchParams()

    useEffect(() => {
        const statusFromUrl = searchParams.get('status')
        
        if (statusFromUrl) {
            const userDataString = localStorage.getItem('@Bjjlink-user')
            
            if (userDataString) {
                try {
                    const userData = JSON.parse(userDataString)
                    userData.status = statusFromUrl
                    localStorage.setItem('@Bjjlink-user', JSON.stringify(userData))
                } catch (error) {
                    console.error('Erro ao atualizar status do usuário:', error)
                }
            }
        }
    }, [searchParams])

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-1300">
            <div className="flex flex-col items-center gap-4 max-w-md p-6 bg-white rounded-lg shadow-lg">
                <CheckCircle className="text-green-500 w-10 h-10" />
                <p className="text-lg font-semibold text-center text-brand-blue-950">{t("success-title")}</p>
                <Link
                    href={`/${locale}/login`}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-md text-center p-2"
                >
                    {t("button-back")}
                </Link>
            </div>
        </div>
    )
}