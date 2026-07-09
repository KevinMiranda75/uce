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
import JuegoValores from "./components/JuegoValores";
import Barajas from "./components/barajas/barajas-de-valencias";
import MemoramaQuimico from "./components/momoram/memorama_quimico";
import Home from "./components/Home";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* 1. La ruta raíz ahora muestra tu nuevo Home */}
          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />

          {/* 2. Tus juegos independientes */}
          <Route path="/uno-quimico" element={<UnoQuimico />} />
          <Route path="/memoria" element={<MemoramaQuimico />} />
          <Route path="/barajas" element={<Barajas />} />
          <Route path="/serpientes-escaleras" element={<SerpientesEscaleras />} />

          {/* 3. Tu Dashboard con sus sub-rutas */}
          <Route path="/dashboard" element={<DashboardLayout />}>
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