"use client";
import Image from "next/image";

import {
  ArrowRight,
  Blend,
  ChartNoAxesColumn,
  CircleDot,
  Diamond,
} from "lucide-react";

import { DashedLine } from "@/components/dashed-line";
import { Button } from "@/components/ui/button";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";

const features = [
  {
    title: "Problem Solving & DSA",
    description: "Strong foundation in data structures, algorithms, and competitive thinking.",
    icon: CircleDot,
  },
  {
    title: "Team Collaboration",
    description: "Effective communication and cross-functional teamwork on real-world projects.",
    icon: Blend,
  },
  {
    title: "Project Development",
    description: "End-to-end ownership from ideation to deployment.",
    icon: Diamond,
  },
  {
    title: "Continuous Learning",
    description: "Consistently expanding skills across modern frameworks and tools.",
    icon: ChartNoAxesColumn,
  },
];

export const Hero = () => {
  return (
    <section className="py-28 lg:py-32 lg:pt-44">
      <div className="container flex flex-col justify-between gap-8 md:gap-14 lg:flex-row lg:gap-20">
        {/* Left side - Main content */}
        <div className="flex-1">
          <h1 className="text-foreground max-w-160 text-3xl tracking-tight md:text-4xl lg:text-5xl xl:whitespace-nowrap">
            K.Y. Pavan Kumar
          </h1>

          <p className="text-muted-foreground text-1xl mt-5 md:text-3xl">
            Full Stack Developer building clean, scalable software with Java,
            Spring Boot, React & modern web technologies.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4 lg:flex-nowrap">
            <Button asChild>
              <a href="#resource-allocation">
                View Projects
              </a>
            </Button>
            <Button
              variant="outline"
              className="from-background h-auto gap-2 bg-linear-to-r to-transparent shadow-md"
              asChild
            >
              <a
                href="/contact"
                target="_self"
                className="max-w-56 truncate text-start md:max-w-none"
              >
                Contact Me
                <ArrowRight className="stroke-3" />
              </a>
            </Button>
          </div>
        </div>

        {/* Right side - Features */}
        <div className="relative flex flex-1 flex-col justify-center space-y-5 max-lg:pt-10 lg:pl-10">
          <DashedLine
            orientation="vertical"
            className="absolute top-0 left-0 max-lg:hidden"
          />
          <DashedLine
            orientation="horizontal"
            className="absolute top-0 lg:hidden"
          />
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="flex gap-2.5 lg:gap-5">
                <Icon className="text-foreground mt-1 size-4 shrink-0 lg:size-5" />
                <div>
                  <h2 className="font-text text-foreground font-semibold">
                    {feature.title}
                  </h2>
                  <p className="text-muted-foreground max-w-76 text-sm">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <ContainerScroll
        titleComponent={
          <h2 className="text-2xl font-semibold text-foreground md:text-4xl">
            A Glimpse Into
            <br />
            <span className="text-4xl font-bold mt-1 leading-none md:text-[6rem]">
              My Work
            </span>
          </h2>
        }
      >
        <Image
          src="/hero.webp"
          alt="hero"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl object-cover h-full object-left-top"
          draggable={false}
        />
      </ContainerScroll>
    </section>
  );
};
