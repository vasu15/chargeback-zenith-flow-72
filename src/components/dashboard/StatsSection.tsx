
import { BarChart3, Clock, DollarSign, FileText } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";

export function StatsSection() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total Chargebacks"
        value="256"
        description="This month"
        icon={FileText}
        trend={{ value: 12, positive: true }}
      />
      <StatCard
        title="Pending Review"
        value="42"
        description="Requiring attention"
        icon={Clock}
        trend={{ value: 8, positive: false }}
      />
      <StatCard
        title="Dispute Value"
        value="$12,543.00"
        description="Current pipeline"
        icon={DollarSign}
      />
      <StatCard
        title="Success Rate"
        value="68%"
        description="Last 30 days"
        icon={BarChart3}
        trend={{ value: 5, positive: true }}
      />
    </div>
  );
}
