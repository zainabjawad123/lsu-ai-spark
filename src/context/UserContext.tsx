
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

type VideoProgress = {
  [moduleId: string]: {
    [topicId: string]: boolean;
  }
};

type QuizScore = {
  [moduleId: string]: number;
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
  setQuizScore: (moduleId: string, score: number) => void;
  getQuizScore: (moduleId: string) => number;
  quizScores: QuizScore;
  areAllTopicsCompleted: (moduleId: string, totalTopics: number) => boolean;
  getTotalProgress: () => number;
  canGetCertificate: () => boolean;
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
  const [quizScores, setQuizScores] = useState<QuizScore>({});
  const [unlockedModules, setUnlockedModules] = useState<string[]>(["ai-fundamentals"]);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Load user data from localStorage on initial render
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedProgress = localStorage.getItem('userProgress');
    const storedQuizScores = localStorage.getItem('quizScores');
    const storedUnlockedModules = localStorage.getItem('unlockedModules');
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    
    if (storedProgress) {
      setUserProgress(JSON.parse(storedProgress));
    }
    
    if (storedQuizScores) {
      setQuizScores(JSON.parse(storedQuizScores));
    }
    
    if (storedUnlockedModules) {
      setUnlockedModules(JSON.parse(storedUnlockedModules));
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('userProgress', JSON.stringify(userProgress));
  }, [userProgress]);

  useEffect(() => {
    localStorage.setItem('quizScores', JSON.stringify(quizScores));
  }, [quizScores]);

  useEffect(() => {
    localStorage.setItem('unlockedModules', JSON.stringify(unlockedModules));
  }, [unlockedModules]);

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
  
  const areAllTopicsCompleted = (moduleId: string, totalTopics: number): boolean => {
    if (!userProgress[moduleId]) return false;
    
    const completedTopics = Object.values(userProgress[moduleId]).filter(completed => completed).length;
    return completedTopics === totalTopics;
  };

  const setQuizScore = (moduleId: string, score: number) => {
    setQuizScores(prev => ({
      ...prev,
      [moduleId]: score
    }));
  };

  const getQuizScore = (moduleId: string): number => {
    return quizScores[moduleId] || 0;
  };

  const getTotalProgress = (): number => {
    const moduleOrder = ["ai-fundamentals", "machine-learning", "prompt-engineering", "ai-ethics"];
    let completedModules = 0;
    
    for (const moduleId of moduleOrder) {
      if (quizScores[moduleId] && quizScores[moduleId] > 0) {
        completedModules++;
      }
    }
    
    return moduleOrder.length > 0 ? (completedModules / moduleOrder.length) * 100 : 0;
  };

  const canGetCertificate = (): boolean => {
    const moduleOrder = ["ai-fundamentals", "machine-learning", "prompt-engineering", "ai-ethics"];
    return moduleOrder.every(moduleId => quizScores[moduleId] && quizScores[moduleId] > 0);
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
    completeModule,
    setQuizScore,
    getQuizScore,
    quizScores,
    areAllTopicsCompleted,
    getTotalProgress,
    canGetCertificate
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
