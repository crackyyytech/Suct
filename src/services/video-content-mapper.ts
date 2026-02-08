// Video Content Mapping Service
import { curriculumData } from '@/lib/curriculum-data';
import { kalviTVContent, KALVI_TV_SUBJECTS, type KalviVideo } from './youtube-kalvi';

export interface VideoMapping {
  chapterId: string;
  subjectId: string;
  videos: KalviVideo[];
}

export class VideoContentMapper {
  // Map curriculum chapters to available videos from Kalvi TV Official
  static getVideosForChapter(chapterId: string, subjectId: string): KalviVideo[] {
    // Find the subject and chapter from curriculum
    const subject = curriculumData
      .flatMap(c => c.subjects)
      .find(s => s.course_id === subjectId);
    
    if (!subject) return [];

    const chapter = subject.chapters.find(c => c.chapter_id === chapterId);
    if (!chapter) return [];

    // Extract class information
    const classMatch = subject.course_id.match(/^c(\d+)-/);
    const className = classMatch ? `Class ${classMatch[1]}` : '';
    
    // Determine language from course_id
    const language = subject.course_id.includes('-ta-') ? 'tamil' : 'english';
    
    // Map subject name to match Kalvi TV content
    const mappedSubjectName = this.mapSubjectNameToKalviTV(subject.subject_name, language);

    // Find matching playlists from Kalvi TV content
    const matchingPlaylists = kalviTVContent.filter(playlist => 
      playlist.class === className && 
      playlist.language === language &&
      (playlist.subject === mappedSubjectName || 
       playlist.subject === subject.subject_name ||
       this.isSubjectMatch(playlist.subject, subject.subject_name))
    );

    // Get all videos from matching playlists
    const allVideos = matchingPlaylists.flatMap(playlist => playlist.videos);

    // Filter videos that match the chapter or are relevant to chapter topics
    const relevantVideos = allVideos.filter(video => 
      this.isVideoRelevantToChapter(video, chapter)
    );

    // If we have relevant videos, return them; otherwise return some general videos for the subject
    return relevantVideos.length > 0 ? relevantVideos : allVideos.slice(0, 5);
  }

  // Enhanced subject name mapping for Kalvi TV Official content
  private static mapSubjectNameToKalviTV(subjectName: string, language: 'tamil' | 'english'): string {
    const englishMapping: { [key: string]: string } = {
      'Mathematics': 'Mathematics',
      'English': 'English',
      'Environmental Studies': 'Environmental Studies',
      'Science': 'Science',
      'Social Science': 'Social Science',
      'Physics': 'Physics',
      'Chemistry': 'Chemistry',
      'Biology': 'Biology',
      'Computer Science': 'Computer Science'
    };

    const tamilMapping: { [key: string]: string } = {
      'தமிழ்': 'தமிழ்',
      'கணக்கு': 'கணக்கு',
      'சூழ்நிலையியல்': 'சூழ்நிலையியல்',
      'அறிவியல்': 'அறிவியல்',
      'சமூக அறிவியல்': 'சமூக அறிவியல்',
      'இயற்பியல்': 'இயற்பியல்',
      'வேதியியல்': 'வேதியியல்',
      'உயிரியல்': 'உயிரியல்',
      'கணினி அறிவியல்': 'கணினி அறிவியல்'
    };
    
    const mapping = language === 'tamil' ? tamilMapping : englishMapping;
    return mapping[subjectName] || subjectName;
  }

  // Check if subjects match (handles both English and Tamil names)
  private static isSubjectMatch(subject1: string, subject2: string): boolean {
    if (subject1 === subject2) return true;

    const subjectMappings: { [key: string]: string[] } = {
      'Mathematics': ['கணக்கு', 'Math', 'Maths'],
      'கணக்கு': ['Mathematics', 'Math', 'Maths'],
      'English': ['ஆங்கிலம்'],
      'தமிழ்': ['Tamil'],
      'Science': ['அறிவியல்'],
      'அறிவியல்': ['Science'],
      'Social Science': ['சமூக அறிவியல்'],
      'சமூக அறிவியல்': ['Social Science'],
      'Environmental Studies': ['சூழ்நிலையியல்'],
      'சூழ்நிலையியல்': ['Environmental Studies'],
      'Physics': ['இயற்பியல்'],
      'இயற்பியல்': ['Physics'],
      'Chemistry': ['வேதியியல்'],
      'வேதியியல்': ['Chemistry'],
      'Biology': ['உயிரியல்'],
      'உயிரியல்': ['Biology']
    };

    const mappings = subjectMappings[subject1] || [];
    return mappings.includes(subject2);
  }

  // Enhanced chapter relevance checking with better keyword matching
  private static isVideoRelevantToChapter(video: KalviVideo, chapter: any): boolean {
    // Direct chapter title match
    if (video.chapter && this.normalizeText(video.chapter) === this.normalizeText(chapter.chapter_title)) {
      return true;
    }

    // Extract keywords from chapter
    const chapterKeywords = [
      ...chapter.key_topics,
      ...chapter.learning_outcomes.map((outcome: string) => this.extractKeywords(outcome)),
      this.extractKeywords(chapter.chapter_title),
      this.extractKeywords(chapter.summary)
    ].flat().filter(Boolean);

    // Extract content from video
    const videoContent = [
      video.title,
      video.description,
      video.chapter || ''
    ].join(' ').toLowerCase();

    // Check for keyword matches
    return chapterKeywords.some(keyword => 
      this.isKeywordRelevant(keyword.toLowerCase(), videoContent)
    );
  }

  // Extract meaningful keywords from text
  private static extractKeywords(text: string): string[] {
    if (!text) return [];
    
    // Remove common words and extract meaningful terms
    const commonWords = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'from', 'up', 'about', 'into', 'through', 'during', 'before', 'after', 'above', 'below', 'between', 'among', 'can', 'will', 'should', 'would', 'could', 'may', 'might', 'must', 'shall', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'students', 'learn', 'understand'];
    
    return text.toLowerCase()
      .split(/[^\w\u0B80-\u0BFF]+/) // Split on non-word characters, preserve Tamil
      .filter(word => word.length > 2 && !commonWords.includes(word))
      .slice(0, 10); // Limit to top 10 keywords
  }

  // Check if keyword is relevant to video content
  private static isKeywordRelevant(keyword: string, content: string): boolean {
    // Direct match
    if (content.includes(keyword)) return true;

    // Concept mapping for better matching
    const conceptMappings: { [key: string]: string[] } = {
      // English concepts
      'numbers': ['count', 'number', 'math', 'arithmetic', 'digit', 'numeral'],
      'counting': ['count', 'number', 'one', 'two', 'three', 'numbers'],
      'shapes': ['circle', 'square', 'triangle', 'geometry', 'rectangle', 'oval'],
      'geometry': ['shape', 'circle', 'square', 'triangle', 'rectangle', 'angle'],
      'colors': ['color', 'colour', 'red', 'blue', 'green', 'yellow', 'black', 'white'],
      'animals': ['animal', 'dog', 'cat', 'wild', 'domestic', 'pet', 'zoo'],
      'plants': ['plant', 'tree', 'flower', 'leaf', 'root', 'seed', 'garden'],
      'family': ['family', 'mother', 'father', 'home', 'house', 'parent', 'child'],
      'alphabet': ['abc', 'letter', 'phonics', 'reading', 'a', 'b', 'c'],
      'addition': ['add', 'plus', 'sum', 'total', 'more', 'combine'],
      'subtraction': ['subtract', 'minus', 'take away', 'less', 'difference'],
      'body': ['body', 'head', 'hand', 'leg', 'eye', 'nose', 'mouth'],
      'water': ['water', 'rain', 'river', 'sea', 'drink', 'clean'],
      
      // Tamil concepts
      'எண்கள்': ['எண்', 'கணக்கு', 'ஒன்று', 'இரண்டு', 'மூன்று'],
      'வடிவங்கள்': ['வட்டம்', 'சதுரம்', 'முக்கோணம்', 'வடிவம்'],
      'வண்ணங்கள்': ['வண்ணம்', 'சிவப்பு', 'நீலம்', 'பச்சை', 'மஞ்சள்'],
      'விலங்குகள்': ['விலங்கு', 'நாய்', 'பூனை', 'காட்டு', 'வீட்டு'],
      'தாவரங்கள்': ['தாவரம்', 'மரம்', 'பூ', 'இலை', 'வேர்'],
      'குடும்பம்': ['குடும்பம்', 'அம்மா', 'அப்பா', 'வீடு', 'பெற்றோர்'],
      'உடல்': ['உடல்', 'தலை', 'கை', 'கால்', 'கண்', 'மூக்கு'],
      'நீர்': ['நீர்', 'மழை', 'ஆறு', 'கடல்', 'குடி', 'சுத்தம்']
    };

    const relatedWords = conceptMappings[keyword] || [];
    return relatedWords.some(word => content.includes(word));
  }

  // Normalize text for comparison
  private static normalizeText(text: string): string {
    return text.toLowerCase().trim().replace(/[^\w\u0B80-\u0BFF\s]/g, '');
  }

  // Get recommended videos for a subject with better filtering
  static getRecommendedVideos(subjectId: string, limit: number = 5): KalviVideo[] {
    const subject = curriculumData
      .flatMap(c => c.subjects)
      .find(s => s.course_id === subjectId);
    
    if (!subject) return [];

    const classMatch = subject.course_id.match(/^c(\d+)-/);
    const className = classMatch ? `Class ${classMatch[1]}` : '';
    const language = subject.course_id.includes('-ta-') ? 'tamil' : 'english';
    
    const mappedSubjectName = this.mapSubjectNameToKalviTV(subject.subject_name, language);

    const matchingPlaylists = kalviTVContent.filter(playlist => 
      playlist.class === className && 
      playlist.language === language &&
      (playlist.subject === mappedSubjectName || 
       this.isSubjectMatch(playlist.subject, subject.subject_name))
    );

    const allVideos = matchingPlaylists.flatMap(playlist => playlist.videos);
    
    // Sort by view count and return top videos
    return allVideos
      .sort((a, b) => b.viewCount - a.viewCount)
      .slice(0, limit);
  }

  // Get all available videos for a class with language filtering
  static getVideosForClass(className: string, language?: 'tamil' | 'english'): KalviVideo[] {
    const matchingPlaylists = kalviTVContent.filter(playlist => 
      playlist.class === className &&
      (!language || playlist.language === language)
    );

    return matchingPlaylists.flatMap(playlist => playlist.videos);
  }

  // Enhanced search with better filtering and ranking
  static searchVideos(query: string, className?: string, subject?: string, language?: 'tamil' | 'english'): KalviVideo[] {
    let videos = kalviTVContent.flatMap(playlist => playlist.videos);
    
    // Apply filters
    if (className) {
      videos = videos.filter(video => video.class === className);
    }
    
    if (subject) {
      videos = videos.filter(video => 
        video.subject === subject || this.isSubjectMatch(video.subject, subject)
      );
    }
    
    if (language) {
      videos = videos.filter(video => video.language === language);
    }

    // Search and rank results
    const queryLower = query.toLowerCase();
    const searchResults = videos.filter(video => 
      video.title.toLowerCase().includes(queryLower) ||
      video.description.toLowerCase().includes(queryLower) ||
      video.subject.toLowerCase().includes(queryLower) ||
      (video.chapter && video.chapter.toLowerCase().includes(queryLower))
    );

    // Sort by relevance (title matches first, then description, then view count)
    return searchResults.sort((a, b) => {
      const aTitleMatch = a.title.toLowerCase().includes(queryLower) ? 1 : 0;
      const bTitleMatch = b.title.toLowerCase().includes(queryLower) ? 1 : 0;
      
      if (aTitleMatch !== bTitleMatch) {
        return bTitleMatch - aTitleMatch;
      }
      
      return b.viewCount - a.viewCount;
    });
  }

  // Get subjects available for a specific class
  static getSubjectsForClass(className: string, language?: 'tamil' | 'english'): string[] {
    const classKey = className as keyof typeof KALVI_TV_SUBJECTS;
    if (!KALVI_TV_SUBJECTS[classKey]) return [];
    
    if (language) {
      return KALVI_TV_SUBJECTS[classKey][language] || [];
    }
    
    // Return both languages if not specified
    return [
      ...KALVI_TV_SUBJECTS[classKey].english,
      ...KALVI_TV_SUBJECTS[classKey].tamil
    ];
  }

  // Get video statistics for analytics
  static getVideoStats(className?: string, subject?: string): {
    totalVideos: number;
    totalDuration: number;
    averageViews: number;
    topChannels: string[];
  } {
    let videos = kalviTVContent.flatMap(playlist => playlist.videos);
    
    if (className) {
      videos = videos.filter(video => video.class === className);
    }
    
    if (subject) {
      videos = videos.filter(video => 
        video.subject === subject || this.isSubjectMatch(video.subject, subject)
      );
    }

    const totalVideos = videos.length;
    const totalViews = videos.reduce((sum, video) => sum + video.viewCount, 0);
    const averageViews = totalVideos > 0 ? Math.round(totalViews / totalVideos) : 0;
    
    // Get top channels
    const channelCounts: { [key: string]: number } = {};
    videos.forEach(video => {
      channelCounts[video.channelName] = (channelCounts[video.channelName] || 0) + 1;
    });
    
    const topChannels = Object.entries(channelCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([channel]) => channel);

    return {
      totalVideos,
      totalDuration: 0, // Would need to parse duration strings
      averageViews,
      topChannels
    };
  }
}

export default VideoContentMapper;