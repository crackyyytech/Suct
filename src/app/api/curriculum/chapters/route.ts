import { NextRequest, NextResponse } from 'next/server';
import {
  createChapter,
  getChaptersBySubject,
  updateChapter,
  deleteChapter,
  ChapterData
} from '@/lib/curriculum-db';

// GET: Fetch chapters by subject
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const subjectId = searchParams.get('subjectId');

    if (!subjectId) {
      return NextResponse.json(
        { error: 'Subject ID is required' },
        { status: 400 }
      );
    }

    const chapters = getChaptersBySubject(parseInt(subjectId));
    return NextResponse.json(chapters);
  } catch (error) {
    console.error('Error fetching chapters:', error);
    return NextResponse.json(
      { error: 'Failed to fetch chapters' },
      { status: 500 }
    );
  }
}

// POST: Create a new chapter
export async function POST(request: NextRequest) {
  try {
    const data: ChapterData = await request.json();
    
    if (!data.subjectId || !data.chapterNumber || !data.chapterTitle) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    const id = createChapter(data);
    return NextResponse.json({ id, ...data }, { status: 201 });
  } catch (error) {
    console.error('Error creating chapter:', error);
    return NextResponse.json(
      { error: 'Failed to create chapter' },
      { status: 500 }
    );
  }
}

// PUT: Update a chapter
export async function PUT(request: NextRequest) {
  try {
    const data = await request.json();
    const { id, ...updateData } = data;

    if (!id) {
      return NextResponse.json(
        { error: 'Chapter ID is required' },
        { status: 400 }
      );
    }

    updateChapter(id, updateData);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating chapter:', error);
    return NextResponse.json(
      { error: 'Failed to update chapter' },
      { status: 500 }
    );
  }
}

// DELETE: Delete a chapter
export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Chapter ID is required' },
        { status: 400 }
      );
    }

    deleteChapter(parseInt(id));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting chapter:', error);
    return NextResponse.json(
      { error: 'Failed to delete chapter' },
      { status: 500 }
    );
  }
}
