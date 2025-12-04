"use client";
import { useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  useEffect(() => {
    const run = async () => {
      await supabase.auth.signOut();
      router.replace("/login");
    };
    run();
  }, [router]);
  return <div className="flex h-screen items-center justify-center">Cerrando sesión…</div>;
}
