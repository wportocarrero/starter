// src/app/api/auth/login/route.js
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { createToken, setUserCookie } from "@/lib/auth";

export const dynamic = "force-dynamic"; // opcional, evita caché
export const revalidate = 0;

export async function POST(req) {
  await connectDB();
  const { email, password } = await req.json();

  const user = await User.findOne({ email });
  if (!user) return Response.json({ error: "Usuario no encontrado" }, { status: 404 });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return Response.json({ error: "Contraseña incorrecta" }, { status: 401 });

  const token = createToken(user);
  // await porque setUserCookie puede devolver Promise o undefined
  await setUserCookie(token);

  return Response.json({ ok: true });
}
