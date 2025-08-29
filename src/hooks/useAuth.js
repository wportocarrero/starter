"use client";
import { useEffect, useState } from "react";

export function useAuth() {
  const [user, setUser] = useState(null);

  // Cargar usuario desde API
  async function fetchUser() {
    try {
      const res = await fetch("/api/auth/me");
      if (!res.ok) return setUser(null);
      const data = await res.json();
      setUser(data.user);
    } catch (err) {
      console.error("Error al cargar usuario:", err);
      setUser(null);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return { user, setUser, fetchUser };
}
