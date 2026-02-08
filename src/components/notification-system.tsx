"use client";

import { useState, useEffect } from "react";
import { Bell, X, CheckCircle, AlertCircle, Info, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: string;
  read: boolean;
  actionUrl?: string;
  actionText?: string;
}

// Mock notifications data
const mockNotifications: Notification[] = [
  {
    id: 'notif-1',
    title: 'New Assignment Submitted',
    message: 'Arjun Verma submitted "Essay on Photosynthesis"',
    type: 'info',
    timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    read: false,
    actionUrl: '/dashboard/teacher/grading/sub-1',
    actionText: 'Grade Now'
  },
  {
    id: 'notif-2',
    title: 'Quiz Completed',
    message: 'You completed the Mathematics Quiz with 85% score',
    type: 'success',
    timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    read: false,
    actionUrl: '/dashboard/student/quiz',
    actionText: 'View Results'
  },
  {
    id: 'notif-3',
    title: 'Assignment Due Soon',
    message: 'Physics Project is due in 2 days',
    type: 'warning',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    read: true,
    actionUrl: '/dashboard/student/courses',
    actionText: 'View Assignment'
  },
  {
    id: 'notif-4',
    title: 'Grade Updated',
    message: 'Your Chemistry Lab Report has been graded: B+',
    type: 'success',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    read: true,
  },
  {
    id: 'notif-5',
    title: 'New Course Available',
    message: 'Advanced Mathematics course is now available for enrollment',
    type: 'info',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    read: true,
    actionUrl: '/dashboard/student/courses',
    actionText: 'Explore Course'
  }
];

export function NotificationSystem() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [isOpen, setIsOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(n => ({ ...n, read: true }))
    );
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'warning':
        return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Info className="h-4 w-4 text-blue-600" />;
    }
  };

  const getTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - time.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return format(time, 'MMM dd');
  };

  // Simulate real-time notifications
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly add new notifications (for demo purposes)
      if (Math.random() < 0.1) { // 10% chance every 30 seconds
        const newNotification: Notification = {
          id: `notif-${Date.now()}`,
          title: 'New Activity',
          message: 'Something new happened in your dashboard',
          type: 'info',
          timestamp: new Date().toISOString(),
          read: false,
        };
        setNotifications(prev => [newNotification, ...prev]);
      }
    }, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {unreadCount > 9 ? '9+' : unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-semibold">Notifications</h3>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllAsRead}>
              Mark all read
            </Button>
          )}
        </div>
        
        <ScrollArea className="h-96">
          {notifications.length > 0 ? (
            <div className="p-2">
              {notifications.map((notification, index) => (
                <div key={notification.id}>
                  <Card 
                    className={`mb-2 cursor-pointer transition-colors ${
                      !notification.read ? 'bg-muted/50 border-primary/20' : 'hover:bg-muted/30'
                    }`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <CardContent className="p-3">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-0.5">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="text-sm font-medium line-clamp-1">
                              {notification.title}
                            </h4>
                            <div className="flex items-center gap-1">
                              {!notification.read && (
                                <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                              )}
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-4 w-4 flex-shrink-0"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeNotification(notification.id);
                                }}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                            {notification.message}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {getTimeAgo(notification.timestamp)}
                            </span>
                            {notification.actionUrl && notification.actionText && (
                              <Button variant="ghost" size="sm" className="h-6 text-xs">
                                {notification.actionText}
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  {index < notifications.length - 1 && <Separator className="my-1" />}
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-sm font-medium mb-1">No notifications</h3>
              <p className="text-xs text-muted-foreground">
                You're all caught up!
              </p>
            </div>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}