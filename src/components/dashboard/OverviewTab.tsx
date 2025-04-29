
import { AlertCircle, CreditCard, Users } from "lucide-react";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";

export function OverviewTab() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Case Distribution</CardTitle>
          <CardDescription>
            Current chargeback cases by status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <StatusBadge variant="pending">Pending</StatusBadge>
                <span className="text-sm">Merchant Review</span>
              </div>
              <span className="text-sm font-medium">48</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <StatusBadge variant="info">Processing</StatusBadge>
                <span className="text-sm">Acquirer Response</span>
              </div>
              <span className="text-sm font-medium">73</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <StatusBadge variant="warning">Escalated</StatusBadge>
                <span className="text-sm">Manual Review</span>
              </div>
              <span className="text-sm font-medium">24</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <StatusBadge variant="success">Resolved</StatusBadge>
                <span className="text-sm">Successfully closed</span>
              </div>
              <span className="text-sm font-medium">87</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <StatusBadge variant="destructive">Rejected</StatusBadge>
                <span className="text-sm">Lost disputes</span>
              </div>
              <span className="text-sm font-medium">24</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Top Merchants</CardTitle>
          <CardDescription>
            Merchants with the most chargebacks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                <Users className="h-4 w-4" />
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <div className="font-medium">E-Store Inc.</div>
                  <div className="text-sm">24</div>
                </div>
                <div className="h-2 w-full rounded-full bg-muted">
                  <div className="h-full w-[76%] rounded-full bg-primary" />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                <Users className="h-4 w-4" />
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <div className="font-medium">Gadget World</div>
                  <div className="text-sm">19</div>
                </div>
                <div className="h-2 w-full rounded-full bg-muted">
                  <div className="h-full w-[62%] rounded-full bg-primary" />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                <Users className="h-4 w-4" />
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <div className="font-medium">Fashion Express</div>
                  <div className="text-sm">17</div>
                </div>
                <div className="h-2 w-full rounded-full bg-muted">
                  <div className="h-full w-[54%] rounded-full bg-primary" />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Top Reason Codes</CardTitle>
          <CardDescription>
            Most common chargeback reasons
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                <AlertCircle className="h-4 w-4" />
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <div className="font-medium">Fraudulent Transaction</div>
                  <div className="text-sm">37%</div>
                </div>
                <div className="h-2 w-full rounded-full bg-muted">
                  <div className="h-full w-[37%] rounded-full bg-destructive" />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                <CreditCard className="h-4 w-4" />
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <div className="font-medium">Product Not Received</div>
                  <div className="text-sm">28%</div>
                </div>
                <div className="h-2 w-full rounded-full bg-muted">
                  <div className="h-full w-[28%] rounded-full bg-warning" />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                <AlertCircle className="h-4 w-4" />
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <div className="font-medium">Product Not as Described</div>
                  <div className="text-sm">18%</div>
                </div>
                <div className="h-2 w-full rounded-full bg-muted">
                  <div className="h-full w-[18%] rounded-full bg-info" />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
