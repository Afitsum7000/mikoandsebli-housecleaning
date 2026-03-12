"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Spinner } from "@/components/ui/spinner"
import { AlertCircle, Sparkles, Lock } from "lucide-react"

export default function AdminLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    const supabase = createClient()

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (signInError) {
      setError(signInError.message)
      setIsLoading(false)
      return
    }

    router.push("/admin")
    router.refresh()
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-border/50 bg-card p-8 shadow-xl">
          {/* Header */}
          <div className="mb-8 text-center">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/20">
                <Sparkles className="h-7 w-7 text-primary-foreground" />
              </div>
            </Link>
            <h1 className="mt-4 font-[family-name:var(--font-heading)] text-2xl font-bold text-foreground">
              Admin Login
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Sign in to access the admin dashboard
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 flex items-center gap-3 rounded-lg bg-destructive/10 p-4 text-destructive">
              <AlertCircle className="h-5 w-5 shrink-0" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email Address</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  required
                  disabled={isLoading}
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  disabled={isLoading}
                />
              </Field>
            </FieldGroup>

            <Button 
              type="submit" 
              className="mt-6 w-full" 
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Spinner className="mr-2" />
                  Signing in...
                </>
              ) : (
                <>
                  <Lock className="mr-2 h-4 w-4" />
                  Sign In
                </>
              )}
            </Button>
          </form>

          {/* Back Link */}
          <div className="mt-6 text-center">
            <Link 
              href="/" 
              className="text-sm text-muted-foreground hover:text-primary"
            >
              Back to website
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
