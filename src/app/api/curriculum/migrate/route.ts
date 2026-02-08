import { NextResponse } from 'next/server';
import { migrateCurriculumData } from '@/lib/migrate-curriculum-data';

// POST: Trigger data migration
export async function POST() {
  try {
    console.log('Starting migration via API...');
    const stats = await migrateCurriculumData();
    
    return NextResponse.json({
      success: true,
      message: 'Migration completed successfully',
      stats
    });
  } catch (error) {
    console.error('Migration error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Migration failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// GET: Check migration status
export async function GET() {
  return NextResponse.json({
    message: 'Use POST method to trigger migration',
    endpoint: '/api/curriculum/migrate'
  });
}
