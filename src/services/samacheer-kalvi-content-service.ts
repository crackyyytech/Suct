// Samacheer Kalvi Content Service
// Comprehensive service for Tamil Nadu State Board educational content

import { kalviTVContent, type KalviVideo } from './youtube-kalvi';
import { enhancedCurriculumData } from '@/lib/enhanced-curriculum-data';

export interface SamacheerKalviChapter {
  id: string;
  title: string;
  class: string;
  subject: string;
  chapterNumber: number;
  topics: string[];
  learningObjectives: string[];
  keyTerms: string[];
  practicalActivities: string[];
  assessmentQuestions: string[];
  relatedVideos: KalviVideo[];
  textbookPages: string;
  difficulty: 'Easy' | 'Moderate' | 'Hard';
  estimatedDuration: string;
}

export interface SubjectGuide {
  subject: string;
  class: string;
  totalChapters: number;
  chapters: SamacheerKalviChapter[];
  examPattern: {
    totalMarks: number;
    theoryMarks: number;
    practicalMarks: number;
    internalAssessment: number;
  };
  importantTopics: string[];
  studyTips: string[];
  previousYearQuestions: string[];
}

export class SamacheerKalviContentService {
  private static instance: SamacheerKalviContentService;
  private contentDatabase: Map<string, SubjectGuide> = new Map();

  private constructor() {
    this.initializeContent();
  }

  public static getInstance(): SamacheerKalviContentService {
    if (!SamacheerKalviContentService.instance) {
      SamacheerKalviContentService.instance = new SamacheerKalviContentService();
    }
    return SamacheerKalviContentService.instance;
  }

  private initializeContent(): void {
    this.generateSubjectGuides();
  }

  private generateSubjectGuides(): void {
    enhancedCurriculumData.forEach(courseCollection => {
      courseCollection.subjects.forEach(subject => {
        const guide: SubjectGuide = {
          subject: subject.subject_name,
          class: courseCollection.class,
          totalChapters: subject.chapters.length,
          chapters: this.convertToSamacheerChapters(subject.chapters, courseCollection.class, subject.subject_name),
          examPattern: this.getExamPattern(courseCollection.class, subject.subject_name),
          importantTopics: this.extractImportantTopics(subject.chapters),
          studyTips: this.generateStudyTips(subject.subject_name, courseCollection.class),
          previousYearQuestions: this.generateSampleQuestions(subject.subject_name, courseCollection.class)
        };

        const key = `${courseCollection.class}-${subject.subject_name}`;
        this.contentDatabase.set(key, guide);
      });
    });
  }

  private convertToSamacheerChapters(chapters: any[], className: string, subject: string): SamacheerKalviChapter[] {
    return chapters.map((chapter, index) => ({
      id: chapter.chapter_id,
      title: chapter.chapter_title,
      class: className,
      subject: subject,
      chapterNumber: index + 1,
      topics: chapter.key_topics,
      learningObjectives: chapter.learning_outcomes,
      keyTerms: this.extractKeyTerms(chapter.key_topics),
      practicalActivities: chapter.practical_activities || [],
      assessmentQuestions: this.generateAssessmentQuestions(chapter),
      relatedVideos: this.findRelatedVideos(className, subject, chapter.chapter_title),
      textbookPages: `Pages ${(index + 1) * 10}-${(index + 2) * 10}`,
      difficulty: chapter.difficulty_level,
      estimatedDuration: `${chapter.estimated_hours} hours`
    }));
  }

  private extractKeyTerms(topics: string[]): string[] {
    // Extract key terms from topics (simplified implementation)
    return topics.flatMap(topic => 
      topic.split(' ').filter(word => word.length > 3)
    ).slice(0, 10);
  }

  private generateAssessmentQuestions(chapter: any): string[] {
    const questions = [
      `What are the main concepts covered in ${chapter.chapter_title}?`,
      `Explain the importance of ${chapter.key_topics[0] || 'this topic'}.`,
      `List the key learning outcomes of this chapter.`,
      `How can you apply the concepts learned in real life?`,
      `What are the practical applications of ${chapter.chapter_title}?`
    ];
    return questions;
  }

  private findRelatedVideos(className: string, subject: string, chapterTitle: string): KalviVideo[] {
    const playlist = kalviTVContent.find(p => 
      p.class === className && 
      (p.subject === subject || this.isSubjectMatch(p.subject, subject))
    );

    if (!playlist) return [];

    return playlist.videos.filter(video => 
      video.chapter && video.chapter.toLowerCase().includes(chapterTitle.toLowerCase())
    ).slice(0, 5);
  }

  private isSubjectMatch(subject1: string, subject2: string): boolean {
    const mappings: { [key: string]: string[] } = {
      'Mathematics': ['கணக்கு'],
      'கணக்கு': ['Mathematics'],
      'தமிழ்': ['Tamil'],
      'Tamil': ['தமிழ்'],
      'Science': ['அறிவியல்'],
      'அறிவியல்': ['Science']
    };

    return mappings[subject1]?.includes(subject2) || false;
  }

  private getExamPattern(className: string, subject: string): any {
    const classNumber = parseInt(className.replace('Class ', ''));
    
    if (classNumber <= 5) {
      return {
        totalMarks: 100,
        theoryMarks: 80,
        practicalMarks: 0,
        internalAssessment: 20
      };
    } else if (classNumber <= 8) {
      return {
        totalMarks: 100,
        theoryMarks: 80,
        practicalMarks: 0,
        internalAssessment: 20
      };
    } else if (classNumber === 10) {
      return {
        totalMarks: 100,
        theoryMarks: 80,
        practicalMarks: 0,
        internalAssessment: 20
      };
    } else {
      return {
        totalMarks: 100,
        theoryMarks: 70,
        practicalMarks: 10,
        internalAssessment: 20
      };
    }
  }

  private extractImportantTopics(chapters: any[]): string[] {
    return chapters.flatMap(chapter => chapter.key_topics).slice(0, 15);
  }

  private generateStudyTips(subject: string, className: string): string[] {
    const generalTips = [
      'Create a regular study schedule',
      'Practice previous year questions',
      'Make summary notes for quick revision',
      'Use visual aids and diagrams',
      'Form study groups with classmates'
    ];

    const subjectSpecificTips: { [key: string]: string[] } = {
      'Mathematics': [
        'Practice numerical problems daily',
        'Understand formulas rather than memorizing',
        'Draw diagrams for geometry problems',
        'Check your calculations twice'
      ],
      'கணக்கு': [
        'தினமும் கணக்கு பயிற்சி செய்யுங்கள்',
        'சூத்திரங்களை புரிந்து கொள்ளுங்கள்',
        'வடிவியல் பிரச்சினைகளுக்கு படம் வரையுங்கள்'
      ],
      'Science': [
        'Conduct practical experiments',
        'Relate concepts to daily life',
        'Make concept maps',
        'Watch educational videos'
      ],
      'Physics': [
        'Understand the physical meaning of formulas',
        'Practice numerical problems',
        'Learn unit conversions',
        'Visualize concepts through experiments'
      ],
      'Chemistry': [
        'Learn chemical equations',
        'Practice balancing equations',
        'Understand periodic trends',
        'Memorize important reactions'
      ]
    };

    return [...generalTips, ...(subjectSpecificTips[subject] || [])];
  }

  private generateSampleQuestions(subject: string, className: string): string[] {
    const classNumber = parseInt(className.replace('Class ', ''));
    
    const questionTemplates = {
      'Mathematics': [
        'Solve the following equation: x + 5 = 12',
        'Find the area of a rectangle with length 8 cm and width 6 cm',
        'What is the HCF of 24 and 36?',
        'Convert 0.75 to a fraction in its simplest form'
      ],
      'Science': [
        'What are the main functions of roots in plants?',
        'Explain the process of photosynthesis',
        'List three properties of metals',
        'What is the difference between renewable and non-renewable resources?'
      ],
      'Physics': [
        'State Newton\'s first law of motion',
        'Calculate the speed of an object that travels 100m in 20 seconds',
        'What is the unit of electric current?',
        'Explain the phenomenon of reflection of light'
      ],
      'Chemistry': [
        'What is the chemical formula of water?',
        'Balance the equation: H2 + O2 → H2O',
        'Name three types of chemical reactions',
        'What is the pH of pure water?'
      ]
    };

    return questionTemplates[subject] || [
      'Define the key terms of this chapter',
      'Explain the main concepts with examples',
      'What are the practical applications?',
      'How does this relate to real life?'
    ];
  }

  // Public methods
  public getSubjectGuide(className: string, subject: string): SubjectGuide | null {
    const key = `${className}-${subject}`;
    return this.contentDatabase.get(key) || null;
  }

  public getChapterDetails(className: string, subject: string, chapterId: string): SamacheerKalviChapter | null {
    const guide = this.getSubjectGuide(className, subject);
    if (!guide) return null;

    return guide.chapters.find(chapter => chapter.id === chapterId) || null;
  }

  public getAllSubjects(className: string): string[] {
    const subjects: string[] = [];
    this.contentDatabase.forEach((guide, key) => {
      if (key.startsWith(className)) {
        subjects.push(guide.subject);
      }
    });
    return subjects;
  }

  public searchContent(query: string, className?: string): any[] {
    const results: any[] = [];
    const queryLower = query.toLowerCase();

    this.contentDatabase.forEach((guide, key) => {
      if (className && !key.startsWith(className)) return;

      // Search in subject name
      if (guide.subject.toLowerCase().includes(queryLower)) {
        results.push({
          type: 'subject',
          class: guide.class,
          subject: guide.subject,
          relevance: 'high'
        });
      }

      // Search in chapters
      guide.chapters.forEach(chapter => {
        if (chapter.title.toLowerCase().includes(queryLower) ||
            chapter.topics.some(topic => topic.toLowerCase().includes(queryLower))) {
          results.push({
            type: 'chapter',
            class: guide.class,
            subject: guide.subject,
            chapter: chapter.title,
            chapterId: chapter.id,
            relevance: 'medium'
          });
        }
      });

      // Search in important topics
      guide.importantTopics.forEach(topic => {
        if (topic.toLowerCase().includes(queryLower)) {
          results.push({
            type: 'topic',
            class: guide.class,
            subject: guide.subject,
            topic: topic,
            relevance: 'low'
          });
        }
      });
    });

    return results.sort((a, b) => {
      const relevanceOrder = { high: 3, medium: 2, low: 1 };
      return relevanceOrder[b.relevance as keyof typeof relevanceOrder] - 
             relevanceOrder[a.relevance as keyof typeof relevanceOrder];
    });
  }

  public getStudyPlan(className: string, subject: string, weeks: number): any {
    const guide = this.getSubjectGuide(className, subject);
    if (!guide) return null;

    const chaptersPerWeek = Math.ceil(guide.totalChapters / weeks);
    const studyPlan = [];

    for (let week = 1; week <= weeks; week++) {
      const startChapter = (week - 1) * chaptersPerWeek;
      const endChapter = Math.min(week * chaptersPerWeek, guide.totalChapters);
      
      const weekChapters = guide.chapters.slice(startChapter, endChapter);
      
      studyPlan.push({
        week: week,
        chapters: weekChapters.map(ch => ({
          id: ch.id,
          title: ch.title,
          estimatedDuration: ch.estimatedDuration,
          topics: ch.topics
        })),
        totalTopics: weekChapters.reduce((sum, ch) => sum + ch.topics.length, 0),
        estimatedHours: weekChapters.reduce((sum, ch) => sum + parseInt(ch.estimatedDuration), 0),
        assessments: weekChapters.map(ch => `${ch.title} Quiz`),
        practicalWork: weekChapters.flatMap(ch => ch.practicalActivities).slice(0, 3)
      });
    }

    return {
      subject: guide.subject,
      class: guide.class,
      totalWeeks: weeks,
      totalChapters: guide.totalChapters,
      weeklyPlan: studyPlan,
      examPattern: guide.examPattern,
      studyTips: guide.studyTips
    };
  }

  public getProgressTracking(className: string, subject: string, completedChapters: string[]): any {
    const guide = this.getSubjectGuide(className, subject);
    if (!guide) return null;

    const totalChapters = guide.totalChapters;
    const completedCount = completedChapters.length;
    const progressPercentage = Math.round((completedCount / totalChapters) * 100);

    const nextChapter = guide.chapters.find(ch => !completedChapters.includes(ch.id));
    const completedTopics = guide.chapters
      .filter(ch => completedChapters.includes(ch.id))
      .flatMap(ch => ch.topics);

    return {
      subject: guide.subject,
      class: guide.class,
      totalChapters,
      completedChapters: completedCount,
      progressPercentage,
      nextChapter: nextChapter ? {
        id: nextChapter.id,
        title: nextChapter.title,
        estimatedDuration: nextChapter.estimatedDuration,
        difficulty: nextChapter.difficulty
      } : null,
      completedTopics: completedTopics.length,
      totalTopics: guide.chapters.flatMap(ch => ch.topics).length,
      recommendations: this.getRecommendations(guide, completedChapters)
    };
  }

  private getRecommendations(guide: SubjectGuide, completedChapters: string[]): string[] {
    const recommendations = [];
    
    if (completedChapters.length === 0) {
      recommendations.push('Start with the first chapter to build a strong foundation');
    } else if (completedChapters.length < guide.totalChapters * 0.5) {
      recommendations.push('Focus on understanding concepts rather than memorizing');
      recommendations.push('Practice exercises after each chapter');
    } else if (completedChapters.length < guide.totalChapters * 0.8) {
      recommendations.push('Start revision of completed chapters');
      recommendations.push('Attempt practice tests');
    } else {
      recommendations.push('Focus on exam preparation');
      recommendations.push('Solve previous year questions');
      recommendations.push('Take mock tests');
    }

    return recommendations;
  }
}

// Export singleton instance
export const samacheerKalviContentService = SamacheerKalviContentService.getInstance();