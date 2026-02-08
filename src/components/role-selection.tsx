"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { GraduationCap, Cog, BookUser } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

const roles = [
  {
    name: "Student",
    icon: GraduationCap,
  },
  {
    name: "Teacher",
    icon: BookUser,
  },
  {
    name: "Admin",
    icon: Cog,
  },
];

export function RoleSelection() {
  const [selectedRole, setSelectedRole] = useState<string>("Student");
  const router = useRouter();

  const handleContinue = () => {
    router.push(`/login/${selectedRole.toLowerCase()}`);
  };

  return (
    <div className="w-full max-w-4xl text-center">
      <h1 className="text-5xl font-bold font-headline mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400">
        Welcome to EduConnect
      </h1>
      <p className="text-lg text-muted-foreground mb-12">
        The all-in-one platform for modern education. Please select your role to begin.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {roles.map((role) => {
          const isSelected = selectedRole === role.name;
          const Icon = role.icon;
          return (
            <div
              key={role.name}
              onClick={() => setSelectedRole(role.name)}
              className={cn(
                "relative rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 bg-card/60 dark:bg-card/30 backdrop-blur-sm border-2 h-48",
                isSelected
                  ? "border-primary/80 shadow-2xl shadow-primary/20"
                  : "border-border/20 hover:border-primary/50"
              )}
            >
              <div className="p-4 bg-primary/10 rounded-full mb-4">
                <Icon
                  className={cn(
                    "w-10 h-10 transition-colors",
                    isSelected ? "text-primary" : "text-muted-foreground"
                  )}
                />
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                {role.name}
              </h3>
            </div>
          );
        })}
      </div>
      <Button 
        onClick={handleContinue} 
        className="w-full max-w-sm mx-auto mt-12 font-bold" 
        size="lg" 
        disabled={!selectedRole}
      >
        Continue as {selectedRole}
      </Button>
    </div>
  );
}
