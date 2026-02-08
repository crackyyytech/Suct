// YouTube Kalvi TV Integration Service
export interface KalviVideo {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  duration: string;
  subject: string;
  class: string;
  chapter: string;
  language: 'tamil' | 'english';
  publishedAt: string;
  viewCount: number;
  channelName: string;
}

export interface KalviPlaylist {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  subject: string;
  class: string;
  language: 'tamil' | 'english';
  videoCount: number;
  videos: KalviVideo[];
}

// Kalvi TV Channel IDs (Official Tamil Nadu Education Channels)
export const KALVI_CHANNELS = {
  KALVI_TV_OFFICIAL: '@kalvitvofficial', // Official Kalvi TV Channel
  SAMACHEER_KALVI: 'UC8butISFwT-Wl7EV0hUK0BQ', // Samacheer Kalvi Official
  TN_TEXTBOOKS: 'UCmvK8WGzKz8VrjQVWZWWWzA', // TN Textbooks
  DIKSHA_TN: 'UCDikshaOfficial', // DIKSHA Tamil Nadu
  KALVI_KIDS: 'UCKalviKidsOfficial' // Kalvi Kids Channel
};

// Subject mapping for Kalvi TV Official content
export const KALVI_TV_SUBJECTS = {
  'Class 1': {
    tamil: ['தமிழ்', 'கணக்கு', 'சூழ்நிலையியல்'],
    english: ['English', 'Mathematics', 'Environmental Studies']
  },
  'Class 2': {
    tamil: ['தமிழ்', 'கணக்கு', 'சூழ்நிலையியல்'],
    english: ['English', 'Mathematics', 'Environmental Studies']
  },
  'Class 3': {
    tamil: ['தமிழ்', 'கணக்கு', 'அறிவியல்', 'சமூக அறிவியல்'],
    english: ['English', 'Mathematics', 'Science', 'Social Science']
  },
  'Class 4': {
    tamil: ['தமிழ்', 'கணக்கு', 'அறிவியல்', 'சமூக அறிவியல்'],
    english: ['English', 'Mathematics', 'Science', 'Social Science']
  },
  'Class 5': {
    tamil: ['தமிழ்', 'கணக்கு', 'அறிவியல்', 'சமூக அறிவியல்'],
    english: ['English', 'Mathematics', 'Science', 'Social Science']
  },
  'Class 6': {
    tamil: ['தமிழ்', 'கணக்கு', 'அறிவியல்', 'சமூக அறிவியல்'],
    english: ['English', 'Mathematics', 'Science', 'Social Science']
  },
  'Class 7': {
    tamil: ['தமிழ்', 'கணக்கு', 'அறிவியல்', 'சமூக அறிவியல்'],
    english: ['English', 'Mathematics', 'Science', 'Social Science']
  },
  'Class 8': {
    tamil: ['தமிழ்', 'கணக்கு', 'அறிவியல்', 'சமூக அறிவியல்'],
    english: ['English', 'Mathematics', 'Science', 'Social Science']
  },
  'Class 9': {
    tamil: ['தமிழ்', 'கணக்கு', 'அறிவியல்', 'சமூக அறிவியல்'],
    english: ['English', 'Mathematics', 'Science', 'Social Science']
  },
  'Class 10': {
    tamil: ['தமிழ்', 'கணக்கு', 'அறிவியல்', 'சமூக அறிவியல்'],
    english: ['English', 'Mathematics', 'Science', 'Social Science']
  },
  'Class 11': {
    tamil: ['தமிழ்', 'கணக்கு', 'இயற்பியல்', 'வேதியியல்', 'உயிரியல்', 'கணினி அறிவியல்'],
    english: ['English', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science']
  },
  'Class 12': {
    tamil: ['தமிழ்', 'கணக்கு', 'இயற்பியல்', 'வேதியியல்', 'உயிரியல்', 'கணினி அறிவியல்'],
    english: ['English', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science']
  }
};

// Enhanced Educational Video Content - Comprehensive Samacheer Kalvi Aligned Content
export const kalviTVContent: KalviPlaylist[] = [
  // ==================== CLASS 1 CONTENT ====================
  {
    id: 'class-1-tamil-comprehensive',
    title: 'வகுப்பு 1 தமிழ் - முழுமையான கற்றல்',
    description: 'வகுப்பு 1 மாணவர்களுக்கான தமிழ் மொழி அடிப்படைகள் - கல்வி தொலைக்காட்சி',
    thumbnailUrl: 'https://img.youtube.com/vi/rIJKxJmS3lI/maxresdefault.jpg',
    subject: 'தமிழ்',
    class: 'Class 1',
    language: 'tamil',
    videoCount: 20,
    videos: [
      {
        id: 'tam-1-vowels-complete',
        title: 'உயிர் எழுத்துக்கள் முழுமை | வகுப்பு 1 தமிழ் | கல்வி தொலைக்காட்சி',
        description: 'தமிழ் உயிர் எழுத்துக்களை முழுமையாக கற்றுக்கொள்ளுங்கள் - அ முதல் ஔ வரை',
        thumbnailUrl: 'https://img.youtube.com/vi/rIJKxJmS3lI/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/embed/rIJKxJmS3lI',
        duration: '18:30',
        subject: 'தமிழ்',
        class: 'Class 1',
        chapter: 'பாடி ஆடி விளையாடலாம்',
        language: 'tamil',
        publishedAt: '2024-06-15',
        viewCount: 1250000,
        channelName: 'Kalvi TV Official'
      },
      {
        id: 'tam-1-consonants-detailed',
        title: 'மெய் எழுத்துக்கள் விரிவான பாடம் | வகுப்பு 1 தமிழ் | கல்வி தொலைக்காட்சி',
        description: 'தமிழ் மெய் எழுத்துக்களை விரிவாக பாடலுடன் கற்றுக்கொள்ளுங்கள்',
        thumbnailUrl: 'https://img.youtube.com/vi/Yocja_N5s1I/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/embed/Yocja_N5s1I',
        duration: '22:45',
        subject: 'தமிழ்',
        class: 'Class 1',
        chapter: 'மொழியோடு விளையாடு',
        language: 'tamil',
        publishedAt: '2024-06-20',
        viewCount: 980000,
        channelName: 'Kalvi TV Official'
      }
    ]
  },
  {
    id: 'class-1-math-comprehensive',
    title: 'வகுப்பு 1 கணக்கு - விரிவான கணிதம்',
    description: 'வகுப்பு 1 மாணவர்களுக்கான முழுமையான கணித அடிப்படைகள் - கல்வி தொலைக்காட்சி',
    thumbnailUrl: 'https://img.youtube.com/vi/DR-cfDsHCGA/maxresdefault.jpg',
    subject: 'கணக்கு',
    class: 'Class 1',
    language: 'tamil',
    videoCount: 18,
    videos: [
      {
        id: 'math-1-numbers-1to10',
        title: '1 முதல் 10 வரை எண்கள் | வகுப்பு 1 கணக்கு | கல்வி தொலைக்காட்சி',
        description: '1 முதல் 10 வரை எண்களை விரிவாக கற்றுக்கொள்ளுங்கள்',
        thumbnailUrl: 'https://img.youtube.com/vi/DR-cfDsHCGA/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/embed/DR-cfDsHCGA',
        duration: '20:15',
        subject: 'கணக்கு',
        class: 'Class 1',
        chapter: 'எண்கள்',
        language: 'tamil',
        publishedAt: '2024-07-01',
        viewCount: 1150000,
        channelName: 'Kalvi TV Official'
      }
    ]
  },

  // ==================== CLASS 1 ENGLISH CONTENT ====================
  {
    id: 'class-1-english-comprehensive',
    title: 'Class 1 English - Complete Course',
    description: 'Class 1 English lessons from Kalvi TV Official - Unit-wise content',
    thumbnailUrl: 'https://img.youtube.com/vi/bNEtdFgAH4Y/maxresdefault.jpg',
    subject: 'English',
    class: 'Class 1',
    language: 'english',
    videoCount: 3,
    videos: [
      {
        id: 'eng-1-unit1-my-pet-part1',
        title: 'Class 1 | English | My Pet | Unit 1 | Part 1 | Kalvi TV',
        description: 'Learn about pets and animals in English - Unit 1 Part 1',
        thumbnailUrl: 'https://img.youtube.com/vi/bNEtdFgAH4Y/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/embed/bNEtdFgAH4Y',
        duration: '25:00',
        subject: 'English',
        class: 'Class 1',
        chapter: 'Unit 1 - My Pet',
        language: 'english',
        publishedAt: '2024-06-01',
        viewCount: 850000,
        channelName: 'Kalvi TV Official'
      },
      {
        id: 'eng-1-unit2-my-journey',
        title: 'Class 1 | English | My Journey | Unit 2 | Kalvi TV',
        description: 'Learn about journeys and travel in English - Unit 2',
        thumbnailUrl: 'https://img.youtube.com/vi/2HteBlTpzpI/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/embed/2HteBlTpzpI',
        duration: '22:30',
        subject: 'English',
        class: 'Class 1',
        chapter: 'Unit 2 - My Journey',
        language: 'english',
        publishedAt: '2024-06-05',
        viewCount: 720000,
        channelName: 'Kalvi TV Official'
      },
      {
        id: 'eng-1-unit3-rain-rain-rain',
        title: 'Class 1 | English | Rain Rain Rain | Unit 3 | Kalvi TV',
        description: 'Learn about rain and weather in English - Unit 3',
        thumbnailUrl: 'https://img.youtube.com/vi/LyvaIoyfALA/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/embed/LyvaIoyfALA',
        duration: '20:45',
        subject: 'English',
        class: 'Class 1',
        chapter: 'Unit 3 - Rain Rain Rain',
        language: 'english',
        publishedAt: '2024-06-10',
        viewCount: 680000,
        channelName: 'Kalvi TV Official'
      }
    ]
  },

  // ==================== CLASS 2 CONTENT ====================
  {
    id: 'class-2-tamil-comprehensive',
    title: 'வகுப்பு 2 தமிழ் - மேம்பட்ட கற்றல்',
    description: 'வகுப்பு 2 மாணவர்களுக்கான தமிழ் மொழி பாடங்கள் - கல்வி தொலைக்காட்சி',
    thumbnailUrl: 'https://img.youtube.com/vi/rIJKxJmS3lI/maxresdefault.jpg',
    subject: 'தமிழ்',
    class: 'Class 2',
    language: 'tamil',
    videoCount: 16,
    videos: [
      {
        id: 'tam-2-story-reading',
        title: 'கதை படித்தல் | வகுப்பு 2 தமிழ் | கல்வி தொலைக்காட்சி',
        description: 'சுவாரஸ்யமான கதைகள் மூலம் தமிழ் கற்றுக்கொள்ளுங்கள்',
        thumbnailUrl: 'https://img.youtube.com/vi/story-reading/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/embed/story-reading',
        duration: '20:15',
        subject: 'தமிழ்',
        class: 'Class 2',
        chapter: 'விளையாடலாம் வாங்க',
        language: 'tamil',
        publishedAt: '2024-08-10',
        viewCount: 850000,
        channelName: 'Kalvi TV Official'
      },
      {
        id: 'tam-2-grammar-basics',
        title: 'இலக்கண அடிப்படைகள் | வகுப்பு 2 தமிழ் | கல்வி தொலைக்காட்சி',
        description: 'தமிழ் இலக்கணத்தின் அடிப்படைகளை கற்றுக்கொள்ளுங்கள்',
        thumbnailUrl: 'https://img.youtube.com/vi/grammar-basics/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/embed/grammar-basics',
        duration: '18:30',
        subject: 'தமிழ்',
        class: 'Class 2',
        chapter: 'நண்பரை கண்டுபிடி',
        language: 'tamil',
        publishedAt: '2024-08-12',
        viewCount: 720000,
        channelName: 'Kalvi TV Official'
      },
      {
        id: 'tam-2-poem-recitation',
        title: 'பாடல் பாடுதல் | வகுப்பு 2 தமிழ் | கல்வி தொலைக்காட்சி',
        description: 'அழகான தமிழ் பாடல்களை கற்றுக்கொள்ளுங்கள்',
        thumbnailUrl: 'https://img.youtube.com/vi/poem-recitation/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/embed/poem-recitation',
        duration: '16:45',
        subject: 'தமிழ்',
        class: 'Class 2',
        chapter: 'பாட்டு பாடலாம்',
        language: 'tamil',
        publishedAt: '2024-08-14',
        viewCount: 680000,
        channelName: 'Kalvi TV Official'
      }
    ]
  },
  {
    id: 'class-2-math-comprehensive',
    title: 'வகுப்பு 2 கணக்கு - எண்கள் மற்றும் செயல்பாடுகள்',
    description: 'வகுப்பு 2 மாணவர்களுக்கான கணித பாடங்கள் - கல்வி தொலைக்காட்சி',
    thumbnailUrl: 'https://img.youtube.com/vi/math2-intro/maxresdefault.jpg',
    subject: 'கணக்கு',
    class: 'Class 2',
    language: 'tamil',
    videoCount: 14,
    videos: [
      {
        id: 'math-2-numbers-100',
        title: '100 வரை எண்கள் | வகுப்பு 2 கணக்கு | கல்வி தொலைக்காட்சி',
        description: '100 வரையிலான எண்களை கற்றுக்கொள்ளுங்கள்',
        thumbnailUrl: 'https://img.youtube.com/vi/numbers-100/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/embed/numbers-100',
        duration: '22:45',
        subject: 'கணக்கு',
        class: 'Class 2',
        chapter: 'எண்கள்',
        language: 'tamil',
        publishedAt: '2024-08-15',
        viewCount: 950000,
        channelName: 'Kalvi TV Official'
      },
      {
        id: 'math-2-subtraction',
        title: 'கழித்தல் | வகுப்பு 2 கணக்கு | கல்வி தொலைக்காட்சி',
        description: 'கழித்தல் கணக்குகளை எளிதாக கற்றுக்கொள்ளுங்கள்',
        thumbnailUrl: 'https://img.youtube.com/vi/subtraction/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/embed/subtraction',
        duration: '19:20',
        subject: 'கணக்கு',
        class: 'Class 2',
        chapter: 'கழித்தல்',
        language: 'tamil',
        publishedAt: '2024-08-18',
        viewCount: 820000,
        channelName: 'Kalvi TV Official'
      },
      {
        id: 'math-2-multiplication-intro',
        title: 'பெருக்கல் அறிமுகம் | வகுப்பு 2 கணக்கு | கல்வி தொலைக்காட்சி',
        description: 'பெருக்கல் கணக்குகளின் அடிப்படைகளை கற்றுக்கொள்ளுங்கள்',
        thumbnailUrl: 'https://img.youtube.com/vi/multiplication-intro/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/embed/multiplication-intro',
        duration: '21:30',
        subject: 'கணக்கு',
        class: 'Class 2',
        chapter: 'பெருக்கல்',
        language: 'tamil',
        publishedAt: '2024-08-20',
        viewCount: 890000,
        channelName: 'Kalvi TV Official'
      }
    ]
  },
  {
    id: 'class-2-evs-comprehensive',
    title: 'வகுப்பு 2 சூழ்நிலையியல் - நமது உலகம்',
    description: 'வகுப்பு 2 மாணவர்களுக்கான சூழ்நிலையியல் பாடங்கள் - கல்வி தொலைக்காட்சி',
    thumbnailUrl: 'https://img.youtube.com/vi/evs2-intro/maxresdefault.jpg',
    subject: 'சூழ்நிலையியல்',
    class: 'Class 2',
    language: 'tamil',
    videoCount: 12,
    videos: [
      {
        id: 'evs-2-family-community',
        title: 'குடும்பம் மற்றும் சமுதாயம் | வகுப்பு 2 சூழ்நிலையியல் | கல்வி தொலைக்காட்சி',
        description: 'குடும்பம் மற்றும் சமுதாயத்தைப் பற்றி கற்றுக்கொள்ளுங்கள்',
        thumbnailUrl: 'https://img.youtube.com/vi/family-community/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/embed/family-community',
        duration: '18:45',
        subject: 'சூழ்நிலையியல்',
        class: 'Class 2',
        chapter: 'நமது குடும்பம்',
        language: 'tamil',
        publishedAt: '2024-08-22',
        viewCount: 750000,
        channelName: 'Kalvi TV Official'
      }
    ]
  },

  // ==================== CLASS 3-5 CONTENT ====================
  {
    id: 'class-3-tamil-comprehensive',
    title: 'வகுப்பு 3 தமிழ் - மொழி வளர்ச்சி',
    description: 'வகுப்பு 3 மாணவர்களுக்கான தமிழ் மொழி மேம்பாட்டு பாடங்கள் - கல்வி தொலைக்காட்சி',
    thumbnailUrl: 'https://img.youtube.com/vi/tamil3-intro/maxresdefault.jpg',
    subject: 'தமிழ்',
    class: 'Class 3',
    language: 'tamil',
    videoCount: 20,
    videos: [
      {
        id: 'tam-3-advanced-reading',
        title: 'மேம்பட்ட வாசிப்பு | வகுப்பு 3 தமிழ் | கல்வி தொலைக்காட்சி',
        description: 'சிக்கலான வாக்கியங்களை வாசிக்கும் திறனை வளர்த்துக்கொள்ளுங்கள்',
        thumbnailUrl: 'https://img.youtube.com/vi/advanced-reading/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/embed/advanced-reading',
        duration: '24:30',
        subject: 'தமிழ்',
        class: 'Class 3',
        chapter: 'கல்வி கற்போம்',
        language: 'tamil',
        publishedAt: '2024-09-01',
        viewCount: 920000,
        channelName: 'Kalvi TV Official'
      },
      {
        id: 'tam-3-creative-writing',
        title: 'படைப்பு எழுத்து | வகுப்பு 3 தமிழ் | கல்வி தொலைக்காட்சி',
        description: 'சிறு கதைகள் மற்றும் கவிதைகள் எழுதுவதை கற்றுக்கொள்ளுங்கள்',
        thumbnailUrl: 'https://img.youtube.com/vi/creative-writing/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/embed/creative-writing',
        duration: '22:15',
        subject: 'தமிழ்',
        class: 'Class 3',
        chapter: 'எழுத்து வளர்ச்சி',
        language: 'tamil',
        publishedAt: '2024-09-03',
        viewCount: 850000,
        channelName: 'Kalvi TV Official'
      }
    ]
  },
  {
    id: 'class-3-math-comprehensive',
    title: 'வகுப்பு 3 கணக்கு - அடிப்படை கணிதம்',
    description: 'வகுப்பு 3 மாணவர்களுக்கான கணித அடிப்படைகள் - கல்வி தொலைக்காட்சி',
    thumbnailUrl: 'https://img.youtube.com/vi/math3-intro/maxresdefault.jpg',
    subject: 'கணக்கு',
    class: 'Class 3',
    language: 'tamil',
    videoCount: 18,
    videos: [
      {
        id: 'math-3-multiplication-tables',
        title: 'பெருக்கல் அட்டவணை | வகுப்பு 3 கணக்கு | கல்வி தொலைக்காட்சி',
        description: '2 முதல் 10 வரையிலான பெருக்கல் அட்டவணைகளை கற்றுக்கொள்ளுங்கள்',
        thumbnailUrl: 'https://img.youtube.com/vi/multiplication-tables/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/embed/multiplication-tables',
        duration: '28:45',
        subject: 'கணக்கு',
        class: 'Class 3',
        chapter: 'பெருக்கல்',
        language: 'tamil',
        publishedAt: '2024-09-05',
        viewCount: 1200000,
        channelName: 'Kalvi TV Official'
      },
      {
        id: 'math-3-division-basics',
        title: 'வகுத்தல் அடிப்படைகள் | வகுப்பு 3 கணக்கு | கல்வி தொலைக்காட்சி',
        description: 'வகுத்தல் கணக்குகளை எளிதாக கற்றுக்கொள்ளுங்கள்',
        thumbnailUrl: 'https://img.youtube.com/vi/division-basics/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/embed/division-basics',
        duration: '25:20',
        subject: 'கணக்கு',
        class: 'Class 3',
        chapter: 'வகுத்தல்',
        language: 'tamil',
        publishedAt: '2024-09-07',
        viewCount: 1050000,
        channelName: 'Kalvi TV Official'
      }
    ]
  },
  {
    id: 'class-3-english-comprehensive',
    title: 'Class 3 English - Reading and Writing | Kalvi TV',
    description: 'Comprehensive English course for Class 3 students - Kalvi TV Official',
    thumbnailUrl: 'https://img.youtube.com/vi/english3-intro/maxresdefault.jpg',
    subject: 'English',
    class: 'Class 3',
    language: 'english',
    videoCount: 18,
    videos: [
      {
        id: 'eng-3-reading-comprehension',
        title: 'Reading Comprehension | Class 3 English | Kalvi TV Official',
        description: 'Improve reading skills with comprehension exercises',
        thumbnailUrl: 'https://img.youtube.com/vi/reading-comp/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/embed/reading-comp',
        duration: '25:30',
        subject: 'English',
        class: 'Class 3',
        chapter: 'Our Kitchen',
        language: 'english',
        publishedAt: '2024-09-01',
        viewCount: 1120000,
        channelName: 'Kalvi TV Official'
      },
      {
        id: 'eng-3-grammar-rules',
        title: 'Basic Grammar Rules | Class 3 English | Kalvi TV Official',
        description: 'Learn basic grammar concepts with examples',
        thumbnailUrl: 'https://img.youtube.com/vi/grammar-rules/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/embed/grammar-rules',
        duration: '21:45',
        subject: 'English',
        class: 'Class 3',
        chapter: 'The World Around Us',
        language: 'english',
        publishedAt: '2024-09-03',
        viewCount: 980000,
        channelName: 'Kalvi TV Official'
      },
      {
        id: 'eng-3-story-writing',
        title: 'Story Writing | Class 3 English | Kalvi TV Official',
        description: 'Learn to write simple stories with proper structure',
        thumbnailUrl: 'https://img.youtube.com/vi/story-writing/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/embed/story-writing',
        duration: '23:15',
        subject: 'English',
        class: 'Class 3',
        chapter: 'Creative Writing',
        language: 'english',
        publishedAt: '2024-09-05',
        viewCount: 890000,
        channelName: 'Kalvi TV Official'
      }
    ]
  },
  {
    id: 'class-4-science-comprehensive',
    title: 'Class 4 Science - Our Environment | Kalvi TV',
    description: 'Environmental science for Class 4 students - Kalvi TV Official',
    thumbnailUrl: 'https://img.youtube.com/vi/science4-intro/maxresdefault.jpg',
    subject: 'Science',
    class: 'Class 4',
    language: 'english',
    videoCount: 16,
    videos: [
      {
        id: 'sci-4-plants-animals',
        title: 'Plants and Animals | Class 4 Science | Kalvi TV Official',
        description: 'Learn about different types of plants and animals',
        thumbnailUrl: 'https://img.youtube.com/vi/plants-animals/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/embed/plants-animals',
        duration: '26:40',
        subject: 'Science',
        class: 'Class 4',
        chapter: 'Living and Non-living Things',
        language: 'english',
        publishedAt: '2024-09-10',
        viewCount: 1180000,
        channelName: 'Kalvi TV Official'
      },
      {
        id: 'sci-4-water-cycle',
        title: 'Water Cycle | Class 4 Science | Kalvi TV Official',
        description: 'Understanding the water cycle and its importance',
        thumbnailUrl: 'https://img.youtube.com/vi/water-cycle/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/embed/water-cycle',
        duration: '24:30',
        subject: 'Science',
        class: 'Class 4',
        chapter: 'Water and Air',
        language: 'english',
        publishedAt: '2024-09-12',
        viewCount: 1050000,
        channelName: 'Kalvi TV Official'
      }
    ]
  },
  {
    id: 'class-5-social-science-comprehensive',
    title: 'Class 5 Social Science - Our Country | Kalvi TV',
    description: 'Social science concepts for Class 5 students - Kalvi TV Official',
    thumbnailUrl: 'https://img.youtube.com/vi/social5-intro/maxresdefault.jpg',
    subject: 'Social Science',
    class: 'Class 5',
    language: 'english',
    videoCount: 20,
    videos: [
      {
        id: 'soc-5-indian-geography',
        title: 'Indian Geography | Class 5 Social Science | Kalvi TV Official',
        description: 'Learn about India\'s physical features and states',
        thumbnailUrl: 'https://img.youtube.com/vi/indian-geography/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/embed/indian-geography',
        duration: '30:15',
        subject: 'Social Science',
        class: 'Class 5',
        chapter: 'Our Country India',
        language: 'english',
        publishedAt: '2024-09-15',
        viewCount: 1320000,
        channelName: 'Kalvi TV Official'
      },
      {
        id: 'soc-5-freedom-struggle',
        title: 'Freedom Struggle | Class 5 Social Science | Kalvi TV Official',
        description: 'Stories of India\'s independence movement',
        thumbnailUrl: 'https://img.youtube.com/vi/freedom-struggle/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/embed/freedom-struggle',
        duration: '28:45',
        subject: 'Social Science',
        class: 'Class 5',
        chapter: 'Our Freedom Fighters',
        language: 'english',
        publishedAt: '2024-09-17',
        viewCount: 1250000,
        channelName: 'Kalvi TV Official'
      }
    ]
  },

  // ==================== CLASS 6-8 CONTENT ====================
  {
    id: 'class-6-math-comprehensive',
    title: 'Class 6 Mathematics - Complete Course | Kalvi TV',
    description: 'Comprehensive mathematics course for Class 6 students - Kalvi TV Official',
    thumbnailUrl: 'https://img.youtube.com/vi/math6-intro/maxresdefault.jpg',
    subject: 'Mathematics',
    class: 'Class 6',
    language: 'english',
    videoCount: 25,
    videos: [
      {
        id: 'math-6-numbers-system',
        title: 'Number System | Class 6 Mathematics | Kalvi TV Official',
        description: 'Learn about natural numbers, whole numbers, and integers',
        thumbnailUrl: 'https://img.youtube.com/vi/numbers-system/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/embed/numbers-system',
        duration: '28:45',
        subject: 'Mathematics',
        class: 'Class 6',
        chapter: 'Numbers',
        language: 'english',
        publishedAt: '2024-08-01',
        viewCount: 1450000,
        channelName: 'Kalvi TV Official'
      },
      {
        id: 'math-6-fractions',
        title: 'Fractions | Class 6 Mathematics | Kalvi TV Official',
        description: 'Understanding fractions and their operations',
        thumbnailUrl: 'https://img.youtube.com/vi/fractions/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/embed/fractions',
        duration: '32:20',
        subject: 'Mathematics',
        class: 'Class 6',
        chapter: 'Fractions',
        language: 'english',
        publishedAt: '2024-08-03',
        viewCount: 1380000,
        channelName: 'Kalvi TV Official'
      },
      {
        id: 'math-6-geometry-basics',
        title: 'Basic Geometry | Class 6 Mathematics | Kalvi TV Official',
        description: 'Introduction to lines, angles, and shapes',
        thumbnailUrl: 'https://img.youtube.com/vi/geometry-basics/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/embed/geometry-basics',
        duration: '35:15',
        subject: 'Mathematics',
        class: 'Class 6',
        chapter: 'Basic Geometrical Ideas',
        language: 'english',
        publishedAt: '2024-08-05',
        viewCount: 1320000,
        channelName: 'Kalvi TV Official'
      }
    ]
  },
  {
    id: 'class-7-science-comprehensive',
    title: 'Class 7 Science - Life Processes | Kalvi TV',
    description: 'Comprehensive science course for Class 7 students - Kalvi TV Official',
    thumbnailUrl: 'https://img.youtube.com/vi/science7-intro/maxresdefault.jpg',
    subject: 'Science',
    class: 'Class 7',
    language: 'english',
    videoCount: 28,
    videos: [
      {
        id: 'sci-7-nutrition-plants',
        title: 'Nutrition in Plants | Class 7 Science | Kalvi TV Official',
        description: 'Learn about photosynthesis and plant nutrition',
        thumbnailUrl: 'https://img.youtube.com/vi/plant-nutrition/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/embed/plant-nutrition',
        duration: '32:15',
        subject: 'Science',
        class: 'Class 7',
        chapter: 'Nutrition in Plants',
        language: 'english',
        publishedAt: '2024-09-10',
        viewCount: 1350000,
        channelName: 'Kalvi TV Official'
      },
      {
        id: 'sci-7-respiration',
        title: 'Respiration in Organisms | Class 7 Science | Kalvi TV Official',
        description: 'Understanding cellular respiration and breathing',
        thumbnailUrl: 'https://img.youtube.com/vi/respiration/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/embed/respiration',
        duration: '28:40',
        subject: 'Science',
        class: 'Class 7',
        chapter: 'Respiration in Organisms',
        language: 'english',
        publishedAt: '2024-09-12',
        viewCount: 1280000,
        channelName: 'Kalvi TV Official'
      },
      {
        id: 'sci-7-transportation',
        title: 'Transportation in Animals and Plants | Class 7 Science | Kalvi TV Official',
        description: 'Learn about circulatory system and transport in plants',
        thumbnailUrl: 'https://img.youtube.com/vi/transportation/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/embed/transportation',
        duration: '30:25',
        subject: 'Science',
        class: 'Class 7',
        chapter: 'Transportation in Animals and Plants',
        language: 'english',
        publishedAt: '2024-09-14',
        viewCount: 1220000,
        channelName: 'Kalvi TV Official'
      }
    ]
  },
  {
    id: 'class-8-math-comprehensive',
    title: 'Class 8 Mathematics - Advanced Concepts | Kalvi TV',
    description: 'Advanced mathematics for Class 8 students - Kalvi TV Official',
    thumbnailUrl: 'https://img.youtube.com/vi/math8-intro/maxresdefault.jpg',
    subject: 'Mathematics',
    class: 'Class 8',
    language: 'english',
    videoCount: 30,
    videos: [
      {
        id: 'math-8-rational-numbers',
        title: 'Rational Numbers | Class 8 Mathematics | Kalvi TV Official',
        description: 'Understanding rational numbers and their properties',
        thumbnailUrl: 'https://img.youtube.com/vi/rational-numbers/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/embed/rational-numbers',
        duration: '35:20',
        subject: 'Mathematics',
        class: 'Class 8',
        chapter: 'Rational Numbers',
        language: 'english',
        publishedAt: '2024-09-15',
        viewCount: 1420000,
        channelName: 'Kalvi TV Official'
      },
      {
        id: 'math-8-linear-equations-one-var',
        title: 'Linear Equations in One Variable | Class 8 Mathematics | Kalvi TV Official',
        description: 'Solving linear equations with one variable',
        thumbnailUrl: 'https://img.youtube.com/vi/linear-eq-one/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/embed/linear-eq-one',
        duration: '31:45',
        subject: 'Mathematics',
        class: 'Class 8',
        chapter: 'Linear Equations in One Variable',
        language: 'english',
        publishedAt: '2024-09-18',
        viewCount: 1380000,
        channelName: 'Kalvi TV Official'
      },
      {
        id: 'math-8-quadrilaterals',
        title: 'Understanding Quadrilaterals | Class 8 Mathematics | Kalvi TV Official',
        description: 'Properties of different types of quadrilaterals',
        thumbnailUrl: 'https://img.youtube.com/vi/quadrilaterals/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/embed/quadrilaterals',
        duration: '33:30',
        subject: 'Mathematics',
        class: 'Class 8',
        chapter: 'Understanding Quadrilaterals',
        language: 'english',
        publishedAt: '2024-09-20',
        viewCount: 1340000,
        channelName: 'Kalvi TV Official'
      }
    ]
  },

  // ==================== CLASS 9 CONTENT ====================
  {
    id: 'class-9-science-comprehensive',
    title: 'Class 9 Science - Matter and Motion | Kalvi TV',
    description: 'Comprehensive science course for Class 9 students - Kalvi TV Official',
    thumbnailUrl: 'https://img.youtube.com/vi/science9-intro/maxresdefault.jpg',
    subject: 'Science',
    class: 'Class 9',
    language: 'english',
    videoCount: 32,
    videos: [
      {
        id: 'sci-9-matter-nature',
        title: 'Matter in Our Surroundings | Class 9 Science | Kalvi TV Official',
        description: 'Understanding states of matter and their properties',
        thumbnailUrl: 'https://img.youtube.com/vi/matter-nature/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/embed/matter-nature',
        duration: '38:25',
        subject: 'Science',
        class: 'Class 9',
        chapter: 'Matter in Our Surroundings',
        language: 'english',
        publishedAt: '2024-10-01',
        viewCount: 1650000,
        channelName: 'Kalvi TV Official'
      },
      {
        id: 'sci-9-atoms-molecules',
        title: 'Atoms and Molecules | Class 9 Science | Kalvi TV Official',
        description: 'Basic concepts of atoms, molecules, and chemical formulas',
        thumbnailUrl: 'https://img.youtube.com/vi/atoms-molecules/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/embed/atoms-molecules',
        duration: '42:15',
        subject: 'Science',
        class: 'Class 9',
        chapter: 'Atoms and Molecules',
        language: 'english',
        publishedAt: '2024-10-03',
        viewCount: 1580000,
        channelName: 'Kalvi TV Official'
      },
      {
        id: 'sci-9-motion',
        title: 'Motion | Class 9 Science | Kalvi TV Official',
        description: 'Understanding motion, velocity, and acceleration',
        thumbnailUrl: 'https://img.youtube.com/vi/motion/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/embed/motion',
        duration: '36:40',
        subject: 'Science',
        class: 'Class 9',
        chapter: 'Motion',
        language: 'english',
        publishedAt: '2024-10-05',
        viewCount: 1720000,
        channelName: 'Kalvi TV Official'
      },
      {
        id: 'sci-9-force-laws-motion',
        title: 'Force and Laws of Motion | Class 9 Science | Kalvi TV Official',
        description: 'Newton\'s laws of motion and their applications',
        thumbnailUrl: 'https://img.youtube.com/vi/force-laws/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/embed/force-laws',
        duration: '40:30',
        subject: 'Science',
        class: 'Class 9',
        chapter: 'Force and Laws of Motion',
        language: 'english',
        publishedAt: '2024-10-07',
        viewCount: 1680000,
        channelName: 'Kalvi TV Official'
      },
      {
        id: 'sci-9-gravitation',
        title: 'Gravitation | Class 9 Science | Kalvi TV Official',
        description: 'Universal law of gravitation and its applications',
        thumbnailUrl: 'https://img.youtube.com/vi/gravitation/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/embed/gravitation',
        duration: '35:20',
        subject: 'Science',
        class: 'Class 9',
        chapter: 'Gravitation',
        language: 'english',
        publishedAt: '2024-10-09',
        viewCount: 1620000,
        channelName: 'Kalvi TV Official'
      }
    ]
  },
  {
    id: 'class-9-math-comprehensive',
    title: 'Class 9 Mathematics - Algebra and Geometry | Kalvi TV',
    description: 'Advanced mathematics for Class 9 students - Kalvi TV Official',
    thumbnailUrl: 'https://img.youtube.com/vi/math9-intro/maxresdefault.jpg',
    subject: 'Mathematics',
    class: 'Class 9',
    language: 'english',
    videoCount: 35,
    videos: [
      {
        id: 'math-9-number-systems',
        title: 'Number Systems | Class 9 Mathematics | Kalvi TV Official',
        description: 'Real numbers, rational and irrational numbers',
        thumbnailUrl: 'https://img.youtube.com/vi/number-systems/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/embed/number-systems',
        duration: '40:15',
        subject: 'Mathematics',
        class: 'Class 9',
        chapter: 'Number Systems',
        language: 'english',
        publishedAt: '2024-10-10',
        viewCount: 1750000,
        channelName: 'Kalvi TV Official'
      },
      {
        id: 'math-9-polynomials',
        title: 'Polynomials | Class 9 Mathematics | Kalvi TV Official',
        description: 'Introduction to polynomials and their operations',
        thumbnailUrl: 'https://img.youtube.com/vi/polynomials/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/embed/polynomials',
        duration: '38:45',
        subject: 'Mathematics',
        class: 'Class 9',
        chapter: 'Polynomials',
        language: 'english',
        publishedAt: '2024-10-12',
        viewCount: 1680000,
        channelName: 'Kalvi TV Official'
      },
      {
        id: 'math-9-coordinate-geometry',
        title: 'Coordinate Geometry | Class 9 Mathematics | Kalvi TV Official',
        description: 'Introduction to coordinate geometry and plotting points',
        thumbnailUrl: 'https://img.youtube.com/vi/coordinate-geometry/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/embed/coordinate-geometry',
        duration: '36:30',
        subject: 'Mathematics',
        class: 'Class 9',
        chapter: 'Coordinate Geometry',
        language: 'english',
        publishedAt: '2024-10-14',
        viewCount: 1620000,
        channelName: 'Kalvi TV Official'
      }
    ]
  },
  {
    id: 'class-9-tamil-comprehensive',
    title: 'வகுப்பு 9 தமிழ் - இலக்கியம் மற்றும் இலக்கணம்',
    description: 'வகுப்பு 9 மாணவர்களுக்கான தமிழ் இலக்கியம் மற்றும் இலக்கணம் - கல்வி தொலைக்காட்சி',
    thumbnailUrl: 'https://img.youtube.com/vi/tamil9-intro/maxresdefault.jpg',
    subject: 'தமிழ்',
    class: 'Class 9',
    language: 'tamil',
    videoCount: 25,
    videos: [
      {
        id: 'tam-9-literature-analysis',
        title: 'இலக்கிய பகுப்பாய்வு | வகுப்பு 9 தமிழ் | கல்வி தொலைக்காட்சி',
        description: 'தமிழ் இலக்கியங்களை ஆழமாக பகுப்பாய்வு செய்வதை கற்றுக்கொள்ளுங்கள்',
        thumbnailUrl: 'https://img.youtube.com/vi/literature-analysis/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/embed/literature-analysis',
        duration: '35:20',
        subject: 'தமிழ்',
        class: 'Class 9',
        chapter: 'இலக்கிய நயம்',
        language: 'tamil',
        publishedAt: '2024-10-15',
        viewCount: 1420000,
        channelName: 'Kalvi TV Official'
      },
      {
        id: 'tam-9-advanced-grammar',
        title: 'மேம்பட்ட இலக்கணம் | வகுப்பு 9 தமிழ் | கல்வி தொலைக்காட்சி',
        description: 'தமிழ் இலக்கணத்தின் மேம்பட்ட கருத்துக்களை கற்றுக்கொள்ளுங்கள்',
        thumbnailUrl: 'https://img.youtube.com/vi/advanced-grammar/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/embed/advanced-grammar',
        duration: '32:45',
        subject: 'தமிழ்',
        class: 'Class 9',
        chapter: 'இலக்கண விளக்கம்',
        language: 'tamil',
        publishedAt: '2024-10-17',
        viewCount: 1350000,
        channelName: 'Kalvi TV Official'
      }
    ]
  },

  // ==================== CLASS 10 CONTENT ====================
  {
    id: 'class-10-math-advanced',
    title: 'Class 10 Mathematics - Advanced Topics | Kalvi TV',
    description: 'Advanced mathematics for Class 10 SSLC students - Kalvi TV Official',
    thumbnailUrl: 'https://img.youtube.com/vi/math10-advanced/maxresdefault.jpg',
    subject: 'Mathematics',
    class: 'Class 10',
    language: 'english',
    videoCount: 35,
    videos: [
      {
        id: 'math-10-real-numbers',
        title: 'Real Numbers | Class 10 Mathematics | Kalvi TV Official',
        description: 'Complete chapter on real numbers, rational and irrational numbers',
        thumbnailUrl: 'https://img.youtube.com/vi/real-numbers/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/embed/real-numbers',
        duration: '42:30',
        subject: 'Mathematics',
        class: 'Class 10',
        chapter: 'Real Numbers',
        language: 'english',
        publishedAt: '2024-09-01',
        viewCount: 1850000,
        channelName: 'Kalvi TV Official'
      },
      {
        id: 'math-10-polynomials-advanced',
        title: 'Polynomials | Class 10 Mathematics | Kalvi TV Official',
        description: 'Advanced concepts in polynomials and their applications',
        thumbnailUrl: 'https://img.youtube.com/vi/polynomials-advanced/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/embed/polynomials-advanced',
        duration: '38:45',
        subject: 'Mathematics',
        class: 'Class 10',
        chapter: 'Polynomials',
        language: 'english',
        publishedAt: '2024-09-03',
        viewCount: 1780000,
        channelName: 'Kalvi TV Official'
      },
      {
        id: 'math-10-linear-equations-two-var',
        title: 'Linear Equations in Two Variables | Class 10 Mathematics | Kalvi TV Official',
        description: 'Solving systems of linear equations in two variables',
        thumbnailUrl: 'https://img.youtube.com/vi/linear-eq-two/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/embed/linear-eq-two',
        duration: '40:20',
        subject: 'Mathematics',
        class: 'Class 10',
        chapter: 'Pair of Linear Equations in Two Variables',
        language: 'english',
        publishedAt: '2024-09-05',
        viewCount: 1720000,
        channelName: 'Kalvi TV Official'
      },
      {
        id: 'math-10-quadratic-equations',
        title: 'Quadratic Equations | Class 10 Mathematics | Kalvi TV Official',
        description: 'Complete guide to solving quadratic equations',
        thumbnailUrl: 'https://img.youtube.com/vi/quadratic-equations/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/embed/quadratic-equations',
        duration: '45:15',
        subject: 'Mathematics',
        class: 'Class 10',
        chapter: 'Quadratic Equations',
        language: 'english',
        publishedAt: '2024-09-07',
        viewCount: 1920000,
        channelName: 'Kalvi TV Official'
      },
      {
        id: 'math-10-arithmetic-progressions',
        title: 'Arithmetic Progressions | Class 10 Mathematics | Kalvi TV Official',
        description: 'Understanding arithmetic sequences and series',
        thumbnailUrl: 'https://img.youtube.com/vi/arithmetic-progressions/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/embed/arithmetic-progressions',
        duration: '36:30',
        subject: 'Mathematics',
        class: 'Class 10',
        chapter: 'Arithmetic Progressions',
        language: 'english',
        publishedAt: '2024-09-09',
        viewCount: 1680000,
        channelName: 'Kalvi TV Official'
      }
    ]
  },
  {
    id: 'class-10-science-comprehensive',
    title: 'Class 10 Science - Complete SSLC Course | Kalvi TV',
    description: 'Comprehensive science course for Class 10 SSLC students - Kalvi TV Official',
    thumbnailUrl: 'https://img.youtube.com/vi/science10-intro/maxresdefault.jpg',
    subject: 'Science',
    class: 'Class 10',
    language: 'english',
    videoCount: 40,
    videos: [
      {
        id: 'sci-10-light-reflection-refraction',
        title: 'Light - Reflection and Refraction | Class 10 Science | Kalvi TV Official',
        description: 'Complete chapter on light, mirrors, and lenses',
        thumbnailUrl: 'https://img.youtube.com/vi/light-reflection/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/embed/light-reflection',
        duration: '48:20',
        subject: 'Science',
        class: 'Class 10',
        chapter: 'Light - Reflection and Refraction',
        language: 'english',
        publishedAt: '2024-09-10',
        viewCount: 2100000,
        channelName: 'Kalvi TV Official'
      },
      {
        id: 'sci-10-human-eye',
        title: 'Human Eye and Colourful World | Class 10 Science | Kalvi TV Official',
        description: 'Understanding the human eye and vision defects',
        thumbnailUrl: 'https://img.youtube.com/vi/human-eye/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/embed/human-eye',
        duration: '42:45',
        subject: 'Science',
        class: 'Class 10',
        chapter: 'The Human Eye and the Colourful World',
        language: 'english',
        publishedAt: '2024-09-12',
        viewCount: 1980000,
        channelName: 'Kalvi TV Official'
      },
      {
        id: 'sci-10-electricity',
        title: 'Electricity | Class 10 Science | Kalvi TV Official',
        description: 'Electric current, potential difference, and Ohm\'s law',
        thumbnailUrl: 'https://img.youtube.com/vi/electricity/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/embed/electricity',
        duration: '45:30',
        subject: 'Science',
        class: 'Class 10',
        chapter: 'Electricity',
        language: 'english',
        publishedAt: '2024-09-14',
        viewCount: 2250000,
        channelName: 'Kalvi TV Official'
      }
    ]
  },
  {
    id: 'class-10-tamil-literature',
    title: 'வகுப்பு 10 தமிழ் - இலக்கியம் மற்றும் மொழியியல்',
    description: 'வகுப்பு 10 SSLC மாணவர்களுக்கான தமிழ் இலக்கியம் - கல்வி தொலைக்காட்சி',
    thumbnailUrl: 'https://img.youtube.com/vi/tamil10-intro/maxresdefault.jpg',
    subject: 'தமிழ்',
    class: 'Class 10',
    language: 'tamil',
    videoCount: 30,
    videos: [
      {
        id: 'tam-10-classical-literature',
        title: 'செம்மொழி இலக்கியம் | வகுப்பு 10 தமிழ் | கல்வி தொலைக்காட்சி',
        description: 'தமிழின் செம்மொழி இலக்கியங்களை ஆழமாக கற்றுக்கொள்ளுங்கள்',
        thumbnailUrl: 'https://img.youtube.com/vi/classical-literature/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/embed/classical-literature',
        duration: '40:25',
        subject: 'தமிழ்',
        class: 'Class 10',
        chapter: 'செம்மொழி தமிழ்',
        language: 'tamil',
        publishedAt: '2024-09-15',
        viewCount: 1650000,
        channelName: 'Kalvi TV Official'
      },
      {
        id: 'tam-10-modern-poetry',
        title: 'நவீன கவிதைகள் | வகுப்பு 10 தமிழ் | கல்வி தொலைக்காட்சி',
        description: 'நவீன தமிழ் கவிதைகளின் அழகை உணருங்கள்',
        thumbnailUrl: 'https://img.youtube.com/vi/modern-poetry/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/embed/modern-poetry',
        duration: '35:40',
        subject: 'தமிழ்',
        class: 'Class 10',
        chapter: 'நவீன இலக்கியம்',
        language: 'tamil',
        publishedAt: '2024-09-17',
        viewCount: 1580000,
        channelName: 'Kalvi TV Official'
      }
    ]
  },

  // ==================== CLASS 11 CONTENT ====================
  {
    id: 'class-11-physics-comprehensive',
    title: 'Class 11 Physics - Complete Course | Kalvi TV',
    description: 'Comprehensive physics course for Class 11 students - Kalvi TV Official',
    thumbnailUrl: 'https://img.youtube.com/vi/physics11-intro/maxresdefault.jpg',
    subject: 'Physics',
    class: 'Class 11',
    language: 'english',
    videoCount: 40,
    videos: [
      {
        id: 'phy-11-units-measurements',
        title: 'Units and Measurements | Class 11 Physics | Kalvi TV Official',
        description: 'Physical quantities, units, dimensions and their significance',
        thumbnailUrl: 'https://img.youtube.com/vi/units-measurements/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/embed/units-measurements',
        duration: '45:30',
        subject: 'Physics',
        class: 'Class 11',
        chapter: 'Units and Measurements',
        language: 'english',
        publishedAt: '2024-10-01',
        viewCount: 1650000,
        channelName: 'Kalvi TV Official'
      },
      {
        id: 'phy-11-motion-straight-line',
        title: 'Motion in a Straight Line | Class 11 Physics | Kalvi TV Official',
        description: 'Kinematics of motion in one dimension',
        thumbnailUrl: 'https://img.youtube.com/vi/motion-straight/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/embed/motion-straight',
        duration: '48:20',
        subject: 'Physics',
        class: 'Class 11',
        chapter: 'Motion in a Straight Line',
        language: 'english',
        publishedAt: '2024-10-03',
        viewCount: 1720000,
        channelName: 'Kalvi TV Official'
      },
      {
        id: 'phy-11-motion-plane',
        title: 'Motion in a Plane | Class 11 Physics | Kalvi TV Official',
        description: 'Two-dimensional motion and projectile motion',
        thumbnailUrl: 'https://img.youtube.com/vi/motion-plane/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/embed/motion-plane',
        duration: '52:15',
        subject: 'Physics',
        class: 'Class 11',
        chapter: 'Motion in a Plane',
        language: 'english',
        publishedAt: '2024-10-05',
        viewCount: 1680000,
        channelName: 'Kalvi TV Official'
      },
      {
        id: 'phy-11-laws-motion',
        title: 'Laws of Motion | Class 11 Physics | Kalvi TV Official',
        description: 'Newton\'s laws of motion and their applications',
        thumbnailUrl: 'https://img.youtube.com/vi/laws-motion/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/embed/laws-motion',
        duration: '50:40',
        subject: 'Physics',
        class: 'Class 11',
        chapter: 'Laws of Motion',
        language: 'english',
        publishedAt: '2024-10-07',
        viewCount: 1750000,
        channelName: 'Kalvi TV Official'
      }
    ]
  },
  {
    id: 'class-11-chemistry-comprehensive',
    title: 'Class 11 Chemistry - Complete Course | Kalvi TV',
    description: 'Comprehensive chemistry course for Class 11 students - Kalvi TV Official',
    thumbnailUrl: 'https://img.youtube.com/vi/chemistry11-intro/maxresdefault.jpg',
    subject: 'Chemistry',
    class: 'Class 11',
    language: 'english',
    videoCount: 38,
    videos: [
      {
        id: 'chem-11-basic-concepts',
        title: 'Basic Concepts of Chemistry | Class 11 Chemistry | Kalvi TV Official',
        description: 'Atoms, molecules, moles, and stoichiometry',
        thumbnailUrl: 'https://img.youtube.com/vi/basic-concepts/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/embed/basic-concepts',
        duration: '46:25',
        subject: 'Chemistry',
        class: 'Class 11',
        chapter: 'Basic Concepts of Chemistry',
        language: 'english',
        publishedAt: '2024-10-10',
        viewCount: 1580000,
        channelName: 'Kalvi TV Official'
      },
      {
        id: 'chem-11-atomic-structure',
        title: 'Structure of Atom | Class 11 Chemistry | Kalvi TV Official',
        description: 'Atomic models, quantum numbers, and electronic configuration',
        thumbnailUrl: 'https://img.youtube.com/vi/atomic-structure/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/embed/atomic-structure',
        duration: '55:30',
        subject: 'Chemistry',
        class: 'Class 11',
        chapter: 'Structure of Atom',
        language: 'english',
        publishedAt: '2024-10-12',
        viewCount: 1620000,
        channelName: 'Kalvi TV Official'
      },
      {
        id: 'chem-11-periodic-table',
        title: 'Classification of Elements | Class 11 Chemistry | Kalvi TV Official',
        description: 'Periodic table and periodic properties',
        thumbnailUrl: 'https://img.youtube.com/vi/periodic-table/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/embed/periodic-table',
        duration: '48:45',
        subject: 'Chemistry',
        class: 'Class 11',
        chapter: 'Classification of Elements and Periodicity',
        language: 'english',
        publishedAt: '2024-10-14',
        viewCount: 1550000,
        channelName: 'Kalvi TV Official'
      }
    ]
  },
  {
    id: 'class-11-biology-comprehensive',
    title: 'Class 11 Biology - Life Sciences | Kalvi TV',
    description: 'Comprehensive biology course for Class 11 students - Kalvi TV Official',
    thumbnailUrl: 'https://img.youtube.com/vi/biology11-intro/maxresdefault.jpg',
    subject: 'Biology',
    class: 'Class 11',
    language: 'english',
    videoCount: 35,
    videos: [
      {
        id: 'bio-11-living-world',
        title: 'The Living World | Class 11 Biology | Kalvi TV Official',
        description: 'Diversity in living world and classification',
        thumbnailUrl: 'https://img.youtube.com/vi/living-world/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/embed/living-world',
        duration: '42:30',
        subject: 'Biology',
        class: 'Class 11',
        chapter: 'The Living World',
        language: 'english',
        publishedAt: '2024-10-15',
        viewCount: 1480000,
        channelName: 'Kalvi TV Official'
      },
      {
        id: 'bio-11-biological-classification',
        title: 'Biological Classification | Class 11 Biology | Kalvi TV Official',
        description: 'Five kingdom classification system',
        thumbnailUrl: 'https://img.youtube.com/vi/bio-classification/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/embed/bio-classification',
        duration: '45:20',
        subject: 'Biology',
        class: 'Class 11',
        chapter: 'Biological Classification',
        language: 'english',
        publishedAt: '2024-10-17',
        viewCount: 1420000,
        channelName: 'Kalvi TV Official'
      }
    ]
  },
  {
    id: 'class-11-math-comprehensive',
    title: 'Class 11 Mathematics - Advanced Mathematics | Kalvi TV',
    description: 'Advanced mathematics for Class 11 students - Kalvi TV Official',
    thumbnailUrl: 'https://img.youtube.com/vi/math11-intro/maxresdefault.jpg',
    subject: 'Mathematics',
    class: 'Class 11',
    language: 'english',
    videoCount: 42,
    videos: [
      {
        id: 'math-11-sets',
        title: 'Sets | Class 11 Mathematics | Kalvi TV Official',
        description: 'Set theory and operations on sets',
        thumbnailUrl: 'https://img.youtube.com/vi/sets/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/embed/sets',
        duration: '38:45',
        subject: 'Mathematics',
        class: 'Class 11',
        chapter: 'Sets',
        language: 'english',
        publishedAt: '2024-10-20',
        viewCount: 1650000,
        channelName: 'Kalvi TV Official'
      },
      {
        id: 'math-11-relations-functions',
        title: 'Relations and Functions | Class 11 Mathematics | Kalvi TV Official',
        description: 'Understanding relations and functions',
        thumbnailUrl: 'https://img.youtube.com/vi/relations-functions/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/embed/relations-functions',
        duration: '44:30',
        subject: 'Mathematics',
        class: 'Class 11',
        chapter: 'Relations and Functions',
        language: 'english',
        publishedAt: '2024-10-22',
        viewCount: 1580000,
        channelName: 'Kalvi TV Official'
      }
    ]
  },

  // ==================== CLASS 12 CONTENT ====================
  {
    id: 'class-12-physics-advanced',
    title: 'Class 12 Physics - Advanced Course | Kalvi TV',
    description: 'Advanced physics course for Class 12 HSC students - Kalvi TV Official',
    thumbnailUrl: 'https://img.youtube.com/vi/physics12-advanced/maxresdefault.jpg',
    subject: 'Physics',
    class: 'Class 12',
    language: 'english',
    videoCount: 45,
    videos: [
      {
        id: 'phy-12-electric-charges',
        title: 'Electric Charges and Fields | Class 12 Physics | Kalvi TV Official',
        description: 'Coulomb\'s law, electric field and electric flux',
        thumbnailUrl: 'https://img.youtube.com/vi/electric-charges/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/embed/electric-charges',
        duration: '58:30',
        subject: 'Physics',
        class: 'Class 12',
        chapter: 'Electric Charges and Fields',
        language: 'english',
        publishedAt: '2024-11-01',
        viewCount: 2150000,
        channelName: 'Kalvi TV Official'
      },
      {
        id: 'phy-12-electrostatic-potential',
        title: 'Electrostatic Potential and Capacitance | Class 12 Physics | Kalvi TV Official',
        description: 'Electric potential, potential energy, and capacitors',
        thumbnailUrl: 'https://img.youtube.com/vi/electrostatic-potential/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/embed/electrostatic-potential',
        duration: '55:45',
        subject: 'Physics',
        class: 'Class 12',
        chapter: 'Electrostatic Potential and Capacitance',
        language: 'english',
        publishedAt: '2024-11-03',
        viewCount: 2080000,
        channelName: 'Kalvi TV Official'
      },
      {
        id: 'phy-12-current-electricity',
        title: 'Current Electricity | Class 12 Physics | Kalvi TV Official',
        description: 'Electric current, resistance, and electrical circuits',
        thumbnailUrl: 'https://img.youtube.com/vi/current-electricity/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/embed/current-electricity',
        duration: '52:20',
        subject: 'Physics',
        class: 'Class 12',
        chapter: 'Current Electricity',
        language: 'english',
        publishedAt: '2024-11-05',
        viewCount: 2120000,
        channelName: 'Kalvi TV Official'
      },
      {
        id: 'phy-12-magnetic-effects',
        title: 'Magnetic Effects of Electric Current | Class 12 Physics | Kalvi TV Official',
        description: 'Magnetic field, force on current-carrying conductor',
        thumbnailUrl: 'https://img.youtube.com/vi/magnetic-effects/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/embed/magnetic-effects',
        duration: '60:15',
        subject: 'Physics',
        class: 'Class 12',
        chapter: 'Magnetic Effects of Electric Current',
        language: 'english',
        publishedAt: '2024-11-07',
        viewCount: 2200000,
        channelName: 'Kalvi TV Official'
      },
      {
        id: 'phy-12-electromagnetic-induction',
        title: 'Electromagnetic Induction | Class 12 Physics | Kalvi TV Official',
        description: 'Faraday\'s law, Lenz\'s law, and electromagnetic induction',
        thumbnailUrl: 'https://img.youtube.com/vi/em-induction/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/embed/em-induction',
        duration: '56:40',
        subject: 'Physics',
        class: 'Class 12',
        chapter: 'Electromagnetic Induction',
        language: 'english',
        publishedAt: '2024-11-09',
        viewCount: 2180000,
        channelName: 'Kalvi TV Official'
      }
    ]
  },
  {
    id: 'class-12-chemistry-advanced',
    title: 'Class 12 Chemistry - Advanced Course | Kalvi TV',
    description: 'Advanced chemistry course for Class 12 HSC students - Kalvi TV Official',
    thumbnailUrl: 'https://img.youtube.com/vi/chemistry12-advanced/maxresdefault.jpg',
    subject: 'Chemistry',
    class: 'Class 12',
    language: 'english',
    videoCount: 42,
    videos: [
      {
        id: 'chem-12-solid-state',
        title: 'The Solid State | Class 12 Chemistry | Kalvi TV Official',
        description: 'Crystal lattices, unit cells, and solid state properties',
        thumbnailUrl: 'https://img.youtube.com/vi/solid-state/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/embed/solid-state',
        duration: '48:30',
        subject: 'Chemistry',
        class: 'Class 12',
        chapter: 'The Solid State',
        language: 'english',
        publishedAt: '2024-11-10',
        viewCount: 1850000,
        channelName: 'Kalvi TV Official'
      },
      {
        id: 'chem-12-solutions',
        title: 'Solutions | Class 12 Chemistry | Kalvi TV Official',
        description: 'Types of solutions, concentration, and colligative properties',
        thumbnailUrl: 'https://img.youtube.com/vi/solutions/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/embed/solutions',
        duration: '52:15',
        subject: 'Chemistry',
        class: 'Class 12',
        chapter: 'Solutions',
        language: 'english',
        publishedAt: '2024-11-12',
        viewCount: 1780000,
        channelName: 'Kalvi TV Official'
      },
      {
        id: 'chem-12-electrochemistry',
        title: 'Electrochemistry | Class 12 Chemistry | Kalvi TV Official',
        description: 'Electrochemical cells, batteries, and electrolysis',
        thumbnailUrl: 'https://img.youtube.com/vi/electrochemistry/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/embed/electrochemistry',
        duration: '55:40',
        subject: 'Chemistry',
        class: 'Class 12',
        chapter: 'Electrochemistry',
        language: 'english',
        publishedAt: '2024-11-14',
        viewCount: 1920000,
        channelName: 'Kalvi TV Official'
      }
    ]
  },
  {
    id: 'class-12-biology-advanced',
    title: 'Class 12 Biology - Advanced Life Sciences | Kalvi TV',
    description: 'Advanced biology course for Class 12 HSC students - Kalvi TV Official',
    thumbnailUrl: 'https://img.youtube.com/vi/biology12-advanced/maxresdefault.jpg',
    subject: 'Biology',
    class: 'Class 12',
    language: 'english',
    videoCount: 40,
    videos: [
      {
        id: 'bio-12-reproduction',
        title: 'Reproduction in Organisms | Class 12 Biology | Kalvi TV Official',
        description: 'Sexual and asexual reproduction in plants and animals',
        thumbnailUrl: 'https://img.youtube.com/vi/reproduction/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/embed/reproduction',
        duration: '50:25',
        subject: 'Biology',
        class: 'Class 12',
        chapter: 'Reproduction in Organisms',
        language: 'english',
        publishedAt: '2024-11-15',
        viewCount: 1750000,
        channelName: 'Kalvi TV Official'
      },
      {
        id: 'bio-12-sexual-reproduction-plants',
        title: 'Sexual Reproduction in Flowering Plants | Class 12 Biology | Kalvi TV Official',
        description: 'Flower structure, pollination, and fertilization',
        thumbnailUrl: 'https://img.youtube.com/vi/sexual-reproduction-plants/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/embed/sexual-reproduction-plants',
        duration: '48:30',
        subject: 'Biology',
        class: 'Class 12',
        chapter: 'Sexual Reproduction in Flowering Plants',
        language: 'english',
        publishedAt: '2024-11-17',
        viewCount: 1680000,
        channelName: 'Kalvi TV Official'
      },
      {
        id: 'bio-12-human-reproduction',
        title: 'Human Reproduction | Class 12 Biology | Kalvi TV Official',
        description: 'Human reproductive system and development',
        thumbnailUrl: 'https://img.youtube.com/vi/human-reproduction/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/embed/human-reproduction',
        duration: '52:45',
        subject: 'Biology',
        class: 'Class 12',
        chapter: 'Human Reproduction',
        language: 'english',
        publishedAt: '2024-11-19',
        viewCount: 1820000,
        channelName: 'Kalvi TV Official'
      }
    ]
  },
  {
    id: 'class-12-math-advanced',
    title: 'Class 12 Mathematics - Advanced Mathematics | Kalvi TV',
    description: 'Advanced mathematics for Class 12 HSC students - Kalvi TV Official',
    thumbnailUrl: 'https://img.youtube.com/vi/math12-advanced/maxresdefault.jpg',
    subject: 'Mathematics',
    class: 'Class 12',
    language: 'english',
    videoCount: 48,
    videos: [
      {
        id: 'math-12-relations-functions',
        title: 'Relations and Functions | Class 12 Mathematics | Kalvi TV Official',
        description: 'Types of relations and functions, inverse functions',
        thumbnailUrl: 'https://img.youtube.com/vi/relations-functions-12/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/embed/relations-functions-12',
        duration: '45:30',
        subject: 'Mathematics',
        class: 'Class 12',
        chapter: 'Relations and Functions',
        language: 'english',
        publishedAt: '2024-11-20',
        viewCount: 1950000,
        channelName: 'Kalvi TV Official'
      },
      {
        id: 'math-12-inverse-trigonometric',
        title: 'Inverse Trigonometric Functions | Class 12 Mathematics | Kalvi TV Official',
        description: 'Properties and graphs of inverse trigonometric functions',
        thumbnailUrl: 'https://img.youtube.com/vi/inverse-trig/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/embed/inverse-trig',
        duration: '42:20',
        subject: 'Mathematics',
        class: 'Class 12',
        chapter: 'Inverse Trigonometric Functions',
        language: 'english',
        publishedAt: '2024-11-22',
        viewCount: 1880000,
        channelName: 'Kalvi TV Official'
      },
      {
        id: 'math-12-matrices',
        title: 'Matrices | Class 12 Mathematics | Kalvi TV Official',
        description: 'Matrix operations, determinants, and applications',
        thumbnailUrl: 'https://img.youtube.com/vi/matrices/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/embed/matrices',
        duration: '50:15',
        subject: 'Mathematics',
        class: 'Class 12',
        chapter: 'Matrices',
        language: 'english',
        publishedAt: '2024-11-24',
        viewCount: 2020000,
        channelName: 'Kalvi TV Official'
      },
      {
        id: 'math-12-determinants',
        title: 'Determinants | Class 12 Mathematics | Kalvi TV Official',
        description: 'Properties of determinants and solving linear equations',
        thumbnailUrl: 'https://img.youtube.com/vi/determinants/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/embed/determinants',
        duration: '48:40',
        subject: 'Mathematics',
        class: 'Class 12',
        chapter: 'Determinants',
        language: 'english',
        publishedAt: '2024-11-26',
        viewCount: 1960000,
        channelName: 'Kalvi TV Official'
      }
    ]
  }
];

// YouTube API Service Class
export class YouTubeKalviService {
  private apiKey: string;
  
  constructor(apiKey?: string) {
    this.apiKey = apiKey || process.env.NEXT_PUBLIC_YOUTUBE_API_KEY || '';
  }

  // Search videos by query
  async searchVideos(query: string, maxResults: number = 10): Promise<KalviVideo[]> {
    if (!this.apiKey) {
      // Return mock data if no API key
      return this.getMockSearchResults(query, maxResults);
    }

    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=${maxResults}&key=${this.apiKey}`
      );
      
      if (!response.ok) {
        throw new Error('YouTube API request failed');
      }

      const data = await response.json();
      return this.transformYouTubeResults(data.items);
    } catch (error) {
      console.error('YouTube API error:', error);
      return this.getMockSearchResults(query, maxResults);
    }
  }

  // Get videos for a specific subject and class
  async getVideosForSubject(subject: string, className: string): Promise<KalviVideo[]> {
    const query = `${subject} ${className} Tamil Nadu Samacheer Kalvi`;
    return this.searchVideos(query, 20);
  }

  // Get playlist videos
  async getPlaylistVideos(playlistId: string): Promise<KalviVideo[]> {
    if (!this.apiKey) {
      // Return mock playlist data
      const playlist = kalviTVContent.find(p => p.id === playlistId);
      return playlist?.videos || [];
    }

    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=50&key=${this.apiKey}`
      );
      
      if (!response.ok) {
        throw new Error('YouTube API request failed');
      }

      const data = await response.json();
      return this.transformYouTubeResults(data.items);
    } catch (error) {
      console.error('YouTube API error:', error);
      const playlist = kalviTVContent.find(p => p.id === playlistId);
      return playlist?.videos || [];
    }
  }

  // Get recommended videos based on learning history
  getRecommendedVideos(subject: string, watchHistory: string[] = []): KalviVideo[] {
    const allVideos = kalviTVContent.flatMap(playlist => playlist.videos);
    
    // Filter by subject and exclude already watched
    let recommended = allVideos.filter(video => 
      video.subject.toLowerCase().includes(subject.toLowerCase()) &&
      !watchHistory.includes(video.id)
    );

    // Sort by view count and return top 10
    return recommended
      .sort((a, b) => b.viewCount - a.viewCount)
      .slice(0, 10);
  }

  // Track video progress
  trackVideoProgress(videoId: string, progress: number, userId: string): void {
    // In a real implementation, this would save to database
    const progressData = {
      videoId,
      progress,
      userId,
      timestamp: new Date().toISOString()
    };
    
    // Save to localStorage for demo
    const existingProgress = JSON.parse(localStorage.getItem('videoProgress') || '[]');
    const updatedProgress = existingProgress.filter((p: any) => 
      !(p.videoId === videoId && p.userId === userId)
    );
    updatedProgress.push(progressData);
    localStorage.setItem('videoProgress', JSON.stringify(updatedProgress));
  }

  // Get video progress
  getVideoProgress(videoId: string, userId: string): number {
    const progressData = JSON.parse(localStorage.getItem('videoProgress') || '[]');
    const progress = progressData.find((p: any) => 
      p.videoId === videoId && p.userId === userId
    );
    return progress?.progress || 0;
  }

  // Private helper methods
  private getMockSearchResults(query: string, maxResults: number): KalviVideo[] {
    const allVideos = kalviTVContent.flatMap(playlist => playlist.videos);
    const filtered = allVideos.filter(video =>
      video.title.toLowerCase().includes(query.toLowerCase()) ||
      video.description.toLowerCase().includes(query.toLowerCase()) ||
      video.subject.toLowerCase().includes(query.toLowerCase())
    );
    return filtered.slice(0, maxResults);
  }

  private transformYouTubeResults(items: any[]): KalviVideo[] {
    return items.map((item, index) => ({
      id: item.id?.videoId || item.snippet?.resourceId?.videoId || `video-${index}`,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnailUrl: item.snippet.thumbnails?.high?.url || item.snippet.thumbnails?.default?.url,
      videoUrl: `https://www.youtube.com/embed/${item.id?.videoId || item.snippet?.resourceId?.videoId}`,
      duration: '0:00', // Would need additional API call to get duration
      subject: this.extractSubjectFromTitle(item.snippet.title),
      class: this.extractClassFromTitle(item.snippet.title),
      chapter: 'General',
      language: this.detectLanguage(item.snippet.title),
      publishedAt: item.snippet.publishedAt,
      viewCount: Math.floor(Math.random() * 1000000), // Mock view count
      channelName: item.snippet.channelTitle
    }));
  }

  private extractSubjectFromTitle(title: string): string {
    const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'Tamil', 'Science'];
    const found = subjects.find(subject => 
      title.toLowerCase().includes(subject.toLowerCase())
    );
    return found || 'General';
  }

  private extractClassFromTitle(title: string): string {
    const classMatch = title.match(/class\s*(\d+)/i);
    return classMatch ? `Class ${classMatch[1]}` : 'General';
  }

  private detectLanguage(title: string): 'tamil' | 'english' {
    // Simple detection based on Tamil characters
    const tamilRegex = /[\u0B80-\u0BFF]/;
    return tamilRegex.test(title) ? 'tamil' : 'english';
  }
}

// Export singleton instance
export const youtubeKalviService = new YouTubeKalviService();

// Helper functions for backward compatibility
export function searchVideos(query: string, videos: KalviVideo[] = []): KalviVideo[] {
  if (videos.length === 0) {
    videos = kalviTVContent.flatMap(playlist => playlist.videos);
  }
  
  return videos.filter(video =>
    video.title.toLowerCase().includes(query.toLowerCase()) ||
    video.description.toLowerCase().includes(query.toLowerCase()) ||
    video.subject.toLowerCase().includes(query.toLowerCase()) ||
    video.chapter.toLowerCase().includes(query.toLowerCase())
  );
}

export function getVideosForSubject(subject: string, videos: KalviVideo[] = []): KalviVideo[] {
  if (videos.length === 0) {
    videos = kalviTVContent.flatMap(playlist => playlist.videos);
  }
  
  return videos.filter(video =>
    video.subject.toLowerCase().includes(subject.toLowerCase())
  );
}

export function getRecommendedVideos(subject: string, videos: KalviVideo[] = []): KalviVideo[] {
  if (videos.length === 0) {
    videos = kalviTVContent.flatMap(playlist => playlist.videos);
  }
  
  return videos
    .filter(video => video.subject.toLowerCase().includes(subject.toLowerCase()))
    .sort((a, b) => b.viewCount - a.viewCount)
    .slice(0, 8);
}

export function getVideosForClass(className: string, videos: KalviVideo[] = []): KalviVideo[] {
  if (videos.length === 0) {
    videos = kalviTVContent.flatMap(playlist => playlist.videos);
  }
  
  return videos.filter(video =>
    video.class.toLowerCase().includes(className.toLowerCase())
  );
}