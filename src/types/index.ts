// Core Types for SUCT Platform

export type Language = 'tamil' | 'english';
export type UserRole = 'student' | 'teacher' | 'parent' | 'admin';
export type TopicStatus = 'not_started' | 'in_progress' | 'completed';
export type AssignmentStatus = 'pending' | 'completed' | 'overdue';
export type Difficulty = 'easy' | 'medium' | 'hard';
export type AIInteractionType = 'explanation' | 'quiz' | 'tutor' | 'summary' | 'parent_report';

export interface LocalizedText {
  tamil: string;
  english: string;
}

export interface User {
  uid: string;
  email: string;
  displayName: string;
  
  role: UserRole;
  createdAt: string;
  lastLoginAt: string;
  isActive: boolean;
  profilePicture?: string;
}

export interface StudentProfile extends User {
  studentId: string;
  class: string;
  rollNumber?: string;
  overallProgress: number;
  enrolledCourses: string[];
  parentId?: string;
}

export interface TeacherProfile extends User {
  teacherId: string;
  subjects: string[];
  classes: string[];
  isApproved: boolean;
  qualifications?: string[];
}

export interface AdminProfile extends User {
  adminId: string;
  permissions: string[];
  managedSchools?: string[];
}

export interface ParentProfile extends User {
  parentId: string;
  children: string[]; // student IDs
  phoneNumber: string;
}

// Course and Curriculum Types
export interface Course {
  id: string;
  name: string;
  description: string;
  subject: string;
  class: string;
  teacherId: string;
  chapters: Chapter[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  language: Language;
}

export interface Chapter {
  id: string;
  courseId: string;
  title: string;
  description: string;
  order: number;
  content: string;
  videoUrl?: string;
  resources: Resource[];
  isPublished: boolean;
  estimatedDuration: number; // in minutes
}

export interface Resource {
  id: string;
  name: string;
  type: 'pdf' | 'video' | 'link' | 'image' | 'audio';
  url: string;
  description?: string;
  size?: number; // in bytes
}

// Quiz and Assessment Types
export interface Quiz {
  id: string;
  title: string;
  description: string;
  courseId: string;
  chapterId?: string;
  questions: Question[];
  timeLimit: number; // in minutes
  maxAttempts: number;
  isActive: boolean;
  difficulty: Difficulty;
  createdAt: string;
  language: Language;
}

export interface Question {
  id: string;
  question: string;
  type: 'multiple_choice' | 'true_false' | 'short_answer' | 'essay';
  options?: string[];
  correctAnswer: string | number;
  explanation?: string;
  points: number;
  difficulty: Difficulty;
  topic?: string;
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  studentId: string;
  answers: Answer[];
  score: number;
  maxScore: number;
  percentage: number;
  startedAt: string;
  completedAt?: string;
  timeSpent: number; // in seconds
  attemptNumber: number;
}

export interface Answer {
  questionId: string;
  answer: string | number;
  isCorrect: boolean;
  points: number;
  timeSpent?: number; // in seconds
}

// Progress and Analytics Types
export interface Progress {
  id: string;
  studentId: string;
  courseId: string;
  chapterId?: string;
  progressPercentage: number;
  timeSpent: number; // in minutes
  lastAccessedAt: string;
  completedAt?: string;
  status: TopicStatus;
}

export interface LeaderboardEntry {
  rank: number;
  studentId: string;
  studentName: string;
  points: number;
  completedCourses: number;
  averageScore: number;
  streak: number;
  weeklyPoints: number;
  monthlyPoints: number;
}

// Assignment Types (re-export from assignment.ts)
export * from './assignment';

// Notification Types
export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  isRead: boolean;
  actionUrl?: string;
  actionText?: string;
  createdAt: string;
  expiresAt?: string;
}

// Video and Media Types
export interface Video {
  id: string;
  title: string;
  description: string;
  url: string;
  thumbnailUrl: string;
  duration: number; // in seconds
  subject: string;
  class: string;
  chapter?: string;
  language: Language;
  viewCount: number;
  createdAt: string;
  channelName?: string;
  tags?: string[];
}

export interface VideoProgress {
  id: string;
  videoId: string;
  studentId: string;
  watchedDuration: number; // in seconds
  totalDuration: number; // in seconds
  completed: boolean;
  lastWatchedAt: string;
  watchSessions: WatchSession[];
}

export interface WatchSession {
  id: string;
  startTime: number; // in seconds
  endTime: number; // in seconds
  duration: number; // in seconds
  timestamp: string;
}

// Schedule and Calendar Types
export interface ScheduleEvent {
  id: string;
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  type: 'class' | 'exam' | 'assignment' | 'event' | 'holiday';
  courseId?: string;
  teacherId?: string;
  location?: string;
  isRecurring: boolean;
  recurrencePattern?: RecurrencePattern;
  attendees?: string[]; // user IDs
  color?: string;
}

export interface RecurrencePattern {
  type: 'daily' | 'weekly' | 'monthly' | 'yearly';
  interval: number; // every N days/weeks/months/years
  daysOfWeek?: number[]; // 0-6, Sunday = 0
  endDate?: string;
  occurrences?: number;
}

// Settings and Configuration Types
export interface UserSettings {
  id: string;
  userId: string;
  theme: 'light' | 'dark' | 'system';
  language: Language;
  notifications: NotificationSettings;
  privacy: PrivacySettings;
  accessibility: AccessibilitySettings;
}

export interface NotificationSettings {
  email: boolean;
  push: boolean;
  assignments: boolean;
  grades: boolean;
  announcements: boolean;
  reminders: boolean;
  weeklyReports: boolean;
}

export interface PrivacySettings {
  profileVisibility: 'public' | 'private' | 'friends';
  showProgress: boolean;
  showLeaderboard: boolean;
  allowMessages: boolean;
  shareAnalytics: boolean;
}

export interface AccessibilitySettings {
  fontSize: 'small' | 'medium' | 'large' | 'extra-large';
  highContrast: boolean;
  reduceMotion: boolean;
  screenReader: boolean;
  keyboardNavigation: boolean;
}

// AI and Smart Features Types
export interface AIInteraction {
  id: string;
  userId: string;
  type: AIInteractionType;
  input: string;
  output: string;
  context?: Record<string, any>;
  timestamp: string;
  language: Language;
  confidence?: number; // 0-1
}

export interface SmartRecommendation {
  id: string;
  userId: string;
  type: 'course' | 'video' | 'quiz' | 'study_plan';
  title: string;
  description: string;
  resourceId: string;
  reason: string;
  confidence: number; // 0-1
  createdAt: string;
  isAccepted?: boolean;
  acceptedAt?: string;
}

export interface StudyPlan {
  id: string;
  studentId: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  goals: StudyGoal[];
  milestones: Milestone[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface StudyGoal {
  id: string;
  title: string;
  description: string;
  targetDate: string;
  isCompleted: boolean;
  completedAt?: string;
  priority: 'low' | 'medium' | 'high';
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  targetDate: string;
  isCompleted: boolean;
  completedAt?: string;
  rewards?: string[];
}

// Analytics and Reporting Types
export interface AnalyticsData {
  id: string;
  userId: string;
  type: 'engagement' | 'performance' | 'progress' | 'behavior';
  data: Record<string, any>;
  timestamp: string;
  sessionId?: string;
}

export interface PerformanceReport {
  id: string;
  studentId: string;
  period: 'daily' | 'weekly' | 'monthly' | 'quarterly';
  startDate: string;
  endDate: string;
  metrics: PerformanceMetrics;
  insights: string[];
  recommendations: string[];
  generatedAt: string;
}

export interface PerformanceMetrics {
  totalTimeSpent: number; // in minutes
  coursesCompleted: number;
  averageScore: number;
  quizzesTaken: number;
  videosWatched: number;
  assignmentsSubmitted: number;
  streakDays: number;
  improvementAreas: string[];
  strengths: string[];
}

// Communication Types
export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  subject?: string;
  content: string;
  type: 'text' | 'announcement' | 'reminder' | 'feedback';
  isRead: boolean;
  sentAt: string;
  readAt?: string;
  attachments?: Attachment[];
}

export interface Attachment {
  id: string;
  name: string;
  type: string;
  url: string;
  size: number; // in bytes
}

// Error and API Response Types
export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp: string;
}

export interface ErrorLog {
  id: string;
  userId?: string;
  error: string;
  stack?: string;
  context?: Record<string, any>;
  timestamp: string;
  resolved: boolean;
  resolvedAt?: string;
}

// Search and Filter Types
export interface SearchFilters {
  query?: string;
  subject?: string;
  class?: string;
  language?: Language;
  difficulty?: Difficulty;
  type?: string;
  dateRange?: {
    start: string;
    end: string;
  };
}

export interface SearchResult<T = any> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

// Utility Types
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

export type OptionalFields<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;