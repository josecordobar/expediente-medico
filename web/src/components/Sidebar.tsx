"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/pacientes", label: "Pacientes" },
  { href: "/nuevo-paciente", label: "Nuevo Paciente" },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200">
      <div className="px-6 py-5 border-b border-gray-200">
        <div className="text-xl font-semibold text-sky-700">Gestion Expedientes Medicos</div>
      </div>
      <nav className="p-4 space-y-2">
        {items.map((i) => (
          <Link
            key={i.href}
            href={i.href}
            className={`block rounded px-3 py-2 ${
              pathname === i.href ? "bg-sky-100 text-sky-800" : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            {i.label}
          </Link>
        ))}
        <Link href="/logout" className="block rounded px-3 py-2 text-gray-700 hover:bg-gray-100">
          Salir
        </Link>
      </nav>
    </aside>
  );
}
