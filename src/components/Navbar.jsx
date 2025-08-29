// src/components/Navbar.jsx
"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  return (
    <nav className="bg-green-600 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <Link href="/" className="text-xl font-bold">
        🌱 Mi Kickstarter
      </Link>

      <div className="flex gap-4">
        <Link href="/projects" className="hover:underline">
          Proyectos
        </Link>
        <Link href="/login" className="hover:underline">
          Iniciar sesión
        </Link>
        <Link href="/register" className="hover:underline">
          Registrarse
        </Link>
      </div>
    </nav>
  );
}
