import { NextRequest, NextResponse } from 'next/server';
import {
  createVideo,
  getVideosByChapter,
  updateVideo,
  deleteVideo,
  VideoData
} from '@/lib/curriculum-db';

// GET: Fetch videos by chapter
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

    const videos = getVideosByChapter(parseInt(chapterId));
    return NextResponse.json(videos);
  } catch (error) {
    console.error('Error fetching videos:', error);
    return NextResponse.json(
      { error: 'Failed to fetch videos' },
      { status: 500 }
    );
  }
}

// POST: Create a new video
export async function POST(request: NextRequest) {
  try {
    const data: VideoData = await request.json();
    
    if (!data.chapterId || !data.videoId || !data.title || !data.url || data.videoOrder === undefined) {
      return NextResponse.json(
        { error: 'Required fields: chapterId, videoId, title, url, videoOrder' },
        { status: 400 }
      );
    }

    const id = createVideo(data);
    return NextResponse.json({ id, ...data }, { status: 201 });
  } catch (error) {
    console.error('Error creating video:', error);
    return NextResponse.json(
      { error: 'Failed to create video' },
      { status: 500 }
    );
  }
}

// PUT: Update a video
export async function PUT(request: NextRequest) {
  try {
    const data = await request.json();
    const { id, ...updateData } = data;

    if (!id) {
      return NextResponse.json(
        { error: 'Video ID is required' },
        { status: 400 }
      );
    }

    updateVideo(id, updateData);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating video:', error);
    return NextResponse.json(
      { error: 'Failed to update video' },
      { status: 500 }
    );
  }
}

// DELETE: Delete a video
export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Video ID is required' },
        { status: 400 }
      );
    }

    deleteVideo(parseInt(id));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting video:', error);
    return NextResponse.json(
      { error: 'Failed to delete video' },
      { status: 500 }
    );
  }
}
