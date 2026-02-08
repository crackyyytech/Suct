
"use client";

import { useParams, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { gradingData } from "@/lib/grading-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ChevronLeft, FileText, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getAvatarColor } from "@/lib/utils";

export default function GradeSubmissionPage() {
    const router = useRouter();
    const { id } = useParams();
    const { toast } = useToast();
    const submissionId = id as string;

    const submission = useMemo(() => {
        return gradingData.find(s => s.id === submissionId);
    }, [submissionId]);

    const [score, setScore] = useState(submission?.score?.toString() || '');
    const [feedback, setFeedback] = useState('');

    if (!submission) {
        return (
            <main className="p-8">
                <Card className="w-full max-w-md mx-auto text-center">
                    <CardHeader>
                        <CardTitle>Submission Not Found</CardTitle>
                        <CardDescription>The submission you are looking for could not be found.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button onClick={() => router.push('/dashboard/admin/grading')}>
                            <ChevronLeft className="mr-2 h-4 w-4" />
                            Back to Grading
                        </Button>
                    </CardContent>
                </Card>
            </main>
        );
    }
    
    const handleGradeSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, you would update the data source here.
        // For this demo, we just show a toast and navigate back.
        toast({
            title: "Grade Submitted",
            description: `Score of ${score}% for ${submission.studentName} has been saved.`,
        });
        router.push('/dashboard/admin/grading');
    }

    return (
        <main className="p-4 md:p-6 lg:p-8">
            <div className="flex items-center gap-4 mb-6">
                <Button variant="outline" size="icon" onClick={() => router.push('/dashboard/admin/grading')}>
                    <ChevronLeft className="h-4 w-4" />
                </Button>
                <div>
                    <h1 className="text-3xl font-bold">Grade Submission</h1>
                    <p className="text-muted-foreground">Reviewing assignment for {submission.studentName}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>{submission.assignmentTitle}</CardTitle>
                            <CardDescription>Submitted {submission.submittedAt}</CardDescription>
                        </CardHeader>
                        <CardContent>
                           <div className="aspect-video bg-muted rounded-md flex items-center justify-center p-8 border-2 border-dashed">
                                <div className="text-center text-muted-foreground">
                                    <FileText className="mx-auto h-16 w-16" />
                                    <p className="mt-4 font-semibold">Submission Content Area</p>
                                    <p className="text-sm">In a real application, the student's submitted document or text would be displayed here for review.</p>
                                </div>
                           </div>
                        </CardContent>
                    </Card>
                </div>
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                             <CardTitle>Student Details</CardTitle>
                        </CardHeader>
                        <CardContent className="flex items-center gap-4">
                            <Avatar className="h-12 w-12">
                                <AvatarFallback className={getAvatarColor(submission.studentName)}>
                                    <User className="h-6 w-6" />
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-semibold">{submission.studentName}</p>
                                <p className="text-sm text-muted-foreground">{submission.courseName}</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <form onSubmit={handleGradeSubmit}>
                            <CardHeader>
                                <CardTitle>Enter Grade</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="score">Score (%)</Label>
                                    <Input 
                                        id="score" 
                                        type="number" 
                                        placeholder="Enter score 0-100" 
                                        value={score}
                                        onChange={(e) => setScore(e.target.value)}
                                        required 
                                        min="0"
                                        max="100"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="feedback">Feedback (Optional)</Label>
                                    <Textarea 
                                        id="feedback" 
                                        placeholder="Provide constructive feedback for the student..."
                                        value={feedback}
                                        onChange={(e) => setFeedback(e.target.value)}
                                        rows={5}
                                    />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button type="submit" className="w-full">
                                    {submission.status === 'Graded' ? 'Update Grade' : 'Submit Grade'}
                                </Button>
                            </CardFooter>
                        </form>
                    </Card>
                </div>
            </div>
        </main>
    );
}
