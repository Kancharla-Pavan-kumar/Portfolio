import Link from "next/link";

import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export function Footer() {
  const navigation = [
    { name: "Skills", href: "/#feature-modern-teams" },
    { name: "About", href: "/about" },
    { name: "Experience", href: "/experience" },
    { name: "FAQ", href: "/faq" },
    { name: "Contact", href: "/contact" },
  ];

  const social = [
    { name: "GitHub", href: "https://github.com/Kancharla-Pavan-kumar" },
    { name: "LinkedIn", href: "#" },
  ];

  const legal = [{ name: "Privacy Policy", href: "/privacy" }];

  return (
    <footer className="flex flex-col items-center gap-14 pt-28 lg:pt-32">
      <div className="container space-y-3 text-center">
        <h2 className="text-2xl tracking-tight md:text-4xl lg:text-5xl">
          Let's build something together
        </h2>
        <p className="text-muted-foreground mx-auto max-w-xl leading-snug text-balance">
          I'm always open to new opportunities, collaborations, and interesting
          projects. Let's connect.
        </p>
        <div>
          <Button size="lg" className="mt-4" asChild>
            <a href="/contact">
              Contact Me
            </a>
          </Button>
        </div>
      </div>

      <nav className="container flex flex-col items-center gap-4">
        <ul className="flex flex-wrap items-center justify-center gap-6">
          {navigation.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className="font-medium transition-opacity hover:opacity-75"
              >
                {item.name}
              </Link>
            </li>
          ))}
          {social.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className="flex items-center gap-0.5 font-medium transition-opacity hover:opacity-75"
              >
                {item.name} <ArrowUpRight className="size-4" />
              </Link>
            </li>
          ))}
        </ul>
        <ul className="flex flex-wrap items-center justify-center gap-6">
          {legal.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className="text-muted-foreground text-sm transition-opacity hover:opacity-75"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
        <p>Copyright © Project Immortal. All rights reserved.</p>
      </nav>

      <div className="text-primary mt-10 w-full overflow-hidden md:mt-14 lg:mt-20">
        <svg
          viewBox="0 0 1570 280"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
        >
          <defs>
            <linearGradient
              id="footerTextGradient"
              x1="785"
              y1="0"
              x2="785"
              y2="280"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="currentColor" />
              <stop offset="1" stopColor="#F8F8F8" stopOpacity="0.41" />
            </linearGradient>
          </defs>
          <text
            x="50%"
            y="0"
            dominantBaseline="hanging"
            textAnchor="middle"
            fill="url(#footerTextGradient)"
            fontSize="380"
            fontWeight="700"
            fontFamily="Inter, system-ui, sans-serif"
            letterSpacing="-0.04em"
          >
            portfolio
          </text>
        </svg>
      </div>
    </footer>
  );
}
