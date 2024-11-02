import React, { useCallback, useState } from 'react'
import { auth } from '../lib/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { callPublicApi, callPrivateApi } from '../lib/api'

const AuthenticationTest: React.FC = () => {
  const [email] = useState('xxx@example.com')
  const [password] = useState('12345678')
  const [bearerToken, setBearerToken] = useState('')

  const onCallPublicApiButtonPressed = useCallback(() => {
    callPublicApi()
      .then()
      .catch((err) => {
        console.error(err)
      })
  }, [])

  const onSignInButtonPressed = useCallback(() => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Singed in
        const user = userCredential.user
        user.getIdToken().then(setBearerToken)
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.error(errorCode, errorMessage)
      })
  }, [email, password])

  const onCallPrivateApiButtonPressed = useCallback(() => {
    callPrivateApi(bearerToken)
      .then()
      .catch((err) => {
        console.error(err)
      })
  }, [bearerToken])

  return (
    <div>
      <button onClick={onCallPublicApiButtonPressed}>Call Public API</button>
      <button onClick={onSignInButtonPressed}>SignIn</button>
      <button onClick={onCallPrivateApiButtonPressed}>Call Private API</button>
    </div>
  )
}

export default AuthenticationTest
