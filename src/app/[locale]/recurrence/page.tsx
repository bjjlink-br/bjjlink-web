"use client"

import { VerticalMenu } from "@/components/shared/VerticalMenu"
import { useLocale, useTranslations } from "next-intl"
import { useEffect, useState, useCallback } from "react"
import { AUTH_STORAGE_KEY, USER_DATA_STORAGE_KEY } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"
import { toast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { UserAccountInfo } from "@/utils/types"
import {
  getDonationSummary,
  getDonationSupporters,
  getDonationMonthlyHistory,
  createConnectAccount,
  createOnboardingLink,
  type DonationSummary,
  type Supporter,
  type MonthlyHistoryItem,
} from "@/services/donation.service"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog"
import { RecurrencyChart } from "./components/RecurrencyChart"
import { SupportersList } from "./components/SupportersList"
import {
  Loader2,
  ChevronLeft,
  ChevronRight,
  Wallet,
  Users,
  Calendar,
  TrendingUp,
  Heart,
  ExternalLink,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const MONTH_NAMES_PT = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
]

function formatCurrency(cents: number, currency: string) {
  const amount = cents / 100
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: currency || "brl",
  }).format(amount)
}

export default function Recurrence() {
  const t = useTranslations("recurrence")
  const router = useRouter()
  const locale = useLocale()

  const [user, setUser] = useState<UserAccountInfo>()
  const [loading, setLoading] = useState(true)
  const [summary, setSummary] = useState<DonationSummary | null>(null)
  const [supporters, setSupporters] = useState<Supporter[]>([])
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1)
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())

  const [chartData, setChartData] = useState<{ month: string; valueInCents: number; supporters: number }[]>([])
  const [showOnboardingModal, setShowOnboardingModal] = useState(false)
  const [onboardingLoading, setOnboardingLoading] = useState(false)

  const getToken = (): string | null => {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY)
    if (!stored) return null
    const parsed = JSON.parse(stored)
    return parsed.acess_token
  }

  const handleStartOnboarding = async () => {
    const token = getToken()
    if (!token) return

    setOnboardingLoading(true)
    try {
      await createConnectAccount(token)
      const { url } = await createOnboardingLink(token)
      window.location.href = url
    } catch {
      toast({
        title: t("onboarding.error"),
        variant: "destructive",
        duration: 3000,
      })
      setOnboardingLoading(false)
    }
  }

  const fetchData = useCallback(async (month: number, year: number) => {
    const token = getToken()
    if (!token) return

    setLoading(true)
    try {
      const [summaryData, supportersData, historyData] = await Promise.all([
        getDonationSummary(token, month, year),
        getDonationSupporters(token),
        getDonationMonthlyHistory(token, 6, month, year),
      ])
      setSummary(summaryData)
      setSupporters(supportersData)
      setChartData(
        historyData.map((item) => ({
          month: MONTH_NAMES_PT[item.monthNum - 1].slice(0, 3),
          valueInCents: item.valueInCents,
          supporters: item.supporters,
        }))
      )
    } catch {
      // silently fail
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const userToken = localStorage.getItem(AUTH_STORAGE_KEY)
    const userData = localStorage.getItem(USER_DATA_STORAGE_KEY)

    if (!userToken || !userData) {
      toast({
        title: t("toast.title-no-authenticated"),
        description: t("toast.description-no-authenticated"),
        duration: 3000,
      })
      router.push(`/${locale}/login`)
    } else {
      const parsed = JSON.parse(userData)
      setUser(parsed)

      if (!parsed.stripeConnectAccountId || !parsed.connectOnboardingComplete) {
        setShowOnboardingModal(true)
        setLoading(false)
      } else {
        fetchData(selectedMonth, selectedYear)
      }
    }
  }, [locale, router, t, fetchData, selectedMonth, selectedYear])

  const handlePrevMonth = () => {
    if (selectedMonth === 1) {
      setSelectedMonth(12)
      setSelectedYear((y) => y - 1)
    } else {
      setSelectedMonth((m) => m - 1)
    }
  }

  const handleNextMonth = () => {
    const now = new Date()
    const isCurrentMonth = selectedMonth === now.getMonth() + 1 && selectedYear === now.getFullYear()
    if (isCurrentMonth) return

    if (selectedMonth === 12) {
      setSelectedMonth(1)
      setSelectedYear((y) => y + 1)
    } else {
      setSelectedMonth((m) => m + 1)
    }
  }

  const nextPayoutDate = () => {
    const next = new Date(selectedYear, selectedMonth, 5)
    return next.toLocaleDateString("pt-BR", { day: "2-digit", month: "long" })
  }

  return (
    <div className="bg-gray-1300 min-h-screen flex flex-col md:flex-row overflow-x-hidden">
      <VerticalMenu activeMenu="recurrence" />
      <main className="flex-1 p-4 md:p-8 md:pt-12 pb-24 md:pb-8 w-full overflow-x-hidden">
        <div className="max-w-[1400px]">
          {/* Page header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-semibold text-gray-50 font-poppins">
                {t("page-title")}
              </h1>
              <p className="text-sm text-gray-400 mt-1">{t("page-subtitle")}</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>{t("system-status")}</span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-semantic-green-500" />
                <span className="text-semantic-green-300">{t("operational")}</span>
              </span>
            </div>
          </div>

          {/* Month navigation */}
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={handlePrevMonth}
              className="p-1.5 rounded-lg bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            <span className="text-sm font-medium text-gray-200 min-w-[160px] text-center">
              {MONTH_NAMES_PT[selectedMonth - 1]} {selectedYear}
            </span>
            <button
              onClick={handleNextMonth}
              className="p-1.5 rounded-lg bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          {loading ? (
            <div className="flex items-center justify-center p-20">
              <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
            </div>
          ) : (
            <div className="space-y-6">
              {/* Summary cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-900 rounded-lg p-5">
                  <div className="flex items-center gap-2 text-gray-400 text-xs uppercase tracking-wide mb-2">
                    <Wallet size={14} />
                    {t("cards.monthly-support")}
                  </div>
                  <p className="text-2xl font-bold text-gray-50">
                    {formatCurrency(summary?.totalMonthlyAmountInCents ?? 0, summary?.currency ?? "brl")}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{t("cards.monthly-estimate")}</p>
                </div>

                <div className="bg-gray-900 rounded-lg p-5">
                  <div className="flex items-center gap-2 text-gray-400 text-xs uppercase tracking-wide mb-2">
                    <Users size={14} />
                    {t("cards.active-sponsors")}
                  </div>
                  <p className="text-2xl font-bold text-gray-50">
                    {summary?.activeSupportersCount ?? 0}
                  </p>
    
                    {summary?.supportersDiff !== 0 && (
                      <p className={`text-xs font-bold ${
                        (summary?.supportersDiff ?? 0) > 0 ? "text-semantic-green-300" : "text-red-400"
                      }`}>
                        {(summary?.supportersDiff ?? 0) > 0 ? "+" : ""}{summary?.supportersDiff} {t("cards.this-month")}
                      </p>
                    )}
       
                </div>

                <div className="bg-gray-900 rounded-lg p-5">
                  <div className="flex items-center gap-2 text-gray-400 text-xs uppercase tracking-wide mb-2">
                    <Calendar size={14} />
                    {t("cards.next-payout")}
                  </div>
                  <p className="text-2xl font-bold text-gray-50">{nextPayoutDate()}</p>
                  <p className="text-xs text-gray-500 mt-1">{t("cards.payout-estimate")}</p>
                </div>
              </div>

              {/* Chart + Supporters */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <RecurrencyChart data={chartData} currency={summary?.currency ?? "brl"} />

                  {/* Growth stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-900 rounded-lg p-4 flex items-center gap-4">
                      <div className="bg-brand-blue-600/15 rounded-full p-3">
                        <TrendingUp className="h-5 w-5 text-brand-blue-400" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">{t("stats.monthly-growth")}</p>
                        <p className={`text-lg font-bold ${(() => {
                          if (chartData.length < 2) return "text-gray-400"
                          const curr = chartData[chartData.length - 1].supporters
                          const prev = chartData[chartData.length - 2].supporters
                          if (curr > prev) return "text-semantic-green-300"
                          if (curr < prev) return "text-red-400"
                          return "text-gray-400"
                        })()}`}>
                          {(() => {
                            if (chartData.length < 2) return "0%"
                            const curr = chartData[chartData.length - 1].supporters
                            const prev = chartData[chartData.length - 2].supporters
                            if (prev === 0) return curr > 0 ? "+100%" : "0%"
                            const pct = ((curr - prev) / prev * 100).toFixed(1)
                            return `${Number(pct) > 0 ? "+" : ""}${pct}%`
                          })()}
                        </p>
                      </div>
                    </div>
                    <div className="bg-gray-900 rounded-lg p-4 flex items-center gap-4">
                      <div className="bg-semantic-yellow-500/15 rounded-full p-3">
                        <Heart className="h-5 w-5 text-semantic-yellow-300" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">{t("stats.new-supporters")}</p>
                        <p className={`text-lg font-bold ${(() => {
                          if (chartData.length < 2) return "text-gray-400"
                          const diff = chartData[chartData.length - 1].supporters - chartData[chartData.length - 2].supporters
                          if (diff > 0) return "text-semantic-green-300"
                          if (diff < 0) return "text-red-400"
                          return "text-gray-400"
                        })()}`}>
                          {(() => {
                            if (chartData.length < 2) return "0"
                            const diff = chartData[chartData.length - 1].supporters - chartData[chartData.length - 2].supporters
                            return `${diff > 0 ? "+" : ""}${diff}`
                          })()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <SupportersList
                  supporters={supporters}
                  currency={summary?.currency ?? "brl"}
                />
              </div>

              {/* Transfer history */}
              <div className="bg-gray-900 rounded-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-50">{t("transfers.title")}</h3>
                    <p className="text-sm text-gray-400">{t("transfers.description")}</p>
                  </div>
                  <Button
                    onClick={() => window.open("https://dashboard.stripe.com", "_blank")}
                    className="bg-[#635BFF] hover:bg-[#5851e0] text-white"
                    size="sm"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    {t("transfers.view-stripe")}
                  </Button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">
                          {t("transfers.table.id")}
                        </th>
                        <th className="px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">
                          {t("transfers.table.date")}
                        </th>
                        <th className="px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">
                          {t("transfers.table.amount")}
                        </th>
                        <th className="px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">
                          {t("transfers.table.status")}
                        </th>
                        <th className="px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">
                          {t("transfers.table.actions")}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700/50">
                      <tr>
                        <td colSpan={5} className="px-4 py-8 text-center text-sm text-gray-400">
                          {t("transfers.empty")}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <AlertDialog open={showOnboardingModal}>
        <AlertDialogContent className="bg-gray-900 border-gray-700">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-gray-50 text-lg">
              {t("onboarding.title")}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400 text-sm space-y-2">
              <p>{t("onboarding.description")}</p>
              <p>{t("onboarding.steps")}</p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button
              variant="secondary"
              className="bg-gray-700 hover:bg-gray-600 text-gray-200"
              onClick={() => router.push(`/${locale}/dashboard`)}
            >
              {t("onboarding.go-back")}
            </Button>
            <Button
              className="bg-brand-blue-600 hover:bg-brand-blue-700 text-white"
              onClick={handleStartOnboarding}
              disabled={onboardingLoading}
            >
              {onboardingLoading && <Loader2 className="h-4 w-4 animate-spin" />}
              {t("onboarding.start-button")}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Toaster />
    </div>
  )
}
