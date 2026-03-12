import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Phone, ArrowRight } from "lucide-react"

export function CTASection() {
  return (
    <section className="relative overflow-hidden bg-primary py-16 md:py-24">
      {/* Decorative elements */}
      <div className="absolute left-0 top-0 -z-0 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
      <div className="absolute bottom-0 right-0 -z-0 h-96 w-96 rounded-full bg-white/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance font-[family-name:var(--font-heading)] text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
            Ready for a Cleaner Space?
          </h2>
          <p className="mt-4 text-pretty text-lg text-primary-foreground/80">
            Get a free, no-obligation quote today. Our team is ready to make your home or office shine!
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="text-base"
            >
              <Link href="/contact">
                Get a Free Quote
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary-foreground/20 bg-transparent text-base text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              <a href="tel:+251911123456">
                <Phone className="mr-2 h-4 w-4" />
                Call Us Now
              </a>
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-8 text-primary-foreground/60">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-primary-foreground">500+</span>
              <span className="text-sm">Happy Customers</span>
            </div>
            <div className="h-8 w-px bg-primary-foreground/20" />
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-primary-foreground">5+</span>
              <span className="text-sm">Years Experience</span>
            </div>
            <div className="h-8 w-px bg-primary-foreground/20" />
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-primary-foreground">100%</span>
              <span className="text-sm">Satisfaction</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
