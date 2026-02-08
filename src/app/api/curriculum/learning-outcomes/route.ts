import { NextRequest, NextResponse } from 'next/server';
import {
  createLearningOutcome,
  getLearningOutcomesByChapter,
  deleteLearningOutcome,
  LearningOutcomeData
} from '@/lib/curriculum-db';

// GET: Fetch learning outcomes by chapter
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const chapterId = searchParams.get('chapterId');

    if (!chapterId) {
      return NextResponse.json(
        { error: 'Chapter ID is required' },
        { status: 400 }
      );
    }

    const outcomes = getLearningOutcomesByChapter(parseInt(chapterId));
    return NextResponse.json(outcomes);
  } catch (error) {
    console.error('Error fetching learning outcomes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch learning outcomes' },
      { status: 500 }
    );
  }
}

// POST: Create a new learning outcome
export async function POST(request: NextRequest) {
  try {
    const data: LearningOutcomeData = await request.json();
    
    if (!data.chapterId || !data.outcomeText || data.outcomeOrder === undefined) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    const id = createLearningOutcome(data);
    return NextResponse.json({ id, ...data }, { status: 201 });
  } catch (error) {
    console.error('Error creating learning outcome:', error);
    return NextResponse.json(
      { error: 'Failed to create learning outcome' },
      { status: 500 }
    );
  }
}

// DELETE: Delete a learning outcome
export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Learning outcome ID is required' },
        { status: 400 }
      );
    }

    deleteLearningOutcome(parseInt(id));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting learning outcome:', error);
    return NextResponse.json(
      { error: 'Failed to delete learning outcome' },
      { status: 500 }
    );
  }
}
