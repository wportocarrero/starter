// src/app/api/projects/route.js
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Project from "@/models/Project";

export async function GET() {
  try {
    await connectDB();
    const projects = await Project.find().sort({ createdAt: -1 }).lean();
    const clean = projects.map(p => ({ ...p, _id: String(p._id) }));
    return NextResponse.json({ ok: true, projects: clean });
  } catch (err) {
    console.error("GET /api/projects error:", err);
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const data = {
      title: String(body.title || "").trim(),
      description: String(body.description || "").trim(),
      goal: Number(body.goal || 0),
      image: String(body.image || ""),
    };
    if (!data.title || !data.description || !data.goal) {
      return NextResponse.json({ ok: false, error: "title, description y goal son requeridos" }, { status: 400 });
    }
    const created = await Project.create(data);
    const obj = created.toObject();
    obj._id = String(obj._id);
    return NextResponse.json({ ok: true, project: obj }, { status: 201 });
  } catch (err) {
    console.error("POST /api/projects error:", err);
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}
