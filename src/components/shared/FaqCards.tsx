import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { useTranslations } from 'next-intl'

export function FaqCards() {
  const t = useTranslations('faq')

  const faqItems = [
    {
      id: "01",
      question: t('items.01.question'),
      answer: t('items.01.answer')
    },
    {
      id: "02",
      question: t('items.02.question'),
      answer: t('items.02.answer')
    },
    {
      id: "03",
      question: t('items.03.question'),
      answer: t('items.03.answer')
    },
    {
      id: "04",
      question: t('items.04.question'),
      answer: t('items.04.answer')
    },
    {
      id: "05",
      question: t('items.05.question'),
      answer: t('items.05.answer')
    },
    {
      id: "06",
      question: t('items.06.question'),
      answer: t('items.06.answer')
    },
  ]

  return (
    <div className="min-h-screen bg-transparent">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {faqItems.map((item) => (
          <Card key={item.id} className="bg-gray-800 border-none rounded-none">
            <CardHeader className="bg-gray-900">
              <CardTitle className="text-white text-lg font-secondary">
                {item.id} - {item.question}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="text-gray-400 text-sm font-secondary">{item.answer}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}