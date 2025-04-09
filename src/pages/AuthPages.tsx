
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUser } from "@/context/UserContext";
import { Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, BookOpen, Check, CheckCircle, Lock } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useUser();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div className="container max-w-md py-16">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-lsu-purple">Welcome Back</h1>
        <p className="text-gray-600 mt-2">Sign in to continue your learning journey</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="email" className="text-gray-700">Email</label>
          <Input 
            id="email"
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Your email address"
            required
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="password" className="text-gray-700">Password</label>
          <Input 
            id="password"
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Your password"
            required
          />
        </div>
        
        <Button type="submit" className="w-full bg-lsu-purple hover:bg-lsu-purple/90">
          Sign In
        </Button>
      </form>
      
      <div className="text-center mt-6">
        <p className="text-gray-600">
          Don't have an account? <Link to="/signup" className="text-lsu-purple font-medium">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup } = useUser();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signup(name, email, password);
  };

  return (
    <div className="container max-w-md py-16">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-lsu-purple">Create an Account</h1>
        <p className="text-gray-600 mt-2">Join LSU AI Spark to start learning</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="name" className="text-gray-700">Full Name</label>
          <Input 
            id="name"
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder="Your full name"
            required
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="email" className="text-gray-700">Email</label>
          <Input 
            id="email"
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Your email address"
            required
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="password" className="text-gray-700">Password</label>
          <Input 
            id="password"
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Create a password"
            required
          />
        </div>
        
        <Button type="submit" className="w-full bg-lsu-purple hover:bg-lsu-purple/90">
          Create Account
        </Button>
      </form>
      
      <div className="text-center mt-6">
        <p className="text-gray-600">
          Already have an account? <Link to="/login" className="text-lsu-purple font-medium">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export const DashboardPage = () => {
  const { user, unlockedModules, quizScores, getTotalProgress, canGetCertificate } = useUser();
  
  const moduleData = [
    {
      id: "ai-fundamentals",
      title: "AI Fundamentals",
      description: "Learn the core concepts of artificial intelligence.",
      topics: 5
    },
    {
      id: "machine-learning",
      title: "Machine Learning",
      description: "Explore supervised and unsupervised learning algorithms.",
      topics: 7
    },
    {
      id: "prompt-engineering",
      title: "Prompt Engineering",
      description: "Master creating effective prompts for AI models.",
      topics: 4
    },
    {
      id: "ai-ethics",
      title: "AI Ethics",
      description: "Understand ethical considerations in AI development.",
      topics: 6
    }
  ];
  
  const totalProgress = getTotalProgress();
  
  return (
    <div className="container py-12">
      <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-100">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-lsu-purple">Welcome, {user?.name}</h1>
            <p className="text-gray-600 mt-1">Continue your AI learning journey</p>
          </div>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-lsu-gold text-lsu-purple hover:bg-lsu-gold/90 flex items-center gap-2">
                <Award className="h-5 w-5" />
                Get Certificate
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Course Certificate</DialogTitle>
                <DialogDescription>
                  {canGetCertificate() ? 
                    "Congratulations! You've completed all modules and can now download your certificate." : 
                    "You need to complete all modules before you can get your certificate."}
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                {canGetCertificate() ? (
                  <div className="text-center">
                    <Award className="h-24 w-24 mx-auto text-lsu-gold mb-4" />
                    <p className="text-green-600 font-medium mb-2">All modules completed!</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <BookOpen className="h-16 w-16 mx-auto text-amber-500 mb-4" />
                    <p className="text-amber-600 mb-2">Keep learning to earn your certificate</p>
                    <Progress value={totalProgress} className="max-w-xs mx-auto mb-2" />
                    <p className="text-sm text-gray-500">{Math.round(totalProgress)}% complete</p>
                  </div>
                )}
              </div>
              <DialogFooter className="sm:justify-center">
                {canGetCertificate() ? (
                  <Button className="bg-lsu-purple hover:bg-lsu-purple/90">
                    Download Certificate
                  </Button>
                ) : (
                  <DialogClose asChild>
                    <Button variant="outline">Continue Learning</Button>
                  </DialogClose>
                )}
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="mt-6">
          <div className="flex justify-between text-sm text-gray-700 mb-2">
            <span>Overall Progress</span>
            <span>{Math.round(totalProgress)}%</span>
          </div>
          <Progress value={totalProgress} className="h-3" />
        </div>
      </div>
      
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Learning Modules</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {moduleData.map(module => {
          const isUnlocked = unlockedModules.includes(module.id);
          const score = quizScores[module.id] || 0;
          const hasScore = score > 0;
          
          return (
            <Card key={module.id} className={`overflow-hidden ${!isUnlocked ? 'opacity-75' : ''}`}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{module.title}</CardTitle>
                  {hasScore && (
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      {score}%
                    </Badge>
                  )}
                </div>
                <CardDescription>{module.topics} topics</CardDescription>
              </CardHeader>
              
              <CardContent className="pb-2">
                <p className="text-sm text-gray-600 mb-3">{module.description}</p>
                
                <div className="flex items-center gap-2 text-sm">
                  {isUnlocked ? (
                    <>
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-green-700">Unlocked</span>
                    </>
                  ) : (
                    <>
                      <Lock className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-500">Locked</span>
                    </>
                  )}
                </div>
              </CardContent>
              
              <CardFooter className="pt-2">
                <Link to={isUnlocked ? `/learning/${module.id}` : '#'} className="w-full">
                  <Button 
                    className={`w-full ${!isUnlocked ? 'bg-gray-400' : 'bg-lsu-purple hover:bg-lsu-purple/90'}`}
                    disabled={!isUnlocked}
                  >
                    {hasScore ? "Review Module" : (isUnlocked ? "Start Learning" : "Locked")}
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          );
        })}
      </div>
      
      <div className="mt-8 bg-gray-50 rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Progress Summary</h2>
        
        <div className="space-y-4">
          {moduleData.map(module => {
            const isUnlocked = unlockedModules.includes(module.id);
            const score = quizScores[module.id] || 0;
            
            return (
              <div key={module.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {isUnlocked ? (
                    score > 0 ? (
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                        <Check className="h-5 w-5 text-green-600" />
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
                        <BookOpen className="h-4 w-4 text-amber-600" />
                      </div>
                    )
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                      <Lock className="h-4 w-4 text-gray-400" />
                    </div>
                  )}
                  <span className="font-medium">{module.title}</span>
                </div>
                
                <div className="flex items-center gap-3">
                  {score > 0 && (
                    <Badge className="bg-green-100 text-green-700 border-green-200">
                      {score}% Score
                    </Badge>
                  )}
                  
                  <Link to={isUnlocked ? `/learning/${module.id}` : '#'}>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      disabled={!isUnlocked}
                      className={!isUnlocked ? 'opacity-50' : ''}
                    >
                      {score > 0 ? "Review" : "Start"}
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
