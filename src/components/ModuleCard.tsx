
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import { Lock } from "lucide-react";

interface ModuleCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  topics: number;
  progress?: number;
  locked?: boolean;
}

const ModuleCard = ({ id, title, description, image, topics, progress = 0, locked = false }: ModuleCardProps) => {
  const { isAuthenticated, unlockedModules } = useUser();
  
  // Check if the module is locked based on the unlockedModules state
  const isLocked = locked || (unlockedModules && !unlockedModules.includes(id));
  
  // Only show progress if the module is unlocked and there is progress
  const showProgress = !isLocked && progress > 0;
  
  return (
    <Card className={`overflow-hidden flex flex-col h-full transition-all ${isLocked ? 'opacity-80' : 'hover:shadow-md'}`}>
      <div className="relative h-40 overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className={`w-full h-full object-cover ${isLocked ? 'filter grayscale' : ''}`}
          loading="lazy"
        />
        {isLocked && (
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <Lock className="text-white h-10 w-10" />
          </div>
        )}
        {showProgress && (
          <div className="absolute bottom-0 left-0 right-0 bg-white/80 p-1.5">
            <Progress value={progress} className="h-2" />
            <p className="text-xs text-center mt-1 font-medium text-gray-700">{progress}% complete</p>
          </div>
        )}
      </div>
      
      <CardHeader>
        <CardTitle className="text-lg text-lsu-purple">{title}</CardTitle>
        <CardDescription>{topics} topics</CardDescription>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <p className="text-sm text-gray-600">{description}</p>
      </CardContent>
      
      <CardFooter className="pt-0">
        <Link to={isAuthenticated ? `/learning/${id}` : '/login'} className="w-full" aria-disabled={isLocked}>
          <Button 
            className={`w-full ${isLocked ? 'bg-gray-400 cursor-not-allowed' : 'bg-lsu-purple hover:bg-lsu-purple/90'}`}
            disabled={isLocked}
          >
            {isLocked ? "Locked" : (progress > 0 ? "Continue Learning" : "Start Learning")}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ModuleCard;
