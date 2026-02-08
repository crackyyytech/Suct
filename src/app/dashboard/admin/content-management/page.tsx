'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { BookOpen, Video, Edit, Save, X, Plus, Trash2, CheckCircle, AlertCircle, Database } from 'lucide-react';

interface Subject {
  id: number;
  class: number;
  medium: string;
  subject_name: string;
  subject_code: string;
}

interface Chapter {
  id: number;
  subject_id: number;
  chapter_number: number;
  chapter_title: string;
}

interface VideoResource {
  id: number;
  chapter_id: number;
  video_id: string;
  title: string;
  url: string;
  duration?: string;
  description?: string;
  thumbnail_url?: string;
  video_order: number;
}

export default function ContentManagementPage() {
  const [selectedClass, setSelectedClass] = useState<string>('1');
  const [selectedMedium, setSelectedMedium] = useState<string>('English');
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  const [videos, setVideos] = useState<VideoResource[]>([]);
  const [editingVideo, setEditingVideo] = useState<VideoResource | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isMigrateDialogOpen, setIsMigrateDialogOpen] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [loading, setLoading] = useState(false);
  const [migrating, setMigrating] = useState(false);

  // Form state for video editing
  const [videoForm, setVideoForm] = useState({
    videoId: '',
    title: '',
    url: '',
    duration: '',
    description: ''
  });

  // Fetch subjects when class or medium changes
  useEffect(() => {
    fetchSubjects();
  }, [selectedClass, selectedMedium]);

  // Fetch chapters when subject changes
  useEffect(() => {
    if (selectedSubject) {
      fetchChapters(selectedSubject.id);
    } else {
      setChapters([]);
      setSelectedChapter(null);
    }
  }, [selectedSubject]);

  // Fetch videos when chapter changes
  useEffect(() => {
    if (selectedChapter) {
      fetchVideos(selectedChapter.id);
    } else {
      setVideos([]);
    }
  }, [selectedChapter]);

  const fetchSubjects = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/curriculum/subjects?class=${selectedClass}&medium=${selectedMedium}`);
      if (response.ok) {
        const data = await response.json();
        setSubjects(data);
        setSelectedSubject(null);
      }
    } catch (error) {
      console.error('Error fetching subjects:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchChapters = async (subjectId: number) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/curriculum/chapters?subjectId=${subjectId}`);
      if (response.ok) {
        const data = await response.json();
        setChapters(data);
        setSelectedChapter(null);
      }
    } catch (error) {
      console.error('Error fetching chapters:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchVideos = async (chapterId: number) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/curriculum/videos?chapterId=${chapterId}`);
      if (response.ok) {
        const data = await response.json();
        setVideos(data);
      }
    } catch (error) {
      console.error('Error fetching videos:', error);
    } finally {
      setLoading(false);
    }
  };

  // Extract YouTube video ID from URL
  const extractVideoId = (url: string): string => {
    try {
      if (url.includes('youtube.com/watch?v=')) {
        const urlObj = new URL(url);
        return urlObj.searchParams.get('v') || '';
      } else if (url.includes('youtu.be/')) {
        const urlObj = new URL(url);
        return urlObj.pathname.slice(1);
      } else if (url.includes('youtube.com/embed/')) {
        return url.split('embed/')[1]?.split('?')[0] || '';
      } else if (/^[a-zA-Z0-9_-]{11}$/.test(url)) {
        return url;
      }
    } catch (error) {
      console.error('Error extracting video ID:', error);
    }
    return url;
  };

  // Handle edit video
  const handleEditVideo = (video: VideoResource) => {
    setEditingVideo(video);
    setVideoForm({
      videoId: video.video_id,
      title: video.title,
      url: video.url,
      duration: video.duration || '',
      description: video.description || ''
    });
    setIsEditDialogOpen(true);
  };

  // Handle add new video
  const handleAddVideo = () => {
    setEditingVideo(null);
    setVideoForm({
      videoId: '',
      title: '',
      url: '',
      duration: '',
      description: ''
    });
    setIsAddDialogOpen(true);
  };

  // Handle save video (add or update)
  const handleSaveVideo = async () => {
    if (!selectedChapter) return;

    const videoId = extractVideoId(videoForm.url || videoForm.videoId);
    
    if (!videoId || !videoForm.title) {
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 3000);
      return;
    }

    const videoData = {
      chapterId: selectedChapter.id,
      videoId: videoId,
      title: videoForm.title,
      url: `https://www.youtube.com/watch?v=${videoId}`,
      duration: videoForm.duration,
      description: videoForm.description,
      thumbnailUrl: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
      videoOrder: editingVideo ? editingVideo.video_order : videos.length + 1
    };

    try {
      let response;
      if (editingVideo) {
        // Update existing video
        response = await fetch('/api/curriculum/videos', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingVideo.id, ...videoData })
        });
      } else {
        // Add new video
        response = await fetch('/api/curriculum/videos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(videoData)
        });
      }

      if (response.ok) {
        setSaveStatus('success');
        setIsEditDialogOpen(false);
        setIsAddDialogOpen(false);
        fetchVideos(selectedChapter.id);
        setTimeout(() => setSaveStatus('idle'), 3000);
      } else {
        setSaveStatus('error');
        setTimeout(() => setSaveStatus('idle'), 3000);
      }
    } catch (error) {
      console.error('Error saving video:', error);
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 3000);
    }
  };

  // Handle delete video
  const handleDeleteVideo = async (videoId: number) => {
    if (!confirm('Are you sure you want to delete this video?')) return;

    try {
      const response = await fetch(`/api/curriculum/videos?id=${videoId}`, {
        method: 'DELETE'
      });

      if (response.ok && selectedChapter) {
        setSaveStatus('success');
        fetchVideos(selectedChapter.id);
        setTimeout(() => setSaveStatus('idle'), 3000);
      } else {
        setSaveStatus('error');
        setTimeout(() => setSaveStatus('idle'), 3000);
      }
    } catch (error) {
      console.error('Error deleting video:', error);
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 3000);
    }
  };

  // Handle data migration
  const handleMigration = async () => {
    setMigrating(true);
    try {
      const response = await fetch('/api/curriculum/migrate', {
        method: 'POST'
      });

      if (response.ok) {
        const result = await response.json();
        alert(`Migration successful!\n\nStatistics:\nSubjects: ${result.stats.subjects.count}\nChapters: ${result.stats.chapters.count}\nTopics: ${result.stats.topics.count}\nVideos: ${result.stats.videos.count}`);
        setIsMigrateDialogOpen(false);
        fetchSubjects();
      } else {
        alert('Migration failed. Check console for details.');
      }
    } catch (error) {
      console.error('Migration error:', error);
      alert('Migration failed. Check console for details.');
    } finally {
      setMigrating(false);
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Content Management System</h1>
          <p className="text-muted-foreground">Manage curriculum videos and content for all classes</p>
        </div>
        <Button onClick={() => setIsMigrateDialogOpen(true)} variant="outline">
          <Database className="mr-2 h-4 w-4" />
          Migrate Data
        </Button>
      </div>

      {/* Status Alert */}
      {saveStatus !== 'idle' && (
        <Alert variant={saveStatus === 'success' ? 'default' : 'destructive'}>
          {saveStatus === 'success' ? (
            <CheckCircle className="h-4 w-4" />
          ) : (
            <AlertCircle className="h-4 w-4" />
          )}
          <AlertDescription>
            {saveStatus === 'success' 
              ? 'Changes saved successfully!' 
              : 'Error saving changes. Please try again.'}
          </AlertDescription>
        </Alert>
      )}

      {/* Class and Medium Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Select Class and Medium</CardTitle>
          <CardDescription>Choose the class and medium to manage content</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Class</Label>
              <select
                className="w-full p-2 border rounded-md"
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
              >
                {Array.from({ length: 12 }, (_, i) => i + 1).map((num) => (
                  <option key={num} value={num}>Class {num}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label>Medium</Label>
              <select
                className="w-full p-2 border rounded-md"
                value={selectedMedium}
                onChange={(e) => setSelectedMedium(e.target.value)}
              >
                <option value="English">English</option>
                <option value="Tamil">Tamil</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Subjects List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Subjects
            </CardTitle>
            <CardDescription>
              {subjects.length} subjects available
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[500px]">
              {loading && subjects.length === 0 ? (
                <p className="text-sm text-muted-foreground">Loading...</p>
              ) : subjects.length === 0 ? (
                <p className="text-sm text-muted-foreground">No subjects found. Click "Migrate Data" to populate the database.</p>
              ) : (
                <div className="space-y-2">
                  {subjects.map((subject) => (
                    <Button
                      key={subject.id}
                      variant={selectedSubject?.id === subject.id ? 'default' : 'outline'}
                      className="w-full justify-start"
                      onClick={() => setSelectedSubject(subject)}
                    >
                      <span className="truncate">{subject.subject_name}</span>
                    </Button>
                  ))}
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Chapters List */}
        <Card>
          <CardHeader>
            <CardTitle>Chapters</CardTitle>
            <CardDescription>
              {selectedSubject ? `${chapters.length} chapters` : 'Select a subject'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[500px]">
              {!selectedSubject ? (
                <p className="text-sm text-muted-foreground">Select a subject to view chapters</p>
              ) : loading ? (
                <p className="text-sm text-muted-foreground">Loading...</p>
              ) : chapters.length === 0 ? (
                <p className="text-sm text-muted-foreground">No chapters found</p>
              ) : (
                <div className="space-y-2">
                  {chapters.map((chapter) => (
                    <Button
                      key={chapter.id}
                      variant={selectedChapter?.id === chapter.id ? 'default' : 'outline'}
                      className="w-full justify-start text-left"
                      onClick={() => setSelectedChapter(chapter)}
                    >
                      <div className="flex flex-col items-start">
                        <span className="font-medium">Chapter {chapter.chapter_number}</span>
                        <span className="text-xs truncate w-full">{chapter.chapter_title}</span>
                      </div>
                    </Button>
                  ))}
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Videos List */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Video className="h-5 w-5" />
                  Videos
                </CardTitle>
                <CardDescription>
                  {selectedChapter ? `${videos.length} videos` : 'Select a chapter'}
                </CardDescription>
              </div>
              {selectedChapter && (
                <Button size="sm" onClick={handleAddVideo}>
                  <Plus className="h-4 w-4 mr-1" />
                  Add
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[500px]">
              {!selectedChapter ? (
                <p className="text-sm text-muted-foreground">Select a chapter to view videos</p>
              ) : loading ? (
                <p className="text-sm text-muted-foreground">Loading...</p>
              ) : videos.length === 0 ? (
                <p className="text-sm text-muted-foreground">No videos found. Click "Add" to add videos.</p>
              ) : (
                <div className="space-y-3">
                  {videos.map((video) => (
                    <Card key={video.id}>
                      <CardContent className="p-3">
                        <div className="flex items-start gap-2">
                          <img
                            src={video.thumbnail_url || `https://img.youtube.com/vi/${video.video_id}/default.jpg`}
                            alt={video.title}
                            className="w-20 h-14 object-cover rounded"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate">{video.title}</p>
                            <p className="text-xs text-muted-foreground">{video.duration}</p>
                            <div className="flex gap-1 mt-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleEditVideo(video)}
                              >
                                <Edit className="h-3 w-3" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleDeleteVideo(video.id)}
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* Edit Video Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Video</DialogTitle>
            <DialogDescription>Update video information</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>YouTube URL or Video ID</Label>
              <Input
                placeholder="https://www.youtube.com/watch?v=... or video ID"
                value={videoForm.url || videoForm.videoId}
                onChange={(e) => setVideoForm({ ...videoForm, url: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Title</Label>
              <Input
                placeholder="Video title"
                value={videoForm.title}
                onChange={(e) => setVideoForm({ ...videoForm, title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Duration (optional)</Label>
              <Input
                placeholder="e.g., 10:30"
                value={videoForm.duration}
                onChange={(e) => setVideoForm({ ...videoForm, duration: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Description (optional)</Label>
              <Input
                placeholder="Video description"
                value={videoForm.description}
                onChange={(e) => setVideoForm({ ...videoForm, description: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveVideo}>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Video Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Video</DialogTitle>
            <DialogDescription>Add a new video to this chapter</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>YouTube URL or Video ID</Label>
              <Input
                placeholder="https://www.youtube.com/watch?v=... or video ID"
                value={videoForm.url || videoForm.videoId}
                onChange={(e) => setVideoForm({ ...videoForm, url: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Title</Label>
              <Input
                placeholder="Video title"
                value={videoForm.title}
                onChange={(e) => setVideoForm({ ...videoForm, title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Duration (optional)</Label>
              <Input
                placeholder="e.g., 10:30"
                value={videoForm.duration}
                onChange={(e) => setVideoForm({ ...videoForm, duration: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Description (optional)</Label>
              <Input
                placeholder="Video description"
                value={videoForm.description}
                onChange={(e) => setVideoForm({ ...videoForm, description: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveVideo}>
              <Plus className="mr-2 h-4 w-4" />
              Add Video
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Migration Dialog */}
      <Dialog open={isMigrateDialogOpen} onOpenChange={setIsMigrateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Migrate Curriculum Data</DialogTitle>
            <DialogDescription>
              This will populate the database with all curriculum data from the existing files.
              This process may take a few minutes.
            </DialogDescription>
          </DialogHeader>
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Warning: This will clear all existing data in the database and replace it with fresh data.
            </AlertDescription>
          </Alert>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsMigrateDialogOpen(false)} disabled={migrating}>
              Cancel
            </Button>
            <Button onClick={handleMigration} disabled={migrating}>
              <Database className="mr-2 h-4 w-4" />
              {migrating ? 'Migrating...' : 'Start Migration'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
