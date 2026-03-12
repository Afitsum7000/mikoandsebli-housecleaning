import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ContactForm } from "@/components/contact-form"
import { Card, CardContent } from "@/components/ui/card"
import { Phone, Mail, MapPin, Clock } from "lucide-react"

export const metadata: Metadata = {
  title: "Contact Us | Sebli and Miko House Cleaning",
  description: "Get in touch with Sebli and Miko House Cleaning. Request a free quote for professional cleaning services in Addis Ababa, Ethiopia.",
}

const contactInfo = [
  {
    icon: Phone,
    title: "Phone",
    content: "+251 911 123 456",
    href: "tel:+251911123456",
  },
  {
    icon: Mail,
    title: "Email",
    content: "info@seblimiko.com",
    href: "mailto:info@seblimiko.com",
  },
  {
    icon: MapPin,
    title: "Address",
    content: "Bole Road, Addis Ababa, Ethiopia",
    href: null,
  },
  {
    icon: Clock,
    title: "Working Hours",
    content: "Mon - Sat: 7:00 AM - 6:00 PM",
    href: null,
  },
]

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-b from-secondary/50 to-background py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                Contact Us
              </p>
              <h1 className="mt-2 text-balance font-[family-name:var(--font-heading)] text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                Get a Free Quote
              </h1>
              <p className="mt-6 text-pretty text-lg text-muted-foreground">
                Ready for a cleaner space? Contact us today to discuss your cleaning needs and get a free, no-obligation quote.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2">
              {/* Contact Info */}
              <div>
                <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-foreground">
                  Get in Touch
                </h2>
                <p className="mt-4 text-muted-foreground">
                  Have questions about our services? We are here to help. Reach out to us through any of the following channels or fill out the contact form.
                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {contactInfo.map((item) => (
                    <Card key={item.title}>
                      <CardContent className="flex items-start gap-4 p-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                          <item.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{item.title}</p>
                          {item.href ? (
                            <a
                              href={item.href}
                              className="mt-1 text-sm text-muted-foreground hover:text-primary"
                            >
                              {item.content}
                            </a>
                          ) : (
                            <p className="mt-1 text-sm text-muted-foreground">
                              {item.content}
                            </p>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Map placeholder */}
                <div className="mt-8 overflow-hidden rounded-2xl bg-secondary/50">
                  <div className="aspect-[16/9] flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="mx-auto h-12 w-12 text-primary/40" />
                      <p className="mt-2 text-sm text-muted-foreground">
                        Bole Road, Addis Ababa
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div>
                <Card className="border-2">
                  <CardContent className="p-6 sm:p-8">
                    <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-foreground">
                      Send Us a Message
                    </h2>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Fill out the form below and we will get back to you within 24 hours.
                    </p>
                    <div className="mt-6">
                      <ContactForm />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
