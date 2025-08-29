import { connectDB } from "@/lib/mongodb";
import Project from "@/models/Project";
import { getUserFromCookie } from "@/lib/auth";

export async function GET() {
  await connectDB();
  const projects = await Project.find().sort({ createdAt: -1 });
  return Response.json({ projects });
}

export async function POST(req) {
  await connectDB();
  const user = getUserFromCookie();
  if (!user) return Response.json({ error: "No autorizado" }, { status: 401 });

  const { title, description, goal } = await req.json();
  const project = await Project.create({ title, description, goal, owner: user.id });

  return Response.json({ ok: true, project });
}
