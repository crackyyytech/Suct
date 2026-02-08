
"use client";

import { useParams, useRouter } from "next/navigation";
import { useMemo } from "react";
import { ChevronLeft, User, BarChart2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { curriculumData } from "@/lib/curriculum-data";
import { students as allStudents } from "@/lib/demo-data";
import { getAvatarColor } from "@/lib/utils";

export default function TeacherCourseManagementPage() {
    const router = useRouter();
    const { id } = useParams();
    const courseId = id as string;

    const { course, courseClass } = useMemo(() => {
        for (const collection of curriculumData) {
            const foundSubject = collection.subjects.find(s => s.course_id === courseId);
            if (foundSubject) {
                return { course: foundSubject, courseClass: collection.class };
            }
        }
        return { course: null, courseClass: null };
    }, [courseId]);

    const enrolledStudents = useMemo(() => {
        if (!courseClass) return [];
        return allStudents.filter(student => student.class === courseClass);
    }, [courseClass]);

    if (!course) {
        return (
            <div className="p-8 text-center">
                <p>Course not found.</p>
                <Button onClick={() => router.push('/dashboard/teacher/courses')} className="mt-4">
                    Back to Courses
                </Button>
            </div>
        );
    }

    return (
        <main className="p-4 md:p-6 lg:p-8">
            <div className="flex items-center gap-4 mb-6">
                <Button variant="outline" size="icon" onClick={() => router.push('/dashboard/teacher/courses')}>
                    <ChevronLeft className="h-4 w-4" />
                </Button>
                <div>
                    <h1 className="text-3xl font-bold">{course.subject_name}</h1>
                    <p className="text-muted-foreground">Management for {courseClass}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Enrolled Students</CardTitle>
                        <User className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{enrolledStudents.length}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Average Progress</CardTitle>
                        <BarChart2 className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {enrolledStudents.length > 0 ? 
                                `${Math.round(enrolledStudents.reduce((acc, s) => acc + s.overallProgress, 0) / enrolledStudents.length)}%`
                                : 'N/A'
                            }
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Student Roster</CardTitle>
                    <CardDescription>
                        Students enrolled in {course.subject_name} for {courseClass}.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="border rounded-md">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Student Name</TableHead>
                                    <TableHead>Student ID</TableHead>
                                    <TableHead>Progress</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {enrolledStudents.length > 0 ? (
                                    enrolledStudents.map((student) => (
                                        <TableRow key={student.id}>
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <Avatar>
                                                        <AvatarFallback className={getAvatarColor(student.name)}>
                                                            <User className="h-6 w-6" />
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <p className="font-medium">{student.name}</p>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-muted-foreground">{student.studentId}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Progress value={student.overallProgress} className="h-2 w-24" />
                                                    <span>{student.overallProgress}%</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Button variant="ghost" size="sm" onClick={() => router.push(`/dashboard/teacher/students/${student.id}`)}>
                                                    View Profile
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={4} className="h-24 text-center">
                                            No students found for this class.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </main>
    );
}
