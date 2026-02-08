
export type Submission = {
  id: string;
  studentName: string;
  assignmentTitle: string;
  courseName: string;
  submittedAt: string; // ISO string or formatted string
  status: 'Graded' | 'Ungraded';
  score?: number;
};

export const gradingData: Submission[] = [
  {
    id: 'sub-1',
    studentName: 'Arjun Verma',
    assignmentTitle: 'Chapter 1: Laws of Motion - Problem Set',
    courseName: 'Physics',
    submittedAt: '2 days ago',
    status: 'Ungraded',
  },
  {
    id: 'sub-2',
    studentName: 'Priya Sharma',
    assignmentTitle: 'Chapter 1: Relations and Functions - Exercise 1.1',
    courseName: 'Mathematics',
    submittedAt: '1 day ago',
    status: 'Ungraded',
  },
  {
    id: 'sub-3',
    studentName: 'Rohan Mehta',
    assignmentTitle: 'Essay: The Causes of World War I',
    courseName: 'Social Science',
    submittedAt: '5 hours ago',
    status: 'Ungraded',
  },
    {
    id: 'sub-4',
    studentName: 'Sneha Patel',
    assignmentTitle: 'Lab Report: Titration Experiment',
    courseName: 'Chemistry',
    submittedAt: '3 days ago',
    status: 'Graded',
    score: 88,
  },
   {
    id: 'sub-5',
    studentName: 'Vikram Singh',
    assignmentTitle: 'Chapter 2: The Castle - Poem Analysis',
    courseName: 'English',
    submittedAt: '4 days ago',
    status: 'Graded',
    score: 92,
  },
];
