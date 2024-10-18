import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Navbar } from "@/components/shared/Navbar"
import { ArrowUpRight } from "lucide-react"
import AthleteSvg from "@/assets/images/athlete-man.svg";
import { Badge } from "@/components/ui/badge"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-1300 text-gray-50">
      <Navbar />

      <main>
        <section className="container mx-auto md:px-12 pt-10 md:py-20 flex flex-col md:flex-row items-center justify-center gap-4">
          <div className="md:w-1/2 space-y-4 md:space-y-6 px-4">
            <div className="flex items-center gap-2 font-secondary">
              <Badge className="bg-brand-blue-600 rounded-sm">Novo</Badge>
              <p className="text-sm text-gray-400">Aumente sua visibilidade!</p>
            </div>
            <h1 className="text-4xl md:text-6xl text-brand-blue-50">
              Seu portfólio<br/>
              <span className="font-bold">DE ATLETA</span>
            </h1>
            <p className="text-sm md:text-base text-gray-200">
              Saiba como se apresentar na internet mostrando todo o seu potencial e experiência, 
              tudo em um só lugar com alto nível e perfomace no seu portfólio.
            </p>
            <div className="flex flex-col md:flex-row gap-4">
              <Button size="lg" className="flex flex-row gap-1 items-center text-white bg-brand-blue-600 hover:bg-brand-blue-700">
                Criar portfólio grátis
                <ArrowUpRight size={18} color="#fff" />
              </Button>
              <Button className="text-brand-blue-50 hover:bg-gray-700 hover:text-white" size="lg" variant="ghost">Acessar agora</Button>
            </div>
          </div>
          <div className="md:w-1/2 mt-10 md:mt-0">
            <Image src={AthleteSvg} width={500} height={500} alt="Athlete in blue gi" className="rounded-lg" />
          </div>
        </section>

        <section className="bg-gray-900 py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-10">How BJJLink will help you</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { title: "Create your portfolio", description: "Easily build your athletic profile" },
                { title: "Showcase achievements", description: "Display your medals and titles" },
                { title: "Connect with others", description: "Network with athletes and coaches" },
                { title: "Track progress", description: "Monitor your growth over time" },
              ].map((feature, index) => (
                <Card key={index} className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <div className="w-10 h-10 rounded-full bg-blue-600 mb-4"></div>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-400">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-20">
          <div className="flex flex-col md:flex-row items-center mb-20">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <Image src="/placeholder.svg?height=300&width=300" width={300} height={300} alt="Athlete using phone" className="rounded-lg" />
            </div>
            <div className="md:w-1/2 md:pl-10">
              <h2 className="text-3xl font-bold mb-4">Your portfolio ready in minutes</h2>
              <p className="text-gray-400 mb-4">Quickly set up your profile and start showcasing your achievements.</p>
              <Button variant="outline">Learn more</Button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row-reverse items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <Image src="/placeholder.svg?height=300&width=300" width={300} height={300} alt="Mobile app screenshot" className="rounded-lg" />
            </div>
            <div className="md:w-1/2 md:pr-10">
              <h2 className="text-3xl font-bold mb-4">Professional design for your portfolio</h2>
              <p className="text-gray-400 mb-4">Stand out with a sleek and professional-looking athlete profile.</p>
              <Button variant="outline">See examples</Button>
            </div>
          </div>
        </section>

        <section className="bg-gray-900 py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-10">Choose your plan</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "Free", price: "R$ 0,00", features: ["Basic portfolio", "Limited storage", "Community access"] },
                { title: "Premium", price: "R$ 14,90", features: ["Advanced portfolio", "Unlimited storage", "Priority support", "Analytics"] },
                { title: "Professional", price: "R$ 29,90", features: ["Custom domain", "SEO tools", "Marketing integrations", "Team management"] },
              ].map((plan, index) => (
                <Card key={index} className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle>{plan.title}</CardTitle>
                    <CardDescription className="text-2xl font-bold">{plan.price}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center">
                          <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Choose plan</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-20">
          <h2 className="text-3xl font-bold text-center mb-10">Athletes using our platform</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <Card key={index} className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle>Athlete Name</CardTitle>
                  <CardDescription>Belt Rank</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400">"BJJLink has been a game-changer for my career. It's so easy to showcase my achievements and connect with sponsors."</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="bg-gray-900 py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-10">Start creating your portfolio for free</h2>
            <div className="max-w-md mx-auto">
              <Input type="email" placeholder="Enter your email" className="mb-4" />
              <Button className="w-full bg-blue-600 hover:bg-blue-700">Get Started</Button>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-20">
          <h2 className="text-3xl font-bold text-center mb-10">Latest from our blog</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, index) => (
              <Card key={index} className="bg-gray-800 border-gray-700">
                <Image src="/placeholder.svg?height=200&width=400" width={400} height={200} alt="Blog post thumbnail" className="w-full" />
                <CardHeader>
                  <CardTitle>Blog Post Title</CardTitle>
                  <CardDescription>Date</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400">Short description of the blog post goes here...</p>
                </CardContent>
                <CardFooter>
                  <Button variant="link" className="text-blue-400">Read more</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        <section className="container mx-auto px-4 py-20">
          <h2 className="text-3xl font-bold text-center mb-10">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="max-w-2xl mx-auto">
            {[...Array(4)].map((_, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>Question {index + 1}</AccordionTrigger>
                <AccordionContent>
                  Answer to question {index + 1} goes here. This is where you would provide detailed information to address common inquiries from users.
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </main>

      <footer className="bg-gray-900 py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">BJJLink</h3>
              <p className="text-gray-400">Your ultimate platform for creating and managing your athlete portfolio.</p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-400 hover:text-blue-400">Home</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-blue-400">About</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-blue-400">Pricing</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-blue-400">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-400 hover:text-blue-400">Terms of Service</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-blue-400">Privacy Policy</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Connect</h3>
              <div className="flex space-x-4">
                <Link href="#" className="text-gray-400 hover:text-blue-400">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </Link>
                <Link href="#" className="text-gray-400 hover:text-blue-400">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292  4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </Link>
                <Link href="#" className="text-gray-400 hover:text-blue-400">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; 2024 BJJLink. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}