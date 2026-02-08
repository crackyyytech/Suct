"use client";

import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, RotateCcw, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

interface VideoPlayerProps {
  videoId?: string;
  title: string;
  description?: string;
  onProgressUpdate?: (progress: number) => void;
  onComplete?: () => void;
}

export function VideoPlayer({ 
  videoId, 
  title, 
  description, 
  onProgressUpdate, 
  onComplete 
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(1800); // 30 minutes default
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showControls, setShowControls] = useState(true);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  // Simulate video progress
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          const newTime = prev + playbackRate;
          const progress = (newTime / duration) * 100;
          
          onProgressUpdate?.(progress);
          
          if (newTime >= duration) {
            setIsPlaying(false);
            onComplete?.();
            return duration;
          }
          
          return newTime;
        });
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, playbackRate, duration, onProgressUpdate, onComplete]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current) return;
    
    const rect = progressRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = (clickX / rect.width) * 100;
    const newTime = (percentage / 100) * duration;
    
    setCurrentTime(Math.max(0, Math.min(newTime, duration)));
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = (currentTime / duration) * 100;

  return (
    <Card className="overflow-hidden bg-black">
      {/* Video Display Area */}
      <div 
        className="relative aspect-video bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 cursor-pointer"
        onClick={togglePlayPause}
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        {/* Video Content Placeholder */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            {!isPlaying && (
              <Play className="h-20 w-20 mx-auto mb-4 opacity-80 hover:opacity-100 transition-opacity" />
            )}
            <h3 className="text-2xl font-bold mb-2">{title}</h3>
            {description && (
              <p className="text-blue-200 max-w-md mx-auto">{description}</p>
            )}
            <div className="mt-4 flex items-center justify-center gap-2">
              <Badge variant="secondary">Educational Content</Badge>
              <Badge variant="outline" className="text-white border-white">
                {videoId ? 'YouTube' : 'Demo Mode'}
              </Badge>
            </div>
          </div>
        </div>

        {/* Video Controls Overlay */}
        {showControls && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4">
            {/* Progress Bar */}
            <div 
              ref={progressRef}
              className="w-full h-2 bg-white/20 rounded-full mb-4 cursor-pointer"
              onClick={handleSeek}
            >
              <div 
                className="h-full bg-red-500 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Control Buttons */}
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center gap-4">
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-white hover:bg-white/20 p-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    togglePlayPause();
                  }}
                >
                  {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                </Button>

                <Button
                  size="sm"
                  variant="ghost"
                  className="text-white hover:bg-white/20 p-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleMute();
                  }}
                >
                  {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                </Button>

                <span className="text-sm">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-white hover:bg-white/20 p-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentTime(0);
                    setIsPlaying(false);
                  }}
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>

                <select 
                  className="bg-transparent text-white text-sm border border-white/20 rounded px-2 py-1"
                  value={playbackRate}
                  onChange={(e) => setPlaybackRate(Number(e.target.value))}
                  onClick={(e) => e.stopPropagation()}
                >
                  <option value={0.5} className="text-black">0.5x</option>
                  <option value={0.75} className="text-black">0.75x</option>
                  <option value={1} className="text-black">1x</option>
                  <option value={1.25} className="text-black">1.25x</option>
                  <option value={1.5} className="text-black">1.5x</option>
                  <option value={2} className="text-black">2x</option>
                </select>

                <Button
                  size="sm"
                  variant="ghost"
                  className="text-white hover:bg-white/20 p-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Fullscreen functionality would go here
                  }}
                >
                  <Maximize className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isPlaying && (
          <div className="absolute top-4 right-4">
            <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
          </div>
        )}
      </div>

      {/* Real YouTube Integration (when videoId is provided) */}
      {videoId && (
        <div className="hidden">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1`}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}
    </Card>
  );
}