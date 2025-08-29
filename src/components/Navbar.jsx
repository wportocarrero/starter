"use client";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { user, fetchUser } = useAuth();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    fetchUser();
  }

  return (
    <nav className="bg-green-600 text-white px-6 py-4 flex justify-between items-center">
      <Link href="/" className="font-bold text-xl">
        🌱 Mi Kickstarter
      </Link>

      <div className="space-x-4">
        <Link href="/projects">Proyectos</Link>

        {user ? (
          <>
            <span className="font-semibold">
              Hola, {user.name || user.email}
            </span>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded"
            >
              Cerrar sesión
            </button>
          </>
        ) : (
          <>
            <Link href="/login">Login</Link>
            <Link href="/register">Registrarse</Link>
          </>
        )}
      </div>
    </nav>
  );
}
