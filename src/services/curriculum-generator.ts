// Curriculum Generator Service - Generates complete curriculum for Classes 1-12
// with YouTube video integration

import { kalviTVContent } from './youtube-kalvi';

export interface VideoResource {
  videoId: string;
  title: string;
  url: string;
  duration: string;
  description: string;
  thumbnailUrl: string;
}

export interface Chapter {
  chapter_id: string;
  chapter_order: number;
  chapter_title: string;
  summary: string;
  key_topics: string[];
  learning_outcomes: string[];
  videos: VideoResource[];
  difficulty_level: 'Easy' | 'Moderate' | 'Hard';
  estimated_hours: number;
}

export interface Subject {
  course_id: string;
  subject_name: string;
  overview: string;
  chapters: Chapter[];
  learning_options: {
    lessons: boolean;
    practice: boolean;
    activities: boolean;
    assessments: boolean;
  };
  difficulty_level: 'Beginner' | 'Easy' | 'Moderate' | 'Advanced';
  recommended_age: string;
  total_videos: number;
}

export interface Course {
  class: string;
  medium: string;
  board: string;
  syllabus_source: string;
  stream?: 'Science' | 'Commerce' | 'Arts' | 'General';
  subjects: Subject[];
}

// YouTube video ID generator helper
const getYouTubeEmbed = (videoId: string): string => {
  return `https://www.youtube.com/embed/${videoId}`;
};

const getThumbnail = (videoId: string): string => {
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
};

// Helper to get real videos from Kalvi TV content
const getRealVideosForSubject = (classNum: number, subject: string, chapterIndex: number): VideoResource[] => {
  const className = `Class ${classNum}`;
  
  // Find matching playlists from Kalvi TV content
  const matchingPlaylists = kalviTVContent.filter(playlist => 
    playlist.class === className && 
    (playlist.subject === subject || 
     playlist.subject.toLowerCase().includes(subject.toLowerCase()) ||
     subject.toLowerCase().includes(playlist.subject.toLowerCase()))
  );
  
  // Get videos from matching playlists
  const allVideos = matchingPlaylists.flatMap(playlist => playlist.videos);
  
  // If we have real videos, use them
  if (allVideos.length > 0) {
    // Get 2-3 videos per chapter, cycling through available videos
    const startIndex = (chapterIndex * 2) % allVideos.length;
    const selectedVideos = [];
    
    for (let i = 0; i < Math.min(2, allVideos.length); i++) {
      const video = allVideos[(startIndex + i) % allVideos.length];
      
      // Extract the actual YouTube video ID from the videoUrl
      let youtubeId = video.id;
      if (video.videoUrl && video.videoUrl.includes('embed/')) {
        const match = video.videoUrl.match(/embed\/([a-zA-Z0-9_-]{11})/);
        if (match) {
          youtubeId = match[1];
        }
      }
      
      selectedVideos.push({
        videoId: youtubeId,
        title: video.title,
        url: video.videoUrl,
        duration: video.duration,
        description: video.description,
        thumbnailUrl: video.thumbnailUrl
      });
    }
    
    return selectedVideos;
  }
  
  // Fallback to sample educational videos if no specific content found
  const fallbackVideos = [
    {
      videoId: 'rIJKxJmS3lI',
      title: `${subject} - Chapter ${chapterIndex + 1} Introduction`,
      url: getYouTubeEmbed('rIJKxJmS3lI'),
      duration: '18:30',
      description: `Complete introduction to ${subject} concepts`,
      thumbnailUrl: getThumbnail('rIJKxJmS3lI')
    },
    {
      videoId: 'Yocja_N5s1I',
      title: `${subject} - Chapter ${chapterIndex + 1} Detailed Explanation`,
      url: getYouTubeEmbed('Yocja_N5s1I'),
      duration: '22:45',
      description: `Detailed explanation with examples`,
      thumbnailUrl: getThumbnail('Yocja_N5s1I')
    }
  ];
  
  return fallbackVideos;
};

// Subject definitions for each class
const SUBJECTS_BY_CLASS: Record<string, { tamil: string[]; english: string[] }> = {
  '1-5': {
    tamil: ['தமிழ்', 'கணக்கு', 'சூழ்நிலையியல்'],
    english: ['English', 'Mathematics', 'Environmental Studies']
  },
  '6-8': {
    tamil: ['தமிழ்', 'கணக்கு', 'அறிவியல்', 'சமூக அறிவியல்'],
    english: ['English', 'Mathematics', 'Science', 'Social Science']
  },
  '9-10': {
    tamil: ['தமிழ்', 'கணக்கு', 'அறிவியல்', 'சமூக அறிவியல்'],
    english: ['English', 'Mathematics', 'Science', 'Social Science']
  },
  '11-12-science': {
    tamil: ['தமிழ்', 'கணக்கு', 'இயற்பியல்', 'வேதியியல்', 'உயிரியல்', 'கணினி அறிவியல்'],
    english: ['English', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science']
  }
};

// Generate curriculum for all classes
export class CurriculumGenerator {
  
  // Generate complete curriculum
  static generateCompleteCurriculum(): Course[] {
    const courses: Course[] = [];
    
    // Classes 1-5
    for (let classNum = 1; classNum <= 5; classNum++) {
      courses.push(...this.generatePrimaryClass(classNum));
    }
    
    // Classes 6-8
    for (let classNum = 6; classNum <= 8; classNum++) {
      courses.push(...this.generateMiddleClass(classNum));
    }
    
    // Classes 9-10
    for (let classNum = 9; classNum <= 10; classNum++) {
      courses.push(...this.generateSecondaryClass(classNum));
    }
    
    // Classes 11-12
    for (let classNum = 11; classNum <= 12; classNum++) {
      courses.push(...this.generateHigherSecondaryClass(classNum));
    }
    
    return courses;
  }
  
  // Generate primary classes (1-5)
  private static generatePrimaryClass(classNum: number): Course[] {
    const courses: Course[] = [];
    
    // Tamil Medium
    courses.push({
      class: `Class ${classNum}`,
      medium: 'Tamil',
      board: 'Tamil Nadu State Board',
      syllabus_source: 'Samacheer Kalvi 2024-25',
      subjects: [
        this.generateTamilSubject(classNum, 'primary'),
        this.generateMathSubject(classNum, 'primary', 'tamil'),
        this.generateEVSSubject(classNum, 'tamil')
      ]
    });
    
    // English Medium
    courses.push({
      class: `Class ${classNum}`,
      medium: 'English',
      board: 'Tamil Nadu State Board',
      syllabus_source: 'Samacheer Kalvi 2024-25',
      subjects: [
        this.generateEnglishSubject(classNum, 'primary'),
        this.generateMathSubject(classNum, 'primary', 'english'),
        this.generateEVSSubject(classNum, 'english')
      ]
    });
    
    return courses;
  }
  
  // Generate middle classes (6-8)
  private static generateMiddleClass(classNum: number): Course[] {
    const courses: Course[] = [];
    
    // Tamil Medium
    courses.push({
      class: `Class ${classNum}`,
      medium: 'Tamil',
      board: 'Tamil Nadu State Board',
      syllabus_source: 'Samacheer Kalvi 2024-25',
      subjects: [
        this.generateTamilSubject(classNum, 'middle'),
        this.generateMathSubject(classNum, 'middle', 'tamil'),
        this.generateScienceSubject(classNum, 'tamil'),
        this.generateSocialScienceSubject(classNum, 'tamil')
      ]
    });
    
    // English Medium
    courses.push({
      class: `Class ${classNum}`,
      medium: 'English',
      board: 'Tamil Nadu State Board',
      syllabus_source: 'Samacheer Kalvi 2024-25',
      subjects: [
        this.generateEnglishSubject(classNum, 'middle'),
        this.generateMathSubject(classNum, 'middle', 'english'),
        this.generateScienceSubject(classNum, 'english'),
        this.generateSocialScienceSubject(classNum, 'english')
      ]
    });
    
    return courses;
  }
  
  // Generate secondary classes (9-10)
  private static generateSecondaryClass(classNum: number): Course[] {
    return this.generateMiddleClass(classNum); // Similar structure
  }
  
  // Generate higher secondary classes (11-12)
  private static generateHigherSecondaryClass(classNum: number): Course[] {
    const courses: Course[] = [];
    
    // Science Stream
    courses.push({
      class: `Class ${classNum}`,
      medium: 'English',
      board: 'Tamil Nadu State Board',
      syllabus_source: 'Samacheer Kalvi 2024-25 (HSC)',
      stream: 'Science',
      subjects: [
        this.generateEnglishSubject(classNum, 'higher'),
        this.generateMathSubject(classNum, 'higher', 'english'),
        this.generatePhysicsSubject(classNum),
        this.generateChemistrySubject(classNum),
        this.generateBiologySubject(classNum),
        this.generateComputerScienceSubject(classNum)
      ]
    });
    
    return courses;
  }
  
  // Subject generators
  private static generateTamilSubject(classNum: number, level: string): Subject {
    const chapters = this.generateTamilChapters(classNum, level);
    return {
      course_id: `c${classNum}-ta-tam`,
      subject_name: 'தமிழ்',
      overview: `வகுப்பு ${classNum} தமிழ் மொழி பாடங்கள்`,
      chapters,
      learning_options: { lessons: true, practice: true, activities: true, assessments: true },
      difficulty_level: this.getDifficultyLevel(classNum),
      recommended_age: `${classNum + 4}-${classNum + 5} years`,
      total_videos: chapters.reduce((sum, ch) => sum + ch.videos.length, 0)
    };
  }
  
  private static generateEnglishSubject(classNum: number, level: string): Subject {
    const chapters = this.generateEnglishChapters(classNum, level);
    return {
      course_id: `c${classNum}-en-eng`,
      subject_name: 'English',
      overview: `Class ${classNum} English Language Course`,
      chapters,
      learning_options: { lessons: true, practice: true, activities: true, assessments: true },
      difficulty_level: this.getDifficultyLevel(classNum),
      recommended_age: `${classNum + 4}-${classNum + 5} years`,
      total_videos: chapters.reduce((sum, ch) => sum + ch.videos.length, 0)
    };
  }
  
  private static generateMathSubject(classNum: number, level: string, medium: string): Subject {
    const chapters = this.generateMathChapters(classNum, level, medium);
    return {
      course_id: `c${classNum}-${medium === 'tamil' ? 'ta' : 'en'}-math`,
      subject_name: medium === 'tamil' ? 'கணக்கு' : 'Mathematics',
      overview: medium === 'tamil' ? `வகுப்பு ${classNum} கணிதம்` : `Class ${classNum} Mathematics`,
      chapters,
      learning_options: { lessons: true, practice: true, activities: true, assessments: true },
      difficulty_level: this.getDifficultyLevel(classNum),
      recommended_age: `${classNum + 4}-${classNum + 5} years`,
      total_videos: chapters.reduce((sum, ch) => sum + ch.videos.length, 0)
    };
  }

  
  private static generateScienceSubject(classNum: number, medium: string): Subject {
    const chapters = this.generateScienceChapters(classNum, medium);
    return {
      course_id: `c${classNum}-${medium === 'tamil' ? 'ta' : 'en'}-sci`,
      subject_name: medium === 'tamil' ? 'அறிவியல்' : 'Science',
      overview: medium === 'tamil' ? `வகுப்பு ${classNum} அறிவியல்` : `Class ${classNum} Science`,
      chapters,
      learning_options: { lessons: true, practice: true, activities: true, assessments: true },
      difficulty_level: this.getDifficultyLevel(classNum),
      recommended_age: `${classNum + 4}-${classNum + 5} years`,
      total_videos: chapters.reduce((sum, ch) => sum + ch.videos.length, 0)
    };
  }
  
  private static generateSocialScienceSubject(classNum: number, medium: string): Subject {
    const chapters = this.generateSocialScienceChapters(classNum, medium);
    return {
      course_id: `c${classNum}-${medium === 'tamil' ? 'ta' : 'en'}-soc`,
      subject_name: medium === 'tamil' ? 'சமூக அறிவியல்' : 'Social Science',
      overview: medium === 'tamil' ? `வகுப்பு ${classNum} சமூக அறிவியல்` : `Class ${classNum} Social Science`,
      chapters,
      learning_options: { lessons: true, practice: true, activities: true, assessments: true },
      difficulty_level: this.getDifficultyLevel(classNum),
      recommended_age: `${classNum + 4}-${classNum + 5} years`,
      total_videos: chapters.reduce((sum, ch) => sum + ch.videos.length, 0)
    };
  }
  
  private static generateEVSSubject(classNum: number, medium: string): Subject {
    const chapters = this.generateEVSChapters(classNum, medium);
    return {
      course_id: `c${classNum}-${medium === 'tamil' ? 'ta' : 'en'}-evs`,
      subject_name: medium === 'tamil' ? 'சூழ்நிலையியல்' : 'Environmental Studies',
      overview: medium === 'tamil' ? `வகுப்பு ${classNum} சூழ்நிலையியல்` : `Class ${classNum} Environmental Studies`,
      chapters,
      learning_options: { lessons: true, practice: true, activities: true, assessments: true },
      difficulty_level: this.getDifficultyLevel(classNum),
      recommended_age: `${classNum + 4}-${classNum + 5} years`,
      total_videos: chapters.reduce((sum, ch) => sum + ch.videos.length, 0)
    };
  }
  
  private static generatePhysicsSubject(classNum: number): Subject {
    const chapters = this.generatePhysicsChapters(classNum);
    return {
      course_id: `c${classNum}-en-phy`,
      subject_name: 'Physics',
      overview: `Class ${classNum} Physics - Advanced Concepts`,
      chapters,
      learning_options: { lessons: true, practice: true, activities: true, assessments: true },
      difficulty_level: 'Advanced',
      recommended_age: `${classNum + 4}-${classNum + 5} years`,
      total_videos: chapters.reduce((sum, ch) => sum + ch.videos.length, 0)
    };
  }
  
  private static generateChemistrySubject(classNum: number): Subject {
    const chapters = this.generateChemistryChapters(classNum);
    return {
      course_id: `c${classNum}-en-chem`,
      subject_name: 'Chemistry',
      overview: `Class ${classNum} Chemistry - Molecular Science`,
      chapters,
      learning_options: { lessons: true, practice: true, activities: true, assessments: true },
      difficulty_level: 'Advanced',
      recommended_age: `${classNum + 4}-${classNum + 5} years`,
      total_videos: chapters.reduce((sum, ch) => sum + ch.videos.length, 0)
    };
  }
  
  private static generateBiologySubject(classNum: number): Subject {
    const chapters = this.generateBiologyChapters(classNum);
    return {
      course_id: `c${classNum}-en-bio`,
      subject_name: 'Biology',
      overview: `Class ${classNum} Biology - Life Sciences`,
      chapters,
      learning_options: { lessons: true, practice: true, activities: true, assessments: true },
      difficulty_level: 'Advanced',
      recommended_age: `${classNum + 4}-${classNum + 5} years`,
      total_videos: chapters.reduce((sum, ch) => sum + ch.videos.length, 0)
    };
  }
  
  private static generateComputerScienceSubject(classNum: number): Subject {
    const chapters = this.generateComputerScienceChapters(classNum);
    return {
      course_id: `c${classNum}-en-cs`,
      subject_name: 'Computer Science',
      overview: `Class ${classNum} Computer Science - Programming & Technology`,
      chapters,
      learning_options: { lessons: true, practice: true, activities: true, assessments: true },
      difficulty_level: 'Advanced',
      recommended_age: `${classNum + 4}-${classNum + 5} years`,
      total_videos: chapters.reduce((sum, ch) => sum + ch.videos.length, 0)
    };
  }
  
  // Chapter generators
  private static generateTamilChapters(classNum: number, level: string): Chapter[] {
    const baseChapters: Chapter[] = [
      {
        chapter_id: `c${classNum}-ta-tam-ch1`,
        chapter_order: 1,
        chapter_title: classNum <= 2 ? 'உயிர் எழுத்துக்கள்' : 'இலக்கியம்',
        summary: classNum <= 2 ? 'தமிழ் எழுத்துக்களை கற்போம்' : 'தமிழ் இலக்கியத்தை அறிவோம்',
        key_topics: classNum <= 2 ? ['அ முதல் ஔ வரை', 'எழுத்து அடையாளம்'] : ['கவிதை', 'கதை', 'இலக்கணம்'],
        learning_outcomes: ['தமிழ் மொழியை புரிந்துகொள்வர்', 'வாசிக்கும் திறன் வளரும்'],
        videos: getRealVideosForSubject(classNum, 'தமிழ்', 0),
        difficulty_level: classNum <= 3 ? 'Easy' : classNum <= 7 ? 'Moderate' : 'Hard',
        estimated_hours: 15 + classNum * 2
      }
    ];
    
    // Add more chapters based on class level
    for (let i = 2; i <= Math.min(10, classNum + 3); i++) {
      baseChapters.push({
        chapter_id: `c${classNum}-ta-tam-ch${i}`,
        chapter_order: i,
        chapter_title: `பாடம் ${i}`,
        summary: `வகுப்பு ${classNum} தமிழ் பாடம் ${i}`,
        key_topics: ['வாசிப்பு', 'எழுத்து', 'இலக்கணம்'],
        learning_outcomes: ['மொழித்திறன் வளர்ச்சி'],
        videos: getRealVideosForSubject(classNum, 'தமிழ்', i - 1),
        difficulty_level: classNum <= 3 ? 'Easy' : classNum <= 7 ? 'Moderate' : 'Hard',
        estimated_hours: 12 + i * 2
      });
    }
    
    return baseChapters;
  }
  
  private static generateEnglishChapters(classNum: number, level: string): Chapter[] {
    const topics = classNum <= 3 
      ? ['Alphabets', 'Words', 'Simple Sentences']
      : classNum <= 7
      ? ['Grammar', 'Comprehension', 'Writing']
      : ['Literature', 'Advanced Grammar', 'Essay Writing'];
    
    const baseChapters: Chapter[] = [];
    
    for (let i = 1; i <= Math.min(10, classNum + 3); i++) {
      baseChapters.push({
        chapter_id: `c${classNum}-en-eng-ch${i}`,
        chapter_order: i,
        chapter_title: `Chapter ${i}`,
        summary: `Class ${classNum} English Lesson ${i}`,
        key_topics: topics,
        learning_outcomes: ['Improve English language skills', 'Better communication'],
        videos: getRealVideosForSubject(classNum, 'English', i - 1),
        difficulty_level: classNum <= 3 ? 'Easy' : classNum <= 7 ? 'Moderate' : 'Hard',
        estimated_hours: 12 + i * 2
      });
    }
    
    return baseChapters;
  }
  
  private static generateMathChapters(classNum: number, level: string, medium: string): Chapter[] {
    const topics = classNum <= 3
      ? ['Numbers', 'Addition', 'Subtraction', 'Shapes']
      : classNum <= 7
      ? ['Algebra', 'Geometry', 'Fractions', 'Decimals']
      : ['Advanced Algebra', 'Trigonometry', 'Calculus', 'Statistics'];
    
    const baseChapters: Chapter[] = [];
    const chapterTitles = classNum <= 3
      ? ['Numbers', 'Addition', 'Subtraction', 'Multiplication', 'Division', 'Shapes', 'Measurement']
      : classNum <= 7
      ? ['Numbers', 'Algebra', 'Geometry', 'Fractions', 'Decimals', 'Mensuration', 'Data Handling']
      : ['Real Numbers', 'Polynomials', 'Linear Equations', 'Quadratic Equations', 'Trigonometry', 'Statistics', 'Probability'];
    
    chapterTitles.forEach((title, index) => {
      baseChapters.push({
        chapter_id: `c${classNum}-${medium === 'tamil' ? 'ta' : 'en'}-math-ch${index + 1}`,
        chapter_order: index + 1,
        chapter_title: medium === 'tamil' ? `பாடம் ${index + 1}: ${title}` : title,
        summary: `${title} - Complete concepts and problem solving`,
        key_topics: topics,
        learning_outcomes: ['Master mathematical concepts', 'Problem solving skills'],
        videos: getRealVideosForSubject(classNum, medium === 'tamil' ? 'கணக்கு' : 'Mathematics', index),
        difficulty_level: classNum <= 3 ? 'Easy' : classNum <= 7 ? 'Moderate' : 'Hard',
        estimated_hours: 15 + index * 3
      });
    });
    
    return baseChapters;
  }

  
  private static generateScienceChapters(classNum: number, medium: string): Chapter[] {
    const chapterTitles = classNum <= 7
      ? ['Matter', 'Living Things', 'Energy', 'Light', 'Sound', 'Heat', 'Electricity', 'Magnetism']
      : ['Chemical Reactions', 'Acids and Bases', 'Metals and Non-metals', 'Carbon Compounds', 'Periodic Table', 'Life Processes', 'Heredity', 'Evolution'];
    
    return chapterTitles.map((title, index) => ({
      chapter_id: `c${classNum}-${medium === 'tamil' ? 'ta' : 'en'}-sci-ch${index + 1}`,
      chapter_order: index + 1,
      chapter_title: title,
      summary: `Understanding ${title} - Concepts and experiments`,
      key_topics: ['Theory', 'Experiments', 'Applications'],
      learning_outcomes: ['Understand scientific concepts', 'Apply knowledge'],
      videos: getRealVideosForSubject(classNum, medium === 'tamil' ? 'அறிவியல்' : 'Science', index),
      difficulty_level: classNum <= 7 ? 'Moderate' : 'Hard',
      estimated_hours: 18 + index * 2
    }));
  }
  
  private static generateSocialScienceChapters(classNum: number, medium: string): Chapter[] {
    const chapterTitles = classNum <= 7
      ? ['Our Country', 'History', 'Geography', 'Civics', 'Economics']
      : ['Indian Freedom Struggle', 'World History', 'Indian Geography', 'Political Science', 'Economics'];
    
    return chapterTitles.map((title, index) => ({
      chapter_id: `c${classNum}-${medium === 'tamil' ? 'ta' : 'en'}-soc-ch${index + 1}`,
      chapter_order: index + 1,
      chapter_title: title,
      summary: `Exploring ${title} - History, Geography, and Society`,
      key_topics: ['Historical Events', 'Geographical Features', 'Social Systems'],
      learning_outcomes: ['Understand society', 'Learn history and geography'],
      videos: getRealVideosForSubject(classNum, medium === 'tamil' ? 'சமூக அறிவியல்' : 'Social Science', index),
      difficulty_level: classNum <= 7 ? 'Moderate' : 'Hard',
      estimated_hours: 16 + index * 2
    }));
  }
  
  private static generateEVSChapters(classNum: number, medium: string): Chapter[] {
    const chapterTitles = ['My Body', 'Plants', 'Animals', 'Food', 'Water', 'Air', 'Our Environment'];
    
    return chapterTitles.map((title, index) => ({
      chapter_id: `c${classNum}-${medium === 'tamil' ? 'ta' : 'en'}-evs-ch${index + 1}`,
      chapter_order: index + 1,
      chapter_title: title,
      summary: `Learning about ${title} and our environment`,
      key_topics: ['Nature', 'Environment', 'Health'],
      learning_outcomes: ['Understand environment', 'Learn about nature'],
      videos: getRealVideosForSubject(classNum, medium === 'tamil' ? 'சூழ்நிலையியல்' : 'Environmental Studies', index),
      difficulty_level: 'Easy',
      estimated_hours: 12 + index * 2
    }));
  }
  
  private static generatePhysicsChapters(classNum: number): Chapter[] {
    const chapterTitles = classNum === 11
      ? ['Units and Measurements', 'Motion', 'Laws of Motion', 'Work Energy Power', 'Gravitation', 'Thermodynamics', 'Waves', 'Oscillations']
      : ['Electric Charges', 'Current Electricity', 'Magnetic Effects', 'Electromagnetic Induction', 'Optics', 'Dual Nature', 'Atoms', 'Nuclei'];
    
    return chapterTitles.map((title, index) => ({
      chapter_id: `c${classNum}-en-phy-ch${index + 1}`,
      chapter_order: index + 1,
      chapter_title: title,
      summary: `Advanced ${title} concepts for Class ${classNum}`,
      key_topics: ['Theory', 'Derivations', 'Numerical Problems'],
      learning_outcomes: ['Master physics concepts', 'Solve complex problems'],
      videos: getRealVideosForSubject(classNum, 'Physics', index),
      difficulty_level: 'Hard',
      estimated_hours: 25 + index * 3
    }));
  }
  
  private static generateChemistryChapters(classNum: number): Chapter[] {
    const chapterTitles = classNum === 11
      ? ['Basic Concepts', 'Atomic Structure', 'Chemical Bonding', 'States of Matter', 'Thermodynamics', 'Equilibrium', 'Redox Reactions', 'Organic Chemistry']
      : ['Solid State', 'Solutions', 'Electrochemistry', 'Chemical Kinetics', 'Surface Chemistry', 'p-Block Elements', 'd-Block Elements', 'Coordination Compounds'];
    
    return chapterTitles.map((title, index) => ({
      chapter_id: `c${classNum}-en-chem-ch${index + 1}`,
      chapter_order: index + 1,
      chapter_title: title,
      summary: `Understanding ${title} in Chemistry`,
      key_topics: ['Concepts', 'Reactions', 'Applications'],
      learning_outcomes: ['Master chemistry concepts', 'Understand reactions'],
      videos: getRealVideosForSubject(classNum, 'Chemistry', index),
      difficulty_level: 'Hard',
      estimated_hours: 22 + index * 3
    }));
  }
  
  private static generateBiologyChapters(classNum: number): Chapter[] {
    const chapterTitles = classNum === 11
      ? ['Living World', 'Cell Structure', 'Biomolecules', 'Cell Cycle', 'Plant Kingdom', 'Animal Kingdom', 'Morphology', 'Anatomy']
      : ['Reproduction', 'Genetics', 'Evolution', 'Human Health', 'Biotechnology', 'Ecology', 'Biodiversity', 'Environmental Issues'];
    
    return chapterTitles.map((title, index) => ({
      chapter_id: `c${classNum}-en-bio-ch${index + 1}`,
      chapter_order: index + 1,
      chapter_title: title,
      summary: `Exploring ${title} in Biology`,
      key_topics: ['Life Processes', 'Organisms', 'Ecosystems'],
      learning_outcomes: ['Understand life sciences', 'Learn biological concepts'],
      videos: getRealVideosForSubject(classNum, 'Biology', index),
      difficulty_level: 'Hard',
      estimated_hours: 20 + index * 3
    }));
  }
  
  private static generateComputerScienceChapters(classNum: number): Chapter[] {
    const chapterTitles = classNum === 11
      ? ['Computer Fundamentals', 'Programming Basics', 'Python', 'Data Structures', 'Algorithms', 'Database', 'Web Technologies']
      : ['Advanced Python', 'OOP Concepts', 'Data Structures Advanced', 'SQL', 'Computer Networks', 'Cyber Security', 'AI Basics'];
    
    return chapterTitles.map((title, index) => ({
      chapter_id: `c${classNum}-en-cs-ch${index + 1}`,
      chapter_order: index + 1,
      chapter_title: title,
      summary: `Learning ${title} in Computer Science`,
      key_topics: ['Programming', 'Algorithms', 'Technology'],
      learning_outcomes: ['Master programming', 'Understand computer systems'],
      videos: getRealVideosForSubject(classNum, 'Computer Science', index),
      difficulty_level: 'Hard',
      estimated_hours: 24 + index * 3
    }));
  }
  
  // Helper methods
  private static getDifficultyLevel(classNum: number): 'Beginner' | 'Easy' | 'Moderate' | 'Advanced' {
    if (classNum <= 2) return 'Beginner';
    if (classNum <= 5) return 'Easy';
    if (classNum <= 10) return 'Moderate';
    return 'Advanced';
  }
}

// Export the generated curriculum
export const completeCurriculum = CurriculumGenerator.generateCompleteCurriculum();
export default completeCurriculum;
