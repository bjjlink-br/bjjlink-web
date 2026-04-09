"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useTranslations } from "next-intl"
import { Shield, Lock, Mail, Info, Loader2, Check, X } from "lucide-react"
import { AUTH_STORAGE_KEY, USER_DATA_STORAGE_KEY } from "@/contexts/AuthContext"
import { updatePassword, resetPassword } from "@/services/userService.service"
import { useToast } from "@/hooks/use-toast"

export function SecuritySettings() {
  const t = useTranslations("settings.security")
  const { toast } = useToast()

  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [recoveryLoading, setRecoveryLoading] = useState(false)

  const hasMinLength = newPassword.length >= 8
  const hasUppercase = /[A-Z]/.test(newPassword)
  const hasNumber = /\d/.test(newPassword)
  const hasSpecial = /[^A-Za-z0-9]/.test(newPassword)
  const isPasswordValid = hasMinLength && hasUppercase && hasNumber && hasSpecial

  const getToken = (): string | null => {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY)
    if (!stored) return null
    return JSON.parse(stored).acess_token
  }

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast({ title: t("toast.fill-all-fields"), variant: "destructive" })
      return
    }

    if (!isPasswordValid) {
      toast({ title: t("toast.password-requirements-not-met"), variant: "destructive" })
      return
    }

    if (newPassword !== confirmPassword) {
      toast({ title: t("toast.passwords-dont-match"), variant: "destructive" })
      return
    }

    const token = getToken()
    if (!token) return

    setLoading(true)
    try {
      await updatePassword(token, currentPassword, newPassword)
      toast({ title: t("toast.password-updated") })
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
    } catch {
      toast({ title: t("toast.password-update-error"), variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  const handleRecoverByEmail = async () => {
    const storedUser = localStorage.getItem(USER_DATA_STORAGE_KEY)
    if (!storedUser) return

    const { email } = JSON.parse(storedUser)
    if (!email) return

    setRecoveryLoading(true)
    try {
      await resetPassword({ email })
      toast({ title: t("toast.recovery-email-sent") })
    } catch {
      toast({ title: t("toast.recovery-email-error"), variant: "destructive" })
    } finally {
      setRecoveryLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Section header */}
      <div className="flex items-center gap-3">
        <div className="bg-brand-blue-600/15 rounded-lg p-2">
          <Shield className="h-5 w-5 text-brand-blue-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-50">{t("title")}</h3>
          <p className="text-sm text-gray-400">{t("description")}</p>
        </div>
      </div>

      {/* Current password */}
      <div className="space-y-2">
        <Label className="text-gray-400 text-xs" htmlFor="current-password">{t("current-password")}</Label>
        <Input
          className="bg-gray-800 border border-gray-600 text-gray-100"
          id="current-password"
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          placeholder={t("current-password-placeholder")}
        />
      </div>

      {/* New password fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-gray-400 text-xs" htmlFor="new-password">{t("new-password")}</Label>
          <Input
            className="bg-gray-800 border border-gray-600 text-gray-100"
            id="new-password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder={t("new-password-placeholder")}
          />
        </div>

        <div className="space-y-2">
          <Label className="text-gray-400 text-xs" htmlFor="confirm-password">{t("confirm-password")}</Label>
          <Input
            className="bg-gray-800 border border-gray-600 text-gray-100"
            id="confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder={t("confirm-password-placeholder")}
          />
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
              {newPassword ? (
                req.met ? (
                  <Check className="h-3.5 w-3.5 text-semantic-green-300" />
                ) : (
                  <X className="h-3.5 w-3.5 text-red-400" />
                )
              ) : (
                <span className="h-3.5 w-3.5 inline-block rounded-full border border-gray-500" />
              )}
              <span className={newPassword ? (req.met ? "text-semantic-green-300" : "text-red-400") : "text-gray-400"}>
                {req.label}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Action buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Button
          className="bg-brand-blue-600 hover:bg-brand-blue-700"
          onClick={handleChangePassword}
          disabled={loading}
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Lock className="h-4 w-4" />}
          {t("change-password")}
        </Button>
        <Button
          className="bg-brand-blue-600 hover:bg-brand-blue-700"
          onClick={handleRecoverByEmail}
          disabled={recoveryLoading}
        >
          {recoveryLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Mail className="h-4 w-4" />}
          {t("recover-by-email")}
        </Button>
      </div>
    </div>
  )
}
