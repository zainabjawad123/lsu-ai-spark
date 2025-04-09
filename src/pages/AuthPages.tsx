
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempt with:", email);
    
    // Mock successful login
    toast({
      title: "Login Successful",
      description: "Welcome back to LSU AI Spark!",
    });
  };
  
  return (
    <div className="container flex items-center justify-center py-20">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-lsu-purple">Login to LSU AI Spark</CardTitle>
          <CardDescription>Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link to="/forgot-password" className="text-sm text-lsu-purple hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <Input 
                  id="password" 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-lsu-purple hover:bg-lsu-purple/90"
              >
                Sign In
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center">
          <div className="text-center text-sm text-gray-600 mt-2">
            Don't have an account?{" "}
            <Link to="/signup" className="text-lsu-purple hover:underline">
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();
  
  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Signup attempt with:", { name, email });
    
    // Mock successful signup
    toast({
      title: "Account Created",
      description: "Welcome to LSU AI Spark! Your account has been created successfully.",
    });
  };
  
  return (
    <div className="container flex items-center justify-center py-20">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-lsu-purple">Create an Account</CardTitle>
          <CardDescription>Sign up to start learning AI with LSU</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignup}>
            <div className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name" 
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <p className="text-xs text-gray-500">Password must be at least 8 characters long</p>
              </div>
              <Button 
                type="submit" 
                className="w-full bg-lsu-purple hover:bg-lsu-purple/90"
              >
                Create Account
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center">
          <div className="text-center text-sm text-gray-600 mt-2">
            Already have an account?{" "}
            <Link to="/login" className="text-lsu-purple hover:underline">
              Sign in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export const DashboardPage = () => {
  // Mock user data
  const userData = {
    name: "John Doe",
    email: "john.doe@example.com",
    enrolledModules: [
      {
        id: "ai-fundamentals",
        title: "AI Fundamentals",
        description: "Learn the core concepts of artificial intelligence",
        progress: 60,
        image: "/ai-fundamentals.jpg",
        topics: 5
      },
      {
        id: "prompt-engineering",
        title: "Prompt Engineering",
        description: "Master the techniques for writing effective prompts",
        progress: 25,
        image: "/prompt-engineering.jpg",
        topics: 4
      }
    ],
    completedModules: [
      {
        id: "intro-to-ai",
        title: "Introduction to AI",
        description: "A brief overview of artificial intelligence",
        image: "/intro-to-ai.jpg",
        completionDate: "March 15, 2023",
        topics: 3
      }
    ]
  };
  
  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold text-lsu-purple mb-2">Welcome back, {userData.name}</h1>
      <p className="text-gray-600 mb-8">Continue your learning journey where you left off.</p>
      
      <Tabs defaultValue="in-progress">
        <TabsList>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="explore">Explore</TabsTrigger>
        </TabsList>
        
        <TabsContent value="in-progress" className="pt-6">
          {userData.enrolledModules.length > 0 ? (
            <>
              <h2 className="text-xl font-semibold mb-6">Continue Learning</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {userData.enrolledModules.map(module => (
                  <ModuleCard key={module.id} {...module} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600">You don't have any modules in progress.</p>
              <Link to="/modules">
                <Button variant="outline" className="mt-4">Browse Modules</Button>
              </Link>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="completed" className="pt-6">
          {userData.completedModules.length > 0 ? (
            <>
              <h2 className="text-xl font-semibold mb-6">Completed Modules</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {userData.completedModules.map(module => (
                  <Card key={module.id} className="overflow-hidden flex flex-col h-full">
                    <div className="relative h-40 overflow-hidden">
                      <img 
                        src={module.image} 
                        alt={module.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "https://via.placeholder.com/400x200?text=AI+Module";
                        }}
                      />
                      <div className="absolute top-4 right-4 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                        Completed
                      </div>
                    </div>
                    
                    <CardHeader>
                      <CardTitle className="text-lg text-lsu-purple">{module.title}</CardTitle>
                      <CardDescription>Completed on {module.completionDate}</CardDescription>
                    </CardHeader>
                    
                    <CardContent className="flex-grow">
                      <p className="text-sm text-gray-600">{module.description}</p>
                    </CardContent>
                    
                    <CardFooter className="pt-0">
                      <div className="grid grid-cols-2 gap-2 w-full">
                        <Button variant="outline">View Certificate</Button>
                        <Button className="bg-lsu-purple hover:bg-lsu-purple/90">Revisit</Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600">You haven't completed any modules yet.</p>
              <Link to="/modules">
                <Button variant="outline" className="mt-4">Start Learning</Button>
              </Link>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="explore" className="pt-6">
          <h2 className="text-xl font-semibold mb-6">Recommended for You</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="overflow-hidden hover:shadow-md transition-all">
              <div className="h-40 overflow-hidden">
                <img 
                  src="/machine-learning.jpg" 
                  alt="Machine Learning"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "https://via.placeholder.com/400x200?text=Machine+Learning";
                  }}
                />
              </div>
              <CardHeader>
                <CardTitle className="text-lg text-lsu-purple">Machine Learning</CardTitle>
                <CardDescription>7 topics</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Explore supervised and unsupervised learning, neural networks, and how to implement basic ML models.
                </p>
              </CardContent>
              <CardFooter>
                <Link to="/learning/machine-learning" className="w-full">
                  <Button className="w-full bg-lsu-purple hover:bg-lsu-purple/90">Start Learning</Button>
                </Link>
              </CardFooter>
            </Card>
            
            <Card className="overflow-hidden hover:shadow-md transition-all">
              <div className="h-40 overflow-hidden">
                <img 
                  src="/ai-ethics.jpg" 
                  alt="AI Ethics"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "https://via.placeholder.com/400x200?text=AI+Ethics";
                  }}
                />
              </div>
              <CardHeader>
                <CardTitle className="text-lg text-lsu-purple">AI Ethics</CardTitle>
                <CardDescription>6 topics</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Understand the ethical considerations in AI development including bias, privacy, and responsible implementation.
                </p>
              </CardContent>
              <CardFooter>
                <Link to="/learning/ai-ethics" className="w-full">
                  <Button className="w-full bg-lsu-purple hover:bg-lsu-purple/90">Start Learning</Button>
                </Link>
              </CardFooter>
            </Card>
            
            <div className="flex flex-col gap-6">
              <h3 className="font-semibold text-gray-800">Popular Topics</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/modules" className="flex items-center gap-2 text-gray-700 hover:text-lsu-purple">
                    <div className="w-2 h-2 rounded-full bg-lsu-gold"></div>
                    <span>Natural Language Processing</span>
                  </Link>
                </li>
                <li>
                  <Link to="/modules" className="flex items-center gap-2 text-gray-700 hover:text-lsu-purple">
                    <div className="w-2 h-2 rounded-full bg-lsu-gold"></div>
                    <span>Computer Vision</span>
                  </Link>
                </li>
                <li>
                  <Link to="/modules" className="flex items-center gap-2 text-gray-700 hover:text-lsu-purple">
                    <div className="w-2 h-2 rounded-full bg-lsu-gold"></div>
                    <span>Reinforcement Learning</span>
                  </Link>
                </li>
                <li>
                  <Link to="/modules" className="flex items-center gap-2 text-gray-700 hover:text-lsu-purple">
                    <div className="w-2 h-2 rounded-full bg-lsu-gold"></div>
                    <span>Generative AI</span>
                  </Link>
                </li>
                <li>
                  <Link to="/modules" className="flex items-center gap-2 text-gray-700 hover:text-lsu-purple">
                    <div className="w-2 h-2 rounded-full bg-lsu-gold"></div>
                    <span>Deep Learning</span>
                  </Link>
                </li>
              </ul>
              
              <Link to="/modules" className="text-lsu-purple hover:underline text-sm font-medium">
                View all topics →
              </Link>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
