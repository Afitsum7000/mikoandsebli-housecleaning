import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CTASection } from "@/components/home/cta-section"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, Target, Eye, Heart, Users, Award, Clock } from "lucide-react"

export const metadata: Metadata = {
  title: "About Us | Sebli and Miko House Cleaning",
  description: "Learn about Sebli and Miko House Cleaning - Addis Ababa's trusted cleaning service. Our mission, values, and team dedicated to keeping your spaces spotless.",
}

const values = [
  {
    title: "Integrity",
    description: "We operate with honesty and transparency in everything we do.",
    icon: Heart,
  },
  {
    title: "Excellence",
    description: "We strive for the highest quality in every cleaning job.",
    icon: Award,
  },
  {
    title: "Reliability",
    description: "You can count on us to be there on time, every time.",
    icon: Clock,
  },
  {
    title: "Customer Focus",
    description: "Your satisfaction is at the heart of our service.",
    icon: Users,
  },
]

const stats = [
  { value: "500+", label: "Happy Customers" },
  { value: "5+", label: "Years Experience" },
  { value: "50+", label: "Team Members" },
  { value: "10,000+", label: "Cleanings Completed" },
]

const milestones = [
  { year: "2019", title: "Company Founded", description: "Started with a small team of 3 dedicated cleaners." },
  { year: "2020", title: "First 100 Customers", description: "Reached our first milestone of 100 regular customers." },
  { year: "2021", title: "Expanded Services", description: "Added office cleaning and deep cleaning services." },
  { year: "2022", title: "Team Growth", description: "Grew to a team of 30+ professional cleaners." },
  { year: "2023", title: "Award Recognition", description: "Recognized as a top cleaning service in Addis Ababa." },
  { year: "2024", title: "50+ Team Members", description: "Expanded to serve more neighborhoods across the city." },
]

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-b from-secondary/50 to-background py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                About Us
              </p>
              <h1 className="mt-2 text-balance font-[family-name:var(--font-heading)] text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                Bringing Sparkle to Addis Ababa Since 2019
              </h1>
              <p className="mt-6 text-pretty text-lg text-muted-foreground">
                Sebli and Miko House Cleaning was founded with a simple mission: to provide reliable, high-quality cleaning services that make life easier for busy families and businesses in Addis Ababa.
              </p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="border-y bg-card py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="font-[family-name:var(--font-heading)] text-3xl font-bold text-primary md:text-4xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  Our Story
                </h2>
                <div className="mt-6 space-y-4 text-muted-foreground">
                  <p>
                    Sebli and Miko started as a dream between two friends who saw a need for reliable, professional cleaning services in Addis Ababa. What began as a small operation with just three cleaners has grown into one of the most trusted cleaning companies in the city.
                  </p>
                  <p>
                    Our founders, Seble and Mikiyas, believed that everyone deserves to come home to a clean space. They built the company on principles of trust, quality, and customer care that remain at the core of everything we do.
                  </p>
                  <p>
                    Today, we serve hundreds of homes and offices across Addis Ababa, but we have never lost sight of our original mission: to provide exceptional cleaning services that make our customers lives easier and their spaces more enjoyable.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20">
                  <div className="flex h-full items-center justify-center">
                    <div className="text-center">
                      <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-primary/10">
                        <Users className="h-16 w-16 text-primary" />
                      </div>
                      <p className="mt-6 text-lg font-medium text-foreground/80">
                        Our Dedicated Team
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="bg-secondary/30 py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 md:grid-cols-2">
              <Card className="relative overflow-hidden">
                <CardContent className="p-8">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-foreground">
                    Our Mission
                  </h3>
                  <p className="mt-4 text-muted-foreground">
                    To provide exceptional cleaning services that enhance the quality of life for our customers, while creating meaningful employment opportunities for our community.
                  </p>
                  <ul className="mt-6 space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                      <span className="text-sm text-muted-foreground">Deliver consistent, high-quality cleaning</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                      <span className="text-sm text-muted-foreground">Build lasting relationships with customers</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                      <span className="text-sm text-muted-foreground">Empower our team members to succeed</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden">
                <CardContent className="p-8">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/20">
                    <Eye className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-foreground">
                    Our Vision
                  </h3>
                  <p className="mt-4 text-muted-foreground">
                    To be the most trusted and preferred cleaning service provider in Ethiopia, known for excellence, reliability, and customer satisfaction.
                  </p>
                  <ul className="mt-6 space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                      <span className="text-sm text-muted-foreground">Expand to serve all major Ethiopian cities</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                      <span className="text-sm text-muted-foreground">Set the industry standard for quality</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                      <span className="text-sm text-muted-foreground">Create 500+ employment opportunities</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Our Core Values
              </h2>
              <p className="mt-4 text-pretty text-lg text-muted-foreground">
                These values guide everything we do and how we serve our customers.
              </p>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((value) => (
                <div
                  key={value.title}
                  className="rounded-2xl bg-card p-6 text-center shadow-sm transition-all hover:shadow-md"
                >
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <value.icon className="h-7 w-7" />
                  </div>
                  <h3 className="font-[family-name:var(--font-heading)] text-lg font-semibold text-foreground">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="bg-secondary/30 py-16 md:py-24" id="team">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Our Journey
              </h2>
              <p className="mt-4 text-pretty text-lg text-muted-foreground">
                Key milestones in our growth story.
              </p>
            </div>
            <div className="mt-12">
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-4 top-0 h-full w-0.5 bg-border md:left-1/2 md:-ml-px" />

                <div className="space-y-8">
                  {milestones.map((milestone, index) => (
                    <div
                      key={milestone.year}
                      className={`relative flex items-start gap-6 md:gap-0 ${
                        index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                      }`}
                    >
                      {/* Dot */}
                      <div className="absolute left-4 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground md:left-1/2">
                        {index + 1}
                      </div>

                      {/* Content */}
                      <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                        <div className="rounded-xl bg-card p-4 shadow-sm">
                          <span className="text-sm font-semibold text-primary">{milestone.year}</span>
                          <h3 className="mt-1 font-[family-name:var(--font-heading)] text-lg font-semibold text-foreground">
                            {milestone.title}
                          </h3>
                          <p className="mt-1 text-sm text-muted-foreground">{milestone.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
