'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useEvents, useEventSearch } from '@/hooks/use-events';
import { ScheduleEvent } from '@/types';
import { format, isToday, isTomorrow, isThisWeek, parseISO } from 'date-fns';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Search, 
  Filter,
  BookOpen,
  FileText,
  GraduationCap,
  PartyPopper,
  Sun
} from 'lucide-react';

interface EventListProps {
  userId?: string;
  showSearch?: boolean;
  showFilters?: boolean;
  maxItems?: number;
  onEventClick?: (event: ScheduleEvent) => void;
}

export function EventList({ 
  userId, 
  showSearch = true, 
  showFilters = true, 
  maxItems,
  onEventClick 
}: EventListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [selectedEvent, setSelectedEvent] = useState<ScheduleEvent | null>(null);

  const { events, loading, error } = useEvents({
    filter: { userId },
    autoRefresh: true
  });

  const { results: searchResults, search, clearResults } = useEventSearch();

  // Filter events based on search and filters
  const filteredEvents = React.useMemo(() => {
    let filtered = searchQuery ? searchResults : events;

    if (typeFilter !== 'all') {
      filtered = filtered.filter(event => event.type === typeFilter);
    }

    // Sort by start time
    filtered = filtered.sort((a, b) => 
      parseISO(a.startTime).getTime() - parseISO(b.startTime).getTime()
    );

    return maxItems ? filtered.slice(0, maxItems) : filtered;
  }, [events, searchResults, searchQuery, typeFilter, maxItems]);

  // Handle search
  React.useEffect(() => {
    if (searchQuery.trim()) {
      search(searchQuery, userId);
    } else {
      clearResults();
    }
  }, [searchQuery, userId, search, clearResults]);

  const handleEventClick = (event: ScheduleEvent) => {
    setSelectedEvent(event);
    if (onEventClick) {
      onEventClick(event);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Events
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
            Events
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-red-500 py-4">
            Error loading events: {error}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Events
            {filteredEvents.length > 0 && (
              <Badge variant="secondary">{filteredEvents.length}</Badge>
            )}
          </CardTitle>
          
          {(showSearch || showFilters) && (
            <div className="flex gap-2 mt-4">
              {showSearch && (
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search events..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              )}
              
              {showFilters && (
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-32">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="class">Classes</SelectItem>
                    <SelectItem value="exam">Exams</SelectItem>
                    <SelectItem value="assignment">Assignments</SelectItem>
                    <SelectItem value="event">Events</SelectItem>
                    <SelectItem value="holiday">Holidays</SelectItem>
                  </SelectContent>
                </Select>
              )}
            </div>
          )}
        </CardHeader>
        
        <CardContent>
          {filteredEvents.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">
              {searchQuery ? 'No events found matching your search.' : 'No events scheduled.'}
            </div>
          ) : (
            <div className="space-y-3">
              {filteredEvents.map((event) => (
                <EventCard 
                  key={event.id} 
                  event={event} 
                  onClick={() => handleEventClick(event)}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Event Details Dialog */}
      <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {getEventIcon(selectedEvent?.type)}
              {selectedEvent?.title}
            </DialogTitle>
          </DialogHeader>
          
          {selectedEvent && <EventDetails event={selectedEvent} />}
        </DialogContent>
      </Dialog>
    </>
  );
}

interface EventCardProps {
  event: ScheduleEvent;
  onClick: () => void;
}

function EventCard({ event, onClick }: EventCardProps) {
  const startTime = parseISO(event.startTime);
  const endTime = parseISO(event.endTime);
  
  return (
    <div 
      className="p-4 border rounded-lg hover:bg-accent cursor-pointer transition-colors"
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            {getEventIcon(event.type)}
            <h3 className="font-medium">{event.title}</h3>
            <Badge variant={getEventTypeBadgeVariant(event.type)} className="text-xs">
              {event.type}
            </Badge>
          </div>
          
          {event.description && (
            <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
              {event.description}
            </p>
          )}
          
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{getTimeDisplay(startTime, endTime)}</span>
            </div>
            
            {event.location && (
              <div className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                <span>{event.location}</span>
              </div>
            )}
            
            {event.attendees && event.attendees.length > 0 && (
              <div className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                <span>{event.attendees.length}</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-xs text-muted-foreground">
            {getDateDisplay(startTime)}
          </div>
          {event.isRecurring && (
            <Badge variant="outline" className="text-xs mt-1">
              Recurring
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
}

function EventDetails({ event }: { event: ScheduleEvent }) {
  const startTime = parseISO(event.startTime);
  const endTime = parseISO(event.endTime);
  
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Badge variant={getEventTypeBadgeVariant(event.type)}>
          {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
        </Badge>
        {event.isRecurring && (
          <Badge variant="outline">Recurring</Badge>
        )}
      </div>

      {event.description && (
        <p className="text-sm text-muted-foreground">
          {event.description}
        </p>
      )}

      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm">
          <Clock className="h-4 w-4" />
          <div>
            <div className="font-medium">{format(startTime, 'PPP')}</div>
            <div className="text-muted-foreground">
              {format(startTime, 'p')} - {format(endTime, 'p')}
            </div>
          </div>
        </div>

        {event.location && (
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4" />
            <span>{event.location}</span>
          </div>
        )}

        {event.attendees && event.attendees.length > 0 && (
          <div className="flex items-center gap-2 text-sm">
            <Users className="h-4 w-4" />
            <span>{event.attendees.length} attendees</span>
          </div>
        )}

        {event.courseId && (
          <div className="flex items-center gap-2 text-sm">
            <BookOpen className="h-4 w-4" />
            <span>Course: {event.courseId}</span>
          </div>
        )}
      </div>

      {event.isRecurring && event.recurrencePattern && (
        <div className="text-sm text-muted-foreground border-t pt-3">
          <strong>Recurrence:</strong> {getRecurrenceDescription(event.recurrencePattern)}
        </div>
      )}
    </div>
  );
}

function getEventIcon(type?: ScheduleEvent['type']) {
  const icons = {
    class: <BookOpen className="h-4 w-4" />,
    exam: <GraduationCap className="h-4 w-4" />,
    assignment: <FileText className="h-4 w-4" />,
    event: <PartyPopper className="h-4 w-4" />,
    holiday: <Sun className="h-4 w-4" />
  };
  return icons[type || 'event'];
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

function getTimeDisplay(start: Date, end: Date): string {
  if (format(start, 'yyyy-MM-dd') === format(end, 'yyyy-MM-dd')) {
    return `${format(start, 'p')} - ${format(end, 'p')}`;
  }
  return `${format(start, 'MMM d, p')} - ${format(end, 'MMM d, p')}`;
}

function getDateDisplay(date: Date): string {
  if (isToday(date)) {
    return 'Today';
  } else if (isTomorrow(date)) {
    return 'Tomorrow';
  } else if (isThisWeek(date)) {
    return format(date, 'EEEE');
  } else {
    return format(date, 'MMM d');
  }
}

function getRecurrenceDescription(pattern: any): string {
  const { type, interval, daysOfWeek, endDate, occurrences } = pattern;
  
  let description = `Every ${interval > 1 ? interval : ''} ${type}`;
  
  if (type === 'weekly' && daysOfWeek && daysOfWeek.length > 0) {
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const days = daysOfWeek.map((day: number) => dayNames[day]).join(', ');
    description += ` on ${days}`;
  }
  
  if (endDate) {
    description += ` until ${format(new Date(endDate), 'PP')}`;
  } else if (occurrences) {
    description += ` for ${occurrences} occurrences`;
  }
  
  return description;
}