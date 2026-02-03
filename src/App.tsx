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
import ClasesPage from "./pages/ClasesPage";
import EstudiantesPage from "./pages/EstudiantesPage";
import EvaluacionesPage from "./pages/EvaluacionesPage";
import ComentariosPage from "./pages/ComentariosPage";
import BatchUploadPage from "./pages/BatchUploadPage";
import NotFound from "./pages/NotFound";

// Instructor pages
import InstructorDashboard from "./pages/instructor/InstructorDashboard";
import InstructorProgramasPage from "./pages/instructor/InstructorProgramasPage";
import InstructorProgramaDetail from "./pages/instructor/InstructorProgramaDetail";
import InstructorEstudiantesPage from "./pages/instructor/InstructorEstudiantesPage";
import InstructorEvaluacionesPage from "./pages/instructor/InstructorEvaluacionesPage";
import InstructorComentariosPage from "./pages/instructor/InstructorComentariosPage";
import InstructorEducacionPage from "./pages/instructor/InstructorEducacionPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <RoleProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Superadmin Routes */}
            <Route path="/" element={<EducationOverview />} />
            <Route path="/fases" element={<FasesPage />} />
            <Route path="/rutas" element={<RutasPage />} />
            <Route path="/programas" element={<ProgramasPage />} />
            <Route path="/programas/:id" element={<ProgramaDetailPage />} />
            <Route path="/clases" element={<ClasesPage />} />
            <Route path="/estudiantes" element={<EstudiantesPage />} />
            <Route path="/evaluaciones" element={<EvaluacionesPage />} />
            <Route path="/comentarios" element={<ComentariosPage />} />
            <Route path="/batch-upload" element={<BatchUploadPage />} />
            <Route path="/organizaciones" element={<FasesPage />} />

            {/* Instructor Routes */}
            <Route path="/instructor" element={<InstructorDashboard />} />
            <Route path="/instructor/estudiantes" element={<InstructorEstudiantesPage />} />
            <Route path="/instructor/evaluaciones" element={<InstructorEvaluacionesPage />} />
            <Route path="/instructor/comentarios" element={<InstructorComentariosPage />} />
            <Route path="/instructor/programas" element={<InstructorProgramasPage />} />
            <Route path="/instructor/programas/:id" element={<InstructorProgramaDetail />} />
            <Route path="/instructor/educacion" element={<InstructorEducacionPage />} />
            <Route path="/instructor/educacion/fases" element={<FasesPage />} />
            <Route path="/instructor/educacion/rutas" element={<RutasPage />} />
            <Route path="/instructor/educacion/programas" element={<ProgramasPage />} />
            <Route path="/instructor/educacion/clases" element={<ClasesPage />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </RoleProvider>
  </QueryClientProvider>
);

export default App;
