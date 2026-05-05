"use client";

import { useState, useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { CheckCircle2, XCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { db } from "@/lib/firebase";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(1, "Message is required"),
});

type Schema = z.infer<typeof formSchema>;

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    title: string;
    message: string;
  } | null>(null);

  const form = useForm<Schema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleSubmit = form.handleSubmit(async (data: Schema) => {
    setIsSubmitting(true);
    setNotification(null);
    console.log("Form data submitted:", data);

    try {
      const docRef = await addDoc(collection(db, "messages"), {
        name: data.name,
        email: data.email,
        message: data.message,
        createdAt: serverTimestamp(),
      });

      console.log("Firebase response - Document written with ID: ", docRef.id);
      
      setNotification({
        type: "success",
        title: "Message sent successfully",
        message: "Thanks, I'll get back to you soon.",
      });
      
      form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      
      setNotification({
        type: "error",
        title: "Failed to send message",
        message: "Something went wrong. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  });

  return (
    <div className="relative w-full">
      <Form {...form}>
        <form
          onSubmit={handleSubmit}
          className="flex w-full flex-col gap-2 space-y-4 rounded-md relative"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Full name *</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="First and last name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Email address *</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="me@company.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your message *</FormLabel>
                <FormControl>
                  <Textarea placeholder="Write your message" className="resize-none" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <AnimatePresence>
            {notification && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className={`mt-4 flex items-start gap-3 rounded-lg p-4 shadow-sm border ${
                  notification.type === "success"
                    ? "border-emerald-200/50 bg-emerald-50/50 dark:border-emerald-900/30 dark:bg-emerald-900/10"
                    : "border-red-200/50 bg-red-50/50 dark:border-red-900/30 dark:bg-red-900/10"
                }`}
              >
                {notification.type === "success" ? (
                  <CheckCircle2 className="mt-0.5 size-5 text-emerald-600 dark:text-emerald-400" />
                ) : (
                  <XCircle className="mt-0.5 size-5 text-red-600 dark:text-red-400" />
                )}
                <div className="flex flex-col">
                  <h4
                    className={`text-sm font-semibold ${
                      notification.type === "success"
                        ? "text-emerald-800 dark:text-emerald-300"
                        : "text-red-800 dark:text-red-300"
                    }`}
                  >
                    {notification.title}
                  </h4>
                  <p
                    className={`text-sm mt-0.5 ${
                      notification.type === "success"
                        ? "text-emerald-700/80 dark:text-emerald-400/80"
                        : "text-red-700/80 dark:text-red-400/80"
                    }`}
                  >
                    {notification.message}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex w-full items-center justify-end pt-3">
            <Button type="submit" disabled={isSubmitting} className="rounded-lg" size="sm">
              {isSubmitting ? "Sending..." : "Submit"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
