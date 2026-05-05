"use client";

import { useState, useEffect } from "react";

import { useRouter } from "next/navigation";

import { signOut } from "firebase/auth";
import { LogOut, Inbox } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import { Button } from "@/components/ui/button";
import { auth } from "@/lib/firebase";


export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsLogoutOpen(false);
    };
    if (isLogoutOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLogoutOpen]);

  // Disable background scroll when modal is open
  useEffect(() => {
    if (isLogoutOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isLogoutOpen]);

  const confirmLogout = async () => {
    setIsLoggingOut(true);
    try {
      await signOut(auth);
      router.push("/login");
    } catch (error) {
      console.error("Error signing out:", error);
      setIsLoggingOut(false);
      setIsLogoutOpen(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-background font-sans antialiased">
      {/* Slim Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-50 flex w-16 flex-col items-center border-r border-border/40 bg-card py-6 shadow-sm sm:w-20">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-foreground text-background font-bold tracking-tighter shadow-sm">
          A.
        </div>
        
        <nav className="mt-8 flex w-full flex-col items-center gap-4">
          <div className="relative flex h-12 w-full items-center justify-center text-foreground">
            <div className="absolute left-0 h-full w-1 rounded-r-full bg-foreground" />
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted/60">
              <Inbox className="h-5 w-5" />
            </div>
          </div>
        </nav>

        <div className="mt-auto flex w-full flex-col items-center">
          <button 
            onClick={() => setIsLogoutOpen(true)}
            className="group relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-border/50 bg-muted/40 transition-all duration-300 hover:border-red-500/50 hover:bg-red-500 hover:shadow-[0_0_15px_rgba(239,68,68,0.4)]"
            title="Logout"
          >
            <span className="text-xs font-bold text-foreground transition-all duration-200 group-hover:scale-75 group-hover:opacity-0">PK</span>
            <LogOut className="absolute h-4 w-4 text-white opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100 scale-50" />
          </button>
        </div>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 pl-16 sm:pl-20">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-8 lg:px-12">
          {children}
        </div>
      </main>

      {/* Logout Confirmation Modal */}
      <AnimatePresence>
        {isLogoutOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[100] bg-background/60 backdrop-blur-[8px]"
              onClick={() => setIsLogoutOpen(false)}
            />
            
            {/* Modal Container */}
            <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="w-full max-w-[400px] overflow-hidden rounded-2xl border border-border/50 bg-background p-6 shadow-2xl ring-1 ring-black/5 pointer-events-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex flex-col gap-6 pt-2">
                  <div className="space-y-3">
                    <h2 className="text-xl font-medium tracking-tight text-foreground flex items-center gap-2">
                      <LogOut className="h-5 w-5 text-muted-foreground" />
                      Sign out?
                    </h2>
                    <p className="text-sm text-muted-foreground/90 leading-relaxed">
                      You're about to log out of your admin dashboard. You will need to sign back in to view your inquiries.
                    </p>
                  </div>

                  <div className="flex w-full items-center gap-3 pt-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsLogoutOpen(false)}
                      disabled={isLoggingOut}
                      className="flex-1 font-medium bg-transparent shadow-none"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="button"
                      variant="default"
                      onClick={confirmLogout}
                      disabled={isLoggingOut}
                      className="flex-1 font-medium shadow-none"
                    >
                      {isLoggingOut ? "Signing out..." : "Yes, sign out"}
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
