
"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useMemo, useState } from "react";
import { ChevronLeft, BookText, FileText, Trophy, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { curriculumData, type Chapter, type Subject } from "@/lib/curriculum-data";

const ChapterListItem = ({ chapter, courseName, subjectId }: { chapter: Chapter; courseName: string; subjectId: string }) => {
  const router = useRouter();

  const handleStartLesson = () => {
    router.push(`/dashboard/student/video?chapterId=${chapter.chapter_id}&subjectId=${subjectId}&courseName=${encodeURIComponent(courseName)}`);
  };

  return (
    <Card className="bg-card/50 border-border/50 hover:border-primary/50 transition-colors">
      <CardContent className="p-4 flex items-center gap-4">
        <div className="flex-shrink-0 w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
            <BookText className="h-8 w-8 text-muted-foreground" />
        </div>
        <div className="flex-grow">
          <h3 className="font-semibold text-lg">{chapter.chapter_order}. {chapter.chapter_title}</h3>
          <p className="text-muted-foreground text-sm line-clamp-2">{chapter.summary}</p>
        </div>
        <Button size="sm" variant="ghost" className="bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary" onClick={handleStartLesson}>Start</Button>
      </CardContent>
    </Card>
  );
};

function CoursePageComponent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const courseName = searchParams.get('name') || 'Course';
  const subjectId = searchParams.get('subjectId');
  const [notes, setNotes] = useState("");
  const { toast } = useToast();

  const subject = useMemo(() => 
    curriculumData.flatMap(c => c.subjects).find(s => s.course_id === subjectId), 
  [subjectId]);

  const chapters = useMemo(() => subject?.chapters.sort((a,b) => a.chapter_order - b.chapter_order) || [], [subject]);

  const handleSaveNotes = () => {
    toast({
      title: "Notes Saved",
      description: "Your notes have been saved successfully.",
    });
  };
  
  if (!subject) {
      return (
          <div className="flex items-center justify-center h-96">
              <p className="text-muted-foreground">Course not found.</p>
          </div>
      )
  }

  return (
    <div className="bg-background text-foreground min-h-screen">
      <div className="max-w-4xl mx-auto p-4 md:p-6">
        <header className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
             <Button variant="outline" size="icon" onClick={() => router.push('/dashboard/student/courses')}>
                <ChevronLeft className="h-6 w-6" />
             </Button>
             <h1 className="text-3xl font-bold">
                {courseName}
             </h1>
          </div>
        </header>

        <Tabs defaultValue="lessons" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-card h-12">
            <TabsTrigger value="lessons" className="h-10">
              <BookText className="mr-2" /> Lessons
            </TabsTrigger>
            <TabsTrigger value="notes" className="h-10">
              <FileText className="mr-2" /> Notes
            </TabsTrigger>
            <TabsTrigger value="quiz" className="h-10">
              <Trophy className="mr-2" /> Quiz
            </TabsTrigger>
            <TabsTrigger value="leaderboard" className="h-10">
              <Users className="mr-2" /> Leaderboard
            </TabsTrigger>
          </TabsList>
          <TabsContent value="lessons" className="mt-6">
            <div className="space-y-4">
              {chapters
                .map((chapter) => (
                <ChapterListItem key={chapter.chapter_id} chapter={chapter} courseName={courseName} subjectId={subject.course_id} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="notes" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>My Notes for {courseName}</CardTitle>
                <CardDescription>
                  Jot down key points, questions, and ideas from the course materials.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Start typing your notes here..."
                  className="min-h-[300px] resize-y text-base"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveNotes}>Save Notes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="quiz" className="mt-6">
            <Card>
                <CardHeader>
                    <CardTitle>Quizzes for {courseName}</CardTitle>
                    <CardDescription>Test your knowledge on a per-chapter basis.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {chapters.length > 0 ? (
                        chapters.map(chapter => (
                            <Card key={chapter.chapter_id} className="bg-card/50">
                                <CardContent className="p-4 flex items-center justify-between">
                                    <div>
                                        <h3 className="font-semibold">{chapter.chapter_order}. {chapter.chapter_title}</h3>
                                        <p className="text-sm text-muted-foreground">Take a short quiz on this chapter.</p>
                                    </div>
                                    <Button onClick={() => router.push(`/dashboard/student/quiz?courseName=${encodeURIComponent(courseName || '')}&subjectId=${subjectId}&chapterId=${chapter.chapter_id}`)}>
                                        Start Quiz <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </CardContent>
                            </Card>
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center text-center gap-4 h-48">
                            <Trophy className="h-12 w-12 text-primary" />
                            <h3 className="text-xl font-semibold">No Quizzes Available</h3>
                            <p className="text-muted-foreground">Quizzes will appear here once chapters are available.</p>
                        </div>
                    )}
                </CardContent>
            </Card>
          </TabsContent>
           <TabsContent value="leaderboard" className="mt-6">
               <Card>
                <CardContent className="p-6 flex flex-col items-center justify-center text-center gap-4 h-48">
                    <Trophy className="h-12 w-12 text-primary" />
                    <h3 className="text-xl font-semibold">View The Leaderboard</h3>
                    <p className="text-muted-foreground">See how you stack up against other students in your class and overall.</p>
                    <Button onClick={() => router.push(`/dashboard/student/leaderboard`)}>
                        View Leaderboard <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </CardContent>
              </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function CoursePageSkeleton() {
    return (
        <div className="max-w-4xl mx-auto p-4 md:p-6">
            <header className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-4">
                    <Skeleton className="h-10 w-10" />
                    <Skeleton className="h-9 w-40" />
                </div>
            </header>
            <Skeleton className="h-12 w-full" />
            <div className="mt-6 space-y-4">
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
            </div>
        </div>
    )
}

export default function CoursePage() {
    return (
        <Suspense fallback={<CoursePageSkeleton />}>
            <CoursePageComponent />
        </Suspense>
    )
}
