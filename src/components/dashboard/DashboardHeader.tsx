
import React from 'react';

interface DashboardHeaderProps {
  lastUpdated?: string;
}

export function DashboardHeader({ lastUpdated = "20 minutes ago" }: DashboardHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Manage and monitor all chargeback activity.
        </p>
      </div>
      <div className="flex items-center gap-2">
        <div className="text-sm text-muted-foreground">Last updated: {lastUpdated}</div>
      </div>
    </div>
  );
}
