
import { useState } from "react";
import {
  Search,
  Filter,
  ArrowUpDown,
  ChevronDown,
  ChevronUp,
  Eye,
  Check,
  X,
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
import { useToast } from "@/hooks/use-toast";

// Mock data for merchant cases
const mockPendingCases = Array.from({ length: 6 }).map((_, i) => ({
  id: `MC-${3000 + i}`,
  merchant: `Merchant ${i + 1}`,
  acquirer: `Acquirer ${(i % 2) + 1}`,
  amount: (300 + i * 125).toFixed(2),
  currency: "USD",
  date: new Date(2023, 3, 18 - i).toISOString().split("T")[0],
  reason: i % 3 === 0 ? "Fraud" : i % 3 === 1 ? "Product Not Received" : "Service Not Provided",
  dueDate: new Date(2023, 3, 28 - i).toISOString().split("T")[0],
  proofStatus: i % 3 === 0 ? "Submitted" : i % 3 === 1 ? "Not Submitted" : "Accepted",
  details: "Customer claims they did not receive the product as described. Transaction was made online on March 15, 2023.",
  customerDetails: "John Doe, New York, Last 4 card digits: 1234",
  proofItems: i % 3 === 0 ? [
    { name: "Delivery Confirmation.pdf", date: "2023-04-05" },
    { name: "Transaction Receipt.pdf", date: "2023-04-05" }
  ] : []
}));

const mockSentCases = Array.from({ length: 4 }).map((_, i) => ({
  id: `MC-${2000 + i}`,
  merchant: `Merchant ${i + 1}`,
  acquirer: `Acquirer ${(i % 3) + 1}`,
  amount: (350 + i * 100).toFixed(2),
  currency: "USD",
  date: new Date(2023, 3, 15 - i).toISOString().split("T")[0],
  sentDate: new Date(2023, 3, 16 - i).toISOString().split("T")[0],
  reason: i % 2 === 0 ? "Fraud" : "Product Not Received",
  status: i % 3 === 0 ? "Under Review" : i % 3 === 1 ? "Pending Decision" : "Resolved",
  details: "Case submitted with evidence. Awaiting acquirer decision.",
  customerDetails: "Jane Smith, Chicago, Last 4 card digits: 5678",
  proofItems: [
    { name: "Evidence Document.pdf", date: "2023-04-10" },
    { name: "Customer Correspondence.pdf", date: "2023-04-11" }
  ]
}));

export default function MerchantTab() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("pending");
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});
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
        item.acquirer.toLowerCase().includes(term.toLowerCase()) ||
        item.reason.toLowerCase().includes(term.toLowerCase())
    );
    
    setFilteredPending(pendingFiltered);
    setFilteredSent(sentFiltered);
  };

  const toggleRowExpand = (id: string) => {
    setExpandedRows(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleAccept = (id: string) => {
    toast({
      title: "Case Accepted",
      description: `You've accepted the chargeback for case ${id}`,
    });
    
    // In a real app, you would update the case status in your backend
    setFilteredPending(prev => 
      prev.map(item => 
        item.id === id ? { ...item, proofStatus: "Accepted" } : item
      )
    );
  };

  const handleReject = (id: string) => {
    toast({
      title: "Case Rejected",
      description: `You've rejected the chargeback for case ${id}. Please upload evidence.`,
    });
    
    // In a real app, you would update the case status and prompt for evidence upload
  };

  const getProofStatusVariant = (status: string) => {
    switch (status) {
      case "Submitted": return "info";
      case "Not Submitted": return "warning";
      case "Accepted": return "success";
      default: return "default";
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Merchant Cases</h1>
        <p className="text-muted-foreground">
          Respond to chargeback claims and track case status.
        </p>
      </div>

      <Tabs defaultValue="pending" onValueChange={setActiveTab} value={activeTab}>
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="pending">
              Pending Response
              <span className="ml-2 rounded-full bg-muted px-2 py-0.5 text-xs">
                {mockPendingCases.length}
              </span>
            </TabsTrigger>
            <TabsTrigger value="sent">
              Submitted
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
              <CardTitle>Cases Requiring Response</CardTitle>
              <CardDescription>
                Review chargeback claims and submit evidence or accept the chargeback.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">
                      <Button variant="ghost" className="p-0 h-8 font-medium">
                        Case ID
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </Button>
                    </TableHead>
                    <TableHead>
                      <Button variant="ghost" className="p-0 h-8 font-medium">
                        Date
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </Button>
                    </TableHead>
                    <TableHead>Acquirer</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Proof Status</TableHead>
                    <TableHead className="text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPending.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-10">
                        No pending cases found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredPending.map((item) => (
                      <>
                        <TableRow key={item.id} className={expandedRows[item.id] ? "bg-muted/50" : ""}>
                          <TableCell className="font-medium">{item.id}</TableCell>
                          <TableCell>{item.date}</TableCell>
                          <TableCell>{item.acquirer}</TableCell>
                          <TableCell className="text-right">${item.amount}</TableCell>
                          <TableCell>{item.reason}</TableCell>
                          <TableCell>{item.dueDate}</TableCell>
                          <TableCell>
                            <StatusBadge 
                              variant={getProofStatusVariant(item.proofStatus)} 
                              status={item.proofStatus}
                            />
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center justify-center gap-2">
                              <Button 
                                size="sm" 
                                variant="outline" 
                                onClick={() => toggleRowExpand(item.id)}
                              >
                                <Eye className="mr-1 h-4 w-4" />
                                View
                                {expandedRows[item.id] ? (
                                  <ChevronUp className="ml-1 h-4 w-4" />
                                ) : (
                                  <ChevronDown className="ml-1 h-4 w-4" />
                                )}
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                        {expandedRows[item.id] && (
                          <TableRow className="bg-muted/50">
                            <TableCell colSpan={8} className="p-4">
                              <div className="space-y-4">
                                <div>
                                  <h4 className="font-medium mb-1">Case Details</h4>
                                  <p className="text-sm">{item.details}</p>
                                </div>
                                
                                <div>
                                  <h4 className="font-medium mb-1">Customer Information</h4>
                                  <p className="text-sm">{item.customerDetails}</p>
                                </div>
                                
                                <div>
                                  <h4 className="font-medium mb-1">Submitted Evidence</h4>
                                  {item.proofItems.length > 0 ? (
                                    <ul className="text-sm space-y-1">
                                      {item.proofItems.map((proof, idx) => (
                                        <li key={idx} className="flex items-center gap-2">
                                          <span>{proof.name}</span>
                                          <span className="text-xs text-muted-foreground">
                                            (Uploaded on {proof.date})
                                          </span>
                                        </li>
                                      ))}
                                    </ul>
                                  ) : (
                                    <p className="text-sm text-muted-foreground">
                                      No evidence submitted yet.
                                    </p>
                                  )}
                                </div>
                                
                                <div className="flex gap-2">
                                  {item.proofStatus !== "Accepted" && (
                                    <>
                                      <Button 
                                        onClick={() => handleAccept(item.id)}
                                        variant="outline"
                                      >
                                        <Check className="mr-2 h-4 w-4" />
                                        Accept Chargeback
                                      </Button>
                                      <Button
                                        onClick={() => handleReject(item.id)}
                                      >
                                        <X className="mr-2 h-4 w-4" />
                                        Dispute & Upload Evidence
                                      </Button>
                                    </>
                                  )}
                                  {item.proofStatus === "Accepted" && (
                                    <p className="text-sm text-muted-foreground italic">
                                      You have accepted this chargeback case.
                                    </p>
                                  )}
                                </div>
                              </div>
                            </TableCell>
                          </TableRow>
                        )}
                      </>
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
              <CardTitle>Submitted Cases</CardTitle>
              <CardDescription>
                Review cases you've already responded to and track their status.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">
                      <Button variant="ghost" className="p-0 h-8 font-medium">
                        Case ID
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </Button>
                    </TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Acquirer</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Response Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSent.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-10">
                        No submitted cases found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredSent.map((item) => (
                      <>
                        <TableRow key={item.id} className={expandedRows[item.id] ? "bg-muted/50" : ""}>
                          <TableCell className="font-medium">{item.id}</TableCell>
                          <TableCell>{item.date}</TableCell>
                          <TableCell>{item.acquirer}</TableCell>
                          <TableCell className="text-right">${item.amount}</TableCell>
                          <TableCell>{item.reason}</TableCell>
                          <TableCell>{item.sentDate}</TableCell>
                          <TableCell>
                            <StatusBadge 
                              variant={
                                item.status === "Under Review" ? "pending" :
                                item.status === "Pending Decision" ? "warning" : 
                                "success"
                              } 
                              status={item.status}
                            />
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center justify-center">
                              <Button 
                                size="sm" 
                                variant="outline" 
                                onClick={() => toggleRowExpand(item.id)}
                              >
                                <Eye className="mr-1 h-4 w-4" />
                                View
                                {expandedRows[item.id] ? (
                                  <ChevronUp className="ml-1 h-4 w-4" />
                                ) : (
                                  <ChevronDown className="ml-1 h-4 w-4" />
                                )}
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                        {expandedRows[item.id] && (
                          <TableRow className="bg-muted/50">
                            <TableCell colSpan={8} className="p-4">
                              <div className="space-y-4">
                                <div>
                                  <h4 className="font-medium mb-1">Case Details</h4>
                                  <p className="text-sm">{item.details}</p>
                                </div>
                                
                                <div>
                                  <h4 className="font-medium mb-1">Customer Information</h4>
                                  <p className="text-sm">{item.customerDetails}</p>
                                </div>
                                
                                <div>
                                  <h4 className="font-medium mb-1">Submitted Evidence</h4>
                                  {item.proofItems.length > 0 ? (
                                    <ul className="text-sm space-y-1">
                                      {item.proofItems.map((proof, idx) => (
                                        <li key={idx} className="flex items-center gap-2">
                                          <span>{proof.name}</span>
                                          <span className="text-xs text-muted-foreground">
                                            (Uploaded on {proof.date})
                                          </span>
                                        </li>
                                      ))}
                                    </ul>
                                  ) : (
                                    <p className="text-sm text-muted-foreground">
                                      No evidence was submitted.
                                    </p>
                                  )}
                                </div>
                                
                                <div className="text-sm text-muted-foreground italic">
                                  {item.status === "Resolved" 
                                    ? "This case has been resolved. No further action is required."
                                    : "Your response has been submitted. Awaiting decision from the acquirer."}
                                </div>
                              </div>
                            </TableCell>
                          </TableRow>
                        )}
                      </>
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

