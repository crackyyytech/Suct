"use client";

import { useState } from "react";
import Link from "next/link";
import { User, KeyRound, Eye, EyeOff, ShieldAlert } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { teacherCredentials } from "@/lib/demo-data";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

export function TeacherLoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const credential = teacherCredentials.find(c => c.id === id && c.password === password);

    if (credential) {
      if (typeof window !== "undefined") {
        localStorage.setItem("userRole", "teacher");
        localStorage.setItem("teacherId", credential.id);
        localStorage.setItem("teacherData", JSON.stringify({
          id: credential.id,
          name: "Demo Teacher",
          subjects: ["Mathematics", "Science"],
          classes: ["Class 1", "Class 2", "Class 3"]
        }));
      }
      router.push("/dashboard/teacher");
    } else {
      setError("Invalid ID or password. Try: teacher01 / Teach@123");
    }
  };

  return (
    <div className="w-full max-w-sm text-center">
        <h1 className="text-4xl font-bold font-headline mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400">EduConnect</h1>
        <p className="text-muted-foreground mb-8">
            Teacher Portal
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
                <Label htmlFor="teacher-id">Teacher ID</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="teacher-id"
                    placeholder="Your Teacher ID"
                    className="pl-10 text-base bg-transparent focus:bg-background/50"
                    required
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex flex-col space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                </div>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-10 pr-12 text-base bg-transparent focus:bg-background/50"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 text-muted-foreground hover:bg-transparent hover:text-foreground"
                    onClick={togglePasswordVisibility}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </Button>
                </div>
              </div>
              <Button className="w-full mt-4" type="submit">
                Login
              </Button>
            </div>
        </form>
        <div className="mt-6 text-sm text-muted-foreground">
            Not a teacher?{" "}
            <Link href="/" className="font-medium text-primary hover:underline">
              Select your role
            </Link>
        </div>
    </div>
  );
}
