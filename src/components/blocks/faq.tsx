import Link from "next/link";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

const categories = [
  {
    title: "Working with me",
    questions: [
      {
        question: "What technologies do you specialize in?",
        answer:
          "I primarily work with Java, Spring Boot, React, Next.js, and PostgreSQL. I'm comfortable across the full stack and enjoy learning new tools as needed.",
      },
      {
        question: "Are you open to freelance or contract work?",
        answer:
          "Yes, I'm open to freelance, contract, and full-time opportunities. Feel free to reach out via the contact page to discuss your project.",
      },
      {
        question: "How do you approach a new project?",
        answer:
          "I start by understanding the problem space, then plan the architecture and tech stack before writing any code. I value clean, maintainable solutions over quick hacks.",
      },
    ],
  },
  {
    title: "Experience & background",
    questions: [
      {
        question: "What is your educational background?",
        answer:
          "I hold a B.Tech in Computer Science and Engineering. My coursework covered data structures, algorithms, databases, and software engineering principles.",
      },
      {
        question: "Do you have industry experience?",
        answer:
          "Yes, I have hands-on experience building full-stack applications, REST APIs, and deploying production-grade projects with modern DevOps practices.",
      },
    ],
  },
  {
    title: "Other questions",
    questions: [
      {
        question: "Can I see your code or GitHub profile?",
        answer:
          "Absolutely. You can find my open-source work and project repositories on my GitHub. Links are available in the footer of this site.",
      },
      {
        question: "How can I get in touch?",
        answer:
          "The easiest way is through the contact page on this site, or you can connect with me on LinkedIn. I typically respond within 24 hours.",
      },
    ],
  },
];

export const FAQ = ({
  headerTag = "h2",
  className,
  className2,
}: {
  headerTag?: "h1" | "h2";
  className?: string;
  className2?: string;
}) => {
  return (
    <section className={cn("py-28 lg:py-32", className)}>
      <div className="container max-w-5xl">
        <div className={cn("mx-auto grid gap-16 lg:grid-cols-2", className2)}>
          <div className="space-y-4">
            {headerTag === "h1" ? (
              <h1 className="text-2xl tracking-tight md:text-4xl lg:text-5xl">
                Got Questions?
              </h1>
            ) : (
              <h2 className="text-2xl tracking-tight md:text-4xl lg:text-5xl">
                Got Questions?
              </h2>
            )}
            <p className="text-muted-foreground max-w-md leading-snug lg:mx-auto">
              If you can't find what you're looking for,{" "}
              <Link href="/contact" className="underline underline-offset-4">
                get in touch
              </Link>
              .
            </p>
          </div>

          <div className="grid gap-6 text-start">
            {categories.map((category, categoryIndex) => (
              <div key={category.title} className="">
                <h3 className="text-muted-foreground border-b py-4">
                  {category.title}
                </h3>
                <Accordion type="single" collapsible className="w-full">
                  {category.questions.map((item, i) => (
                    <AccordionItem key={i} value={`${categoryIndex}-${i}`}>
                      <AccordionTrigger>{item.question}</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
