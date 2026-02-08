'use client';

import { EventDashboard } from '@/components/event-dashboard';

export default function SchedulePage() {
  // Get current user info (in a real app, this would come from auth context)
  const userId = typeof window !== 'undefined' ? localStorage.getItem('teacherId') || 'teacher01' : 'teacher01';

  return (
    <main className="p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Schedule</h1>
        <p className="text-muted-foreground">Manage your classes and events</p>
      </div>

      {/* Event Dashboard */}
      <EventDashboard 
        userId={userId}
        userRole="teacher"
        showCreateButton={true}
      />
    </main>
  );
}