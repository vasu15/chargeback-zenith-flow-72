
import { useState } from "react";
import { 
  Menu, 
  X, 
  ChevronDown, 
  Bell, 
  User, 
  LayoutDashboard, 
  Building2, 
  CreditCard, 
  FileEdit, 
  Store, 
  Building, 
  BarChart2, 
  LogOut, 
  Settings, 
  HelpCircle 
} from "lucide-react";
import { Link, Outlet } from "react-router-dom";
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger 
} from "@/components/ui/sheet";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { SidebarNav } from "./SidebarNav";

// Top-level navigation items
const navigationItems = [
  { title: "Dashboard", href: "/", icon: LayoutDashboard },
  { title: "Acquirer Onboarding", href: "/acquirer-onboarding", icon: Building2 },
  { title: "Chargebacks", href: "/chargebacks", icon: CreditCard, badge: 12 },
  { title: "Drafts", href: "/drafts", icon: FileEdit },
  { title: "Merchant", href: "/merchant", icon: Store },
  { title: "Acquirer", href: "/acquirer", icon: Building },
  { title: "Reports", href: "/reports", icon: BarChart2 },
];

export default function MainLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 px-2 pt-10">
                <SidebarNav items={navigationItems} />
              </SheetContent>
            </Sheet>
            <Link to="/" className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight">
                Chargeback Zenith
              </span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>AT</AvatarFallback>
                  </Avatar>
                  <span className="hidden md:inline-flex">Admin User</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <HelpCircle className="mr-2 h-4 w-4" />
                  Help & Documentation
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1">
        <div className="container grid grid-cols-1 md:grid-cols-[240px_1fr] md:gap-6 px-4 py-6 md:px-6">
          {/* Sidebar (hidden on mobile) */}
          <aside className="hidden flex-col md:flex">
            <SidebarNav items={navigationItems} />
          </aside>
          {/* Main content with outlet for nested routes */}
          <main className="flex flex-col flex-1 gap-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
