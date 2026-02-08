'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { EventCalendar } from './event-calendar';
import { EventList } from './event-list';
import { CreateEventDialog } from './create-event-dialog';
import { useEvents, useUpcomingEvents, useTodayEvents, useEventStats } from '@/hooks/use-events';
import { ScheduleEvent } from '@/types';
import { format, isToday, isTomorrow, addDays } from 'date-fns';
import { 
  Calendar, 
  Clock, 
  TrendingUp, 
  Plus,
  BookOpen,
  FileText,
  GraduationCap,
  PartyPopper,
  Sun,
  AlertCircle
} from 'lucide-react';

interface EventDashboardProps {
  userId?: string;
  userRole?: 'student' | 'teacher' | 'admin';
  showCreateButton?: boolean;
}

export function EventDashboard({ userId, userRole = 'student', showCreateButton = true }: EventDashboardProps) {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [selectedView, setSelectedView] = useState<'calendar' | 'list'>('calendar');

  const { events } = useEvents({ filter: { userId } });
  const { events: upcomingEvents } = useUpcomingEvents(userId, 5);
  const { events: todayEvents } = useTodayEvents(userId);
  const { stats } = useEventStats(userId);

  const handleEventCreated = (event: ScheduleEvent) => {
    // Event will be automatically updated via the real-time subscription
    console.log('Event created:', event);
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Events</p>
                <p className="text-2xl font-bold">{stats?.totalEvents || 0}</p>
              </div>
              <Calendar className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Today</p>
                <p className="text-2xl font-bold">{stats?.todayEvents || 0}</p>
              </div>
              <Clock className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Upcoming</p>
                <p className="text-2xl font-bold">{stats?.upcomingEvents || 0}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">This Month</p>
                <p className="text-2xl font-bold">
                  {stats?.eventsByMonth[format(new Date(), 'yyyy-MM')] || 0}
                </p>
              </div>
              <Calendar className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions and Today's Events */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Events */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Today's Events
                {todayEvents.length > 0 && (
                  <Badge variant="secondary">{todayEvents.length}</Badge>
                )}
              </CardTitle>
              {showCreateButton && (
                <Button size="sm" onClick={() => setCreateDialogOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Event
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {todayEvents.length === 0 ? (
              <div className="text-center text-muted-foreground py-8">
                <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No events scheduled for today</p>
              </div>
            ) : (
              <div className="space-y-3">
                {todayEvents.map((event) => (
                  <TodayEventCard key={event.id} event={event} />
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Upcoming
            </CardTitle>
          </CardHeader>
          <CardContent>
            {upcomingEvents.length === 0 ? (
              <div className="text-center text-muted-foreground py-8">
                <TrendingUp className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No upcoming events</p>
              </div>
            ) : (
              <div className="space-y-3">
                {upcomingEvents.map((event) => (
                  <UpcomingEventCard key={event.id} event={event} />
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Event Type Distribution */}
      {stats && (
        <Card>
          <CardHeader>
            <CardTitle>Event Types</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              {Object.entries(stats.eventsByType).map(([type, count]) => (
                <div key={type} className="flex items-center gap-2">
                  {getEventTypeIcon(type as ScheduleEvent['type'])}
                  <span className="text-sm font-medium capitalize">{type}</span>
                  <Badge variant="secondary">{count}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Calendar/List View */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Events</CardTitle>
            <Tabs value={selectedView} onValueChange={(value) => setSelectedView(value as 'calendar' | 'list')}>
              <TabsList>
                <TabsTrigger value="calendar">Calendar</TabsTrigger>
                <TabsTrigger value="list">List</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          {selectedView === 'calendar' ? (
            <EventCalendar 
              userId={userId} 
              height={500}
              showCreateButton={false}
              onCreateEvent={() => setCreateDialogOpen(true)}
            />
          ) : (
            <EventList 
              userId={userId}
              showSearch={true}
              showFilters={true}
            />
          )}
        </CardContent>
      </Card>

      {/* Create Event Dialog */}
      <CreateEventDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        userId={userId}
        onEventCreated={handleEventCreated}
      />
    </div>
  );
}

function TodayEventCard({ event }: { event: ScheduleEvent }) {
  const startTime = new Date(event.startTime);
  const endTime = new Date(event.endTime);
  const isNow = new Date() >= startTime && new Date() <= endTime;
  const isPast = new Date() > endTime;

  return (
    <div className={`p-3 border rounded-lg ${isNow ? 'border-primary bg-primary/5' : isPast ? 'opacity-60' : ''}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {getEventTypeIcon(event.type)}
          <div>
            <h4 className="font-medium">{event.title}</h4>
            <p className="text-sm text-muted-foreground">
              {format(startTime, 'p')} - {format(endTime, 'p')}
              {event.location && ` • ${event.location}`}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {isNow && (
            <Badge variant="default" className="animate-pulse">
              <AlertCircle className="h-3 w-3 mr-1" />
              Now
            </Badge>
          )}
          <Badge variant={getEventTypeBadgeVariant(event.type)}>
            {event.type}
          </Badge>
        </div>
      </div>
    </div>
  );
}

function UpcomingEventCard({ event }: { event: ScheduleEvent }) {
  const startTime = new Date(event.startTime);
  
  return (
    <div className="p-3 border rounded-lg">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          {getEventTypeIcon(event.type)}
          <div>
            <h4 className="font-medium text-sm">{event.title}</h4>
            <p className="text-xs text-muted-foreground">
              {getUpcomingDateDisplay(startTime)}
            </p>
          </div>
        </div>
        <Badge variant="outline" className="text-xs">
          {event.type}
        </Badge>
      </div>
    </div>
  );
}

function getEventTypeIcon(type: ScheduleEvent['type']) {
  const icons = {
    class: <BookOpen className="h-4 w-4 text-blue-500" />,
    exam: <GraduationCap className="h-4 w-4 text-red-500" />,
    assignment: <FileText className="h-4 w-4 text-green-500" />,
    event: <PartyPopper className="h-4 w-4 text-purple-500" />,
    holiday: <Sun className="h-4 w-4 text-yellow-500" />
  };
  return icons[type] || icons.event;
}

function getEventTypeBadgeVariant(type: ScheduleEvent['type']): 'default' | 'secondary' | 'destructive' | 'outline' {
  const variants = {
    class: 'default' as const,
    exam: 'destructive' as const,
    assignment: 'secondary' as const,
    event: 'outline' as const,
    holiday: 'secondary' as const
  };
  return variants[type] || 'default';
}

function getUpcomingDateDisplay(date: Date): string {
  if (isToday(date)) {
    return `Today at ${format(date, 'p')}`;
  } else if (isTomorrow(date)) {
    return `Tomorrow at ${format(date, 'p')}`;
  } else if (date <= addDays(new Date(), 7)) {
    return `${format(date, 'EEEE')} at ${format(date, 'p')}`;
  } else {
    return format(date, 'MMM d at p');
  }
}