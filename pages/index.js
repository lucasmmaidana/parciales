import Head from "next/head"

import { useAuth } from "@/lib/auth"

import { Button, ButtonGroup } from "@chakra-ui/react"

export default function Home() {
  const auth = useAuth()

  return auth.loading ? (
    "Loading..."
  ) : auth.user ? (
    <div>
      <p>{JSON.stringify(auth.user, null, 2)}</p>
      <Button onClick={(e) => auth.signout()}>Sign Out</Button>
    </div>
  ) : (
    <Button onClick={(e) => auth.signinWithGoogle()}>Sign In</Button>
  )
}
