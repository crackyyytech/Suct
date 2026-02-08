// SQLite Database Configuration and Setup
import Database from 'better-sqlite3';
import path from 'path';

// Database file path
const dbPath = path.join(process.cwd(), 'curriculum.db');

// Initialize database
let db: Database.Database | null = null;

export function getDatabase(): Database.Database {
  if (!db) {
    db = new Database(dbPath);
    db.pragma('journal_mode = WAL');
    initializeTables();
  }
  return db;
}

// Initialize database tables
function initializeTables() {
  const db = getDatabase();

  // Subjects table
  db.exec(`
    CREATE TABLE IF NOT EXISTS subjects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      class INTEGER NOT NULL,
      medium TEXT NOT NULL,
      subject_name TEXT NOT NULL,
      subject_code TEXT NOT NULL UNIQUE,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Chapters table
  db.exec(`
    CREATE TABLE IF NOT EXISTS chapters (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      subject_id INTEGER NOT NULL,
      chapter_number INTEGER NOT NULL,
      chapter_title TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE CASCADE
    )
  `);

  // Topics table
  db.exec(`
    CREATE TABLE IF NOT EXISTS topics (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      chapter_id INTEGER NOT NULL,
      topic_name TEXT NOT NULL,
      topic_order INTEGER NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (chapter_id) REFERENCES chapters(id) ON DELETE CASCADE
    )
  `);

  // Subtopics table
  db.exec(`
    CREATE TABLE IF NOT EXISTS subtopics (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      topic_id INTEGER NOT NULL,
      subtopic_name TEXT NOT NULL,
      subtopic_order INTEGER NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (topic_id) REFERENCES topics(id) ON DELETE CASCADE
    )
  `);

  // Learning outcomes table
  db.exec(`
    CREATE TABLE IF NOT EXISTS learning_outcomes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      chapter_id INTEGER NOT NULL,
      outcome_text TEXT NOT NULL,
      outcome_order INTEGER NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (chapter_id) REFERENCES chapters(id) ON DELETE CASCADE
    )
  `);

  // Videos table
  db.exec(`
    CREATE TABLE IF NOT EXISTS videos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      chapter_id INTEGER NOT NULL,
      video_id TEXT NOT NULL,
      title TEXT NOT NULL,
      url TEXT NOT NULL,
      duration TEXT,
      description TEXT,
      thumbnail_url TEXT,
      video_order INTEGER NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (chapter_id) REFERENCES chapters(id) ON DELETE CASCADE
    )
  `);

  // Create indexes for better performance
  db.exec(`
    CREATE INDEX IF NOT EXISTS idx_subjects_class_medium ON subjects(class, medium);
    CREATE INDEX IF NOT EXISTS idx_chapters_subject ON chapters(subject_id);
    CREATE INDEX IF NOT EXISTS idx_topics_chapter ON topics(chapter_id);
    CREATE INDEX IF NOT EXISTS idx_subtopics_topic ON subtopics(topic_id);
    CREATE INDEX IF NOT EXISTS idx_learning_outcomes_chapter ON learning_outcomes(chapter_id);
    CREATE INDEX IF NOT EXISTS idx_videos_chapter ON videos(chapter_id);
  `);
}

// Close database connection
export function closeDatabase() {
  if (db) {
    db.close();
    db = null;
  }
}

export default getDatabase;
