import { NextRequest, NextResponse } from 'next/server';
import {
  createSubject,
  getSubjectsByClassAndMedium,
  updateSubject,
  deleteSubject,
  SubjectData
} from '@/lib/curriculum-db';

// GET: Fetch subjects by class and medium
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const classNum = searchParams.get('class');
    const medium = searchParams.get('medium');

    if (!classNum || !medium) {
      return NextResponse.json(
        { error: 'Class and medium are required' },
        { status: 400 }
      );
    }

    const subjects = getSubjectsByClassAndMedium(parseInt(classNum), medium);
    return NextResponse.json(subjects);
  } catch (error) {
    console.error('Error fetching subjects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch subjects' },
      { status: 500 }
    );
  }
}

// POST: Create a new subject
export async function POST(request: NextRequest) {
  try {
    const data: SubjectData = await request.json();
    
    if (!data.class || !data.medium || !data.subjectName || !data.subjectCode) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    const id = createSubject(data);
    return NextResponse.json({ id, ...data }, { status: 201 });
  } catch (error) {
    console.error('Error creating subject:', error);
    return NextResponse.json(
      { error: 'Failed to create subject' },
      { status: 500 }
    );
  }
}

// PUT: Update a subject
export async function PUT(request: NextRequest) {
  try {
    const data = await request.json();
    const { id, ...updateData } = data;

    if (!id) {
      return NextResponse.json(
        { error: 'Subject ID is required' },
        { status: 400 }
      );
    }

    updateSubject(id, updateData);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating subject:', error);
    return NextResponse.json(
      { error: 'Failed to update subject' },
      { status: 500 }
    );
  }
}

// DELETE: Delete a subject
export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Subject ID is required' },
        { status: 400 }
      );
    }

    deleteSubject(parseInt(id));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting subject:', error);
    return NextResponse.json(
      { error: 'Failed to delete subject' },
      { status: 500 }
    );
  }
}
