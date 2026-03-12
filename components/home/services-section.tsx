import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Home, Building2, Sparkles, Package, ArrowRight } from "lucide-react"

const services = [
  {
    title: "Residential Cleaning",
    description: "Regular house cleaning for homes and apartments. We keep your living space fresh and spotless.",
    icon: Home,
    href: "/services#residential",
  },
  {
    title: "Office Cleaning",
    description: "Professional cleaning for offices and commercial spaces. Create a productive work environment.",
    icon: Building2,
    href: "/services#office",
  },
  {
    title: "Deep Cleaning",
    description: "Thorough cleaning for neglected spaces. We tackle every corner and surface.",
    icon: Sparkles,
    href: "/services#deep",
  },
  {
    title: "Move In/Out Cleaning",
    description: "Complete cleaning for moving transitions. Leave your old place spotless or start fresh in your new one.",
    icon: Package,
    href: "/services#move",
  },
]

export function ServicesSection() {
  return (
    <section className="bg-background py-16 md:py-24" id="services">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Our Services
          </p>
          <h2 className="mt-2 text-balance font-[family-name:var(--font-heading)] text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Cleaning Solutions for Every Need
          </h2>
          <p className="mt-4 text-pretty text-lg text-muted-foreground">
            From regular home maintenance to deep cleaning, we offer comprehensive services tailored to your requirements.
          </p>
        </div>

        {/* Services Grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <Card
              key={service.title}
              className="group relative overflow-hidden transition-all hover:shadow-lg hover:shadow-primary/5"
            >
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <service.icon className="h-6 w-6" />
                </div>
                <CardTitle className="font-[family-name:var(--font-heading)] text-xl">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {service.description}
                </CardDescription>
                <Link
                  href={service.href}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80"
                >
                  Learn more
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Button asChild size="lg">
            <Link href="/services">
              View All Services
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
