import { Assignment, Submission, Grade } from '@/types/assignment';

// Mock assignment data
export const assignments: Assignment[] = [
  {
    id: 'assign-1',
    title: 'Essay on Photosynthesis',
    description: 'Write a detailed essay explaining the process of photosynthesis in plants.',
    subject: 'Biology',
    class: 'Class 10',
    chapter: 'Life Processes',
    teacherId: 'teacher01',
    teacherName: 'Dr. Priya Sharma',
    dueDate: '2026-02-15T23:59:59Z',
    maxPoints: 100,
    type: 'essay',
    status: 'published',
    instructions: `Write a comprehensive essay (500-750 words) on photosynthesis covering:
    1. Definition and importance
    2. Raw materials required
    3. Process steps (light and dark reactions)
    4. Products formed
    5. Factors affecting photosynthesis
    
    Include diagrams where necessary and cite your sources.`,
    createdAt: '2026-01-20T10:00:00Z',
    updatedAt: '2026-01-20T10:00:00Z',
  },
  {
    id: 'assign-2',
    title: 'Mathematics Problem Set - Quadratic Equations',
    description: 'Solve the given set of quadratic equations using different methods.',
    subject: 'Mathematics',
    class: 'Class 10',
    chapter: 'Quadratic Equations',
    teacherId: 'teacher02',
    teacherName: 'Prof. Rajesh Kumar',
    dueDate: '2026-02-10T23:59:59Z',
    maxPoints: 50,
    type: 'multiple_choice',
    status: 'published',
    instructions: `Solve all 10 problems showing complete working:
    1. Use factorization method for problems 1-3
    2. Use quadratic formula for problems 4-6
    3. Use completing the square for problems 7-10
    
    Show all steps clearly and box your final answers.`,
    createdAt: '2026-01-18T14:30:00Z',
    updatedAt: '2026-01-18T14:30:00Z',
  },
  {
    id: 'assign-3',
    title: 'Science Project - Renewable Energy',
    description: 'Create a working model demonstrating any form of renewable energy.',
    subject: 'Physics',
    class: 'Class 9',
    chapter: 'Natural Resources',
    teacherId: 'teacher01',
    teacherName: 'Dr. Priya Sharma',
    dueDate: '2026-02-25T23:59:59Z',
    maxPoints: 150,
    type: 'project',
    status: 'published',
    instructions: `Create a working model and prepare a presentation covering:
    1. Type of renewable energy chosen
    2. Working principle
    3. Materials used
    4. Construction process
    5. Advantages and limitations
    6. Real-world applications
    
    Presentation should be 5-7 minutes with Q&A session.`,
    createdAt: '2026-01-15T09:00:00Z',
    updatedAt: '2026-01-15T09:00:00Z',
  },
];

// Mock submission data
export const submissions: Submission[] = [
  {
    id: 'sub-1',
    assignmentId: 'assign-1',
    studentId: 'c10stu01',
    studentName: 'Arjun Verma',
    content: `Photosynthesis: The Foundation of Life

Photosynthesis is one of the most important biological processes on Earth, serving as the foundation for virtually all life forms. This process, carried out primarily by plants, algae, and certain bacteria, converts light energy into chemical energy, producing glucose and oxygen from carbon dioxide and water.

The importance of photosynthesis cannot be overstated. It is the primary source of oxygen in our atmosphere and forms the base of most food chains. Without photosynthesis, life as we know it would not exist on Earth.

Raw Materials Required:
The process of photosynthesis requires several key components:
1. Carbon dioxide (CO₂) - absorbed from the atmosphere through stomata
2. Water (H₂O) - absorbed by roots from the soil
3. Sunlight - the energy source for the process
4. Chlorophyll - the green pigment that captures light energy

Process Steps:
Photosynthesis occurs in two main stages:

Light Reactions (Photo-chemical phase):
- Occur in the thylakoids of chloroplasts
- Chlorophyll absorbs light energy
- Water molecules are split (photolysis)
- Oxygen is released as a byproduct
- ATP and NADPH are produced

Dark Reactions (Calvin Cycle):
- Occur in the stroma of chloroplasts
- Do not require direct light but use products from light reactions
- CO₂ is fixed into organic compounds
- Glucose is synthesized using ATP and NADPH

Products Formed:
The overall equation for photosynthesis is:
6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂

The main products are:
- Glucose (C₆H₁₂O₆) - used for energy and building other organic compounds
- Oxygen (O₂) - released into the atmosphere

Factors Affecting Photosynthesis:
Several factors influence the rate of photosynthesis:
1. Light intensity - higher intensity increases rate up to a saturation point
2. Carbon dioxide concentration - limiting factor in normal atmospheric conditions
3. Temperature - affects enzyme activity
4. Water availability - essential for the process
5. Chlorophyll content - determines light absorption capacity

In conclusion, photosynthesis is a complex but vital process that sustains life on Earth by converting solar energy into chemical energy and producing the oxygen we breathe.`,
    submittedAt: '2026-02-12T18:30:00Z',
    status: 'graded',
    lateSubmission: false,
    grade: {
      id: 'grade-1',
      submissionId: 'sub-1',
      teacherId: 'teacher01',
      totalPoints: 100,
      earnedPoints: 85,
      percentage: 85,
      letterGrade: 'B+',
      feedback: 'Excellent understanding of the topic. Well-structured essay with clear explanations. Could have included more details about factors affecting photosynthesis. Good use of scientific terminology.',
      gradedAt: '2026-02-13T10:15:00Z',
    },
  },
  {
    id: 'sub-2',
    assignmentId: 'assign-2',
    studentId: 'c10stu02',
    studentName: 'Priya Patel',
    content: `Mathematics Problem Set Solutions:

Problem 1: x² - 5x + 6 = 0
Using factorization: (x - 2)(x - 3) = 0
Solutions: x = 2, x = 3

Problem 2: x² - 7x + 12 = 0
Using factorization: (x - 3)(x - 4) = 0
Solutions: x = 3, x = 4

Problem 3: x² + 5x + 6 = 0
Using factorization: (x + 2)(x + 3) = 0
Solutions: x = -2, x = -3

Problem 4: 2x² - 7x + 3 = 0
Using quadratic formula: x = [7 ± √(49 - 24)] / 4
x = [7 ± √25] / 4 = [7 ± 5] / 4
Solutions: x = 3, x = 1/2

Problem 5: x² - 4x + 1 = 0
Using quadratic formula: x = [4 ± √(16 - 4)] / 2
x = [4 ± √12] / 2 = [4 ± 2√3] / 2
Solutions: x = 2 + √3, x = 2 - √3

[Solutions continue for remaining problems...]`,
    submittedAt: '2026-02-09T20:45:00Z',
    status: 'submitted',
    lateSubmission: false,
  },
  {
    id: 'sub-3',
    assignmentId: 'assign-1',
    studentId: 'c10stu03',
    studentName: 'Rohan Mehta',
    content: `Photosynthesis Essay

Photosynthesis is the process by which plants make food. It is very important for life on Earth.

Plants need sunlight, water, and carbon dioxide to make photosynthesis. The process happens in the leaves of plants.

There are two parts to photosynthesis:
1. Light reactions - this happens when sunlight hits the plant
2. Dark reactions - this happens after the light reactions

The result of photosynthesis is glucose and oxygen. Plants use glucose for energy and oxygen goes into the air.

Many things can affect how fast photosynthesis happens like how much light there is, temperature, and how much water the plant has.

Photosynthesis is important because it gives us oxygen to breathe and food to eat.`,
    submittedAt: '2026-02-14T22:15:00Z',
    status: 'submitted',
    lateSubmission: false,
  },
];

// Helper functions
export function getAssignmentsByTeacher(teacherId: string): Assignment[] {
  return assignments.filter(assignment => assignment.teacherId === teacherId);
}

export function getSubmissionsByAssignment(assignmentId: string): Submission[] {
  return submissions.filter(submission => submission.assignmentId === assignmentId);
}

export function getSubmissionsByStudent(studentId: string): Submission[] {
  return submissions.filter(submission => submission.studentId === studentId);
}

export function getUngradedSubmissions(): Submission[] {
  return submissions.filter(submission => submission.status === 'submitted');
}

export function getGradedSubmissions(): Submission[] {
  return submissions.filter(submission => submission.status === 'graded');
}

export function getAssignmentById(id: string): Assignment | undefined {
  return assignments.find(assignment => assignment.id === id);
}

export function getSubmissionById(id: string): Submission | undefined {
  return submissions.find(submission => submission.id === id);
}