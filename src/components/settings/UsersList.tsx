
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Check, Shield, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

// Define user data types
interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  isAdmin: boolean;
}

// Mock user data
const mockUsers: UserData[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Administrator",
    status: "Active",
    isAdmin: true,
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "Chargeback Agent",
    status: "Active",
    isAdmin: false,
  },
  {
    id: "3",
    name: "Robert Johnson",
    email: "robert.j@example.com",
    role: "Supervisor",
    status: "Active",
    isAdmin: false,
  },
  {
    id: "4",
    name: "Emily White",
    email: "emily.w@example.com",
    role: "Chargeback Agent",
    status: "Active",
    isAdmin: false,
  },
  {
    id: "5",
    name: "Michael Brown",
    email: "michael.b@example.com",
    role: "Administrator",
    status: "Active",
    isAdmin: true,
  },
];

export function UsersList() {
  const { toast } = useToast();
  const [users, setUsers] = useState<UserData[]>(mockUsers);
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
  const [isPermissionsDialogOpen, setIsPermissionsDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [inviteEmail, setInviteEmail] = useState("");
  const [sendEmail, setSendEmail] = useState(true);
  
  // Stats calculations
  const totalUsers = users.length;
  const adminCount = users.filter(user => user.isAdmin).length;
  const regularUsers = totalUsers - adminCount;

  const handleEditPermissions = (user: UserData) => {
    setSelectedUser(user);
    setIsPermissionsDialogOpen(true);
  };

  const handlePermissionsChange = () => {
    if (selectedUser) {
      setUsers(users.map(user => 
        user.id === selectedUser.id 
          ? { ...user, isAdmin: !user.isAdmin, role: !user.isAdmin ? "Administrator" : "Chargeback Agent" } 
          : user
      ));
      setIsPermissionsDialogOpen(false);
      toast({
        title: "Permissions updated",
        description: `${selectedUser.name}'s role has been updated.`,
      });
    }
  };

  const handleInviteUser = () => {
    if (inviteEmail.trim()) {
      toast({
        title: "Invitation sent",
        description: `An invitation has been sent to ${inviteEmail}`,
      });
      setInviteEmail("");
      setIsInviteDialogOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">User Management</h3>
        <Button onClick={() => setIsInviteDialogOpen(true)}>
          Invite User
        </Button>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="border rounded-lg p-4 bg-card">
          <p className="text-sm text-muted-foreground">Total Users</p>
          <h3 className="text-3xl font-bold">{totalUsers}</h3>
        </div>
        <div className="border rounded-lg p-4 bg-card">
          <p className="text-sm text-muted-foreground">Administrators</p>
          <h3 className="text-3xl font-bold">{adminCount}</h3>
        </div>
        <div className="border rounded-lg p-4 bg-card">
          <p className="text-sm text-muted-foreground">Regular Users</p>
          <h3 className="text-3xl font-bold">{regularUsers}</h3>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{user.name}</span>
                  </div>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {user.isAdmin ? (
                      <Shield className="h-4 w-4 text-amber-500" />
                    ) : (
                      <User className="h-4 w-4" />
                    )}
                    {user.role}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleEditPermissions(user)}
                    >
                      Edit
                    </Button>
                    <Button variant="outline" size="sm">View</Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Invite User Dialog */}
      <Dialog open={isInviteDialogOpen} onOpenChange={setIsInviteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Invite User</DialogTitle>
            <DialogDescription>
              You can invite users to join by sending them an invitation via email.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium">
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                placeholder="user@example.com"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="send-email"
                checked={sendEmail}
                onCheckedChange={(checked) => setSendEmail(!!checked)}
              />
              <label htmlFor="send-email" className="text-sm">
                Add user by sending invitation via email
              </label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsInviteDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleInviteUser}>Send Invite</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Permissions Dialog */}
      <Dialog open={isPermissionsDialogOpen} onOpenChange={setIsPermissionsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Permissions</DialogTitle>
            <DialogDescription>
              Change user role and permissions for {selectedUser?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <label className="text-sm font-medium">Admin Role</label>
                <p className="text-sm text-muted-foreground">
                  Can manage all system settings and users
                </p>
              </div>
              <Switch 
                checked={selectedUser?.isAdmin} 
                onCheckedChange={() => {
                  if (selectedUser) {
                    setSelectedUser({
                      ...selectedUser,
                      isAdmin: !selectedUser.isAdmin
                    });
                  }
                }}
              />
            </div>

            {selectedUser?.isAdmin && (
              <div className="space-y-4 border-t pt-4">
                <h4 className="font-medium">Admin Permissions</h4>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm">Manage other Admins</label>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <label className="text-sm">View all cases</label>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <label className="text-sm">Add and manage users</label>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <label className="text-sm">Access to Analytics</label>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <label className="text-sm">Access to Reports</label>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPermissionsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handlePermissionsChange}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
