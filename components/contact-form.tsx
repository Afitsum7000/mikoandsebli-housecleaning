"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { Spinner } from "@/components/ui/spinner"
import { CheckCircle2, AlertCircle } from "lucide-react"

const services = [
  { value: "residential", label: "Residential Cleaning" },
  { value: "office", label: "Office Cleaning" },
  { value: "deep", label: "Deep Cleaning" },
  { value: "move", label: "Move In/Out Cleaning" },
  { value: "other", label: "Other" },
]

export function ContactForm() {
  const [selectedService, setSelectedService] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)
    setStatus("idle")
    setErrorMessage("")

    const formData = new FormData(event.currentTarget)
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      service: selectedService || null,
      address: (formData.get("address") as string) || null,
      requestedDate: (formData.get("requested_date") as string) || null,
      message: formData.get("message") as string,
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to send message")
      }

      setStatus("success")
      setSelectedService("")
      ;(event.target as HTMLFormElement).reset()
    } catch (error) {
      setStatus("error")
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl bg-accent/10 p-8 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/20">
          <CheckCircle2 className="h-8 w-8 text-accent" />
        </div>
        <h3 className="mt-4 font-[family-name:var(--font-heading)] text-xl font-semibold text-foreground">
          Message Sent!
        </h3>
        <p className="mt-2 text-muted-foreground">
          Thank you for reaching out. We will get back to you within 24 hours.
        </p>
        <Button
          onClick={() => setStatus("idle")}
          variant="outline"
          className="mt-6"
        >
          Send Another Message
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {status === "error" && (
        <div className="flex items-center gap-3 rounded-lg bg-destructive/10 p-4 text-destructive">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <p className="text-sm">{errorMessage}</p>
        </div>
      )}

      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="name">Full Name</FieldLabel>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="Your full name"
            required
            disabled={isSubmitting}
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="email">Email Address</FieldLabel>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            required
            disabled={isSubmitting}
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="phone">Phone Number (Optional)</FieldLabel>
          <Input
            id="phone"
            name="phone"
            type="tel"
            placeholder="+251 911 123 456"
            disabled={isSubmitting}
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="address">Address (Optional)</FieldLabel>
          <Input
            id="address"
            name="address"
            type="text"
            placeholder="Street, area, city"
            disabled={isSubmitting}
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="requested_date">Requested Date (Optional)</FieldLabel>
          <Input
            id="requested_date"
            name="requested_date"
            type="date"
            disabled={isSubmitting}
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="service">Service Type</FieldLabel>
          <Select 
            value={selectedService} 
            onValueChange={setSelectedService}
            disabled={isSubmitting}
          >
            <SelectTrigger id="service">
              <SelectValue placeholder="Select a service" />
            </SelectTrigger>
            <SelectContent>
              {services.map((service) => (
                <SelectItem key={service.value} value={service.value}>
                  {service.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <Field>
          <FieldLabel htmlFor="message">Message</FieldLabel>
          <Textarea
            id="message"
            name="message"
            placeholder="Tell us about your cleaning needs..."
            rows={5}
            required
            disabled={isSubmitting}
          />
        </Field>
      </FieldGroup>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Spinner className="mr-2" />
            Sending...
          </>
        ) : (
          "Send Message"
        )}
      </Button>

      <p className="text-center text-xs text-muted-foreground">
        By submitting this form, you agree to our privacy policy.
      </p>
    </form>
  )
}
