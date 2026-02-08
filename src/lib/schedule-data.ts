
import { addDays, format, startOfWeek } from 'date-fns';

export type ScheduleEvent = {
  date: string; // YYYY-MM-DD
  type: 'exam' | 'meeting' | 'assignment' | 'holiday';
  title: string;
  class: string;
  time: string;
};

const today = new Date();
const startOfThisWeek = startOfWeek(today, { weekStartsOn: 1 }); // Monday

export const scheduleData: ScheduleEvent[] = [
  { 
    date: format(today, 'yyyy-MM-dd'), 
    type: 'meeting', 
    title: 'Weekly Staff Sync', 
    class: 'All Staff', 
    time: '3:00 PM' 
  },
  { 
    date: format(addDays(startOfThisWeek, 2), 'yyyy-MM-dd'), // Wednesday
    type: 'assignment', 
    title: 'Mathematics Ch.2 Homework Due', 
    class: 'Class 10', 
    time: '11:59 PM' 
  },
  { 
    date: format(addDays(startOfThisWeek, 4), 'yyyy-MM-dd'), // Friday
    type: 'exam', 
    title: 'Physics Unit Test - Laws of Motion', 
    class: 'Class 11', 
    time: '10:00 AM' 
  },
  { 
    date: format(addDays(startOfThisWeek, 4), 'yyyy-MM-dd'), // Friday
    type: 'exam', 
    title: 'English Poem Recitation', 
    class: 'Class 9', 
    time: '1:00 PM' 
  },
  { 
    date: format(addDays(startOfThisWeek, 7), 'yyyy-MM-dd'), // Next Monday
    type: 'holiday', 
    title: 'Public Holiday', 
    class: 'All Classes', 
    time: 'All Day' 
  },
  { 
    date: format(addDays(startOfThisWeek, 9), 'yyyy-MM-dd'), // Next Wednesday
    type: 'meeting', 
    title: 'Parent-Teacher Meeting (Class 12)', 
    class: 'Class 12', 
    time: '4:00 PM' 
  },
];
