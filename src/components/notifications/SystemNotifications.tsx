
import { useState } from "react";
import { AlertCircle, Bell, Info, X } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type NotificationType = "info" | "alert" | "system";

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export function SystemNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "info",
      title: "New chargebacks received",
      message: "15 new chargeback cases have been uploaded to the system.",
      time: "10 minutes ago",
      read: false,
    },
    {
      id: "2",
      type: "alert",
      title: "Case #CB-2023015 requires attention",
      message: "This case has been escalated and requires manual review.",
      time: "1 hour ago",
      read: false,
    },
    {
      id: "3",
      type: "system",
      title: "System maintenance",
      message: "Scheduled maintenance will occur on April 25th at 2:00 AM UTC.",
      time: "3 hours ago",
      read: true,
    },
    {
      id: "4",
      type: "info",
      title: "Acquirer API updated",
      message: "Acquirer 2 has updated their API. Please check integration.",
      time: "Yesterday",
      read: true,
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const getIconForType = (type: NotificationType) => {
    switch (type) {
      case "info":
        return <Info className="h-4 w-4 text-blue-500" />;
      case "alert":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case "system":
        return <Bell className="h-4 w-4 text-amber-500" />;
      default:
        return <Info className="h-4 w-4" />;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <Badge
              className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center"
              variant="destructive"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[350px]">
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>Notifications</span>
          {unreadCount > 0 && (
            <Badge variant="secondary" className="ml-2">
              {unreadCount} new
            </Badge>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {notifications.length === 0 ? (
          <div className="p-4 text-center text-muted-foreground">
            No notifications
          </div>
        ) : (
          <DropdownMenuGroup className="max-h-[400px] overflow-auto">
            {notifications.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className={`p-0 focus:bg-transparent ${
                  !notification.read ? "bg-muted/50" : ""
                }`}
              >
                <Card className="w-full border-0 shadow-none">
                  <CardHeader className="p-3 pb-1">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        {getIconForType(notification.type)}
                        <CardTitle className="text-sm">
                          {notification.title}
                        </CardTitle>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => markAsRead(notification.id)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                    <CardDescription className="text-xs">
                      {notification.time}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-3 pt-0">
                    <p className="text-xs">{notification.message}</p>
                  </CardContent>
                </Card>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        )}
        <DropdownMenuSeparator />
        <div className="p-2 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            className="text-xs"
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
          >
            Mark all as read
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-xs"
            onClick={clearNotifications}
            disabled={notifications.length === 0}
          >
            Clear all
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
