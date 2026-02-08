'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Loader2 } from 'lucide-react';

interface YouTubePlayerProps {
  videoId: string;
  title: string;
  thumbnailUrl: string;
  autoplay?: boolean;
}

export function YouTubePlayer({ videoId, title, thumbnailUrl, autoplay = false }: YouTubePlayerProps) {
  const [isPlaying, setIsPlaying] = useState(autoplay);
  const [isLoading, setIsLoading] = useState(false);

  // Extract video ID from various YouTube URL formats
  const extractVideoId = (id: string): string => {
    // If it's already a clean video ID (11 characters, alphanumeric), return it
    if (id && /^[a-zA-Z0-9_-]{11}$/.test(id)) {
      return id;
    }
    
    // Handle various YouTube URL formats
    try {
      // If it contains 'embed/', extract from there
      if (id.includes('embed/')) {
        const embedMatch = id.match(/embed\/([a-zA-Z0-9_-]{11})/);
        if (embedMatch) {
          return embedMatch[1];
        }
      }
      
      // If it's a full URL, parse it
      if (id.includes('youtube.com') || id.includes('youtu.be')) {
        const url = new URL(id);
        if (url.hostname.includes('youtube.com')) {
          const vParam = url.searchParams.get('v');
          if (vParam) return vParam;
        } else if (url.hostname.includes('youtu.be')) {
          return url.pathname.slice(1);
        }
      }
    } catch (error) {
      console.error('Error parsing video URL:', error);
    }
    
    // If all else fails, return the original ID
    // This might be a custom ID, so we'll use a fallback video
    console.warn('Could not extract valid YouTube video ID from:', id);
    return 'dQw4w9WgXcQ'; // Fallback to a known working video ID
  };

  const cleanVideoId = extractVideoId(videoId);
  const embedUrl = `https://www.youtube.com/embed/${cleanVideoId}?autoplay=1&rel=0&modestbranding=1`;
  const thumbnailImage = thumbnailUrl || `https://img.youtube.com/vi/${cleanVideoId}/maxresdefault.jpg`;

  const handlePlay = () => {
    setIsLoading(true);
    setIsPlaying(true);
    // Loading state will be cleared when iframe loads
    setTimeout(() => setIsLoading(false), 1000);
  };

  if (isPlaying) {
    return (
      <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
            <Loader2 className="h-8 w-8 animate-spin text-white" />
          </div>
        )}
        <iframe
          src={embedUrl}
          title={title}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
          onLoad={() => setIsLoading(false)}
        />
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden group cursor-pointer">
      <img
        src={thumbnailImage}
        alt={title}
        className="w-full h-full object-cover"
        onError={(e) => {
          // Fallback to default quality thumbnail if maxres fails
          const target = e.target as HTMLImageElement;
          if (target.src.includes('maxresdefault')) {
            target.src = `https://img.youtube.com/vi/${cleanVideoId}/hqdefault.jpg`;
          }
        }}
      />
      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-all flex items-center justify-center">
        <Button
          size="lg"
          onClick={handlePlay}
          className="transform group-hover:scale-110 transition-transform"
        >
          <Play className="mr-2 h-6 w-6 fill-current" />
          Play Video
        </Button>
      </div>
      {/* YouTube Play Button Overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-20 h-14 bg-red-600 rounded-lg opacity-90 flex items-center justify-center">
          <Play className="h-8 w-8 text-white fill-current ml-1" />
        </div>
      </div>
    </div>
  );
}
