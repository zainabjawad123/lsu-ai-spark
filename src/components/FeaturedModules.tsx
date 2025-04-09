
import ModuleCard from "./ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useUser } from "@/context/UserContext";

// Mock data for featured modules
const featuredModules = [
  {
    id: "ai-fundamentals",
    title: "AI Fundamentals",
    description: "Learn the core concepts of artificial intelligence, including historical context, key algorithms, and modern applications.",
    image: "/ai-fundamentals.jpg",
    topics: 5
  },
  {
    id: "machine-learning",
    title: "Machine Learning",
    description: "Explore supervised and unsupervised learning, neural networks, and how to implement basic ML models.",
    image: "/machine-learning.jpg",
    topics: 7
  },
  {
    id: "prompt-engineering",
    title: "Prompt Engineering",
    description: "Master the techniques for writing effective prompts that generate the best results from large language models.",
    image: "/prompt-engineering.jpg",
    topics: 4
  },
  {
    id: "ai-ethics",
    title: "AI Ethics",
    description: "Understand the ethical considerations in AI development including bias, privacy, and responsible implementation.",
    image: "/ai-ethics.jpg",
    topics: 6
  }
];

const FeaturedModules = () => {
  const { unlockedModules, userProgress } = useUser();
  
  // Calculate progress for each module
  const getModuleProgress = (moduleId: string) => {
    if (!userProgress[moduleId]) return 0;
    
    // Calculate based on module data
    let topicCount = 0;
    switch (moduleId) {
      case "ai-fundamentals":
        topicCount = 5;
        break;
      case "machine-learning":
        topicCount = 7;
        break;
      case "prompt-engineering":
        topicCount = 4;
        break;
      case "ai-ethics":
        topicCount = 6;
        break;
      default:
        topicCount = 0;
    }
    
    if (topicCount === 0) return 0;
    
    const completed = Object.values(userProgress[moduleId]).filter(Boolean).length;
    return Math.round((completed / topicCount) * 100);
  };
  
  return (
    <section className="py-20 bg-gray-50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-lsu-purple mb-4">Featured Modules</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our most popular AI learning modules designed to take you from beginner to proficient.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredModules.map((module, index) => {
            const isLocked = unlockedModules ? !unlockedModules.includes(module.id) : false;
            const progress = isLocked ? 0 : getModuleProgress(module.id);
            
            return (
              <div 
                key={module.id} 
                className="animate-fade-in" 
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ModuleCard 
                  {...module} 
                  locked={isLocked}
                  progress={progress}
                />
              </div>
            );
          })}
        </div>
        
        <div className="text-center mt-12">
          <Link to="/modules">
            <Button variant="outline" className="border-lsu-purple text-lsu-purple hover:bg-lsu-purple hover:text-white">
              View All Modules
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedModules;
