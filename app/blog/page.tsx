import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CTASection } from "@/components/home/cta-section"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Blog | Sebli and Miko House Cleaning",
  description: "Cleaning tips, home organization advice, and news from Sebli and Miko House Cleaning. Learn how to keep your home sparkling clean.",
}

const blogPosts = [
  {
    slug: "10-tips-for-a-cleaner-home",
    title: "10 Tips for a Cleaner Home Every Day",
    excerpt: "Simple habits you can adopt to keep your home fresh and organized without spending hours cleaning.",
    category: "Cleaning Tips",
    date: "March 5, 2024",
    readTime: "5 min read",
    featured: true,
  },
  {
    slug: "eco-friendly-cleaning-products",
    title: "Why We Use Eco-Friendly Cleaning Products",
    excerpt: "Learn about the benefits of eco-friendly cleaning products for your family, pets, and the environment.",
    category: "Sustainability",
    date: "February 28, 2024",
    readTime: "4 min read",
    featured: false,
  },
  {
    slug: "deep-cleaning-vs-regular-cleaning",
    title: "Deep Cleaning vs Regular Cleaning: What is the Difference?",
    excerpt: "Understanding when you need a deep clean versus regular maintenance cleaning for your home.",
    category: "Services",
    date: "February 20, 2024",
    readTime: "6 min read",
    featured: false,
  },
  {
    slug: "organizing-your-kitchen",
    title: "The Ultimate Guide to Organizing Your Kitchen",
    excerpt: "Transform your kitchen into an efficient, clean space with our expert organization tips.",
    category: "Organization",
    date: "February 15, 2024",
    readTime: "7 min read",
    featured: false,
  },
  {
    slug: "preparing-for-professional-cleaning",
    title: "How to Prepare Your Home for Professional Cleaning",
    excerpt: "Get the most out of your professional cleaning service with these simple preparation tips.",
    category: "Tips",
    date: "February 10, 2024",
    readTime: "3 min read",
    featured: false,
  },
  {
    slug: "bathroom-cleaning-hacks",
    title: "7 Bathroom Cleaning Hacks That Actually Work",
    excerpt: "Professional tricks for tackling the toughest bathroom cleaning challenges.",
    category: "Cleaning Tips",
    date: "February 5, 2024",
    readTime: "5 min read",
    featured: false,
  },
]

const featuredPost = blogPosts.find((post) => post.featured)
const regularPosts = blogPosts.filter((post) => !post.featured)

export default function BlogPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-b from-secondary/50 to-background py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                Our Blog
              </p>
              <h1 className="mt-2 text-balance font-[family-name:var(--font-heading)] text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                Cleaning Tips & Insights
              </h1>
              <p className="mt-6 text-pretty text-lg text-muted-foreground">
                Expert advice, cleaning hacks, and home organization tips from our professional team.
              </p>
            </div>
          </div>
        </section>

        {/* Blog Posts */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Featured Post */}
            {featuredPost && (
              <div className="mb-12">
                <Card className="overflow-hidden lg:flex">
                  <div className="flex aspect-[16/9] items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10 lg:aspect-auto lg:w-1/2">
                    <div className="p-8 text-center">
                      <Badge className="mb-4">{featuredPost.category}</Badge>
                      <p className="text-lg font-medium text-foreground/80">Featured Article</p>
                    </div>
                  </div>
                  <div className="lg:w-1/2">
                    <CardHeader>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {featuredPost.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {featuredPost.readTime}
                        </span>
                      </div>
                      <CardTitle className="mt-2 font-[family-name:var(--font-heading)] text-2xl">
                        {featuredPost.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">
                        {featuredPost.excerpt}
                      </CardDescription>
                      <Link
                        href={`/blog/${featuredPost.slug}`}
                        className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80"
                      >
                        Read more
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </CardContent>
                  </div>
                </Card>
              </div>
            )}

            {/* Regular Posts Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {regularPosts.map((post) => (
                <Card key={post.slug} className="group overflow-hidden">
                  <div className="flex aspect-[16/9] items-center justify-center bg-gradient-to-br from-secondary to-secondary/50">
                    <Badge variant="secondary">{post.category}</Badge>
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {post.readTime}
                      </span>
                    </div>
                    <CardTitle className="font-[family-name:var(--font-heading)] text-lg transition-colors group-hover:text-primary">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{post.excerpt}</CardDescription>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80"
                    >
                      Read more
                      <ArrowRight className="h-4 w-4" />
                    </Link>
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
