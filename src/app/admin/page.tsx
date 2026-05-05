"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, query, orderBy, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { Trash2, CheckCircle2, Copy, Check, Inbox, Zap, Activity, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import { auth, db } from "@/lib/firebase";

interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createdAt: any;
  read?: boolean;
}

const ALLOWED_ADMINS = [
  "pavankancharla7816@gmail.com",
  "rishichowdary2099@gmail.com",
];

export default function AdminDashboard() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [messageToDelete, setMessageToDelete] = useState<Message | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push("/login");
      } else if (
        !user.email ||
        !ALLOWED_ADMINS.includes(user.email.toLowerCase())
      ) {
        await signOut(auth);
        router.push("/login");
      } else {
        fetchMessages();
      }
    });

    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    if (messageToDelete) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [messageToDelete]);

  const fetchMessages = async () => {
    try {
      const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const msgs: Message[] = [];
      querySnapshot.forEach((doc) => {
        msgs.push({ id: doc.id, ...doc.data() } as Message);
      });
      setMessages(msgs);
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const confirmDelete = async () => {
    if (!messageToDelete) return;
    
    setIsDeleting(true);
    try {
      await deleteDoc(doc(db, "messages", messageToDelete.id));
      setMessages((prev) => prev.filter((msg) => msg.id !== messageToDelete.id));
      setMessageToDelete(null);
    } catch (error) {
      console.error("Error deleting message:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleToggleRead = async (id: string, currentReadStatus: boolean) => {
    try {
      await updateDoc(doc(db, "messages", id), { read: !currentReadStatus });
      setMessages((prev) =>
        prev.map((msg) => (msg.id === id ? { ...msg, read: !currentReadStatus } : msg))
      );
    } catch (error) {
      console.error("Error updating message:", error);
    }
  };

  const handleCopyEmail = (e: React.MouseEvent, email: string) => {
    e.preventDefault();
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => setCopiedEmail(null), 2000);
  };

  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-foreground border-t-transparent" />
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Loading</p>
        </div>
      </div>
    );
  }

  const unreadCount = messages.filter((m) => !m.read).length;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Inquiries</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage incoming messages from your portfolio.</p>
      </div>

      {/* Stat Row */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="flex flex-col justify-between rounded-xl border border-border/40 bg-card p-5 shadow-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Inbox className="h-4 w-4" />
            <h3 className="text-xs font-medium uppercase tracking-wider">Total Enquiries</h3>
          </div>
          <p className="mt-3 text-3xl font-semibold tracking-tighter text-foreground">
            {messages.length}
          </p>
        </div>

        <div className="flex flex-col justify-between rounded-xl border border-border/40 bg-card p-5 shadow-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Zap className={`h-4 w-4 ${unreadCount > 0 ? "text-blue-500" : ""}`} />
            <h3 className="text-xs font-medium uppercase tracking-wider">Unread</h3>
          </div>
          <p className={`mt-3 text-3xl font-semibold tracking-tighter ${unreadCount > 0 ? "text-blue-600 dark:text-blue-400" : "text-foreground"}`}>
            {unreadCount}
          </p>
        </div>

        <div className="flex flex-col justify-between rounded-xl border border-border/40 bg-card p-5 shadow-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Activity className="h-4 w-4 text-emerald-500" />
            <h3 className="text-xs font-medium uppercase tracking-wider">System Status</h3>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <div className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </div>
            <p className="text-lg font-medium tracking-tight text-foreground">99.9% Uptime</p>
          </div>
        </div>
      </div>

      {/* List Feed */}
      <div className="flex flex-col overflow-hidden rounded-xl border border-border/40 bg-card shadow-sm">
        {messages.length === 0 ? (
          <div className="flex h-40 items-center justify-center text-sm text-muted-foreground">
            No inquiries to display.
          </div>
        ) : (
          <div className="divide-y divide-border/40">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`group flex flex-col gap-4 p-5 sm:flex-row sm:items-start sm:gap-8 transition-all duration-300 border-l-[3px] border-transparent hover:border-primary/50 hover:bg-muted/10 hover:shadow-[inset_0_0_20px_rgba(0,0,0,0.02)] dark:hover:shadow-[inset_0_0_20px_rgba(255,255,255,0.02)] ${msg.read ? "bg-muted/10 opacity-75" : ""}`}
              >
                {/* Left Column: Metadata */}
                <div className="flex w-full shrink-0 flex-col sm:w-56 lg:w-64">
                  <div className="flex items-center justify-between sm:items-start sm:flex-col">
                    <span className="text-base font-semibold tracking-tight text-foreground">
                      {msg.name}
                    </span>
                    {msg.createdAt && (
                      <span className="text-[11px] font-medium tracking-wider text-muted-foreground uppercase mt-1 sm:hidden">
                        {msg.createdAt.toDate
                          ? msg.createdAt.toDate().toLocaleString(undefined, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
                          : "Just now"}
                      </span>
                    )}
                  </div>
                  
                  <button 
                    onClick={(e) => handleCopyEmail(e, msg.email)}
                    className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors w-fit text-left"
                    title="Copy email address"
                  >
                    <span className="truncate max-w-[200px]">{msg.email}</span>
                    {copiedEmail === msg.email ? (
                      <Check className="h-3 w-3 text-emerald-500" />
                    ) : (
                      <Copy className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </button>

                  {msg.createdAt && (
                    <span className="hidden sm:block text-[11px] font-medium tracking-wider text-muted-foreground uppercase mt-4">
                      {msg.createdAt.toDate
                        ? msg.createdAt.toDate().toLocaleString(undefined, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
                        : "Just now"}
                    </span>
                  )}
                </div>

                {/* Middle Column: Message */}
                <div className="flex-1">
                  <div className="rounded-lg bg-muted/40 p-4 text-sm leading-relaxed text-foreground/90 whitespace-pre-wrap">
                    {msg.message}
                  </div>
                </div>

                {/* Right Column: Actions */}
                <div className="flex items-center gap-1 sm:flex-col sm:pt-1">
                  <button
                    onClick={() => handleToggleRead(msg.id, !!msg.read)}
                    className={`flex h-8 w-8 items-center justify-center rounded-md transition-colors ${msg.read ? "text-blue-500 hover:bg-blue-500/10" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}
                    title={msg.read ? "Mark as unread" : "Mark as read"}
                  >
                    <CheckCircle2 className="h-4.5 w-4.5" />
                  </button>
                  <button
                    onClick={() => setMessageToDelete(msg)}
                    className="group/delete flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-all duration-300 hover:bg-red-500/10 hover:text-red-500 hover:shadow-[0_0_15px_rgba(239,68,68,0.3)]"
                    title="Delete inquiry"
                  >
                    <Trash2 className="h-4 w-4 transition-transform group-hover/delete:scale-110" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {messageToDelete && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[100] bg-background/60 backdrop-blur-[8px]"
              onClick={() => setMessageToDelete(null)}
            />
            
            <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.85, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ type: "spring", bounce: 0.4, duration: 0.6 }}
                className="w-full max-w-[380px] overflow-hidden rounded-3xl border border-border/40 bg-card p-8 shadow-2xl ring-1 ring-black/5 pointer-events-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex flex-col items-center text-center gap-6">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10 ring-8 ring-red-500/5">
                    <AlertTriangle className="h-8 w-8 text-red-600" />
                  </div>

                  <div className="space-y-2">
                    <h2 className="text-2xl font-extrabold tracking-tight text-foreground">
                      Delete message?
                    </h2>
                    <p className="text-sm font-normal text-muted-foreground leading-relaxed px-2">
                      You are about to delete the inquiry from <strong className="font-semibold text-foreground">{messageToDelete.name}</strong>. This action cannot be undone.
                    </p>
                  </div>

                  <div className="mt-2 flex w-full flex-col gap-3">
                    <button
                      type="button"
                      onClick={confirmDelete}
                      disabled={isDeleting}
                      className="w-full rounded-xl bg-red-600 py-3 text-sm font-bold text-white shadow-[0_4px_14px_rgba(220,38,38,0.39)] transition-all hover:-translate-y-0.5 hover:bg-red-700 hover:shadow-[0_6px_20px_rgba(220,38,38,0.23)] active:translate-y-0"
                    >
                      {isDeleting ? "Deleting..." : "Yes, delete"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setMessageToDelete(null)}
                      disabled={isDeleting}
                      className="w-full rounded-xl bg-transparent py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground"
                    >
                      Cancel
                    </button>
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
