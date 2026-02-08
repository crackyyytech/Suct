
// Demo Login Credentials for Testing
export const demoCredentials = {
  admin: {
    email: "demo@admin.com",
    password: "Admin@123",
    id: "admin",
    displayName: "Demo Admin"
  },
  teacher: {
    email: "demo@teacher.com", 
    password: "Teacher@123",
    id: "teacher01",
    displayName: "Demo Teacher"
  },
  student: {
    email: "demo@student.com",
    password: "Student@123", 
    id: "c10stu01",
    displayName: "Demo Student"
  }
};

export const adminCredentials = {
    id: "admin",
    password: "Admin@123",
};

export const teacherCredentials = [
    { id: "teacher01", password: "Teach@123" },
    { id: "teacher02", password: "Teach@123" },
    { id: "teacher03", password: "Teach@123" },
];

export type StudentProfile = {
  id: string; // Document ID
  name: string;
  studentId: string;
  class: string;
  overallProgress: number;
  lastActive: string; // ISO string
  email: string;
  password?: string;
};

export const students: StudentProfile[] = [
    {
        id: 'demo-student-1',
        name: 'Arjun Verma',
        studentId: 'c1stu01',
        class: 'Class 1',
        overallProgress: 75,
        lastActive: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        email: 'c1stu01@educonnect.local',
        password: 'Stu@101',
    },
    {
        id: 'demo-student-2',
        name: 'Priya Sharma',
        studentId: 'c2stu01',
        class: 'Class 2',
        overallProgress: 80,
        lastActive: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        email: 'c2stu01@educonnect.local',
        password: 'Stu@102',
    },
    {
        id: 'demo-student-3',
        name: 'Rohan Mehta',
        studentId: 'c3stu01',
        class: 'Class 3',
        overallProgress: 60,
        lastActive: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        email: 'c3stu01@educonnect.local',
        password: 'Stu@103',
    },
    {
        id: 'demo-student-4',
        name: 'Sneha Patel',
        studentId: 'c4stu01',
        class: 'Class 4',
        overallProgress: 90,
        lastActive: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
        email: 'c4stu01@educonnect.local',
        password: 'Stu@104',
    },
    {
        id: 'demo-student-5',
        name: 'Vikram Singh',
        studentId: 'c5stu01',
        class: 'Class 5',
        overallProgress: 82,
        lastActive: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
        email: 'c5stu01@educonnect.local',
        password: 'Stu@105',
    },
    {
        id: 'demo-student-6',
        name: 'Anjali Rao',
        studentId: 'c6stu01',
        class: 'Class 6',
        overallProgress: 70,
        lastActive: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        email: 'c6stu01@educonnect.local',
        password: 'Stu@106',
    },
    {
        id: 'demo-student-7',
        name: 'Karan Nair',
        studentId: 'c7stu01',
        class: 'Class 7',
        overallProgress: 88,
        lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        email: 'c7stu01@educonnect.local',
        password: 'Stu@107',
    },
    {
        id: 'demo-student-8',
        name: 'Meera Iyer',
        studentId: 'c8stu01',
        class: 'Class 8',
        overallProgress: 95,
        lastActive: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
        email: 'c8stu01@educonnect.local',
        password: 'Stu@108',
    },
    {
        id: 'demo-student-9',
        name: 'Siddharth Menon',
        studentId: 'c9stu01',
        class: 'Class 9',
        overallProgress: 78,
        lastActive: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        email: 'c9stu01@educonnect.local',
        password: 'Stu@109',
    },
    {
        id: 'demo-student-10',
        name: 'Diya Reddy',
        studentId: 'c10stu01',
        class: 'Class 10',
        overallProgress: 85,
        lastActive: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        email: 'c10stu01@educonnect.local',
        password: 'Stu@110',
    },
    {
        id: 'demo-student-11',
        name: 'Aditya Gupta',
        studentId: 'c11stu01',
        class: 'Class 11',
        overallProgress: 92,
        lastActive: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
        email: 'c11stu01@educonnect.local',
        password: 'Stu@111',
    },
    {
        id: 'demo-student-12',
        name: 'Neha Kumar',
        studentId: 'c12stu01',
        class: 'Class 12',
        overallProgress: 89,
        lastActive: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        email: 'c12stu01@educonnect.local',
        password: 'Stu@112',
    },
];
