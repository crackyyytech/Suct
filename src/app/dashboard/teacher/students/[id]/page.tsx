
"use client";

import { useRouter, useParams } from "next/navigation";
import { useMemo } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, Book, CheckCircle, Award, User } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { students } from "@/lib/demo-data";
import { cn, getAvatarColor } from "@/lib/utils";


function StudentProfileSkeleton() {
    return (
        <main className="p-4 md:p-6 lg:p-8">
            <header className="flex items-center gap-4 mb-6">
                <Skeleton className="h-10 w-10" />
                <div className="flex items-center gap-4">
                    <Skeleton className="h-16 w-16 rounded-full" />
                    <div className="space-y-2">
                        <Skeleton className="h-8 w-48" />
                        <Skeleton className="h-4 w-32" />
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                <Card><CardContent className="p-6"><Skeleton className="h-12 w-full" /></CardContent></Card>
                <Card><CardContent className="p-6"><Skeleton className="h-12 w-full" /></CardContent></Card>
                <Card><CardContent className="p-6"><Skeleton className="h-12 w-full" /></CardContent></Card>
            </div>

            <Card>
                <CardHeader>
                    <Skeleton className="h-6 w-1/3" />
                    <Skeleton className="h-4 w-1/2" />
                </CardHeader>
                <CardContent className="text-center text-muted-foreground py-8">
                    <p>Loading course information...</p>
                </CardContent>
            </Card>
        </main>
    )
}


export default function StudentProfilePage() {
    const router = useRouter();
    const { id } = useParams();
    const studentId = id as string;

    const student = useMemo(() => {
        return students.find(s => s.id === studentId);
    }, [studentId]);


    if (!student) {
        return (
            <main className="flex items-center justify-center h-full p-8">
                <Card className="w-full max-w-md text-center">
                    <CardHeader>
                        <CardTitle>Student Not Found</CardTitle>
                        <CardDescription>The student you are looking for does not exist.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button onClick={() => router.push('/dashboard/teacher/students')}>
                            <ChevronLeft className="mr-2 h-4 w-4" />
                            Back to Students List
                        </Button>
                    </CardContent>
                </Card>
            </main>
        );
    }
    
    const statCards = [
        { title: "Overall Progress", value: `${student.overallProgress}%`, icon: Award },
        { title: "Courses Completed", value: 'N/A', icon: CheckCircle },
        { title: "Enrolled Courses", value: 'N/A', icon: Book },
    ];

    return (
        <main className="p-4 md:p-6 lg:p-8">
            <header className="flex items-center gap-4 mb-6">
                <Button variant="outline" size="icon" onClick={() => router.push('/dashboard/teacher/students')}>
                    <ChevronLeft className="h-4 w-4" />
                </Button>
                <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16 border">
                        <AvatarFallback className={cn("text-2xl", getAvatarColor(student.name))}>
                            <User className="h-8 w-8" />
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <h1 className="text-3xl font-bold">{student.name}</h1>
                        <p className="text-muted-foreground">{student.studentId} • {student.class}</p>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                {statCards.map(stat => (
                     <Card key={stat.title}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                           <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                           <stat.icon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                           <div className="text-2xl font-bold">{String(stat.value)}</div>
                           {stat.title === "Overall Progress" && <Progress value={student.overallProgress} className="h-2 mt-2" />}
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Enrolled Courses</CardTitle>
                    <CardDescription>An overview of {student.name}'s learning journey.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="text-center text-muted-foreground py-8">
                        <p>Course enrollment data is not available in this view.</p>
                    </div>
                </CardContent>
            </Card>
        </main>
    );
}
