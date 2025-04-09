
import { Book, Video, Award, Clock } from "lucide-react";

const features = [
  {
    icon: <Video className="h-6 w-6 text-lsu-purple" />,
    title: "Video Lectures",
    description: "Learn through high-quality video content created by LSU's AI experts."
  },
  {
    icon: <Book className="h-6 w-6 text-lsu-purple" />,
    title: "Interactive Quizzes",
    description: "Test your knowledge with quizzes designed to reinforce learning."
  },
  {
    icon: <Award className="h-6 w-6 text-lsu-purple" />,
    title: "Earn Certificates",
    description: "Receive certificates upon completion of modules to showcase your skills."
  },
  {
    icon: <Clock className="h-6 w-6 text-lsu-purple" />,
    title: "Learn at Your Pace",
    description: "Access content anytime and progress through modules on your schedule."
  }
];

const FeatureSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container">
        <h2 className="text-3xl font-bold text-center text-lsu-purple mb-4">How It Works</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Our platform makes learning AI simple and effective with a structured approach 
          designed for all skill levels.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col items-center text-center animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="bg-lsu-purple/10 p-3 rounded-full mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
