
import { createContext, useContext, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

type VideoProgress = {
  [moduleId: string]: {
    [topicId: string]: boolean;
  }
};

export type Module = {
  id: string;
  title: string;
  description: string;
  image: string;
  topics: number;
  progress?: number;
  category?: string;
  locked?: boolean;
};

type UserContextType = {
  user: User | null;
  login: (email: string, password: string) => void;
  signup: (name: string, email: string, password: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
  markVideoCompleted: (moduleId: string, topicId: string) => void;
  isVideoCompleted: (moduleId: string, topicId: string) => boolean;
  userProgress: VideoProgress;
  unlockedModules: string[];
  completeModule: (moduleId: string) => void;
};

type User = {
  id: string;
  name: string;
  email: string;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProgress, setUserProgress] = useState<VideoProgress>({});
  const [unlockedModules, setUnlockedModules] = useState<string[]>(["ai-fundamentals"]);
  const { toast } = useToast();
  const navigate = useNavigate();

  const login = (email: string, password: string) => {
    // Mock login logic
    if (email && password) {
      const mockUser = {
        id: '1',
        name: email.split('@')[0],
        email: email
      };
      
      setUser(mockUser);
      
      // Initialize with the first module unlocked
      if (unlockedModules.length === 0) {
        setUnlockedModules(['ai-fundamentals']);
      }
      
      toast({
        title: "Login Successful",
        description: "Welcome back to LSU AI Spark!",
      });
      
      // Redirect to dashboard
      navigate('/dashboard');
    }
  };

  const signup = (name: string, email: string, password: string) => {
    // Mock signup logic
    if (name && email && password) {
      const mockUser = {
        id: '1',
        name: name,
        email: email
      };
      
      setUser(mockUser);
      
      // Initialize with the first module unlocked
      setUnlockedModules(['ai-fundamentals']);
      
      toast({
        title: "Account Created",
        description: "Welcome to LSU AI Spark! Your account has been created successfully.",
      });
      
      // Redirect to dashboard
      navigate('/dashboard');
    }
  };

  const logout = () => {
    setUser(null);
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully.",
    });
    navigate('/');
  };

  const markVideoCompleted = (moduleId: string, topicId: string) => {
    setUserProgress(prev => ({
      ...prev,
      [moduleId]: {
        ...prev[moduleId],
        [topicId]: true
      }
    }));
  };

  const isVideoCompleted = (moduleId: string, topicId: string): boolean => {
    return !!userProgress[moduleId]?.[topicId];
  };

  const completeModule = (moduleId: string) => {
    // Logic to determine which module to unlock next
    const moduleOrder = ["ai-fundamentals", "machine-learning", "prompt-engineering", "ai-ethics"];
    const currentIndex = moduleOrder.indexOf(moduleId);
    
    if (currentIndex >= 0 && currentIndex < moduleOrder.length - 1) {
      const nextModule = moduleOrder[currentIndex + 1];
      
      if (!unlockedModules.includes(nextModule)) {
        setUnlockedModules(prev => [...prev, nextModule]);
        toast({
          title: "New Module Unlocked!",
          description: `You've unlocked the ${nextModule.replace(/-/g, ' ')} module.`,
        });
      }
    }
  };

  const value = {
    user,
    login,
    signup,
    logout,
    isAuthenticated: !!user,
    markVideoCompleted,
    isVideoCompleted,
    userProgress,
    unlockedModules,
    completeModule
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
