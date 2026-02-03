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
  Edit,
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
          <p className="text-muted-foreground">Gestiona el contenido educativo - puedes editar fases, rutas, programas y clases</p>
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
              <div className="flex items-center justify-between mb-4">
                <Layers className="w-8 h-8 text-primary" />
                <Edit className="w-4 h-4 text-muted-foreground" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Fases</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Editar la estructura de fases del contenido
              </p>
              <span className="text-sm text-primary flex items-center gap-1">
                Gestionar fases <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </Link>

          <Link to="/instructor/educacion/rutas">
            <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all hover:border-primary/50">
              <div className="flex items-center justify-between mb-4">
                <Route className="w-8 h-8 text-blue-600" />
                <Edit className="w-4 h-4 text-muted-foreground" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Rutas</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Editar las rutas de aprendizaje
              </p>
              <span className="text-sm text-primary flex items-center gap-1">
                Gestionar rutas <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </Link>

          <Link to="/instructor/educacion/programas">
            <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all hover:border-primary/50">
              <div className="flex items-center justify-between mb-4">
                <BookOpen className="w-8 h-8 text-purple-600" />
                <Edit className="w-4 h-4 text-muted-foreground" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Programas</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Editar todos los programas disponibles
              </p>
              <span className="text-sm text-primary flex items-center gap-1">
                Gestionar programas <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </Link>

          <Link to="/instructor/educacion/clases">
            <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all hover:border-primary/50">
              <div className="flex items-center justify-between mb-4">
                <Video className="w-8 h-8 text-amber-600" />
                <Edit className="w-4 h-4 text-muted-foreground" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Clases</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Editar clases y agregar actividades
              </p>
              <span className="text-sm text-primary flex items-center gap-1">
                Gestionar clases <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </Link>
        </div>

        {/* Info Banner */}
        <div className="mt-8 p-4 bg-primary/5 rounded-lg border border-primary/20">
          <p className="text-sm text-foreground">
            <strong>💡 Tip:</strong> Como instructor, puedes editar el contenido de fases, rutas, programas y clases. 
            También puedes crear nuevas actividades dentro de las clases para enriquecer el contenido educativo.
          </p>
        </div>
      </div>
    </MainLayout>
  );
}

export default InstructorEducacionPage;
