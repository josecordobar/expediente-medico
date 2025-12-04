"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const check = async () => {
      const { data } = await supabase.auth.getSession();
      const isLogin = pathname === "/login";
      if (!data.session && !isLogin) {
        router.replace("/login");
        setReady(true);
        return;
      }
      if (data.session && isLogin) {
        router.replace("/pacientes");
        setReady(true);
        return;
      }
      setReady(true);
    };
    check();
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      const isLogin = pathname === "/login";
      if (!session && !isLogin) router.replace("/login");
      if (session && isLogin) router.replace("/pacientes");
    });
    return () => {
      sub.subscription.unsubscribe();
    };
  }, [router, pathname]);

  if (!ready) return <div className="flex h-screen items-center justify-center">Cargando…</div>;
  return <>{children}</>;
}
