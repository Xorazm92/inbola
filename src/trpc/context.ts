import { inferAsyncReturnType } from '@trpc/server';
import { NextRequest } from 'next/server';
import { User } from '../payload-types';
import { getPayloadClient } from '../get-payload';

export const createContext = async (req: NextRequest) => {
  let user: User | null = null;
  const token = req.cookies.get('payload-token')?.value;

  if (token) {
    try {
      const payloadClient = await getPayloadClient();
      let userFromToken: User | null = null;
      let userId: string | undefined;

      if (typeof payloadClient.verifyJWT === 'function') {
        const result = await payloadClient.verifyJWT(token);
        if (result && result.user) {
          userFromToken = result.user as User;
          userId = userFromToken.id || result.user.id;
        } else if (result && result.id) {
          userId = result.id;
        }
      }

      // Agar user JWT verifydan topilmasa, token ichidan id olib, findByID orqali userni topamiz
      if (!userFromToken && userId) {
        try {
          const foundUser = await payloadClient.findByID({
            collection: 'users',
            id: userId,
          });
          if (foundUser) {
            userFromToken = foundUser as User;
          }
        } catch (e) {
          userFromToken = null;
        }
      }
      user = userFromToken;
    } catch (e) {
      user = null;
    }
  }

  return { user };
};

export type Context = inferAsyncReturnType<typeof createContext>
