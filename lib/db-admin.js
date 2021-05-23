import { db } from "./firebase-admin"

// Parciales

export async function getAllParciales(comisionId) {
  try {
    const snapshot = await db
      .collection("parciales")
      .where("comisionId", "==", comisionId)
      .get()
    const parciales = []
    snapshot.forEach((doc) => {
      parciales.push({ id: doc.id, ...doc.data() })
    })
    return { parciales }
  } catch (error) {
    return { error }
  }
}

// Comisiones

export async function getAllComisiones() {
  try {
    const snapshot = await db.collection("comisiones").get()
    const comisiones = []
    snapshot.forEach((doc) => {
      comisiones.push({ id: doc.id, ...doc.data() })
    })
    return { comisiones }
  } catch (error) {
    return { error }
  }
}

export async function getUserComisiones(uid) {
  const snapshot = await db
    .collection("comisiones")
    .where("authorId", "==", uid)
    .get()
  const comisiones = []
  snapshot.forEach((doc) => {
    comisiones.push({ id: doc.id, ...doc.data() })
  })
  comisiones.sort((a, b) =>
    compareDesc(parseISO(a.createdAt), parseISO(b.createdAt))
  )
  return { sites: comisiones }
}
