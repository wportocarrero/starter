"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateProjectPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [goal, setGoal] = useState(0);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetch("/api/projects", {
      method: "POST",
      body: JSON.stringify({ title, description, goal }),
    });
    if (res.ok) router.push("/projects");
  }

  return (
    <div className="max-w-md mx-auto mt-12 bg-white p-6 shadow rounded">
      <h1 className="text-2xl font-bold mb-4">Crear Proyecto</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Título" className="border p-2 rounded" />
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Descripción" className="border p-2 rounded" />
        <input type="number" value={goal} onChange={(e) => setGoal(e.target.value)} placeholder="Meta USD" className="border p-2 rounded" />
        <button className="bg-green-600 text-white px-4 py-2 rounded">Crear</button>
      </form>
    </div>
  );
}
