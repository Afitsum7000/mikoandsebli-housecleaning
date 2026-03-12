"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar"
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
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer"
import {
  Sparkles,
  LogOut,
  Search,
  Mail,
  Phone,
  Calendar,
  Filter,
  RefreshCw,
  Inbox,
  CheckCircle2,
  Clock,
  Menu,
  ChevronDown,
  MapPin,
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

interface AdminDashboardProps {
  messages: Message[]
  userEmail: string
}

const statusConfig: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
  new: {
    label: "New",
    color: "bg-blue-100 text-blue-700 border-blue-200",
    icon: <Inbox className="h-3 w-3" />,
  },
  contacted: {
    label: "Contacted",
    color: "bg-yellow-100 text-yellow-700 border-yellow-200",
    icon: <Clock className="h-3 w-3" />,
  },
  completed: {
    label: "Completed",
    color: "bg-green-100 text-green-700 border-green-200",
    icon: <CheckCircle2 className="h-3 w-3" />,
  },
}

const serviceLabels: Record<string, string> = {
  residential: "Residential",
  office: "Office",
  deep: "Deep Cleaning",
  move: "Move In/Out",
  other: "Other",
}

const PAGE_SIZE = 10

export function AdminDashboard({ messages, userEmail }: AdminDashboardProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [serviceFilter, setServiceFilter] = useState("all")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [page, setPage] = useState(1)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
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
    setTimeout(() => setIsRefreshing(false), 800)
  }

  function toggleSortDirection() {
    setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"))
  }

  const filteredAndSortedMessages = useMemo(() => {
    const query = searchQuery.toLowerCase().trim()

    const filtered = messages.filter((msg) => {
      const matchesSearch =
        !query ||
        msg.name.toLowerCase().includes(query) ||
        msg.email.toLowerCase().includes(query) ||
        (msg.phone ?? "").toLowerCase().includes(query) ||
        msg.message.toLowerCase().includes(query)

      const matchesStatus = statusFilter === "all" || msg.status === statusFilter
      const matchesService = serviceFilter === "all" || msg.service === serviceFilter

      return matchesSearch && matchesStatus && matchesService
    })

    return filtered.sort((a, b) => {
      const dateA = new Date(a.created_at).getTime()
      const dateB = new Date(b.created_at).getTime()
      return sortDirection === "asc" ? dateA - dateB : dateB - dateA
    })
  }, [messages, searchQuery, statusFilter, serviceFilter, sortDirection])

  const totalPages = Math.max(1, Math.ceil(filteredAndSortedMessages.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const paginatedMessages = filteredAndSortedMessages.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  )

  const stats = {
    total: messages.length,
    new: messages.filter((m) => m.status === "new").length,
    contacted: messages.filter((m) => m.status === "contacted").length,
    completed: messages.filter((m) => m.status === "completed").length,
  }

  function formatDate(dateString: string | null) {
    if (!dateString) return "-"
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  function handleOpenDetail(message: Message) {
    setSelectedMessage(message)
    setIsDetailOpen(true)
  }

  async function handleStatusChange(newStatus: "new" | "contacted" | "completed") {
    if (!selectedMessage) return
    setIsUpdatingStatus(true)

    const supabase = createClient()
    const { error } = await supabase
      .from("contact_messages")
      .update({ status: newStatus })
      .eq("id", selectedMessage.id)

    if (!error) {
      setSelectedMessage({ ...selectedMessage, status: newStatus })
      router.refresh()
    } else {
      console.error("Error updating status:", error)
    }

    setIsUpdatingStatus(false)
  }

  async function handleDelete() {
    if (!selectedMessage) return
    if (!window.confirm("Delete this message? This action cannot be undone.")) {
      return
    }

    setIsDeleting(true)
    const supabase = createClient()
    const { error } = await supabase
      .from("contact_messages")
      .delete()
      .eq("id", selectedMessage.id)

    if (error) {
      console.error("Error deleting message:", error)
      setIsDeleting(false)
      return
    }

    setIsDeleting(false)
    setIsDetailOpen(false)
    setSelectedMessage(null)
    router.refresh()
  }

  function renderStatusBadge(status: string) {
    const config = statusConfig[status]
    if (!config) {
      return (
        <Badge variant="outline" className="gap-1">
          {status}
        </Badge>
      )
    }

    return (
      <Badge variant="outline" className={`gap-1 ${config.color}`}>
        {config.icon}
        {config.label}
      </Badge>
    )
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-muted/30">
        <div className="flex min-h-screen">
          <Sidebar collapsible="icon" className="bg-card/95 border-r">
            <SidebarHeader className="border-b border-border/60 pb-3">
              <div className="flex items-center gap-3 px-1 pt-1">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                  <Sparkles className="h-5 w-5 text-primary-foreground" />
                </div>
                <div className="flex flex-col">
                  <span className="font-[family-name:var(--font-heading)] text-sm font-semibold">
                    Sebli &amp; Miko
                  </span>
                  <span className="text-xs text-muted-foreground">Admin</span>
                </div>
              </div>
            </SidebarHeader>
            <SidebarContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton isActive>
                    <Inbox className="h-4 w-4" />
                    <span>Quote Requests</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarContent>
            <SidebarFooter className="border-t border-border/60">
              <div className="flex items-center justify-between gap-2 rounded-lg bg-muted/40 p-2 text-xs">
                <div className="flex flex-1 flex-col">
                  <span className="truncate font-medium">{userEmail}</span>
                  <span className="text-muted-foreground">Signed in</span>
                </div>
                <Button size="icon" variant="ghost" onClick={handleSignOut}>
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </SidebarFooter>
          </Sidebar>

          <SidebarInset>
            {/* Top App Bar */}
            <header className="sticky top-0 z-40 border-b border-border/50 bg-background/90 backdrop-blur">
              <div className="flex h-14 items-center justify-between px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-3">
                  <div className="md:hidden">
                    <SidebarTrigger className="mr-1">
                      <Menu className="h-4 w-4" />
                    </SidebarTrigger>
                  </div>
                  <div className="flex flex-col">
                    <h1 className="font-[family-name:var(--font-heading)] text-base font-semibold leading-tight sm:text-lg">
                      Admin Dashboard
                    </h1>
                    <p className="text-xs text-muted-foreground">
                      Manage quote requests &amp; messages
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRefresh}
                  className="hidden sm:inline-flex"
                >
                  <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
                  Refresh
                </Button>
              </div>
            </header>

            <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
              {/* Stats Cards */}
              <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <div className="rounded-2xl border border-border/50 bg-card p-4 shadow-sm sm:p-5">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs font-medium text-muted-foreground">Total Messages</p>
                      <p className="mt-1 text-2xl font-semibold tracking-tight text-foreground">
                        {stats.total}
                      </p>
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 sm:h-11 sm:w-11">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                </div>
                <div className="rounded-2xl border border-border/50 bg-card p-4 shadow-sm sm:p-5">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs font-medium text-muted-foreground">New Requests</p>
                      <p className="mt-1 text-2xl font-semibold tracking-tight text-foreground">
                        {stats.new}
                      </p>
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 sm:h-11 sm:w-11">
                      <Inbox className="h-5 w-5 text-blue-600" />
                    </div>
                  </div>
                </div>
                <div className="rounded-2xl border border-border/50 bg-card p-4 shadow-sm sm:p-5">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs font-medium text-muted-foreground">Contacted</p>
                      <p className="mt-1 text-2xl font-semibold tracking-tight text-foreground">
                        {stats.contacted}
                      </p>
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100 sm:h-11 sm:w-11">
                      <Clock className="h-5 w-5 text-yellow-600" />
                    </div>
                  </div>
                </div>
                <div className="rounded-2xl border border-border/50 bg-card p-4 shadow-sm sm:p-5">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs font-medium text-muted-foreground">Completed Jobs</p>
                      <p className="mt-1 text-2xl font-semibold tracking-tight text-foreground">
                        {stats.completed}
                      </p>
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 sm:h-11 sm:w-11">
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                    </div>
                  </div>
                </div>
              </section>

              {/* Filters */}
              <section className="flex flex-col gap-4 rounded-2xl border border-border/50 bg-card/60 p-3 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-4">
                <div className="flex w-full items-center gap-2">
                  <div className="relative flex-1">
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search by name, email, phone, or message"
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value)
                        setPage(1)
                      }}
                      className="h-9 pl-9 text-sm"
                    />
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex items-center gap-2">
                    <Filter className="hidden h-4 w-4 text-muted-foreground sm:inline" />
                    <Select
                      value={statusFilter}
                      onValueChange={(value) => {
                        setStatusFilter(value)
                        setPage(1)
                      }}
                    >
                      <SelectTrigger className="h-9 w-[130px] text-xs sm:text-sm">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="contacted">Contacted</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Select
                    value={serviceFilter}
                    onValueChange={(value) => {
                      setServiceFilter(value)
                      setPage(1)
                    }}
                  >
                    <SelectTrigger className="h-9 w-[150px] text-xs sm:text-sm">
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
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={toggleSortDirection}
                    className="h-9 w-9"
                    title="Sort by date"
                  >
                    <Calendar className="h-4 w-4" />
                    <ChevronDown
                      className={`ml-1 h-3 w-3 transition-transform ${
                        sortDirection === "asc" ? "rotate-180" : ""
                      }`}
                    />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleRefresh}
                    className="h-9 w-9 sm:hidden"
                    title="Refresh"
                  >
                    <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
                  </Button>
                </div>
              </section>

              {/* Messages: Table (md+) & Cards (mobile) */}
              <section className="space-y-4">
                <div className="hidden rounded-2xl border border-border/50 bg-card shadow-sm md:block">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Contact</TableHead>
                        <TableHead>Service</TableHead>
                        <TableHead>Address</TableHead>
                        <TableHead>Message</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="cursor-pointer" onClick={toggleSortDirection}>
                          <div className="inline-flex items-center gap-1">
                            Date
                            <ChevronDown
                              className={`h-3 w-3 transition-transform ${
                                sortDirection === "asc" ? "rotate-180" : ""
                              }`}
                            />
                          </div>
                        </TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedMessages.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={7} className="h-32 text-center">
                            <div className="flex flex-col items-center gap-2 text-muted-foreground">
                              <Inbox className="h-8 w-8" />
                              <p>No messages found</p>
                            </div>
                          </TableCell>
                        </TableRow>
                      ) : (
                        paginatedMessages.map((message) => (
                          <TableRow
                            key={message.id}
                            className="cursor-pointer"
                            onClick={() => handleOpenDetail(message)}
                          >
                            <TableCell>
                              <div className="flex flex-col">
                                <span className="font-medium text-foreground">{message.name}</span>
                                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                                  <Mail className="h-3 w-3" />
                                  {message.email}
                                </span>
                                {message.phone && (
                                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                                    <Phone className="h-3 w-3" />
                                    {message.phone}
                                  </span>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>
                              {message.service ? (
                                <Badge variant="outline" className="text-xs">
                                  {serviceLabels[message.service] || message.service}
                                </Badge>
                              ) : (
                                <span className="text-xs text-muted-foreground">-</span>
                              )}
                            </TableCell>
                            <TableCell>
                              {message.address ? (
                                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                                  <MapPin className="h-3 w-3" />
                                  <span className="line-clamp-1">{message.address}</span>
                                </span>
                              ) : (
                                <span className="text-xs text-muted-foreground">-</span>
                              )}
                            </TableCell>
                            <TableCell className="max-w-[260px]">
                              <p className="line-clamp-2 text-xs text-foreground">
                                {message.message}
                              </p>
                            </TableCell>
                            <TableCell>{renderStatusBadge(message.status)}</TableCell>
                            <TableCell>
                              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Calendar className="h-3 w-3" />
                                {formatDate(message.created_at)}
                              </span>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleOpenDetail(message)
                                }}
                              >
                                View
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>

                {/* Mobile stacked cards */}
                <div className="grid gap-3 md:hidden">
                  {paginatedMessages.length === 0 ? (
                    <div className="flex h-40 flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-border/60 bg-card/60 text-center text-sm text-muted-foreground">
                      <Inbox className="h-7 w-7" />
                      <p>No messages found</p>
                    </div>
                  ) : (
                    paginatedMessages.map((message) => (
                      <button
                        key={message.id}
                        type="button"
                        onClick={() => handleOpenDetail(message)}
                        className="flex flex-col gap-3 rounded-2xl border border-border/60 bg-card p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="text-sm font-semibold text-foreground">
                              {message.name}
                            </p>
                            <p className="text-xs text-muted-foreground">{message.service && (serviceLabels[message.service] || message.service)}</p>
                          </div>
                          {renderStatusBadge(message.status)}
                        </div>
                        <div className="grid grid-cols-2 gap-3 text-xs text-muted-foreground">
                          <div className="space-y-1">
                            <p className="font-medium text-foreground">Contact</p>
                            <p className="truncate">{message.email}</p>
                            {message.phone && <p className="truncate">{message.phone}</p>}
                          </div>
                          <div className="space-y-1 text-right">
                            <p className="font-medium text-foreground">Date</p>
                            <p>{formatDate(message.created_at)}</p>
                          </div>
                        </div>
                        <p className="line-clamp-2 text-xs text-foreground/90">{message.message}</p>
                      </button>
                    ))
                  )}
                </div>

                {/* Pagination */}
                {filteredAndSortedMessages.length > PAGE_SIZE && (
                  <Pagination className="pt-2">
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          href="#"
                          onClick={(e) => {
                            e.preventDefault()
                            setPage((prev) => Math.max(1, prev - 1))
                          }}
                        />
                      </PaginationItem>
                      {Array.from({ length: totalPages }).map((_, index) => {
                        const pageNumber = index + 1
                        return (
                          <PaginationItem key={pageNumber}>
                            <PaginationLink
                              href="#"
                              isActive={pageNumber === currentPage}
                              onClick={(e) => {
                                e.preventDefault()
                                setPage(pageNumber)
                              }}
                            >
                              {pageNumber}
                            </PaginationLink>
                          </PaginationItem>
                        )
                      })}
                      <PaginationItem>
                        <PaginationNext
                          href="#"
                          onClick={(e) => {
                            e.preventDefault()
                            setPage((prev) => Math.min(totalPages, prev + 1))
                          }}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                )}
              </section>
            </main>
          </SidebarInset>
        </div>

        {/* Message Detail Drawer */}
        <Drawer open={isDetailOpen} onOpenChange={setIsDetailOpen} direction="right">
          <DrawerContent className="w-full border-l bg-card/95 sm:max-w-md lg:max-w-lg">
            {selectedMessage && (
              <>
                <DrawerHeader className="border-b border-border/60 pb-3">
                  <DrawerTitle className="flex items-center justify-between gap-3">
                    <span className="line-clamp-1 text-base font-semibold">
                      {selectedMessage.name}
                    </span>
                    {renderStatusBadge(selectedMessage.status)}
                  </DrawerTitle>
                  <DrawerDescription className="flex flex-wrap items-center gap-3 text-xs">
                    <span className="flex items-center gap-1">
                      <Mail className="h-3 w-3" />
                      {selectedMessage.email}
                    </span>
                    {selectedMessage.phone && (
                      <span className="flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {selectedMessage.phone}
                      </span>
                    )}
                  </DrawerDescription>
                </DrawerHeader>

                <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4 text-sm sm:p-5">
                  <div className="grid gap-3 rounded-lg bg-muted/40 p-3">
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-muted-foreground">Service</p>
                      <p className="text-sm">
                        {selectedMessage.service
                          ? serviceLabels[selectedMessage.service] || selectedMessage.service
                          : "Not specified"}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-muted-foreground">Address</p>
                      <p className="text-sm">
                        {selectedMessage.address || "Not provided"}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-muted-foreground">Requested date</p>
                      <p className="text-sm">
                        {selectedMessage.requested_date
                          ? formatDate(selectedMessage.requested_date)
                          : "Not specified"}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-muted-foreground">Received</p>
                      <p className="text-sm">{formatDate(selectedMessage.created_at)}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Message
                    </p>
                    <div className="rounded-lg border border-border/60 bg-background/50 p-3 text-sm leading-relaxed text-foreground">
                      <p className="whitespace-pre-wrap">{selectedMessage.message}</p>
                    </div>
                  </div>
                </div>

                <DrawerFooter className="border-t border-border/60 bg-background/80">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex flex-wrap gap-2">
                      <Button
                        size="sm"
                        variant={selectedMessage.status === "new" ? "default" : "outline"}
                        onClick={() => handleStatusChange("new")}
                        disabled={isUpdatingStatus}
                      >
                        {selectedMessage.status === "new" ? "Mark as New" : "Set as New"}
                      </Button>
                      <Button
                        size="sm"
                        variant={selectedMessage.status === "contacted" ? "default" : "outline"}
                        onClick={() => handleStatusChange("contacted")}
                        disabled={isUpdatingStatus}
                      >
                        Mark as Contacted
                      </Button>
                      <Button
                        size="sm"
                        variant={selectedMessage.status === "completed" ? "default" : "outline"}
                        onClick={() => handleStatusChange("completed")}
                        disabled={isUpdatingStatus}
                      >
                        Mark as Completed
                      </Button>
                    </div>
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={handleDelete}
                        disabled={isDeleting}
                      >
                        <Trash2 className="mr-1 h-4 w-4" />
                        Delete
                      </Button>
                      <DrawerClose asChild>
                        <Button size="sm" variant="outline">
                          Close
                        </Button>
                      </DrawerClose>
                    </div>
                  </div>
                </DrawerFooter>
              </>
            )}
          </DrawerContent>
        </Drawer>
      </div>
    </SidebarProvider>
  )
}
