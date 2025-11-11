'use client'

import Link from 'next/link'
import { resetPasswordSchema } from '@/utils/schema'
import { z } from 'zod'
import { useLocale, useTranslations } from 'next-intl'

import { Toaster } from "@/components/ui/toaster"
import { Footer } from '@/components/shared/Footer'
import { toast } from '@/hooks/use-toast'
import { ResetPasswordForm } from './components/ResetPasswordForm'
import { useState } from 'react'
import { useRecoveryPassword } from '@/hooks/useUsers'

export default function ResetPassword() {
    const locale = useLocale()
    const t = useTranslations("reset-password")
    const [successScreen, setSuccessScreen] = useState(false);
    const { error, fetchRecoveryPassword, loading } = useRecoveryPassword()

    async function handleResetPasswordSubmit(values: z.infer<typeof resetPasswordSchema>) {
        const response = await fetchRecoveryPassword({
            email: values.email,
            password: values.password,
            passwordConfirmation: values.confirm_password,
        });

        if(!!response){
            toast({
                title: `${t('toast.success')}`,
                duration: 3000
            });
            setSuccessScreen(true);
        } else {
            toast({
                title: `${t('toast.error-title')}`,
                description: `${t('toast.error-description')}`,
                variant: "destructive",
                duration: 3000
            });
            console.error('Erro ao redefinir senha:', error);
        }
        
    }

  return (
    <div className="min-h-screen">
        <div className="flex flex-col gap-4 items-center justify-center bg-gray-1300 md:py-10">
            <div className="w-full max-w-md p-8 space-y-6 bg-gray-900 rounded-lg shadow-xl">
                <div className="space-y-1 text-left">
                    <h1 className="text-3xl font-medium text-gray-50 font-primary">{successScreen ? t('title-reset-succes') :t('title')}</h1>
                    <p className="text-gray-200 text-sm font-normal">{successScreen ? t("description-reset-succes") : t("description")}</p>
                </div>

                {!successScreen && <ResetPasswordForm onSubmit={handleResetPasswordSubmit} isLoading={loading} />}
                {successScreen && (
                    <div className='mt-6 w-full'>
                        <Link 
                            href={`/${locale}`}
                            className="bg-blue-600 hover:bg-blue-700 text-white py-4 px-36 rounded-lg"
                        >
                            {t('continue-back-login')}
                        </Link>
                    </div>
                )}
            </div>

            {!successScreen && (
                <div className='pb-8 md:pb-2'>
                    <p className="text-sm text-center text-gray-50">
                        {t('login-text')}{' '}
                        <Link href={`/${locale}/login`} className="text-brand-blue-500 hover:underline">
                            {t('login-link')}
                        </Link>
                    </p>
                </div>
            )}
        </div>
        <Toaster />
        <Footer />
    </div>
  )
}