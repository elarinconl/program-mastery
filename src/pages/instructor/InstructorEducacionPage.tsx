import { MainLayout } from '@/components/layout/MainLayout';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  Video,
  Users,
  MessageSquare,
  ClipboardCheck,
  ArrowRight,
  Layers,
  Route,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const mockStats = {
  fases: 4,
  rutas: 12,
  programas: 28,
  clases: 411,
};

export function InstructorEducacionPage() {
  return (
    <MainLayout breadcrumbs={[{ label: 'instructor' }, { label: 'educación' }]}>
      <div className="max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">Educación</h1>
          <p className="text-muted-foreground">Vista general del contenido educativo (solo lectura)</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="stat-card">
            <div className="p-2 bg-primary/10 rounded-lg w-fit mb-2">
              <Layers className="w-5 h-5 text-primary" />
            </div>
            <p className="text-sm text-muted-foreground">Fases</p>
            <p className="text-3xl font-bold">{mockStats.fases}</p>
          </div>

          <div className="stat-card">
            <div className="p-2 bg-blue-50 rounded-lg w-fit mb-2">
              <Route className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-sm text-muted-foreground">Rutas</p>
            <p className="text-3xl font-bold">{mockStats.rutas}</p>
          </div>

          <div className="stat-card">
            <div className="p-2 bg-purple-50 rounded-lg w-fit mb-2">
              <BookOpen className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-sm text-muted-foreground">Programas</p>
            <p className="text-3xl font-bold">{mockStats.programas}</p>
          </div>

          <div className="stat-card">
            <div className="p-2 bg-amber-50 rounded-lg w-fit mb-2">
              <Video className="w-5 h-5 text-amber-600" />
            </div>
            <p className="text-sm text-muted-foreground">Clases</p>
            <p className="text-3xl font-bold">{mockStats.clases}</p>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link to="/instructor/educacion/fases">
            <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all hover:border-primary/50">
              <Layers className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-semibold text-foreground mb-2">Fases</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Ver la estructura de fases del contenido
              </p>
              <span className="text-sm text-primary flex items-center gap-1">
                Ver fases <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </Link>

          <Link to="/instructor/educacion/rutas">
            <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all hover:border-primary/50">
              <Route className="w-8 h-8 text-blue-600 mb-4" />
              <h3 className="font-semibold text-foreground mb-2">Rutas</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Explorar las rutas de aprendizaje
              </p>
              <span className="text-sm text-primary flex items-center gap-1">
                Ver rutas <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </Link>

          <Link to="/instructor/educacion/programas">
            <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all hover:border-primary/50">
              <BookOpen className="w-8 h-8 text-purple-600 mb-4" />
              <h3 className="font-semibold text-foreground mb-2">Programas</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Ver todos los programas disponibles
              </p>
              <span className="text-sm text-primary flex items-center gap-1">
                Ver programas <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </Link>

          <Link to="/instructor/educacion/clases">
            <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all hover:border-primary/50">
              <Video className="w-8 h-8 text-amber-600 mb-4" />
              <h3 className="font-semibold text-foreground mb-2">Clases</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Explorar todas las clases y actividades
              </p>
              <span className="text-sm text-primary flex items-center gap-1">
                Ver clases <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </Link>
        </div>

        {/* Info Banner */}
        <div className="mt-8 p-4 bg-muted/50 rounded-lg border border-border">
          <p className="text-sm text-muted-foreground">
            <strong>Nota:</strong> Como instructor, tienes acceso de solo lectura a la estructura educativa.
            Para editar contenido, accede a "Mis Programas" donde podrás gestionar los programas asignados.
          </p>
        </div>
      </div>
    </MainLayout>
  );
}

export default InstructorEducacionPage;
