import { ScheduleEvent, RecurrencePattern } from '@/types';
import { addDays, addWeeks, addMonths, addYears, format, parseISO, isAfter, isBefore, startOfDay, endOfDay } from 'date-fns';

export interface EventFilter {
  startDate?: string;
  endDate?: string;
  type?: ScheduleEvent['type'];
  courseId?: string;
  teacherId?: string;
  userId?: string;
  class?: string;
}

export interface EventStats {
  totalEvents: number;
  upcomingEvents: number;
  todayEvents: number;
  eventsByType: Record<ScheduleEvent['type'], number>;
  eventsByMonth: Record<string, number>;
}

export class EventService {
  private events: ScheduleEvent[] = [];
  private eventListeners: ((events: ScheduleEvent[]) => void)[] = [];

  constructor() {
    this.loadInitialEvents();
  }

  // Load initial demo events
  private loadInitialEvents() {
    const today = new Date();
    const baseEvents: Omit<ScheduleEvent, 'id'>[] = [
      {
        title: 'Mathematics Quiz - Algebra',
        description: 'Chapter 2: Linear Equations quiz for Class 10 students',
        startTime: format(addDays(today, 1), "yyyy-MM-dd'T'10:00:00"),
        endTime: format(addDays(today, 1), "yyyy-MM-dd'T'11:00:00"),
        type: 'exam',
        courseId: 'c10-math',
        teacherId: 'teacher01',
        location: 'Room 101',
        isRecurring: false,
        attendees: ['c10stu01', 'c10stu02', 'c10stu03'],
        color: '#DC2626'
      },
      {
        title: 'Science Lab - Chemical Reactions',
        description: 'Hands-on experiment with acids and bases',
        startTime: format(addDays(today, 2), "yyyy-MM-dd'T'14:00:00"),
        endTime: format(addDays(today, 2), "yyyy-MM-dd'T'15:30:00"),
        type: 'class',
        courseId: 'c10-science',
        teacherId: 'teacher02',
        location: 'Science Lab',
        isRecurring: false,
        attendees: ['c10stu01', 'c10stu02'],
        color: '#2563EB'
      },
      {
        title: 'English Essay Submission',
        description: 'Submit your essay on "Environmental Conservation"',
        startTime: format(addDays(today, 3), "yyyy-MM-dd'T'23:59:00"),
        endTime: format(addDays(today, 3), "yyyy-MM-dd'T'23:59:00"),
        type: 'assignment',
        courseId: 'c10-english',
        teacherId: 'teacher03',
        isRecurring: false,
        attendees: ['c10stu01'],
        color: '#16A34A'
      },
      {
        title: 'Parent-Teacher Meeting',
        description: 'Quarterly progress discussion with parents',
        startTime: format(addDays(today, 5), "yyyy-MM-dd'T'16:00:00"),
        endTime: format(addDays(today, 5), "yyyy-MM-dd'T'18:00:00"),
        type: 'event',
        teacherId: 'teacher01',
        location: 'Conference Hall',
        isRecurring: false,
        attendees: ['teacher01', 'teacher02', 'teacher03'],
        color: '#7C3AED'
      },
      {
        title: 'Weekly Math Class',
        description: 'Regular mathematics class for Class 10',
        startTime: format(today, "yyyy-MM-dd'T'09:00:00"),
        endTime: format(today, "yyyy-MM-dd'T'10:00:00"),
        type: 'class',
        courseId: 'c10-math',
        teacherId: 'teacher01',
        location: 'Room 101',
        isRecurring: true,
        recurrencePattern: {
          type: 'weekly',
          interval: 1,
          daysOfWeek: [1, 3, 5], // Monday, Wednesday, Friday
          endDate: format(addMonths(today, 6), 'yyyy-MM-dd')
        },
        attendees: ['c10stu01', 'c10stu02', 'c10stu03'],
        color: '#DC2626'
      },
      {
        title: 'Diwali Holiday',
        description: 'Festival holiday - No classes',
        startTime: format(addDays(today, 10), "yyyy-MM-dd'T'00:00:00"),
        endTime: format(addDays(today, 12), "yyyy-MM-dd'T'23:59:00"),
        type: 'holiday',
        isRecurring: false,
        color: '#F59E0B'
      }
    ];

    this.events = baseEvents.map((event, index) => ({
      ...event,
      id: `event-${Date.now()}-${index}`
    }));
  }

  // Create a new event
  async createEvent(eventData: Omit<ScheduleEvent, 'id'>): Promise<ScheduleEvent> {
    const newEvent: ScheduleEvent = {
      ...eventData,
      id: `event-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    };

    this.events.push(newEvent);
    this.notifyListeners();
    
    // In a real app, this would save to database
    return newEvent;
  }

  // Update an existing event
  async updateEvent(eventId: string, updates: Partial<ScheduleEvent>): Promise<ScheduleEvent | null> {
    const eventIndex = this.events.findIndex(e => e.id === eventId);
    if (eventIndex === -1) return null;

    this.events[eventIndex] = { ...this.events[eventIndex], ...updates };
    this.notifyListeners();
    
    return this.events[eventIndex];
  }

  // Delete an event
  async deleteEvent(eventId: string): Promise<boolean> {
    const eventIndex = this.events.findIndex(e => e.id === eventId);
    if (eventIndex === -1) return false;

    this.events.splice(eventIndex, 1);
    this.notifyListeners();
    
    return true;
  }

  // Get events with filtering
  async getEvents(filter?: EventFilter): Promise<ScheduleEvent[]> {
    let filteredEvents = [...this.events];

    // Expand recurring events
    filteredEvents = this.expandRecurringEvents(filteredEvents, filter);

    if (filter) {
      if (filter.startDate) {
        const startDate = parseISO(filter.startDate);
        filteredEvents = filteredEvents.filter(event => 
          isAfter(parseISO(event.startTime), startDate) || 
          format(parseISO(event.startTime), 'yyyy-MM-dd') === filter.startDate
        );
      }

      if (filter.endDate) {
        const endDate = parseISO(filter.endDate);
        filteredEvents = filteredEvents.filter(event => 
          isBefore(parseISO(event.startTime), endDate) ||
          format(parseISO(event.startTime), 'yyyy-MM-dd') === filter.endDate
        );
      }

      if (filter.type) {
        filteredEvents = filteredEvents.filter(event => event.type === filter.type);
      }

      if (filter.courseId) {
        filteredEvents = filteredEvents.filter(event => event.courseId === filter.courseId);
      }

      if (filter.teacherId) {
        filteredEvents = filteredEvents.filter(event => event.teacherId === filter.teacherId);
      }

      if (filter.userId) {
        filteredEvents = filteredEvents.filter(event => 
          event.attendees?.includes(filter.userId!) || 
          event.teacherId === filter.userId
        );
      }
    }

    return filteredEvents.sort((a, b) => 
      parseISO(a.startTime).getTime() - parseISO(b.startTime).getTime()
    );
  }

  // Get a single event by ID
  async getEvent(eventId: string): Promise<ScheduleEvent | null> {
    return this.events.find(e => e.id === eventId) || null;
  }

  // Get upcoming events
  async getUpcomingEvents(userId?: string, limit: number = 10): Promise<ScheduleEvent[]> {
    const now = new Date();
    const filter: EventFilter = {
      startDate: format(now, 'yyyy-MM-dd'),
      userId
    };

    const events = await this.getEvents(filter);
    return events
      .filter(event => isAfter(parseISO(event.startTime), now))
      .slice(0, limit);
  }

  // Get today's events
  async getTodayEvents(userId?: string): Promise<ScheduleEvent[]> {
    const today = format(new Date(), 'yyyy-MM-dd');
    const filter: EventFilter = {
      startDate: today,
      endDate: today,
      userId
    };

    return this.getEvents(filter);
  }

  // Get event statistics
  async getEventStats(userId?: string): Promise<EventStats> {
    const allEvents = await this.getEvents({ userId });
    const today = new Date();
    const todayStr = format(today, 'yyyy-MM-dd');

    const stats: EventStats = {
      totalEvents: allEvents.length,
      upcomingEvents: allEvents.filter(e => isAfter(parseISO(e.startTime), today)).length,
      todayEvents: allEvents.filter(e => format(parseISO(e.startTime), 'yyyy-MM-dd') === todayStr).length,
      eventsByType: {
        class: 0,
        exam: 0,
        assignment: 0,
        event: 0,
        holiday: 0
      },
      eventsByMonth: {}
    };

    allEvents.forEach(event => {
      stats.eventsByType[event.type]++;
      
      const month = format(parseISO(event.startTime), 'yyyy-MM');
      stats.eventsByMonth[month] = (stats.eventsByMonth[month] || 0) + 1;
    });

    return stats;
  }

  // Expand recurring events into individual instances
  private expandRecurringEvents(events: ScheduleEvent[], filter?: EventFilter): ScheduleEvent[] {
    const expandedEvents: ScheduleEvent[] = [];
    const endDate = filter?.endDate ? parseISO(filter.endDate) : addMonths(new Date(), 6);

    events.forEach(event => {
      if (!event.isRecurring || !event.recurrencePattern) {
        expandedEvents.push(event);
        return;
      }

      const pattern = event.recurrencePattern;
      const startDate = parseISO(event.startTime);
      let currentDate = startDate;
      let occurrenceCount = 0;

      while (
        isBefore(currentDate, endDate) &&
        (!pattern.occurrences || occurrenceCount < pattern.occurrences) &&
        (!pattern.endDate || isBefore(currentDate, parseISO(pattern.endDate)))
      ) {
        // Create event instance
        const eventDuration = parseISO(event.endTime).getTime() - parseISO(event.startTime).getTime();
        const instanceEvent: ScheduleEvent = {
          ...event,
          id: `${event.id}-${format(currentDate, 'yyyy-MM-dd')}`,
          startTime: currentDate.toISOString(),
          endTime: new Date(currentDate.getTime() + eventDuration).toISOString()
        };

        expandedEvents.push(instanceEvent);
        occurrenceCount++;

        // Calculate next occurrence
        switch (pattern.type) {
          case 'daily':
            currentDate = addDays(currentDate, pattern.interval);
            break;
          case 'weekly':
            if (pattern.daysOfWeek && pattern.daysOfWeek.length > 0) {
              // Find next day of week
              const currentDay = currentDate.getDay();
              const nextDay = pattern.daysOfWeek.find(day => day > currentDay) || 
                             pattern.daysOfWeek[0];
              
              if (nextDay > currentDay) {
                currentDate = addDays(currentDate, nextDay - currentDay);
              } else {
                currentDate = addWeeks(currentDate, pattern.interval);
                currentDate = addDays(currentDate, nextDay - currentDate.getDay());
              }
            } else {
              currentDate = addWeeks(currentDate, pattern.interval);
            }
            break;
          case 'monthly':
            currentDate = addMonths(currentDate, pattern.interval);
            break;
          case 'yearly':
            currentDate = addYears(currentDate, pattern.interval);
            break;
        }
      }
    });

    return expandedEvents;
  }

  // Event listeners for real-time updates
  subscribe(listener: (events: ScheduleEvent[]) => void) {
    this.eventListeners.push(listener);
    return () => {
      const index = this.eventListeners.indexOf(listener);
      if (index > -1) {
        this.eventListeners.splice(index, 1);
      }
    };
  }

  private notifyListeners() {
    this.eventListeners.forEach(listener => listener([...this.events]));
  }

  // Bulk operations
  async createBulkEvents(events: Omit<ScheduleEvent, 'id'>[]): Promise<ScheduleEvent[]> {
    const newEvents = events.map((event, index) => ({
      ...event,
      id: `bulk-event-${Date.now()}-${index}`
    }));

    this.events.push(...newEvents);
    this.notifyListeners();
    
    return newEvents;
  }

  async deleteBulkEvents(eventIds: string[]): Promise<number> {
    const initialLength = this.events.length;
    this.events = this.events.filter(event => !eventIds.includes(event.id));
    const deletedCount = initialLength - this.events.length;
    
    if (deletedCount > 0) {
      this.notifyListeners();
    }
    
    return deletedCount;
  }

  // Search events
  async searchEvents(query: string, userId?: string): Promise<ScheduleEvent[]> {
    const allEvents = await this.getEvents({ userId });
    const searchTerm = query.toLowerCase();

    return allEvents.filter(event =>
      event.title.toLowerCase().includes(searchTerm) ||
      event.description?.toLowerCase().includes(searchTerm) ||
      event.location?.toLowerCase().includes(searchTerm) ||
      event.type.toLowerCase().includes(searchTerm)
    );
  }
}

// Singleton instance
export const eventService = new EventService();