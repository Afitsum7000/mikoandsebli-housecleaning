import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { AdminDashboard } from "@/components/admin/admin-dashboard"

export const metadata = {
  title: "Admin Dashboard | Sebli and Miko House Cleaning",
  description: "Manage contact messages and inquiries",
}

interface AdminPageProps {
  searchParams?: Promise<{
    status?: string
    service?: string
    q?: string
  }>
}

export default async function AdminPage({ searchParams }: AdminPageProps) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/admin/login")
  }

  const resolvedSearchParams = (await searchParams) || {}
  const { status, service, q } = resolvedSearchParams

  let query = supabase
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false })

  if (status && status !== "all") {
    query = query.eq("status", status)
  }

  if (service && service !== "all") {
    query = query.eq("service", service)
  }

  if (q && q.trim().length > 0) {
    const term = `%${q.trim()}%`
    query = query.or(
      `name.ilike.${term},email.ilike.${term},phone.ilike.${term},message.ilike.${term}`,
    )
  }

  const { data: messages, error } = await query

  if (error) {
    console.error("Error fetching messages:", error)
  }

  return <AdminDashboard messages={messages || []} userEmail={user.email || ""} />
}
