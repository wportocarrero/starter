// src/app/projects/NewProjectForm.jsx
"use client";
import { useState } from "react";

export default function NewProjectForm() {
  const [form, setForm] = useState({ title: "", description: "", goal: "", image: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, goal: Number(form.goal) }),
      });
      const data = await res.json();
      if (data.ok) {
        // recargar página para ver el nuevo proyecto (simple)
        window.location.href = "/projects";
      } else {
        alert(data.error || "Error creando proyecto");
      }
    } catch (err) {
      console.error(err);
      alert("Error conectando al servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow">
      <h3 className="text-xl font-semibold mb-3">Crear nuevo proyecto</h3>
      <input name="title" value={form.title} onChange={handleChange} placeholder="Título" className="w-full border p-2 rounded mb-2" required />
      <textarea name="description" value={form.description} onChange={handleChange} placeholder="Descripción" className="w-full border p-2 rounded mb-2" required />
      <input name="goal" type="number" value={form.goal} onChange={handleChange} placeholder="Meta (S/.)" className="w-full border p-2 rounded mb-2" required />
      <input name="image" value={form.image} onChange={handleChange} placeholder="URL imagen (opcional)" className="w-full border p-2 rounded mb-2" />
      <button type="submit" disabled={loading} className="bg-green-600 text-white px-4 py-2 rounded">
        {loading ? "Creando..." : "Crear Proyecto"}
      </button>
    </form>
  );
}
