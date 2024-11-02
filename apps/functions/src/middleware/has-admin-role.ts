import type { Request, Response, NextFunction } from 'express'
import type { DecodedIdToken } from 'firebase-admin/auth'

export const hasAdminRole = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const user: DecodedIdToken | null | undefined = req.body?.user
  if (!user) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  // TODO: 実装
  // console.log(`UserID: ${user.uid}`)
  next()
}
