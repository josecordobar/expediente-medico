"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const [full_name, setFullName] = useState("");
  const [birth_date, setBirthDate] = useState("");
  const [phone, setPhone] = useState("");
  const [cedula, setCedula] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!full_name || !birth_date || !phone || !cedula) {
      setError("Completa todos los campos");
      return;
    }
    setLoading(true);
    const { data: session } = await supabase.auth.getSession();
    const uid = session.session?.user.id;
    const { data, error: err } = await supabase
      .from("patients")
      .insert({ full_name, birth_date, phone, cedula, created_by: uid })
      .select("id")
      .single();
    setLoading(false);
    if (err) {
      setError(err.message);
      return;
    }
    router.replace(`/paciente/${data.id}`);
  };

  return (
    <div className="p-6 max-w-xl">
      <h1 className="text-2xl font-semibold text-sky-700 mb-4">Nuevo Paciente</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label htmlFor="full_name" className="block text-sm text-gray-700">Nombre Completo</label>
          <input
            id="full_name"
            title="Nombre Completo"
            placeholder="Ingresa el nombre completo"
            value={full_name}
            onChange={(e) => setFullName(e.target.value)}
            className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-300"
            required
          />
        </div>
        <div>
          <label htmlFor="birth_date" className="block text-sm text-gray-700">Fecha de Nacimiento</label>
          <input
            id="birth_date"
            title="Fecha de Nacimiento"
            type="date"
            value={birth_date}
            onChange={(e) => setBirthDate(e.target.value)}
            className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-300"
            required
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm text-gray-700">Número de Teléfono</label>
          <input
            id="phone"
            title="Número de Teléfono"
            placeholder="Ingresa el número de teléfono"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-300"
            required
          />
        </div>
        <div>
          <label htmlFor="cedula" className="block text-sm text-gray-700">Cédula/ID</label>
          <input
            id="cedula"
            title="Cédula/ID"
            placeholder="Ingresa la cédula o ID"
            value={cedula}
            onChange={(e) => setCedula(e.target.value)}
            className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-300"
            required
          />
        </div>
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <button type="submit" disabled={loading} className="bg-sky-600 text-white px-4 py-2 rounded">
          {loading ? "Guardando…" : "Guardar"}
        </button>
      </form>
    </div>
  );
}
