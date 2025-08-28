"use client";

import { useState } from "react";

export default function DonateButton({ projectId }) {
    const [amount, setAmount] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleDonate() {
        if (!amount) return alert("Por favor ingresa un monto");

        setLoading(true);
        try {
            const res = await fetch(`/api/projects/${projectId}/donate`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount: Number(amount) }),
            });


            const data = await res.json();
            if (data.ok) {
                alert("✅ ¡Gracias por tu aporte!");
                window.location.reload();
            }
        } catch (error) {
            console.error(error);
            alert("❌ Error al procesar el aporte");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex gap-2 items-center">
            <input
                type="number"
                placeholder="Monto en USD"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="border px-3 py-2 rounded-lg"
            />
            <button
                onClick={handleDonate}
                disabled={loading}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition disabled:bg-gray-400"
            >
                {loading ? "Procesando..." : "Aportar al Proyecto"}
            </button>
        </div>
    );
}
