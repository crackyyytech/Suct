"use client";

import { Trophy, Medal, Award, TrendingUp, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { students } from "@/lib/demo-data";
import { getAvatarColor } from "@/lib/utils";

// Mock leaderboard data
const generateLeaderboardData = () => {
  return students
    .map(student => ({
      ...student,
      totalPoints: Math.floor(Math.random() * 1000) + 500,
      weeklyPoints: Math.floor(Math.random() * 200) + 50,
      streak: Math.floor(Math.random() * 30) + 1,
      completedCourses: Math.floor(Math.random() * 5) + 1,
      rank: 0
    }))
    .sort((a, b) => b.totalPoints - a.totalPoints)
    .map((student, index) => ({ ...student, rank: index + 1 }));
};

const leaderboardData = generateLeaderboardData();

const getRankIcon = (rank: number) => {
  switch (rank) {
    case 1:
      return <Trophy className="h-6 w-6 text-yellow-500" />;
    case 2:
      return <Medal className="h-6 w-6 text-gray-400" />;
    case 3:
      return <Award className="h-6 w-6 text-amber-600" />;
    default:
      return <span className="text-lg font-bold text-muted-foreground">#{rank}</span>;
  }
};

const LeaderboardItem = ({ student, showClass = false }: { student: any; showClass?: boolean }) => {
  const isCurrentUser = typeof window !== "undefined" && 
    localStorage.getItem('studentId') === student.id;

  return (
    <div className={`flex items-center gap-4 p-4 rounded-lg border ${
      isCurrentUser ? 'bg-primary/5 border-primary/20' : 'bg-card'
    }`}>
      <div className="flex-shrink-0 w-12 flex justify-center">
        {getRankIcon(student.rank)}
      </div>
      
      <Avatar className="h-10 w-10">
        <AvatarFallback className={getAvatarColor(student.name)}>
          <User className="h-5 w-5" />
        </AvatarFallback>
      </Avatar>
      
      <div className="flex-grow">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold">{student.name}</h3>
          {isCurrentUser && <Badge variant="secondary">You</Badge>}
        </div>
        <p className="text-sm text-muted-foreground">
          {showClass ? student.class : `${student.completedCourses} courses completed`}
        </p>
      </div>
      
      <div className="text-right">
        <div className="font-bold text-lg">{student.totalPoints}</div>
        <div className="text-sm text-muted-foreground">points</div>
      </div>
      
      <div className="text-right">
        <div className="flex items-center gap-1 text-orange-500">
          <TrendingUp className="h-4 w-4" />
          <span className="font-semibold">{student.streak}</span>
        </div>
        <div className="text-sm text-muted-foreground">day streak</div>
      </div>
    </div>
  );
};

export default function LeaderboardPage() {
  const currentStudent = typeof window !== "undefined" ? 
    leaderboardData.find(s => s.id === localStorage.getItem('studentId')) : null;

  const weeklyLeaderboard = [...leaderboardData]
    .sort((a, b) => b.weeklyPoints - a.weeklyPoints)
    .map((student, index) => ({ ...student, rank: index + 1 }));

  return (
    <main className="p-4 md:p-6 lg:p-8 max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Trophy className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">Leaderboard</h1>
          <p className="text-muted-foreground">See how you rank against other students</p>
        </div>
      </div>

      {/* Current User Stats */}
      {currentStudent && (
        <Card className="mb-6 bg-gradient-to-r from-primary/5 to-blue-500/5 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Your Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">#{currentStudent.rank}</div>
                <div className="text-sm text-muted-foreground">Overall Rank</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{currentStudent.totalPoints}</div>
                <div className="text-sm text-muted-foreground">Total Points</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-500">{currentStudent.streak}</div>
                <div className="text-sm text-muted-foreground">Day Streak</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-500">{currentStudent.completedCourses}</div>
                <div className="text-sm text-muted-foreground">Courses Done</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="overall" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="overall">Overall Rankings</TabsTrigger>
          <TabsTrigger value="weekly">This Week</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overall" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Overall Leaderboard</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {leaderboardData.slice(0, 10).map((student) => (
                <LeaderboardItem key={student.id} student={student} showClass />
              ))}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="weekly" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Champions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {weeklyLeaderboard.slice(0, 10).map((student) => (
                <div key={student.id} className="flex items-center gap-4 p-4 rounded-lg border bg-card">
                  <div className="flex-shrink-0 w-12 flex justify-center">
                    {getRankIcon(student.rank)}
                  </div>
                  
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className={getAvatarColor(student.name)}>
                      <User className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-grow">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{student.name}</h3>
                      {typeof window !== "undefined" && localStorage.getItem('studentId') === student.id && 
                        <Badge variant="secondary">You</Badge>
                      }
                    </div>
                    <p className="text-sm text-muted-foreground">{student.class}</p>
                  </div>
                  
                  <div className="text-right">
                    <div className="font-bold text-lg text-blue-600">{student.weeklyPoints}</div>
                    <div className="text-sm text-muted-foreground">this week</div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}