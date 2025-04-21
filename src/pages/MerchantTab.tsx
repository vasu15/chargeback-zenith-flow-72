
import { useState } from "react";
import {
  Search,
  Filter,
  ArrowUpDown,
  Send,
  MailCheck,
  MessageSquare,
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

// Mock data for merchant cases
const mockPendingCases = Array.from({ length: 8 }).map((_, i) => ({
  id: `MCH-${2000 + i}`,
  merchant: `Merchant ${i + 1}`,
  amount: (200 + i * 75).toFixed(2),
  currency: "USD",
  date: new Date(2023, 3, 20 - i).toISOString().split("T")[0],
  reason: i % 3 === 0 ? "Fraud" : i % 3 === 1 ? "Product Not Received" : "Service Not Provided",
  communicationMethod: i % 2 === 0 ? "Email" : "API",
}));

const mockSentCases = Array.from({ length: 5 }).map((_, i) => ({
  id: `MCH-${1000 + i}`,
  merchant: `Merchant ${i + 1}`,
  amount: (150 + i * 60).toFixed(2),
  currency: "USD",
  date: new Date(2023, 3, 15 - i).toISOString().split("T")[0],
  reason: i % 3 === 0 ? "Fraud" : i % 3 === 1 ? "Product Not Received" : "Service Not Provided",
  sentDate: new Date(2023, 3, 16 - i).toISOString().split("T")[0],
  responseStatus: i % 3 === 0 ? "Awaiting Response" : i % 3 === 1 ? "Documentation Received" : "Accepted",
}));

export default function MerchantTab() {
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
        item.reason.toLowerCase().includes(term.toLowerCase())
    );
    
    const sentFiltered = mockSentCases.filter(
      (item) =>
        item.id.toLowerCase().includes(term.toLowerCase()) ||
        item.merchant.toLowerCase().includes(term.toLowerCase()) ||
        item.reason.toLowerCase().includes(term.toLowerCase())
    );
    
    setFilteredPending(pendingFiltered);
    setFilteredSent(sentFiltered);
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Merchant Cases</h1>
        <p className="text-muted-foreground">
          Manage cases requiring merchant input and review their responses.
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
              <CardTitle>Pending Merchant Review</CardTitle>
              <CardDescription>
                Cases that need to be sent to merchants for their input.
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
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Communication</TableHead>
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
                        <TableCell className="text-right">${item.amount}</TableCell>
                        <TableCell>{item.date}</TableCell>
                        <TableCell>{item.reason}</TableCell>
                        <TableCell>
                          <StatusBadge 
                            variant={item.communicationMethod === "Email" ? "info" : "default"} 
                            status={item.communicationMethod}
                          />
                        </TableCell>
                        <TableCell className="text-right">
                          <Button size="sm">
                            <Send className="mr-2 h-4 w-4" />
                            Send
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
              <CardTitle>Sent to Merchants</CardTitle>
              <CardDescription>
                Cases that have been sent to merchants and awaiting their response.
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
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead>Sent Date</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSent.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-10">
                        No sent cases found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredSent.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.id}</TableCell>
                        <TableCell>{item.merchant}</TableCell>
                        <TableCell className="text-right">${item.amount}</TableCell>
                        <TableCell>{item.sentDate}</TableCell>
                        <TableCell>{item.reason}</TableCell>
                        <TableCell>
                          <StatusBadge 
                            variant={
                              item.responseStatus === "Awaiting Response" ? "pending" :
                              item.responseStatus === "Documentation Received" ? "info" : 
                              "success"
                            } 
                            status={item.responseStatus}
                          />
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button size="sm" variant="outline">
                              <MailCheck className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <MessageSquare className="h-4 w-4" />
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
