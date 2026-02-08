'use client';

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useEvents } from '@/hooks/use-events';
import { ScheduleEvent, RecurrencePattern } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { format, addDays, addWeeks, addMonths } from 'date-fns';
import { 
  Plus, 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Repeat,
  BookOpen,
  FileText,
  GraduationCap,
  PartyPopper,
  Sun
} from 'lucide-react';

interface CreateEventDialogProps {
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultValues?: Partial<ScheduleEvent>;
  userId?: string;
  onEventCreated?: (event: ScheduleEvent) => void;
}

export function CreateEventDialog({
  trigger,
  open,
  onOpenChange,
  defaultValues,
  userId,
  onEventCreated
}: CreateEventDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { createEvent } = useEvents();
  const { toast } = useToast();

  // Form state
  const [formData, setFormData] = useState({
    title: defaultValues?.title || '',
    description: defaultValues?.description || '',
    startDate: defaultValues?.startTime ? format(new Date(defaultValues.startTime), 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd'),
    startTime: defaultValues?.startTime ? format(new Date(defaultValues.startTime), 'HH:mm') : '09:00',
    endDate: defaultValues?.endTime ? format(new Date(defaultValues.endTime), 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd'),
    endTime: defaultValues?.endTime ? format(new Date(defaultValues.endTime), 'HH:mm') : '10:00',
    type: defaultValues?.type || 'event' as ScheduleEvent['type'],
    location: defaultValues?.location || '',
    courseId: defaultValues?.courseId || '',
    isRecurring: defaultValues?.isRecurring || false,
    color: defaultValues?.color || '#2563EB'
  });

  const [recurrenceData, setRecurrenceData] = useState<RecurrencePattern>({
    type: 'weekly',
    interval: 1,
    daysOfWeek: [1], // Monday
    endDate: format(addMonths(new Date(), 3), 'yyyy-MM-dd')
  });

  const handleOpenChange = (newOpen: boolean) => {
    if (onOpenChange) {
      onOpenChange(newOpen);
    } else {
      setIsOpen(newOpen);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const startDateTime = new Date(`${formData.startDate}T${formData.startTime}`);
      const endDateTime = new Date(`${formData.endDate}T${formData.endTime}`);

      if (endDateTime <= startDateTime) {
        toast({
          title: 'Invalid Time',
          description: 'End time must be after start time.',
          variant: 'destructive'
        });
        return;
      }

      const eventData: Omit<ScheduleEvent, 'id'> = {
        title: formData.title,
        description: formData.description || undefined,
        startTime: startDateTime.toISOString(),
        endTime: endDateTime.toISOString(),
        type: formData.type,
        location: formData.location || undefined,
        courseId: formData.courseId || undefined,
        teacherId: userId,
        isRecurring: formData.isRecurring,
        recurrencePattern: formData.isRecurring ? recurrenceData : undefined,
        attendees: userId ? [userId] : undefined,
        color: formData.color
      };

      const newEvent = await createEvent(eventData);
      
      toast({
        title: 'Event Created',
        description: `"${formData.title}" has been scheduled successfully.`
      });

      if (onEventCreated) {
        onEventCreated(newEvent);
      }

      handleOpenChange(false);
      resetForm();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create event. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      startDate: format(new Date(), 'yyyy-MM-dd'),
      startTime: '09:00',
      endDate: format(new Date(), 'yyyy-MM-dd'),
      endTime: '10:00',
      type: 'event',
      location: '',
      courseId: '',
      isRecurring: false,
      color: '#2563EB'
    });
    setRecurrenceData({
      type: 'weekly',
      interval: 1,
      daysOfWeek: [1],
      endDate: format(addMonths(new Date(), 3), 'yyyy-MM-dd')
    });
  };

  const eventTypeOptions = [
    { value: 'class', label: 'Class', icon: <BookOpen className="h-4 w-4" />, color: '#2563EB' },
    { value: 'exam', label: 'Exam', icon: <GraduationCap className="h-4 w-4" />, color: '#DC2626' },
    { value: 'assignment', label: 'Assignment', icon: <FileText className="h-4 w-4" />, color: '#16A34A' },
    { value: 'event', label: 'Event', icon: <PartyPopper className="h-4 w-4" />, color: '#7C3AED' },
    { value: 'holiday', label: 'Holiday', icon: <Sun className="h-4 w-4" />, color: '#F59E0B' }
  ];

  const selectedEventType = eventTypeOptions.find(option => option.value === formData.type);

  return (
    <Dialog open={open ?? isOpen} onOpenChange={handleOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Create New Event
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Event Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Event Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter event title"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Enter event description"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="type">Event Type *</Label>
                <Select 
                  value={formData.type} 
                  onValueChange={(value: ScheduleEvent['type']) => {
                    const selectedType = eventTypeOptions.find(opt => opt.value === value);
                    setFormData(prev => ({ 
                      ...prev, 
                      type: value,
                      color: selectedType?.color || prev.color
                    }));
                  }}
                >
                  <SelectTrigger>
                    <SelectValue>
                      {selectedEventType && (
                        <div className="flex items-center gap-2">
                          {selectedEventType.icon}
                          {selectedEventType.label}
                        </div>
                      )}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {eventTypeOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        <div className="flex items-center gap-2">
                          {option.icon}
                          {option.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Date and Time */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Date & Time
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startDate">Start Date *</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="startTime">Start Time *</Label>
                  <Input
                    id="startTime"
                    type="time"
                    value={formData.startTime}
                    onChange={(e) => setFormData(prev => ({ ...prev, startTime: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="endDate">End Date *</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="endTime">End Time *</Label>
                  <Input
                    id="endTime"
                    type="time"
                    value={formData.endTime}
                    onChange={(e) => setFormData(prev => ({ ...prev, endTime: e.target.value }))}
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Additional Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="location">Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="Enter location"
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="courseId">Course ID</Label>
                <Input
                  id="courseId"
                  value={formData.courseId}
                  onChange={(e) => setFormData(prev => ({ ...prev, courseId: e.target.value }))}
                  placeholder="e.g., c10-math"
                />
              </div>

              <div>
                <Label htmlFor="color">Event Color</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="color"
                    type="color"
                    value={formData.color}
                    onChange={(e) => setFormData(prev => ({ ...prev, color: e.target.value }))}
                    className="w-16 h-10"
                  />
                  <Badge style={{ backgroundColor: formData.color, color: 'white' }}>
                    Preview
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recurrence */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Repeat className="h-5 w-5" />
                Recurrence
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="isRecurring"
                  checked={formData.isRecurring}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isRecurring: checked }))}
                />
                <Label htmlFor="isRecurring">Make this a recurring event</Label>
              </div>

              {formData.isRecurring && (
                <div className="space-y-4 border-l-2 border-primary/20 pl-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Repeat Every</Label>
                      <Select 
                        value={recurrenceData.type} 
                        onValueChange={(value: RecurrencePattern['type']) => 
                          setRecurrenceData(prev => ({ ...prev, type: value }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daily">Day</SelectItem>
                          <SelectItem value="weekly">Week</SelectItem>
                          <SelectItem value="monthly">Month</SelectItem>
                          <SelectItem value="yearly">Year</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Interval</Label>
                      <Input
                        type="number"
                        min="1"
                        value={recurrenceData.interval}
                        onChange={(e) => setRecurrenceData(prev => ({ 
                          ...prev, 
                          interval: parseInt(e.target.value) || 1 
                        }))}
                      />
                    </div>
                  </div>

                  {recurrenceData.type === 'weekly' && (
                    <div>
                      <Label>Days of Week</Label>
                      <div className="flex gap-2 mt-2">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
                          <Button
                            key={day}
                            type="button"
                            variant={recurrenceData.daysOfWeek?.includes(index) ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => {
                              const currentDays = recurrenceData.daysOfWeek || [];
                              const newDays = currentDays.includes(index)
                                ? currentDays.filter(d => d !== index)
                                : [...currentDays, index];
                              setRecurrenceData(prev => ({ ...prev, daysOfWeek: newDays }));
                            }}
                          >
                            {day}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <Label htmlFor="recurrenceEnd">End Date</Label>
                    <Input
                      id="recurrenceEnd"
                      type="date"
                      value={recurrenceData.endDate}
                      onChange={(e) => setRecurrenceData(prev => ({ ...prev, endDate: e.target.value }))}
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex justify-end gap-2">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => handleOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Creating...' : 'Create Event'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}