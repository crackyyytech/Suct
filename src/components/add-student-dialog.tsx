
"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserPlus, Loader2, ClipboardCopy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { type StudentProfile } from "@/lib/demo-data";

export function AddStudentDialog({ classes, onStudentAdded, currentStudents }: { classes: string[]; onStudentAdded: (student: StudentProfile) => void; currentStudents: StudentProfile[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [generatedCredentials, setGeneratedCredentials] = useState<{studentId: string, password: string} | null>(null);
  const { toast } = useToast();

  const handleCopyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: `${field} Copied!`,
      description: `${field} has been copied to your clipboard.`,
    });
  };

  const generateStudentId = (className: string) => {
    if (!className) return "";
    const classNumber = className.match(/\d+/)?.[0] || '1';
    const studentsInClass = currentStudents.filter(s => s.class === className);
    const nextStudentNumber = studentsInClass.length + 1;
    const paddedStudentNumber = nextStudentNumber.toString().padStart(2, '0');
    return `c${classNumber}stu${paddedStudentNumber}`;
  };

  const generatePassword = () => {
    const randomPart = Math.floor(100 + Math.random() * 900); // 3-digit number
    return `Stu@${randomPart}`;
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const studentClass = formData.get("class") as string;
    
    // Simulate API call and generation
    setTimeout(() => {
      const studentId = generateStudentId(studentClass);
      const password = generatePassword();
      
      const newStudent: StudentProfile = {
        id: `demo-student-${Date.now()}`,
        name,
        email,
        studentId,
        class: studentClass,
        password,
        overallProgress: 0,
        lastActive: new Date().toISOString(),
      };

      onStudentAdded(newStudent);
      setGeneratedCredentials({ studentId, password });
      setIsLoading(false);
      toast({
        title: "Student Added Successfully!",
        description: `Credentials for ${name} have been generated.`,
      });
    }, 1000);
  };
  
  const handleOpenChange = (open: boolean) => {
      setIsOpen(open);
      if (!open) {
          // Reset state when dialog is closed
          setTimeout(() => {
            setGeneratedCredentials(null);
            setIsLoading(false);
          }, 300);
      }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <UserPlus className="mr-2" />
          Add Student
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
                {generatedCredentials ? 'Credentials Generated' : 'Add New Student'}
            </DialogTitle>
            <DialogDescription>
                {generatedCredentials 
                    ? 'Please save these credentials. This is the only time they will be shown.'
                    : "Enter the student's details. Their login ID and an initial password will be generated automatically."
                }
            </DialogDescription>
          </DialogHeader>

          {!generatedCredentials ? (
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input id="name" name="name" className="col-span-3" required />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input id="email" name="email" type="email" className="col-span-3" required />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="class" className="text-right">
                    Class
                  </Label>
                  <Select name="class" required>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select a class" />
                    </SelectTrigger>
                    <SelectContent>
                      {classes.map((c) => (
                        <SelectItem key={c} value={c}>{c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => handleOpenChange(false)}>Cancel</Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isLoading ? 'Generating...' : 'Add and Generate'}
                </Button>
              </DialogFooter>
            </form>
          ) : (
            <div>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                    <Label htmlFor="generated-id">Student ID</Label>
                    <div className="flex items-center gap-2">
                        <Input id="generated-id" readOnly value={generatedCredentials.studentId} className="font-mono"/>
                        <Button variant="outline" size="icon" onClick={() => handleCopyToClipboard(generatedCredentials.studentId, 'Student ID')}>
                            <ClipboardCopy className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="generated-password">Initial Password</Label>
                    <div className="flex items-center gap-2">
                        <Input id="generated-password" readOnly value={generatedCredentials.password} className="font-mono"/>
                        <Button variant="outline" size="icon" onClick={() => handleCopyToClipboard(generatedCredentials.password, 'Password')}>
                            <ClipboardCopy className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={() => handleOpenChange(false)}>Close</Button>
              </DialogFooter>
            </div>
          )}
      </DialogContent>
    </Dialog>
  );
}
