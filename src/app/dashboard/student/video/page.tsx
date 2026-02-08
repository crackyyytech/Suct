"use client";

import { Suspense, useMemo, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { 
  ChevronLeft, 
  Play, 
  Clock, 
  BookOpen, 
  ExternalLink, 
  Search, 
  Filter,
  Grid,
  List,
  Star,
  Eye,
  Calendar,
  Award,
  Video
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { curriculumData } from "@/lib/curriculum-data";
import { Badge } from "@/components/ui/badge";
import VideoContentMapper from "@/services/video-content-mapper";
import { kalviTVContent, type KalviVideo } from "@/services/youtube-kalvi";
import { educationalContentAggregator } from "@/services/educational-content-aggregator";
import { students } from "@/lib/demo-data";
import { YouTubePlayer } from "@/components/youtube-player";

function VideoPlayerComponent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const chapterId = searchParams.get('chapterId');
  const subjectId = searchParams.get('subjectId');
  const courseName = searchParams.get('courseName');
  const videoId = searchParams.get('videoId');

  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [watchProgress, setWatchProgress] = useState(0);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all');
  const [studentClass, setStudentClass] = useState<string>('');

  // Get student data
  useEffect(() => {
    const studentData = localStorage.getItem('studentData');
    if (studentData) {
      try {
        const student = JSON.parse(studentData);
        setStudentClass(student.class);
      } catch (error) {
        console.error('Error parsing student data:', error);
      }
    }
  }, []);

  const chapter = useMemo(() => {
    if (!subjectId || !chapterId) return null;
    const subject = curriculumData.flatMap(c => c.subjects).find(s => s.course_id === subjectId);
    return subject?.chapters.find(c => c.chapter_id === chapterId);
  }, [subjectId, chapterId]);

  // Get all available videos for the student's class
  const allVideos = useMemo(() => {
    if (!studentClass) return [];
    return kalviTVContent
      .filter(playlist => playlist.class === studentClass)
      .flatMap(playlist => playlist.videos);
  }, [studentClass]);

  // Get videos for specific chapter or all videos
  const videos = useMemo(() => {
    if (chapterId && subjectId) {
      return VideoContentMapper.getVideosForChapter(chapterId, subjectId);
    }
    
    // Filter all videos based on search and filters
    let filteredVideos = allVideos;
    
    if (searchQuery) {
      filteredVideos = filteredVideos.filter(video =>
        video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.subject.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (selectedSubject !== 'all') {
      filteredVideos = filteredVideos.filter(video => 
        video.subject === selectedSubject
      );
    }
    
    if (selectedLanguage !== 'all') {
      filteredVideos = filteredVideos.filter(video => 
        video.language === selectedLanguage
      );
    }
    
    return filteredVideos;
  }, [chapterId, subjectId, allVideos, searchQuery, selectedSubject, selectedLanguage]);

  // Get unique subjects and languages for filters
  const availableSubjects = useMemo(() => {
    const subjects = [...new Set(allVideos.map(video => video.subject))];
    return subjects.sort();
  }, [allVideos]);

  const availableLanguages = useMemo(() => {
    const languages = [...new Set(allVideos.map(video => video.language))];
    return languages.sort();
  }, [allVideos]);

  // Find current video by ID or use index
  const currentVideo = useMemo(() => {
    if (videoId) {
      const foundVideo = videos.find(v => v.id === videoId);
      if (foundVideo) {
        const index = videos.findIndex(v => v.id === videoId);
        setCurrentVideoIndex(index);
        return foundVideo;
      }
    }
    return videos[currentVideoIndex];
  }, [videoId, videos, currentVideoIndex]);

  useEffect(() => {
    // Simulate loading progress
    const timer = setTimeout(() => {
      setIsVideoLoaded(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, [currentVideoIndex]);

  const handleBackToCourse = () => {
    if (subjectId && courseName) {
      router.push(`/dashboard/student/course?subjectId=${subjectId}&name=${encodeURIComponent(courseName)}`);
    } else {
      router.push('/dashboard/student/courses');
    }
  };

  const handleVideoSelect = (video: KalviVideo, index: number) => {
    setCurrentVideoIndex(index);
    setWatchProgress(0);
    setIsVideoLoaded(false);
    // Update URL with video ID
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set('videoId', video.id);
    window.history.pushState({}, '', newUrl.toString());
  };

  const formatDuration = (duration: string) => {
    return duration || '0:00';
  };

  const formatViewCount = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  // If we have a specific chapter, show the video player
  if (chapter && currentVideo) {
    return (
      <div className="max-w-6xl mx-auto p-4 md:p-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" size="icon" onClick={handleBackToCourse}>
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{chapter.chapter_title}</h1>
            <p className="text-muted-foreground">{courseName}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Video Player */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-0">
                {/* Real YouTube Video Player with new component */}
                <div className="p-4">
                  {currentVideo && (
                    <YouTubePlayer
                      videoId={currentVideo.id}
                      title={currentVideo.title}
                      thumbnailUrl={currentVideo.thumbnailUrl}
                      autoplay={false}
                    />
                  )}
                </div>
                
                {/* Video Info */}
                <div className="p-4 pt-0">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{currentVideo?.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary">{currentVideo?.channelName}</Badge>
                        <Badge variant="outline">{currentVideo?.subject}</Badge>
                        <Badge variant="outline">{currentVideo?.language === 'tamil' ? 'தமிழ்' : 'English'}</Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">
                        <Clock className="h-3 w-3 mr-1" />
                        {formatDuration(currentVideo?.duration || '0:00')}
                      </Badge>
                      <Button size="sm" variant="outline" asChild>
                        <a href={currentVideo?.videoUrl.replace('/embed/', '/watch?v=')} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-3 w-3 mr-1" />
                          YouTube
                        </a>
                      </Button>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm">{currentVideo?.description}</p>
                  
                  {/* Progress Bar */}
                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Watch Progress</span>
                      <span>{Math.round(watchProgress)}%</span>
                    </div>
                    <Progress value={watchProgress} />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Video Stats */}
            <Card className="mt-4">
              <CardContent className="p-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <div className="text-lg font-bold text-primary">{formatViewCount(currentVideo?.viewCount || 0)}</div>
                    <div className="text-xs text-muted-foreground">Views</div>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <div className="text-lg font-bold text-green-600">{Math.round(watchProgress)}%</div>
                    <div className="text-xs text-muted-foreground">Completed</div>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <div className="text-lg font-bold text-blue-600">{currentVideoIndex + 1}/{videos.length}</div>
                    <div className="text-xs text-muted-foreground">Video</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Chapter Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Chapter Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Key Topics</h4>
                  <div className="space-y-1">
                    {chapter.key_topics.map((topic, index) => (
                      <Badge key={index} variant="secondary" className="mr-1 mb-1">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Learning Outcomes</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {chapter.learning_outcomes.map((outcome, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Video Playlist */}
            {videos.length > 1 && (
              <Card>
                <CardHeader>
                  <CardTitle>Related Videos</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {videos.map((video, index) => (
                    <div
                      key={video.id}
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${
                        index === currentVideoIndex 
                          ? 'bg-primary/10 border border-primary/20' 
                          : 'bg-muted/50 hover:bg-muted'
                      }`}
                      onClick={() => handleVideoSelect(video, index)}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-16 h-12 bg-muted rounded overflow-hidden relative">
                          <img 
                            src={video.thumbnailUrl} 
                            alt={video.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                            <Play className="h-4 w-4 text-white" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm line-clamp-2">{video.title}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-muted-foreground">{formatDuration(video.duration)}</span>
                            <span className="text-xs text-muted-foreground">•</span>
                            <span className="text-xs text-muted-foreground">{formatViewCount(video.viewCount)} views</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button 
                  className="w-full" 
                  variant="outline"
                  onClick={() => router.push(`/dashboard/student/quiz?courseName=${encodeURIComponent(courseName || '')}&subjectId=${subjectId}&chapterId=${chapterId}`)}
                >
                  Take Chapter Quiz
                </Button>
                <Button className="w-full" variant="outline">
                  Download Notes
                </Button>
                <Button className="w-full" variant="outline">
                  Ask AI Tutor
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Show video library/browse view
  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => router.push('/dashboard/student')}>
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Video className="h-8 w-8 text-red-500" />
              Kalvi TV Official Videos
            </h1>
            <p className="text-muted-foreground">
              {studentClass} • {allVideos.length}+ Educational Videos • Tamil Nadu State Board
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('grid')}
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search videos, subjects, or topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subjects</SelectItem>
                  {availableSubjects.map(subject => (
                    <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Languages</SelectItem>
                  <SelectItem value="tamil">தமிழ்</SelectItem>
                  <SelectItem value="english">English</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Video Grid/List */}
      {videos.length > 0 ? (
        <div className={viewMode === 'grid' 
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" 
          : "space-y-4"
        }>
          {videos.map((video, index) => (
            <Card 
              key={video.id} 
              className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => handleVideoSelect(video, index)}
            >
              <CardContent className={viewMode === 'grid' ? "p-0" : "p-4"}>
                {viewMode === 'grid' ? (
                  <>
                    <div className="relative aspect-video bg-muted rounded-t-lg overflow-hidden">
                      <img 
                        src={video.thumbnailUrl} 
                        alt={video.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity">
                        <Play className="h-12 w-12 text-white" />
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                        {formatDuration(video.duration)}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-sm line-clamp-2 mb-2">{video.title}</h3>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary" className="text-xs">{video.subject}</Badge>
                        <Badge variant="outline" className="text-xs">
                          {video.language === 'tamil' ? 'தமிழ்' : 'English'}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{video.channelName}</span>
                        <div className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          <span>{formatViewCount(video.viewCount)}</span>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex items-start gap-4">
                    <div className="relative w-32 h-20 bg-muted rounded overflow-hidden flex-shrink-0">
                      <img 
                        src={video.thumbnailUrl} 
                        alt={video.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <Play className="h-6 w-6 text-white" />
                      </div>
                      <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 py-0.5 rounded">
                        {formatDuration(video.duration)}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold line-clamp-2 mb-2">{video.title}</h3>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary" className="text-xs">{video.subject}</Badge>
                        <Badge variant="outline" className="text-xs">
                          {video.language === 'tamil' ? 'தமிழ்' : 'English'}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                        {video.description}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{video.channelName}</span>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            <span>{formatViewCount(video.viewCount)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>{new Date(video.publishedAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-12 text-center">
            <Video className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Videos Found</h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery || selectedSubject !== 'all' || selectedLanguage !== 'all'
                ? "Try adjusting your search or filters"
                : "Video content is being loaded. Please check back later."
              }
            </p>
            <Button onClick={() => {
              setSearchQuery('');
              setSelectedSubject('all');
              setSelectedLanguage('all');
            }}>
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Content Statistics */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Kalvi TV Content Statistics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-red-500">{allVideos.length}+</div>
              <div className="text-sm text-muted-foreground">Total Videos</div>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-blue-500">{availableSubjects.length}</div>
              <div className="text-sm text-muted-foreground">Subjects</div>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-green-500">
                {Math.round(allVideos.reduce((acc, video) => acc + video.viewCount, 0) / 1000000)}M+
              </div>
              <div className="text-sm text-muted-foreground">Total Views</div>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-purple-500">4.5</div>
              <div className="text-sm text-muted-foreground">Avg Rating</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function VideoPlayerSkeleton() {
  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      <div className="flex items-center gap-4 mb-6">
        <Skeleton className="h-10 w-10" />
        <div>
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Skeleton className="aspect-video w-full" />
        </div>
        <div>
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    </div>
  );
}

export default function VideoPlayerPage() {
  return (
    <Suspense fallback={<VideoPlayerSkeleton />}>
      <VideoPlayerComponent />
    </Suspense>
  );
}