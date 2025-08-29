"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function fetchProjects() {
      const res = await fetch("/api/projects");
      const data = await res.json();
      setProjects(data.projects);
    }
    fetchProjects();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Proyectos 🚀</h1>
        <Link href="/projects/create" className="bg-green-600 text-white px-4 py-2 rounded">
          Crear Proyecto
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((p) => (
          <div key={p._id} className="bg-white p-4 shadow rounded">
            <h2 className="text-xl font-bold">{p.title}</h2>
            <p>{p.description}</p>
            <p className="text-sm text-gray-600">{p.raised}/{p.goal} USD</p>
            <Link href={`/projects/${p._id}`} className="text-green-600">Ver</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
