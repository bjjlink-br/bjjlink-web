import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export function FaqCards() {
  const faqItems = [
    {
      id: "01",
      question: "Rorem ipsum dolor sit amet, consectetur adipiscing elit?",
      answer: "Porem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar."
    },
    {
      id: "02",
      question: "Rorem ipsum dolor sit amet, consectetur adipiscing elit?",
      answer: "Porem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar."
    },
    {
      id: "03",
      question: "Rorem ipsum dolor sit amet, consectetur adipiscing elit?",
      answer: "Porem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar."
    },
    {
      id: "04",
      question: "Rorem ipsum dolor sit amet, consectetur adipiscing elit?",
      answer: "Porem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar."
    },
    {
      id: "05",
      question: "Rorem ipsum dolor sit amet, consectetur adipiscing elit?",
      answer: "Porem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar."
    },
    {
      id: "06",
      question: "Rorem ipsum dolor sit amet, consectetur adipiscing elit?",
      answer: "Porem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar."
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