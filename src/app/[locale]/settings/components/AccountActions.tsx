"use client"

import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useTranslations } from "next-intl"
import { UserAccountInfo, AccountStatus } from "@/utils/types"
import { useLocale } from "next-intl"
import { useRouter } from "next/navigation"

type AccountActionsProps = {
  user?: UserAccountInfo;
}

export function AccountActions({ user }: AccountActionsProps) {
  const t = useTranslations("settings.account-actions")
  const router = useRouter()
  const locale = useLocale()

  const handleCancelSubscription = () => {
    // PROD URL
    // https://billing.stripe.com/p/login/8wM9EF2t0bGucJa8ww
    const url = 'https://billing.stripe.com/p/login/test_cN29CJ45N5NN5ZC4gg'
    window.open(url, '_blank')
  }

  return (
    <div className="border border-semantic-red-500/30 rounded-lg p-6 space-y-4">
      <p className="text-sm text-gray-400">{t("title")}</p>

      {/* Cancel Subscription */}
      {user?.status === AccountStatus.ACTIVE && (
        <div className="flex items-center justify-between py-3 border-b border-gray-700/50">
          <div>
            <p className="text-sm font-medium text-gray-100">{t("cancel-subscription")}</p>
            <p className="text-xs text-gray-400 mt-0.5">{t("cancel-subscription-description")}</p>
          </div>
          <Button
            onClick={handleCancelSubscription}
            variant="outline"
            size="sm"
            className="border-semantic-red-500/50 text-semantic-red-300 hover:bg-semantic-red-500/10 shrink-0"
          >
            {t("cancel-plan-button")}
          </Button>
        </div>
      )}

      {/* Deactivate Account */}
      <div className="flex items-center justify-between py-3 border-b border-gray-700/50">
        <div>
          <p className="text-sm font-medium text-gray-100">{t("deactivate-account")}</p>
          <p className="text-xs text-gray-400 mt-0.5">{t("deactivate-description")}</p>
        </div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="border-semantic-red-500/50 text-semantic-red-300 hover:bg-semantic-red-500/10 shrink-0"
            >
              {t("deactivate-button")}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="text-gray-900">{t("deactivate-dialog.title")}</AlertDialogTitle>
              <AlertDialogDescription>{t("deactivate-dialog.description")}</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="border border-brand-blue-600 text-brand-blue-600">{t("deactivate-dialog.cancel")}</AlertDialogCancel>
              <AlertDialogAction className="bg-destructive text-destructive-foreground">{t("deactivate-dialog.confirm")}</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      {/* Delete Account Permanently */}
      <div className="flex items-center justify-between py-3">
        <div>
          <p className="text-sm font-medium text-semantic-red-300">{t("delete-account")}</p>
          <p className="text-xs text-gray-400 mt-0.5">{t("delete-description")}</p>
        </div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="destructive"
              size="sm"
              className="bg-semantic-red-500 hover:bg-semantic-red-500/80 shrink-0"
            >
              {t("delete-button")}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="text-gray-900">{t("delete-dialog.title")}</AlertDialogTitle>
              <AlertDialogDescription>{t("delete-dialog.description")}</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="border border-brand-blue-600 text-brand-blue-600">{t("delete-dialog.cancel")}</AlertDialogCancel>
              <AlertDialogAction className="bg-destructive text-destructive-foreground text-red-600 hover:text-white">{t("delete-dialog.confirm")}</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
}
