import { verify, sign } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'key';

export function generateJWT(payload: object): string {
  return sign(payload, JWT_SECRET, { expiresIn: '1h' });
}

export function validateJWT(token: string): any {
  try {
    return verify(token, JWT_SECRET);
  } catch (err) {
    return null;
  }
}
