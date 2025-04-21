
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface SidebarNavProps {
  items: {
    title: string;
    href: string;
    icon: LucideIcon;
    badge?: number;
  }[];
  className?: string;
}

export function SidebarNav({ items, className }: SidebarNavProps) {
  const location = useLocation();

  return (
    <nav className={cn("space-y-1", className)}>
      {items.map((item) => {
        const isActive = location.pathname === item.href;
        return (
          <Link
            key={item.href}
            to={item.href}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground",
              isActive 
                ? "bg-accent text-accent-foreground" 
                : "transparent"
            )}
          >
            <item.icon className="h-4 w-4" />
            <span>{item.title}</span>
            {item.badge && (
              <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                {item.badge}
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}
