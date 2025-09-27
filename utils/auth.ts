import { NextRequest } from 'next/server';
import { validate, parse, type InitData } from '@tma.js/init-data-node';

const token : string = process.env.BOT_TOKEN || '';

export interface AuthResp {
  authStatus: number,
  error?: string,
  userData?: InitData
}

export const authHandler: (request: NextRequest) => AuthResp = (request) => {
  const [authType, authData = ''] : string[] = (request.headers.get('authorization') || '').split(' ');

  if (authType === "tma") {
    try {
      validate(authData, token, {
        expiresIn: 0
      });
      console.log(parse(authData));
      return { authStatus: 200, userData: parse(authData) } // continue to /api
    } catch (e) {
      return { authStatus: 401, error: "Unauthorized: no or expired token" };
    }
  }

  return { authStatus: 400,  error: "Bad Request: no authorization header" };
};