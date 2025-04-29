
import { AcquirerOnboardingForm } from "@/components/acquirer/AcquirerOnboardingForm";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";

export default function AcquirerOnboarding() {
  return (
    <div className="flex flex-col gap-6">
      <DashboardHeader 
        title="Acquirer Onboarding"
        description="Configure a new acquirer to process chargebacks through the system."
      />

      <AcquirerOnboardingForm />
    </div>
  );
}
