
import { 
  AlertCircle, 
  BarChart3, 
  Clock, 
  CreditCard, 
  DollarSign, 
  FileText, 
  Users 
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatCard } from "@/components/dashboard/StatCard";
import { StatusBadge } from "@/components/ui/status-badge";

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Manage and monitor all chargeback activity.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-sm text-muted-foreground">Last updated: 20 minutes ago</div>
        </div>
      </div>

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

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="recent">Recent Cases</TabsTrigger>
          <TabsTrigger value="acquirers">Acquirers</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
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
        </TabsContent>

        <TabsContent value="recent" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Chargeback Cases</CardTitle>
              <CardDescription>
                The latest 10 cases in the system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {/* Placeholder for recent cases table */}
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
        </TabsContent>

        <TabsContent value="acquirers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Connected Acquirers</CardTitle>
              <CardDescription>
                All acquirers configured in the system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {/* Placeholder for acquirers table */}
                <div className="rounded-md border">
                  <div className="grid grid-cols-4 gap-4 p-4 font-medium">
                    <div>Acquirer</div>
                    <div>Cases</div>
                    <div>Success Rate</div>
                    <div>Last Update</div>
                  </div>
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div
                      key={i}
                      className="grid grid-cols-4 gap-4 border-t p-4 text-sm"
                    >
                      <div className="font-medium">Acquirer {i + 1}</div>
                      <div>{50 - i * 15}</div>
                      <div>{65 + i * 5}%</div>
                      <div>3 hours ago</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
