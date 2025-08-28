// src/app/projects/[id]/DonateForm.jsx
"use client";
import { useState } from "react";

export default function DonateForm({ projectId }) {
  const [amount, setAmount] = useState(100);
  const [loading, setLoading] = useState(false);

  const handleDonate = async (e) => {
    e.preventDefault();
    if (!amount || amount <= 0) { alert("Ingresa un monto válido"); return; }
    setLoading(true);
    try {
      const res = await fetch(`/api/projects/${projectId}/donate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: Number(amount) }),
      });
      const data = await res.json();
      if (data.ok) {
        // recarga simple para ver el nuevo monto; más adelante podrías actualizar en lugar de recargar
        window.location.reload();
      } else {
        alert(data.error || "Error en la donación");
      }
    } catch (err) {
      console.error(err);
      alert("Error conectando con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleDonate} className="flex items-center gap-3">
      <input type="number" min="1" value={amount} onChange={(e) => setAmount(e.target.value)} className="border p-2 rounded w-32" />
      <button type="submit" disabled={loading} className="bg-green-600 text-white px-4 py-2 rounded">
        {loading ? "Procesando..." : "Aportar"}
      </button>
    </form>
  );
}
