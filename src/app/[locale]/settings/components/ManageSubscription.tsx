import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useTranslations } from "next-intl"

export function ManageSubscription() {
  const t = useTranslations("settings");

  const handleManagementSubscription = () => {
    // PROD URL
    // https://billing.stripe.com/p/login/8wM9EF2t0bGucJa8ww
    // TESTE URL
    const url = 'https://billing.stripe.com/p/login/test_cN29CJ45N5NN5ZC4gg'
    window.open(url, '_blank');
  }

  return (
    <Card className="w-full mx-auto bg-gray-900 border-none">
      <CardHeader>
        <CardTitle className="text-gray-50">{t("subscription.title")}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Button className="bg-brand-blue-600 hover:bg-brand-blue-700" onClick={handleManagementSubscription}>{t("subscription.manage-button")}</Button>
      </CardContent>
    </Card>
  )
}

