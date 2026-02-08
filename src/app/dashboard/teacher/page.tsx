
"use client";

import {
  Users,
  BookOpen,
  Clock,
  FileCheck,
  PlusCircle,
  ArrowRight,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useRouter } from 'next/navigation';
import { useMemo } from "react";
import { curriculumData, type Subject } from "@/lib/curriculum-data";
import { getAvatarColor } from "@/lib/utils";

const stats = [
  { title: "Total Students", value: "125", icon: Users, color: "text-blue-500", bgColor: "bg-blue-100 dark:bg-blue-900/50" },
  { title: "Total Courses", value: "8", icon: BookOpen, color: "text-purple-500", bgColor: "bg-purple-100 dark:bg-purple-900/50" },
  { title: "Hours Logged", value: "72", icon: Clock, color: "text-green-500", bgColor: "bg-green-100 dark:bg-green-900/50" },
  { title: "Assignments to Grade", value: "18", icon: FileCheck, color: "text-yellow-500", bgColor: "bg-yellow-100 dark:bg-yellow-900/50" },
];

const recentActivities = [
  { name: 'Arjun Verma', course: 'Physics', time: '5 min ago' },
  { name: 'Priya Sharma', course: 'Mathematics', time: '10 min ago' },
  { name: 'Rohan Mehta', course: 'Chemistry', time: '30 min ago' },
];

const StatCard = ({ stat }: { stat: typeof stats[0] }) => (
    <Card>
        <CardContent className="p-6 flex items-center gap-4">
            <div className={`p-3 rounded-full ${stat.bgColor}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
            <div>
                <p className="text-muted-foreground">{stat.title}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
            </div>
        </CardContent>
    </Card>
);

const CourseCard = ({ course, grade }: { course: Subject, grade: string }) => {
    const router = useRouter();
    const courseImageId = `teacher-course-${course.subject_name.toLowerCase().split(' ')[0].replace(/[^a-z]/g, '')}`;
    const courseImage = PlaceHolderImages.find(img => img.id === courseImageId);

    // Mock progress data
    const progress = useMemo(() => Math.floor(Math.random() * 50) + 25, [course.course_id]);
    const students = useMemo(() => Math.floor(Math.random() * 20) + 30, [course.course_id]);

    return (
    <Card className="overflow-hidden">
        <div className="relative h-40">
            {courseImage?.imageUrl && <Image src={courseImage.imageUrl} alt={course.subject_name} fill className="object-cover" data-ai-hint={courseImage.imageHint} />}
        </div>
        <CardHeader>
            <CardTitle>{course.subject_name}</CardTitle>
            <CardDescription>{grade}</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-muted-foreground">{students} Students</span>
                <span className="text-sm font-semibold">{progress}%</span>
            </div>
            <Progress value={progress} />
        </CardContent>
        <CardFooter>
             <Button className="w-full" onClick={() => router.push(`/dashboard/teacher/courses/${course.course_id}`)}>View Course</Button>
        </CardFooter>
    </Card>
    )
};


export default function TeacherDashboardPage() {
  const router = useRouter();
  
  const myCourses = useMemo(() => {
    const class10courses = curriculumData
        .find(c => c.class === "Class 10" && c.medium === "English")?.subjects || [];
    const class11courses = curriculumData
        .find(c => c.class === "Class 11" && c.medium === "English" && c.stream === "Science")?.subjects || [];

    return [
        ...class10courses.slice(0,2).map(s => ({subject: s, className: "Class 10"})),
        ...class11courses.slice(0,2).map(s => ({subject: s, className: "Class 11"}))
    ];
  }, []);

  return (
    <main className="p-4 md:p-6 lg:p-8 space-y-8">
       {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
            <h1 className="text-3xl font-bold">Welcome back, Teacher!</h1>
            <p className="text-muted-foreground">Here's what's happening today.</p>
        </div>
      </div>
      
       {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map(stat => <StatCard key={stat.title} stat={stat} />)}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* My Courses */}
        <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-4">
                 <h2 className="text-2xl font-bold">My Courses</h2>
                 <Button variant="ghost" onClick={() => router.push('/dashboard/teacher/courses')}>View All <ArrowRight className="ml-2 h-4 w-4" /></Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {myCourses.map(({subject, className}) => <CourseCard key={subject.course_id} course={subject} grade={className} />)}
            </div>
        </div>

        {/* Recent Activity */}
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Latest submissions from students.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {recentActivities.map((activity, index) => (
                        <div key={index} className="flex items-center gap-4">
                            <Avatar>
                                <AvatarFallback className={getAvatarColor(activity.name)}>
                                    <User className="h-6 w-6" />
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex-grow">
                                <p className="font-semibold">{activity.name}</p>
                                <p className="text-sm text-muted-foreground">{activity.course} assignment</p>
                            </div>
                             <div className="text-right">
                                <p className="text-sm text-muted-foreground">{activity.time}</p>
                                <Button variant="link" size="sm" className="p-0 h-auto">Grade</Button>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
      </div>
    </main>
  );
}
