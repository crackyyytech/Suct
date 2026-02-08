export interface Assignment {
  id: string;
  title: string;
  description: string;
  subject: string;
  class: string;
  chapter?: string;
  teacherId: string;
  teacherName: string;
  dueDate: string;
  maxPoints: number;
  type: 'essay' | 'multiple_choice' | 'project' | 'presentation' | 'practical';
  status: 'draft' | 'published' | 'closed';
  instructions: string;
  attachments?: AssignmentAttachment[];
  rubric?: AssignmentRubric;
  createdAt: string;
  updatedAt: string;
}

export interface AssignmentAttachment {
  id: string;
  name: string;
  url: string;
  type: 'pdf' | 'doc' | 'image' | 'video' | 'other';
  size: number;
}

export interface AssignmentRubric {
  id: string;
  criteria: RubricCriterion[];
  totalPoints: number;
}

export interface RubricCriterion {
  id: string;
  name: string;
  description: string;
  maxPoints: number;
  levels: RubricLevel[];
}

export interface RubricLevel {
  id: string;
  name: string;
  description: string;
  points: number;
}

export interface Submission {
  id: string;
  assignmentId: string;
  studentId: string;
  studentName: string;
  content: string;
  attachments?: SubmissionAttachment[];
  submittedAt: string;
  status: 'draft' | 'submitted' | 'graded' | 'returned';
  grade?: Grade;
  feedback?: string;
  lateSubmission: boolean;
}

export interface SubmissionAttachment {
  id: string;
  name: string;
  url: string;
  type: 'pdf' | 'doc' | 'image' | 'video' | 'other';
  size: number;
}

export interface Grade {
  id: string;
  submissionId: string;
  teacherId: string;
  totalPoints: number;
  earnedPoints: number;
  percentage: number;
  letterGrade: string;
  rubricScores?: RubricScore[];
  feedback: string;
  gradedAt: string;
}

export interface RubricScore {
  criterionId: string;
  levelId: string;
  points: number;
  feedback?: string;
}