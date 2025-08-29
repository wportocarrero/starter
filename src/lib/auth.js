// src/lib/auth.js
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const SECRET = process.env.JWT_SECRET || "supersecret";

// 👉 Crea un token JWT con los datos del usuario
export function createToken(user) {
  return jwt.sign(
    { id: user._id, email: user.email },
    SECRET,
    { expiresIn: "7d" }
  );
}

// 👉 Verifica el token
export function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET);
  } catch (err) {
    return null;
  }
}

// 👉 Guardar el token en cookies
export function setUserCookie(token) {
  cookies().set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 7 días
    path: "/",
  });
}

// 👉 Leer el token desde cookies
export function getUserFromCookie() {
  const token = cookies().get("token")?.value;
  if (!token) return null;
  return verifyToken(token);
}
