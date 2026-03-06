"use client"

import { useTranslations } from "next-intl"
import { Supporter } from "@/services/donation.service"

type SupportersListProps = {
  supporters: Supporter[]
  currency: string
}

function formatCurrency(cents: number, currency: string) {
  const amount = cents / 100
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: currency || "brl",
  }).format(amount)
}

function getInitials(name: string, email: string): string {
  if (name) {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }
  return email.slice(0, 2).toUpperCase()
}

function getAvatarColor(index: number): string {
  const colors = [
    "bg-brand-blue-600",
    "bg-semantic-green-500",
    "bg-semantic-yellow-500",
    "bg-purple-600",
    "bg-pink-600",
  ]
  return colors[index % colors.length]
}

export function SupportersList({ supporters, currency }: SupportersListProps) {
  const t = useTranslations("recurrence.supporters")

  const topSupporters = supporters.slice(0, 5)

  return (
    <div className="bg-gray-900 rounded-lg p-6 h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-50">{t("title")}</h3>
        <button className="text-sm text-brand-blue-400 hover:text-brand-blue-300 transition-colors">
          {t("view-all")}
        </button>
      </div>

      {topSupporters.length === 0 ? (
        <p className="text-sm text-gray-400 text-center py-8">{t("empty")}</p>
      ) : (
        <div className="space-y-3">
          {topSupporters.map((supporter, index) => (
            <div
              key={supporter._id}
              className="flex items-center justify-between p-3 bg-gray-800 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold text-white ${getAvatarColor(index)}`}
                >
                  {getInitials(supporter.donorName, supporter.donorEmail)}
                </div>
                <div>
                  <p className="text-sm text-gray-100">{supporter.donorEmail}</p>
                  <p className={`text-xs ${supporter.status === "ACTIVE" ? "text-semantic-green-300" : "text-gray-400"}`}>
                    {supporter.status === "ACTIVE" ? t("status-active") : t("status-paused")}
                  </p>
                </div>
              </div>
              <span className="text-sm font-semibold text-brand-blue-400">
                {formatCurrency(supporter.amountInCents, currency)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
