'use client';

import React, { useState, useMemo } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useEvents } from '@/hooks/use-events';
import { ScheduleEvent } from '@/types';
import { CalendarIcon, Clock, MapPin, Users, Plus } from 'lucide-react';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

interface EventCalendarProps {
  userId?: string;
  height?: number;
  showCreateButton?: boolean;
  onCreateEvent?: () => void;
  onEventClick?: (event: ScheduleEvent) => void;
}

interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  resource: ScheduleEvent;
}

export function EventCalendar({ 
  userId, 
  height = 600, 
  showCreateButton = true,
  onCreateEvent,
  onEventClick 
}: EventCalendarProps) {
  const [selectedEvent, setSelectedEvent] = useState<ScheduleEvent | null>(null);
  const [view, setView] = useState<'month' | 'week' | 'day' | 'agenda'>('month');
  const [date, setDate] = useState(new Date());

  const { events, loading, error } = useEvents({
    filter: { userId },
    autoRefresh: true
  });

  const calendarEvents: CalendarEvent[] = useMemo(() => {
    return events.map(event => ({
      id: event.id,
      title: event.title,
      start: new Date(event.startTime),
      end: new Date(event.endTime),
      resource: event
    }));
  }, [events]);

  const eventStyleGetter = (event: CalendarEvent) => {
    const backgroundColor = event.resource.color || getEventTypeColor(event.resource.type);
    return {
      style: {
        backgroundColor,
        borderRadius: '4px',
        opacity: 0.8,
        color: 'white',
        border: '0px',
        display: 'block'
      }
    };
  };

  const handleSelectEvent = (event: CalendarEvent) => {
    setSelectedEvent(event.resource);
    if (onEventClick) {
      onEventClick(event.resource);
    }
  };

  const handleSelectSlot = ({ start, end }: { start: Date; end: Date }) => {
    if (onCreateEvent) {
      onCreateEvent();
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5" />
            Event Calendar
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-96">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
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
            <CalendarIcon className="h-5 w-5" />
            Event Calendar
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-red-500 py-8">
            Error loading calendar: {error}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5" />
              Event Calendar
            </CardTitle>
            {showCreateButton && (
              <Button onClick={onCreateEvent} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Event
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div style={{ height }}>
            <Calendar
              localizer={localizer}
              events={calendarEvents}
              startAccessor="start"
              endAccessor="end"
              style={{ height: '100%' }}
              onSelectEvent={handleSelectEvent}
              onSelectSlot={handleSelectSlot}
              selectable
              view={view}
              onView={setView}
              date={date}
              onNavigate={setDate}
              eventPropGetter={eventStyleGetter}
              popup
              showMultiDayTimes
              step={30}
              timeslots={2}
              views={['month', 'week', 'day', 'agenda']}
              messages={{
                next: 'Next',
                previous: 'Previous',
                today: 'Today',
                month: 'Month',
                week: 'Week',
                day: 'Day',
                agenda: 'Agenda',
                date: 'Date',
                time: 'Time',
                event: 'Event',
                noEventsInRange: 'No events in this range',
                showMore: (total) => `+${total} more`
              }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Event Details Dialog */}
      <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: selectedEvent?.color || getEventTypeColor(selectedEvent?.type || 'event') }}
              />
              {selectedEvent?.title}
            </DialogTitle>
          </DialogHeader>
          
          {selectedEvent && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge variant={getEventTypeBadgeVariant(selectedEvent.type)}>
                  {selectedEvent.type.charAt(0).toUpperCase() + selectedEvent.type.slice(1)}
                </Badge>
              </div>

              {selectedEvent.description && (
                <p className="text-sm text-muted-foreground">
                  {selectedEvent.description}
                </p>
              )}

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4" />
                  <span>
                    {format(new Date(selectedEvent.startTime), 'PPP p')} - {' '}
                    {format(new Date(selectedEvent.endTime), 'p')}
                  </span>
                </div>

                {selectedEvent.location && (
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4" />
                    <span>{selectedEvent.location}</span>
                  </div>
                )}

                {selectedEvent.attendees && selectedEvent.attendees.length > 0 && (
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4" />
                    <span>{selectedEvent.attendees.length} attendees</span>
                  </div>
                )}
              </div>

              {selectedEvent.isRecurring && selectedEvent.recurrencePattern && (
                <div className="text-sm text-muted-foreground">
                  <strong>Recurring:</strong> {getRecurrenceDescription(selectedEvent.recurrencePattern)}
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

function getEventTypeColor(type: ScheduleEvent['type']): string {
  const colors = {
    class: '#2563EB',
    exam: '#DC2626',
    assignment: '#16A34A',
    event: '#7C3AED',
    holiday: '#F59E0B'
  };
  return colors[type] || '#6B7280';
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