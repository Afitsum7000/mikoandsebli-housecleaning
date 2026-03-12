import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CTASection } from "@/components/home/cta-section"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Home, Building2, Sparkles, Package, CheckCircle2, 
  Sofa, UtensilsCrossed, Bath, Bed, Wind
} from "lucide-react"

export const metadata: Metadata = {
  title: "Our Services | Sebli and Miko House Cleaning",
  description: "Explore our professional cleaning services in Addis Ababa. Residential cleaning, office cleaning, deep cleaning, and move in/out cleaning services.",
}

const services = [
  {
    id: "residential",
    title: "Residential Cleaning",
    description: "Regular house cleaning services to keep your home fresh, clean, and comfortable. Perfect for busy families and professionals.",
    icon: Home,
    features: [
      "Dusting all surfaces and furniture",
      "Vacuuming and mopping floors",
      "Bathroom cleaning and sanitization",
      "Kitchen cleaning including appliances",
      "Bedroom tidying and bed making",
      "Trash removal and waste disposal",
    ],
    pricing: "Starting from 500 ETB",
  },
  {
    id: "office",
    title: "Office Cleaning",
    description: "Professional cleaning for offices and commercial spaces. Create a clean, productive work environment for your team.",
    icon: Building2,
    features: [
      "Workspace and desk cleaning",
      "Floor cleaning and maintenance",
      "Restroom cleaning and restocking",
      "Kitchen/break room cleaning",
      "Window and glass cleaning",
      "Trash and recycling management",
    ],
    pricing: "Starting from 800 ETB",
  },
  {
    id: "deep",
    title: "Deep Cleaning",
    description: "Thorough, intensive cleaning for spaces that need extra attention. We tackle every corner, crevice, and surface.",
    icon: Sparkles,
    features: [
      "Inside cabinet and drawer cleaning",
      "Behind and under furniture",
      "Baseboards and door frames",
      "Light fixtures and ceiling fans",
      "Interior window cleaning",
      "Appliance deep cleaning",
    ],
    pricing: "Starting from 1,500 ETB",
  },
  {
    id: "move",
    title: "Move In/Out Cleaning",
    description: "Complete cleaning for moving transitions. Leave your old place spotless or start fresh in your new home.",
    icon: Package,
    features: [
      "Complete property cleaning",
      "Inside all closets and cabinets",
      "All appliance cleaning",
      "Wall spot cleaning",
      "Window sill and track cleaning",
      "Final inspection walkthrough",
    ],
    pricing: "Starting from 2,000 ETB",
  },
]

const included = [
  { icon: Sofa, label: "Living Areas" },
  { icon: Bed, label: "Bedrooms" },
  { icon: Bath, label: "Bathrooms" },
  { icon: UtensilsCrossed, label: "Kitchen" },
  { icon: Wind, label: "Common Areas" },
]

export default function ServicesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-b from-secondary/50 to-background py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                Our Services
              </p>
              <h1 className="mt-2 text-balance font-[family-name:var(--font-heading)] text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                Professional Cleaning Services
              </h1>
              <p className="mt-6 text-pretty text-lg text-muted-foreground">
                From regular home maintenance to deep cleaning, we offer comprehensive cleaning solutions tailored to your specific needs.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                {included.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-2 rounded-full bg-card px-4 py-2 shadow-sm"
                  >
                    <item.icon className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium text-foreground">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="space-y-16">
              {services.map((service, index) => (
                <div
                  key={service.id}
                  id={service.id}
                  className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-16 ${
                    index % 2 === 1 ? "lg:grid-flow-dense" : ""
                  }`}
                >
                  {/* Image/Icon */}
                  <div className={index % 2 === 1 ? "lg:col-start-2" : ""}>
                    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10">
                      <div className="flex h-full items-center justify-center">
                        <div className="text-center">
                          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
                            <service.icon className="h-12 w-12 text-primary" />
                          </div>
                          <p className="mt-4 text-lg font-medium text-foreground/80">
                            {service.title}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div>
                    <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold tracking-tight text-foreground">
                      {service.title}
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                      {service.description}
                    </p>

                    <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                      <p className="text-lg font-semibold text-foreground">
                        {service.pricing}
                      </p>
                      <Button asChild>
                        <Link href="/contact">Get a Quote</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="bg-secondary/30 py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                How It Works
              </h2>
              <p className="mt-4 text-pretty text-lg text-muted-foreground">
                Booking a cleaning has never been easier.
              </p>
            </div>

            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { step: "1", title: "Request a Quote", description: "Fill out our contact form or call us to discuss your cleaning needs." },
                { step: "2", title: "Get Scheduled", description: "We will work with you to find a convenient time for your cleaning." },
                { step: "3", title: "We Clean", description: "Our professional team arrives on time and cleans your space thoroughly." },
                { step: "4", title: "Enjoy", description: "Relax in your sparkling clean space. Satisfaction guaranteed!" },
              ].map((item) => (
                <Card key={item.step} className="relative overflow-hidden">
                  <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                    {item.step}
                  </div>
                  <CardHeader className="pt-16">
                    <CardTitle className="font-[family-name:var(--font-heading)]">
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {item.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
