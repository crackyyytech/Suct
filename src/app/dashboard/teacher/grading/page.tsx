
"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { gradingData, type Submission } from "@/lib/grading-data";
import { FileCheck, Search, User } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { getAvatarColor } from "@/lib/utils";

const SubmissionRow = ({ submission }: { submission: Submission }) => {
  const router = useRouter();
  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarFallback className={getAvatarColor(submission.studentName)}>
              <User className="h-6 w-6" />
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{submission.studentName}</p>
            <p className="text-xs text-muted-foreground">
              {submission.courseName}
            </p>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <p className="font-medium">{submission.assignmentTitle}</p>
        <p className="text-xs text-muted-foreground">
          Submitted {submission.submittedAt}
        </p>
      </TableCell>
      <TableCell className="text-center">
        {submission.status === "Graded" ? (
          <Badge variant="secondary" className="bg-green-100 border-green-300 text-green-800 dark:bg-green-900/50 dark:border-green-700 dark:text-green-300">
            Graded ({submission.score}%)
          </Badge>
        ) : (
          <Badge variant="destructive" className="bg-yellow-100 border-yellow-300 text-yellow-800 dark:bg-yellow-900/50 dark:border-yellow-700 dark:text-yellow-300">
            Ungraded
          </Badge>
        )}
      </TableCell>
      <TableCell className="text-right">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => router.push(`/dashboard/teacher/grading/${submission.id}`)}
        >
          {submission.status === "Graded" ? "View" : "Grade"}
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default function GradingPage() {
  const [submissions, setSubmissions] = useState<Submission[]>(gradingData);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSubmissions = useMemo(() => {
    return submissions.filter(submission =>
        submission.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        submission.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        submission.assignmentTitle.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [submissions, searchTerm]);
  
  const ungradedSubmissions = filteredSubmissions.filter(s => s.status === 'Ungraded');
  const gradedSubmissions = filteredSubmissions.filter(s => s.status === 'Graded');

  return (
    <main className="p-4 md:p-6 lg:p-8">
      <div className="flex items-center gap-4 mb-6">
        <FileCheck className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">Grading</h1>
          <p className="text-muted-foreground">
            Review and grade student submissions.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Submissions</CardTitle>
          <CardDescription>
            A list of all recent assignment submissions from your students.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <Tabs defaultValue="ungraded">
                <div className="flex justify-between items-center mb-4">
                    <TabsList>
                        <TabsTrigger value="ungraded">To-Do ({ungradedSubmissions.length})</TabsTrigger>
                        <TabsTrigger value="graded">Completed ({gradedSubmissions.length})</TabsTrigger>
                    </TabsList>
                    <div className="relative w-full max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input 
                            placeholder="Search submissions..." 
                            className="pl-10"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                         />
                    </div>
                </div>
                <TabsContent value="ungraded">
                    <div className="border rounded-md">
                        <Table>
                        <TableHeader>
                            <TableRow>
                            <TableHead>Student</TableHead>
                            <TableHead>Assignment</TableHead>
                            <TableHead className="text-center">Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {ungradedSubmissions.length > 0 ? (
                                ungradedSubmissions.map((sub) => <SubmissionRow key={sub.id} submission={sub} />)
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center h-24">
                                        {searchTerm ? "No submissions found for your search." : "All caught up! No submissions to grade."}
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                        </Table>
                    </div>
                </TabsContent>
                <TabsContent value="graded">
                    <div className="border rounded-md">
                        <Table>
                        <TableHeader>
                            <TableRow>
                            <TableHead>Student</TableHead>
                            <TableHead>Assignment</TableHead>
                            <TableHead className="text-center">Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {gradedSubmissions.length > 0 ? (
                                gradedSubmissions.map((sub) => <SubmissionRow key={sub.id} submission={sub} />)
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center h-24">
                                       {searchTerm ? "No submissions found for your search." : "No graded submissions yet."}
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                        </Table>
                    </div>
                </TabsContent>
            </Tabs>
        </CardContent>
      </Card>
    </main>
  );
}
