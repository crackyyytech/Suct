"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { 
  ChevronLeft, 
  User, 
  Calendar, 
  Clock, 
  FileText, 
  Save,
  AlertTriangle,
  CheckCircle,
  BookOpen
} from "lucide-react";
import { getSubmissionById, getAssignmentById } from "@/lib/assignment-data";
import { gradingData } from "@/lib/grading-data";
import { format } from "date-fns";
import { getAvatarColor } from "@/lib/utils";

export default function GradingDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const submissionId = params.id as string;
  
  const [score, setScore] = useState<string>("");
  const [feedback, setFeedback] = useState<string>("");
  const [isGrading, setIsGrading] = useState(false);
  
  // Try to get from assignment data first, then fallback to grading data
  let submission = getSubmissionById(submissionId);
  let assignment = submission ? getAssignmentById(submission.assignmentId) : null;
  
  // Fallback to grading data if not found in assignment data
  if (!submission) {
    const gradingSubmission = gradingData.find(s => s.id === submissionId);
    if (gradingSubmission) {
      submission = {
        id: gradingSubmission.id,
        assignmentId: 'fallback',
        studentId: gradingSubmission.studentName.toLowerCase().replace(' ', ''),
        studentName: gradingSubmission.studentName,
        content: `This is a sample submission for ${gradingSubmission.assignmentTitle}. The student has submitted their work on time and it appears to be complete. This is placeholder content for demonstration purposes.`,
        submittedAt: gradingSubmission.submittedAt,
        status: gradingSubmission.status === 'Graded' ? 'graded' : 'submitted',
        lateSubmission: false,
        grade: gradingSubmission.status === 'Graded' ? {
          id: 'grade-' + gradingSubmission.id,
          submissionId: gradingSubmission.id,
          teacherId: 'teacher01',
          totalPoints: 100,
          earnedPoints: gradingSubmission.score || 0,
          percentage: gradingSubmission.score || 0,
          letterGrade: getLetterGrade(gradingSubmission.score || 0),
          feedback: 'Good work! Keep it up.',
          gradedAt: new Date().toISOString(),
        } : undefined
      };
      
      assignment = {
        id: 'fallback',
        title: gradingSubmission.assignmentTitle,
        description: `Assignment for ${gradingSubmission.courseName}`,
        subject: gradingSubmission.courseName,
        class: 'Class 10',
        teacherId: 'teacher01',
        teacherName: 'Current Teacher',
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        maxPoints: 100,
        type: 'essay',
        status: 'published',
        instructions: 'Complete the assignment as instructed.',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
    }
  }

  useEffect(() => {
    if (submission?.grade) {
      setScore(submission.grade.earnedPoints.toString());
      setFeedback(submission.grade.feedback);
    }
  }, [submission]);

  function getLetterGrade(percentage: number): string {
    if (percentage >= 90) return 'A';
    if (percentage >= 80) return 'B';
    if (percentage >= 70) return 'C';
    if (percentage >= 60) return 'D';
    return 'F';
  }

  const handleSaveGrade = async () => {
    if (!score || !feedback.trim()) {
      toast({
        title: "Missing Information",
        description: "Please provide both a score and feedback.",
        variant: "destructive",
      });
      return;
    }

    const numericScore = parseInt(score);
    if (isNaN(numericScore) || numericScore < 0 || numericScore > (assignment?.maxPoints || 100)) {
      toast({
        title: "Invalid Score",
        description: `Score must be between 0 and ${assignment?.maxPoints || 100}.`,
        variant: "destructive",
      });
      return;
    }

    setIsGrading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Grade Saved",
        description: "The grade has been saved successfully.",
      });
      setIsGrading(false);
      router.push('/dashboard/teacher/grading');
    }, 1000);
  };

  if (!submission || !assignment) {
    return (
      <div className="p-4 md:p-6 lg:p-8">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">Submission Not Found</h1>
        </div>
        <Card>
          <CardContent className="p-8 text-center">
            <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Submission Not Found</h3>
            <p className="text-muted-foreground">The requested submission could not be found.</p>
            <Button className="mt-4" onClick={() => router.push('/dashboard/teacher/grading')}>
              Back to Grading
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const isLate = submission.lateSubmission;
  const isGraded = submission.status === 'graded';
  const percentage = submission.grade ? (submission.grade.earnedPoints / submission.grade.totalPoints) * 100 : 0;

  return (
    <div className="p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{assignment.title}</h1>
          <p className="text-muted-foreground">{assignment.subject} • {assignment.class}</p>
        </div>
        <div className="flex items-center gap-2">
          {isLate && (
            <Badge variant="destructive">Late Submission</Badge>
          )}
          <Badge variant={isGraded ? "default" : "secondary"}>
            {isGraded ? "Graded" : "Pending"}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Student Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback className={getAvatarColor(submission.studentName)}>
                    <User className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold">{submission.studentName}</h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Submitted {format(new Date(submission.submittedAt), 'MMM dd, yyyy')}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {format(new Date(submission.submittedAt), 'h:mm a')}
                    </div>
                  </div>
                </div>
              </CardTitle>
            </CardHeader>
          </Card>

          {/* Assignment Instructions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Assignment Instructions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{assignment.description}</p>
              <div className="bg-muted/50 p-4 rounded-lg">
                <pre className="whitespace-pre-wrap text-sm">{assignment.instructions}</pre>
              </div>
            </CardContent>
          </Card>

          {/* Student Submission */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Student Submission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted/30 p-4 rounded-lg border-l-4 border-primary">
                <div className="prose prose-sm max-w-none dark:prose-invert">
                  <pre className="whitespace-pre-wrap text-sm leading-relaxed">
                    {submission.content}
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Grading Sidebar */}
        <div className="space-y-6">
          {/* Current Grade (if graded) */}
          {isGraded && submission.grade && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  Current Grade
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-primary">
                    {submission.grade.earnedPoints}/{submission.grade.totalPoints}
                  </div>
                  <div className="text-lg text-muted-foreground">
                    {percentage.toFixed(1)}% ({submission.grade.letterGrade})
                  </div>
                </div>
                <Separator className="my-4" />
                <div>
                  <Label className="text-sm font-medium">Previous Feedback:</Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    {submission.grade.feedback}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Grading Form */}
          <Card>
            <CardHeader>
              <CardTitle>
                {isGraded ? "Update Grade" : "Grade Submission"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="score">Score (out of {assignment.maxPoints})</Label>
                <Input
                  id="score"
                  type="number"
                  min="0"
                  max={assignment.maxPoints}
                  value={score}
                  onChange={(e) => setScore(e.target.value)}
                  placeholder="Enter score"
                />
              </div>
              
              <div>
                <Label htmlFor="feedback">Feedback</Label>
                <Textarea
                  id="feedback"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Provide detailed feedback for the student..."
                  className="min-h-[120px]"
                />
              </div>

              <Button 
                onClick={handleSaveGrade} 
                disabled={isGrading}
                className="w-full"
              >
                {isGrading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    {isGraded ? "Update Grade" : "Save Grade"}
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Assignment Details */}
          <Card>
            <CardHeader>
              <CardTitle>Assignment Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Type:</span>
                <span className="capitalize">{assignment.type}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Max Points:</span>
                <span>{assignment.maxPoints}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Due Date:</span>
                <span>{format(new Date(assignment.dueDate), 'MMM dd, yyyy')}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Status:</span>
                <Badge variant="outline" className="text-xs">
                  {assignment.status}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}