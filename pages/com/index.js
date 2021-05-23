import React from "react"
import useSWR from "swr"
import DashboardShell from "@/components/DashboardShell"
import EmptyState from "@/components/EmptyState"
import ComisionTable from "@/components/ComisionTable"
import ComisionTableSkeleton from "@/components/ComisionTableSkeleton"
import ComisionTableHeader from "@/components/ComisionTableHeader"
import fetcher from "@/utils/fetcher"
import { useAuth } from "@/lib/auth"

const Dashboard = () => {
  const { user } = useAuth()
  const { data } = useSWR(
    user ? ["/api/comisiones", user.token] : null,
    fetcher
  )
  const comisiones = data?.comisiones
  if (!data) {
    return (
      <DashboardShell>
        <ComisionTableHeader />
        <ComisionTableSkeleton />
      </DashboardShell>
    )
  }
  return (
    <DashboardShell>
      <ComisionTableHeader />
      {comisiones.length ? (
        <ComisionTable comisiones={comisiones} />
      ) : (
        <EmptyState />
      )}
    </DashboardShell>
  )
}
export default Dashboard
