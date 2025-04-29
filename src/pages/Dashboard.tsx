
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { StatsSection } from "@/components/dashboard/StatsSection";
import { OverviewTab } from "@/components/dashboard/OverviewTab";
import { RecentCasesTab } from "@/components/dashboard/RecentCasesTab";
import { AcquirersTab } from "@/components/dashboard/AcquirersTab";

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-6">
      <DashboardHeader />
      <StatsSection />
      
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="recent">Recent Cases</TabsTrigger>
          <TabsTrigger value="acquirers">Acquirers</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <OverviewTab />
        </TabsContent>

        <TabsContent value="recent" className="space-y-4">
          <RecentCasesTab />
        </TabsContent>

        <TabsContent value="acquirers" className="space-y-4">
          <AcquirersTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
