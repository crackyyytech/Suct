'use client';

import { EventDashboard } from '@/components/event-dashboard';

export default function StudentSchedulePage() {
  // Get current user info (in a real app, this would come from auth context)
  const userId = typeof window !== 'undefined' ? localStorage.getItem('studentId') || 'c10stu01' : 'c10stu01';

  return (
    <main className="p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">My Schedule</h1>
        <p className="text-muted-foreground">View your classes, exams, and assignments</p>
      </div>

      {/* Event Dashboard */}
      <EventDashboard 
        userId={userId}
        userRole="student"
        showCreateButton={false}
      />
    </main>
  );
}