"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Sparkles,
  LogOut,
  Search,
  Mail,
  Phone,
  Calendar,
  Filter,
  Eye,
  RefreshCw,
  Inbox,
  CheckCircle2,
  Clock,
  XCircle,
} from "lucide-react"

interface Message {
  id: string
  name: string
  email: string
  phone: string | null
  service: string | null
  message: string
  status: string
  created_at: string
}

interface AdminDashboardProps {
  messages: Message[]
  userEmail: string
}

const statusConfig: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
  new: { label: "New", color: "bg-blue-100 text-blue-700 border-blue-200", icon: <Inbox className="h-3 w-3" /> },
  in_progress: { label: "In Progress", color: "bg-yellow-100 text-yellow-700 border-yellow-200", icon: <Clock className="h-3 w-3" /> },
  resolved: { label: "Resolved", color: "bg-green-100 text-green-700 border-green-200", icon: <CheckCircle2 className="h-3 w-3" /> },
  closed: { label: "Closed", color: "bg-gray-100 text-gray-700 border-gray-200", icon: <XCircle className="h-3 w-3" /> },
}

const serviceLabels: Record<string, string> = {
  residential: "Residential",
  office: "Office",
  deep: "Deep Cleaning",
  move: "Move In/Out",
  other: "Other",
}

export function AdminDashboard({ messages, userEmail }: AdminDashboardProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [serviceFilter, setServiceFilter] = useState("all")
  const [isRefreshing, setIsRefreshing] = useState(false)
  const router = useRouter()

  async function handleSignOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/admin/login")
    router.refresh()
  }

  async function handleRefresh() {
    setIsRefreshing(true)
    router.refresh()
    setTimeout(() => setIsRefreshing(false), 1000)
  }

  const filteredMessages = messages.filter((msg) => {
    const matchesSearch =
      msg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.message.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || msg.status === statusFilter
    const matchesService = serviceFilter === "all" || msg.service === serviceFilter
    return matchesSearch && matchesStatus && matchesService
  })

  const stats = {
    total: messages.length,
    new: messages.filter((m) => m.status === "new").length,
    inProgress: messages.filter((m) => m.status === "in_progress").length,
    resolved: messages.filter((m) => m.status === "resolved").length,
  }

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <Sparkles className="h-6 w-6 text-primary-foreground" />
              </div>
            </Link>
            <div>
              <h1 className="font-[family-name:var(--font-heading)] text-lg font-bold text-foreground">
                Admin Dashboard
              </h1>
              <p className="text-xs text-muted-foreground">{userEmail}</p>
            </div>
          </div>
          <Button variant="outline" onClick={handleSignOut}>
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Stats Cards */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-border/50 bg-card p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Messages</p>
                <p className="text-2xl font-bold text-foreground">{stats.total}</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-border/50 bg-card p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                <Inbox className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">New</p>
                <p className="text-2xl font-bold text-foreground">{stats.new}</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-border/50 bg-card p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">In Progress</p>
                <p className="text-2xl font-bold text-foreground">{stats.inProgress}</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-border/50 bg-card p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <CheckCircle2 className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Resolved</p>
                <p className="text-2xl font-bold text-foreground">{stats.resolved}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search messages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Select value={serviceFilter} onValueChange={setServiceFilter}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Service" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Services</SelectItem>
                <SelectItem value="residential">Residential</SelectItem>
                <SelectItem value="office">Office</SelectItem>
                <SelectItem value="deep">Deep Cleaning</SelectItem>
                <SelectItem value="move">Move In/Out</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon" onClick={handleRefresh}>
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
            </Button>
          </div>
        </div>

        {/* Messages Table */}
        <div className="rounded-xl border border-border/50 bg-card shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Contact</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMessages.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-32 text-center">
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                      <Inbox className="h-8 w-8" />
                      <p>No messages found</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredMessages.map((message) => (
                  <TableRow key={message.id}>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium text-foreground">{message.name}</span>
                        <span className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Mail className="h-3 w-3" />
                          {message.email}
                        </span>
                        {message.phone && (
                          <span className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Phone className="h-3 w-3" />
                            {message.phone}
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {message.service ? (
                        <Badge variant="outline">
                          {serviceLabels[message.service] || message.service}
                        </Badge>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell className="max-w-[300px]">
                      <p className="line-clamp-2 text-sm text-foreground">
                        {message.message}
                      </p>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={`gap-1 ${statusConfig[message.status]?.color || ""}`}
                      >
                        {statusConfig[message.status]?.icon}
                        {statusConfig[message.status]?.label || message.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {formatDate(message.created_at)}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/admin/messages/${message.id}`}>
                          <Eye className="mr-1 h-4 w-4" />
                          View
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  )
}
