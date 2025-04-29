import { useState } from "react";
import { Settings as SettingsIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { UsersList } from "@/components/settings/UsersList";
import { AccountSecurity } from "@/components/settings/AccountSecurity";

export default function Settings() {
  // The Settings page now has user management and account security sections
  return (
    <div className="flex flex-col gap-6">
      <DashboardHeader 
        title="System Settings" 
        description="Configure system behavior, manage users, and security settings." 
      />

      <Tabs defaultValue="users" className="space-y-4">
        <TabsList>
          <TabsTrigger value="users">Users & Permissions</TabsTrigger>
          <TabsTrigger value="security">Account Security</TabsTrigger>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-4">
          <UsersList />
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <AccountSecurity />
        </TabsContent>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Configure system-wide behavior and defaults.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-process">Automatic Processing</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically process chargeback files when uploaded.
                  </p>
                </div>
                <Switch
                  id="auto-process"
                  checked={generalSettings.autoProcess}
                  onCheckedChange={(checked) =>
                    setGeneralSettings({ ...generalSettings, autoProcess: checked })
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="ai-review">AI-Powered Review</Label>
                  <p className="text-sm text-muted-foreground">
                    Use AI to automatically review and classify chargebacks.
                  </p>
                </div>
                <Switch
                  id="ai-review"
                  checked={generalSettings.aiReview}
                  onCheckedChange={(checked) =>
                    setGeneralSettings({ ...generalSettings, aiReview: checked })
                  }
                />
              </div>
              <Separator />
              <div className="grid gap-4 grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="batch-size">Batch Processing Size</Label>
                  <Input
                    id="batch-size"
                    type="number"
                    value={generalSettings.batchSize}
                    onChange={(e) =>
                      setGeneralSettings({
                        ...generalSettings,
                        batchSize: e.target.value,
                      })
                    }
                  />
                  <p className="text-xs text-muted-foreground">
                    Maximum number of cases to process in a single batch.
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="retention-days">Data Retention (Days)</Label>
                  <Input
                    id="retention-days"
                    type="number"
                    value={generalSettings.retentionDays}
                    onChange={(e) =>
                      setGeneralSettings({
                        ...generalSettings,
                        retentionDays: e.target.value,
                      })
                    }
                  />
                  <p className="text-xs text-muted-foreground">
                    How long to keep completed cases before archiving.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Email Notifications</CardTitle>
              <CardDescription>
                Configure when and how email notifications are sent.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="notifications">Case Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Send email notifications for case status changes.
                  </p>
                </div>
                <Switch
                  id="notifications"
                  checked={emailSettings.notifications}
                  onCheckedChange={(checked) =>
                    setEmailSettings({ ...emailSettings, notifications: checked })
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="reports">Scheduled Reports</Label>
                  <p className="text-sm text-muted-foreground">
                    Send automated reports via email on schedule.
                  </p>
                </div>
                <Switch
                  id="reports"
                  checked={emailSettings.reports}
                  onCheckedChange={(checked) =>
                    setEmailSettings({ ...emailSettings, reports: checked })
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="alerts">System Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Send email alerts for system issues or errors.
                  </p>
                </div>
                <Switch
                  id="alerts"
                  checked={emailSettings.alerts}
                  onCheckedChange={(checked) =>
                    setEmailSettings({ ...emailSettings, alerts: checked })
                  }
                />
              </div>
              <Separator />
              <div className="grid gap-4 grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="email-server">SMTP Server</Label>
                  <Input
                    id="email-server"
                    value={emailSettings.emailServer}
                    onChange={(e) =>
                      setEmailSettings({
                        ...emailSettings,
                        emailServer: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email-port">Port</Label>
                  <Input
                    id="email-port"
                    value={emailSettings.emailPort}
                    onChange={(e) =>
                      setEmailSettings({
                        ...emailSettings,
                        emailPort: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email-user">Username</Label>
                  <Input
                    id="email-user"
                    value={emailSettings.emailUser}
                    onChange={(e) =>
                      setEmailSettings({
                        ...emailSettings,
                        emailUser: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>External Integrations</CardTitle>
              <CardDescription>
                Configure connections to external systems and services.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="api-enabled">API Integration</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable integration with external systems via API.
                  </p>
                </div>
                <Switch
                  id="api-enabled"
                  checked={integrationSettings.apiEnabled}
                  onCheckedChange={(checked) =>
                    setIntegrationSettings({
                      ...integrationSettings,
                      apiEnabled: checked,
                    })
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="sftp">SFTP Integration</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable file transfers via SFTP for chargeback data.
                  </p>
                </div>
                <Switch
                  id="sftp"
                  checked={integrationSettings.sftp}
                  onCheckedChange={(checked) =>
                    setIntegrationSettings({
                      ...integrationSettings,
                      sftp: checked,
                    })
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-integration">Email Integration</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable processing of chargebacks received via email.
                  </p>
                </div>
                <Switch
                  id="email-integration"
                  checked={integrationSettings.emailIntegration}
                  onCheckedChange={(checked) =>
                    setIntegrationSettings({
                      ...integrationSettings,
                      emailIntegration: checked,
                    })
                  }
                />
              </div>
              <Separator />
              <div className="grid gap-4 grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="api-url">API Endpoint URL</Label>
                  <Input
                    id="api-url"
                    value={integrationSettings.apiUrl}
                    onChange={(e) =>
                      setIntegrationSettings({
                        ...integrationSettings,
                        apiUrl: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="api-key">API Key</Label>
                  <Input
                    id="api-key"
                    type="password"
                    value={integrationSettings.apiKey}
                    onChange={(e) =>
                      setIntegrationSettings({
                        ...integrationSettings,
                        apiKey: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button onClick={handleSaveSettings}>
          <Save className="mr-2 h-4 w-4" />
          Save All Settings
        </Button>
      </div>
    </div>
  );
}
