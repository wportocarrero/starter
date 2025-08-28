"use client";

import { useEffect, useState } from "react";
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
      <h1 className="text-4xl font-bold text-center mb-10">
        Descubre proyectos increíbles 🚀
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <div
            key={project._id}
            className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transition"
          >
            {project.image ? (
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover"
              />
            ) : (
              <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">
                Sin imagen
              </div>
            )}

            <div className="p-6">
              <h2 className="text-xl font-bold">{project.title}</h2>
              <p className="text-gray-600 line-clamp-3">{project.description}</p>

              {/* Barra de progreso */}
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
                <div
                  className="bg-green-500 h-2.5 rounded-full"
                  style={{
                    width: `${Math.min(
                      (project.raised / project.goal) * 100,
                      100
                    )}%`,
                  }}
                ></div>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                {project.raised} / {project.goal} USD
              </p>

              <Link
                href={`/projects/${project._id}`}
                className="mt-4 inline-block bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
              >
                Ver proyecto
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
