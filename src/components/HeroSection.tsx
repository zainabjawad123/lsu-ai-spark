
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="relative bg-gradient-to-br from-lsu-purple to-purple-900 text-white">
      <div className="absolute inset-0 bg-[url('/hero-pattern.svg')] opacity-10"></div>
      <div className="container py-20 lg:py-32 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Learn AI with LSU
          </h1>
          
          <p className="text-lg md:text-xl mb-8 text-white/90">
            Get certified in cutting-edge AI topics with video lessons, quizzes, and expert-led content. 
            Enhance your skills and prepare for the future of technology.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/modules">
              <Button size="lg" className="bg-lsu-gold text-lsu-purple hover:bg-lsu-gold/90 font-medium text-base px-6">
                Explore Modules
              </Button>
            </Link>
            <Link to="/signup">
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10 font-medium text-base px-6">
                Sign Up Free
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
