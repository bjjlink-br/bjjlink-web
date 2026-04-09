"use client"

import { useState, useEffect, useCallback } from "react"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { UserAccountInfo } from "@/utils/types"
import { AUTH_STORAGE_KEY } from "@/contexts/AuthContext"
import {
  getAthleteInfo,
  createConnectAccount,
  createOnboardingLink,
  getDonationSummary,
  type DonationSummary,
} from "@/services/donation.service"
import { Loader2, HandCoins, Wallet, Calendar, Heart, ExternalLink } from "lucide-react"

type DonationSettingsProps = {
  user: UserAccountInfo;
}

function formatCurrency(cents: number, currency: string) {
  const amount = cents / 100
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: currency || "brl",
  }).format(amount)
}

export function DonationSettings({ user }: DonationSettingsProps) {
  const t = useTranslations("settings.donations")
  const [donationsEnabled, setDonationsEnabled] = useState<boolean | null>(null)
  const [loading, setLoading] = useState(true)
  const [onboardingLoading, setOnboardingLoading] = useState(false)
  const [summary, setSummary] = useState<DonationSummary | null>(null)
  const [dashboardLoading, setDashboardLoading] = useState(false)

  const getToken = (): string | null => {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY)
    if (!stored) return null
    const parsed = JSON.parse(stored)
    return parsed.acess_token
  }

  const checkDonationStatus = useCallback(async () => {
    try {
      const info = await getAthleteInfo(user.domain)
      setDonationsEnabled(info.donationsEnabled)

      if (info.donationsEnabled) {
        const token = getToken()
        if (token) {
          setDashboardLoading(true)
          const summaryData = await getDonationSummary(token)
          setSummary(summaryData)
          setDashboardLoading(false)
        }
      }
    } catch {
      setDonationsEnabled(false)
    } finally {
      setLoading(false)
    }
  }, [user.domain])

  useEffect(() => {
    checkDonationStatus()
  }, [checkDonationStatus])

  const handleStartOnboarding = async () => {
    const token = getToken()
    if (!token) return

    setOnboardingLoading(true)
    try {
      await createConnectAccount(token)
      const { url } = await createOnboardingLink(token)
      window.location.href = url
    } catch {
      setOnboardingLoading(false)
    }
  }

  const handleAccessDashboard = () => {
    window.open("https://dashboard.stripe.com", "_blank")
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="bg-brand-blue-600/15 rounded-lg p-2">
            <HandCoins className="h-5 w-5 text-brand-blue-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-50">{t("title")}</h3>
            <p className="text-sm text-gray-400">{t("description")}</p>
          </div>
        </div>
        <div className="flex items-center justify-center p-8">
          <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
        </div>
      </div>
    )
  }

  if (!donationsEnabled) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="bg-brand-blue-600/15 rounded-lg p-2">
            <HandCoins className="h-5 w-5 text-brand-blue-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-50">{t("title")}</h3>
            <p className="text-sm text-gray-400">{t("description")}</p>
          </div>
        </div>
        <div className="p-4 bg-gray-800 rounded-lg space-y-4">
          <p className="text-sm text-gray-300">{t("not-configured")}</p>
          <Button
            onClick={handleStartOnboarding}
            disabled={onboardingLoading}
            className="bg-brand-blue-600 hover:bg-brand-blue-700"
          >
            {onboardingLoading ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : null}
            {t("configure-button")}
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="bg-brand-blue-600/15 rounded-lg p-2">
          <HandCoins className="h-5 w-5 text-brand-blue-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-50">{t("title")}</h3>
          <p className="text-sm text-gray-400">{t("description")}</p>
        </div>
      </div>

      {/* Stripe integration card */}
      <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
        <div>
          <p className="text-sm font-medium text-gray-100">{t("stripe-integration")}</p>
          <p className="text-xs text-gray-400 mt-0.5 max-w-sm">{t("stripe-description")}</p>
        </div>
        <Button
          onClick={handleAccessDashboard}
          className="bg-[#635BFF] hover:bg-[#5851e0] text-white shrink-0"
          size="sm"
        >
          <ExternalLink className="h-3.5 w-3.5" />
          {t("access-donations")}
        </Button>
      </div>

      {/* Summary Cards */}
      {dashboardLoading ? (
        <div className="flex items-center justify-center p-8">
          <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-gray-800 rounded-lg p-4 flex items-center gap-3">
            <Wallet className="h-4 w-4 text-brand-blue-400" />
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide">{t("dashboard.current-balance")}</p>
              <p className="text-lg font-semibold text-gray-50">
                {formatCurrency(summary?.totalMonthlyAmountInCents ?? 0, summary?.currency ?? "brl")}
              </p>
            </div>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 flex items-center gap-3">
            <Calendar className="h-4 w-4 text-brand-blue-400" />
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide">{t("dashboard.this-month")}</p>
              <p className="text-lg font-semibold text-gray-50">
                {formatCurrency(summary?.totalMonthlyAmountInCents ?? 0, summary?.currency ?? "brl")}
              </p>
            </div>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 flex items-center gap-3">
            <Heart className="h-4 w-4 text-semantic-red-300" />
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide">{t("dashboard.total-donors")}</p>
              <p className="text-lg font-semibold text-gray-50">
                {summary?.totalSupporters ?? 0}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
