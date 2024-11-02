import type { Request, Response } from 'express'

export const handle = async (req: Request, res: Response) => {
  const message = 'You have an access to admin-only method.'
  return res.status(200).send({ message })
}
