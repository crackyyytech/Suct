"use client";

import { useState } from "react";
import Link from "next/link";
import { User, KeyRound, Eye, EyeOff } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const role = searchParams.get("role");
    router.push(role ? `/dashboard/${role}` : "/dashboard");
  };

  return (
    <div className="w-full max-w-sm">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold font-headline">EduConnect</CardTitle>
          <CardDescription>
            Sign in to your account to continue.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleLogin}
          >
            <div className="grid w-full items-center gap-6">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="school-id">School ID</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="school-id"
                    placeholder="Your School ID"
                    className="pl-10 text-base"
                    required
                    defaultValue="demo-user"
                  />
                </div>
              </div>
              <div className="flex flex-col space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="#"
                    className="text-sm font-medium text-primary hover:underline"
                    tabIndex={-1}
                  >
                    Forgot Password?
                  </Link>
                </div>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-10 pr-12 text-base"
                    required
                    defaultValue="password"
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
        </CardContent>
        <CardFooter className="flex flex-col items-center gap-2 pt-2">
          <div className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/" className="font-medium text-primary hover:underline">
              Select your role
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
