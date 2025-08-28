// src/app/api/projects/[id]/donate/route.js
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Project from "@/models/Project";

export async function POST(req, context) {
  try {
    await connectDB();
    const { id } = await context.params;
    const body = await req.json();
    const amount = Number(body.amount || 0);
    if (amount <= 0) {
      return NextResponse.json({ ok: false, error: "amount debe ser > 0" }, { status: 400 });
    }

    const project = await Project.findByIdAndUpdate(id, { $inc: { raised: amount } }, { new: true }).lean();
    if (!project) return NextResponse.json({ ok: false, error: "Proyecto no encontrado" }, { status: 404 });
    project._id = String(project._id);
    return NextResponse.json({ ok: true, project });
  } catch (err) {
    console.error("POST /api/projects/[id]/donate error:", err);
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}
