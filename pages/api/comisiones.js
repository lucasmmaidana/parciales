import { getAllComisiones } from "@/lib/db-admin"

export default async (_, res) => {
  const result = await getAllComisiones()
  if (result.error) {
    res.status(500).json({ error: result.error })
  }
  res.status(200).json({ comisiones: result.comisiones })
}
