import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

// Presence is enforced at startup in index.ts; no insecure dev fallback.
const JWT_SECRET = process.env.JWT_SECRET as string

export function signToken(userId: string): string {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '24h' })
}

export function requireAuth(req: Request, res: Response, next: NextFunction): void {
  const header = req.headers.authorization
  if (!header?.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Unauthorized' })
    return
  }
  try {
    const payload = jwt.verify(header.slice(7), JWT_SECRET) as { userId: string }
    res.locals.userId = payload.userId
    next()
  } catch {
    res.status(401).json({ error: 'Invalid token' })
  }
}
