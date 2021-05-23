import db from "./firebase-admin"

export async function getAllExamenes(comisionId) {
  try {
    const snapshot = await db
      .collection("examenes")
      .where("comisionId", "==", comisionId)
      .get()
    const examenes = []
    snapshot.forEach((doc) => {
      examenes.push({ id: doc.id, ...doc.data() })
    })
    return { examenes }
  } catch (error) {
    return { error }
  }
}
