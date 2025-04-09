
import { useState } from "react";
import ModuleCard from "@/components/ModuleCard";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUser } from "@/context/UserContext";
import { Badge } from "@/components/ui/badge";

// Mock data for modules with standardized topic count of 4 per module
const allModules = [
  // Beginner level
  {
    id: "ai-fundamentals",
    title: "AI Fundamentals",
    description: "Learn the core concepts of artificial intelligence, including historical context, key algorithms, and modern applications.",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
    topics: 4,
    category: "beginner"
  },
  {
    id: "machine-learning",
    title: "Machine Learning",
    description: "Explore supervised and unsupervised learning, neural networks, and how to implement basic ML models.",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
    topics: 4,
    category: "beginner"
  },
  {
    id: "prompt-engineering",
    title: "Prompt Engineering",
    description: "Master the techniques for writing effective prompts that generate the best results from large language models.",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
    topics: 4,
    category: "beginner"
  },
  {
    id: "ai-ethics",
    title: "AI Ethics",
    description: "Understand the ethical considerations in AI development including bias, privacy, and responsible implementation.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    topics: 4,
    category: "beginner"
  },
  
  // Intermediate level
  {
    id: "deep-learning",
    title: "Deep Learning",
    description: "Dive into neural networks, CNNs, RNNs, and how they're applied to solve complex problems in vision and language.",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485", 
    topics: 4,
    category: "intermediate"
  },
  {
    id: "computer-vision",
    title: "Computer Vision",
    description: "Learn how AI systems process and interpret visual information from the world through images and video.",
    image: "https://images.unsplash.com/photo-1542626991-cbc4e32524cc",
    topics: 4,
    category: "intermediate"
  },
  {
    id: "nlp",
    title: "Natural Language Processing",
    description: "Explore how computers understand, interpret, and generate human language text and speech.",
    image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d",
    topics: 4,
    category: "intermediate"
  },
  {
    id: "ai-applications",
    title: "AI in Business",
    description: "Understand how AI is transforming industries and creating new opportunities across various business sectors.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
    topics: 4,
    category: "intermediate"
  },
  
  // Advanced level
  {
    id: "data-privacy",
    title: "AI & Data Privacy",
    description: "Learn about data privacy frameworks and how to implement privacy-preserving AI systems.",
    image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f",
    topics: 4,
    category: "advanced"
  },
  {
    id: "future-ai",
    title: "Future of AI",
    description: "Explore emerging AI trends, quantum computing for AI, and predicted future developments.",
    image: "https://images.unsplash.com/photo-1535378273068-9bb67d5bb38e",
    topics: 4,
    category: "advanced"
  },
  {
    id: "responsible-ai",
    title: "Responsible AI",
    description: "Study frameworks for responsible AI development, governance, and ethical implementation.",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
    topics: 4,
    category: "advanced"
  },
  {
    id: "ai-research",
    title: "AI Research Methods",
    description: "Learn how to design, conduct, and evaluate AI research projects and experiments.",
    image: "https://images.unsplash.com/photo-1507668077129-56e32842fceb",
    topics: 4,
    category: "advanced"
  }
];

const ModulesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const { unlockedModules, userProgress, completedLevels, getUserLevel } = useUser();
  
  const currentLevel = getUserLevel();
  
  // Calculate progress for each module
  const getModuleProgress = (moduleId: string) => {
    if (!userProgress[moduleId] || !unlockedModules.includes(moduleId)) return 0;
    
    // Each module has 4 topics
    const topicCount = 4;
    
    const completed = Object.values(userProgress[moduleId] || {}).filter(Boolean).length;
    return Math.round((completed / topicCount) * 100);
  };
  
  const filteredModules = allModules
    .filter(module => 
      module.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      module.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(module => 
      activeCategory === "all" || module.category === activeCategory
    );
  
  return (
    <div className="container py-12">
      <div className="flex flex-col md:flex-row justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-lsu-purple mb-2">Explore All Modules</h1>
          <div className="flex items-center gap-3 mb-4">
            <p className="text-gray-600">Current level:</p>
            <Badge 
              className={`capitalize ${
                currentLevel === 'beginner' ? 'bg-green-500' : 
                currentLevel === 'intermediate' ? 'bg-blue-500' : 
                'bg-purple-500'
              }`}
            >
              {currentLevel}
            </Badge>
          </div>
        </div>
        <Input
          placeholder="Search modules..."
          className="w-full md:max-w-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <Tabs defaultValue="all" className="mb-8" onValueChange={setActiveCategory}>
        <TabsList>
          <TabsTrigger value="all">All Levels</TabsTrigger>
          <TabsTrigger value="beginner">Beginner</TabsTrigger>
          <TabsTrigger value="intermediate">Intermediate</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>
      </Tabs>
      
      {filteredModules.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredModules.map(module => {
            const isLocked = !unlockedModules.includes(module.id);
            const progress = isLocked ? 0 : getModuleProgress(module.id);
            
            return (
              <ModuleCard 
                key={module.id} 
                {...module} 
                locked={isLocked}
                progress={progress}
              />
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-lg text-gray-600">No modules found matching your search criteria.</p>
        </div>
      )}
      
      {/* Level Completion Info */}
      {completedLevels.length > 0 && (
        <div className="mt-12 p-6 bg-lsu-gold/10 border border-lsu-gold/30 rounded-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Your Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {['beginner', 'intermediate', 'advanced'].map(level => (
              <div 
                key={level}
                className={`p-4 rounded-lg ${
                  completedLevels.includes(level) 
                    ? 'bg-white border-2 border-green-500' 
                    : 'bg-gray-50 border border-gray-200'
                }`}
              >
                <h3 className="capitalize font-medium text-lg mb-1">{level} Level</h3>
                {completedLevels.includes(level) ? (
                  <p className="text-green-600">Completed - Certificate Earned</p>
                ) : (
                  <p className="text-gray-500">Not completed yet</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ModulesPage;
