
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import MainLayout from "./components/layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import AcquirerOnboarding from "./pages/AcquirerOnboarding";
import ChargebackUpload from "./pages/ChargebackUpload";
import DraftsTab from "./pages/DraftsTab";
import MerchantTab from "./pages/MerchantTab";
import AcquirerTab from "./pages/AcquirerTab";
import Reports from "./pages/Reports";
import CaseDetailPage from "./pages/CaseDetailPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="acquirer-onboarding" element={<AcquirerOnboarding />} />
            <Route path="chargebacks" element={<ChargebackUpload />} />
            <Route path="drafts" element={<DraftsTab />} />
            <Route path="merchant" element={<MerchantTab />} />
            <Route path="acquirer" element={<AcquirerTab />} />
            <Route path="reports" element={<Reports />} />
            <Route path="case/:id" element={<CaseDetailPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
