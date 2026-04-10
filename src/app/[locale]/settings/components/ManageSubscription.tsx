import { Button } from "@/components/ui/button"
import { useLocale, useTranslations } from "next-intl"
import { AccountStatus, UserAccountInfo } from "@/utils/types"
import { useRouter } from "next/navigation"
import { manageSubscription } from "@/services/checkout.service"
import { AUTH_STORAGE_KEY } from "@/contexts/AuthContext"

type ManageSubscriptionProps = {
  user?: UserAccountInfo
}
const getToken = (): string  => {
  const stored = localStorage.getItem(AUTH_STORAGE_KEY)
  if (!stored) return ''
  return JSON.parse(stored).acess_token
}


export function ManageSubscription({ user }: ManageSubscriptionProps) {
  const t = useTranslations("settings.subscription")
  const router = useRouter()
  const locale = useLocale()
  const token = getToken();


  const handleManagementSubscription = async () => {
    const { url } = await manageSubscription(token,locale)

    window.open(url, '_blank')
  }

  if (user?.status !== AccountStatus.ACTIVE) {
    return (
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-50">{t("title")}</h3>
        </div>
        <div className="p-4 bg-gray-800 rounded-lg space-y-4">
          <p className="text-sm text-gray-300">{t("no-subscription")}</p>
          <Button
            onClick={() => router.push(`/${locale}/dashboard`)}
            className="bg-brand-blue-600 hover:bg-brand-blue-700"
          >
            {t("get-plan")}
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-gray-50">{t("title")}</h3>
      </div>
      <Button
        className="bg-brand-blue-600 hover:bg-brand-blue-700"
        onClick={handleManagementSubscription}
      >
        {t("manage-button")}
      </Button>
    </div>
  )
}
