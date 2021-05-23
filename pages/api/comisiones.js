import { auth } from "@/lib/firebase-admin"
import { getUserComisiones } from "@/lib/db-admin"

export default async (req, res) => {
  try {
    const { uid } = await auth.verifyIdToken(req.headers.token)
    const { sites: comisiones } = await getUserComisiones(uid)
    res.status(200).json({ comisiones: comisiones })
  } catch (error) {
    res.status(500).json({ error })
  }
}
