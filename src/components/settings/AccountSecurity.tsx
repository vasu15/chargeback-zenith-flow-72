
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export function AccountSecurity() {
  const { toast } = useToast();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [temporaryPassword, setTemporaryPassword] = useState("");
  const [lastChanged] = useState("02 Feb 2023");

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!oldPassword || !newPassword || !confirmPassword) {
      toast({
        title: "Error",
        description: "Please fill in all password fields.",
        variant: "destructive",
      });
      return;
    }
    
    if (newPassword !== confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords do not match.",
        variant: "destructive",
      });
      return;
    }
    
    // Success case
    toast({
      title: "Password updated",
      description: "Your password has been changed successfully.",
    });
    
    // Clear the form
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleGenerateTemporaryPassword = () => {
    // Generate a random password
    const tempPassword = Math.random().toString(36).slice(-10);
    setTemporaryPassword(tempPassword);
    
    toast({
      title: "Temporary password generated",
      description: "A temporary password has been created.",
    });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Account Security</h3>
      
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Change Password</CardTitle>
            <CardDescription>
              Update your account password. Last changed on {lastChanged}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="current-password" className="text-sm font-medium">
                  Old Password
                </label>
                <Input
                  id="current-password"
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  placeholder="Enter your current password"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="new-password" className="text-sm font-medium">
                    New Password
                  </label>
                  <Input
                    id="new-password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="confirm-password" className="text-sm font-medium">
                    Confirm New Password
                  </label>
                  <Input
                    id="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                  />
                </div>
              </div>
              
              <Button type="submit" className="w-full">
                Change Password
              </Button>
            </form>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Temporary Password</CardTitle>
            <CardDescription>
              Generate a temporary password for short-term access to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-start space-x-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <path d="M2 12C2 6.5 6.5 2 12 2a10 10 0 0 1 8 4"></path>
                  <path d="M5 19.5C5.5 18 6 15 6 12c0-1.8.5-3.5 1.5-5"></path>
                  <path d="M17 12a5 5 0 0 0-10 0"></path>
                  <path d="M12 2v10"></path>
                </svg>
              </div>
              <div>
                <p className="text-sm">
                  Want someone to access your account for a short period of time? Generate a temporary password for them to use.
                </p>
              </div>
            </div>
            
            {temporaryPassword ? (
              <div className="space-y-4">
                <div className="p-3 bg-muted rounded-md">
                  <p className="text-sm font-mono">{temporaryPassword}</p>
                </div>
                <div className="flex items-center">
                  <p className="text-xs text-muted-foreground">
                    This password will expire in 24 hours
                  </p>
                </div>
              </div>
            ) : (
              <Button 
                variant="outline" 
                className="w-full"
                onClick={handleGenerateTemporaryPassword}
              >
                Generate Password
              </Button>
            )}
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Active Sessions</CardTitle>
            <CardDescription>
              These are active logins for your account. If you don't recognize them, you can remove them from here.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  device: "Chrome on Windows",
                  location: "New York, US",
                  time: "Current session",
                  current: true
                },
                {
                  device: "Safari on iPhone",
                  location: "Boston, US",
                  time: "2 hours ago",
                  current: false
                }
              ].map((session, i) => (
                <div key={i} className="flex items-center justify-between p-3 border rounded-md">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{session.device}</p>
                    <p className="text-xs text-muted-foreground">
                      {session.location} • {session.time}
                    </p>
                  </div>
                  {!session.current && (
                    <Button variant="ghost" size="sm">
                      Remove
                    </Button>
                  )}
                  {session.current && (
                    <span className="text-xs bg-primary/10 text-primary py-1 px-2 rounded">
                      Current
                    </span>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
