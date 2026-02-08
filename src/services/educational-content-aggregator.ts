// Educational Content Aggregator Service
// Integrates multiple educational resources and content sources

import { kalviTVContent, KALVI_TV_SUBJECTS, type KalviVideo, type KalviPlaylist } from './youtube-kalvi';
import { enhancedCurriculumData, subjectVideoMapping } from '@/lib/enhanced-curriculum-data';

export interface EducationalResource {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'document' | 'interactive' | 'assessment' | 'game';
  subject: string;
  class: string;
  chapter?: string;
  difficulty: 'Easy' | 'Moderate' | 'Hard';
  duration?: string;
  url: string;
  thumbnailUrl?: string;
  source: string;
  language: 'tamil' | 'english';
  tags: string[];
  viewCount?: number;
  rating?: number;
  createdAt: string;
}

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  subject: string;
  class: string;
  totalResources: number;
  estimatedHours: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  prerequisites: string[];
  learningOutcomes: string[];
  resources: EducationalResource[];
  assessments: EducationalResource[];
  projects: EducationalResource[];
}

export interface StudyPlan {
  id: string;
  studentId: string;
  class: string;
  subjects: string[];
  duration: number; // in weeks
  dailyStudyHours: number;
  weeklySchedule: {
    [day: string]: {
      subject: string;
      topics: string[];
      resources: string[];
      duration: number;
    }[];
  };
  milestones: {
    week: number;
    goals: string[];
    assessments: string[];
  }[];
  progress: {
    completedResources: string[];
    currentWeek: number;
    overallProgress: number;
  };
}

export class EducationalContentAggregator {
  private static instance: EducationalContentAggregator;
  private contentCache: Map<string, EducationalResource[]> = new Map();
  private learningPaths: Map<string, LearningPath> = new Map();

  private constructor() {
    this.initializeContent();
  }

  public static getInstance(): EducationalContentAggregator {
    if (!EducationalContentAggregator.instance) {
      EducationalContentAggregator.instance = new EducationalContentAggregator();
    }
    return EducationalContentAggregator.instance;
  }

  private initializeContent(): void {
    // Convert Kalvi TV content to educational resources
    this.convertKalviTVContent();
    // Generate learning paths
    this.generateLearningPaths();
  }

  private convertKalviTVContent(): void {
    kalviTVContent.forEach(playlist => {
      const resources: EducationalResource[] = playlist.videos.map(video => ({
        id: video.id,
        title: video.title,
        description: video.description,
        type: 'video' as const,
        subject: video.subject,
        class: video.class,
        chapter: video.chapter,
        difficulty: this.getDifficultyFromClass(video.class),
        duration: video.duration,
        url: video.videoUrl,
        thumbnailUrl: video.thumbnailUrl,
        source: 'Kalvi TV Official',
        language: video.language,
        tags: this.generateTags(video),
        viewCount: video.viewCount,
        rating: this.generateRating(video.viewCount),
        createdAt: video.publishedAt
      }));

      const cacheKey = `${playlist.class}-${playlist.subject}`;
      this.contentCache.set(cacheKey, resources);
    });
  }

  private getDifficultyFromClass(className: string): 'Easy' | 'Moderate' | 'Hard' {
    const classNumber = parseInt(className.replace('Class ', ''));
    if (classNumber <= 2) return 'Easy';
    if (classNumber <= 8) return 'Moderate';
    return 'Hard';
  }

  private generateTags(video: KalviVideo): string[] {
    const tags: string[] = [video.subject.toLowerCase(), video.class.toLowerCase()];
    
    if (video.chapter) {
      tags.push(video.chapter.toLowerCase());
    }

    // Add subject-specific tags
    const subjectMapping = subjectVideoMapping[video.subject as keyof typeof subjectVideoMapping];
    if (subjectMapping) {
      tags.push(...subjectMapping.keywords);
    }

    return [...new Set(tags)]; // Remove duplicates
  }

  private generateRating(viewCount: number): number {
    // Generate rating based on view count (simplified algorithm)
    if (viewCount > 1000000) return 4.8;
    if (viewCount > 500000) return 4.5;
    if (viewCount > 100000) return 4.2;
    if (viewCount > 50000) return 4.0;
    return 3.8;
  }

  private generateLearningPaths(): void {
    enhancedCurriculumData.forEach(courseCollection => {
      courseCollection.subjects.forEach(subject => {
        const learningPath: LearningPath = {
          id: `${subject.course_id}-path`,
          title: `${subject.subject_name} Learning Path - ${courseCollection.class}`,
          description: subject.overview,
          subject: subject.subject_name,
          class: courseCollection.class,
          totalResources: this.countResourcesForSubject(courseCollection.class, subject.subject_name),
          estimatedHours: subject.chapters.reduce((total, chapter) => total + chapter.estimated_hours, 0),
          difficulty: this.mapDifficultyLevel(subject.difficulty_level),
          prerequisites: this.getPrerequisites(courseCollection.class, subject.subject_name),
          learningOutcomes: subject.chapters.flatMap(chapter => chapter.learning_outcomes),
          resources: this.getResourcesForSubject(courseCollection.class, subject.subject_name),
          assessments: this.generateAssessments(subject),
          projects: this.generateProjects(subject)
        };

        this.learningPaths.set(learningPath.id, learningPath);
      });
    });
  }

  private countResourcesForSubject(className: string, subject: string): number {
    const cacheKey = `${className}-${subject}`;
    const resources = this.contentCache.get(cacheKey);
    return resources ? resources.length : 0;
  }

  private mapDifficultyLevel(level: string): 'Beginner' | 'Intermediate' | 'Advanced' {
    switch (level) {
      case 'Beginner':
      case 'Easy':
        return 'Beginner';
      case 'Moderate':
        return 'Intermediate';
      case 'Advanced':
      case 'Hard':
        return 'Advanced';
      default:
        return 'Intermediate';
    }
  }

  private getPrerequisites(className: string, subject: string): string[] {
    const classNumber = parseInt(className.replace('Class ', ''));
    if (classNumber <= 1) return [];

    const previousClass = `Class ${classNumber - 1}`;
    return [`${subject} - ${previousClass}`];
  }

  private getResourcesForSubject(className: string, subject: string): EducationalResource[] {
    const cacheKey = `${className}-${subject}`;
    return this.contentCache.get(cacheKey) || [];
  }

  private generateAssessments(subject: any): EducationalResource[] {
    return subject.chapters.map((chapter: any, index: number) => ({
      id: `${chapter.chapter_id}-assessment`,
      title: `${chapter.chapter_title} - Assessment`,
      description: `Test your understanding of ${chapter.chapter_title}`,
      type: 'assessment' as const,
      subject: subject.subject_name,
      class: subject.course_id.includes('c1') ? 'Class 1' : 'Class 6', // Simplified
      chapter: chapter.chapter_title,
      difficulty: chapter.difficulty_level,
      duration: '30 minutes',
      url: `/assessments/${chapter.chapter_id}`,
      source: 'Samacheer Kalvi',
      language: subject.course_id.includes('-ta-') ? 'tamil' as const : 'english' as const,
      tags: ['assessment', 'quiz', subject.subject_name.toLowerCase()],
      createdAt: new Date().toISOString()
    }));
  }

  private generateProjects(subject: any): EducationalResource[] {
    return [{
      id: `${subject.course_id}-project`,
      title: `${subject.subject_name} Project Work`,
      description: `Hands-on project activities for ${subject.subject_name}`,
      type: 'interactive' as const,
      subject: subject.subject_name,
      class: subject.course_id.includes('c1') ? 'Class 1' : 'Class 6', // Simplified
      difficulty: subject.difficulty_level,
      duration: '2 hours',
      url: `/projects/${subject.course_id}`,
      source: 'Samacheer Kalvi',
      language: subject.course_id.includes('-ta-') ? 'tamil' as const : 'english' as const,
      tags: ['project', 'hands-on', subject.subject_name.toLowerCase()],
      createdAt: new Date().toISOString()
    }];
  }

  // Public methods for accessing content

  public getResourcesBySubject(className: string, subject: string, type?: string): EducationalResource[] {
    const cacheKey = `${className}-${subject}`;
    let resources = this.contentCache.get(cacheKey) || [];

    if (type) {
      resources = resources.filter(resource => resource.type === type);
    }

    return resources.sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0));
  }

  public getResourcesByChapter(className: string, subject: string, chapter: string): EducationalResource[] {
    const resources = this.getResourcesBySubject(className, subject);
    return resources.filter(resource => 
      resource.chapter && resource.chapter.toLowerCase().includes(chapter.toLowerCase())
    );
  }

  public searchResources(query: string, filters?: {
    class?: string;
    subject?: string;
    type?: string;
    difficulty?: string;
    language?: string;
  }): EducationalResource[] {
    let allResources: EducationalResource[] = [];
    
    // Collect all resources
    this.contentCache.forEach(resources => {
      allResources.push(...resources);
    });

    // Apply search query
    const queryLower = query.toLowerCase();
    let filteredResources = allResources.filter(resource =>
      resource.title.toLowerCase().includes(queryLower) ||
      resource.description.toLowerCase().includes(queryLower) ||
      resource.tags.some(tag => tag.includes(queryLower))
    );

    // Apply filters
    if (filters) {
      if (filters.class) {
        filteredResources = filteredResources.filter(r => r.class === filters.class);
      }
      if (filters.subject) {
        filteredResources = filteredResources.filter(r => r.subject === filters.subject);
      }
      if (filters.type) {
        filteredResources = filteredResources.filter(r => r.type === filters.type);
      }
      if (filters.difficulty) {
        filteredResources = filteredResources.filter(r => r.difficulty === filters.difficulty);
      }
      if (filters.language) {
        filteredResources = filteredResources.filter(r => r.language === filters.language);
      }
    }

    return filteredResources.sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0));
  }

  public getLearningPath(className: string, subject: string): LearningPath | null {
    const pathId = `c${className.replace('Class ', '')}-${subject.toLowerCase().includes('tamil') ? 'ta' : 'en'}-${subject.toLowerCase().replace(/[^a-z]/g, '')}-path`;
    return this.learningPaths.get(pathId) || null;
  }

  public getAllLearningPaths(className?: string): LearningPath[] {
    const paths = Array.from(this.learningPaths.values());
    
    if (className) {
      return paths.filter(path => path.class === className);
    }
    
    return paths;
  }

  public generateStudyPlan(
    studentId: string,
    className: string,
    subjects: string[],
    duration: number,
    dailyHours: number
  ): StudyPlan {
    const studyPlan: StudyPlan = {
      id: `${studentId}-${className}-plan`,
      studentId,
      class: className,
      subjects,
      duration,
      dailyStudyHours: dailyHours,
      weeklySchedule: this.generateWeeklySchedule(className, subjects, dailyHours),
      milestones: this.generateMilestones(duration, subjects),
      progress: {
        completedResources: [],
        currentWeek: 1,
        overallProgress: 0
      }
    };

    return studyPlan;
  }

  private generateWeeklySchedule(className: string, subjects: string[], dailyHours: number): any {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const schedule: any = {};

    days.forEach(day => {
      schedule[day] = subjects.map(subject => ({
        subject,
        topics: this.getTopicsForSubject(className, subject).slice(0, 2),
        resources: this.getResourcesBySubject(className, subject).slice(0, 3).map(r => r.id),
        duration: Math.floor(dailyHours / subjects.length * 60) // in minutes
      }));
    });

    return schedule;
  }

  private getTopicsForSubject(className: string, subject: string): string[] {
    const courseData = enhancedCurriculumData.find(c => c.class === className);
    const subjectData = courseData?.subjects.find(s => s.subject_name === subject);
    
    if (subjectData) {
      return subjectData.chapters.flatMap(chapter => chapter.key_topics).slice(0, 10);
    }
    
    return ['Basic Concepts', 'Fundamentals', 'Applications'];
  }

  private generateMilestones(duration: number, subjects: string[]): any[] {
    const milestones = [];
    const weeksPerMilestone = Math.max(1, Math.floor(duration / 4));

    for (let week = weeksPerMilestone; week <= duration; week += weeksPerMilestone) {
      milestones.push({
        week,
        goals: subjects.map(subject => `Complete ${subject} chapters 1-${Math.ceil(week / weeksPerMilestone)}`),
        assessments: subjects.map(subject => `${subject} Assessment ${Math.ceil(week / weeksPerMilestone)}`)
      });
    }

    return milestones;
  }

  public getRecommendations(
    studentId: string,
    className: string,
    completedResources: string[],
    preferences: {
      subjects?: string[];
      difficulty?: string;
      type?: string;
      language?: string;
    }
  ): EducationalResource[] {
    let allResources: EducationalResource[] = [];
    
    // Collect resources based on preferences
    if (preferences.subjects) {
      preferences.subjects.forEach(subject => {
        allResources.push(...this.getResourcesBySubject(className, subject));
      });
    } else {
      // Get all resources for the class
      this.contentCache.forEach((resources, key) => {
        if (key.startsWith(className)) {
          allResources.push(...resources);
        }
      });
    }

    // Filter out completed resources
    allResources = allResources.filter(resource => !completedResources.includes(resource.id));

    // Apply preference filters
    if (preferences.difficulty) {
      allResources = allResources.filter(r => r.difficulty === preferences.difficulty);
    }
    if (preferences.type) {
      allResources = allResources.filter(r => r.type === preferences.type);
    }
    if (preferences.language) {
      allResources = allResources.filter(r => r.language === preferences.language);
    }

    // Sort by rating and view count
    return allResources
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, 10);
  }

  public getContentStatistics(className?: string): {
    totalResources: number;
    resourcesByType: { [type: string]: number };
    resourcesBySubject: { [subject: string]: number };
    resourcesByLanguage: { [language: string]: number };
    averageRating: number;
    totalViewCount: number;
  } {
    let allResources: EducationalResource[] = [];
    
    this.contentCache.forEach((resources, key) => {
      if (!className || key.startsWith(className)) {
        allResources.push(...resources);
      }
    });

    const stats = {
      totalResources: allResources.length,
      resourcesByType: {} as { [type: string]: number },
      resourcesBySubject: {} as { [subject: string]: number },
      resourcesByLanguage: {} as { [language: string]: number },
      averageRating: 0,
      totalViewCount: 0
    };

    allResources.forEach(resource => {
      // Count by type
      stats.resourcesByType[resource.type] = (stats.resourcesByType[resource.type] || 0) + 1;
      
      // Count by subject
      stats.resourcesBySubject[resource.subject] = (stats.resourcesBySubject[resource.subject] || 0) + 1;
      
      // Count by language
      stats.resourcesByLanguage[resource.language] = (stats.resourcesByLanguage[resource.language] || 0) + 1;
      
      // Sum ratings and view counts
      stats.averageRating += resource.rating || 0;
      stats.totalViewCount += resource.viewCount || 0;
    });

    if (allResources.length > 0) {
      stats.averageRating = stats.averageRating / allResources.length;
    }

    return stats;
  }
}

// Export singleton instance
export const educationalContentAggregator = EducationalContentAggregator.getInstance();

// Helper functions for easy access
export function getResourcesForChapter(className: string, subject: string, chapter: string): EducationalResource[] {
  return educationalContentAggregator.getResourcesByChapter(className, subject, chapter);
}

export function searchEducationalContent(query: string, filters?: any): EducationalResource[] {
  return educationalContentAggregator.searchResources(query, filters);
}

export function getLearningPathForSubject(className: string, subject: string): LearningPath | null {
  return educationalContentAggregator.getLearningPath(className, subject);
}

export function generatePersonalizedStudyPlan(
  studentId: string,
  className: string,
  subjects: string[],
  duration: number,
  dailyHours: number
): StudyPlan {
  return educationalContentAggregator.generateStudyPlan(studentId, className, subjects, duration, dailyHours);
}