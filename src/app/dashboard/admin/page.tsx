
"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { Users, BookOpen, BarChart2, UserPlus, ArrowRight, User, Video, Edit3 } from "lucide-react"
import { students } from "@/lib/demo-data"
import { curriculumData } from "@/lib/curriculum-data"
import Link from 'next/link'
import { getAvatarColor } from "@/lib/utils";
import { cn } from "@/lib/utils";

// Mock data for the dashboard
const totalStudents = students.length;
const totalTeachers = 3;
const totalCourses = [...new Set(curriculumData.flatMap(c => c.subjects.map(s => s.course_id)))].length;

const chartData = [
  { month: "Jan", signups: Math.floor(Math.random() * 50) + 10 },
  { month: "Feb", signups: Math.floor(Math.random() * 50) + 15 },
  { month: "Mar", signups: Math.floor(Math.random() * 50) + 20 },
  { month: "Apr", signups: Math.floor(Math.random() * 50) + 25 },
  { month: "May", signups: Math.floor(Math.random() * 50) + 30 },
  { month: "Jun", signups: Math.floor(Math.random() * 50) + 40 },
];

const recentUsers = [
    ...students.slice(0, 3).map(s => ({ ...s, role: 'Student' })),
    { id: 'teacher-1', name: 'Alok Nath', studentId: 'teacher01', class: 'N/A', overallProgress: 0, lastActive: new Date().toISOString(), role: 'Teacher', email: 'alok.nath@example.com'},
]

export default function AdminDashboardPage() {
  return (
    <main className="p-4 md:p-6 lg:p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Platform overview, analytics, and management tools.
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/admin/users">
            <UserPlus className="mr-2" />
            Add New User
          </Link>
        </Button>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <Link href="/dashboard/admin/curriculum-editor">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Edit3 className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle>Curriculum Editor</CardTitle>
                  <CardDescription>Add/edit subjects, chapters, and topics</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Link>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <Link href="/dashboard/admin/content-management">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Video className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle>Content Management</CardTitle>
                  <CardDescription>Manage video URLs for all classes and subjects</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Link>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <Link href="/dashboard/admin/users">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>Add, edit, or remove users from the platform</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Link>
        </Card>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStudents}</div>
            <p className="text-xs text-muted-foreground">+5 in the last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Teachers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTeachers}</div>
            <p className="text-xs text-muted-foreground">+1 in the last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Courses Available</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCourses}</div>
            <p className="text-xs text-muted-foreground">+10 since last quarter</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Progress</CardTitle>
            <BarChart2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68%</div>
            <p className="text-xs text-muted-foreground">+3% from last week</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Sign-ups Chart */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>New User Sign-ups</CardTitle>
            <CardDescription>Monthly new user registrations.</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--background))",
                    border: "1px solid hsl(var(--border))",
                  }}
                />
                <Legend wrapperStyle={{ paddingBottom: '20px' }} />
                <Bar dataKey="signups" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        {/* Recent Registrations */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Registrations</CardTitle>
             <CardDescription>
                The latest users to join the platform.
              </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentUsers.map(user => (
                 <div key={user.id} className="flex items-center gap-4">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback className={getAvatarColor(user.name)}>
                        <User className="h-5 w-5" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-medium leading-none">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                    <Badge variant={user.role === 'Student' ? 'secondary' : 'outline'}>{user.role}</Badge>
                 </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4 as-child">
                <Link href="/dashboard/admin/users" className="flex items-center w-full justify-center">
                    View All Users <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
