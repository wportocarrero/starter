// src/app/projects/page.jsx
import Link from "next/link";
import { connectDB } from "@/lib/mongodb";
import Project from "@/models/Project";
import NewProjectForm from "./NewProjectForm";

export default async function ProjectsPage() {
  await connectDB();
  const projectsRaw = await Project.find().sort({ createdAt: -1 }).lean();
  const projects = projectsRaw.map(p => ({ ...p, _id: String(p._id) }));

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold mb-8 text-center">Proyectos</h1>

      <div className="mb-8">
        {/* componente cliente para crear proyectos */}
        <NewProjectForm />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((p) => (
          <div key={p._id} className="bg-white shadow-md rounded-xl p-6">
            {p.image ? (
              <img src={p.image} alt={p.title} className="w-full h-40 object-cover rounded-lg mb-4" />
            ) : (
              <div className="w-full h-40 bg-gray-200 rounded-lg mb-4 flex items-center justify-center text-gray-500">Sin imagen</div>
            )}

            <h2 className="text-2xl font-semibold">{p.title}</h2>
            <p className="text-gray-600 line-clamp-3">{p.description}</p>

            <div className="mt-4">
              <div className="h-2 bg-gray-200 rounded">
                <div className="h-2 bg-green-600 rounded" style={{ width: `${(p.raised / p.goal) * 100}%` }} />
              </div>
              <p className="text-sm mt-2">S/.{p.raised} recaudados de S/.{p.goal}</p>
            </div>

            <Link href={`/projects/${p._id}`} className="mt-4 inline-block bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
              Ver proyecto
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
