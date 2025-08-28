// src/app/projects/[id]/page.jsx
import { notFound } from "next/navigation";
import { connectDB } from "@/lib/mongodb";
import Project from "@/models/Project";
import DonateForm from "./DonateForm";

export default async function ProjectDetail({ params }) {
  const { id } = await params;
  await connectDB();
  const project = await Project.findById(id).lean();
  if (!project) return notFound();
  project._id = String(project._id);

  const progressPct = project.goal ? Math.min((project.raised / project.goal) * 100, 100) : 0;

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      {project.image ? <img src={project.image} alt={project.title} className="w-full h-60 object-cover rounded-lg mb-6" /> : null}
      <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
      <p className="text-gray-700 mb-6">{project.description}</p>

      <div className="mb-6">
        <div className="h-3 bg-gray-200 rounded">
          <div className="h-3 bg-green-600 rounded" style={{ width: `${progressPct}%` }} />
        </div>
        <p className="mt-2 text-gray-600">S/.{project.raised} recaudados de S/.{project.goal}</p>
      </div>

      {/* Cliente: formulario de donación (hace fetch POST a la API) */}
      <DonateForm projectId={project._id} />
    </div>
  );
}
