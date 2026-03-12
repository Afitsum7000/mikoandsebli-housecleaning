import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { AdminDashboard } from "@/components/admin/admin-dashboard"

export const metadata = {
  title: "Admin Dashboard | Sebli and Miko House Cleaning",
  description: "Manage contact messages and inquiries",
}

export default async function AdminPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect("/admin/login")
  }

  const { data: messages, error } = await supabase
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching messages:", error)
  }

  return <AdminDashboard messages={messages || []} userEmail={user.email || ""} />
}
