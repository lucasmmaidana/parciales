import firebase from "./firebase"

const firestore = firebase.firestore()

// Usuarios

export function updateUser(uid, data) {
  return firestore.collection("users").doc(uid).update(data)
}

export function createUser(uid, data) {
  return firestore
    .collection("usuarios")
    .doc(uid)
    .set({ uid, ...data }, { merge: true })
}

// Parciales

export function createParcial(data) {
  return firestore.collection("parciales").add(data)
}
