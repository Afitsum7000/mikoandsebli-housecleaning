import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Star } from "lucide-react"

const features = [
  "Trusted & Verified Cleaners",
  "Eco-Friendly Products",
  "Satisfaction Guaranteed",
]

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-secondary/50 to-background pb-16 pt-12 md:pb-24 md:pt-20">
      {/* Decorative elements */}
      <div className="absolute left-0 top-0 -z-10 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-0 right-0 -z-10 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              <Star className="h-4 w-4 fill-primary" />
              <span>{"#1 Cleaning Service in Addis Ababa"}</span>
            </div>

            <h1 className="text-balance font-[family-name:var(--font-heading)] text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Sparkling Clean Homes,{" "}
              <span className="text-primary">Every Time</span>
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-pretty text-lg text-muted-foreground lg:mx-0">
              Professional house cleaning services in Addis Ababa. We bring sparkle to your home with trusted, reliable cleaners and eco-friendly products.
            </p>

            {/* Features */}
            <ul className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
              {features.map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-sm text-foreground">
                  <CheckCircle2 className="h-5 w-5 text-accent" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            {/* CTAs */}
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
              <Button asChild size="lg" className="text-base">
                <Link href="/contact">Get a Free Quote</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-base">
                <Link href="/services">Our Services</Link>
              </Button>
            </div>

            {/* Social Proof */}
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-background bg-secondary text-xs font-medium text-muted-foreground"
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <div className="text-sm">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-muted-foreground">
                  <span className="font-semibold text-foreground">500+</span> happy customers
                </p>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 shadow-2xl">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
                    <svg
                      className="h-12 w-12 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                  </div>
                  <p className="mt-4 text-lg font-medium text-foreground/80">
                    Professional Home Cleaning
                  </p>
                </div>
              </div>
            </div>

            {/* Floating card */}
            <div className="absolute -bottom-6 -left-6 rounded-xl bg-card p-4 shadow-lg md:p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/20">
                  <CheckCircle2 className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <p className="font-[family-name:var(--font-heading)] text-2xl font-bold text-foreground">
                    100%
                  </p>
                  <p className="text-sm text-muted-foreground">Satisfaction Rate</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
