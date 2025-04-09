
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Play, Award } from "lucide-react";

// Mock course module data
const moduleData = {
  "ai-fundamentals": {
    title: "AI Fundamentals",
    description: "Learn the core concepts of artificial intelligence",
    topics: [
      {
        id: "intro",
        title: "Introduction to AI",
        videoUrl: "https://www.youtube.com/embed/JMUxmLyrhSk",
        description: "This lesson introduces the field of artificial intelligence, its history, and key concepts.",
        completed: false
      },
      {
        id: "types",
        title: "Types of AI Systems",
        videoUrl: "https://www.youtube.com/embed/JMUxmLyrhSk",
        description: "Learn about narrow AI, general AI, and the different classifications of AI systems.",
        completed: false
      },
      {
        id: "algorithms",
        title: "Basic AI Algorithms",
        videoUrl: "https://www.youtube.com/embed/JMUxmLyrhSk",
        description: "Understanding search algorithms, optimization, and fundamental AI approaches.",
        completed: false
      },
      {
        id: "applications",
        title: "Modern AI Applications",
        videoUrl: "https://www.youtube.com/embed/JMUxmLyrhSk",
        description: "Explore how AI is being applied in various industries today.",
        completed: false
      },
      {
        id: "future",
        title: "The Future of AI",
        videoUrl: "https://www.youtube.com/embed/JMUxmLyrhSk",
        description: "Discussions on where AI is headed and ethical considerations.",
        completed: false
      }
    ]
  },
  "machine-learning": {
    title: "Machine Learning",
    description: "Explore supervised and unsupervised learning",
    topics: [
      {
        id: "intro",
        title: "Introduction to Machine Learning",
        videoUrl: "https://www.youtube.com/embed/JMUxmLyrhSk",
        description: "This lesson introduces the field of machine learning and key concepts.",
        completed: false
      },
      {
        id: "supervised",
        title: "Supervised Learning",
        videoUrl: "https://www.youtube.com/embed/JMUxmLyrhSk",
        description: "Learn about classification, regression, and how models learn from labeled data.",
        completed: false
      },
      // Additional topics would be listed here
    ]
  }
};

// Mock quiz data
const quizData = {
  "ai-fundamentals": {
    "intro": [
      {
        question: "What is AI?",
        options: [
          "A type of computer hardware",
          "Systems that can perform tasks that typically require human intelligence",
          "A programming language",
          "Virtual reality technology"
        ],
        correctAnswer: 1
      },
      {
        question: "When was the term 'Artificial Intelligence' coined?",
        options: [
          "1930s",
          "1950s",
          "1970s",
          "1990s"
        ],
        correctAnswer: 1
      },
      {
        question: "Which of the following is NOT a common type of AI?",
        options: [
          "Machine Learning",
          "Natural Language Processing",
          "Quantum Computing",
          "Computer Vision"
        ],
        correctAnswer: 2
      }
    ]
  }
};

const LearningPage = () => {
  const { moduleId } = useParams<{ moduleId: string }>();
  const [currentTopicIndex, setCurrentTopicIndex] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [topicsCompleted, setTopicsCompleted] = useState<string[]>([]);
  
  if (!moduleId || !moduleData[moduleId as keyof typeof moduleData]) {
    return <div className="container py-12 text-center">Module not found</div>;
  }
  
  const module = moduleData[moduleId as keyof typeof moduleData];
  const currentTopic = module.topics[currentTopicIndex];
  const quiz = quizData[moduleId as keyof typeof quizData]?.[currentTopic.id];
  const progress = (topicsCompleted.length / module.topics.length) * 100;
  
  const handleTopicChange = (index: number) => {
    setCurrentTopicIndex(index);
    setShowQuiz(false);
    setQuizAnswers([]);
    setQuizSubmitted(false);
  };
  
  const handleQuizAnswer = (questionIndex: number, answerIndex: number) => {
    const newAnswers = [...quizAnswers];
    newAnswers[questionIndex] = answerIndex;
    setQuizAnswers(newAnswers);
  };
  
  const handleQuizSubmit = () => {
    setQuizSubmitted(true);
    if (!topicsCompleted.includes(currentTopic.id)) {
      setTopicsCompleted([...topicsCompleted, currentTopic.id]);
    }
  };
  
  const quizScore = quizSubmitted && quiz ? 
    quiz.reduce((score, q, index) => score + (quizAnswers[index] === q.correctAnswer ? 1 : 0), 0) :
    0;
    
  const quizPassed = quizScore >= Math.ceil(quiz?.length * 0.7);
  
  return (
    <div className="container py-12">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-lsu-purple">{module.title}</h1>
        <p className="text-gray-600 mt-2">{module.description}</p>
        
        <div className="mt-4">
          <div className="flex justify-between text-sm text-gray-700 mb-2">
            <span>{topicsCompleted.length} of {module.topics.length} topics completed</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
            <div className="p-4 bg-gray-50 border-b border-gray-200">
              <h2 className="font-semibold text-gray-800">Topics</h2>
            </div>
            <ul>
              {module.topics.map((topic, index) => (
                <li key={topic.id}>
                  <button
                    onClick={() => handleTopicChange(index)}
                    className={`w-full text-left px-4 py-3 flex items-center justify-between border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors ${
                      currentTopicIndex === index ? "bg-lsu-purple/5" : ""
                    }`}
                  >
                    <span className="flex items-center">
                      <span className={`mr-3 flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
                        topicsCompleted.includes(topic.id) ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400"
                      }`}>
                        {topicsCompleted.includes(topic.id) ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <span className="text-xs">{index + 1}</span>
                        )}
                      </span>
                      <span className={`${topicsCompleted.includes(topic.id) ? "text-gray-700" : "text-gray-600"}`}>
                        {topic.title}
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          {topicsCompleted.length === module.topics.length && (
            <div className="mt-6 bg-lsu-gold/10 p-4 rounded-lg border border-lsu-gold/30 flex flex-col items-center">
              <Award className="h-8 w-8 text-lsu-gold mb-2" />
              <h3 className="font-semibold text-gray-800 mb-1">Module Completed!</h3>
              <p className="text-sm text-gray-600 text-center mb-3">Congratulations on finishing all topics.</p>
              <Button className="bg-lsu-gold text-lsu-purple hover:bg-lsu-gold/90">
                Get Certificate
              </Button>
            </div>
          )}
        </div>
        
        <div className="lg:col-span-3">
          <Tabs defaultValue="video" className="w-full">
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="video" disabled={showQuiz}>Video Lecture</TabsTrigger>
              <TabsTrigger value="quiz" disabled={!quiz}>Quiz</TabsTrigger>
            </TabsList>
            
            <TabsContent value="video" className="mt-0">
              {!showQuiz && (
                <>
                  <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-lg shadow-md mb-6">
                    <iframe 
                      src={currentTopic.videoUrl} 
                      title={currentTopic.title}
                      className="absolute top-0 left-0 w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  
                  <div className="prose max-w-none">
                    <h2 className="text-2xl font-semibold mb-3 text-gray-800">{currentTopic.title}</h2>
                    <p className="text-gray-700 mb-6">{currentTopic.description}</p>
                    
                    {quiz && (
                      <div className="mt-8">
                        <Button 
                          onClick={() => setShowQuiz(true)}
                          className="bg-lsu-purple hover:bg-lsu-purple/90"
                        >
                          Take Quiz <Play className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </>
              )}
            </TabsContent>
            
            <TabsContent value="quiz" className="mt-0">
              {quiz && (
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h2 className="text-2xl font-semibold mb-6 text-gray-800">Quiz: {currentTopic.title}</h2>
                  
                  {!quizSubmitted ? (
                    <>
                      {quiz.map((question, qIndex) => (
                        <div key={qIndex} className="mb-8">
                          <h3 className="text-lg font-medium mb-3">
                            {qIndex + 1}. {question.question}
                          </h3>
                          <div className="space-y-2">
                            {question.options.map((option, oIndex) => (
                              <div key={oIndex}>
                                <label className="flex items-center space-x-3 p-3 rounded-md hover:bg-gray-50 cursor-pointer">
                                  <input
                                    type="radio"
                                    name={`question-${qIndex}`}
                                    checked={quizAnswers[qIndex] === oIndex}
                                    onChange={() => handleQuizAnswer(qIndex, oIndex)}
                                    className="form-radio h-5 w-5 text-lsu-purple"
                                  />
                                  <span className="text-gray-700">{option}</span>
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                      
                      <Button 
                        onClick={handleQuizSubmit}
                        disabled={quizAnswers.length < quiz.length}
                        className="bg-lsu-purple hover:bg-lsu-purple/90 mt-4"
                      >
                        Submit Quiz
                      </Button>
                    </>
                  ) : (
                    <div className="text-center py-8">
                      <div className={`text-6xl mb-4 ${quizPassed ? 'text-green-500' : 'text-amber-500'}`}>
                        {quizPassed ? '🎉' : '📝'}
                      </div>
                      <h3 className="text-2xl font-bold mb-2">
                        {quizPassed ? 'Quiz Passed!' : 'Almost there!'}
                      </h3>
                      <p className="text-xl mb-4">
                        You scored {quizScore} out of {quiz.length}
                      </p>
                      {quizPassed ? (
                        <p className="text-green-600 mb-6">
                          Congratulations! You've completed this topic.
                        </p>
                      ) : (
                        <p className="text-amber-600 mb-6">
                          Review the material and try again to improve your score.
                        </p>
                      )}
                      
                      <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Button 
                          onClick={() => {
                            setShowQuiz(false);
                            setQuizAnswers([]);
                            setQuizSubmitted(false);
                          }}
                          variant="outline"
                        >
                          Review Lecture
                        </Button>
                        
                        {currentTopicIndex < module.topics.length - 1 && (
                          <Button 
                            onClick={() => {
                              handleTopicChange(currentTopicIndex + 1);
                            }}
                            className="bg-lsu-purple hover:bg-lsu-purple/90"
                          >
                            Next Topic
                          </Button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default LearningPage;
