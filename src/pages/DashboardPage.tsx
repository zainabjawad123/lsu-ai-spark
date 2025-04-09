
import { useEffect } from "react";
import { useUser } from "@/context/UserContext";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Trophy, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const DashboardPage = () => {
  const { 
    user, 
    getTotalProgress, 
    quizScores, 
    unlockedModules, 
    canGetCertificate,
    getUserLevel,
    completedLevels
  } = useUser();
  
  const totalProgress = getTotalProgress();
  const currentLevel = getUserLevel();
  
  // Group modules by their level
  const modulesByLevel = {
    beginner: ["ai-fundamentals", "machine-learning", "prompt-engineering", "ai-ethics"],
    intermediate: ["deep-learning", "computer-vision", "nlp", "ai-applications"],
    advanced: ["data-privacy", "future-ai", "responsible-ai", "ai-research"]
  };
  
  const getModuleName = (moduleId: string): string => {
    return moduleId
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div className="container py-12">
      <div className="flex flex-col lg:flex-row justify-between items-start mb-8 gap-6">
        <div>
          <h1 className="text-3xl font-bold text-lsu-purple mb-2">Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.name || "Student"}!</p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4">
          <Link to="/modules">
            <Button className="bg-lsu-purple hover:bg-lsu-purple/90">
              Continue Learning
            </Button>
          </Link>
        </div>
      </div>

      {/* Overall Progress Card */}
      <Card className="mb-8">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">Overall Progress</CardTitle>
          <CardDescription>Your learning journey across all modules</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-2 flex justify-between text-sm">
            <span>Progress</span>
            <span className="font-medium">{Math.round(totalProgress)}%</span>
          </div>
          <Progress value={totalProgress} className="h-3" />
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-green-50 rounded-lg p-4 flex items-center space-x-4 border border-green-100">
              <div className="bg-green-100 p-2 rounded-full">
                <Trophy className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-gray-800">Current Level</p>
                <p className="text-lg font-semibold capitalize">{currentLevel}</p>
              </div>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-4 flex items-center space-x-4 border border-blue-100">
              <div className="bg-blue-100 p-2 rounded-full">
                <CheckCircle className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-800">Modules Unlocked</p>
                <p className="text-lg font-semibold">{unlockedModules.length} of 12</p>
              </div>
            </div>
            
            <div className="bg-purple-50 rounded-lg p-4 flex items-center space-x-4 border border-purple-100">
              <div className="bg-purple-100 p-2 rounded-full">
                <Award className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="font-medium text-gray-800">Certificates</p>
                <p className="text-lg font-semibold">{completedLevels.length} of 3</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quiz Scores Summary */}
      <h2 className="text-2xl font-bold text-lsu-purple mb-4">Quiz Performance</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {Object.entries(modulesByLevel).map(([level, moduleIds], levelIndex) => (
          <Card key={level} className={`overflow-hidden border-t-4 ${
            level === 'beginner' ? 'border-t-green-500' : 
            level === 'intermediate' ? 'border-t-blue-500' : 
            'border-t-purple-500'
          }`}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg capitalize">{level} Level</CardTitle>
                {completedLevels.includes(level) && (
                  <Badge className="bg-green-500">Completed</Badge>
                )}
              </div>
              <CardDescription>Module quiz scores</CardDescription>
            </CardHeader>
            <CardContent className="pb-4">
              <ul className="space-y-3">
                {moduleIds.map((moduleId) => {
                  const score = quizScores[moduleId] || 0;
                  const isUnlocked = unlockedModules.includes(moduleId);
                  
                  return (
                    <li key={moduleId} className="flex items-center justify-between py-1">
                      <span className="flex-1 truncate font-medium">{getModuleName(moduleId)}</span>
                      {isUnlocked ? (
                        <div className="flex items-center gap-3">
                          <Progress value={score} className="w-24 h-2" />
                          <span className="w-12 text-right font-medium">
                            {score}%
                          </span>
                        </div>
                      ) : (
                        <Badge variant="outline" className="text-gray-500">Locked</Badge>
                      )}
                    </li>
                  );
                })}
              </ul>
            </CardContent>
            {completedLevels.includes(level) ? (
              <CardFooter className="pt-0">
                <Link to={`/certificates/${level}`} className="w-full">
                  <Button variant="outline" className="w-full">
                    <Award className="mr-2 h-4 w-4" /> 
                    View Certificate
                  </Button>
                </Link>
              </CardFooter>
            ) : level === currentLevel ? (
              <CardFooter className="pt-0">
                <Link to="/modules" className="w-full">
                  <Button className="w-full bg-lsu-purple hover:bg-lsu-purple/90">
                    Continue Level
                  </Button>
                </Link>
              </CardFooter>
            ) : (
              <CardFooter className="pt-0">
                <Button disabled variant="outline" className="w-full">
                  Locked
                </Button>
              </CardFooter>
            )}
          </Card>
        ))}
      </div>

      {/* More content could go here */}
    </div>
  );
};

export default DashboardPage;
