import { connectDB } from "@/lib/mongodb";
import Project from "@/models/Project";
import { notFound } from "next/navigation";
import DonateButton from "./DonateButton";

export default async function ProjectDetail({ params }) {
  await connectDB();

  const project = await Project.findById((await params).id).lean();
  if (!project) return notFound();

  project._id = String(project._id);

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      {/* Imagen */}
      {project.image ? (
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-64 object-cover rounded-lg shadow-md"
        />
      ) : (
        <div className="w-full h-64 bg-gray-200 flex items-center justify-center text-gray-500 rounded-lg">
          Sin imagen
        </div>
      )}

      <h1 className="text-3xl font-bold mt-6">{project.title}</h1>
      <p className="text-gray-700 mt-4">{project.description}</p>

      {/* Barra de progreso */}
      <div className="mt-6">
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-green-600 h-3 rounded-full"
            style={{
              width: `${Math.min((project.raised / project.goal) * 100, 100)}%`,
            }}
          ></div>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          {project.raised} / {project.goal} USD
        </p>
      </div>

      {/* Botón de aporte */}
      <div className="mt-6">
        <DonateButton projectId={project._id} />
      </div>
    </div>
  );
}
