
'use client';

import { useState, useEffect, Suspense, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { generateQuiz, type QuizOutput } from '@/ai/flows/quiz-flow';
import { curriculumData } from '@/lib/curriculum-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, XCircle, ChevronLeft, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Skeleton } from './ui/skeleton';

function QuizViewComponent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const courseName = searchParams.get('courseName');
  const subjectId = searchParams.get('subjectId');
  const chapterId = searchParams.get('chapterId');

  const [quizData, setQuizData] = useState<QuizOutput | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswerId, setSelectedAnswerId] = useState<string | null>(null);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [quizFinished, setQuizFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes for the quiz

  const chapter = useMemo(() => {
    if (!subjectId || !chapterId) return null;
    const subject = curriculumData.flatMap(c => c.subjects).find(s => s.course_id === subjectId);
    return subject?.chapters.find(c => c.chapter_id === chapterId);
  }, [subjectId, chapterId]);

  useEffect(() => {
    if (!chapter) {
      setIsLoading(false);
      return;
    };

    const fetchQuiz = async () => {
      try {
        setIsLoading(true);
        // MOCK QUIZ to avoid expired API key error
        const mockQuiz: QuizOutput = {
            id: 'quiz-mock-1',
            title: `Mock Quiz for ${chapter.chapter_title}`,
            questions: [
                {
                    id: 'q-1',
                    question: 'This is a mock question because the AI API key has expired. What is the primary color of the sky?',
                    options: [
                        { id: 'opt-1', text: 'Blue' },
                        { id: 'opt-2', text: 'Green' },
                        { id: 'opt-3', text: 'Red' },
                        { id: 'opt-4', text: 'Yellow' },
                    ],
                    correctAnswerId: 'opt-1',
                },
                {
                    id: 'q-2',
                    question: 'This is another mock question. What is 2 + 2?',
                    options: [
                        { id: 'opt-1', text: '3' },
                        { id: 'opt-2', text: '4' },
                        { id: 'opt-3', text: '5' },
                        { id: 'opt-4', text: '6' },
                    ],
                    correctAnswerId: 'opt-2',
                },
                {
                    id: 'q-3',
                    question: 'Renew your Google AI API key to get real quizzes. Which planet is known as the Red Planet?',
                    options: [
                        { id: 'opt-1', text: 'Earth' },
                        { id: 'opt-2', text: 'Mars' },
                        { id: 'opt-3', text: 'Jupiter' },
                        { id: 'opt-4', text: 'Saturn' },
                    ],
                    correctAnswerId: 'opt-2',
                },
                {
                    id: 'q-4',
                    question: 'Final mock question. What is the capital of France?',
                    options: [
                        { id: 'opt-1', text: 'London' },
                        { id: 'opt-2', text: 'Berlin' },
                        { id: 'opt-3', text: 'Paris' },
                        { id: 'opt-4', text: 'Madrid' },
                    ],
                    correctAnswerId: 'opt-3',
                },
            ]
        };
        setTimeout(() => {
            setQuizData(mockQuiz);
            setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Failed to generate quiz:", error);
      }
    };

    fetchQuiz();
  }, [chapter]);


  // Timer useEffect
  useEffect(() => {
    if (quizFinished || isLoading) return;

    if (timeLeft === 0) {
      finishQuiz();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, quizFinished, isLoading]);

  const handleBackToCourse = () => {
    if (subjectId && courseName) {
      router.push(`/dashboard/student/course?subjectId=${subjectId}&name=${encodeURIComponent(courseName)}`);
    } else {
      router.push('/dashboard/student/courses');
    }
  }

  if (isLoading) {
    return <QuizLoadingSkeleton />;
  }

  if (!quizData || !chapter) {
    return (
      <Card className="w-full max-w-2xl text-center">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Quiz not available</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            We couldn't generate a quiz for this chapter. Please try again later.
          </p>
          <Button onClick={handleBackToCourse} size="lg" className="w-full">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to course
          </Button>
        </CardContent>
      </Card>
    );
  }

  const { questions } = quizData;
  const totalQuestions = questions.length;
  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  const handleNextQuestion = () => {
    const newAnswers = [...userAnswers, selectedAnswerId!];
    setUserAnswers(newAnswers);
    setSelectedAnswerId(null);

    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      finishQuiz(newAnswers);
    }
  };
  
  const finishQuiz = (finalAnswers?: string[]) => {
    const answersToScore = finalAnswers || [...userAnswers, selectedAnswerId!].filter(a => a);
    while(answersToScore.length < totalQuestions) {
        answersToScore.push("");
    }
    setUserAnswers(answersToScore);
    setQuizFinished(true);
  };

  const score = userAnswers.reduce((total, answer, index) => {
    return index < questions.length && answer === questions[index].correctAnswerId ? total + 1 : total;
  }, 0);
  
  const wrongAnswers = quizFinished ? totalQuestions - score : 0;

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  if (quizFinished) {
    return (
      <Card className="w-full max-w-2xl text-center">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Quiz Results for {chapter.chapter_title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-5xl font-bold text-primary">
            {score} / {totalQuestions}
          </div>
          <div className="flex justify-around">
            <div className="flex items-center gap-2 text-green-500">
              <CheckCircle className="h-8 w-8" />
              <div>
                <div className="text-2xl font-bold">{score}</div>
                <div className="text-muted-foreground">Correct</div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-destructive">
              <XCircle className="h-8 w-8" />
              <div>
                <div className="text-2xl font-bold">{wrongAnswers}</div>
                <div className="text-muted-foreground">Wrong</div>
              </div>
            </div>
          </div>
          <Button onClick={handleBackToCourse} size="lg" className="w-full">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to course
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-2xl">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="icon" onClick={handleBackToCourse}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <h1 className="text-2xl font-bold">{quizData.title}</h1>
            </div>
            <div className="text-lg font-semibold text-primary">{formatTime(timeLeft)}</div>
          </div>
          <Progress value={progress} className="w-full" />
          <p className="text-sm text-muted-foreground mt-2">
            Question {currentQuestionIndex + 1} of {totalQuestions}
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">{currentQuestion.question}</h2>
            <div className="grid grid-cols-1 gap-4">
              {currentQuestion.options.map((option, index) => (
                <Button
                  key={option.id}
                  variant="outline"
                  size="lg"
                  className={cn(
                    "justify-start h-auto py-4 text-left whitespace-normal",
                    selectedAnswerId === option.id && "bg-primary/20 border-primary"
                  )}
                  onClick={() => setSelectedAnswerId(option.id)}
                >
                  <span className="font-bold mr-4">{String.fromCharCode(65 + index)}.</span>
                  <span>{option.text}</span>
                </Button>
              ))}
            </div>
            <Button
              onClick={handleNextQuestion}
              disabled={!selectedAnswerId}
              className="w-full"
              size="lg"
            >
              {currentQuestionIndex < totalQuestions - 1 ? 'Next' : 'Finish Quiz'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

const QuizLoadingSkeleton = () => (
    <Card className="w-full max-w-2xl text-center">
        <CardHeader>
            <CardTitle className="text-2xl font-bold">Generating Your Quiz...</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center space-y-4 p-12">
            <Loader2 className="h-16 w-16 animate-spin text-primary" />
            <p className="text-muted-foreground">Please wait while our AI creates a personalized quiz for you.</p>
        </CardContent>
    </Card>
);

function QuizViewSkeleton() {
    return (
        <Card className="w-full max-w-2xl">
            <CardHeader>
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-4">
                        <Skeleton className="h-10 w-10" />
                        <Skeleton className="h-8 w-48" />
                    </div>
                    <Skeleton className="h-8 w-16" />
                </div>
                <Skeleton className="h-4 w-full" />
            </CardHeader>
            <CardContent className="space-y-6">
                <Skeleton className="h-8 w-3/4" />
                <div className="space-y-4">
                    <Skeleton className="h-16 w-full" />
                    <Skeleton className="h-16 w-full" />
                    <Skeleton className="h-16 w-full" />
                    <Skeleton className="h-16 w-full" />
                </div>
                <Skeleton className="h-12 w-full" />
            </CardContent>
        </Card>
    )
}

export function QuizView() {
  return (
    <Suspense fallback={<QuizViewSkeleton />}>
      <QuizViewComponent />
    </Suspense>
  )
}

    