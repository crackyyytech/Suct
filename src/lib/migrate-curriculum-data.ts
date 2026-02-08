// Data Migration Script: Populate SQLite database with existing curriculum data
import { getDatabase } from './db';
import {
  createSubject,
  createChapter,
  createTopic,
  createSubtopic,
  createLearningOutcome,
  createVideo
} from './curriculum-db';

// Import existing curriculum data
import { generateCurriculum } from '@/services/curriculum-generator';
import { tamilMediumCurriculum } from './tamil-medium-curriculum';

export async function migrateCurriculumData() {
  console.log('Starting curriculum data migration...');
  
  try {
    // Initialize database
    const db = getDatabase();
    
    // Clear existing data (optional - comment out if you want to preserve existing data)
    console.log('Clearing existing data...');
    db.exec('DELETE FROM videos');
    db.exec('DELETE FROM learning_outcomes');
    db.exec('DELETE FROM subtopics');
    db.exec('DELETE FROM topics');
    db.exec('DELETE FROM chapters');
    db.exec('DELETE FROM subjects');
    
    // Migrate English Medium Curriculum (Classes 1-12)
    console.log('Migrating English medium curriculum...');
    for (let classNum = 1; classNum <= 12; classNum++) {
      const curriculum = generateCurriculum(classNum, 'English');
      
      for (const subject of curriculum) {
        console.log(`  Processing Class ${classNum} - ${subject.name}`);
        
        // Create subject
        const subjectId = createSubject({
          class: classNum,
          medium: 'English',
          subjectName: subject.name,
          subjectCode: subject.code
        });
        
        // Create chapters
        for (const chapter of subject.chapters) {
          const chapterId = createChapter({
            subjectId,
            chapterNumber: chapter.number,
            chapterTitle: chapter.title
          });
          
          // Create topics
          if (chapter.topics) {
            for (let i = 0; i < chapter.topics.length; i++) {
              const topic = chapter.topics[i];
              const topicId = createTopic({
                chapterId,
                topicName: topic,
                topicOrder: i + 1
              });
            }
          }
          
          // Create learning outcomes
          if (chapter.learningOutcomes) {
            for (let i = 0; i < chapter.learningOutcomes.length; i++) {
              const outcome = chapter.learningOutcomes[i];
              createLearningOutcome({
                chapterId,
                outcomeText: outcome,
                outcomeOrder: i + 1
              });
            }
          }
          
          // Create videos
          if (chapter.videos) {
            for (let i = 0; i < chapter.videos.length; i++) {
              const video = chapter.videos[i];
              createVideo({
                chapterId,
                videoId: video.id,
                title: video.title,
                url: video.url,
                duration: video.duration,
                description: video.description,
                thumbnailUrl: `https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`,
                videoOrder: i + 1
              });
            }
          }
        }
      }
    }
    
    // Migrate Tamil Medium Curriculum (Classes 1-12)
    console.log('Migrating Tamil medium curriculum...');
    for (let classNum = 1; classNum <= 12; classNum++) {
      const curriculum = tamilMediumCurriculum(classNum);
      
      for (const subject of curriculum) {
        console.log(`  Processing Class ${classNum} - ${subject.name}`);
        
        // Create subject
        const subjectId = createSubject({
          class: classNum,
          medium: 'Tamil',
          subjectName: subject.name,
          subjectCode: subject.code
        });
        
        // Create chapters
        for (const chapter of subject.chapters) {
          const chapterId = createChapter({
            subjectId,
            chapterNumber: chapter.number,
            chapterTitle: chapter.title
          });
          
          // Create topics
          if (chapter.topics) {
            for (let i = 0; i < chapter.topics.length; i++) {
              const topic = chapter.topics[i];
              const topicId = createTopic({
                chapterId,
                topicName: topic.name,
                topicOrder: i + 1
              });
              
              // Create subtopics
              if (topic.subtopics) {
                for (let j = 0; j < topic.subtopics.length; j++) {
                  const subtopic = topic.subtopics[j];
                  createSubtopic({
                    topicId,
                    subtopicName: subtopic,
                    subtopicOrder: j + 1
                  });
                }
              }
            }
          }
          
          // Create learning outcomes
          if (chapter.learningOutcomes) {
            for (let i = 0; i < chapter.learningOutcomes.length; i++) {
              const outcome = chapter.learningOutcomes[i];
              createLearningOutcome({
                chapterId,
                outcomeText: outcome,
                outcomeOrder: i + 1
              });
            }
          }
          
          // Create videos (if available)
          if (chapter.videos) {
            for (let i = 0; i < chapter.videos.length; i++) {
              const video = chapter.videos[i];
              createVideo({
                chapterId,
                videoId: video.id,
                title: video.title,
                url: video.url,
                duration: video.duration || '',
                description: video.description || '',
                thumbnailUrl: `https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`,
                videoOrder: i + 1
              });
            }
          }
        }
      }
    }
    
    console.log('Migration completed successfully!');
    
    // Print statistics
    const stats = {
      subjects: db.prepare('SELECT COUNT(*) as count FROM subjects').get() as { count: number },
      chapters: db.prepare('SELECT COUNT(*) as count FROM chapters').get() as { count: number },
      topics: db.prepare('SELECT COUNT(*) as count FROM topics').get() as { count: number },
      subtopics: db.prepare('SELECT COUNT(*) as count FROM subtopics').get() as { count: number },
      learningOutcomes: db.prepare('SELECT COUNT(*) as count FROM learning_outcomes').get() as { count: number },
      videos: db.prepare('SELECT COUNT(*) as count FROM videos').get() as { count: number }
    };
    
    console.log('\nMigration Statistics:');
    console.log(`  Subjects: ${stats.subjects.count}`);
    console.log(`  Chapters: ${stats.chapters.count}`);
    console.log(`  Topics: ${stats.topics.count}`);
    console.log(`  Subtopics: ${stats.subtopics.count}`);
    console.log(`  Learning Outcomes: ${stats.learningOutcomes.count}`);
    console.log(`  Videos: ${stats.videos.count}`);
    
    return stats;
  } catch (error) {
    console.error('Migration failed:', error);
    throw error;
  }
}

// Run migration if this file is executed directly
if (require.main === module) {
  migrateCurriculumData()
    .then(() => {
      console.log('Done!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Error:', error);
      process.exit(1);
    });
}
