
"use client";

import { useState } from "react";
import Link from "next/link";
import { User, KeyRound, Eye, EyeOff, ShieldAlert, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertTitle, AlertDescription } from "./ui/alert";
import { useToast } from "@/hooks/use-toast";
import { students, type StudentProfile } from "@/lib/demo-data";


export function StudentLoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();
  const { toast } = useToast();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
        // Mock authentication for demo - find student in demo data
        const student = students.find(s => s.studentId === id && s.password === password);
        
        if (student) {
            toast({
              title: "Login Successful",
              description: "Welcome back! Redirecting to your dashboard...",
            });
            if (typeof window !== "undefined") {
              localStorage.setItem("userRole", "student");
              localStorage.setItem("studentId", student.id);
              localStorage.setItem("studentData", JSON.stringify(student));
            }
            router.push("/dashboard/student");
        } else {
            setError("Invalid Student ID or Password. Please check demo credentials.");
        }
    } catch (error: any) {
        console.error(error);
        setError("An unexpected error occurred. Please try again.");
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm text-center">
      <h1 className="text-4xl font-bold font-headline mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400">EduConnect</h1>
      <p className="text-muted-foreground mb-8">
        Welcome back! Please enter your details.
      </p>
      <form onSubmit={handleLogin} className="text-left">
        <div className="space-y-6 rounded-xl bg-card/60 dark:bg-card/30 backdrop-blur-sm border border-border/20 p-8">
            {error && (
                <Alert variant="destructive">
                    <ShieldAlert className="h-4 w-4" />
                    <AlertTitle>Login Failed</AlertTitle>
                    <AlertDescription>
                    {error}
                    </AlertDescription>
                </Alert>
            )}
            <div className="flex flex-col space-y-1.5">
                <Label htmlFor="student-id">Student ID</Label>
                <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input 
                        id="student-id" 
                        placeholder="e.g. c1stu01" 
                        className="pl-10 bg-transparent focus:bg-background/50" 
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        required
                        disabled={isLoading}
                    />
                </div>
            </div>
            
            <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                    <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        id="password"
                        className="pl-10 pr-12 bg-transparent focus:bg-background/50"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        disabled={isLoading}
                    />
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 text-muted-foreground hover:bg-transparent hover:text-foreground"
                        onClick={togglePasswordVisibility}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </Button>
                </div>
            </div>

            <Button
              type="submit"
              className="w-full mt-4"
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? "Please wait" : "Login"}
            </Button>
        </div>
      </form>
      <div className="mt-4 text-sm text-muted-foreground">
            Not a student?{" "}
            <Link href="/" className="font-medium text-primary hover:underline">
              Select your role
            </Link>
        </div>
    </div>
  );
}
