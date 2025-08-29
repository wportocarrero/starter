import { connectDB } from "@/lib/mongodb";
import Project from "@/models/Project";

export async function GET(req, { params }) {
  await connectDB();
  const project = await Project.findById(params.id);
  return Response.json({ ok: true, project });
}

export async function PUT(req, { params }) {
  await connectDB();
  const { amount } = await req.json();
  const project = await Project.findById(params.id);
  if (!project) return Response.json({ error: "No encontrado" }, { status: 404 });

  project.raised += amount;
  await project.save();

  return Response.json({ ok: true, project });
}
