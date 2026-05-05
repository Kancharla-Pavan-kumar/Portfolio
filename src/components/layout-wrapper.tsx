"use client";

import { usePathname } from "next/navigation";

import { Footer } from "@/components/blocks/footer";
import { Navbar } from "@/components/blocks/navbar";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminOrLogin = pathname?.startsWith("/admin") || pathname?.startsWith("/login");

  if (isAdminOrLogin) {
    return <main className="">{children}</main>;
  }

  return (
    <>
      <Navbar />
      <main className="">{children}</main>
      <Footer />
    </>
  );
}
