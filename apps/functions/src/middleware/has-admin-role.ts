import type { Request, Response, NextFunction } from 'express'
import type { DecodedIdToken } from 'firebase-admin/auth'

import { auth } from '~/lib/firebase'

export const hasAdminRole = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const user: DecodedIdToken | null | undefined = req.body?.user
  if (!user) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  const { customClaims } = await auth.getUser(user.uid)
  if (!customClaims || customClaims.role !== 'admin') {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  next()
}
