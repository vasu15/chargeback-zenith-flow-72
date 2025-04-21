
import { useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CaseDetail } from "@/components/cases/CaseDetail";

export default function CaseDetailPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" onClick={() => window.history.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Case Details</h1>
          <p className="text-muted-foreground">
            Review and manage chargeback case information.
          </p>
        </div>
      </div>

      <CaseDetail caseId={id || ""} />
    </div>
  );
}
