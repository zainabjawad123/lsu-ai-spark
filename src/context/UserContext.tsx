
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
  getUserLevel: () => string;
  completedLevels: string[];
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
  const [completedLevels, setCompletedLevels] = useState<string[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Module structure by level
  const modulesByLevel = {
    beginner: ["ai-fundamentals", "machine-learning", "prompt-engineering", "ai-ethics"],
    intermediate: ["deep-learning", "computer-vision", "nlp", "ai-applications"],
    advanced: ["data-privacy", "future-ai", "responsible-ai", "ai-research"]
  };

  // Load user data from localStorage on initial render
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedProgress = localStorage.getItem('userProgress');
    const storedQuizScores = localStorage.getItem('quizScores');
    const storedUnlockedModules = localStorage.getItem('unlockedModules');
    const storedCompletedLevels = localStorage.getItem('completedLevels');
    
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
    
    if (storedCompletedLevels) {
      setCompletedLevels(JSON.parse(storedCompletedLevels));
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

  useEffect(() => {
    localStorage.setItem('completedLevels', JSON.stringify(completedLevels));
  }, [completedLevels]);

  // Check if level is completed whenever quiz scores change
  useEffect(() => {
    Object.entries(modulesByLevel).forEach(([level, modules]) => {
      // Check if all modules in this level have quiz scores > 0
      const isLevelCompleted = modules.every(moduleId => quizScores[moduleId] && quizScores[moduleId] > 0);
      
      if (isLevelCompleted && !completedLevels.includes(level)) {
        // Level completed, add to completed levels
        setCompletedLevels(prev => [...prev, level]);
        
        // Unlock first module of next level if available
        if (level === "beginner" && !unlockedModules.includes("deep-learning")) {
          setUnlockedModules(prev => [...prev, "deep-learning"]);
          toast({
            title: "New Level Unlocked!",
            description: "You've unlocked the Intermediate level. Start exploring new modules!",
          });
        } else if (level === "intermediate" && !unlockedModules.includes("data-privacy")) {
          setUnlockedModules(prev => [...prev, "data-privacy"]);
          toast({
            title: "New Level Unlocked!",
            description: "You've unlocked the Advanced level. Start exploring new modules!",
          });
        }
        
        toast({
          title: "Level Completed!",
          description: `Congratulations! You've completed the ${level} level and earned a certificate.`,
        });
      }
    });
  }, [quizScores, completedLevels, unlockedModules, toast]);

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

  const getUserLevel = (): string => {
    // Find the current user level based on unlocked modules
    if (unlockedModules.some(moduleId => modulesByLevel.advanced.includes(moduleId))) {
      return "advanced";
    } else if (unlockedModules.some(moduleId => modulesByLevel.intermediate.includes(moduleId))) {
      return "intermediate";
    } else {
      return "beginner";
    }
  };

  const getTotalProgress = (): number => {
    // Calculate progress based on all available modules across all levels
    const allModules = [...modulesByLevel.beginner, ...modulesByLevel.intermediate, ...modulesByLevel.advanced];
    let completedModules = 0;
    
    for (const moduleId of allModules) {
      if (quizScores[moduleId] && quizScores[moduleId] > 0) {
        completedModules++;
      }
    }
    
    return allModules.length > 0 ? (completedModules / allModules.length) * 100 : 0;
  };

  const canGetCertificate = (): boolean => {
    return completedLevels.length > 0;
  };

  const completeModule = (moduleId: string) => {
    // Logic to determine which module to unlock next
    const currentLevel = getUserLevel();
    const currentLevelModules = modulesByLevel[currentLevel as keyof typeof modulesByLevel];
    
    if (!currentLevelModules) return;
    
    const currentIndex = currentLevelModules.indexOf(moduleId);
    
    if (currentIndex >= 0 && currentIndex < currentLevelModules.length - 1) {
      const nextModule = currentLevelModules[currentIndex + 1];
      
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
    canGetCertificate,
    getUserLevel,
    completedLevels
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
