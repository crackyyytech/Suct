'use client';

import { useState, useEffect, useCallback } from 'react';
import { ScheduleEvent, RecurrencePattern } from '@/types';
import { eventService, EventFilter, EventStats } from '@/services/event-service';

export interface UseEventsOptions {
  filter?: EventFilter;
  autoRefresh?: boolean;
  refreshInterval?: number;
}

export function useEvents(options: UseEventsOptions = {}) {
  const [events, setEvents] = useState<ScheduleEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { filter, autoRefresh = false, refreshInterval = 30000 } = options;

  const loadEvents = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedEvents = await eventService.getEvents(filter);
      setEvents(fetchedEvents);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load events');
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    loadEvents();

    // Subscribe to real-time updates
    const unsubscribe = eventService.subscribe(() => {
      loadEvents();
    });

    // Auto-refresh if enabled
    let intervalId: NodeJS.Timeout | null = null;
    if (autoRefresh) {
      intervalId = setInterval(loadEvents, refreshInterval);
    }

    return () => {
      unsubscribe();
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [loadEvents, autoRefresh, refreshInterval]);

  const createEvent = useCallback(async (eventData: Omit<ScheduleEvent, 'id'>) => {
    try {
      const newEvent = await eventService.createEvent(eventData);
      return newEvent;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create event');
      throw err;
    }
  }, []);

  const updateEvent = useCallback(async (eventId: string, updates: Partial<ScheduleEvent>) => {
    try {
      const updatedEvent = await eventService.updateEvent(eventId, updates);
      return updatedEvent;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update event');
      throw err;
    }
  }, []);

  const deleteEvent = useCallback(async (eventId: string) => {
    try {
      const success = await eventService.deleteEvent(eventId);
      return success;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete event');
      throw err;
    }
  }, []);

  const refresh = useCallback(() => {
    loadEvents();
  }, [loadEvents]);

  return {
    events,
    loading,
    error,
    createEvent,
    updateEvent,
    deleteEvent,
    refresh
  };
}

export function useUpcomingEvents(userId?: string, limit: number = 10) {
  const [events, setEvents] = useState<ScheduleEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadUpcomingEvents = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const upcomingEvents = await eventService.getUpcomingEvents(userId, limit);
      setEvents(upcomingEvents);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load upcoming events');
    } finally {
      setLoading(false);
    }
  }, [userId, limit]);

  useEffect(() => {
    loadUpcomingEvents();

    // Subscribe to real-time updates
    const unsubscribe = eventService.subscribe(() => {
      loadUpcomingEvents();
    });

    return unsubscribe;
  }, [loadUpcomingEvents]);

  return {
    events,
    loading,
    error,
    refresh: loadUpcomingEvents
  };
}

export function useTodayEvents(userId?: string) {
  const [events, setEvents] = useState<ScheduleEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadTodayEvents = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const todayEvents = await eventService.getTodayEvents(userId);
      setEvents(todayEvents);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load today\'s events');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    loadTodayEvents();

    // Subscribe to real-time updates
    const unsubscribe = eventService.subscribe(() => {
      loadTodayEvents();
    });

    // Refresh at midnight
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    
    const msUntilMidnight = tomorrow.getTime() - now.getTime();
    const midnightTimeout = setTimeout(() => {
      loadTodayEvents();
      // Set up daily refresh
      const dailyInterval = setInterval(loadTodayEvents, 24 * 60 * 60 * 1000);
      return () => clearInterval(dailyInterval);
    }, msUntilMidnight);

    return () => {
      unsubscribe();
      clearTimeout(midnightTimeout);
    };
  }, [loadTodayEvents]);

  return {
    events,
    loading,
    error,
    refresh: loadTodayEvents
  };
}

export function useEventStats(userId?: string) {
  const [stats, setStats] = useState<EventStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadStats = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const eventStats = await eventService.getEventStats(userId);
      setStats(eventStats);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load event statistics');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    loadStats();

    // Subscribe to real-time updates
    const unsubscribe = eventService.subscribe(() => {
      loadStats();
    });

    return unsubscribe;
  }, [loadStats]);

  return {
    stats,
    loading,
    error,
    refresh: loadStats
  };
}

export function useEventSearch() {
  const [results, setResults] = useState<ScheduleEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = useCallback(async (query: string, userId?: string) => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const searchResults = await eventService.searchEvents(query, userId);
      setResults(searchResults);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to search events');
    } finally {
      setLoading(false);
    }
  }, []);

  const clearResults = useCallback(() => {
    setResults([]);
    setError(null);
  }, []);

  return {
    results,
    loading,
    error,
    search,
    clearResults
  };
}