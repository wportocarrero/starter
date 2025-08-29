// src/app/api/auth/logout/route.js
import { removeUserCookie } from "@/lib/auth";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function POST() {
  await removeUserCookie(); // funciona sync o async
  return Response.json({ ok: true });
}
