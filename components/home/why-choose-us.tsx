import { Shield, Clock, Leaf, Award, Users, HeartHandshake } from "lucide-react"

const features = [
  {
    title: "Trusted & Verified",
    description: "All our cleaners are thoroughly vetted, background-checked, and trained to the highest standards.",
    icon: Shield,
  },
  {
    title: "Flexible Scheduling",
    description: "Book cleaning at times that work for you. We offer morning, afternoon, and weekend slots.",
    icon: Clock,
  },
  {
    title: "Eco-Friendly Products",
    description: "We use environmentally safe cleaning products that are gentle on surfaces and your family.",
    icon: Leaf,
  },
  {
    title: "Quality Guaranteed",
    description: "Not satisfied? We will re-clean at no extra cost. Your satisfaction is our top priority.",
    icon: Award,
  },
  {
    title: "Experienced Team",
    description: "Our cleaners have years of experience and expertise in all types of cleaning services.",
    icon: Users,
  },
  {
    title: "Customer Care",
    description: "Dedicated support team available to assist you with any questions or special requests.",
    icon: HeartHandshake,
  },
]

export function WhyChooseUs() {
  return (
    <section className="bg-secondary/30 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Why Choose Us
          </p>
          <h2 className="mt-2 text-balance font-[family-name:var(--font-heading)] text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            The Sebli & Miko Difference
          </h2>
          <p className="mt-4 text-pretty text-lg text-muted-foreground">
            We are committed to providing exceptional cleaning services that exceed your expectations.
          </p>
        </div>

        {/* Features Grid */}
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group relative rounded-2xl bg-card p-6 shadow-sm transition-all hover:shadow-md"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="font-[family-name:var(--font-heading)] text-lg font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="mt-2 text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
