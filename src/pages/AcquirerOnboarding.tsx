
import { AcquirerOnboardingForm } from "@/components/acquirer/AcquirerOnboardingForm";

export default function AcquirerOnboarding() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Acquirer Onboarding</h1>
        <p className="text-muted-foreground">
          Configure a new acquirer to process chargebacks through the system.
        </p>
      </div>

      <AcquirerOnboardingForm />
    </div>
  );
}
