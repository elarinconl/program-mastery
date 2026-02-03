import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RoleProvider } from "@/contexts/RoleContext";
import EducationOverview from "./pages/EducationOverview";
import FasesPage from "./pages/FasesPage";
import RutasPage from "./pages/RutasPage";
import ProgramasPage from "./pages/ProgramasPage";
import ProgramaDetailPage from "./pages/ProgramaDetailPage";
import EstudiantesPage from "./pages/EstudiantesPage";
import EvaluacionesPage from "./pages/EvaluacionesPage";
import ComentariosPage from "./pages/ComentariosPage";
import BatchUploadPage from "./pages/BatchUploadPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <RoleProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<EducationOverview />} />
            <Route path="/fases" element={<FasesPage />} />
            <Route path="/rutas" element={<RutasPage />} />
            <Route path="/programas" element={<ProgramasPage />} />
            <Route path="/programas/:id" element={<ProgramaDetailPage />} />
            <Route path="/clases" element={<ProgramasPage />} />
            <Route path="/estudiantes" element={<EstudiantesPage />} />
            <Route path="/evaluaciones" element={<EvaluacionesPage />} />
            <Route path="/comentarios" element={<ComentariosPage />} />
            <Route path="/batch-upload" element={<BatchUploadPage />} />
            <Route path="/organizaciones" element={<FasesPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </RoleProvider>
  </QueryClientProvider>
);

export default App;
