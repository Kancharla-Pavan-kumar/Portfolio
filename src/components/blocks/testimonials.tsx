import Image from "next/image";

import { ArrowRight } from "lucide-react";

import { DashedLine } from "../dashed-line";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

const items = [
  {
    quote: "Writing clean, readable code is not optional — it's the standard.",
    author: "Clean Code",
    role: "Principle",
    company: "Software Craftsmanship",
    image: "/testimonials/clean-code.png",
  },
  {
    quote: "Every problem is a puzzle — DSA taught me how to think, not just code.",
    author: "Algorithmic Thinking",
    role: "Foundation",
    company: "Computer Science",
    image: "/testimonials/algorithmic-thinking.png",
  },
  {
    quote: "Ship fast, iterate faster. Good enough today beats perfect never.",
    author: "Shipping Mindset",
    role: "Philosophy",
    company: "Product Engineering",
    image: "/testimonials/shipping-mindset.png",
  },
  {
    quote: "The best architectures emerge from teams that communicate well.",
    author: "Collaboration",
    role: "Core Value",
    company: "Team Development",
    image: "/testimonials/collaboration.png",
  },
  {
    quote: "Writing clean, readable code is not optional — it's the standard.",
    author: "Clean Code",
    role: "Principle",
    company: "Software Craftsmanship",
    image: "/testimonials/clean-code.png",
  },
  {
    quote: "Every problem is a puzzle — DSA taught me how to think, not just code.",
    author: "Algorithmic Thinking",
    role: "Foundation",
    company: "Computer Science",
    image: "/testimonials/algorithmic-thinking.png",
  },
  {
    quote: "Ship fast, iterate faster. Good enough today beats perfect never.",
    author: "Shipping Mindset",
    role: "Philosophy",
    company: "Product Engineering",
    image: "/testimonials/shipping-mindset.png",
  },
  {
    quote: "The best architectures emerge from teams that communicate well.",
    author: "Collaboration",
    role: "Core Value",
    company: "Team Development",
    image: "/testimonials/collaboration.png",
  },
];

export const Testimonials = ({
  className,
  dashedLineClassName,
}: {
  className?: string;
  dashedLineClassName?: string;
}) => {
  return (
    <>
      <section className={cn("overflow-hidden py-28 lg:py-32", className)}>
        <div className="container">
          <div className="space-y-4">
            <h2 className="text-2xl tracking-tight md:text-4xl lg:text-5xl">
              What I value as a developer
            </h2>
            <p className="text-muted-foreground max-w-md leading-snug">
              These principles guide how I approach every project — from
              writing my first line of code to deploying the final build.
            </p>
            <Button variant="outline" className="shadow-md" asChild>
              <a href="https://github.com/Kancharla-Pavan-kumar" target="_blank">
                View My GitHub <ArrowRight className="size-4" />
              </a>
            </Button>
          </div>

          <div className="relative mt-8 -mr-[max(3rem,calc((100vw-80rem)/2+3rem))] md:mt-12 lg:mt-20">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="">
                {items.map((testimonial, index) => (
                  <CarouselItem
                    key={index}
                    className="xl:basis-1/3.5 grow basis-4/5 sm:basis-3/5 md:basis-2/5 lg:basis-[28%] 2xl:basis-[24%]"
                  >
                    <Card className="bg-muted h-full overflow-hidden border-none">
                      <CardContent className="flex h-full flex-col p-0">
                        <div className="relative h-[288px] lg:h-[328px]">
                          <Image
                            src={testimonial.image}
                            alt={testimonial.author}
                            fill
                            className="object-cover object-top"
                          />
                        </div>
                        <div className="flex flex-1 flex-col justify-between gap-10 p-6">
                          <blockquote className="font-display text-lg leading-none! font-medium md:text-xl lg:text-2xl">
                            {testimonial.quote}
                          </blockquote>
                          <div className="space-y-0.5">
                            <div className="text-primary font-semibold">
                              {testimonial.author}, {testimonial.role}
                            </div>
                            <div className="text-muted-foreground text-sm">
                              {testimonial.company}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="mt-8 flex gap-3">
                <CarouselPrevious className="bg-muted hover:bg-muted/80 static size-14.5 translate-x-0 translate-y-0 transition-colors [&>svg]:size-6 lg:[&>svg]:size-8" />
                <CarouselNext className="bg-muted hover:bg-muted/80 static size-14.5 translate-x-0 translate-y-0 transition-colors [&>svg]:size-6 lg:[&>svg]:size-8" />
              </div>
            </Carousel>
          </div>
        </div>
      </section>
      <DashedLine
        orientation="horizontal"
        className={cn("mx-auto max-w-[80%]", dashedLineClassName)}
      />
    </>
  );
};
