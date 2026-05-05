import { Github, Linkedin } from "lucide-react";

import { DashedLine } from "@/components/dashed-line";

const stats = [
  {
    value: "Full Stack",
    label: "MERN Stack",
  },
  {
    value: "Backend",
    label: "APIs & Microservices",
  },
  {
    value: "DSA",
    label: "Data Structures & Algorithms",
  },
  {
    value: "Design",
    label: "Clean Code & Architecture",
  },
];

export function AboutHero() {
  return (
    <section className="">
      <div className="container flex max-w-5xl flex-col justify-between gap-8 md:gap-20 lg:flex-row lg:items-center lg:gap-24 xl:gap-24">
        <div className="flex-[1.5]">
          <h1 className="text-3xl tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
            About Me
          </h1>

          <p className="text-muted-foreground mt-5 text-2xl md:text-3xl lg:text-4xl">
            I am a full stack developer focused on building clean, scalable, and efficient web applications.
          </p>

          <p className="text-muted-foreground mt-8 hidden max-w-lg space-y-6 text-lg text-balance md:block lg:mt-12">
            I work primarily with MongoDB, Express.js, React, Node.js, and modern web technologies. I enjoy solving complex problems, writing maintainable code, and continuously improving my skills through real-world projects and consistent learning.
            <br />
            <br />
            I have a strong foundation in data structures and algorithms and aim to build systems that are not just functional, but reliable and well-structured. My focus is on long-term growth, clean architecture, and delivering real value through software.
          </p>
        </div>

        <div
          className="relative flex flex-1 flex-col justify-center pt-10 lg:pl-14 lg:pt-0"
        >
          <DashedLine
            orientation="vertical"
            className="absolute top-0 left-0 hidden opacity-60 lg:block"
          />
          <DashedLine
            orientation="horizontal"
            className="absolute top-0 opacity-60 lg:hidden"
          />
          
          <div className="flex flex-col gap-5">
            {/* Profile Header */}
            <div>
              <span className="text-muted-foreground mb-2 block font-mono text-[11px] font-medium tracking-[0.2em] uppercase">
                About the Developer
              </span>
              <h2 className="text-foreground text-2xl font-bold tracking-tight md:text-3xl">
                K.Y. Pavan Kumar
              </h2>
              <div className="mt-2 inline-flex items-center rounded-full border bg-muted/30 px-3 py-1 text-xs font-medium text-muted-foreground shadow-xs">
                Full Stack Developer
              </div>
            </div>

            <p className="text-muted-foreground text-sm leading-relaxed">
              I build full-stack systems that are clean, scalable, and production-ready, with a strong focus on backend architecture and efficient API design.
            </p>

            {/* Skills */}
            <div className="flex flex-col gap-3">
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col gap-0.5">
                  <div className="text-foreground font-medium tracking-wide">
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground text-[13px]">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="mt-1 flex gap-3">
              <a
                href="https://github.com/Kancharla-Pavan-kumar"
                target="_blank"
                rel="noreferrer"
                className="bg-foreground text-background hover:bg-foreground/90 inline-flex h-9 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors shadow-sm"
              >
                <Github className="mr-2 size-4" />
                GitHub
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="bg-muted text-foreground hover:bg-muted/80 inline-flex h-9 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors shadow-sm"
              >
                <Linkedin className="mr-2 size-4" />
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
