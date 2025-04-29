
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";

export function RecentCasesTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Chargeback Cases</CardTitle>
        <CardDescription>
          The latest 10 cases in the system
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="rounded-md border">
            <div className="grid grid-cols-5 gap-4 p-4 font-medium">
              <div>Case ID</div>
              <div>Merchant</div>
              <div>Amount</div>
              <div>Date</div>
              <div>Status</div>
            </div>
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="grid grid-cols-5 gap-4 border-t p-4 text-sm"
              >
                <div className="font-medium">CB-{2023001 + i}</div>
                <div>Merchant {i + 1}</div>
                <div>${(100 + i * 25).toFixed(2)}</div>
                <div>Apr {20 - i}, 2023</div>
                <div>
                  <StatusBadge
                    variant={
                      i === 0
                        ? "pending"
                        : i === 1
                        ? "info"
                        : i === 2
                        ? "warning"
                        : i === 3
                        ? "success"
                        : "destructive"
                    }
                    status={
                      i === 0
                        ? "Pending"
                        : i === 1
                        ? "Processing"
                        : i === 2
                        ? "Escalated"
                        : i === 3
                        ? "Resolved"
                        : "Rejected"
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
