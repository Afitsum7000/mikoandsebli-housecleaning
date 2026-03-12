import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    content: "Sebli and Miko transformed my apartment! The team was professional, thorough, and left everything sparkling clean. I have been using their service for 6 months now.",
    author: "Almaz Tadesse",
    role: "Homeowner, Bole",
    rating: 5,
  },
  {
    content: "Our office has never looked better. The cleaning crew is always on time and does an excellent job. They pay attention to every detail. Highly recommended!",
    author: "Daniel Bekele",
    role: "Office Manager, Kazanchis",
    rating: 5,
  },
  {
    content: "I used their move-out cleaning service and got my full deposit back! They cleaned areas I did not even know existed. Worth every birr.",
    author: "Sara Hailu",
    role: "Tenant, CMC",
    rating: 5,
  },
  {
    content: "The deep cleaning service exceeded my expectations. My kitchen and bathrooms look brand new. The team was friendly and professional throughout.",
    author: "Yohannes Girma",
    role: "Homeowner, Sarbet",
    rating: 5,
  },
]

export function TestimonialsSection() {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Testimonials
          </p>
          <h2 className="mt-2 text-balance font-[family-name:var(--font-heading)] text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            What Our Customers Say
          </h2>
          <p className="mt-4 text-pretty text-lg text-muted-foreground">
            Do not just take our word for it. Here is what our satisfied customers have to say about our services.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="relative overflow-hidden">
              <CardContent className="p-6">
                {/* Quote icon */}
                <Quote className="absolute right-6 top-6 h-12 w-12 text-primary/10" />

                {/* Rating */}
                <div className="mb-4 flex gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Content */}
                <p className="relative z-10 text-foreground">
                  {`"${testimonial.content}"`}
                </p>

                {/* Author */}
                <div className="mt-6 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
