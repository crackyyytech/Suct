'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Play, BookOpen, Video, Clock, Award } from 'lucide-react';
import { completeCurriculum, type Course, type Subject, type Chapter } from '@/services/curriculum-generator';
import { YouTubePlayer } from '@/components/youtube-player';

export function CourseViewer() {
  const [selectedClass, setSelectedClass] = useState<string>('Class 1');
  const [selectedMedium, setSelectedMedium] = useState<string>('Tamil');
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);

  // Get unique classes
  const classes = Array.from(new Set(completeCurriculum.map(c => c.class))).sort((a, b) => {
    const numA = parseInt(a.replace('Class ', ''));
    const numB = parseInt(b.replace('Class ', ''));
    return numA - numB;
  });

  // Get courses for selected class
  const coursesForClass = completeCurriculum.filter(c => c.class === selectedClass);
  
  // Get mediums available for selected class
  const mediums = Array.from(new Set(coursesForClass.map(c => c.medium)));

  // Get current course
  const currentCourse = coursesForClass.find(c => c.medium === selectedMedium);

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold">Samacheer Kalvi - Complete Curriculum</h1>
        <p className="text-muted-foreground">Classes 1-12 with YouTube Video Integration</p>
      </div>

      {/* Class Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Select Class</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-2">
            {classes.map((cls) => (
              <Button
                key={cls}
                variant={selectedClass === cls ? 'default' : 'outline'}
                onClick={() => {
                  setSelectedClass(cls);
                  setSelectedSubject(null);
                  setSelectedChapter(null);
                }}
                className="w-full"
              >
                {cls.replace('Class ', '')}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Medium Selection */}
      {mediums.length > 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Select Medium</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              {mediums.map((medium) => (
                <Button
                  key={medium}
                  variant={selectedMedium === medium ? 'default' : 'outline'}
                  onClick={() => {
                    setSelectedMedium(medium);
                    setSelectedSubject(null);
                    setSelectedChapter(null);
                  }}
                >
                  {medium}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Subjects */}
      {currentCourse && (
        <Card>
          <CardHeader>
            <CardTitle>Subjects</CardTitle>
            <CardDescription>
              {currentCourse.board} - {currentCourse.syllabus_source}
              {currentCourse.stream && ` (${currentCourse.stream} Stream)`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentCourse.subjects.map((subject) => (
                <Card
                  key={subject.course_id}
                  className={`cursor-pointer transition-all hover:shadow-lg ${
                    selectedSubject?.course_id === subject.course_id ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => {
                    setSelectedSubject(subject);
                    setSelectedChapter(null);
                  }}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {subject.subject_name}
                      <Badge>{subject.difficulty_level}</Badge>
                    </CardTitle>
                    <CardDescription>{subject.overview}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <BookOpen className="h-4 w-4" />
                        <span>{subject.chapters.length} Chapters</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Video className="h-4 w-4" />
                        <span>{subject.total_videos} Videos</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Chapters and Videos */}
      {selectedSubject && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chapters List */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Chapters</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px]">
                <div className="space-y-2">
                  {selectedSubject.chapters.map((chapter) => (
                    <Card
                      key={chapter.chapter_id}
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        selectedChapter?.chapter_id === chapter.chapter_id ? 'ring-2 ring-primary' : ''
                      }`}
                      onClick={() => setSelectedChapter(chapter)}
                    >
                      <CardHeader className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <div className="text-sm font-medium">
                              Chapter {chapter.chapter_order}
                            </div>
                            <div className="text-sm font-semibold">
                              {chapter.chapter_title}
                            </div>
                          </div>
                          <Badge variant="outline">{chapter.difficulty_level}</Badge>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground mt-2">
                          <div className="flex items-center gap-1">
                            <Video className="h-3 w-3" />
                            <span>{chapter.videos.length}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>{chapter.estimated_hours}h</span>
                          </div>
                        </div>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Chapter Details and Videos */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>
                {selectedChapter ? selectedChapter.chapter_title : 'Select a Chapter'}
              </CardTitle>
              {selectedChapter && (
                <CardDescription>{selectedChapter.summary}</CardDescription>
              )}
            </CardHeader>
            <CardContent>
              {selectedChapter ? (
                <Tabs defaultValue="videos" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="videos">Videos</TabsTrigger>
                    <TabsTrigger value="topics">Topics</TabsTrigger>
                    <TabsTrigger value="outcomes">Outcomes</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="videos" className="space-y-4">
                    <ScrollArea className="h-[500px]">
                      {selectedChapter.videos.map((video) => (
                        <Card key={video.videoId} className="mb-4">
                          <CardHeader>
                            <CardTitle className="text-lg">{video.title}</CardTitle>
                            <CardDescription>{video.description}</CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <YouTubePlayer
                              videoId={video.videoId}
                              title={video.title}
                              thumbnailUrl={video.thumbnailUrl}
                            />
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Clock className="h-4 w-4" />
                              <span>Duration: {video.duration}</span>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </ScrollArea>
                  </TabsContent>
                  
                  <TabsContent value="topics">
                    <ScrollArea className="h-[500px]">
                      <div className="space-y-2">
                        {selectedChapter.key_topics.map((topic, index) => (
                          <Card key={index}>
                            <CardContent className="p-4">
                              <div className="flex items-center gap-2">
                                <BookOpen className="h-4 w-4 text-primary" />
                                <span>{topic}</span>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </ScrollArea>
                  </TabsContent>
                  
                  <TabsContent value="outcomes">
                    <ScrollArea className="h-[500px]">
                      <div className="space-y-2">
                        {selectedChapter.learning_outcomes.map((outcome, index) => (
                          <Card key={index}>
                            <CardContent className="p-4">
                              <div className="flex items-center gap-2">
                                <Award className="h-4 w-4 text-primary" />
                                <span>{outcome}</span>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </ScrollArea>
                  </TabsContent>
                </Tabs>
              ) : (
                <div className="text-center text-muted-foreground py-12">
                  Select a chapter to view videos and content
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
