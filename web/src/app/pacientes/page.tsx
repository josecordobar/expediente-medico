"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

type Patient = {
  id: string;
  full_name: string;
  birth_date: string;
  phone: string;
  cedula: string;
};

export default function Page() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [q, setQ] = useState("");

  const fetchPatients = async (term?: string) => {
    setLoading(true);
    setError("");
    let query = supabase.from("patients").select("id, full_name, birth_date, phone, cedula").order("full_name");
    if (term && term.trim().length > 0) {
      const t = term.trim();
      if (/^[A-Za-z0-9-]+$/.test(t)) query = query.or(`cedula.eq.${t},full_name.ilike.%${t}%`);
      else query = query.ilike("full_name", `%${t}%`);
    }
    const { data, error: err } = await query.limit(50);
    if (err) setError(err.message);
    setPatients(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const onSearch = useMemo(() => {
    let t: any;
    return (value: string) => {
      setQ(value);
      clearTimeout(t);
      t = setTimeout(() => fetchPatients(value), 300);
    };
  }, []);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold text-sky-700">Pacientes</h1>
        <Link href="/nuevo-paciente" className="bg-sky-600 text-white px-3 py-2 rounded">Nuevo</Link>
      </div>
      <div className="mb-4">
        <input
          value={q}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Buscar por nombre o cédula"
          className="w-full md:w-96 rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-300"
        />
      </div>
      {loading && <div>Cargando…</div>}
      {error && <div className="text-red-600">{error}</div>}
      {!loading && patients.length === 0 && <div>No hay pacientes</div>}
      {!loading && patients.length > 0 && (
        <div className="overflow-x-auto bg-white rounded border border-gray-200">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-4 py-2">Nombre</th>
                <th className="text-left px-4 py-2">Cédula</th>
                <th className="text-left px-4 py-2">Teléfono</th>
                <th className="text-left px-4 py-2">Nacimiento</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2">
                    <Link href={`/paciente/${p.id}`} className="text-sky-700 hover:underline">
                      {p.full_name}
                    </Link>
                  </td>
                  <td className="px-4 py-2">{p.cedula}</td>
                  <td className="px-4 py-2">{p.phone}</td>
                  <td className="px-4 py-2">{p.birth_date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
