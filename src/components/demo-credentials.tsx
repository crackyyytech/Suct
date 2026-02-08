"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Copy, User, Key } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export function DemoCredentials() {
  const { toast } = useToast();

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${type} copied to clipboard`,
    });
  };

  const credentials = [
    {
      role: "Student",
      accounts: [
        { id: "c1stu01", password: "Stu@101", name: "Arjun Verma", class: "Class 1" },
        { id: "c2stu01", password: "Stu@102", name: "Priya Sharma", class: "Class 2" },
        { id: "c10stu01", password: "Stu@110", name: "Diya Reddy", class: "Class 10" },
      ]
    },
    {
      role: "Teacher",
      accounts: [
        { id: "teacher01", password: "Teach@123", name: "Demo Teacher" },
      ]
    },
    {
      role: "Admin",
      accounts: [
        { id: "admin", password: "Admin@123", name: "Demo Admin" },
      ]
    }
  ];

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Key className="h-5 w-5" />
          Demo Credentials
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {credentials.map((roleGroup) => (
          <div key={roleGroup.role} className="space-y-2">
            <Badge variant="outline" className="mb-2">{roleGroup.role}</Badge>
            {roleGroup.accounts.map((account, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="font-medium">{account.name}</div>
                    <div className="text-sm text-muted-foreground">
                      ID: {account.id} | Pass: {account.password}
                      {'class' in account && ` | ${account.class}`}
                    </div>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(account.id, "ID")}
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(account.password, "Password")}
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}