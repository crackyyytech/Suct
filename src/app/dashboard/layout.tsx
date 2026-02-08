
"use client";

import { SidebarProvider, Sidebar, SidebarInset, SidebarHeader, SidebarTrigger, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter } from "@/components/ui/sidebar";
import { Home, List, Settings, LogOut, BookCopy, Trophy, Users, BookOpen, FileCheck, Calendar, User, Video, Edit3 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NotificationSystem } from "@/components/notification-system";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useUser, useFirebase } from "@/firebase";
import { signOut } from "firebase/auth";
import { getAvatarColor } from "@/lib/utils";

function DashboardSkeleton() {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center justify-between p-2">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-7 w-7" />
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <Skeleton className="h-8 w-full" />
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Skeleton className="h-8 w-full" />
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Skeleton className="h-8 w-full" />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <div className="flex items-center gap-3 p-2">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="flex flex-col gap-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-3 w-12" />
            </div>
          </div>
          <SidebarMenu>
            <SidebarMenuItem>
              <Skeleton className="h-8 w-full" />
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Skeleton className="h-8 w-full" />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <div className="p-8">
            <Skeleton className="h-10 w-64 mb-6" />
            <Skeleton className="w-full h-96" />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { auth } = useFirebase();
  const { user, loading: userLoading } = useUser();
  
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const segments = pathname.split('/');
    const potentialRoleFromUrl = segments.length > 2 && ['student', 'teacher', 'admin'].includes(segments[2]) ? segments[2] : null;

    if (potentialRoleFromUrl) {
      if (typeof window !== "undefined" && localStorage.getItem('userRole') !== potentialRoleFromUrl) {
        localStorage.setItem('userRole', potentialRoleFromUrl);
      }
      setRole(potentialRoleFromUrl);
    } else {
      const roleFromStorage = typeof window !== "undefined" ? localStorage.getItem('userRole') : null;
      if (roleFromStorage) {
        setRole(roleFromStorage);
      } else {
        setRole('student');
      }
    }
  }, [pathname]);

  const handleLogout = () => {
    if (auth) {
        signOut(auth).then(() => {
            if (typeof window !== "undefined") {
                localStorage.removeItem('userRole');
            }
            router.push('/');
        });
    } else {
        // Fallback for mock auth
        if (typeof window !== "undefined") {
            localStorage.removeItem('userRole');
        }
        router.push('/');
    }
  }
  
  if (userLoading || !role) {
    return <DashboardSkeleton />;
  }

  const roleName = role.charAt(0).toUpperCase() + role.slice(1);
  const displayName = user?.displayName || "Demo User";

  const dashboardLink = `/dashboard/${role}`;
  const isDashboardActive = pathname === dashboardLink;

  // Admin states
  const isSubjectsActive = pathname.startsWith('/dashboard/admin/subjects');
  const isUsersActive = pathname.startsWith('/dashboard/admin/users');
  const isAdminGradingActive = pathname.startsWith('/dashboard/admin/grading');
  const isAdminScheduleActive = pathname.startsWith('/dashboard/admin/schedule');
  const isContentManagementActive = pathname.startsWith('/dashboard/admin/content-management');
  const isCurriculumEditorActive = pathname.startsWith('/dashboard/admin/curriculum-editor');

  // Teacher states
  const isTeacherStudentsActive = pathname.startsWith('/dashboard/teacher/students');
  const isTeacherCoursesActive = pathname.startsWith('/dashboard/teacher/courses');
  const isTeacherGradingActive = pathname.startsWith('/dashboard/teacher/grading');
  const isTeacherScheduleActive = pathname.startsWith('/dashboard/teacher/schedule');

  // Student states
  const isStudentLeaderboardActive = pathname.startsWith('/dashboard/student/leaderboard');
  const isStudentCoursesActive = pathname.startsWith('/dashboard/student/courses') || pathname.startsWith('/dashboard/student/course') || pathname.startsWith('/dashboard/student/video') || pathname.startsWith('/dashboard/student/quiz');
  const isStudentScheduleActive = pathname.startsWith('/dashboard/student/schedule');
  
  // Common states
  const isSettingsActive = pathname.startsWith('/dashboard/settings');


  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center justify-between p-2">
             <Link href={dashboardLink} className="flex items-center gap-2">
                <h1 className="text-xl font-semibold">EduConnect</h1>
             </Link>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isDashboardActive}>
                <Link href={dashboardLink}>
                  <Home />
                  Dashboard
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            
            {role === 'admin' && (
              <>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={isCurriculumEditorActive}>
                    <Link href="/dashboard/admin/curriculum-editor">
                      <Edit3 />
                      Curriculum Editor
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={isContentManagementActive}>
                    <Link href="/dashboard/admin/content-management">
                      <Video />
                      Content Management
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={isSubjectsActive}>
                    <Link href="/dashboard/admin/subjects">
                      <BookCopy />
                      Subjects
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={isUsersActive}>
                    <Link href="/dashboard/admin/users">
                      <Users />
                      Users
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={isAdminGradingActive}>
                    <Link href="/dashboard/admin/grading">
                      <FileCheck />
                      Grading
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={isAdminScheduleActive}>
                    <Link href="/dashboard/admin/schedule">
                      <Calendar />
                      Schedule
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </>
            )}

            {role === 'teacher' && (
              <>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={isTeacherStudentsActive}>
                    <Link href="/dashboard/teacher/students">
                      <Users />
                      Students
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={isTeacherCoursesActive}>
                    <Link href="/dashboard/teacher/courses">
                      <BookOpen />
                      Courses
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                 <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={isTeacherGradingActive}>
                    <Link href="/dashboard/teacher/grading">
                      <FileCheck />
                      Grading
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                 <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={isTeacherScheduleActive}>
                    <Link href="/dashboard/teacher/schedule">
                      <Calendar />
                      Schedule
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </>
            )}

            {role === 'student' && (
              <>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={isStudentCoursesActive}>
                    <Link href="/dashboard/student/courses">
                      <List />
                      Courses
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={isStudentScheduleActive}>
                    <Link href="/dashboard/student/schedule">
                      <Calendar />
                      Schedule
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={isStudentLeaderboardActive}>
                    <Link href="/dashboard/student/leaderboard">
                      <Trophy />
                      Leaderboard
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </>
            )}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
            <div className="flex items-center gap-3 p-2">
                <Avatar>
                  <AvatarFallback className={getAvatarColor(displayName)}>
                    <User className="h-6 w-6" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                    <span className="font-semibold">{displayName}</span>
                    <span className="text-xs text-muted-foreground">{roleName}</span>
                </div>
            </div>
             <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isSettingsActive}>
                      <Link href="/dashboard/settings">
                        <Settings />
                        Settings
                      </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/" onClick={(e) => { e.preventDefault(); handleLogout(); }}>
                        <LogOut />
                        Logout
                      </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
             </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <div className="flex flex-col h-full">
          <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-14 items-center justify-between px-4">
              <SidebarTrigger />
              <NotificationSystem />
            </div>
          </header>
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
