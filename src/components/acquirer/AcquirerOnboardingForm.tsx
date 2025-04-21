
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

export function AcquirerOnboardingForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const [headers, setHeaders] = useState<string[]>([]);
  const [mappings, setMappings] = useState<Record<string, string>>({});
  
  const steps = [
    { id: "basic", label: "Basic Info" },
    { id: "files", label: "Sample Files" },
    { id: "mapping", label: "Field Mapping" },
    { id: "review", label: "Review" },
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    setFile(selectedFile);
    
    // Simulate header extraction (in a real app, you'd parse the file)
    if (selectedFile) {
      // Mock headers extraction
      setHeaders([
        "Transaction ID",
        "Transaction Date",
        "Merchant ID",
        "Amount",
        "Currency",
        "Card Type",
        "Reason Code"
      ]);
    }
  };
  
  const handleMappingChange = (header: string, value: string) => {
    setMappings(prev => ({
      ...prev,
      [header]: value
    }));
  };
  
  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Acquirer Onboarding</CardTitle>
        <CardDescription>
          Set up a new acquirer to process chargebacks through our system.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex flex-col items-center">
                <div 
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                    index === currentStep
                      ? "border-primary bg-primary text-primary-foreground"
                      : index < currentStep
                      ? "border-primary bg-primary/20 text-primary"
                      : "border-muted bg-muted text-muted-foreground"
                  }`}
                >
                  {index + 1}
                </div>
                <span className="mt-2 text-xs">{step.label}</span>
              </div>
            ))}
          </div>
          <div className="relative mt-4">
            <div className="absolute top-1/2 left-0 right-0 h-[2px] -translate-y-1/2 bg-muted" />
            <div
              className="absolute top-1/2 left-0 h-[2px] -translate-y-1/2 bg-primary transition-all"
              style={{
                width: `${(currentStep / (steps.length - 1)) * 100}%`,
              }}
            />
          </div>
        </div>

        <Tabs value={steps[currentStep].id} className="w-full">
          <TabsContent value="basic" className="mt-0">
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="acquirerName">Acquirer Name</Label>
                  <Input id="acquirerName" placeholder="Enter acquirer name" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="acquirerCode">Acquirer Code</Label>
                  <Input id="acquirerCode" placeholder="Enter unique code" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="contactEmail">Primary Contact Email</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  placeholder="email@example.com"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="contactPhone">Contact Phone</Label>
                  <Input id="contactPhone" placeholder="+1 (555) 000-0000" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="communicationMethod">Communication Method</Label>
                  <Select defaultValue="email">
                    <SelectTrigger>
                      <SelectValue placeholder="Select method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="api">API</SelectItem>
                      <SelectItem value="sftp">SFTP</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea id="notes" placeholder="Enter any additional information" />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="files" className="mt-0">
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="sampleFile">Upload Sample Chargeback File</Label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-muted-foreground/25 px-6 py-10">
                  <div className="text-center">
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
                          onChange={handleFileUpload}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-muted-foreground">
                      CSV, Excel or PDF up to 10MB
                    </p>
                  </div>
                </div>
                {file && (
                  <div className="mt-2 text-sm text-muted-foreground">
                    Selected file: <span className="font-medium">{file.name}</span>
                  </div>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="fileFormat">File Format</Label>
                <Select defaultValue="csv">
                  <SelectTrigger>
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="csv">CSV</SelectItem>
                    <SelectItem value="excel">Excel</SelectItem>
                    <SelectItem value="pdf">PDF</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="frequency">Update Frequency</Label>
                <Select defaultValue="daily">
                  <SelectTrigger>
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="biweekly">Bi-weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="mapping" className="mt-0">
            <div className="grid gap-4 py-4">
              <p className="text-sm text-muted-foreground mb-4">
                Map the extracted headers from your file to our standard fields:
              </p>
              
              {headers.length > 0 ? (
                <div className="space-y-4">
                  {headers.map((header) => (
                    <div key={header} className="grid grid-cols-2 gap-4 items-center">
                      <div className="text-sm font-medium">{header}</div>
                      <Select
                        value={mappings[header]}
                        onValueChange={(value) => handleMappingChange(header, value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Map to field" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="transaction_id">Transaction ID</SelectItem>
                          <SelectItem value="transaction_date">Transaction Date</SelectItem>
                          <SelectItem value="merchant_id">Merchant ID</SelectItem>
                          <SelectItem value="amount">Amount</SelectItem>
                          <SelectItem value="currency">Currency</SelectItem>
                          <SelectItem value="card_type">Card Type</SelectItem>
                          <SelectItem value="reason_code">Reason Code</SelectItem>
                          <SelectItem value="ignore">Ignore this field</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-10 text-center">
                  <p className="text-muted-foreground">
                    Upload a sample file first to extract headers.
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="review" className="mt-0">
            <div className="grid gap-4 py-4">
              <div className="rounded-md bg-muted p-4">
                <div className="text-sm font-medium mb-2">Acquirer Information</div>
                <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                  <div className="col-span-1">
                    <dt className="text-muted-foreground">Acquirer Name</dt>
                    <dd>Sample Acquirer</dd>
                  </div>
                  <div className="col-span-1">
                    <dt className="text-muted-foreground">Acquirer Code</dt>
                    <dd>ACQ123</dd>
                  </div>
                  <div className="col-span-1">
                    <dt className="text-muted-foreground">Contact Email</dt>
                    <dd>contact@acquirer.com</dd>
                  </div>
                  <div className="col-span-1">
                    <dt className="text-muted-foreground">Communication Method</dt>
                    <dd>Email</dd>
                  </div>
                </dl>
              </div>
              
              <div className="rounded-md bg-muted p-4">
                <div className="text-sm font-medium mb-2">File Configuration</div>
                <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                  <div className="col-span-1">
                    <dt className="text-muted-foreground">File Format</dt>
                    <dd>CSV</dd>
                  </div>
                  <div className="col-span-1">
                    <dt className="text-muted-foreground">Update Frequency</dt>
                    <dd>Daily</dd>
                  </div>
                  <div className="col-span-2">
                    <dt className="text-muted-foreground">Sample File</dt>
                    <dd>{file?.name || "No file uploaded"}</dd>
                  </div>
                </dl>
              </div>
              
              {Object.keys(mappings).length > 0 && (
                <div className="rounded-md bg-muted p-4">
                  <div className="text-sm font-medium mb-2">Field Mappings</div>
                  <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                    {Object.entries(mappings).map(([header, field]) => (
                      <div key={header} className="col-span-1">
                        <dt className="text-muted-foreground">{header}</dt>
                        <dd>{field}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          onClick={prevStep}
          disabled={currentStep === 0}
        >
          Previous
        </Button>
        <Button
          onClick={currentStep === steps.length - 1 ? () => {} : nextStep}
        >
          {currentStep === steps.length - 1 ? "Complete" : "Next"}
        </Button>
      </CardFooter>
    </Card>
  );
}
