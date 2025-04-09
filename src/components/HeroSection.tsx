
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Play } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

const HeroSection = () => {
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <div className="relative bg-gradient-to-br from-lsu-purple to-purple-900 text-white">
      <div className="absolute inset-0 bg-[url('/hero-pattern.svg')] opacity-10"></div>
      <div className="container py-20 lg:py-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-xl animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Master AI Skills with <span className="text-lsu-gold">LSU</span>
            </h1>
            
            <p className="text-lg md:text-xl mb-8 text-white/90">
              Get certified in cutting-edge AI topics with video lessons, quizzes, and expert-led content. 
              Enhance your skills and prepare for the future of technology.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/modules">
                <Button size="lg" className="bg-lsu-gold text-lsu-purple hover:bg-lsu-gold/90 font-medium text-base px-6">
                  Explore Modules
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-white border-white hover:bg-white/10 font-medium text-base px-6"
                onClick={() => setVideoOpen(true)}
              >
                <Play className="mr-2 h-4 w-4" /> Watch Introduction
              </Button>
            </div>
          </div>
          
          <div className="hidden lg:block">
            <img 
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
              alt="AI Learning" 
              className="rounded-lg shadow-2xl animate-fade-in object-cover h-[400px] w-full"
            />
          </div>
        </div>
      </div>

      <Dialog open={videoOpen} onOpenChange={setVideoOpen}>
        <DialogContent className="max-w-4xl p-0 bg-transparent border-none">
          <DialogTitle className="sr-only">Introduction Video</DialogTitle>
          <div className="aspect-video w-full">
            <iframe 
              width="100%" 
              height="100%" 
              src="https://www.youtube.com/embed/AIWMq0B7_dQ?autoplay=1" 
              title="Introduction to LSU AI Spark" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
              className="rounded-lg"
            ></iframe>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HeroSection;
