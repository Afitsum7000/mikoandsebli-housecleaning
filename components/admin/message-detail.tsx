"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Spinner } from "@/components/ui/spinner"
import {
  ArrowLeft,
  Mail,
  Phone,
  Calendar,
  Briefcase,
  User,
  MessageSquare,
  CheckCircle2,
  Clock,
  Inbox,
  XCircle,
  Trash2,
} from "lucide-react"

interface Message {
  id: string
  name: string
  email: string
  phone: string | null
  service: string | null
  address: string | null
  requested_date: string | null
  message: string
  status: string
  created_at: string
}

interface MessageDetailProps {
  message: Message
}

const statusConfig: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
  new: {
    label: "New",
    color: "bg-blue-100 text-blue-700 border-blue-200",
    icon: <Inbox className="h-4 w-4" />,
  },
  contacted: {
    label: "Contacted",
    color: "bg-yellow-100 text-yellow-700 border-yellow-200",
    icon: <Clock className="h-4 w-4" />,
  },
  completed: {
    label: "Completed",
    color: "bg-green-100 text-green-700 border-green-200",
    icon: <CheckCircle2 className="h-4 w-4" />,
  },
}

const serviceLabels: Record<string, string> = {
  residential: "Residential Cleaning",
  office: "Office Cleaning",
  deep: "Deep Cleaning",
  move: "Move In/Out Cleaning",
  other: "Other Service",
}

export function MessageDetail({ message }: MessageDetailProps) {
  const [status, setStatus] = useState(message.status)
  const [isSaving, setIsSaving] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()

  async function handleStatusChange(newStatus: string) {
    setStatus(newStatus)
    setIsSaving(true)

    const supabase = createClient()
    const { error } = await supabase
      .from("contact_messages")
      .update({ status: newStatus })
      .eq("id", message.id)

    if (error) {
      console.error("Error updating status:", error)
      setStatus(message.status)
    }

    setIsSaving(false)
    router.refresh()
  }

  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this message? This action cannot be undone.")) {
      return
    }

    setIsDeleting(true)

    const supabase = createClient()
    const { error } = await supabase
      .from("contact_messages")
      .delete()
      .eq("id", message.id)

    if (error) {
      console.error("Error deleting message:", error)
      setIsDeleting(false)
      return
    }

    router.push("/admin")
    router.refresh()
  }

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="border-b border-border/50 bg-background">
        <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Button variant="ghost" asChild>
            <Link href="/admin">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
          <div className="flex items-center gap-3">
            {isSaving && <Spinner className="h-4 w-4" />}
            <Button
              variant="destructive"
              size="sm"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <Spinner className="mr-2 h-4 w-4" />
              ) : (
                <Trash2 className="mr-2 h-4 w-4" />
              )}
              Delete
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-border/50 bg-card shadow-sm">
          {/* Message Header */}
          <div className="border-b border-border/50 p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h1 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-foreground">
                  {message.name}
                </h1>
                <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {formatDate(message.created_at)}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">Status:</span>
                <Select value={status} onValueChange={handleStatusChange}>
                  <SelectTrigger className="w-[160px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">
                      <span className="flex items-center gap-2">
                        <Inbox className="h-4 w-4 text-blue-600" />
                        New
                      </span>
                    </SelectItem>
                    <SelectItem value="contacted">
                      <span className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-yellow-600" />
                        Contacted
                      </span>
                    </SelectItem>
                    <SelectItem value="completed">
                      <span className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        Completed
                      </span>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div className="grid gap-6 border-b border-border/50 p-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <User className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Name</p>
                <p className="font-medium text-foreground">{message.name}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Email</p>
                <a
                  href={`mailto:${message.email}`}
                  className="font-medium text-primary hover:underline"
                >
                  {message.email}
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Phone className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Phone</p>
                {message.phone ? (
                  <a
                    href={`tel:${message.phone}`}
                    className="font-medium text-primary hover:underline"
                  >
                    {message.phone}
                  </a>
                ) : (
                  <p className="text-muted-foreground">Not provided</p>
                )}
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Briefcase className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Service</p>
                {message.service ? (
                  <Badge variant="outline">
                    {serviceLabels[message.service] || message.service}
                  </Badge>
                ) : (
                  <p className="text-muted-foreground">Not specified</p>
                )}
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Briefcase className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Address</p>
                <p className="font-medium text-foreground">
                  {message.address || "Not provided"}
                </p>
              </div>
            </div>
          </div>

          {/* Message Content */}
          <div className="p-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MessageSquare className="h-4 w-4" />
              Message
            </div>
            <div className="mt-3 rounded-lg bg-muted/50 p-4">
              <p className="whitespace-pre-wrap text-foreground">{message.message}</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="border-t border-border/50 p-6">
            <h3 className="text-sm font-medium text-muted-foreground">Quick Actions</h3>
            <div className="mt-3 flex flex-wrap gap-3">
              <Button asChild>
                <a href={`mailto:${message.email}?subject=Re: Your inquiry to Sebli and Miko House Cleaning`}>
                  <Mail className="mr-2 h-4 w-4" />
                  Reply via Email
                </a>
              </Button>
              {message.phone && (
                <Button variant="outline" asChild>
                  <a href={`tel:${message.phone}`}>
                    <Phone className="mr-2 h-4 w-4" />
                    Call Customer
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
