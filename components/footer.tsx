import Link from "next/link"
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Sparkles } from "lucide-react"

const navigation = {
  services: [
    { name: "Residential Cleaning", href: "/services#residential" },
    { name: "Office Cleaning", href: "/services#office" },
    { name: "Deep Cleaning", href: "/services#deep" },
    { name: "Move In/Out Cleaning", href: "/services#move" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Our Team", href: "/about#team" },
    { name: "Blog", href: "/blog" },
    { name: "FAQ", href: "/faq" },
  ],
  support: [
    { name: "Contact Us", href: "/contact" },
    { name: "Get a Quote", href: "/contact" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
  ],
}

const socialLinks = [
  { name: "Facebook", href: "#", icon: Facebook },
  { name: "Instagram", href: "#", icon: Instagram },
  { name: "Twitter", href: "#", icon: Twitter },
]

export function Footer() {
  return (
    <footer className="border-t bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <Sparkles className="h-6 w-6 text-primary-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="font-[family-name:var(--font-heading)] text-lg font-bold leading-tight text-foreground">
                  Sebli & Miko
                </span>
                <span className="text-xs text-muted-foreground">House Cleaning</span>
              </div>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              Professional cleaning services in Addis Ababa. We bring sparkle to your home and office with trusted, reliable service.
            </p>
            <div className="mt-6 space-y-3">
              <a
                href="tel:+251911123456"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
              >
                <Phone className="h-4 w-4" />
                <span>+251 911 123 456</span>
              </a>
              <a
                href="mailto:info@seblimiko.com"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
              >
                <Mail className="h-4 w-4" />
                <span>info@seblimiko.com</span>
              </a>
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                <span>Bole Road, Addis Ababa, Ethiopia</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-[family-name:var(--font-heading)] text-sm font-semibold text-foreground">
              Services
            </h3>
            <ul className="mt-4 space-y-3">
              {navigation.services.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-[family-name:var(--font-heading)] text-sm font-semibold text-foreground">
              Company
            </h3>
            <ul className="mt-4 space-y-3">
              {navigation.company.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-[family-name:var(--font-heading)] text-sm font-semibold text-foreground">
              Support
            </h3>
            <ul className="mt-4 space-y-3">
              {navigation.support.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Sebli and Miko House Cleaning. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {socialLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                <item.icon className="h-5 w-5" />
                <span className="sr-only">{item.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
