// src/app/api/auth/me/route.js
import { getUserFromCookie } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  await connectDB();

  // await funciona con valor o promesa -> robusto
  const payload = await getUserFromCookie();
  if (!payload) {
    return Response.json({ user: null }, { status: 200 });
  }

  const user = await User.findById(payload.id).select("-password -__v");
  if (!user) return Response.json({ user: null }, { status: 200 });

  return Response.json({
    user: { id: String(user._id), email: user.email, name: user.name || null },
  }, { status: 200 });
}
