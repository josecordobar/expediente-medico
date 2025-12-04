"use client";
import { usePathname } from "next/navigation";
import AuthGuard from "@/components/AuthGuard";
import Sidebar from "@/components/Sidebar";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const showSidebar = pathname !== "/login";
  return (
    <AuthGuard>
      {showSidebar && <Sidebar />}
      <main className={showSidebar ? "ml-64" : "ml-0"}>{children}</main>
    </AuthGuard>
  );
}
