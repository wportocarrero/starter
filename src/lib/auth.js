// src/lib/auth.js
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const SECRET = process.env.JWT_SECRET || "supersecret";

// Crear token (sin async)
export function createToken(user) {
  return jwt.sign({ id: String(user._id), email: user.email }, SECRET, {
    expiresIn: "7d",
  });
}

// Verificar token (sin async)
export function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET);
  } catch (err) {
    return null;
  }
}

/*
  getCookieStoreMaybePromise:
  - Llama cookies(). En algunos entornos devuelve un objeto (sync).
  - En otros (especialmente cierta versión de Next en route handlers) devuelve una Promise.
  - Detectamos y devolvemos el objeto o la Promise según toque.
*/
function getCookieStoreMaybePromise() {
  try {
    const maybe = cookies();
    return maybe;
  } catch (err) {
    // En entornos inesperados cookies() podría lanzar; devolvemos null
    return null;
  }
}

/*
  setUserCookie(token)
  - Si cookies() es sync: setea y retorna undefined.
  - Si cookies() es Promise: devuelve una Promise que realiza el set.
  => Puedes hacer `await setUserCookie(token)` en tus rutas; funcionará en ambos casos.
*/
export function setUserCookie(token) {
  const maybe = getCookieStoreMaybePromise();
  if (!maybe) return;
  if (typeof maybe.then === "function") {
    return (async () => {
      const store = await maybe;
      store.set("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });
    })();
  } else {
    maybe.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
  }
}

/*
  removeUserCookie() — similar a setUserCookie
*/
export function removeUserCookie() {
  const maybe = getCookieStoreMaybePromise();
  if (!maybe) return;
  if (typeof maybe.then === "function") {
    return (async () => {
      const store = await maybe;
      store.delete("token");
    })();
  } else {
    maybe.delete("token");
  }
}

/*
  getUserFromCookie()
  - Devuelve el payload del JWT { id, email } o null.
  - Puede devolver directamente el payload (sync) o una Promise que lo resuelve.
  - Por seguridad: siempre puedes usar `await getUserFromCookie()` (await funciona con valores no-promesa).
*/
export function getUserFromCookie() {
  const maybe = getCookieStoreMaybePromise();
  if (!maybe) return null;

  if (typeof maybe.then === "function") {
    // cookies() -> Promise
    return (async () => {
      const store = await maybe;
      const token = store.get("token")?.value;
      if (!token) return null;
      return verifyToken(token);
    })();
  } else {
    // cookies() -> sync
    const token = maybe.get("token")?.value;
    if (!token) return null;
    return verifyToken(token);
  }
}
