import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";

export async function GET() {
  try {
    const db = await connectDB();
    return NextResponse.json({ ok: true, message: "Conexión exitosa a MongoDB 🎉" });
  } catch (error) {
    console.error("Error de conexión:", error);
    return NextResponse.json({ ok: false, message: "Error conectando a MongoDB", error: error.message }, { status: 500 });
  }
}
