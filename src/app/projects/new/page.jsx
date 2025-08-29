import { redirect } from "next/navigation";
import { getUserFromCookie } from "@/lib/auth";
import ProjectForm from "@/components/ProjectForm";

export default async function NewProjectPage() {
  const user = await getUserFromCookie();

  if (!user) {
    redirect("/login"); // redirige al login si no hay sesión
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Crear nuevo proyecto</h1>
      <ProjectForm />
    </div>
  );
}
