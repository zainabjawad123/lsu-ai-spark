
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";

interface ModuleCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  topics: number;
  progress?: number;
}

const ModuleCard = ({ id, title, description, image, topics, progress = 0 }: ModuleCardProps) => {
  return (
    <Card className="overflow-hidden flex flex-col h-full transition-all hover:shadow-md">
      <div className="relative h-40 overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = "https://via.placeholder.com/400x200?text=AI+Module";
          }}
        />
        {progress > 0 && (
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
        <Link to={`/learning/${id}`} className="w-full">
          <Button className="w-full bg-lsu-purple hover:bg-lsu-purple/90">
            {progress > 0 ? "Continue Learning" : "Start Learning"}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ModuleCard;
