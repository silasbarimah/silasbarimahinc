import { pbkdf2Sync, randomBytes, timingSafeEqual } from "crypto";

const PASSWORD_ITERATIONS = 120_000;

export function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const hash = pbkdf2Sync(password, salt, PASSWORD_ITERATIONS, 64, "sha512").toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, storedPassword: string) {
  if (!storedPassword.includes(":")) {
    return storedPassword === password;
  }

  const [salt, hash] = storedPassword.split(":");
  const expectedHash = pbkdf2Sync(password, salt, PASSWORD_ITERATIONS, 64, "sha512").toString("hex");
  const provided = Buffer.from(hash, "hex");
  const expected = Buffer.from(expectedHash, "hex");

  if (provided.length !== expected.length) {
    return false;
  }

  return timingSafeEqual(provided, expected);
}
