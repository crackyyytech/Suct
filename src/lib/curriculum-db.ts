// Curriculum Database Operations
import { getDatabase } from './db';

export interface SubjectData {
  id?: number;
  class: number;
  medium: string;
  subjectName: string;
  subjectCode: string;
}

export interface ChapterData {
  id?: number;
  subjectId: number;
  chapterNumber: number;
  chapterTitle: string;
}

export interface TopicData {
  id?: number;
  chapterId: number;
  topicName: string;
  topicOrder: number;
}

export interface SubtopicData {
  id?: number;
  topicId: number;
  subtopicName: string;
  subtopicOrder: number;
}

export interface LearningOutcomeData {
  id?: number;
  chapterId: number;
  outcomeText: string;
  outcomeOrder: number;
}

export interface VideoData {
  id?: number;
  chapterId: number;
  videoId: string;
  title: string;
  url: string;
  duration?: string;
  description?: string;
  thumbnailUrl?: string;
  videoOrder: number;
}

// ==================== SUBJECT OPERATIONS ====================

export function createSubject(data: SubjectData): number {
  const db = getDatabase();
  const stmt = db.prepare(`
    INSERT INTO subjects (class, medium, subject_name, subject_code)
    VALUES (?, ?, ?, ?)
  `);
  const result = stmt.run(data.class, data.medium, data.subjectName, data.subjectCode);
  return result.lastInsertRowid as number;
}

export function getSubjectsByClassAndMedium(classNum: number, medium: string) {
  const db = getDatabase();
  const stmt = db.prepare(`
    SELECT * FROM subjects 
    WHERE class = ? AND medium = ?
    ORDER BY subject_name
  `);
  return stmt.all(classNum, medium);
}

export function getSubjectById(id: number) {
  const db = getDatabase();
  const stmt = db.prepare('SELECT * FROM subjects WHERE id = ?');
  return stmt.get(id);
}

export function updateSubject(id: number, data: Partial<SubjectData>) {
  const db = getDatabase();
  const fields = [];
  const values = [];
  
  if (data.subjectName) {
    fields.push('subject_name = ?');
    values.push(data.subjectName);
  }
  if (data.subjectCode) {
    fields.push('subject_code = ?');
    values.push(data.subjectCode);
  }
  
  fields.push('updated_at = CURRENT_TIMESTAMP');
  values.push(id);
  
  const stmt = db.prepare(`
    UPDATE subjects SET ${fields.join(', ')} WHERE id = ?
  `);
  return stmt.run(...values);
}

export function deleteSubject(id: number) {
  const db = getDatabase();
  const stmt = db.prepare('DELETE FROM subjects WHERE id = ?');
  return stmt.run(id);
}

// ==================== CHAPTER OPERATIONS ====================

export function createChapter(data: ChapterData): number {
  const db = getDatabase();
  const stmt = db.prepare(`
    INSERT INTO chapters (subject_id, chapter_number, chapter_title)
    VALUES (?, ?, ?)
  `);
  const result = stmt.run(data.subjectId, data.chapterNumber, data.chapterTitle);
  return result.lastInsertRowid as number;
}

export function getChaptersBySubject(subjectId: number) {
  const db = getDatabase();
  const stmt = db.prepare(`
    SELECT * FROM chapters 
    WHERE subject_id = ?
    ORDER BY chapter_number
  `);
  return stmt.all(subjectId);
}

export function getChapterById(id: number) {
  const db = getDatabase();
  const stmt = db.prepare('SELECT * FROM chapters WHERE id = ?');
  return stmt.get(id);
}

export function updateChapter(id: number, data: Partial<ChapterData>) {
  const db = getDatabase();
  const fields = [];
  const values = [];
  
  if (data.chapterTitle) {
    fields.push('chapter_title = ?');
    values.push(data.chapterTitle);
  }
  if (data.chapterNumber !== undefined) {
    fields.push('chapter_number = ?');
    values.push(data.chapterNumber);
  }
  
  fields.push('updated_at = CURRENT_TIMESTAMP');
  values.push(id);
  
  const stmt = db.prepare(`
    UPDATE chapters SET ${fields.join(', ')} WHERE id = ?
  `);
  return stmt.run(...values);
}

export function deleteChapter(id: number) {
  const db = getDatabase();
  const stmt = db.prepare('DELETE FROM chapters WHERE id = ?');
  return stmt.run(id);
}

// ==================== TOPIC OPERATIONS ====================

export function createTopic(data: TopicData): number {
  const db = getDatabase();
  const stmt = db.prepare(`
    INSERT INTO topics (chapter_id, topic_name, topic_order)
    VALUES (?, ?, ?)
  `);
  const result = stmt.run(data.chapterId, data.topicName, data.topicOrder);
  return result.lastInsertRowid as number;
}

export function getTopicsByChapter(chapterId: number) {
  const db = getDatabase();
  const stmt = db.prepare(`
    SELECT * FROM topics 
    WHERE chapter_id = ?
    ORDER BY topic_order
  `);
  return stmt.all(chapterId);
}

export function deleteTopic(id: number) {
  const db = getDatabase();
  const stmt = db.prepare('DELETE FROM topics WHERE id = ?');
  return stmt.run(id);
}

// ==================== SUBTOPIC OPERATIONS ====================

export function createSubtopic(data: SubtopicData): number {
  const db = getDatabase();
  const stmt = db.prepare(`
    INSERT INTO subtopics (topic_id, subtopic_name, subtopic_order)
    VALUES (?, ?, ?)
  `);
  const result = stmt.run(data.topicId, data.subtopicName, data.subtopicOrder);
  return result.lastInsertRowid as number;
}

export function getSubtopicsByTopic(topicId: number) {
  const db = getDatabase();
  const stmt = db.prepare(`
    SELECT * FROM subtopics 
    WHERE topic_id = ?
    ORDER BY subtopic_order
  `);
  return stmt.all(topicId);
}

export function deleteSubtopic(id: number) {
  const db = getDatabase();
  const stmt = db.prepare('DELETE FROM subtopics WHERE id = ?');
  return stmt.run(id);
}

// ==================== LEARNING OUTCOME OPERATIONS ====================

export function createLearningOutcome(data: LearningOutcomeData): number {
  const db = getDatabase();
  const stmt = db.prepare(`
    INSERT INTO learning_outcomes (chapter_id, outcome_text, outcome_order)
    VALUES (?, ?, ?)
  `);
  const result = stmt.run(data.chapterId, data.outcomeText, data.outcomeOrder);
  return result.lastInsertRowid as number;
}

export function getLearningOutcomesByChapter(chapterId: number) {
  const db = getDatabase();
  const stmt = db.prepare(`
    SELECT * FROM learning_outcomes 
    WHERE chapter_id = ?
    ORDER BY outcome_order
  `);
  return stmt.all(chapterId);
}

export function deleteLearningOutcome(id: number) {
  const db = getDatabase();
  const stmt = db.prepare('DELETE FROM learning_outcomes WHERE id = ?');
  return stmt.run(id);
}

// ==================== VIDEO OPERATIONS ====================

export function createVideo(data: VideoData): number {
  const db = getDatabase();
  const stmt = db.prepare(`
    INSERT INTO videos (chapter_id, video_id, title, url, duration, description, thumbnail_url, video_order)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);
  const result = stmt.run(
    data.chapterId,
    data.videoId,
    data.title,
    data.url,
    data.duration || null,
    data.description || null,
    data.thumbnailUrl || null,
    data.videoOrder
  );
  return result.lastInsertRowid as number;
}

export function getVideosByChapter(chapterId: number) {
  const db = getDatabase();
  const stmt = db.prepare(`
    SELECT * FROM videos 
    WHERE chapter_id = ?
    ORDER BY video_order
  `);
  return stmt.all(chapterId);
}

export function updateVideo(id: number, data: Partial<VideoData>) {
  const db = getDatabase();
  const fields = [];
  const values = [];
  
  if (data.videoId) {
    fields.push('video_id = ?');
    values.push(data.videoId);
  }
  if (data.title) {
    fields.push('title = ?');
    values.push(data.title);
  }
  if (data.url) {
    fields.push('url = ?');
    values.push(data.url);
  }
  if (data.duration) {
    fields.push('duration = ?');
    values.push(data.duration);
  }
  if (data.description) {
    fields.push('description = ?');
    values.push(data.description);
  }
  if (data.thumbnailUrl) {
    fields.push('thumbnail_url = ?');
    values.push(data.thumbnailUrl);
  }
  
  fields.push('updated_at = CURRENT_TIMESTAMP');
  values.push(id);
  
  const stmt = db.prepare(`
    UPDATE videos SET ${fields.join(', ')} WHERE id = ?
  `);
  return stmt.run(...values);
}

export function deleteVideo(id: number) {
  const db = getDatabase();
  const stmt = db.prepare('DELETE FROM videos WHERE id = ?');
  return stmt.run(id);
}

// ==================== COMPLEX QUERIES ====================

export function getCompleteSubject(subjectId: number) {
  const db = getDatabase();
  
  // Get subject
  const subject = getSubjectById(subjectId);
  if (!subject) return null;
  
  // Get chapters
  const chapters = getChaptersBySubject(subjectId);
  
  // For each chapter, get topics, learning outcomes, and videos
  const completeChapters = chapters.map((chapter: any) => {
    const topics = getTopicsByChapter(chapter.id);
    const topicsWithSubtopics = topics.map((topic: any) => ({
      ...topic,
      subtopics: getSubtopicsByTopic(topic.id)
    }));
    
    return {
      ...chapter,
      topics: topicsWithSubtopics,
      learningOutcomes: getLearningOutcomesByChapter(chapter.id),
      videos: getVideosByChapter(chapter.id)
    };
  });
  
  return {
    ...subject,
    chapters: completeChapters
  };
}

export function getCompleteCurriculum(classNum: number, medium: string) {
  const subjects = getSubjectsByClassAndMedium(classNum, medium);
  return subjects.map((subject: any) => getCompleteSubject(subject.id));
}
