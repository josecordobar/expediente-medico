"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useParams } from "next/navigation";

type Patient = {
  id: string;
  full_name: string;
  birth_date: string;
  phone: string;
  cedula: string;
};

type Consultation = {
  id: string;
  created_at: string;
  title: string;
  detail: string;
};

export default function Page() {
  const params = useParams();
  const id = params?.id as string;
  const [patient, setPatient] = useState<Patient | null>(null);
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    setError("");
    const { data: p, error: pe } = await supabase
      .from("patients")
      .select("id, full_name, birth_date, phone, cedula")
      .eq("id", id)
      .single();
    if (pe) setError(pe.message);
    setPatient(p || null);
    const { data: c, error: ce } = await supabase
      .from("consultations")
      .select("id, created_at, title, detail")
      .eq("patient_id", id)
      .order("created_at", { ascending: false });
    if (ce) setError(ce.message);
    setConsultations(c || []);
    setLoading(false);
  };

  useEffect(() => {
    if (id) load();
  }, [id]);

  const addNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !detail) return;
    setSaving(true);
    const { data: session } = await supabase.auth.getSession();
    const uid = session.session?.user.id;
    const { error: err } = await supabase
      .from("consultations")
      .insert({ patient_id: id, title, detail, created_by: uid });
    setSaving(false);
    if (err) {
      setError(err.message);
      return;
    }
    setTitle("");
    setDetail("");
    load();
  };

  return (
    <div className="p-6 space-y-6">
      {loading && <div>Cargando…</div>}
      {error && <div className="text-red-600">{error}</div>}
      {patient && (
        <div className="bg-white rounded border border-gray-200 p-4">
          <h2 className="text-xl font-semibold text-sky-700">{patient.full_name}</h2>
          <div className="mt-2 text-sm text-gray-700">Cédula: {patient.cedula}</div>
          <div className="mt-1 text-sm text-gray-700">Teléfono: {patient.phone}</div>
          <div className="mt-1 text-sm text-gray-700">Nacimiento: {patient.birth_date}</div>
        </div>
      )}
      <div className="bg-white rounded border border-gray-200 p-4">
        <h3 className="text-lg font-semibold text-sky-700 mb-3">Añadir Nota de Consulta</h3>
        <form onSubmit={addNote} className="space-y-3">
          <div>
            <label className="block text-sm text-gray-700">Título</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-300"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700">Detalle</label>
            <textarea
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2 h-28 focus:outline-none focus:ring-2 focus:ring-sky-300"
              required
            />
          </div>
          <button type="submit" disabled={saving} className="bg-sky-600 text-white px-4 py-2 rounded">
            {saving ? "Guardando…" : "Guardar"}
          </button>
        </form>
      </div>
      <div className="bg-white rounded border border-gray-200 p-4">
        <h3 className="text-lg font-semibold text-sky-700 mb-3">Historial de Consultas</h3>
        {consultations.length === 0 && <div>No hay notas</div>}
        {consultations.length > 0 && (
          <ul className="space-y-3">
            {consultations.map((c) => (
              <li key={c.id} className="border border-gray-200 rounded p-3">
                <div className="text-sm text-gray-500">{new Date(c.created_at).toLocaleString()}</div>
                <div className="font-medium">{c.title}</div>
                <div className="text-gray-700 whitespace-pre-wrap">{c.detail}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
