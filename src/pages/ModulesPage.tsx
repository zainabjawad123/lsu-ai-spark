
import { useState } from "react";
import ModuleCard from "@/components/ModuleCard";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUser } from "@/context/UserContext";

// Mock data for modules
const allModules = [
  {
    id: "ai-fundamentals",
    title: "AI Fundamentals",
    description: "Learn the core concepts of artificial intelligence, including historical context, key algorithms, and modern applications.",
    image: "/ai-fundamentals.jpg",
    topics: 5,
    category: "beginner"
  },
  {
    id: "machine-learning",
    title: "Machine Learning",
    description: "Explore supervised and unsupervised learning, neural networks, and how to implement basic ML models.",
    image: "/machine-learning.jpg",
    topics: 7,
    category: "intermediate"
  },
  {
    id: "prompt-engineering",
    title: "Prompt Engineering",
    description: "Master the techniques for writing effective prompts that generate the best results from large language models.",
    image: "/prompt-engineering.jpg",
    topics: 4,
    category: "intermediate"
  },
  {
    id: "ai-ethics",
    title: "AI Ethics",
    description: "Understand the ethical considerations in AI development including bias, privacy, and responsible implementation.",
    image: "/ai-ethics.jpg",
    topics: 6,
    category: "beginner"
  },
  {
    id: "deep-learning",
    title: "Deep Learning",
    description: "Dive into neural networks, CNNs, RNNs, and how they're applied to solve complex problems in vision and language.",
    image: "/deep-learning.jpg", 
    topics: 8,
    category: "advanced"
  },
  {
    id: "computer-vision",
    title: "Computer Vision",
    description: "Learn how AI systems process and interpret visual information from the world through images and video.",
    image: "/computer-vision.jpg",
    topics: 6,
    category: "advanced"
  },
  {
    id: "nlp",
    title: "Natural Language Processing",
    description: "Explore how computers understand, interpret, and generate human language text and speech.",
    image: "/nlp.jpg",
    topics: 7,
    category: "advanced"
  },
  {
    id: "ai-applications",
    title: "AI in Business",
    description: "Understand how AI is transforming industries and creating new opportunities across various business sectors.",
    image: "/ai-business.jpg",
    topics: 5,
    category: "intermediate"
  }
];

const ModulesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const { unlockedModules } = useUser();
  
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
      <h1 className="text-3xl font-bold text-lsu-purple mb-8">Explore All Modules</h1>
      
      <div className="flex flex-col md:flex-row gap-4 items-start mb-8">
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
          {filteredModules.map(module => (
            <ModuleCard 
              key={module.id} 
              {...module} 
              locked={unlockedModules ? !unlockedModules.includes(module.id) : false}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-lg text-gray-600">No modules found matching your search criteria.</p>
        </div>
      )}
    </div>
  );
};

export default ModulesPage;
