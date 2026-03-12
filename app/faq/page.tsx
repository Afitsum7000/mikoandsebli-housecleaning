import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CTASection } from "@/components/home/cta-section"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { MessageCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "FAQ | Sebli and Miko House Cleaning",
  description: "Frequently asked questions about Sebli and Miko House Cleaning services. Find answers about pricing, scheduling, services, and more.",
}

const faqs = [
  {
    category: "Services",
    questions: [
      {
        question: "What cleaning services do you offer?",
        answer: "We offer a comprehensive range of cleaning services including residential cleaning, office cleaning, deep cleaning, and move in/out cleaning. Each service can be customized to meet your specific needs.",
      },
      {
        question: "Do you bring your own cleaning supplies?",
        answer: "Yes, we bring all necessary cleaning supplies and equipment. We use eco-friendly, professional-grade products that are safe for your family and pets. If you have specific product preferences, just let us know.",
      },
      {
        question: "Can I customize my cleaning service?",
        answer: "Absolutely! We understand that every home is different. You can add or remove specific tasks, focus on certain areas, or request special services. Just discuss your needs with us when booking.",
      },
      {
        question: "Do you clean offices and commercial spaces?",
        answer: "Yes, we provide professional cleaning services for offices and commercial spaces of all sizes. We can work during or after business hours to minimize disruption to your operations.",
      },
    ],
  },
  {
    category: "Booking & Scheduling",
    questions: [
      {
        question: "How do I book a cleaning?",
        answer: "You can book a cleaning by calling us at +251 911 123 456, sending an email to info@seblimiko.com, or filling out the contact form on our website. We will respond within 24 hours.",
      },
      {
        question: "What are your working hours?",
        answer: "We operate Monday through Saturday, from 7:00 AM to 6:00 PM. We can accommodate special scheduling requests for an additional fee.",
      },
      {
        question: "How far in advance should I book?",
        answer: "We recommend booking at least 48 hours in advance for regular cleanings. For deep cleaning or move in/out services, 1 week notice is preferred to ensure availability.",
      },
      {
        question: "Can I reschedule or cancel my booking?",
        answer: "Yes, you can reschedule or cancel your booking with at least 24 hours notice. Late cancellations may incur a fee of up to 50% of the service cost.",
      },
    ],
  },
  {
    category: "Pricing & Payment",
    questions: [
      {
        question: "How much do your services cost?",
        answer: "Pricing depends on the size of your space, type of cleaning, and specific requirements. Residential cleaning starts from 500 ETB, office cleaning from 800 ETB, and deep cleaning from 1,500 ETB. Contact us for a free, accurate quote.",
      },
      {
        question: "Do you offer discounts for regular bookings?",
        answer: "Yes! We offer discounts for recurring bookings. Weekly clients receive 15% off, bi-weekly clients get 10% off, and monthly clients get 5% off regular pricing.",
      },
      {
        question: "What payment methods do you accept?",
        answer: "We accept cash, bank transfer, and mobile money (Telebirr, CBE Birr). Payment is due upon completion of the cleaning service.",
      },
      {
        question: "Do you require a deposit?",
        answer: "For first-time customers booking deep cleaning or move in/out services, we require a 25% deposit to confirm the booking. Regular customers do not need to pay a deposit.",
      },
    ],
  },
  {
    category: "Trust & Safety",
    questions: [
      {
        question: "Are your cleaners background checked?",
        answer: "Yes, all our cleaning professionals undergo thorough background checks, reference verification, and professional training before joining our team. Your safety and security are our top priorities.",
      },
      {
        question: "Are you insured?",
        answer: "Yes, we carry comprehensive insurance coverage. In the unlikely event of any damage or accidents, you are fully protected.",
      },
      {
        question: "What if I am not satisfied with the cleaning?",
        answer: "Your satisfaction is guaranteed! If you are not happy with any aspect of our service, contact us within 24 hours and we will re-clean the areas of concern at no additional charge.",
      },
      {
        question: "Do I need to be home during the cleaning?",
        answer: "It is not required, but you are welcome to be home if you prefer. Many of our clients provide us with keys or access codes. All access information is kept strictly confidential.",
      },
    ],
  },
]

export default function FAQPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-b from-secondary/50 to-background py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                FAQ
              </p>
              <h1 className="mt-2 text-balance font-[family-name:var(--font-heading)] text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                Frequently Asked Questions
              </h1>
              <p className="mt-6 text-pretty text-lg text-muted-foreground">
                Find answers to common questions about our cleaning services, booking process, and policies.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="space-y-12">
              {faqs.map((category) => (
                <div key={category.category}>
                  <h2 className="mb-6 font-[family-name:var(--font-heading)] text-2xl font-bold text-foreground">
                    {category.category}
                  </h2>
                  <Accordion type="single" collapsible className="w-full">
                    {category.questions.map((faq, index) => (
                      <AccordionItem key={index} value={`${category.category}-${index}`}>
                        <AccordionTrigger className="text-left font-medium">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))}
            </div>

            {/* Still have questions */}
            <div className="mt-16 rounded-2xl bg-secondary/50 p-8 text-center">
              <MessageCircle className="mx-auto h-12 w-12 text-primary" />
              <h3 className="mt-4 font-[family-name:var(--font-heading)] text-xl font-semibold text-foreground">
                Still have questions?
              </h3>
              <p className="mt-2 text-muted-foreground">
                Can not find the answer you are looking for? Our team is here to help.
              </p>
              <Button asChild className="mt-6">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
