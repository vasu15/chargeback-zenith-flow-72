
import { useState } from "react";
import { BarChart, LineChart, Calendar, Download, Filter } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Reports() {
  const [timeframe, setTimeframe] = useState("month");

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Reports & Analytics</h1>
        <p className="text-muted-foreground">
          Track chargeback metrics and generate insights.
        </p>
      </div>

      <div className="flex items-center justify-between">
        <Tabs defaultValue="overview" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="merchants">Merchants</TabsTrigger>
            <TabsTrigger value="acquirers">Acquirers</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="flex items-center gap-2">
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Last 7 days</SelectItem>
              <SelectItem value="month">Last 30 days</SelectItem>
              <SelectItem value="quarter">Last quarter</SelectItem>
              <SelectItem value="year">Last year</SelectItem>
              <SelectItem value="custom">Custom range</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Calendar className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Chargebacks by Status</CardTitle>
            <CardDescription>
              Distribution of cases across statuses
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
            <div className="text-muted-foreground flex flex-col items-center">
              <BarChart className="h-16 w-16 mb-2" />
              <span>Chart visualization will be rendered here</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Chargeback Trends</CardTitle>
            <CardDescription>
              Case volume over time
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
            <div className="text-muted-foreground flex flex-col items-center">
              <LineChart className="h-16 w-16 mb-2" />
              <span>Chart visualization will be rendered here</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Top Merchant Breakdown</CardTitle>
            <CardDescription>
              Merchants with most chargebacks
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
            <div className="text-muted-foreground flex flex-col items-center">
              <BarChart className="h-16 w-16 mb-2" />
              <span>Chart visualization will be rendered here</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Key Performance Indicators</CardTitle>
          <CardDescription>
            Track the most important metrics for your chargeback workflow
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col space-y-1.5 p-6 border rounded-lg">
              <h3 className="text-sm font-medium text-muted-foreground">
                Success Rate
              </h3>
              <div className="text-2xl font-bold">68.4%</div>
              <div className="text-xs text-success">+4.2% vs. last period</div>
            </div>
            <div className="flex flex-col space-y-1.5 p-6 border rounded-lg">
              <h3 className="text-sm font-medium text-muted-foreground">
                Average Processing Time
              </h3>
              <div className="text-2xl font-bold">5.3 days</div>
              <div className="text-xs text-success">-1.2 days vs. last period</div>
            </div>
            <div className="flex flex-col space-y-1.5 p-6 border rounded-lg">
              <h3 className="text-sm font-medium text-muted-foreground">
                Merchant Response Rate
              </h3>
              <div className="text-2xl font-bold">76.8%</div>
              <div className="text-xs text-success">+2.7% vs. last period</div>
            </div>
            <div className="flex flex-col space-y-1.5 p-6 border rounded-lg">
              <h3 className="text-sm font-medium text-muted-foreground">
                Total Value Recovered
              </h3>
              <div className="text-2xl font-bold">$34,567</div>
              <div className="text-xs text-destructive">-$1,203 vs. last period</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Scheduled Reports</CardTitle>
          <CardDescription>
            Configure automated reports for your team
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="grid grid-cols-5 gap-4 p-4 font-medium">
              <div>Report Name</div>
              <div>Recipients</div>
              <div>Frequency</div>
              <div>Last Sent</div>
              <div>Actions</div>
            </div>
            {[
              {
                name: "Weekly Summary",
                recipients: "3 recipients",
                frequency: "Every Monday",
                lastSent: "Apr 15, 2023"
              },
              {
                name: "Monthly Performance",
                recipients: "5 recipients",
                frequency: "1st of month",
                lastSent: "Apr 1, 2023"
              },
              {
                name: "Acquirer Metrics",
                recipients: "2 recipients",
                frequency: "Every Friday",
                lastSent: "Apr 19, 2023"
              }
            ].map((report, i) => (
              <div
                key={i}
                className="grid grid-cols-5 gap-4 border-t p-4 text-sm"
              >
                <div className="font-medium">{report.name}</div>
                <div>{report.recipients}</div>
                <div>{report.frequency}</div>
                <div>{report.lastSent}</div>
                <div>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
