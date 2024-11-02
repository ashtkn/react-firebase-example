import { initializeApp } from 'firebase/app'
import { getAuth, connectAuthEmulator } from 'firebase/auth'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

const app = initializeApp(firebaseConfig)

// Firebase Authentication
const auth = getAuth(app)

if (import.meta.env.DEV) {
  console.info('Using Firebase Authentication Emulator')
  connectAuthEmulator(
    auth,
    import.meta.env.VITE_AUTH_API_ENDPOINT ?? 'http://127.0.0.1:9099',
  )
}

export { auth }
