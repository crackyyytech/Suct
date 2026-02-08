
"use client";

import { useState } from "react";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { PlusCircle, Calendar as CalendarIcon, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { type ScheduleEvent } from "@/lib/schedule-data";
import { curriculumData } from "@/lib/curriculum-data";
import { cn } from "@/lib/utils";

const eventTypes: ScheduleEvent['type'][] = ['exam', 'meeting', 'assignment', 'holiday'];
const classes = [...new Set(curriculumData.map(c => c.class))].sort((a, b) => parseInt(a.split(' ')[1]) - parseInt(b.split(' ')[1]));

export function AddEventDialog({ onEventAdded }: { onEventAdded: (event: ScheduleEvent) => void; }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const { toast } = useToast();
  
  const [title, setTitle] = useState('');
  const [eventClass, setEventClass] = useState('');
  const [type, setType] = useState<ScheduleEvent['type'] | ''>('');
  const [date, setDate] = useState<Date | undefined>();
  const [time, setTime] = useState('');

  const resetForm = () => {
      setTitle('');
      setEventClass('');
      setType('');
      setDate(undefined);
      setTime('');
  }

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    setIsCalendarOpen(false);
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!title || !eventClass || !type || !date || !time) {
        toast({
            variant: 'destructive',
            title: 'Missing Information',
            description: 'Please fill out all fields to add the event.',
        });
        return;
    }
    
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const newEvent: ScheduleEvent = {
        date: format(date, 'yyyy-MM-dd'),
        type: type as ScheduleEvent['type'],
        title,
        class: eventClass,
        time,
      };

      onEventAdded(newEvent);
      setIsLoading(false);
      setIsOpen(false);
      toast({
        title: "Event Added",
        description: `"${title}" has been added to the schedule.`,
      });
      resetForm();
    }, 1000);
  };
  
  const handleOpenChange = (open: boolean) => {
      setIsOpen(open);
      if (!open) {
          setTimeout(() => {
            resetForm();
          }, 300);
      }
  }


  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2" />
          Add Event
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Event</DialogTitle>
          <DialogDescription>
            Fill in the details below to add a new event to the schedule.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">Title</Label>
              <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="col-span-3" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">Type</Label>
                <Select onValueChange={(value) => setType(value as ScheduleEvent['type'])} value={type} required>
                    <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select event type" />
                    </SelectTrigger>
                    <SelectContent>
                        {eventTypes.map(t => <SelectItem key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</SelectItem>)}
                    </SelectContent>
                </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="class" className="text-right">Class</Label>
                <Select onValueChange={setEventClass} value={eventClass} required>
                    <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select a class" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="All Staff">All Staff</SelectItem>
                        <SelectItem value="All Classes">All Classes</SelectItem>
                        {classes.map((c) => (<SelectItem key={c} value={c}>{c}</SelectItem>))}
                    </SelectContent>
                </Select>
            </div>
             <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">Date</Label>
                <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                    <PopoverTrigger asChild>
                        <Button
                        variant={"outline"}
                        className={cn(
                            "col-span-3 justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                        )}
                        >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                        <Calendar
                        mode="single"
                        selected={date}
                        onSelect={handleDateSelect}
                        initialFocus
                        />
                    </PopoverContent>
                </Popover>
             </div>
             <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="time" className="text-right">Time</Label>
                <Input id="time" type="text" placeholder="e.g. 10:00 AM" value={time} onChange={(e) => setTime(e.target.value)} className="col-span-3" required />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => handleOpenChange(false)}>Cancel</Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? 'Adding...' : 'Add Event'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
