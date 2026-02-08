'use client';

import { EventDashboard } from '@/components/event-dashboard';

export default function AdminSchedulePage() {
  // Get current user info (in a real app, this would come from auth context)
  const userId = typeof window !== 'undefined' ? localStorage.getItem('adminId') || 'admin' : 'admin';

  return (
    <main className="p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Platform Schedule</h1>
        <p className="text-muted-foreground">Manage all platform events and schedules</p>
      </div>

      {/* Event Dashboard */}
      <EventDashboard 
        userId={userId}
        userRole="admin"
        showCreateButton={true}
      />
    </main>
  );
}