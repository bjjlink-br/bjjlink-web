import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useLocale, useTranslations } from "next-intl"
import { AccountStatus, PlanType, UserAccountInfo } from "@/utils/types"
import { useState } from "react"
import { Check } from "lucide-react"
import { PlanButton } from "@/components/shared/PlanButton"
import { Separator } from "@/components/ui/separator"
import { useRouter } from "next/navigation"
import { AUTH_STORAGE_KEY } from "@/contexts/AuthContext"

type ManageSubscriptionProps = {
  user?: UserAccountInfo
}

export function ManageSubscription({ user }: ManageSubscriptionProps) {
  const t = useTranslations("settings");
  const tPricing = useTranslations("pricing");
  const [isAnnual, setIsAnnual] = useState(false);
  const router = useRouter();
  const locale = useLocale();

  const handleManagementSubscription = () => {
    // PROD URL
    // https://billing.stripe.com/p/login/8wM9EF2t0bGucJa8ww
    // TESTE URL
    const url = 'https://billing.stripe.com/p/login/test_cN29CJ45N5NN5ZC4gg'
    window.open(url, '_blank');
  }

  const selectPlan = ({ plan, isAnnual }: { plan: PlanType; isAnnual: boolean }) => {
    const userToken = localStorage.getItem(AUTH_STORAGE_KEY);

    if(userToken){
      const token = JSON.parse(userToken)
      router.push(`/${locale}/loadingpage?token=${token.acess_token}&selectedPlan=${plan.name}&period=${isAnnual ? "annual" : "monthly"}`);
    } else {
      router.push(`/${locale}/login`);
    }
  }

  const allPlans: PlanType[] = [
    {
      name: tPricing('plans.free.name'),
      price: 0,
      discount: tPricing('plans.free.discount'),
      description: tPricing('plans.free.description'),
      descriptionDetail: tPricing('plans.free.description-detail'),
      features: [
        { name: tPricing('plans.free.features.public-page'), available: true },
        { name: tPricing('plans.free.features.photo-management'), available: true },
        { name: tPricing('plans.free.features.basic-access'), available: false },
        { name: tPricing('plans.free.features.social-links'), available: false },
        { name: tPricing('plans.free.features.link-management'), available: false },
        { name: '', available: false },
      ],
    },
    {
      name: tPricing('plans.professional.name'),
      price: 14,
      discount: tPricing('plans.professional.discount'),
      description: tPricing('plans.professional.description'),
      descriptionDetail: tPricing('plans.professional.description-detail'),
      features: [
        { name: tPricing('plans.professional.features.public-page'), available: true },
        { name: tPricing('plans.professional.features.photo-management'), available: true },
        { name: tPricing('plans.professional.features.platform-access'), available: true },
        { name: tPricing('plans.professional.features.social-links'), available: false },
        { name: tPricing('plans.professional.features.link-management'), available: false },
      ],
      popular: true,
    },
  ]

   const plans = isAnnual 
    ? allPlans.filter(plan => plan.name === t('plans.professional.name'))
    : allPlans


  // Mostrar cards de pricing se o usuário não tiver assinatura ativa
  if (user?.status !== AccountStatus.ACTIVE) {
    return (
      <div className="text-white w-full px-4 md:px-0">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center mb-8">
            <div className="bg-gray-900 rounded-lg p-2 md:px-4 md:py-2 inline-flex w-full md:w-auto">
              <PlanButton isActive={!isAnnual} onClick={() => setIsAnnual(false)}>
                Plano mensal
              </PlanButton>
              <PlanButton isActive={isAnnual} onClick={() => setIsAnnual(true)}>
                Plano anual
                <span className={`md:block hidden ml-2 text-xs bg-blue-600/15 ${isAnnual ? 'text-white' : 'text-brand-blue-300'} px-2 py-1 rounded-full`}>
                  -20% Off
                </span>
              </PlanButton>
            </div>
          </div>

          <div className={`grid grid-cols-1 ${plans.length > 1 ? 'md:grid-cols-2' : ''} gap-8 justify-items-center max-w-4xl mx-auto`}>
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-lg p-4 md:p-6 flex flex-col w-full max-w-md ${
                  plan.popular ? 'bg-brand-blue-950' : 'bg-gray-900'
                }`}
              >
                <div className="flex justify-between items-start mb-3 md:mb-4">
                  <div className="flex flex-col w-full gap-3 md:gap-6">
                    <div className='flex items-center justify-between'>
                      <h3 className="text-lg md:text-xl font-semibold">{plan.name}</h3>
                      {plan.popular && (
                        <span className="bg-brand-blue-600 text-white text-xs px-2 py-1 rounded-full">
                          Popular
                        </span>
                      )}
                    </div>
                    <Separator className='bg-gray-600' />
                  </div>
                </div>
                <div className='flex items-center gap-1 flex-wrap'>
                  <span className={`text-2xl md:text-3xl font-medium text-white ${plan.price === 0 && 'line-through'}`}>
                    R$ {isAnnual ? '169,90' : plan.price.toFixed(2)}
                  </span>
                  {plan.discount && (
                    <span className={`ml-2 text-xs ${plan.popular ? 'bg-[#AFFC6D]' : 'bg-blue-600/15'} ${plan.popular ? 'text-[#283819]' : 'text-brand-blue-300'} font-semibold px-2 py-1 rounded-full`}>
                      {isAnnual ? '20% Off' : plan.discount}
                    </span>
                  )}
                </div>
                <span className="text-gray-200 text-xs md:text-sm">
                  {tPricing('billing-period')}
                </span>

                <div className={`${plan.popular ? 'bg-brand-blue-900' : 'bg-gray-800'} p-3 md:p-4 rounded-sm my-4 md:my-6`}>
                  <p className="text-gray-50 text-sm md:text-base">{plan.description}</p>
                  <span className="text-gray-200 text-xs md:text-sm">{plan.descriptionDetail}</span>
                </div>
                <h4 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">{tPricing('advantages')}</h4>
                <ul className="space-y-1.5 md:space-y-2 mb-4 md:mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check 
                        className={`h-4 w-4 md:h-5 md:w-5 mr-2 flex-shrink-0 ${
                          feature.available ? 'text-green-500' : 'text-gray-600'
                        }`} 
                      />
                      <span 
                        className={`text-xs md:text-sm ${
                          feature.available ? 'text-gray-300' : 'text-gray-600'
                        }`}
                      >
                        {feature.name}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="flex-grow"></div>
                <button
                  onClick={() => selectPlan({
                    plan,
                    isAnnual
                  })}
                  className={`w-full py-2 md:py-2.5 rounded-md mt-auto text-sm md:text-base ${
                    plan.popular
                      ? 'bg-brand-blue-600 hover:bg-brand-blue-700'
                      : 'border border-gray-100 bg-transparent hover:bg-gray-600'
                  }`}
                >
                  {tPricing('choose-plan')}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Mostrar gerenciamento de assinatura para usuários com assinatura ativa
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

