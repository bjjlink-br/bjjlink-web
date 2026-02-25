'use client'

import { useState } from 'react'
import { Check } from 'lucide-react'
import { PlanButton } from './PlanButton'
import { Separator } from '../ui/separator'
import { PlanType } from '@/utils/types'
import { useTranslations } from 'next-intl'

type PricingComponentProps = {
  handleSelectPlan: ({ plan, isAnnual }: { plan: PlanType; isAnnual: boolean }) => void;
}

export default function PricingComponent({ handleSelectPlan }: PricingComponentProps) {
  const [isAnnual, setIsAnnual] = useState(false)
  const t = useTranslations('pricing')

  const allPlans: PlanType[] = [
    {
      name: t('plans.free.name'),
      price: 29.90,
      discount: t('plans.free.discount'),
      description: t('plans.free.description'),
      descriptionDetail: t('plans.free.description-detail'),
      features: [
        { name: t('plans.free.features.public-page'), available: true },
        { name: t('plans.free.features.photo-management'), available: true },
        { name: t('plans.free.features.basic-access'), available: false },
        { name: t('plans.free.features.social-links'), available: false },
        { name: t('plans.free.features.link-management'), available: false },
      ],
    },
    {
      name: t('plans.professional.name'),
      price: 29.90,
      discount: t('plans.professional.discount'),
      description: t('plans.professional.description'),
      descriptionDetail: t('plans.professional.description-detail'),
      features: [
        { name: t('plans.professional.features.public-page'), available: true },
        { name: t('plans.professional.features.photo-management'), available: true },
        { name: t('plans.professional.features.platform-access'), available: true },
        { name: t('plans.professional.features.social-links'), available: true },
        { name: t('plans.professional.features.link-management'), available: true },
      ],
      popular: true,
    },
  ]

  // Filtra os planos: se for anual, mostra apenas o Professional
  const plans = isAnnual 
    ? allPlans.filter(plan => plan.name === t('plans.professional.name'))
    : allPlans

  return (
    <div className="text-white md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-center mb-8">
          <div className="bg-gray-900 rounded-lg p-2 md:px-4 md:py-2 inline-flex">
            <PlanButton isActive={!isAnnual} onClick={() => setIsAnnual(false)}>
              {t('monthly-title')}
            </PlanButton>
            <PlanButton isActive={isAnnual} onClick={() => setIsAnnual(true)}>
              {t('annual-title')}
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
              className={`rounded-lg p-6 flex flex-col max-w-[420px] ${
                plan.popular ? 'bg-brand-blue-950' : 'bg-gray-900'
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex flex-col w-full gap-6">
                    <div className='flex items-center justify-between'>
                        <h3 className="text-xl font-semibold">{plan.name}</h3>
                        {plan.popular && (
                        <span className="bg-brand-blue-600 text-white text-xs px-2 py-1 rounded-full">
                            Popular
                        </span>
                        )}
                    </div>
                    <Separator className='bg-gray-600' />
                </div>
              </div>
              <div className='flex items-center gap-1'>
                <span className={`text-3xl font-medium text-white ${plan.name === 'Gratuito - 7 Dias' && 'line-through'}`}>
                  R$ {isAnnual ? '287,04' : plan.price.toFixed(2)}
                </span>
                {plan.discount && (
                  <span className={`ml-2 text-xs ${plan.popular ? 'bg-[#AFFC6D]' : 'bg-blue-600/15'} ${plan.popular ? 'text-[#283819]' : 'text-brand-blue-300'} font-semibold px-2 py-1 rounded-full`}>
                    {isAnnual ? '20% Off' : plan.discount}
                  </span>
                )}
              </div>
              <span className="text-gray-200 text-sm">
                {plan.name === 'Gratuito - 7 Dias' ? t('free-period') : t('billing-period')}
              </span>

              <div className={`${plan.popular ? 'bg-brand-blue-900' : 'bg-gray-800'} p-4 rounded-sm my-6`}>
                <p className="text-gray-50">{plan.description}</p>
                <span className="text-gray-200 text-sm">{plan.descriptionDetail}</span>
              </div>
              <h4 className="font-semibold mb-4">{t('advantages')}</h4>
              <ul className="space-y-2 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <div className={`flex items-center border ${feature.available ? 'border-semantic-green-500' : 'border-semantic-green-500/60'} rounded-sm p-1 mr-2`}>
                      <Check 
                        className={`h-2 w-2 flex-shrink-0 ${
                          feature.available ? 'text-semantic-green-500' : 'text-semantic-green-500/60'
                        }`} 
                      />
                    </div>
                    <span 
                      className={`text-sm ${
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
                onClick={() => handleSelectPlan({
                  plan,
                  isAnnual
                })}
                className={`w-full py-2 rounded-md mt-auto ${
                  plan.popular
                    ? 'bg-brand-blue-600 hover:bg-brand-blue-700'
                    : 'border border-gray-100 bg-transparent hover:bg-gray-600'
                }`}
              >
                {t('choose-plan')}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}