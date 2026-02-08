import { NextRequest, NextResponse } from 'next/server';
import { getCompleteCurriculum, getCompleteSubject } from '@/lib/curriculum-db';

// GET: Fetch complete curriculum with all nested data
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const classNum = searchParams.get('class');
    const medium = searchParams.get('medium');
    const subjectId = searchParams.get('subjectId');

    // If subjectId is provided, return complete subject data
    if (subjectId) {
      const subject = getCompleteSubject(parseInt(subjectId));
      if (!subject) {
        return NextResponse.json(
          { error: 'Subject not found' },
          { status: 404 }
        );
      }
      return NextResponse.json(subject);
    }

    // Otherwise, return complete curriculum for class and medium
    if (!classNum || !medium) {
      return NextResponse.json(
        { error: 'Class and medium are required (or provide subjectId)' },
        { status: 400 }
      );
    }

    const curriculum = getCompleteCurriculum(parseInt(classNum), medium);
    return NextResponse.json(curriculum);
  } catch (error) {
    console.error('Error fetching complete curriculum:', error);
    return NextResponse.json(
      { error: 'Failed to fetch curriculum' },
      { status: 500 }
    );
  }
}
