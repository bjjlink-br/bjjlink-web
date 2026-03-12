"use client"

import { useState } from 'react'
import { CheckCircle, Lock, Info, Check, X, Loader2, Eye, EyeOff } from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { resetPasswordWithToken } from '@/services/userService.service'
import { useToast } from '@/hooks/use-toast'
import { Toaster } from '@/components/ui/toaster'
import { Footer } from '@/components/shared/Footer'

const ResetPasswordPage = () => {
  const t = useTranslations("reset-password")
  const locale = useLocale()
  const params = useParams()
  const token = params.token as string
  const { toast } = useToast()

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const hasMinLength = password.length >= 8
  const hasUppercase = /[A-Z]/.test(password)
  const hasNumber = /\d/.test(password)
  const hasSpecial = /[^A-Za-z0-9]/.test(password)
  const isPasswordValid = hasMinLength && hasUppercase && hasNumber && hasSpecial

  const handleSubmit = async () => {
    if (!password || !confirmPassword) {
      toast({ title: t("form.passwords-not-matching"), variant: "destructive" })
      return
    }

    if (!isPasswordValid) {
      toast({ title: t("form.weak-password"), variant: "destructive" })
      return
    }

    if (password !== confirmPassword) {
      toast({ title: t("form.passwords-not-matching"), variant: "destructive" })
      return
    }

    setLoading(true)
    try {
      await resetPasswordWithToken(token, password, confirmPassword)
      setSuccess(true)
      toast({ title: t("toast.success"), duration: 3000 })
    } catch {
      toast({
        title: t("toast.error-title"),
        description: t("toast.error-description"),
        variant: "destructive",
        duration: 3000,
      })
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen">
        <div className="flex flex-col items-center justify-center bg-gray-1300 min-h-[calc(100vh-80px)]">
          <div className="flex flex-col items-center gap-4 max-w-md p-6 bg-gray-900 rounded-lg shadow-lg">
            <CheckCircle className="text-green-500 w-10 h-10" />
            <p className="text-lg font-semibold text-center text-gray-50">{t("confirmation-reset.title")}</p>
            <Link
              href={`/${locale}/login`}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-md text-center p-2"
            >
              {t("confirmation-reset.button-go-login")}
            </Link>
          </div>
        </div>
        <Toaster />
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <div className="flex flex-col gap-4 items-center justify-center bg-gray-1300 md:py-10 min-h-[calc(100vh-80px)]">
        <div className="w-full max-w-md p-8 space-y-6 bg-gray-900 rounded-lg shadow-xl">
          <div className="space-y-1 text-left">
            <h1 className="text-3xl font-medium text-gray-50 font-primary">{t("title")}</h1>
            <p className="text-gray-200 text-sm font-normal">{t("new-password-description")}</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-gray-200 text-sm" htmlFor="password">{t("form.password")}</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t("form.password-placeholder")}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 pr-16"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 text-xs flex items-center gap-1"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  {showPassword ? t("form.hidden-password-button") : t("form.show-password-button")}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-gray-200 text-sm" htmlFor="confirm-password">{t("form.confirmation-password")}</Label>
              <div className="relative">
                <Input
                  id="confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder={t("form.confirmation-placeholder")}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 pr-16"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 text-xs flex items-center gap-1"
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  {showConfirmPassword ? t("form.hidden-password-button") : t("form.show-password-button")}
                </button>
              </div>
            </div>

            {/* Password requirements */}
            <div className="bg-gray-800/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Info className="h-4 w-4 text-brand-blue-400" />
                <p className="text-sm font-medium text-gray-200">{t("requirements.title")}</p>
              </div>
              <ul className="space-y-1.5 text-sm ml-4">
                {[
                  { met: hasMinLength, label: t("requirements.min-length") },
                  { met: hasUppercase, label: t("requirements.uppercase") },
                  { met: hasNumber, label: t("requirements.number") },
                  { met: hasSpecial, label: t("requirements.special") },
                ].map((req) => (
                  <li key={req.label} className="flex items-center gap-2">
                    {password ? (
                      req.met ? (
                        <Check className="h-3.5 w-3.5 text-semantic-green-300" />
                      ) : (
                        <X className="h-3.5 w-3.5 text-red-400" />
                      )
                    ) : (
                      <span className="h-3.5 w-3.5 inline-block rounded-full border border-gray-500" />
                    )}
                    <span className={password ? (req.met ? "text-semantic-green-300" : "text-red-400") : "text-gray-400"}>
                      {req.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <Button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Lock className="h-4 w-4" />}
              {t("form.reset-password-button")}
            </Button>
          </div>
        </div>

        <div className="pb-8 md:pb-2">
          <p className="text-sm text-center text-gray-50">
            {t("login-text")}{' '}
            <Link href={`/${locale}/login`} className="text-brand-blue-500 hover:underline">
              {t("login-link")}
            </Link>
          </p>
        </div>
      </div>
      <Toaster />
      <Footer />
    </div>
  )
}

export default ResetPasswordPage
