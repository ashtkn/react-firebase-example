import * as admin from 'firebase-admin'
import { FieldValue } from 'firebase-admin/firestore'

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
})
export const db = admin.firestore()
export const serverTimestamp = FieldValue.serverTimestamp()

export const auth = admin.auth()
