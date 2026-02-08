import { NextRequest, NextResponse } from 'next/server';
import {
  createTopic,
  getTopicsByChapter,
  deleteTopic,
  TopicData
} from '@/lib/curriculum-db';

// GET: Fetch topics by chapter
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

    const topics = getTopicsByChapter(parseInt(chapterId));
    return NextResponse.json(topics);
  } catch (error) {
    console.error('Error fetching topics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch topics' },
      { status: 500 }
    );
  }
}

// POST: Create a new topic
export async function POST(request: NextRequest) {
  try {
    const data: TopicData = await request.json();
    
    if (!data.chapterId || !data.topicName || data.topicOrder === undefined) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    const id = createTopic(data);
    return NextResponse.json({ id, ...data }, { status: 201 });
  } catch (error) {
    console.error('Error creating topic:', error);
    return NextResponse.json(
      { error: 'Failed to create topic' },
      { status: 500 }
    );
  }
}

// DELETE: Delete a topic
export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Topic ID is required' },
        { status: 400 }
      );
    }

    deleteTopic(parseInt(id));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting topic:', error);
    return NextResponse.json(
      { error: 'Failed to delete topic' },
      { status: 500 }
    );
  }
}
