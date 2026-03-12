"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Menu,
  Phone,
  Sparkles,
  Home,
  Users,
  Briefcase,
  FileText,
  HelpCircle,
  Mail,
  X,
} from "lucide-react";

const navigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "About", href: "/about", icon: Users },
  { name: "Services", href: "/services", icon: Briefcase },
  { name: "Blog", href: "/blog", icon: FileText },
  { name: "FAQ", href: "/faq", icon: HelpCircle },
  { name: "Contact", href: "/contact", icon: Mail },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <Sparkles className="h-6 w-6 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="font-[family-name:var(--font-heading)] text-lg font-bold leading-tight text-foreground">
              Sebli & Miko
            </span>
            <span className="text-xs text-muted-foreground">
              House Cleaning
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-4 md:flex">
          <a
            href="tel:+251911123456"
            className="flex items-center gap-2 text-sm font-medium text-foreground"
          >
            <Phone className="h-4 w-4 text-primary" />
            <span>+251 911 123 456</span>
          </a>
          <Button asChild>
            <Link href="/contact">Get a Quote</Link>
          </Button>
        </div>

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="relative">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-[320px] border-l border-border/50 bg-background/98 p-0 backdrop-blur-xl [&>button]:hidden"
          >
            <div className="flex h-full flex-col">
              {/* Header Section */}
              <div className="flex items-center justify-between border-b border-border/50 px-6 py-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/20">
                    <Sparkles className="h-7 w-7 text-primary-foreground" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-[family-name:var(--font-heading)] text-xl font-bold text-foreground">
                      Sebli & Miko
                    </span>
                    <span className="text-sm italic text-muted-foreground">
                      House Cleaning Services
                    </span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="h-10 w-10 rounded-full bg-muted/50 hover:bg-muted"
                >
                  <X className="h-5 w-5" />
                  <span className="sr-only">Close menu</span>
                </Button>
              </div>

              {/* Navigation Links */}
              <nav className="flex-1 px-6 py-6">
                <ul className="flex flex-col gap-2">
                  {navigation.map((item, index) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                      <li
                        key={item.name}
                        className="animate-in fade-in slide-in-from-right-4"
                        style={{
                          animationDelay: `${index * 50}ms`,
                          animationFillMode: "both",
                        }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className={`flex items-center gap-4 rounded-lg px-4 py-3 text-lg font-medium transition-all duration-200 ${
                            isActive
                              ? "bg-primary/10 text-primary"
                              : "text-foreground hover:bg-primary/5 hover:text-primary"
                          }`}
                        >
                          <Icon
                            className={`h-5 w-5 ${isActive ? "text-primary" : "text-muted-foreground"}`}
                          />
                          {item.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              {/* Bottom CTA Section */}
              <div className="border-t border-border/50 bg-muted/30 px-6 py-6">
                <a
                  href="tel:+251911123456"
                  className="mb-4 flex items-center gap-3 rounded-lg bg-background px-4 py-3 shadow-sm transition-colors hover:bg-muted/50"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground">
                      Call us now
                    </span>
                    <span className="font-semibold text-foreground">
                      +251 911 123 456
                    </span>
                  </div>
                </a>
                <Button
                  asChild
                  className="w-full rounded-xl bg-primary py-6 text-base font-semibold shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30"
                >
                  <Link href="/contact" onClick={() => setIsOpen(false)}>
                    Get a Quote
                  </Link>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
