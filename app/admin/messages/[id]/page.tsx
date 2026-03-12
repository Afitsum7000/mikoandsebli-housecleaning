import { createClient } from "@/lib/supabase/server"
import { redirect, notFound } from "next/navigation"
import { MessageDetail } from "@/components/admin/message-detail"

export const metadata = {
  title: "Message Details | Admin Dashboard",
  description: "View and manage contact message",
}

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function MessageDetailPage({ params }: PageProps) {
  const { id } = await params
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect("/admin/login")
  }

  const { data: message, error } = await supabase
    .from("contact_messages")
    .select("*")
    .eq("id", id)
    .single()

  if (error || !message) {
    notFound()
  }

  return <MessageDetail message={message} />
}
