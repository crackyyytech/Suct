
"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { BookOpen } from "lucide-react";
import { useRouter } from "next/navigation";
import { curriculumData, type Subject } from "@/lib/curriculum-data";
import { useMemo } from "react";

const teacherClasses = ["Class 10", "Class 11", "Class 12"];

const CourseCard = ({ course, grade, stream }: { course: Subject; grade: string; stream?: string }) => {
    const router = useRouter();
    const courseImageId = `teacher-course-${course.subject_name.toLowerCase().split(' ')[0].replace(/[^a-z]/g, '')}`;
    const courseImage = PlaceHolderImages.find(img => img.id === courseImageId);

    // Mock data for demonstration
    const progress = useMemo(() => Math.floor(Math.random() * 50) + 25, [course.course_id]);
    const students = useMemo(() => Math.floor(Math.random() * 20) + 30, [course.course_id]);

    const handleManage = () => {
        router.push(`/dashboard/teacher/courses/${course.course_id}`);
    }

    const handleViewContent = () => {
        router.push(`/dashboard/student/course?subjectId=${course.course_id}&name=${encodeURIComponent(course.subject_name)}`);
    }

    return (
        <Card className="overflow-hidden flex flex-col">
            <div className="relative h-40 w-full">
                {courseImage?.imageUrl && <Image src={courseImage.imageUrl} alt={course.subject_name} fill className="object-cover" data-ai-hint={courseImage.imageHint} />}
            </div>
            <CardHeader>
                <CardTitle>{course.subject_name}</CardTitle>
                <CardDescription>{stream ? `${grade} - ${stream}` : grade}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">{students} Students</span>
                    <span className="text-sm font-semibold">{progress}% Complete</span>
                </div>
                <Progress value={progress} />
            </CardContent>
            <CardFooter className="flex gap-2">
                 <Button className="w-full" variant="outline" onClick={handleManage}>Manage</Button>
                 <Button className="w-full" onClick={handleViewContent}>View Content</Button>
            </CardFooter>
        </Card>
    );
};

export default function TeacherCoursesPage() {
    const coursesByClass = useMemo(() => {
        const grouped: { [key: string]: { subject: Subject; className: string; stream?: 'Science' | 'Commerce' | 'Arts' | 'General'; }[] } = {};

        const teacherCourseCollections = curriculumData.filter(collection => 
            teacherClasses.includes(collection.class) && collection.medium === "English"
        );

        teacherCourseCollections.forEach(collection => {
            if (!grouped[collection.class]) {
                grouped[collection.class] = [];
            }
            collection.subjects.forEach(subject => {
                grouped[collection.class].push({
                    subject: subject,
                    className: collection.class,
                    stream: collection.stream
                });
            });
        });

        return grouped;
    }, []);

    const sortedClasses = Object.keys(coursesByClass).sort((a, b) => parseInt(a.split(' ')[1]) - parseInt(b.split(' ')[1]));

    return (
        <main className="p-4 md:p-6 lg:p-8">
            <div className="flex items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-4">
                    <BookOpen className="h-8 w-8 text-primary" />
                    <div>
                        <h1 className="text-3xl font-bold">My Courses</h1>
                        <p className="text-muted-foreground">Manage and review your course materials.</p>
                    </div>
                </div>
            </div>
            
            <div className="space-y-8">
                {sortedClasses.map(className => (
                    <div key={className}>
                        <h2 className="text-2xl font-bold mb-4">{className}</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {coursesByClass[className].map(({subject, stream}) => (
                                <CourseCard 
                                    key={subject.course_id} 
                                    course={subject}
                                    grade={className} 
                                    stream={stream}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}
