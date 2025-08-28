import { connectDB } from "@/lib/mongodb";
import Project from "@/models/Project";

export default async function ProjectDetailPage({ params }) {
  await connectDB();
  const project = await Project.findById(params.id).lean();

  if (!project) {
    return <h1 className="p-8 text-red-600">Proyecto no encontrado</h1>;
  }

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
      <p className="text-gray-700 mb-4">{project.description}</p>

      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <p>
          <strong>Meta:</strong> S/. {project.goal}
        </p>
        <p>
          <strong>Recaudado:</strong> S/. {project.raised}
        </p>
      </div>

      <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
        Aportar al proyecto
      </button>
    </div>
  );
}
