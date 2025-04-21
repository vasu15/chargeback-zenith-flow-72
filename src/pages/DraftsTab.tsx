
import { useState } from "react";
import { Search, Filter, ArrowUpDown } from "lucide-react";
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

// Mock data for drafts
const mockDrafts = Array.from({ length: 10 }).map((_, i) => ({
  id: `DRAFT-${1000 + i}`,
  merchant: `Merchant ${i + 1}`,
  amount: (100 + i * 50).toFixed(2),
  currency: "USD",
  date: new Date(2023, 3, 20 - i).toISOString().split("T")[0],
  reason: i % 3 === 0 ? "Fraud" : i % 3 === 1 ? "Product Not Received" : "Service Not Provided",
  missingInfo: i % 2 === 0 ? "Merchant ID" : "Transaction Date",
}));

export default function DraftsTab() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(mockDrafts);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    if (!term.trim()) {
      setFilteredData(mockDrafts);
      return;
    }
    
    const filtered = mockDrafts.filter(
      (item) =>
        item.id.toLowerCase().includes(term.toLowerCase()) ||
        item.merchant.toLowerCase().includes(term.toLowerCase()) ||
        item.reason.toLowerCase().includes(term.toLowerCase())
    );
    
    setFilteredData(filtered);
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Drafts</h1>
        <p className="text-muted-foreground">
          Cases requiring additional information before processing.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Draft Cases</CardTitle>
          <CardDescription>
            These cases are missing information and require completion before they can be
            processed.
          </CardDescription>
          <div className="flex items-center gap-2 mt-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search drafts..."
                className="pl-8"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
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
                <TableHead className="text-right">
                  <Button variant="ghost" className="p-0 h-8 font-medium">
                    Amount
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Missing Information</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-10">
                    No draft cases found
                  </TableCell>
                </TableRow>
              ) : (
                filteredData.map((draft) => (
                  <TableRow key={draft.id}>
                    <TableCell className="font-medium">{draft.id}</TableCell>
                    <TableCell>{draft.merchant}</TableCell>
                    <TableCell className="text-right">${draft.amount}</TableCell>
                    <TableCell>{draft.date}</TableCell>
                    <TableCell>{draft.reason}</TableCell>
                    <TableCell>
                      <StatusBadge 
                        variant="warning" 
                        status={draft.missingInfo}
                      />
                    </TableCell>
                    <TableCell className="text-right">
                      <Button size="sm" variant="outline">
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
