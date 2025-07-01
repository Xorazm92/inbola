import { getPayloadClient } from '../get-payload'
import { inferAsyncReturnType } from '@trpc/server'
import { NextRequest } from 'next/server'
import { User } from '../payload-types'

export const createContext = async (req: NextRequest) => {
  const payload = await getPayloadClient()

  const { user } = await payload.auth({
    headers: req.headers,
    req: req as any,
  })

  return {
    user: user as User | null,
  }
}

export type Context = inferAsyncReturnType<typeof createContext>
