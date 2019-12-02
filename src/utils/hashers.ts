import bcrypt from 'bcrypt';
import crypto from 'crypto';

export const passwordHasher = (raw: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(12, (err, salt) => {
      if (err) reject(err);
      bcrypt.hash(raw, salt, (err, hash) => {
        if (err) reject(err);
        resolve(hash);
      });
    });
  });
};

export const randomString = (length: number = 16) => {
  return crypto.randomBytes(length);
};

export const check_password = () => {};

export const make_password = () => {};
