
import { useState } from "react";
import {
  AlertTriangle,
  Calendar,
  Check,
  Clock,
  Download,
  FileText,
  MessageSquare,
  PaperclipIcon,
  Upload,
  X,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { StatusBadge } from "@/components/ui/status-badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// Mocked case data
const caseData = {
  id: "CB-2023001",
  merchant: "E-Store Inc.",
  acquirer: "Acquirer Corp",
  amount: "256.78",
  currency: "USD",
  transactionDate: "2023-04-10",
  chargebackDate: "2023-04-18",
  reason: "Fraudulent Transaction",
  reasonCode: "10.4",
  description: "Customer claims they did not authorize this transaction",
  status: "Pending Merchant Response",
  assignedTo: "John Smith",
  priority: "High",
  documents: [
    {
      name: "Chargeback Notification.pdf",
      size: "245 KB",
      uploadedOn: "2023-04-18",
      uploadedBy: "System",
    },
    {
      name: "Transaction Receipt.pdf",
      size: "120 KB",
      uploadedOn: "2023-04-19",
      uploadedBy: "Merchant",
    },
  ],
  timeline: [
    {
      date: "2023-04-18 09:30 AM",
      action: "Case created",
      user: "System",
      description: "Chargeback received from Acquirer",
    },
    {
      date: "2023-04-18 10:15 AM",
      action: "Assigned",
      user: "Admin",
      description: "Case assigned to John Smith",
    },
    {
      date: "2023-04-18 11:20 AM",
      action: "Merchant Notified",
      user: "System",
      description: "Email sent to merchant requesting documentation",
    },
    {
      date: "2023-04-19 02:45 PM",
      action: "Documentation Received",
      user: "Merchant",
      description: "Merchant uploaded transaction receipt",
    },
    {
      date: "2023-04-20 10:30 AM",
      action: "Review Started",
      user: "John Smith",
      description: "Agent started reviewing merchant documentation",
    },
  ],
  notes: [
    {
      date: "2023-04-18 10:20 AM",
      user: "John Smith",
      content: "Initial review of case. Will need to request additional information from merchant.",
    },
    {
      date: "2023-04-19 03:15 PM",
      user: "John Smith",
      content: "Merchant documentation received, but IP address information is missing. Following up.",
    },
  ],
};

export function CaseDetail({ caseId }: { caseId: string }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [newNote, setNewNote] = useState("");

  // In a real app, we would fetch the case data based on caseId

  const handleAddNote = () => {
    if (!newNote.trim()) return;
    
    // In a real app, we would add the note to the database
    // and then refresh the data
    
    setNewNote("");
  };

  const getStatusVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending merchant response":
        return "pending";
      case "documentation received":
        return "info";
      case "in review":
        return "warning";
      case "resolved":
        return "success";
      case "rejected":
        return "destructive";
      default:
        return "default";
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex flex-col space-y-1.5">
          <div className="flex items-center justify-between">
            <CardTitle>Case {caseData.id}</CardTitle>
            <StatusBadge
              variant={getStatusVariant(caseData.status)}
              status={caseData.status}
            />
          </div>
          <CardDescription>
            {caseData.merchant} • {caseData.acquirer} • ${caseData.amount} {caseData.currency}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4 pt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">
                    Case Information
                  </h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="font-medium">Reason:</span>
                    </div>
                    <div>{caseData.reason}</div>
                    <div>
                      <span className="font-medium">Reason Code:</span>
                    </div>
                    <div>{caseData.reasonCode}</div>
                    <div>
                      <span className="font-medium">Transaction Date:</span>
                    </div>
                    <div>{caseData.transactionDate}</div>
                    <div>
                      <span className="font-medium">Chargeback Date:</span>
                    </div>
                    <div>{caseData.chargebackDate}</div>
                    <div>
                      <span className="font-medium">Priority:</span>
                    </div>
                    <div>
                      <StatusBadge
                        variant={caseData.priority === "High" ? "warning" : "default"}
                        status={caseData.priority}
                      />
                    </div>
                    <div>
                      <span className="font-medium">Assigned To:</span>
                    </div>
                    <div>{caseData.assignedTo}</div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">
                    Description
                  </h3>
                  <p className="text-sm rounded-md bg-muted p-3">
                    {caseData.description}
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">
                    Key Dates
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>Transaction Date: {caseData.transactionDate}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>Chargeback Date: {caseData.chargebackDate}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-warning" />
                      <span>Response Deadline: 2023-05-08</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">
                    Latest Activity
                  </h3>
                  <div className="space-y-3">
                    {caseData.timeline.slice(-3).map((item, i) => (
                      <div key={i} className="flex gap-3">
                        <div className="relative mt-1">
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted">
                            {item.action === "Case created" ? (
                              <FileText className="h-3 w-3" />
                            ) : item.action === "Assigned" ? (
                              <Check className="h-3 w-3" />
                            ) : item.action === "Merchant Notified" ? (
                              <MessageSquare className="h-3 w-3" />
                            ) : item.action === "Documentation Received" ? (
                              <Upload className="h-3 w-3" />
                            ) : (
                              <AlertTriangle className="h-3 w-3" />
                            )}
                          </div>
                          {i < caseData.timeline.slice(-3).length - 1 && (
                            <div className="absolute bottom-0 left-1/2 top-6 w-px -translate-x-1/2 bg-muted" />
                          )}
                        </div>
                        <div className="flex flex-col space-y-0.5 pb-3 text-sm">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{item.action}</span>
                            <span className="text-xs text-muted-foreground">
                              {item.date}
                            </span>
                          </div>
                          <span>{item.description}</span>
                          <span className="text-xs text-muted-foreground">
                            by {item.user}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="documents" className="space-y-4 pt-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-medium">Case Documents</h3>
              <Button size="sm">
                <Upload className="mr-2 h-4 w-4" />
                Upload Document
              </Button>
            </div>
            
            <div className="rounded-md border">
              <div className="grid grid-cols-4 gap-4 p-4 font-medium">
                <div>Document Name</div>
                <div>Size</div>
                <div>Uploaded On</div>
                <div>Actions</div>
              </div>
              {caseData.documents.map((doc, i) => (
                <div
                  key={i}
                  className="grid grid-cols-4 gap-4 border-t p-4 text-sm"
                >
                  <div className="flex items-center gap-2">
                    <PaperclipIcon className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{doc.name}</span>
                  </div>
                  <div>{doc.size}</div>
                  <div>
                    <div className="flex flex-col">
                      <span>{doc.uploadedOn}</span>
                      <span className="text-xs text-muted-foreground">
                        by {doc.uploadedBy}
                      </span>
                    </div>
                  </div>
                  <div>
                    <Button size="sm" variant="outline">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="timeline" className="space-y-4 pt-4">
            <h3 className="text-sm font-medium">Case Timeline</h3>
            <div className="space-y-6 pl-6">
              {caseData.timeline.map((item, i) => (
                <div key={i} className="relative flex gap-4">
                  <div className="absolute -left-6 top-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-muted">
                    {item.action === "Case created" ? (
                      <FileText className="h-3 w-3" />
                    ) : item.action === "Assigned" ? (
                      <Check className="h-3 w-3" />
                    ) : item.action === "Merchant Notified" ? (
                      <MessageSquare className="h-3 w-3" />
                    ) : item.action === "Documentation Received" ? (
                      <Upload className="h-3 w-3" />
                    ) : (
                      <AlertTriangle className="h-3 w-3" />
                    )}
                  </div>
                  {i < caseData.timeline.length - 1 && (
                    <div className="absolute -left-3.5 top-6 bottom-0 w-px bg-muted" />
                  )}
                  <div className="flex-1 space-y-1 pb-6 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{item.action}</span>
                      <span className="text-xs text-muted-foreground">
                        {item.date}
                      </span>
                    </div>
                    <p>{item.description}</p>
                    <p className="text-xs text-muted-foreground">by {item.user}</p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="notes" className="space-y-4 pt-4">
            <div className="flex flex-col gap-4">
              <div className="rounded-md border p-4">
                <h3 className="text-sm font-medium mb-3">Add Note</h3>
                <div className="space-y-3">
                  <Textarea
                    placeholder="Add a note about this case..."
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                  />
                  <Button
                    onClick={handleAddNote}
                    disabled={!newNote.trim()}
                  >
                    Add Note
                  </Button>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Previous Notes</h3>
                {caseData.notes.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No notes have been added to this case yet.
                  </div>
                ) : (
                  caseData.notes.map((note, i) => (
                    <div key={i} className="rounded-md border p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-xs">
                              {note.user
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium text-sm">{note.user}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {note.date}
                        </span>
                      </div>
                      <p className="text-sm">{note.content}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-6">
        <div className="flex gap-2">
          <Button variant="outline">
            <X className="mr-2 h-4 w-4" />
            Close Case
          </Button>
          <Button variant="outline">
            <AlertTriangle className="mr-2 h-4 w-4" />
            Escalate
          </Button>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <MessageSquare className="mr-2 h-4 w-4" />
            Contact Merchant
          </Button>
          <Button>
            <Check className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
