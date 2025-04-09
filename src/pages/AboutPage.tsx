
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { Play, CheckCircle2, Award, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const AboutPage = () => {
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <div>
      {/* Hero section */}
      <div className="bg-gradient-to-br from-lsu-purple to-purple-900 text-white py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">About LSU AI Spark</h1>
            <p className="text-xl text-white/90 mb-8">
              Empowering students with AI skills through interactive learning and expert-led content.
            </p>
          </div>
        </div>
      </div>
      
      {/* About content */}
      <div className="container py-16">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold text-lsu-purple mb-6">Our Mission</h2>
              <p className="text-gray-700 mb-6">
                Our mission is to make AI education accessible, engaging, and effective for all LSU students. 
                We believe that understanding AI is essential for future careers across disciplines, and we're 
                committed to providing high-quality educational resources that help students build valuable skills.
              </p>
              <Button 
                className="bg-lsu-purple hover:bg-lsu-purple/90 text-white flex items-center gap-2" 
                onClick={() => setVideoOpen(true)}
              >
                <Play size={18} /> Watch Our Story
              </Button>
            </div>
            <div className="relative group cursor-pointer hover-scale" onClick={() => setVideoOpen(true)}>
              <img 
                src="https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b"
                alt="LSU AI Spark Team" 
                className="rounded-lg shadow-lg w-full h-[300px] object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-lg">
                <div className="bg-white/90 rounded-full p-4">
                  <Play className="h-8 w-8 text-lsu-purple" />
                </div>
              </div>
            </div>
          </div>
          
          <h2 className="text-3xl font-bold text-lsu-purple mb-8 text-center">Why LSU AI Spark?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: <Sparkles className="h-10 w-10 text-lsu-gold" />,
                title: "Expert-led Content",
                description: "All modules are developed by AI specialists and LSU faculty with deep expertise in the field."
              },
              {
                icon: <Award className="h-10 w-10 text-lsu-gold" />,
                title: "Earn Certificates",
                description: "Showcase your knowledge with certificates of completion for each module."
              },
              {
                icon: <CheckCircle2 className="h-10 w-10 text-lsu-gold" />,
                title: "Interactive Learning",
                description: "Quizzes and hands-on exercises help reinforce concepts and ensure understanding."
              },
            ].map((item, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 text-center">
                <div className="flex justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
          
          <div className="bg-gray-50 p-8 rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Have Questions?</h2>
            <p className="text-gray-700 mb-6">
              We'd love to hear from you! Reach out with questions, feedback, or partnership opportunities.
            </p>
            <Link to="/contact">
              <Button className="bg-lsu-purple hover:bg-lsu-purple/90">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      <Dialog open={videoOpen} onOpenChange={setVideoOpen}>
        <DialogContent className="max-w-4xl p-0 bg-transparent border-none">
          <DialogTitle className="sr-only">About LSU AI Spark</DialogTitle>
          <div className="aspect-video w-full">
            <iframe 
              width="100%" 
              height="100%" 
              src="https://www.youtube.com/embed/AIWMq0B7_dQ?autoplay=1" 
              title="About LSU AI Spark" 
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

export default AboutPage;
