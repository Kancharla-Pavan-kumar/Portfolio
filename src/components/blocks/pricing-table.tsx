import { GraduationCap } from "lucide-react";

const experiences = [
  {
    period: "2023 — 2027",
    title: "B.Tech in Computer Science & Engineering",
    institution: "Sai Tirumala NVR Engineering College",
    description:
      "Pursuing a Bachelor's degree in Computer Science & Engineering with a focus on full stack development, data structures, algorithms, and system design.",
    highlights: [
      "Data Structures & Algorithms",
      "Object-Oriented Programming",
      "Database Management Systems",
      "Computer Networks",
      "Operating Systems",
    ],
  },
  {
    period: "2021 — 2022",
    title: "Intermediate (MPC)",
    institution: "Board of Intermediate Education",
    description:
      "Completed Intermediate education with Mathematics, Physics, and Chemistry. Built a strong analytical and problem-solving foundation.",
    highlights: ["Mathematics", "Physics", "Chemistry"],
  },
  {
    period: "2019 — 2020",
    title: "Secondary School Certificate (SSC)",
    institution: "Board of Secondary Education",
    description:
      "Completed secondary education with a well-rounded academic foundation across all core subjects.",
    highlights: ["Mathematics", "Science", "English"],
  },
];

export const ExperienceTimeline = () => {
  return (
    <section className="pb-28 lg:py-32">
      <div className="container max-w-3xl">
        <div className="space-y-8">
          {experiences.map((exp, i) => (
            <div key={i} className="relative flex gap-6">
              {/* Left: icon + line */}
              <div className="flex flex-col items-center">
                <div className="bg-background border-foreground/20 flex size-10 shrink-0 items-center justify-center rounded-full border-2">
                  <GraduationCap className="text-foreground size-5" />
                </div>
                {i < experiences.length - 1 && (
                  <div className="bg-border mt-2 w-px flex-1" />
                )}
              </div>

              {/* Right: content */}
              <div className="pb-8">
                <span className="text-muted-foreground mb-1 block font-mono text-xs tracking-wider uppercase">
                  {exp.period}
                </span>
                <h3 className="text-foreground text-xl font-semibold leading-snug">
                  {exp.title}
                </h3>
                <p className="text-muted-foreground mt-0.5 text-sm font-medium">
                  {exp.institution}
                </p>
                <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
                  {exp.description}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {exp.highlights.map((item) => (
                    <span
                      key={item}
                      className="bg-muted text-muted-foreground rounded-full px-2.5 py-0.5 text-xs font-medium"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
