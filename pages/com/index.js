import React from "react"
import useSWR from "swr"
import DashboardShell from "@/components/DashboardShell"
import EmptyState from "@/components/EmptyState"
import ComisionTable from "@/components/ComisionTable"
import ComisionTableSkeleton from "@/components/ComisionTableSkeleton"
import ComisionTableHeader from "@/components/ComisionTableHeader"
import fetcher from "@/utils/fetcher"

const Dashboard = () => {
  const { data } = useSWR("/api/comisiones", fetcher)
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
        <ComisionTable sites={comisiones} />
      ) : (
        <EmptyState />
      )}
    </DashboardShell>
  )
}
export default Dashboard
