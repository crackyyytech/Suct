
"use client";

import { useState, useMemo, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { curriculumData } from "@/lib/curriculum-data";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { BookCopy, BrainCircuit, Star } from "lucide-react";

export default function SubjectsPage() {
  const mediums = useMemo(() => [...new Set(curriculumData.map(c => c.medium))], []);
  
  const [selectedMedium, setSelectedMedium] = useState<string>(mediums[0] || "");
  const [selectedClass, setSelectedClass] = useState<string>("Class 1");
  const [selectedStream, setSelectedStream] = useState<string>("Science");
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null);

  const availableClasses = useMemo(() => {
    const classes = [...new Set(curriculumData.filter(c => c.medium === selectedMedium).map(c => c.class))];
    // Custom sort for classes like "Class 1", "Class 10"
    return classes.sort((a, b) => {
        const numA = parseInt(a.split(' ')[1]);
        const numB = parseInt(b.split(' ')[1]);
        return numA - numB;
    });
  }, [selectedMedium]);
  
  const availableStreams = useMemo(() => {
    return [...new Set(curriculumData.filter(c => c.class === selectedClass && c.medium === selectedMedium).map(c => c.stream).filter(Boolean))] as string[];
  }, [selectedClass, selectedMedium]);

  const courseCollection = useMemo(() => {
      return curriculumData.find(c => 
          c.medium === selectedMedium && 
          c.class === selectedClass &&
          (availableStreams.length > 0 ? c.stream === selectedStream : true)
      );
  }, [selectedMedium, selectedClass, selectedStream, availableStreams]);

  const subjects = useMemo(() => courseCollection?.subjects || [], [courseCollection]);
  const selectedSubject = useMemo(() => {
    if (!selectedSubjectId) return null;
    return subjects.find(s => s.course_id === selectedSubjectId) || null;
  }, [subjects, selectedSubjectId]);

  const handleMediumChange = (medium: string) => {
    setSelectedMedium(medium);
    const firstClass = [...new Set(curriculumData.filter(c => c.medium === medium).map(c => c.class))].sort((a, b) => parseInt(a.split(' ')[1]) - parseInt(b.split(' ')[1]))[0];
    setSelectedClass(firstClass);
    setSelectedSubjectId(null);
  };
  
  const handleClassChange = (className: string) => {
      setSelectedClass(className);
      setSelectedSubjectId(null);
      const newStreams = [...new Set(curriculumData.filter(c => c.class === className && c.medium === selectedMedium).map(c => c.stream).filter(Boolean))] as string[];
      if(newStreams.length > 0) {
        setSelectedStream(newStreams[0]);
      }
  }

  const handleSubjectChange = (subjectId: string) => {
    setSelectedSubjectId(subjectId);
  }

  // Effect to select the first subject when filters change
  useEffect(() => {
    if (subjects.length > 0) {
        if (!selectedSubjectId || !subjects.some(s => s.course_id === selectedSubjectId)) {
            setSelectedSubjectId(subjects[0].course_id);
        }
    } else {
        setSelectedSubjectId(null);
    }
  }, [subjects, selectedSubjectId]);


  return (
    <main className="p-6">
      <div className="flex items-center gap-4 mb-6">
        <BookCopy className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">Curriculum Viewer</h1>
          <p className="text-muted-foreground">Browse the generated curriculum content.</p>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Content Structure</CardTitle>
          <CardDescription>Browse classes, subjects, and chapters.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="medium-select">Medium</Label>
              <Select onValueChange={handleMediumChange} value={selectedMedium} name="medium-select">
                <SelectTrigger><SelectValue placeholder="Select a medium" /></SelectTrigger>
                <SelectContent>
                  {mediums.map((m) => (<SelectItem key={m} value={m}>{m}</SelectItem>))}
                </SelectContent>
              </Select>
            </div>
             <div className="space-y-2">
              <Label htmlFor="class-select">Class</Label>
              <Select onValueChange={handleClassChange} value={selectedClass} name="class-select">
                <SelectTrigger><SelectValue placeholder="Select a class" /></SelectTrigger>
                <SelectContent>
                  {availableClasses.map((c) => (<SelectItem key={c} value={c}>{c}</SelectItem>))}
                </SelectContent>
              </Select>
            </div>
            {availableStreams.length > 0 && (
                <div className="space-y-2">
                    <Label htmlFor="stream-select">Stream</Label>
                    <Select onValueChange={setSelectedStream} value={selectedStream} name="stream-select">
                        <SelectTrigger><SelectValue placeholder="Select a stream" /></SelectTrigger>
                        <SelectContent>
                        {availableStreams.map((s) => (<SelectItem key={s} value={s}>{s}</SelectItem>))}
                        </SelectContent>
                    </Select>
                </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="subject-select">Subject</Label>
              <Select onValueChange={handleSubjectChange} value={selectedSubjectId ?? ""} name="subject-select" disabled={subjects.length === 0}>
                <SelectTrigger><SelectValue placeholder="Select a subject" /></SelectTrigger>
                <SelectContent>
                  {subjects.map((s) => (<SelectItem key={s.course_id} value={s.course_id}>{s.subject_name}</SelectItem>))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {selectedSubject && (
            <div className="mt-6 pt-6 border-t">
              <div className="mb-6">
                <h3 className="text-2xl font-bold">{selectedSubject.subject_name}</h3>
                <p className="text-muted-foreground mt-1 max-w-prose">{selectedSubject.overview}</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  <Badge variant="secondary">{selectedSubject.difficulty_level}</Badge>
                  <Badge variant="outline">Recommended Age: {selectedSubject.recommended_age}</Badge>
                  <Badge variant="outline">Board: {courseCollection?.board}</Badge>
                </div>
              </div>

              <Accordion type="single" collapsible className="w-full" defaultValue={selectedSubject.chapters.sort((a,b) => a.chapter_order - b.chapter_order)[0]?.chapter_id}>
                {selectedSubject.chapters.length > 0 ? (
                  selectedSubject.chapters
                    .sort((a, b) => a.chapter_order - b.chapter_order)
                    .map((chapter) => (
                      <AccordionItem value={chapter.chapter_id} key={chapter.chapter_id}>
                        <AccordionTrigger>
                          <div className="flex items-center gap-3 text-left">
                            <span className="text-primary font-bold">{chapter.chapter_order}.</span>
                            <span className="font-semibold text-lg">{chapter.chapter_title}</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                           <div className="flex flex-col gap-4 p-4 rounded-md bg-muted/50 border">
                               <p className="text-muted-foreground">{chapter.summary}</p>
                               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                   <div>
                                       <h4 className="font-semibold flex items-center gap-2 mb-2"><Star className="w-4 h-4 text-yellow-500" /> Key Topics</h4>
                                       <ul className="list-disc list-inside text-muted-foreground text-sm space-y-1">
                                            {chapter.key_topics.map(topic => <li key={topic}>{topic}</li>)}
                                       </ul>
                                   </div>
                                    <div>
                                       <h4 className="font-semibold flex items-center gap-2 mb-2"><BrainCircuit className="w-4 h-4 text-blue-500" /> Learning Outcomes</h4>
                                       <ul className="list-disc list-inside text-muted-foreground text-sm space-y-1">
                                            {chapter.learning_outcomes.map(outcome => <li key={outcome}>{outcome}</li>)}
                                       </ul>
                                   </div>
                               </div>
                            </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))
                ) : (
                  <p className="text-muted-foreground text-center py-8">No chapters found for this subject.</p>
                )}
              </Accordion>
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
