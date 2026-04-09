"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { LockKeyhole } from "lucide-react"
import { updatePublicProfile } from "@/services/userService.service"
import { AUTH_STORAGE_KEY, USER_DATA_STORAGE_KEY } from "@/contexts/AuthContext"
import { UserAccountInfo } from "@/utils/types"

type ToggleProps = {
  enabled: boolean;
  onChange: (value: boolean) => void;
}

function Toggle({ enabled, onChange }: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      onClick={() => onChange(!enabled)}
      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 ${
        enabled ? "bg-brand-blue-600" : "bg-gray-600"
      }`}
    >
      <span
        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
          enabled ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  )
}


const getToken = (): string  => {
  const stored = localStorage.getItem(AUTH_STORAGE_KEY)
  if (!stored) return ''
  return JSON.parse(stored).acess_token
}

export function PrivacySettings({ user }: { user: UserAccountInfo }) {
  const t = useTranslations("settings.privacy")

  const [showProfile, setShowProfile] = useState(!!user.public)

  async function handleToggleShowProfile(value: boolean) {
    setShowProfile(value)

    const storedUser = localStorage.getItem(USER_DATA_STORAGE_KEY)
    if (storedUser) {
      const userData = JSON.parse(storedUser)
      const updatedUser = {
        ...userData,
        public: showProfile
      }
      localStorage.setItem(USER_DATA_STORAGE_KEY, JSON.stringify(updatedUser))
    }
    
    const storedAuth = localStorage.getItem(AUTH_STORAGE_KEY)
    if (!storedAuth) return

    const token = getToken();

    await updatePublicProfile(token);
  }

  return (
    <div className="space-y-6">
      {/* Section header */}
      <div className="flex items-center gap-3">
        <div className="bg-brand-blue-600/15 rounded-lg p-2">
          <LockKeyhole className="h-5 w-5 text-brand-blue-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-50">{t("title")}</h3>
          <p className="text-sm text-gray-400">{t("description")}</p>
        </div>
      </div>

      <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
        <div>
          <p className="text-sm font-medium text-gray-100">{t("show-profile")}</p>
          <p className="text-xs text-gray-400 mt-0.5">{t("show-profile-description")}</p>
        </div>
        <Toggle enabled={showProfile} onChange={handleToggleShowProfile} />
      </div>
    </div>
  )
}
