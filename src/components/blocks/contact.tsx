import React from "react";

import Link from "next/link";

import { Linkedin, Github } from "lucide-react";

import { ContactForm } from "@/components/blocks/contact-form";
import { DashedLine } from "@/components/dashed-line";

const contactInfo = [
  {
    title: "Location",
    content: (
      <div className="text-muted-foreground mt-3 space-y-1 whitespace-nowrap">
        <p>Andhra Pradesh, India</p>
        <p>Phone: +91 93818 53854</p>
      </div>
    ),
  },
  {
    title: "Email",
    content: (
      <div className="mt-3">
        <Link
          href="mailto:kancharlapavankumar@gmail.com"
          className="text-muted-foreground hover:text-foreground"
        >
          kancharlapavankumar@gmail.com
        </Link>
      </div>
    ),
  },
  {
    title: "Connect",
    content: (
      <div className="mt-3 flex gap-6 lg:gap-10">
        <Link
          href="https://linkedin.com"
          target="_blank"
          className="text-muted-foreground hover:text-foreground"
        >
          <Linkedin className="size-5" />
        </Link>
        <Link
          href="https://github.com/Kancharla-Pavan-kumar"
          target="_blank"
          className="text-muted-foreground hover:text-foreground"
        >
          <Github className="size-5" />
        </Link>
        <Link
          href="https://leetcode.com/u/pavankancharla7816-stack/"
          target="_blank"
          className="text-muted-foreground hover:text-foreground"
        >
          <svg
            role="img"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-5"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.939 5.939 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.002-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.665 2.665 0 0 1 .614-1.164L11.3 9.458v-.001L15.69 4.88c.552-.562.55-1.46-.002-2.012A1.378 1.378 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
          </svg>
        </Link>
      </div>
    ),
  },
];

export default function Contact() {
  return (
    <section className="py-28 lg:py-32 lg:pt-44">
      <div className="container max-w-2xl">
        <h1 className="text-center text-2xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
          Contact Me
        </h1>
        <p className="text-muted-foreground mt-4 text-center leading-snug font-medium lg:mx-auto">
          Feel free to reach out for opportunities or collaborations.
        </p>

        <div className="mt-10 flex justify-between gap-8 max-sm:flex-col md:mt-14 lg:mt-20 lg:gap-12">
          {contactInfo.map((info, index) => (
            <div key={index}>
              <h2 className="font-medium">{info.title}</h2>
              {info.content}
            </div>
          ))}
        </div>

        <DashedLine className="my-12" />

        {/* Inquiry Form */}
        <div className="mx-auto">
          <h2 className="mb-4 text-lg font-semibold">Inquiries</h2>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
