
"use client";

import { curriculumData, type Subject } from "@/lib/curriculum-data";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Book, PlayCircle, Star, BrainCircuit } from "lucide-react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useRouter } from "next/navigation";

const studentClassInfo = {
  className: "Class 1",
  medium: "English"
};

// Get student class from localStorage if available
function getStudentClass() {
  if (typeof window !== "undefined") {
    const studentDataStr = localStorage.getItem('studentData');
    if (studentDataStr) {
      try {
        const studentData = JSON.parse(studentDataStr);
        return {
          className: studentData.class || "Class 1",
          medium: "English"
        };
      } catch (error) {
        console.error('Error parsing student data:', error);
      }
    }
  }
  return studentClassInfo;
}


const SubjectCard = ({ subject }: { subject: Subject }) => {
    const router = useRouter();
    
    const subjectImageId = `teacher-course-${subject.subject_name.toLowerCase().split(' ')[0].replace(/[^a-z]/g, '')}`;
    const subjectImage = PlaceHolderImages.find(img => img.id === subjectImageId);

    return (
        <Card>
            <CardHeader className="flex flex-row items-start gap-4">
                {subjectImage ? (
                     <Image src={subjectImage.imageUrl} alt={subject.subject_name} width={100} height={100} className="rounded-lg object-cover" data-ai-hint={subjectImage.imageHint}/>
                ) : (
                  <div className="w-[100px] h-[100px] bg-muted rounded-lg flex items-center justify-center">
                    <Book className="w-8 h-8 text-muted-foreground" />
                  </div>
                )}
                <div>
                    <CardTitle>{subject.subject_name}</CardTitle>
                    <CardDescription>{subject.overview}</CardDescription>
                </div>
            </CardHeader>
            <CardContent>
                <Accordion type="single" collapsible className="w-full">
                    {subject.chapters.sort((a, b) => a.chapter_order - b.chapter_order).map((chapter, index) => (
                        <AccordionItem value={`item-${index}`} key={chapter.chapter_id}>
                            <AccordionTrigger>
                                <div className="flex items-center gap-3 text-left">
                                     <span className="text-primary font-bold">{chapter.chapter_order}.</span>
                                     <span className="font-semibold">{chapter.chapter_title}</span>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent>
                               <div className="flex flex-col gap-4 p-2 rounded-md bg-muted/50">
                                   <p className="text-muted-foreground">{chapter.summary}</p>
                                   <div>
                                       <h4 className="font-semibold flex items-center gap-2 mb-2"><Star className="w-4 h-4 text-yellow-500" /> Key Topics</h4>
                                       <ul className="list-disc list-inside text-muted-foreground text-sm space-y-1">
                                            {chapter.key_topics.map(topic => <li key={topic}>{topic}</li>)}
                                       </ul>
                                   </div>
                                    <div>
                                       <h4 className="font-semibold flex items-center gap-2 mb-2"><BrainCircuit className="w-4 h-4 text-blue-500" /> Learning Outcomes</h4>
                                       <ul className="list-disc list-inside text-muted-foreground text-sm space-y-1">
                                            {chapter.learning_outcomes.map(outcome => <li key={outcome}>{outcome}</li>)}
                                       </ul>
                                   </div>
                                   <Button className="self-start" onClick={() => router.push(`/dashboard/student/course?subjectId=${subject.course_id}&name=${encodeURIComponent(subject.subject_name)}`)}>
                                        <PlayCircle className="mr-2" /> Start Course
                                   </Button>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
                 {subject.chapters.length === 0 && <p className="text-muted-foreground text-center p-4">No chapters available for this subject yet.</p>}
            </CardContent>
        </Card>
    )
}


export default function StudentCoursesPage() {
    const currentStudentClass = getStudentClass();
    const courseCollection = curriculumData.find(c => c.class === currentStudentClass.className && c.medium === currentStudentClass.medium);
    const subjects = courseCollection?.subjects || [];

    return (
        <main className="p-4 md:p-6 lg:p-8">
            <div className="flex items-center gap-4 mb-6">
                <Book className="h-8 w-8 text-primary" />
                <div>
                  <h1 className="text-3xl font-bold">Browse Courses</h1>
                  <p className="text-muted-foreground">{currentStudentClass.className} - {currentStudentClass.medium} Medium</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {subjects.length > 0 ? (
                    subjects.map(subject => (
                        <SubjectCard key={subject.course_id} subject={subject} />
                    ))
                ) : (
                    <div className="col-span-2 text-center py-12">
                        <Book className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-xl font-semibold mb-2">No courses found</h3>
                        <p className="text-muted-foreground">Courses for {currentStudentClass.className} will be available soon.</p>
                    </div>
                )}
            </div>
        </main>
    )
}
