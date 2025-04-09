
import HeroSection from "@/components/HeroSection";
import FeatureSection from "@/components/FeatureSection";
import FeaturedModules from "@/components/FeaturedModules";
import TestimonialsSection from "@/components/TestimonialsSection";
import CallToAction from "@/components/CallToAction";

const HomePage = () => {
  return (
    <div className="overflow-hidden">
      <HeroSection />
      <FeatureSection />
      <FeaturedModules />
      <TestimonialsSection />
      <CallToAction />
    </div>
  );
};

export default HomePage;
