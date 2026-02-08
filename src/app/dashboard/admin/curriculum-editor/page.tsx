'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  BookOpen, Plus, Edit, Trash2, Save, X, CheckCircle, AlertCircle, 
  FolderPlus, FileText, List, ChevronRight, ChevronDown
} from 'lucide-react';

interface Topic {
  topic: string;
  subtopics: string[];
}

interface Chapter {
  chapterNumber: number;
  chapterTitle: string;
  topics: Topic[];
  learningOutcomes: string[];
}

interface Subject {
  subjectName: string;
  subjectCode: string;
  chapters: Chapter[];
}

interface ClassCurriculum {
  class: number;
  medium: 'Tamil' | 'English';
  subjects: Subject[];
}

export default function CurriculumEditorPage() {
  const [selectedClass, setSelectedClass] = useState<number>(1);
  const [selectedMedium, setSelectedMedium] = useState<'Tamil' | 'English'>('English');
  const [curriculum, setCurriculum] = useState<ClassCurriculum[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  const [expandedTopics, setExpandedTopics] = useState<Set<number>>(new Set());
  
  // Dialog states
  const [isAddSubjectOpen, setIsAddSubjectOpen] = useState(false);
  const [isEditSubjectOpen, setIsEditSubjectOpen] = useState(false);
  const [isAddChapterOpen, setIsAddChapterOpen] = useState(false);
  const [isEditChapterOpen, setIsEditChapterOpen] = useState(false);
  const [isAddTopicOpen, setIsAddTopicOpen] = useState(false);
  
  // Form states
  const [subjectForm, setSubjectForm] = useState({ name: '', code: '' });
  const [chapterForm, setChapterForm] = useState({ 
    title: '', 
    topics: [] as Topic[], 
    learningOutcomes: [''] 
  });
  const [topicForm, setTopicForm] = useState({ topic: '', subtopics: [''] });
  
  // Status
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  // Get current curriculum
  const currentCurriculum = curriculum.find(
    c => c.class === selectedClass && c.medium === selectedMedium
  );

  const subjects = currentCurriculum?.subjects || [];

  // Initialize curriculum if not exists
  React.useEffect(() => {
    const existing = curriculum.find(
      c => c.class === selectedClass && c.medium === selectedMedium
    );
    if (!existing) {
      setCurriculum(prev => [...prev, {
        class: selectedClass,
        medium: selectedMedium,
        subjects: []
      }]);
    }
  }, [selectedClass, selectedMedium]);

  // Add Subject
  const handleAddSubject = () => {
    if (!subjectForm.name || !subjectForm.code) {
      showError('Please fill all required fields');
      return;
    }

    const newSubject: Subject = {
      subjectName: subjectForm.name,
      subjectCode: subjectForm.code,
      chapters: []
    };

    setCurriculum(prev => prev.map(c => {
      if (c.class === selectedClass && c.medium === selectedMedium) {
        return { ...c, subjects: [...c.subjects, newSubject] };
      }
      return c;
    }));

    setSubjectForm({ name: '', code: '' });
    setIsAddSubjectOpen(false);
    showSuccess('Subject added successfully');
  };

  // Edit Subject
  const handleEditSubject = () => {
    if (!selectedSubject || !subjectForm.name || !subjectForm.code) {
      showError('Please fill all required fields');
      return;
    }

    setCurriculum(prev => prev.map(c => {
      if (c.class === selectedClass && c.medium === selectedMedium) {
        return {
          ...c,
          subjects: c.subjects.map(s =>
            s.subjectCode === selectedSubject.subjectCode
              ? { ...s, subjectName: subjectForm.name, subjectCode: subjectForm.code }
              : s
          )
        };
      }
      return c;
    }));

    setIsEditSubjectOpen(false);
    showSuccess('Subject updated successfully');
  };

  // Delete Subject
  const handleDeleteSubject = (subjectCode: string) => {
    if (!confirm('Are you sure you want to delete this subject? All chapters and topics will be removed.')) {
      return;
    }

    setCurriculum(prev => prev.map(c => {
      if (c.class === selectedClass && c.medium === selectedMedium) {
        return {
          ...c,
          subjects: c.subjects.filter(s => s.subjectCode !== subjectCode)
        };
      }
      return c;
    }));

    if (selectedSubject?.subjectCode === subjectCode) {
      setSelectedSubject(null);
      setSelectedChapter(null);
    }

    showSuccess('Subject deleted successfully');
  };

  // Add Chapter
  const handleAddChapter = () => {
    if (!selectedSubject || !chapterForm.title) {
      showError('Please fill all required fields');
      return;
    }

    const newChapter: Chapter = {
      chapterNumber: selectedSubject.chapters.length + 1,
      chapterTitle: chapterForm.title,
      topics: chapterForm.topics,
      learningOutcomes: chapterForm.learningOutcomes.filter(o => o.trim())
    };

    setCurriculum(prev => prev.map(c => {
      if (c.class === selectedClass && c.medium === selectedMedium) {
        return {
          ...c,
          subjects: c.subjects.map(s =>
            s.subjectCode === selectedSubject.subjectCode
              ? { ...s, chapters: [...s.chapters, newChapter] }
              : s
          )
        };
      }
      return c;
    }));

    setChapterForm({ title: '', topics: [], learningOutcomes: [''] });
    setIsAddChapterOpen(false);
    showSuccess('Chapter added successfully');
  };

  // Edit Chapter
  const handleEditChapter = () => {
    if (!selectedSubject || !selectedChapter || !chapterForm.title) {
      showError('Please fill all required fields');
      return;
    }

    setCurriculum(prev => prev.map(c => {
      if (c.class === selectedClass && c.medium === selectedMedium) {
        return {
          ...c,
          subjects: c.subjects.map(s =>
            s.subjectCode === selectedSubject.subjectCode
              ? {
                  ...s,
                  chapters: s.chapters.map(ch =>
                    ch.chapterNumber === selectedChapter.chapterNumber
                      ? {
                          ...ch,
                          chapterTitle: chapterForm.title,
                          topics: chapterForm.topics,
                          learningOutcomes: chapterForm.learningOutcomes.filter(o => o.trim())
                        }
                      : ch
                  )
                }
              : s
          )
        };
      }
      return c;
    }));

    setIsEditChapterOpen(false);
    showSuccess('Chapter updated successfully');
  };

  // Delete Chapter
  const handleDeleteChapter = (chapterNumber: number) => {
    if (!confirm('Are you sure you want to delete this chapter? All topics will be removed.')) {
      return;
    }

    setCurriculum(prev => prev.map(c => {
      if (c.class === selectedClass && c.medium === selectedMedium) {
        return {
          ...c,
          subjects: c.subjects.map(s =>
            s.subjectCode === selectedSubject?.subjectCode
              ? {
                  ...s,
                  chapters: s.chapters
                    .filter(ch => ch.chapterNumber !== chapterNumber)
                    .map((ch, idx) => ({ ...ch, chapterNumber: idx + 1 }))
                }
              : s
          )
        };
      }
      return c;
    }));

    if (selectedChapter?.chapterNumber === chapterNumber) {
      setSelectedChapter(null);
    }

    showSuccess('Chapter deleted successfully');
  };

  // Add Topic to Chapter
  const handleAddTopic = () => {
    if (!topicForm.topic) {
      showError('Please enter a topic name');
      return;
    }

    const newTopic: Topic = {
      topic: topicForm.topic,
      subtopics: topicForm.subtopics.filter(s => s.trim())
    };

    setChapterForm(prev => ({
      ...prev,
      topics: [...prev.topics, newTopic]
    }));

    setTopicForm({ topic: '', subtopics: [''] });
    setIsAddTopicOpen(false);
  };

  // Remove Topic from Chapter Form
  const handleRemoveTopic = (index: number) => {
    setChapterForm(prev => ({
      ...prev,
      topics: prev.topics.filter((_, i) => i !== index)
    }));
  };

  // Helper functions
  const showSuccess = (message: string) => {
    setStatusMessage(message);
    setSaveStatus('success');
    setTimeout(() => setSaveStatus('idle'), 3000);
  };

  const showError = (message: string) => {
    setStatusMessage(message);
    setSaveStatus('error');
    setTimeout(() => setSaveStatus('idle'), 3000);
  };

  const toggleTopic = (index: number) => {
    setExpandedTopics(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Curriculum Editor</h1>
        <p className="text-muted-foreground">Add, edit, and manage subjects, chapters, and topics</p>
      </div>

      {/* Status Alert */}
      {saveStatus === 'success' && (
        <Alert className="bg-green-50 border-green-200">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">{statusMessage}</AlertDescription>
        </Alert>
      )}

      {saveStatus === 'error' && (
        <Alert className="bg-red-50 border-red-200">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">{statusMessage}</AlertDescription>
        </Alert>
      )}

      {/* Class and Medium Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Select Class</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={selectedClass.toString()} onValueChange={(v) => setSelectedClass(parseInt(v))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 12 }, (_, i) => i + 1).map(num => (
                  <SelectItem key={num} value={num.toString()}>
                    Class {num}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Select Medium</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={selectedMedium} onValueChange={(v: 'Tamil' | 'English') => setSelectedMedium(v)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="English">English</SelectItem>
                <SelectItem value="Tamil">Tamil (தமிழ்)</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      </div>

      {/* Subjects Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Subjects</CardTitle>
              <CardDescription>
                Class {selectedClass} - {selectedMedium} Medium ({subjects.length} subjects)
              </CardDescription>
            </div>
            <Button onClick={() => setIsAddSubjectOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Subject
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {subjects.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No subjects added yet</p>
              <Button onClick={() => setIsAddSubjectOpen(true)} variant="outline" className="mt-4">
                <Plus className="h-4 w-4 mr-2" />
                Add First Subject
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {subjects.map((subject) => (
                <Card
                  key={subject.subjectCode}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedSubject?.subjectCode === subject.subjectCode ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => {
                    setSelectedSubject(subject);
                    setSelectedChapter(null);
                  }}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{subject.subjectName}</CardTitle>
                        <Badge variant="secondary" className="mt-2">{subject.subjectCode}</Badge>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedSubject(subject);
                            setSubjectForm({ name: subject.subjectName, code: subject.subjectCode });
                            setIsEditSubjectOpen(true);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteSubject(subject.subjectCode);
                          }}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-muted-foreground">
                      {subject.chapters.length} chapters
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Chapters Section */}
      {selectedSubject && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chapters List */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Chapters</CardTitle>
                  <CardDescription>{selectedSubject.chapters.length} chapters</CardDescription>
                </div>
                <Button
                  size="sm"
                  onClick={() => {
                    setChapterForm({ title: '', topics: [], learningOutcomes: [''] });
                    setIsAddChapterOpen(true);
                  }}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px]">
                {selectedSubject.chapters.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <FileText className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No chapters yet</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {selectedSubject.chapters.map((chapter) => (
                      <Card
                        key={chapter.chapterNumber}
                        className={`cursor-pointer transition-all ${
                          selectedChapter?.chapterNumber === chapter.chapterNumber ? 'ring-2 ring-primary' : ''
                        }`}
                        onClick={() => setSelectedChapter(chapter)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-sm">
                                {chapter.chapterNumber}. {chapter.chapterTitle}
                              </div>
                              <div className="text-xs text-muted-foreground mt-1">
                                {chapter.topics.length} topics
                              </div>
                            </div>
                            <div className="flex gap-1">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedChapter(chapter);
                                  setChapterForm({
                                    title: chapter.chapterTitle,
                                    topics: chapter.topics,
                                    learningOutcomes: chapter.learningOutcomes.length > 0 
                                      ? chapter.learningOutcomes 
                                      : ['']
                                  });
                                  setIsEditChapterOpen(true);
                                }}
                              >
                                <Edit className="h-3 w-3" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteChapter(chapter.chapterNumber);
                                }}
                              >
                                <Trash2 className="h-3 w-3 text-red-500" />
                              </Button>
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

          {/* Chapter Details */}
          {selectedChapter && (
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>{selectedChapter.chapterTitle}</CardTitle>
                <CardDescription>Chapter {selectedChapter.chapterNumber}</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[500px]">
                  <div className="space-y-6">
                    {/* Topics */}
                    <div>
                      <h3 className="font-semibold mb-3 flex items-center gap-2">
                        <List className="h-4 w-4" />
                        Topics ({selectedChapter.topics.length})
                      </h3>
                      {selectedChapter.topics.length === 0 ? (
                        <p className="text-sm text-muted-foreground">No topics added</p>
                      ) : (
                        <div className="space-y-2">
                          {selectedChapter.topics.map((topic, idx) => (
                            <Card key={idx}>
                              <CardContent className="p-3">
                                <div
                                  className="flex items-center gap-2 cursor-pointer"
                                  onClick={() => toggleTopic(idx)}
                                >
                                  {expandedTopics.has(idx) ? (
                                    <ChevronDown className="h-4 w-4" />
                                  ) : (
                                    <ChevronRight className="h-4 w-4" />
                                  )}
                                  <span className="font-medium text-sm">{topic.topic}</span>
                                  <Badge variant="outline" className="ml-auto text-xs">
                                    {topic.subtopics.length} subtopics
                                  </Badge>
                                </div>
                                {expandedTopics.has(idx) && topic.subtopics.length > 0 && (
                                  <ul className="mt-2 ml-6 space-y-1">
                                    {topic.subtopics.map((subtopic, subIdx) => (
                                      <li key={subIdx} className="text-sm text-muted-foreground">
                                        • {subtopic}
                                      </li>
                                    ))}
                                  </ul>
                                )}
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Learning Outcomes */}
                    <div>
                      <h3 className="font-semibold mb-3">Learning Outcomes</h3>
                      {selectedChapter.learningOutcomes.length === 0 ? (
                        <p className="text-sm text-muted-foreground">No learning outcomes defined</p>
                      ) : (
                        <ul className="space-y-2">
                          {selectedChapter.learningOutcomes.map((outcome, idx) => (
                            <li key={idx} className="text-sm flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span>{outcome}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Add Subject Dialog */}
      <Dialog open={isAddSubjectOpen} onOpenChange={setIsAddSubjectOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Subject</DialogTitle>
            <DialogDescription>
              Add a new subject to Class {selectedClass} - {selectedMedium} Medium
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="subjectName">Subject Name *</Label>
              <Input
                id="subjectName"
                placeholder="e.g., Mathematics, தமிழ்"
                value={subjectForm.name}
                onChange={(e) => setSubjectForm({ ...subjectForm, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subjectCode">Subject Code *</Label>
              <Input
                id="subjectCode"
                placeholder="e.g., MATH-1, TAM-1"
                value={subjectForm.code}
                onChange={(e) => setSubjectForm({ ...subjectForm, code: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddSubjectOpen(false)}>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button onClick={handleAddSubject}>
              <Plus className="h-4 w-4 mr-2" />
              Add Subject
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Subject Dialog */}
      <Dialog open={isEditSubjectOpen} onOpenChange={setIsEditSubjectOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Subject</DialogTitle>
            <DialogDescription>Update subject information</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="editSubjectName">Subject Name *</Label>
              <Input
                id="editSubjectName"
                value={subjectForm.name}
                onChange={(e) => setSubjectForm({ ...subjectForm, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="editSubjectCode">Subject Code *</Label>
              <Input
                id="editSubjectCode"
                value={subjectForm.code}
                onChange={(e) => setSubjectForm({ ...subjectForm, code: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditSubjectOpen(false)}>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button onClick={handleEditSubject}>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Chapter Dialog */}
      <Dialog open={isAddChapterOpen} onOpenChange={setIsAddChapterOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Chapter</DialogTitle>
            <DialogDescription>
              Add a new chapter to {selectedSubject?.subjectName}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="chapterTitle">Chapter Title *</Label>
              <Input
                id="chapterTitle"
                placeholder="e.g., Introduction to Algebra"
                value={chapterForm.title}
                onChange={(e) => setChapterForm({ ...chapterForm, title: e.target.value })}
              />
            </div>

            {/* Topics */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Topics</Label>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setIsAddTopicOpen(true)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Topic
                </Button>
              </div>
              {chapterForm.topics.length === 0 ? (
                <p className="text-sm text-muted-foreground">No topics added yet</p>
              ) : (
                <div className="space-y-2">
                  {chapterForm.topics.map((topic, idx) => (
                    <Card key={idx}>
                      <CardContent className="p-3 flex items-start justify-between">
                        <div className="flex-1">
                          <div className="font-medium text-sm">{topic.topic}</div>
                          {topic.subtopics.length > 0 && (
                            <div className="text-xs text-muted-foreground mt-1">
                              {topic.subtopics.length} subtopics
                            </div>
                          )}
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleRemoveTopic(idx)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>

            {/* Learning Outcomes */}
            <div className="space-y-2">
              <Label>Learning Outcomes</Label>
              {chapterForm.learningOutcomes.map((outcome, idx) => (
                <div key={idx} className="flex gap-2">
                  <Input
                    placeholder="e.g., Students will be able to..."
                    value={outcome}
                    onChange={(e) => {
                      const newOutcomes = [...chapterForm.learningOutcomes];
                      newOutcomes[idx] = e.target.value;
                      setChapterForm({ ...chapterForm, learningOutcomes: newOutcomes });
                    }}
                  />
                  {idx === chapterForm.learningOutcomes.length - 1 ? (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        setChapterForm({
                          ...chapterForm,
                          learningOutcomes: [...chapterForm.learningOutcomes, '']
                        })
                      }
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        setChapterForm({
                          ...chapterForm,
                          learningOutcomes: chapterForm.learningOutcomes.filter((_, i) => i !== idx)
                        })
                      }
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddChapterOpen(false)}>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button onClick={handleAddChapter}>
              <Plus className="h-4 w-4 mr-2" />
              Add Chapter
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Chapter Dialog */}
      <Dialog open={isEditChapterOpen} onOpenChange={setIsEditChapterOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Chapter</DialogTitle>
            <DialogDescription>Update chapter information</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="editChapterTitle">Chapter Title *</Label>
              <Input
                id="editChapterTitle"
                value={chapterForm.title}
                onChange={(e) => setChapterForm({ ...chapterForm, title: e.target.value })}
              />
            </div>

            {/* Topics */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Topics</Label>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setIsAddTopicOpen(true)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Topic
                </Button>
              </div>
              {chapterForm.topics.length === 0 ? (
                <p className="text-sm text-muted-foreground">No topics added yet</p>
              ) : (
                <div className="space-y-2">
                  {chapterForm.topics.map((topic, idx) => (
                    <Card key={idx}>
                      <CardContent className="p-3 flex items-start justify-between">
                        <div className="flex-1">
                          <div className="font-medium text-sm">{topic.topic}</div>
                          {topic.subtopics.length > 0 && (
                            <div className="text-xs text-muted-foreground mt-1">
                              {topic.subtopics.length} subtopics
                            </div>
                          )}
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleRemoveTopic(idx)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>

            {/* Learning Outcomes */}
            <div className="space-y-2">
              <Label>Learning Outcomes</Label>
              {chapterForm.learningOutcomes.map((outcome, idx) => (
                <div key={idx} className="flex gap-2">
                  <Input
                    placeholder="e.g., Students will be able to..."
                    value={outcome}
                    onChange={(e) => {
                      const newOutcomes = [...chapterForm.learningOutcomes];
                      newOutcomes[idx] = e.target.value;
                      setChapterForm({ ...chapterForm, learningOutcomes: newOutcomes });
                    }}
                  />
                  {idx === chapterForm.learningOutcomes.length - 1 ? (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        setChapterForm({
                          ...chapterForm,
                          learningOutcomes: [...chapterForm.learningOutcomes, '']
                        })
                      }
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        setChapterForm({
                          ...chapterForm,
                          learningOutcomes: chapterForm.learningOutcomes.filter((_, i) => i !== idx)
                        })
                      }
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditChapterOpen(false)}>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button onClick={handleEditChapter}>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Topic Dialog */}
      <Dialog open={isAddTopicOpen} onOpenChange={setIsAddTopicOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Topic</DialogTitle>
            <DialogDescription>Add a new topic with subtopics</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="topicName">Topic Name *</Label>
              <Input
                id="topicName"
                placeholder="e.g., Linear Equations"
                value={topicForm.topic}
                onChange={(e) => setTopicForm({ ...topicForm, topic: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>Subtopics</Label>
              {topicForm.subtopics.map((subtopic, idx) => (
                <div key={idx} className="flex gap-2">
                  <Input
                    placeholder="e.g., Solving equations"
                    value={subtopic}
                    onChange={(e) => {
                      const newSubtopics = [...topicForm.subtopics];
                      newSubtopics[idx] = e.target.value;
                      setTopicForm({ ...topicForm, subtopics: newSubtopics });
                    }}
                  />
                  {idx === topicForm.subtopics.length - 1 ? (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        setTopicForm({
                          ...topicForm,
                          subtopics: [...topicForm.subtopics, '']
                        })
                      }
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        setTopicForm({
                          ...topicForm,
                          subtopics: topicForm.subtopics.filter((_, i) => i !== idx)
                        })
                      }
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddTopicOpen(false)}>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button onClick={handleAddTopic}>
              <Plus className="h-4 w-4 mr-2" />
              Add Topic
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
