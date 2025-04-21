
import { useState } from "react";
import { FileUp, Upload } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StatusBadge } from "@/components/ui/status-badge";

export default function ChargebackUpload() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [acquirer, setAcquirer] = useState<string>("");
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const [processingStage, setProcessingStage] = useState<number>(0);
  const [processingSummary, setProcessingSummary] = useState<null | {
    total: number;
    duplicates: number;
    drafts: number;
    merchant: number;
    acquirer: number;
  }>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
    setUploadStatus(null);
    setProcessingStage(0);
    setProcessingSummary(null);
  };

  const handleAcquirerChange = (value: string) => {
    setAcquirer(value);
  };

  const handleUpload = () => {
    if (!selectedFile || !acquirer) {
      setUploadStatus("error");
      return;
    }

    // Simulate processing with a timeout
    setUploadStatus("processing");
    setProcessingStage(1);

    // Simulate file validation
    setTimeout(() => {
      setProcessingStage(2);
      
      // Simulate header extraction
      setTimeout(() => {
        setProcessingStage(3);
        
        // Simulate duplicate check
        setTimeout(() => {
          setProcessingStage(4);
          
          // Simulate template generation
          setTimeout(() => {
            setProcessingStage(5);
            
            // Simulate case distribution
            setTimeout(() => {
              setUploadStatus("success");
              setProcessingSummary({
                total: 32,
                duplicates: 3,
                drafts: 5,
                merchant: 15,
                acquirer: 9
              });
            }, 1000);
          }, 800);
        }, 800);
      }, 1000);
    }, 1000);
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Upload Chargebacks</h1>
        <p className="text-muted-foreground">
          Process new chargeback cases from acquirers.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Upload New Cases</CardTitle>
            <CardDescription>
              Select an acquirer and upload their chargeback file to process.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="acquirer">Acquirer</Label>
              <Select value={acquirer} onValueChange={handleAcquirerChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select an acquirer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="acquirer1">Acquirer 1</SelectItem>
                  <SelectItem value="acquirer2">Acquirer 2</SelectItem>
                  <SelectItem value="acquirer3">Acquirer 3</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="file">Chargeback File</Label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-muted-foreground/25 px-6 py-10">
                <div className="text-center">
                  {!selectedFile ? (
                    <>
                      <FileUp className="mx-auto h-12 w-12 text-muted-foreground" />
                      <div className="mt-4 flex text-sm leading-6 text-muted-foreground">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer rounded-md bg-background font-semibold text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-primary"
                        >
                          <span>Upload a file</span>
                          <Input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                            onChange={handleFileChange}
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs leading-5 text-muted-foreground">
                        CSV, Excel or PDF up to 10MB
                      </p>
                    </>
                  ) : (
                    <div className="space-y-2">
                      <FileUp className="mx-auto h-12 w-12 text-primary" />
                      <div className="text-sm font-medium">{selectedFile.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {(selectedFile.size / 1024).toFixed(2)} KB
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedFile(null)}
                      >
                        Remove
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full"
              onClick={handleUpload}
              disabled={!selectedFile || !acquirer || uploadStatus === "processing"}
            >
              {uploadStatus === "processing" ? (
                <span className="flex items-center gap-2">
                  <Upload className="h-4 w-4 animate-spin" />
                  Processing...
                </span>
              ) : (
                "Upload and Process"
              )}
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Processing Status</CardTitle>
            <CardDescription>
              Track the status of your file processing.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {!uploadStatus ? (
                <div className="py-8 text-center text-muted-foreground">
                  Upload a file to see processing status
                </div>
              ) : uploadStatus === "error" ? (
                <div className="py-8 text-center text-destructive">
                  Error: Please select both an acquirer and a file
                </div>
              ) : (
                <>
                  <div className="space-y-4">
                    {[
                      "Validating file",
                      "Extracting headers",
                      "Checking for duplicates",
                      "Generating master sheet",
                      "Distributing cases"
                    ].map((step, index) => (
                      <div 
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <div 
                            className={`flex h-8 w-8 items-center justify-center rounded-full 
                              ${index < processingStage ? "bg-success text-success-foreground" : 
                                index === processingStage && uploadStatus === "processing" ? "bg-primary text-primary-foreground" : 
                                "bg-muted text-muted-foreground"}`}
                          >
                            {index + 1}
                          </div>
                          <span className="text-sm font-medium">{step}</span>
                        </div>
                        <StatusBadge
                          variant={
                            index < processingStage
                              ? "success"
                              : index === processingStage && uploadStatus === "processing"
                              ? "pending"
                              : "secondary"
                          }
                          status={
                            index < processingStage
                              ? "Complete"
                              : index === processingStage && uploadStatus === "processing"
                              ? "Processing"
                              : "Waiting"
                          }
                        />
                      </div>
                    ))}
                  </div>

                  {processingSummary && (
                    <div className="rounded-lg bg-muted p-4">
                      <h4 className="mb-2 font-medium">Processing Summary</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Total Records:</span>
                          <span className="font-medium">{processingSummary.total}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Duplicates:</span>
                          <span className="font-medium">{processingSummary.duplicates}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Drafts Queue:</span>
                          <span className="font-medium">{processingSummary.drafts}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Merchant Queue:</span>
                          <span className="font-medium">{processingSummary.merchant}</span>
                        </div>
                        <div className="col-span-2 flex justify-between">
                          <span className="text-muted-foreground">Acquirer Queue:</span>
                          <span className="font-medium">{processingSummary.acquirer}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
