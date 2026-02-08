'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useUpcomingEvents } from '@/hooks/use-events';
import { ScheduleEvent } from '@/types';
import { format, isToday, isTomorrow, addDays } from 'date-fns';
import { 
  Calendar, 
  Clock, 
  ArrowRight,
  BookOpen,
  FileText,
  GraduationCap,
  PartyPopper,
  Sun
} from 'lucide-react';
import Link from 'next/link';

interface UpcomingEventsWidgetProps {
  userId?: string;
  userRole?: 'student' | 'teacher' | 'admin';
  maxItems?: number;
  showViewAll?: boolean;
}

export function UpcomingEventsWidget({ 
  userId, 
  userRole = 'student', 
  maxItems = 3,
  showViewAll = true 
}: UpcomingEventsWidgetProps) {
  const { events, loading, error } = useUpcomingEvents(userId, maxItems);

  const getScheduleLink = () => {
    switch (userRole) {
      case 'teacher':
        return '/dashboard/teacher/schedule';
      case 'admin':
        return '/dashboard/admin/schedule';
      default:
        return '/dashboard/student/schedule';
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Upcoming Events
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Upcoming Events
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-red-500 py-4 text-sm">
            Failed to load events
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Upcoming Events
            {events.length > 0 && (
              <Badge variant="secondary">{events.length}</Badge>
            )}
          </CardTitle>
          {showViewAll && (
            <Button variant="ghost" size="sm" asChild>
              <Link href={getScheduleLink()}>
                View All
                <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          )}
        </div>
      </CardHeader>
      
      <CardContent>
        {events.length === 0 ? (
          <div className="text-center text-muted-foreground py-6">
            <Calendar className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No upcoming events</p>
          </div>
        ) : (
          <div className="space-y-3">
            {events.map((event) => (
              <EventItem key={event.id} event={event} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function EventItem({ event }: { event: ScheduleEvent }) {
  const startTime = new Date(event.startTime);
  
  return (
    <div className="flex items-start gap-3 p-3 border rounded-lg hover:bg-accent/50 transition-colors">
      <div className="flex-shrink-0">
        {getEventIcon(event.type)}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h4 className="font-medium text-sm truncate">{event.title}</h4>
          <Badge variant={getEventTypeBadgeVariant(event.type)} className="text-xs">
            {event.type}
          </Badge>
        </div>
        
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{getEventTimeDisplay(startTime)}</span>
          </div>
          
          {event.location && (
            <span className="truncate">{event.location}</span>
          )}
        </div>
      </div>
    </div>
  );
}

function getEventIcon(type: ScheduleEvent['type']) {
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

function getEventTimeDisplay(date: Date): string {
  if (isToday(date)) {
    return `Today at ${format(date, 'p')}`;
  } else if (isTomorrow(date)) {
    return `Tomorrow at ${format(date, 'p')}`;
  } else if (date <= addDays(new Date(), 7)) {
    return `${format(date, 'EEE')} at ${format(date, 'p')}`;
  } else {
    return format(date, 'MMM d at p');
  }
}