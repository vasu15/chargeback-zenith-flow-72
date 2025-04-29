
import React from 'react';

interface DashboardHeaderProps {
  lastUpdated?: string;
  title?: string;
  description?: string;
}

export function DashboardHeader({ 
  lastUpdated = "20 minutes ago",
  title = "Dashboard",
  description = "Manage and monitor all chargeback activity."
}: DashboardHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        <p className="text-muted-foreground">
          {description}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <div className="text-sm text-muted-foreground">Last updated: {lastUpdated}</div>
      </div>
    </div>
  );
}
