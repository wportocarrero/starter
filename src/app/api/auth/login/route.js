import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { createToken, setUserCookie } from "@/lib/auth";

export async function POST(req) {
  await connectDB();
  const { email, password } = await req.json();
  const user = await User.findOne({ email });
  if (!user) return Response.json({ error: "Usuario no encontrado" }, { status: 401 });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return Response.json({ error: "Contraseña incorrecta" }, { status: 401 });

  const token = createToken(user);
  setUserCookie(token);

  return Response.json({ ok: true });
}
