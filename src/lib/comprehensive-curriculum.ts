// Comprehensive Curriculum Data for Classes 1-12 with YouTube Integration
// Samacheer Kalvi Aligned Content

export interface VideoResource {
  videoId: string;
  title: string;
  url: string;
  duration: string;
  description: string;
}

export interface ComprehensiveChapter {
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

export interface ComprehensiveSubject {
  course_id: string;
  subject_name: string;
  overview: string;
  chapters: ComprehensiveChapter[];
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

export interface ComprehensiveCourse {
  class: string;
  medium: string;
  board: string;
  syllabus_source: string;
  stream?: 'Science' | 'Commerce' | 'Arts' | 'General';
  subjects: ComprehensiveSubject[];
}

// Helper function to generate YouTube embed URL
const getYouTubeEmbed = (videoId: string): string => {
  return `https://www.youtube.com/embed/${videoId}`;
};

// Comprehensive Curriculum Data with YouTube Videos
export const comprehensiveCurriculum: ComprehensiveCourse[] = [
  // ==================== CLASS 1 ====================
  {
    class: 'Class 1',
    medium: 'Tamil',
    board: 'Tamil Nadu State Board',
    syllabus_source: 'Samacheer Kalvi 2024-25',
    subjects: [
      {
        course_id: 'c1-ta-tam',
        subject_name: 'தமிழ்',
        overview: 'அழகான தமிழ் மொழியின் அடிப்படைகளை கற்றுக்கொள்ளுங்கள்',
        chapters: [
          {
            chapter_id: 'c1-ta-tam-ch1',
            chapter_order: 1,
            chapter_title: 'உயிர் எழுத்துக்கள்',
            summary: 'தமிழ் உயிர் எழுத்துக்களை கற்றுக்கொள்வோம்',
            key_topics: ['அ முதல் ஔ வரை', 'எழுத்து அடையாளம்', 'ஒலி பயிற்சி'],
            learning_outcomes: ['உயிர் எழுத்துக்களை அடையாளம் காண்பர்', 'சரியாக உச்சரிப்பர்'],
            videos: [
              {
                videoId: 'rIJKxJmS3lI',
                title: 'உயிர் எழுத்துக்கள் பாடல் | Tamil Vowels Song',
                url: getYouTubeEmbed('rIJKxJmS3lI'),
                duration: '18:30',
                description: 'தமிழ் உயிர் எழுத்துக்களை பாடலுடன் கற்றுக்கொள்ளுங்கள்'
              },
              {
                videoId: 'Yocja_N5s1I',
                title: 'தமிழ் எழுத்துக்கள் | Tamil Alphabets',
                url: getYouTubeEmbed('Yocja_N5s1I'),
                duration: '22:45',
                description: 'தமிழ் எழுத்துக்களின் முழுமையான பாடம்'
              }
            ],
            difficulty_level: 'Easy',
            estimated_hours: 15
          },
          {
            chapter_id: 'c1-ta-tam-ch2',
            chapter_order: 2,
            chapter_title: 'மெய் எழுத்துக்கள்',
            summary: 'தமிழ் மெய் எழுத்துக்களை கற்றுக்கொள்வோம்',
            key_topics: ['க முதல் ன வரை', 'மெய் எழுத்து அடையாளம்'],
            learning_outcomes: ['மெய் எழுத்துக்களை அறிவர்', 'எழுதுவர்'],
            videos: [
              {
                videoId: 'tamil-consonants-1',
                title: 'மெய் எழுத்துக்கள் பாடல்',
                url: getYouTubeEmbed('tamil-consonants-1'),
                duration: '20:15',
                description: 'மெய் எழுத்துக்களை பாடலுடன் கற்போம்'
              }
            ],
            difficulty_level: 'Easy',
            estimated_hours: 18
          }
        ],
        learning_options: { lessons: true, practice: true, activities: true, assessments: true },
        difficulty_level: 'Beginner',
        recommended_age: '5-6 years',
        total_videos: 3
      },
      {
        course_id: 'c1-ta-math',
        subject_name: 'கணக்கு',
        overview: 'எண்கள் மற்றும் வடிவங்களை கற்றுக்கொள்வோம்',
        chapters: [
          {
            chapter_id: 'c1-ta-math-ch1',
            chapter_order: 1,
            chapter_title: 'எண்கள் 1-20',
            summary: '1 முதல் 20 வரை எண்களை கற்போம்',
            key_topics: ['எண்ணுதல்', 'எண் எழுதுதல்', 'ஒப்பிடுதல்'],
            learning_outcomes: ['20 வரை எண்ணுவர்', 'எண்களை எழுதுவர்'],
            videos: [
              {
                videoId: 'DR-cfDsHCGA',
                title: '1 முதல் 10 வரை எண்கள் | Numbers 1-10',
                url: getYouTubeEmbed('DR-cfDsHCGA'),
                duration: '20:15',
                description: 'எண்களை விளையாட்டுடன் கற்போம்'
              }
            ],
            difficulty_level: 'Easy',
            estimated_hours: 20
          }
        ],
        learning_options: { lessons: true, practice: true, activities: true, assessments: true },
        difficulty_level: 'Beginner',
        recommended_age: '5-6 years',
        total_videos: 1
      }
    ]
  },

  // ==================== CLASS 6 ====================
  {
    class: 'Class 6',
    medium: 'English',
    board: 'Tamil Nadu State Board',
    syllabus_source: 'Samacheer Kalvi 2024-25',
    subjects: [
      {
        course_id: 'c6-en-math',
        subject_name: 'Mathematics',
        overview: 'Build strong mathematical foundations',
        chapters: [
          {
            chapter_id: 'c6-en-math-ch1',
            chapter_order: 1,
            chapter_title: 'Numbers',
            summary: 'Understanding number systems',
            key_topics: ['Natural Numbers', 'Whole Numbers', 'Integers', 'HCF and LCM'],
            learning_outcomes: ['Understand number types', 'Perform operations on integers'],
            videos: [
              {
                videoId: 'numbers-system-6',
                title: 'Number System | Class 6 Mathematics',
                url: getYouTubeEmbed('numbers-system-6'),
                duration: '28:45',
                description: 'Complete guide to number systems'
              }
            ],
            difficulty_level: 'Moderate',
            estimated_hours: 35
          }
        ],
        learning_options: { lessons: true, practice: true, activities: true, assessments: true },
        difficulty_level: 'Moderate',
        recommended_age: '10-11 years',
        total_videos: 1
      }
    ]
  },

  // ==================== CLASS 10 ====================
  {
    class: 'Class 10',
    medium: 'English',
    board: 'Tamil Nadu State Board',
    syllabus_source: 'Samacheer Kalvi 2024-25 (SSLC)',
    subjects: [
      {
        course_id: 'c10-en-math',
        subject_name: 'Mathematics',
        overview: 'Master advanced mathematical concepts',
        chapters: [
          {
            chapter_id: 'c10-en-math-ch1',
            chapter_order: 1,
            chapter_title: 'Real Numbers',
            summary: 'Explore the complete number system',
            key_topics: ['Rational Numbers', 'Irrational Numbers', 'Euclid\'s Algorithm'],
            learning_outcomes: ['Classify numbers', 'Apply algorithms'],
            videos: [
              {
                videoId: 'real-numbers-10',
                title: 'Real Numbers | Class 10 Mathematics',
                url: getYouTubeEmbed('real-numbers-10'),
                duration: '35:20',
                description: 'Complete chapter on real numbers'
              }
            ],
            difficulty_level: 'Moderate',
            estimated_hours: 30
          }
        ],
        learning_options: { lessons: true, practice: true, activities: true, assessments: true },
        difficulty_level: 'Advanced',
        recommended_age: '14-15 years',
        total_videos: 1
      }
    ]
  }
];

export default comprehensiveCurriculum;
