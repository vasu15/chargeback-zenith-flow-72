
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";

export function AcquirersTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Connected Acquirers</CardTitle>
        <CardDescription>
          All acquirers configured in the system
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="rounded-md border">
            <div className="grid grid-cols-4 gap-4 p-4 font-medium">
              <div>Acquirer</div>
              <div>Cases</div>
              <div>Success Rate</div>
              <div>Last Update</div>
            </div>
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="grid grid-cols-4 gap-4 border-t p-4 text-sm"
              >
                <div className="font-medium">Acquirer {i + 1}</div>
                <div>{50 - i * 15}</div>
                <div>{65 + i * 5}%</div>
                <div>3 hours ago</div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
