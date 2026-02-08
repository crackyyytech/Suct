'use client';

import { YouTubePlayer } from '@/components/youtube-player';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function VideoTestPage() {
  // Test with real YouTube video IDs
  const testVideos = [
    {
      videoId: 'rIJKxJmS3lI',
      title: 'Tamil Vowels Song - உயிர் எழுத்துக்கள்',
      description: 'Learn Tamil vowels with this educational song',
      thumbnailUrl: 'https://img.youtube.com/vi/rIJKxJmS3lI/maxresdefault.jpg'
    },
    {
      videoId: 'Yocja_N5s1I',
      title: 'Tamil Alphabets - தமிழ் எழுத்துக்கள்',
      description: 'Complete Tamil alphabet learning video',
      thumbnailUrl: 'https://img.youtube.com/vi/Yocja_N5s1I/maxresdefault.jpg'
    },
    {
      videoId: 'DR-cfDsHCGA',
      title: 'Numbers 1-10 - எண்கள்',
      description: 'Learn to count from 1 to 10',
      thumbnailUrl: 'https://img.youtube.com/vi/DR-cfDsHCGA/maxresdefault.jpg'
    },
    {
      videoId: 'dQw4w9WgXcQ',
      title: 'Sample Educational Video',
      description: 'A sample video to demonstrate the player',
      thumbnailUrl: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg'
    }
  ];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold">Video Player Test</h1>
        <p className="text-muted-foreground">Testing YouTube video integration</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {testVideos.map((video) => (
          <Card key={video.videoId}>
            <CardHeader>
              <CardTitle>{video.title}</CardTitle>
              <CardDescription>{video.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <YouTubePlayer
                videoId={video.videoId}
                title={video.title}
                thumbnailUrl={video.thumbnailUrl}
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
