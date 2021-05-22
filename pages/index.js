import Head from "next/head"
import styles from "../styles/Home.module.css"

import { useAuth } from "../lib/auth"

export default function Home() {
  const auth = useAuth()

  return auth.loading ? (
    "Loading..."
  ) : auth.user ? (
    <div>
      <p>{JSON.stringify(auth.user, null, 2)}</p>
      <button onClick={(e) => auth.signout()}>Sign Out</button>
    </div>
  ) : (
    <button onClick={(e) => auth.signinWithGoogle()}>Sign In</button>
  )
}
