// src/app/api/projects/[id]/route.js
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Project from "@/models/Project";

export async function GET(req, context) {
  try {
    await connectDB();
    // context.params may be a Promise in some Next versions; await to be safe
    const { id } = await context.params;
    const project = await Project.findById(id).lean();
    if (!project) return NextResponse.json({ ok: false, error: "Proyecto no encontrado" }, { status: 404 });
    project._id = String(project._id);
    return NextResponse.json({ ok: true, project });
  } catch (err) {
    console.error("GET /api/projects/[id] error:", err);
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}
