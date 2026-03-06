"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useTranslations } from "next-intl"
import { AccountStatus, UserAccountInfo } from "@/utils/types"
import DEFAULT_AVATAR from "@/assets/images/user.png"
import { Section } from "@/utils/dataSections"
import { Camera, Check } from "lucide-react"

function getStatusLabel(status: AccountStatus, t: (key: string) => string): string {
  const statusMap: Record<AccountStatus, string> = {
    [AccountStatus.ACTIVE]: t("status.active"),
    [AccountStatus.TRIALING]: t("status.trialing"),
    [AccountStatus.PAST_DUE]: t("status.past-due"),
    [AccountStatus.UNPAID]: t("status.unpaid"),
    [AccountStatus.CANCELED]: t("status.canceled"),
    [AccountStatus.INCOMPLETE]: t("status.incomplete"),
    [AccountStatus.NEWLY_CREATED]: t("status.newly-created"),
  }
  return statusMap[status] || status
}

function getStatusColor(status: AccountStatus): string {
  switch (status) {
    case AccountStatus.ACTIVE:
      return "bg-brand-blue-600 text-white"
    case AccountStatus.TRIALING:
      return "bg-brand-blue-500 text-white"
    case AccountStatus.PAST_DUE:
    case AccountStatus.UNPAID:
      return "bg-semantic-yellow-500 text-gray-900"
    case AccountStatus.CANCELED:
    case AccountStatus.INCOMPLETE:
      return "bg-semantic-red-500 text-white"
    case AccountStatus.NEWLY_CREATED:
      return "bg-gray-400 text-gray-900"
    default:
      return "bg-gray-400 text-gray-900"
  }
}

export function ProfileSettings({ user, components }: { user: UserAccountInfo; components: Section[] }) {
  const t = useTranslations("settings.profile")
  const userPhoto = components.find((component) => component.type === "PROFILE") as any
  const userName = user.name ? user.name.charAt(0).toUpperCase() : user.domain.charAt(0).toUpperCase()

  const [name, setName] = useState(user.name ?? user.domain)
  const [email, setEmail] = useState(user.email)
  const [phone, setPhone] = useState("")
  const [username, setUsername] = useState(user.domain ? `${user.domain}` : "")

  const handleManageSubscription = () => {
    // PROD URL
    // https://billing.stripe.com/p/login/8wM9EF2t0bGucJa8ww
    // TESTE URL
    const url = 'https://billing.stripe.com/p/login/test_cN29CJ45N5NN5ZC4gg'
    window.open(url, '_blank')
  }

  return (
    <div className="space-y-6 w-full">
      {/* Profile header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Avatar className="w-20 h-20">
              <AvatarImage src={userPhoto?.images[0]?.url ?? DEFAULT_AVATAR} alt="Profile picture" />
              <AvatarFallback>{userName}</AvatarFallback>
            </Avatar>
            <div className="absolute bottom-0 right-0 bg-brand-blue-600 rounded-full p-1.5 cursor-pointer">
              <Camera className="h-3 w-3 text-white" />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-50">{user.name ?? user.domain}</h3>
            <p className="text-sm text-gray-400">{user.email}</p>
            <span className={`inline-block mt-1.5 px-3 py-0.5 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
              {getStatusLabel(user.status, t)}
            </span>
          </div>
        </div>
        <Button
          onClick={handleManageSubscription}
          className="bg-brand-blue-600 hover:bg-brand-blue-700 text-white"
        >
          {t("manage-subscription")}
        </Button>
      </div>

      {/* Form fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-gray-400 text-xs" htmlFor="name">{t("full-name")}</Label>
          <Input
            className="bg-gray-800 border border-gray-600 text-gray-100"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label className="text-gray-400 text-xs" htmlFor="email">Email</Label>
          <Input
            className="bg-gray-800 border border-gray-600 text-gray-100"
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            readOnly
          />
        </div>

        <div className="space-y-2">
          <Label className="text-gray-400 text-xs" htmlFor="phone">{t("phone")}</Label>
          <Input
            className="bg-gray-800 border border-gray-600 text-gray-100"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder={t("phone-placeholder")}
          />
        </div>

        <div className="space-y-2">
          <Label className="text-gray-400 text-xs" htmlFor="username">{t("username")}</Label>
          <Input
            className="bg-gray-800 border border-gray-600 text-gray-100"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-3">
        <Button className="bg-brand-blue-600 hover:bg-brand-blue-700">
          <Check className="h-4 w-4" />
          {t("save-changes")}
        </Button>
        <Button variant="secondary" className="bg-gray-700 hover:bg-gray-600 text-gray-200">
          {t("cancel")}
        </Button>
      </div>
    </div>
  )
}
