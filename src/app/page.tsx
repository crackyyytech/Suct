import { RoleSelection } from '@/components/role-selection';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, BookOpen, Users, Trophy } from 'lucide-react';

export default function Home() {
  return (
    <main className="flex min-h-screen w-full items-center justify-center p-4 bg-background">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem] dark:bg-slate-950 dark:bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#3e609622,transparent)] dark:bg-[radial-gradient(circle_500px_at_50%_200px,#3e609666,transparent)]"></div>
      </div>
      <div className="flex flex-col items-center gap-8 w-full max-w-6xl">
        <RoleSelection />

      </div>
    </main>
  );
}
