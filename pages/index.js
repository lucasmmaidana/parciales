import Head from "next/head"

import { useAuth } from "@/lib/auth"

import { Button, ButtonGroup } from "@chakra-ui/react"
import DashboardShell from "@/components/DashboardShell"

export default function Home() {
  const auth = useAuth()

  return auth.loading ? (
    "Loading..."
  ) : auth.user ? (
    <DashboardShell>
      <p>{JSON.stringify(auth.user, null, 2)}</p>
      <Button onClick={(e) => auth.signout()}>Sign Out</Button>
    </DashboardShell>
  ) : (
    <Button onClick={(e) => auth.signinWithGoogle()}>Sign In</Button>
  )
}
