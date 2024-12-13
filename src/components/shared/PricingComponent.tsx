'use client'

import { useState } from 'react'
import { Check } from 'lucide-react'
import { PlanButton } from './PlanButton'
import { Separator } from '../ui/separator'
import { PlanType } from '@/utils/types'

const plans: PlanType[] = [
  {
    name: 'Free',
    price: 0,
    discount: '100% Off',
    description: 'Para pessoa',
    features: [
      'Yorem ipsum dolor sit amet, consectetur adipiscing elit.',
      'Yorem ipsum dolor sit amet, consectetur',
      'Yorem ipsum dolor sit amet, consectetur',
      'Yorem ipsum dolor sit amet, consectetur',
      'Yorem ipsum dolor sit amet, consectetur',
    ],
  },
  {
    name: 'Premium',
    price: 14,
    discount: '15% Off',
    description: 'Para pessoa',
    features: [
      'Yorem ipsum dolor sit amet, consectetur adipiscing elit.',
      'Yorem ipsum dolor sit amet, consectetur',
      'Yorem ipsum dolor sit amet, consectetur',
      'Yorem ipsum dolor sit amet, consectetur',
      'Yorem ipsum dolor sit amet, consectetur',
      'Yorem ipsum dolor sit amet, consectetur',
    ],
    popular: true,
  },
  {
    name: 'Profissional',
    price: 69.99,
    description: 'Para pessoa',
    features: [
      'Yorem ipsum dolor sit amet, consectetur adipiscing elit.',
      'Yorem ipsum dolor sit amet, consectetur',
      'Yorem ipsum dolor sit amet, consectetur',
      'Yorem ipsum dolor sit amet, consectetur',
      'Yorem ipsum dolor sit amet, consectetur',
      'Yorem ipsum dolor sit amet, consectetur',
    ],
  },
]

type PricingComponentProps = {
  handleSelectPlan: ({ plan, isAnnual }: { plan: PlanType; isAnnual: boolean }) => void;
}

export default function PricingComponent({ handleSelectPlan }: PricingComponentProps) {
  const [isAnnual, setIsAnnual] = useState(false)

  return (
    <div className="text-white md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-center mb-8">
          <div className="bg-gray-900 rounded-lg p-2 md:px-4 md:py-2 inline-flex">
            <PlanButton isActive={!isAnnual} onClick={() => setIsAnnual(false)}>
              Plano mensal
            </PlanButton>
            <PlanButton isActive={isAnnual} onClick={() => setIsAnnual(true)}>
              Plano anual
              <span className={`md:block hidden ml-2 text-xs bg-blue-600/15 ${isAnnual ? 'text-white' : 'text-brand-blue-300'} px-2 py-1 rounded-full`}>
                -15% Off
              </span>
            </PlanButton>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-lg p-6 flex flex-col ${
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
                <span className={`text-3xl font-medium text-white ${plan.price === 0 && 'line-through'}`}>
                  R$ {isAnnual ? (plan.price * 0.85 * 12).toFixed(2) : plan.price.toFixed(2)}
                </span>
                {plan.discount && (
                  <span className={`ml-2 text-xs ${plan.popular ? 'bg-[#AFFC6D]' : 'bg-blue-600/15'} ${plan.popular ? 'text-[#283819]' : 'text-brand-blue-300'} font-semibold px-2 py-1 rounded-full`}>
                    {plan.discount}
                  </span>
                )}
              </div>
              <span className="text-gray-200 text-sm">
                Valor cobrado por {isAnnual ? 'ano' : 'mês'}
              </span>

              <div className={`${plan.popular ? 'bg-brand-blue-900' : 'bg-gray-800'} p-4 rounded-sm my-6`}>
                <p className="text-gray-50">{plan.description}</p>
                <span className="text-gray-200 text-sm">Yorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
              </div>
              <h4 className="font-semibold mb-4">Vantagens</h4>
              <ul className="space-y-2 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-sm text-gray-300">{feature}</span>
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
                Escolher plano
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}