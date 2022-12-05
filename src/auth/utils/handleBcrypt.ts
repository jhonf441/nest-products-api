import * as bcrypt from 'bcrypt';

const saltOrRounds = 10;

export async function generateHash(passwordPlain: string): Promise<string> {
  return await bcrypt.hash(passwordPlain, saltOrRounds);
}

export async function compareHash(plain: string, hash: string): Promise<any> {
  return await bcrypt.compare(plain, hash);
}
