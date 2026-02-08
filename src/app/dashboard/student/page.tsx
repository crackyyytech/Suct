
"use client";

import { useMemo, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Book,
  CheckCircle2,
  Clock,
  ArrowRight,
  Award,
  User,
  Play,
  BookOpen,
  Target,
  TrendingUp,
  Video,
  FileText,
  Star,
  Calendar,
  BarChart3
} from "lucide-react";
import { UpcomingEventsWidget } from '@/components/upcoming-events-widget';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { curriculumData } from "@/lib/curriculum-data";
import { enhancedCurriculumData } from "@/lib/enhanced-curriculum-data";
import { kalviTVContent } from "@/services/youtube-kalvi";
import { educationalContentAggregator } from "@/services/educational-content-aggregator";
import { assessmentService } from "@/services/assessment-service";
import { Skeleton } from "@/components/ui/skeleton";
import { students, type StudentProfile } from "@/lib/demo-data";
import { cn, getAvatarColor } from "@/lib/utils";

// Mock data for things not yet in the database
const leaderboardRanks = {
    overall: { rank: 4, total: 5 },
    class: { rank: 4, total: 5 },
};

const StatCard = ({ stat }: { stat: { title: string; value: string; icon: React.ElementType, color: string, bgColor: string } }) => (
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

function StudentDashboardSkeleton() {
  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-8 animate-pulse">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Skeleton className="h-16 w-16 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-4 w-48" />
          </div>
        </div>
        <Skeleton className="h-10 w-40 rounded-md" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Skeleton className="h-24 w-full rounded-lg" />
        <Skeleton className="h-24 w-full rounded-lg" />
        <Skeleton className="h-24 w-full rounded-lg" />
      </div>
       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-1/4 rounded-md" />
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                <Skeleton className="h-12 w-full rounded-md" />
                <Skeleton className="h-12 w-full rounded-md" />
                <Skeleton className="h-12 w-full rounded-md" />
              </CardContent>
            </Card>
          </div>
          <div className="space-y-8">
            <Skeleton className="h-48 w-full rounded-lg" />
          </div>
        </div>
    </div>
  )
}

export default function StudentDashboardPage() {
  const router = useRouter();
  const [student, setStudent] = useState<StudentProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [kalviContent, setKalviContent] = useState<any[]>([]);
  const [assessments, setAssessments] = useState<any[]>([]);
  const [contentStats, setContentStats] = useState<any>(null);

  useEffect(() => {
    // Try to get student data from localStorage first
    const studentDataStr = localStorage.getItem('studentData');
    const studentId = localStorage.getItem('studentId');
    
    if (studentDataStr) {
      try {
        const studentData = JSON.parse(studentDataStr);
        setStudent(studentData);
        loadStudentContent(studentData);
      } catch (error) {
        console.error('Error parsing student data:', error);
        // Fallback to finding by ID
        if (studentId) {
          const studentData = students.find(s => s.id === studentId);
          if (studentData) {
            setStudent(studentData);
            localStorage.setItem('studentData', JSON.stringify(studentData));
            loadStudentContent(studentData);
          }
        }
      }
    } else if (studentId) {
      const studentData = students.find(s => s.id === studentId);
      if (studentData) {
        setStudent(studentData);
        localStorage.setItem('studentData', JSON.stringify(studentData));
        loadStudentContent(studentData);
      } else {
        router.push('/login/student');
      }
    } else {
      // No student data, redirect to login
      router.push('/login/student');
    }
    setLoading(false);
  }, [router]);

  const loadStudentContent = (studentData: StudentProfile) => {
    // Load Kalvi TV content for student's class
    const classContent = kalviTVContent.filter(playlist => 
      playlist.class === studentData.class
    );
    setKalviContent(classContent);

    // Load assessments for student's class
    const classAssessments = assessmentService.getAssessmentsByClass(studentData.class);
    setAssessments(classAssessments.slice(0, 3)); // Show top 3

    // Get content statistics
    const stats = educationalContentAggregator.getContentStatistics(studentData.class);
    setContentStats(stats);
  };

  const enrolledCourses = useMemo(() => {
      if (!student) return [];
      const courseCollection = curriculumData.find(c => c.class === student.class && c.medium === "English");
      return courseCollection?.subjects || [];
  }, [student]);

  const enhancedCourses = useMemo(() => {
    if (!student) return [];
    const courseCollection = enhancedCurriculumData.find(c => c.class === student.class);
    return courseCollection?.subjects || [];
  }, [student]);

  const recentVideos = useMemo(() => {
    return kalviContent.flatMap(playlist => 
      playlist.videos.slice(0, 2)
    ).slice(0, 4);
  }, [kalviContent]);

  if (loading || !student) {
    return <StudentDashboardSkeleton />;
  }
  
  const stats = [
    { 
      title: "Video Content Available", 
      value: `${contentStats?.totalResources || 800}+`, 
      icon: Video, 
      color: "text-red-500", 
      bgColor: "bg-red-100 dark:bg-red-900/50" 
    },
    { 
      title: "Assessments Available", 
      value: `${assessments.length * 10}+`, 
      icon: FileText, 
      color: "text-green-500", 
      bgColor: "bg-green-100 dark:bg-green-900/50" 
    },
    { 
      title: "Learning Hours", 
      value: "150+", 
      icon: Clock, 
      color: "text-purple-500", 
      bgColor: "bg-purple-100 dark:bg-purple-900/50" 
    },
    { 
      title: "Overall Progress", 
      value: `${student.overallProgress}%`, 
      icon: Award, 
      color: "text-blue-500", 
      bgColor: "bg-blue-100 dark:bg-blue-900/50" 
    },
  ];

  return (
    <>
      <div className="p-4 md:p-6 lg:p-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className={cn("text-2xl", getAvatarColor(student.name))}>
                  <User className="h-8 w-8" />
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold">{student.name}</h1>
              <p className="text-muted-foreground">{student.class} • {student.studentId}</p>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="secondary">Kalvi TV Official</Badge>
                <Badge variant="outline">Samacheer Kalvi</Badge>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => router.push('/dashboard/student/video')}>
              <Video className="mr-2 h-4 w-4" />
              Watch Videos
            </Button>
            <Button onClick={() => router.push('/dashboard/student/courses')}>
              Browse Courses
            </Button>
          </div>
        </div>

        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map(stat => <StatCard key={stat.title} stat={stat} />)}
        </div>

        {/* Kalvi TV Content Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Featured Kalvi TV Videos */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Play className="h-5 w-5 text-red-500" />
                  Featured Kalvi TV Videos
                </CardTitle>
                <Button variant="ghost" size="sm" onClick={() => router.push('/dashboard/student/video')}>
                  View All <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentVideos.length > 0 ? recentVideos.map(video => (
                  <Card key={video.id} className="bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer"
                        onClick={() => router.push(`/dashboard/student/video?videoId=${video.id}`)}>
                    <CardContent className="p-4 flex items-center gap-4">
                      <div className="relative">
                        <img 
                          src={video.thumbnailUrl} 
                          alt={video.title}
                          className="w-20 h-14 object-cover rounded-md"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-md">
                          <Play className="h-6 w-6 text-white" />
                        </div>
                      </div>
                      <div className="flex-grow">
                        <p className="font-semibold text-sm line-clamp-2">{video.title}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary" className="text-xs">{video.subject}</Badge>
                          <Badge variant="outline" className="text-xs">{video.duration}</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {video.viewCount.toLocaleString()} views • {video.channelName}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Video className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Loading Kalvi TV content...</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions & Stats */}
          <div className="space-y-6">
            {/* Content Statistics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Learning Resources
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Video Lessons</span>
                  <span className="font-semibold">{contentStats?.totalResources || 800}+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Subjects</span>
                  <span className="font-semibold">{Object.keys(contentStats?.resourcesBySubject || {}).length || 15}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Languages</span>
                  <span className="font-semibold">Tamil + English</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Average Rating</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{contentStats?.averageRating?.toFixed(1) || '4.5'}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Assessment */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Quick Assessment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Test your knowledge with our comprehensive assessment system
                </p>
                <Button className="w-full" onClick={() => router.push('/dashboard/student/quiz')}>
                  <FileText className="mr-2 h-4 w-4" />
                  Take Quiz
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Enhanced Courses Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* My Enrolled Courses */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                My Enrolled Courses
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {enrolledCourses.length > 0 ? enrolledCourses.slice(0, 3).map(course => {
                const enhancedCourse = enhancedCourses.find(ec => ec.subject_name === course.subject_name);
                const videoCount = kalviContent.find(kc => 
                  kc.subject === course.subject_name || 
                  kc.subject === enhancedCourse?.subject_name
                )?.videoCount || 0;
                
                return (
                  <Card key={course.course_id} className="bg-muted/30 hover:bg-muted/50 transition-colors">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold">{course.subject_name}</h3>
                        <Badge variant="secondary">{videoCount}+ videos</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                        {enhancedCourse?.overview || course.overview}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Progress value={Math.random() * 100} className="w-20 h-2" />
                          <span className="text-xs text-muted-foreground">
                            {Math.floor(Math.random() * 100)}%
                          </span>
                        </div>
                        <Button variant="outline" size="sm" 
                                onClick={() => router.push(`/dashboard/student/course?subjectId=${course.course_id}&name=${encodeURIComponent(course.subject_name)}`)}>
                          Continue <ArrowRight className="ml-1 h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              }) : (
                <div className="text-center py-8 text-muted-foreground">
                  <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No courses enrolled yet</p>
                  <Button variant="link" onClick={() => router.push('/dashboard/student/courses')}>
                    Browse Courses
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Upcoming Events Widget */}
          <div className="space-y-6">
            <UpcomingEventsWidget 
              userId={student?.studentId}
              userRole="student"
              maxItems={4}
            />

            {/* Recent Assessments */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Available Assessments
                </CardTitle>
              </CardHeader>
            <CardContent className="space-y-4">
              {assessments.length > 0 ? assessments.map(assessment => (
                <Card key={assessment.id} className="bg-muted/30 hover:bg-muted/50 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-sm">{assessment.title}</h3>
                      <Badge variant={assessment.type === 'quiz' ? 'default' : 'secondary'}>
                        {assessment.type}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                      {assessment.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>{assessment.questions.length} questions</span>
                        <span>{assessment.duration} min</span>
                        <span>{assessment.totalMarks} marks</span>
                      </div>
                      <Button variant="outline" size="sm"
                              onClick={() => router.push(`/dashboard/student/quiz?assessmentId=${assessment.id}`)}>
                        Start <ArrowRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )) : (
                <div className="text-center py-8 text-muted-foreground">
                  <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No assessments available</p>
                </div>
              )}
            </CardContent>
          </Card>
          </div>
        </div>

        {/* Learning Progress Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Learning Progress Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-500 mb-2">
                  {kalviContent.length}
                </div>
                <p className="text-sm text-muted-foreground">Subjects Available</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-500 mb-2">
                  {kalviContent.reduce((acc, playlist) => acc + playlist.videoCount, 0)}+
                </div>
                <p className="text-sm text-muted-foreground">Total Video Lessons</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-500 mb-2">
                  {assessments.length * 5}+
                </div>
                <p className="text-sm text-muted-foreground">Practice Questions</p>
              </div>
            </div>
            <div className="mt-6 flex justify-center">
              <Button onClick={() => router.push('/dashboard/student/video')} className="mr-4">
                <Play className="mr-2 h-4 w-4" />
                Start Learning
              </Button>
              <Button variant="outline" onClick={() => router.push('/dashboard/student/leaderboard')}>
                <Award className="mr-2 h-4 w-4" />
                View Leaderboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
