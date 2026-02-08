
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
import { students as allStudents } from "@/lib/demo-data";
import { getAvatarColor } from "@/lib/utils";
import { curriculumData } from "@/lib/curriculum-data";
import { AddUserDialog, type NewUser } from "@/components/add-user-dialog";

const teacherProfiles = [
    { id: 'teacher-1', name: 'Alok Nath', email: 'alok.nath@example.com', role: 'Teacher', studentId: 'teacher01', class: 'N/A', overallProgress: 0, lastActive: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() },
    { id: 'teacher-2', name: 'Sunita Menon', email: 'sunita.menon@example.com', role: 'Teacher', studentId: 'teacher02', class: 'N/A', overallProgress: 0, lastActive: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() },
    { id: 'teacher-3', name: 'Rajesh Kumar', email: 'rajesh.kumar@example.com', role: 'Teacher', studentId: 'teacher03', class: 'N/A', overallProgress: 0, lastActive: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() },
];

const initialUsers = [
    ...allStudents.map(s => ({ ...s, role: 'Student' })),
    ...teacherProfiles,
] as NewUser[]; // Cast to allow adding new users of the same type

export default function AdminUsersPage() {
  const [users, setUsers] = useState(initialUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("All Roles");
  
  const router = useRouter();

  const handleAddUser = (newUser: NewUser) => {
    setUsers(prevUsers => [newUser, ...prevUsers]);
  };

  const availableRoles = ["All Roles", "Student", "Teacher"];

  const studentClasses = useMemo(() => {
    return [...new Set(curriculumData.map((c) => c.class))].sort((a, b) => {
      const numA = parseInt(a.split(' ')[1]);
      const numB = parseInt(b.split(' ')[1]);
      return numA - numB;
    });
  }, [])

  const filteredUsers = useMemo(() => {
    return users
      .filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter((user) =>
        roleFilter === "All Roles" ? true : user.role === roleFilter
      );
  }, [users, searchTerm, roleFilter]);


  return (
    <main className="p-4 md:p-6 lg:p-8">
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <Users className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">User Management</h1>
            <p className="text-muted-foreground">
              View and manage all users on the platform.
            </p>
          </div>
        </div>
        <AddUserDialog
          classes={studentClasses}
          onUserAdded={handleAddUser}
          currentUsers={users}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
          <CardDescription>
            A list of all students and teachers.
          </CardDescription>
          <div className="flex items-center gap-4 pt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search by name or email..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  {roleFilter} <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {availableRoles.map((r) => (
                  <DropdownMenuItem key={r} onSelect={() => setRoleFilter(r)}>
                    {r}
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
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Last Active
                  </TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback className={getAvatarColor(user.name)}>
                                <User className="h-6 w-6" />
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                       <TableCell>
                        <Badge variant={user.role === 'Student' ? 'secondary' : 'outline'}>{user.role}</Badge>
                      </TableCell>
                      <TableCell>
                         <p>{user.role === 'Student' ? user.class : 'N/A'}</p>
                      </TableCell>
                      <TableCell>
                        {user.role === 'Student' ? (
                            <div className="flex items-center gap-2">
                                <Progress
                                    value={user.overallProgress}
                                    className="h-2 w-24"
                                />
                                <span>{user.overallProgress}%</span>
                            </div>
                         ) : 'N/A'}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {formatDistanceToNow(new Date(user.lastActive), { addSuffix: true })}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          disabled // View action is a placeholder for now
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      No users found.
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
