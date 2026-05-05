"use client";

import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Education",
    monthlyPrice: "",
    yearlyPrice: "",
    description: "B.Tech in Computer Science",
    features: [
      "Computer Science & Engineering",
      "Data Structures & Algorithms",
      "Object-Oriented Programming",
      "Database Management Systems",
    ],
  },
  {
    name: "Technical Skills",
    monthlyPrice: "",
    yearlyPrice: "",
    features: [
      "Java, JavaScript, TypeScript",
      "Spring Boot, React, Next.js",
      "PostgreSQL, Firebase, MongoDB",
      "Git, Docker, REST APIs",
      "Tailwind CSS, shadcn/ui",
      "Problem Solving & DSA",
    ],
  },
  {
    name: "Interests",
    monthlyPrice: "",
    yearlyPrice: "",
    features: [
      "Full Stack Development",
      "System Design",
      "Open Source Contributions",
      "Building Developer Tools",
      "Continuous Learning",
    ],
  },
];

export const Pricing = ({ className }: { className?: string }) => {

  return (
    <section className={cn("py-28 lg:py-32", className)}>
      <div className="container max-w-5xl">
        <div className="space-y-4 text-center">
          <h2 className="text-2xl tracking-tight md:text-4xl lg:text-5xl">
            Background & Skills
          </h2>
          <p className="text-muted-foreground mx-auto max-w-xl leading-snug text-balance">
            A snapshot of my academic background, technical expertise, and the
            areas I am most passionate about.
          </p>
        </div>

        <div className="mt-8 grid items-start gap-5 text-start md:mt-12 md:grid-cols-3 lg:mt-20">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`${
                plan.name === "Startup"
                  ? "outline-primary origin-top outline-4"
                  : ""
              }`}
            >
              <CardContent className="flex flex-col gap-7 px-6 py-5">
                <div className="space-y-2">
                  <h3 className="text-foreground font-semibold">{plan.name}</h3>
                  <div className="space-y-1">
                    <div className="text-muted-foreground text-lg font-medium">
                      {plan.description || ""}
                    </div>
                  </div>
                </div>

                {plan.description ? (
                  <span className="text-muted-foreground text-sm">
                    {plan.description}
                  </span>
                ) : null}

                <div className="space-y-3">
                  {plan.features.map((feature) => (
                    <div
                      key={feature}
                      className="text-muted-foreground flex items-center gap-1.5"
                    >
                      <Check className="size-5 shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button
                  className="w-fit"
                  variant={plan.name === "Technical Skills" ? "default" : "outline"}
                >
                  Learn More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
