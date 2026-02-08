
"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { formatDistanceToNow } from 'date-fns';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Users, Search, ChevronDown, User } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { students as allStudents, type StudentProfile } from "@/lib/demo-data";
import { getAvatarColor } from "@/lib/utils";
import { AddStudentDialog } from "@/components/add-student-dialog";


export default function TeacherStudentsPage() {
  const [students, setStudents] = useState<StudentProfile[]>(allStudents);
  const [searchTerm, setSearchTerm] = useState("");
  const [classFilter, setClassFilter] = useState("All Classes");
  
  const router = useRouter();

  const handleAddStudent = (newStudent: StudentProfile) => {
    setStudents(prevStudents => [newStudent, ...prevStudents]);
  };

  const availableClasses = useMemo(() => {
    const uniqueClasses = [...new Set(students.map((s) => s.class))].sort((a, b) => {
        const numA = parseInt(a.split(' ')[1]);
        const numB = parseInt(b.split(' ')[1]);
        return numA - numB;
    });
    return ["All Classes", ...uniqueClasses];
  }, [students]);

  const studentClasses = useMemo(() => {
      // Sort classes like "Class 1", "Class 10" correctly
      return [...new Set(students.map((s) => s.class))].sort((a, b) => {
        const numA = parseInt(a.split(' ')[1]);
        const numB = parseInt(b.split(' ')[1]);
        return numA - numB;
      });
  }, [students])

  const filteredStudents = useMemo(() => {
    return students
      .filter((student) =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter((student) =>
        classFilter === "All Classes" ? true : student.class === classFilter
      );
  }, [students, searchTerm, classFilter]);


  return (
    <main className="p-4 md:p-6 lg:p-8">
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <Users className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">My Students</h1>
            <p className="text-muted-foreground">
              View and manage student information.
            </p>
          </div>
        </div>
        <AddStudentDialog 
          classes={studentClasses}
          onStudentAdded={handleAddStudent}
          currentStudents={students}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Students</CardTitle>
          <CardDescription>
            A list of all students in your classes.
          </CardDescription>
          <div className="flex items-center gap-4 pt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search students..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  {classFilter} <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {availableClasses.map((c) => (
                  <DropdownMenuItem key={c} onSelect={() => setClassFilter(c)}>
                    {c}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student Name</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Overall Progress</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Last Active
                  </TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback className={getAvatarColor(student.name)}>
                                <User className="h-6 w-6" />
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{student.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {student.studentId}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{student.class}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress
                            value={student.overallProgress}
                            className="h-2 w-24"
                          />
                          <span>{student.overallProgress}%</span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {formatDistanceToNow(new Date(student.lastActive), { addSuffix: true })}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            router.push(
                              `/dashboard/teacher/students/${student.id}`
                            )
                          }
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      No students found.
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
