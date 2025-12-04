"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);
  const [shouldRedirect, setShouldRedirect] = useState<{ to: string } | null>(null);

  useEffect(() => {
    if (shouldRedirect) {
      router.replace(shouldRedirect.to);
      setShouldRedirect(null);
    }
  }, [shouldRedirect, router]);

  useEffect(() => {
    const check = async () => {
      const { data } = await supabase.auth.getSession();
      const isLogin = pathname === "/login";
      if (!data.session && !isLogin) {
        setShouldRedirect({ to: "/login" });
        return;
      }
      if (data.session && isLogin) {
        setShouldRedirect({ to: "/pacientes" });
        return;
      }
      setReady(true);
    };
    check();
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      const isLogin = pathname === "/login";
      if (!session && !isLogin) setShouldRedirect({ to: "/login" });
      if (session && isLogin) setShouldRedirect({ to: "/pacientes" });
    });
    return () => {
      sub.subscription.unsubscribe();
    };
  }, [router, pathname]);

  if (!ready) return <div className="flex h-screen items-center justify-center">Cargando…</div>;
  return <>{children}</>;
}
