import type { Request, Response, NextFunction } from 'express'

import { auth } from '~/lib/firebase'

export const verifyAuthToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers?.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' })
  }

  const idToken = authHeader.split('Bearer ')[1]
  try {
    const decodedToken = await auth.verifyIdToken(idToken)
    req.body.user = decodedToken
    next()
  } catch (error) {
    console.error('Error verifying token:', error)
    return res.status(401).json({ message: 'Unauthorized: Invalid token' })
  }
}
