// Assessment Service for Samacheer Kalvi Content
// Comprehensive assessment and evaluation system

export interface Question {
  id: string;
  type: 'multiple_choice' | 'true_false' | 'short_answer' | 'long_answer' | 'fill_blank';
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation: string;
  difficulty: 'Easy' | 'Moderate' | 'Hard';
  marks: number;
  subject: string;
  class: string;
  chapter: string;
  topic: string;
  bloomsLevel: 'Remember' | 'Understand' | 'Apply' | 'Analyze' | 'Evaluate' | 'Create';
  estimatedTime: number; // in minutes
}

export interface Assessment {
  id: string;
  title: string;
  description: string;
  type: 'quiz' | 'test' | 'exam' | 'practice';
  subject: string;
  class: string;
  chapters: string[];
  questions: Question[];
  totalMarks: number;
  duration: number; // in minutes
  passingMarks: number;
  instructions: string[];
  createdAt: string;
  difficulty: 'Easy' | 'Moderate' | 'Hard';
  tags: string[];
}

export interface AssessmentResult {
  id: string;
  assessmentId: string;
  studentId: string;
  answers: { [questionId: string]: string | string[] };
  score: number;
  totalMarks: number;
  percentage: number;
  timeTaken: number; // in minutes
  submittedAt: string;
  feedback: {
    strengths: string[];
    weaknesses: string[];
    recommendations: string[];
    topicWiseScore: { [topic: string]: { scored: number; total: number } };
  };
}

export class AssessmentService {
  private static instance: AssessmentService;
  private assessments: Map<string, Assessment> = new Map();
  private questionBank: Map<string, Question[]> = new Map();
  private results: Map<string, AssessmentResult[]> = new Map();

  private constructor() {
    this.initializeQuestionBank();
    this.generateAssessments();
  }

  public static getInstance(): AssessmentService {
    if (!AssessmentService.instance) {
      AssessmentService.instance = new AssessmentService();
    }
    return AssessmentService.instance;
  }

  private initializeQuestionBank(): void {
    // Class 1 Tamil Questions
    this.addQuestionsToBank('Class 1', 'தமிழ்', [
      {
        id: 'tam-1-q1',
        type: 'multiple_choice',
        question: 'கீழ்க்கண்ட எழுத்துகளில் உயிர் எழுத்து எது?',
        options: ['க', 'அ', 'ங', 'ச'],
        correctAnswer: 'அ',
        explanation: 'அ என்பது உயிர் எழுத்து. க, ங, ச ஆகியவை மெய் எழுத்துகள்.',
        difficulty: 'Easy',
        marks: 1,
        subject: 'தமிழ்',
        class: 'Class 1',
        chapter: 'பாடி ஆடி விளையாடலாம்',
        topic: 'உயிர் எழுத்துக்கள்',
        bloomsLevel: 'Remember',
        estimatedTime: 1
      },
      {
        id: 'tam-1-q2',
        type: 'fill_blank',
        question: 'அ, ஆ, இ, ஈ, உ, ஊ, எ, ஏ, ஐ, ஒ, ஓ, ___',
        correctAnswer: 'ஔ',
        explanation: 'ஔ என்பது கடைசி உயிர் எழுத்து.',
        difficulty: 'Easy',
        marks: 1,
        subject: 'தமிழ்',
        class: 'Class 1',
        chapter: 'பாடி ஆடி விளையாடலாம்',
        topic: 'உயிர் எழுத்துக்கள்',
        bloomsLevel: 'Remember',
        estimatedTime: 1
      }
    ]);

    // Class 1 Math Questions
    this.addQuestionsToBank('Class 1', 'கணக்கு', [
      {
        id: 'math-1-q1',
        type: 'multiple_choice',
        question: '5 + 3 = ?',
        options: ['6', '7', '8', '9'],
        correctAnswer: '8',
        explanation: '5 + 3 = 8',
        difficulty: 'Easy',
        marks: 1,
        subject: 'கணக்கு',
        class: 'Class 1',
        chapter: 'கூட்டல்',
        topic: 'எளிய கூட்டல்',
        bloomsLevel: 'Apply',
        estimatedTime: 1
      },
      {
        id: 'math-1-q2',
        type: 'multiple_choice',
        question: 'வட்டம் என்பது எத்தனை பக்கங்கள் கொண்டது?',
        options: ['3', '4', '0', '5'],
        correctAnswer: '0',
        explanation: 'வட்டத்திற்கு பக்கங்கள் கிடையாது.',
        difficulty: 'Easy',
        marks: 1,
        subject: 'கணக்கு',
        class: 'Class 1',
        chapter: 'வடிவியல்',
        topic: 'வடிவங்கள்',
        bloomsLevel: 'Remember',
        estimatedTime: 1
      }
    ]);

    // Class 6 Mathematics Questions
    this.addQuestionsToBank('Class 6', 'Mathematics', [
      {
        id: 'math-6-q1',
        type: 'multiple_choice',
        question: 'Which of the following is a natural number?',
        options: ['-5', '0', '3', '2.5'],
        correctAnswer: '3',
        explanation: 'Natural numbers are positive integers starting from 1.',
        difficulty: 'Easy',
        marks: 1,
        subject: 'Mathematics',
        class: 'Class 6',
        chapter: 'Numbers',
        topic: 'Natural Numbers',
        bloomsLevel: 'Remember',
        estimatedTime: 1
      },
      {
        id: 'math-6-q2',
        type: 'short_answer',
        question: 'Find the HCF of 12 and 18.',
        correctAnswer: '6',
        explanation: 'Factors of 12: 1, 2, 3, 4, 6, 12. Factors of 18: 1, 2, 3, 6, 9, 18. Common factors: 1, 2, 3, 6. HCF = 6.',
        difficulty: 'Moderate',
        marks: 2,
        subject: 'Mathematics',
        class: 'Class 6',
        chapter: 'Numbers',
        topic: 'HCF and LCM',
        bloomsLevel: 'Apply',
        estimatedTime: 3
      }
    ]);

    // Class 10 Mathematics Questions
    this.addQuestionsToBank('Class 10', 'Mathematics', [
      {
        id: 'math-10-q1',
        type: 'short_answer',
        question: 'Find the zeros of the polynomial x² - 5x + 6.',
        correctAnswer: '2, 3',
        explanation: 'x² - 5x + 6 = (x - 2)(x - 3) = 0. So x = 2 or x = 3.',
        difficulty: 'Moderate',
        marks: 3,
        subject: 'Mathematics',
        class: 'Class 10',
        chapter: 'Polynomials',
        topic: 'Zeros of Polynomials',
        bloomsLevel: 'Apply',
        estimatedTime: 4
      },
      {
        id: 'math-10-q2',
        type: 'long_answer',
        question: 'Solve the quadratic equation 2x² - 7x + 3 = 0 using the quadratic formula.',
        correctAnswer: 'x = 3 or x = 1/2',
        explanation: 'Using quadratic formula: x = (7 ± √(49-24))/4 = (7 ± 5)/4. So x = 3 or x = 1/2.',
        difficulty: 'Hard',
        marks: 5,
        subject: 'Mathematics',
        class: 'Class 10',
        chapter: 'Quadratic Equations',
        topic: 'Solving Quadratic Equations',
        bloomsLevel: 'Apply',
        estimatedTime: 8
      }
    ]);

    // Class 12 Physics Questions
    this.addQuestionsToBank('Class 12', 'Physics', [
      {
        id: 'phy-12-q1',
        type: 'multiple_choice',
        question: 'The unit of electric field is:',
        options: ['N/C', 'C/N', 'N·C', 'C²/N'],
        correctAnswer: 'N/C',
        explanation: 'Electric field is force per unit charge, so unit is N/C.',
        difficulty: 'Easy',
        marks: 1,
        subject: 'Physics',
        class: 'Class 12',
        chapter: 'Electric Charges and Fields',
        topic: 'Electric Field',
        bloomsLevel: 'Remember',
        estimatedTime: 1
      },
      {
        id: 'phy-12-q2',
        type: 'long_answer',
        question: 'Derive the expression for electric field due to a point charge.',
        correctAnswer: 'E = kq/r² = q/(4πε₀r²)',
        explanation: 'Using Coulomb\'s law and definition of electric field, E = F/q₀ = kqq₀/r²q₀ = kq/r².',
        difficulty: 'Hard',
        marks: 5,
        subject: 'Physics',
        class: 'Class 12',
        chapter: 'Electric Charges and Fields',
        topic: 'Electric Field due to Point Charge',
        bloomsLevel: 'Understand',
        estimatedTime: 10
      }
    ]);
  }

  private addQuestionsToBank(className: string, subject: string, questions: Question[]): void {
    const key = `${className}-${subject}`;
    const existingQuestions = this.questionBank.get(key) || [];
    this.questionBank.set(key, [...existingQuestions, ...questions]);
  }

  private generateAssessments(): void {
    // Generate assessments for each class-subject combination
    this.questionBank.forEach((questions, key) => {
      const [className, subject] = key.split('-');
      
      // Create chapter-wise quizzes
      const chapters = [...new Set(questions.map(q => q.chapter))];
      chapters.forEach(chapter => {
        const chapterQuestions = questions.filter(q => q.chapter === chapter);
        if (chapterQuestions.length > 0) {
          this.createAssessment({
            id: `${key}-${chapter.replace(/\s+/g, '-').toLowerCase()}-quiz`,
            title: `${chapter} - Quiz`,
            description: `Quick assessment for ${chapter}`,
            type: 'quiz',
            subject,
            class: className,
            chapters: [chapter],
            questions: chapterQuestions.slice(0, 5), // First 5 questions
            duration: 15,
            difficulty: 'Easy',
            tags: ['quiz', 'chapter-wise']
          });
        }
      });

      // Create comprehensive tests
      if (questions.length >= 10) {
        this.createAssessment({
          id: `${key}-comprehensive-test`,
          title: `${subject} - Comprehensive Test`,
          description: `Complete assessment covering all topics in ${subject}`,
          type: 'test',
          subject,
          class: className,
          chapters: [...new Set(questions.map(q => q.chapter))],
          questions: questions.slice(0, 20), // First 20 questions
          duration: 60,
          difficulty: 'Moderate',
          tags: ['test', 'comprehensive']
        });
      }
    });
  }

  private createAssessment(config: {
    id: string;
    title: string;
    description: string;
    type: 'quiz' | 'test' | 'exam' | 'practice';
    subject: string;
    class: string;
    chapters: string[];
    questions: Question[];
    duration: number;
    difficulty: 'Easy' | 'Moderate' | 'Hard';
    tags: string[];
  }): void {
    const assessment: Assessment = {
      ...config,
      totalMarks: config.questions.reduce((sum, q) => sum + q.marks, 0),
      passingMarks: Math.ceil(config.questions.reduce((sum, q) => sum + q.marks, 0) * 0.4),
      instructions: this.generateInstructions(config.type, config.duration),
      createdAt: new Date().toISOString()
    };

    this.assessments.set(assessment.id, assessment);
  }

  private generateInstructions(type: string, duration: number): string[] {
    const commonInstructions = [
      'Read all questions carefully before answering.',
      'Manage your time effectively.',
      'Review your answers before submitting.'
    ];

    const typeSpecificInstructions: { [key: string]: string[] } = {
      quiz: [
        'This is a quick assessment.',
        'Each question carries equal marks.',
        'No negative marking.'
      ],
      test: [
        'This is a comprehensive test.',
        'Answer all questions.',
        'Show your working for numerical problems.'
      ],
      exam: [
        'This is a formal examination.',
        'Follow exam hall rules.',
        'No external help allowed.'
      ],
      practice: [
        'This is for practice only.',
        'Take your time to understand concepts.',
        'Review explanations after completion.'
      ]
    };

    return [
      ...commonInstructions,
      ...(typeSpecificInstructions[type] || []),
      `Total duration: ${duration} minutes.`
    ];
  }

  // Public methods
  public getAssessmentsByClass(className: string): Assessment[] {
    const assessments: Assessment[] = [];
    this.assessments.forEach(assessment => {
      if (assessment.class === className) {
        assessments.push(assessment);
      }
    });
    return assessments.sort((a, b) => a.title.localeCompare(b.title));
  }

  public getAssessmentsBySubject(className: string, subject: string): Assessment[] {
    return this.getAssessmentsByClass(className)
      .filter(assessment => assessment.subject === subject);
  }

  public getAssessment(assessmentId: string): Assessment | null {
    return this.assessments.get(assessmentId) || null;
  }

  public submitAssessment(
    assessmentId: string,
    studentId: string,
    answers: { [questionId: string]: string | string[] },
    timeTaken: number
  ): AssessmentResult {
    const assessment = this.getAssessment(assessmentId);
    if (!assessment) {
      throw new Error('Assessment not found');
    }

    let score = 0;
    const topicWiseScore: { [topic: string]: { scored: number; total: number } } = {};

    // Calculate score and topic-wise performance
    assessment.questions.forEach(question => {
      const studentAnswer = answers[question.id];
      const isCorrect = this.checkAnswer(question, studentAnswer);
      
      if (isCorrect) {
        score += question.marks;
      }

      // Track topic-wise score
      if (!topicWiseScore[question.topic]) {
        topicWiseScore[question.topic] = { scored: 0, total: 0 };
      }
      topicWiseScore[question.topic].total += question.marks;
      if (isCorrect) {
        topicWiseScore[question.topic].scored += question.marks;
      }
    });

    const percentage = Math.round((score / assessment.totalMarks) * 100);
    
    const result: AssessmentResult = {
      id: `${assessmentId}-${studentId}-${Date.now()}`,
      assessmentId,
      studentId,
      answers,
      score,
      totalMarks: assessment.totalMarks,
      percentage,
      timeTaken,
      submittedAt: new Date().toISOString(),
      feedback: this.generateFeedback(assessment, score, percentage, topicWiseScore)
    };

    // Store result
    const studentResults = this.results.get(studentId) || [];
    studentResults.push(result);
    this.results.set(studentId, studentResults);

    return result;
  }

  private checkAnswer(question: Question, studentAnswer: string | string[]): boolean {
    if (!studentAnswer) return false;

    if (Array.isArray(question.correctAnswer)) {
      if (!Array.isArray(studentAnswer)) return false;
      return question.correctAnswer.every(ans => studentAnswer.includes(ans)) &&
             studentAnswer.every(ans => question.correctAnswer.includes(ans));
    } else {
      const correct = question.correctAnswer.toString().toLowerCase().trim();
      const student = studentAnswer.toString().toLowerCase().trim();
      return correct === student;
    }
  }

  private generateFeedback(
    assessment: Assessment,
    score: number,
    percentage: number,
    topicWiseScore: { [topic: string]: { scored: number; total: number } }
  ): AssessmentResult['feedback'] {
    const strengths: string[] = [];
    const weaknesses: string[] = [];
    const recommendations: string[] = [];

    // Analyze topic-wise performance
    Object.entries(topicWiseScore).forEach(([topic, scores]) => {
      const topicPercentage = (scores.scored / scores.total) * 100;
      if (topicPercentage >= 80) {
        strengths.push(`Excellent understanding of ${topic}`);
      } else if (topicPercentage >= 60) {
        strengths.push(`Good grasp of ${topic}`);
      } else if (topicPercentage >= 40) {
        weaknesses.push(`Need improvement in ${topic}`);
        recommendations.push(`Review concepts related to ${topic}`);
      } else {
        weaknesses.push(`Weak understanding of ${topic}`);
        recommendations.push(`Focus more on ${topic} - practice more problems`);
      }
    });

    // Overall performance feedback
    if (percentage >= 90) {
      strengths.push('Outstanding overall performance');
      recommendations.push('Continue with advanced topics');
    } else if (percentage >= 75) {
      strengths.push('Very good overall performance');
      recommendations.push('Work on weak areas to achieve excellence');
    } else if (percentage >= 60) {
      recommendations.push('Regular practice needed to improve performance');
    } else if (percentage >= 40) {
      recommendations.push('Significant improvement needed - focus on basics');
    } else {
      recommendations.push('Need to restart with fundamental concepts');
    }

    return { strengths, weaknesses, recommendations, topicWiseScore };
  }

  public getStudentResults(studentId: string): AssessmentResult[] {
    return this.results.get(studentId) || [];
  }

  public getStudentProgress(studentId: string, className: string, subject?: string): any {
    const results = this.getStudentResults(studentId)
      .filter(result => {
        const assessment = this.getAssessment(result.assessmentId);
        return assessment && 
               assessment.class === className && 
               (!subject || assessment.subject === subject);
      });

    if (results.length === 0) {
      return {
        totalAssessments: 0,
        averageScore: 0,
        averagePercentage: 0,
        strongTopics: [],
        weakTopics: [],
        recommendations: ['Start taking assessments to track progress']
      };
    }

    const totalScore = results.reduce((sum, r) => sum + r.score, 0);
    const totalMarks = results.reduce((sum, r) => sum + r.totalMarks, 0);
    const averagePercentage = Math.round((totalScore / totalMarks) * 100);

    // Analyze topic-wise performance across all assessments
    const topicPerformance: { [topic: string]: { scored: number; total: number } } = {};
    results.forEach(result => {
      Object.entries(result.feedback.topicWiseScore).forEach(([topic, scores]) => {
        if (!topicPerformance[topic]) {
          topicPerformance[topic] = { scored: 0, total: 0 };
        }
        topicPerformance[topic].scored += scores.scored;
        topicPerformance[topic].total += scores.total;
      });
    });

    const strongTopics = Object.entries(topicPerformance)
      .filter(([, scores]) => (scores.scored / scores.total) >= 0.8)
      .map(([topic]) => topic);

    const weakTopics = Object.entries(topicPerformance)
      .filter(([, scores]) => (scores.scored / scores.total) < 0.6)
      .map(([topic]) => topic);

    return {
      totalAssessments: results.length,
      averageScore: Math.round(totalScore / results.length),
      averagePercentage,
      strongTopics,
      weakTopics,
      recommendations: this.generateProgressRecommendations(averagePercentage, weakTopics)
    };
  }

  private generateProgressRecommendations(averagePercentage: number, weakTopics: string[]): string[] {
    const recommendations = [];

    if (averagePercentage >= 80) {
      recommendations.push('Excellent progress! Continue with advanced topics.');
    } else if (averagePercentage >= 60) {
      recommendations.push('Good progress. Focus on weak areas for improvement.');
    } else {
      recommendations.push('Need more practice. Focus on fundamental concepts.');
    }

    if (weakTopics.length > 0) {
      recommendations.push(`Pay special attention to: ${weakTopics.join(', ')}`);
    }

    recommendations.push('Take regular assessments to track improvement');
    recommendations.push('Review explanations for incorrect answers');

    return recommendations;
  }

  public createCustomAssessment(
    title: string,
    className: string,
    subject: string,
    topics: string[],
    questionCount: number,
    difficulty: 'Easy' | 'Moderate' | 'Hard'
  ): Assessment | null {
    const key = `${className}-${subject}`;
    const availableQuestions = this.questionBank.get(key) || [];

    let filteredQuestions = availableQuestions.filter(q => 
      topics.some(topic => q.topic.toLowerCase().includes(topic.toLowerCase())) &&
      q.difficulty === difficulty
    );

    if (filteredQuestions.length < questionCount) {
      // If not enough questions with exact difficulty, include other difficulties
      filteredQuestions = availableQuestions.filter(q => 
        topics.some(topic => q.topic.toLowerCase().includes(topic.toLowerCase()))
      );
    }

    if (filteredQuestions.length === 0) {
      return null;
    }

    // Randomly select questions
    const selectedQuestions = filteredQuestions
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.min(questionCount, filteredQuestions.length));

    const assessment: Assessment = {
      id: `custom-${Date.now()}`,
      title,
      description: `Custom assessment for ${topics.join(', ')}`,
      type: 'practice',
      subject,
      class: className,
      chapters: [...new Set(selectedQuestions.map(q => q.chapter))],
      questions: selectedQuestions,
      totalMarks: selectedQuestions.reduce((sum, q) => sum + q.marks, 0),
      duration: selectedQuestions.reduce((sum, q) => sum + q.estimatedTime, 0),
      passingMarks: Math.ceil(selectedQuestions.reduce((sum, q) => sum + q.marks, 0) * 0.4),
      instructions: this.generateInstructions('practice', selectedQuestions.reduce((sum, q) => sum + q.estimatedTime, 0)),
      createdAt: new Date().toISOString(),
      difficulty,
      tags: ['custom', 'practice', ...topics]
    };

    this.assessments.set(assessment.id, assessment);
    return assessment;
  }
}

// Export singleton instance
export const assessmentService = AssessmentService.getInstance();