import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import DashboardLayout from "./components/DashboardLayout";
import Oxidacion from "./pages/Oxidacion";
import TablaPeriodica from "./pages/TablaPeriodica";
import UnoQuimico from "./pages/UnoQuimica";
import SerpientesEscaleras from "./components/SerpientesEscaleras";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/login" element={<Login />} />
          {/* Página independiente */}
          <Route path="/uno-quimico" element={<UnoQuimico />} />
          <Route path="/serpientes-escaleras" element={<SerpientesEscaleras />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            {/* Redirige /dashboard a /dashboard/oxidacion */}
            <Route index element={<Navigate to="oxidacion" replace />} />
            <Route path="oxidacion" element={<Oxidacion />} />
            <Route path="tabla-periodica" element={<TablaPeriodica />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;