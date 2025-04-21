
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserProfile } from "@/components/profile/UserProfile";

export default function UserProfilePage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" onClick={() => window.history.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Your Profile</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences.
          </p>
        </div>
      </div>

      <UserProfile />
    </div>
  );
}
