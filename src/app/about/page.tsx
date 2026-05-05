import { Background } from "@/components/background";
import { AboutHero } from "@/components/blocks/about-hero";

export default function AboutPage() {
  return (
    <Background>
      <div className="py-28 pb-32 lg:py-32 lg:pt-44">
        <AboutHero />
      </div>
    </Background>
  );
}
