
"use client";

import { useState, useMemo } from "react";
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

// Combine types for flexibility
export type NewUser = {
  id: string;
  name: string;
  email: string;
  role: 'Student' | 'Teacher';
  studentId: string; // Used for student ID or teacher ID
  class: string; // N/A for teachers
  overallProgress: number;
  lastActive: string;
  password?: string;
};


export function AddUserDialog({ 
    classes, 
    onUserAdded, 
    currentUsers 
}: { 
    classes: string[]; 
    onUserAdded: (user: NewUser) => void; 
    currentUsers: NewUser[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [generatedCredentials, setGeneratedCredentials] = useState<{loginId: string, password: string} | null>(null);
  const [role, setRole] = useState<'Student' | 'Teacher' | ''>('');
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
    const studentsInClass = currentUsers.filter(u => u.role === 'Student' && u.class === className);
    const nextStudentNumber = studentsInClass.length + 1;
    const paddedStudentNumber = nextStudentNumber.toString().padStart(2, '0');
    return `c${classNumber}stu${paddedStudentNumber}`;
  };
  
  const generateTeacherId = () => {
    const teachers = currentUsers.filter(u => u.role === 'Teacher');
    const nextTeacherNumber = teachers.length + 1;
    return `teacher${nextTeacherNumber.toString().padStart(2, '0')}`;
  }

  const generatePassword = (role: 'Student' | 'Teacher') => {
    const randomPart = Math.floor(100 + Math.random() * 900);
    return role === 'Student' ? `Stu@${randomPart}` : `Teach@${randomPart}`;
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!role) {
        toast({
            variant: 'destructive',
            title: 'Missing Information',
            description: 'Please select a role.',
        });
        return;
    }
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    
    setTimeout(() => {
      let newUser: NewUser;
      if (role === 'Student') {
          const studentClass = formData.get("class") as string;
          const studentId = generateStudentId(studentClass);
          const password = generatePassword('Student');
          newUser = {
            id: `demo-user-${Date.now()}`,
            name,
            email,
            studentId,
            class: studentClass,
            role: 'Student',
            password,
            overallProgress: 0,
            lastActive: new Date().toISOString(),
          };
          setGeneratedCredentials({ loginId: studentId, password });
      } else { // Teacher
          const teacherId = generateTeacherId();
          const password = generatePassword('Teacher');
          newUser = {
            id: `demo-user-${Date.now()}`,
            name,
            email,
            studentId: teacherId, // use studentId field for teacher id
            class: 'N/A',
            role: 'Teacher',
            password,
            overallProgress: 0,
            lastActive: new Date().toISOString(),
          };
          setGeneratedCredentials({ loginId: teacherId, password });
      }

      onUserAdded(newUser);
      setIsLoading(false);
      toast({
        title: "User Added Successfully!",
        description: `Credentials for ${name} have been generated.`,
      });
    }, 1000);
  };
  
  const handleOpenChange = (open: boolean) => {
      setIsOpen(open);
      if (!open) {
          setTimeout(() => {
            setGeneratedCredentials(null);
            setIsLoading(false);
            setRole('');
          }, 300);
      }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <UserPlus className="mr-2" />
          Add User
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
                {generatedCredentials ? 'Credentials Generated' : 'Add New User'}
            </DialogTitle>
            <DialogDescription>
                {generatedCredentials 
                    ? 'Please save these credentials. This is the only time they will be shown.'
                    : "Select a role and enter the user's details. Login credentials will be generated automatically."
                }
            </DialogDescription>
          </DialogHeader>

          {!generatedCredentials ? (
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="role" className="text-right">Role</Label>
                  <Select name="role" required onValueChange={(value) => setRole(value as 'Student' | 'Teacher')}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Student">Student</SelectItem>
                      <SelectItem value="Teacher">Teacher</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {role && (
                    <>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">Name</Label>
                            <Input id="name" name="name" className="col-span-3" required />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="email" className="text-right">Email</Label>
                            <Input id="email" name="email" type="email" className="col-span-3" required />
                        </div>
                        {role === 'Student' && (
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="class" className="text-right">Class</Label>
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
                        )}
                    </>
                )}
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => handleOpenChange(false)}>Cancel</Button>
                <Button type="submit" disabled={isLoading || !role}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isLoading ? 'Generating...' : 'Add and Generate'}
                </Button>
              </DialogFooter>
            </form>
          ) : (
            <div>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                    <Label htmlFor="generated-id">{role} ID</Label>
                    <div className="flex items-center gap-2">
                        <Input id="generated-id" readOnly value={generatedCredentials.loginId} className="font-mono"/>
                        <Button variant="outline" size="icon" onClick={() => handleCopyToClipboard(generatedCredentials.loginId, `${role} ID`)}>
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
