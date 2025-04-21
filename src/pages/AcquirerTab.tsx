
import { useState } from "react";
import {
  Search,
  Filter,
  ArrowUpDown,
  Send,
  FileText,
  CheckCircle,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/components/ui/status-badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

// Mock data for acquirer cases
const mockPendingCases = Array.from({ length: 6 }).map((_, i) => ({
  id: `ACQ-${3000 + i}`,
  merchant: `Merchant ${i + 1}`,
  acquirer: `Acquirer ${(i % 2) + 1}`,
  amount: (300 + i * 125).toFixed(2),
  currency: "USD",
  date: new Date(2023, 3, 18 - i).toISOString().split("T")[0],
  reason: i % 3 === 0 ? "Fraud" : i % 3 === 1 ? "Product Not Received" : "Service Not Provided",
  merchantResponse: i % 3 === 0 ? "Proof Provided" : i % 3 === 1 ? "Accepted" : "Disputed with Evidence",
}));

const mockSentCases = Array.from({ length: 4 }).map((_, i) => ({
  id: `ACQ-${2000 + i}`,
  merchant: `Merchant ${i + 1}`,
  acquirer: `Acquirer ${(i % 3) + 1}`,
  amount: (350 + i * 100).toFixed(2),
  currency: "USD",
  date: new Date(2023, 3, 15 - i).toISOString().split("T")[0],
  sentDate: new Date(2023, 3, 16 - i).toISOString().split("T")[0],
  expectedResponse: new Date(2023, 3, 26 - i).toISOString().split("T")[0],
  status: i % 3 === 0 ? "Awaiting Response" : i % 3 === 1 ? "In Review" : "Resolved",
}));

export default function AcquirerTab() {
  const [activeTab, setActiveTab] = useState("pending");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPending, setFilteredPending] = useState(mockPendingCases);
  const [filteredSent, setFilteredSent] = useState(mockSentCases);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    if (!term.trim()) {
      setFilteredPending(mockPendingCases);
      setFilteredSent(mockSentCases);
      return;
    }
    
    const pendingFiltered = mockPendingCases.filter(
      (item) =>
        item.id.toLowerCase().includes(term.toLowerCase()) ||
        item.merchant.toLowerCase().includes(term.toLowerCase()) ||
        item.acquirer.toLowerCase().includes(term.toLowerCase()) ||
        item.reason.toLowerCase().includes(term.toLowerCase())
    );
    
    const sentFiltered = mockSentCases.filter(
      (item) =>
        item.id.toLowerCase().includes(term.toLowerCase()) ||
        item.merchant.toLowerCase().includes(term.toLowerCase()) ||
        item.acquirer.toLowerCase().includes(term.toLowerCase())
    );
    
    setFilteredPending(pendingFiltered);
    setFilteredSent(sentFiltered);
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Acquirer Cases</h1>
        <p className="text-muted-foreground">
          Manage cases ready to be sent to acquirers and track their responses.
        </p>
      </div>

      <Tabs defaultValue="pending" onValueChange={setActiveTab} value={activeTab}>
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="pending">
              Pending
              <span className="ml-2 rounded-full bg-muted px-2 py-0.5 text-xs">
                {mockPendingCases.length}
              </span>
            </TabsTrigger>
            <TabsTrigger value="sent">
              Sent
              <span className="ml-2 rounded-full bg-muted px-2 py-0.5 text-xs">
                {mockSentCases.length}
              </span>
            </TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search cases..."
                className="pl-8 w-[250px]"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <TabsContent value="pending" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Pending Acquirer Submission</CardTitle>
              <CardDescription>
                Cases ready to be submitted to acquirers based on merchant responses.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[120px]">
                      <Button variant="ghost" className="p-0 h-8 font-medium">
                        Case ID
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </Button>
                    </TableHead>
                    <TableHead>
                      <Button variant="ghost" className="p-0 h-8 font-medium">
                        Merchant
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </Button>
                    </TableHead>
                    <TableHead>
                      <Button variant="ghost" className="p-0 h-8 font-medium">
                        Acquirer
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </Button>
                    </TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Merchant Response</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPending.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-10">
                        No pending cases found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredPending.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.id}</TableCell>
                        <TableCell>{item.merchant}</TableCell>
                        <TableCell>{item.acquirer}</TableCell>
                        <TableCell className="text-right">${item.amount}</TableCell>
                        <TableCell>{item.reason}</TableCell>
                        <TableCell>
                          <StatusBadge 
                            variant={
                              item.merchantResponse === "Accepted" ? "success" :
                              item.merchantResponse === "Proof Provided" ? "info" : 
                              "warning"
                            } 
                            status={item.merchantResponse}
                          />
                        </TableCell>
                        <TableCell className="text-right">
                          <Button size="sm">
                            <Send className="mr-2 h-4 w-4" />
                            Submit
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sent" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Sent to Acquirers</CardTitle>
              <CardDescription>
                Cases that have been submitted to acquirers and awaiting resolution.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[120px]">
                      <Button variant="ghost" className="p-0 h-8 font-medium">
                        Case ID
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </Button>
                    </TableHead>
                    <TableHead>Merchant</TableHead>
                    <TableHead>Acquirer</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead>Sent Date</TableHead>
                    <TableHead>Expected Response</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSent.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-10">
                        No sent cases found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredSent.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.id}</TableCell>
                        <TableCell>{item.merchant}</TableCell>
                        <TableCell>{item.acquirer}</TableCell>
                        <TableCell className="text-right">${item.amount}</TableCell>
                        <TableCell>{item.sentDate}</TableCell>
                        <TableCell>{item.expectedResponse}</TableCell>
                        <TableCell>
                          <StatusBadge 
                            variant={
                              item.status === "Awaiting Response" ? "pending" :
                              item.status === "In Review" ? "info" : 
                              "success"
                            } 
                            status={item.status}
                          />
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button size="sm" variant="outline">
                              <FileText className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
