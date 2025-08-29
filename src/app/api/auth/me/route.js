import { getUserFromCookie } from "@/lib/auth";

export async function GET() {
  const user = await getUserFromCookie();
  if (!user) {
    return Response.json({ user: null }, { status: 200 });
  }
  return Response.json({ user });
}

