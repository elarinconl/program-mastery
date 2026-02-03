import { MainLayout } from '@/components/layout/MainLayout';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  ClipboardCheck,
  MessageSquare,
  Users,
  ArrowRight,
  AlertCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const mockStats = {
  programasAsignados: 4,
  evaluacionesPendientes: 3,
  comentariosSinResponder: 8,
  estudiantes: 156,
};

const mockPendingEvaluations = [
  { id: '1', studentName: 'Carlos García', programa: 'Análisis Técnico', submittedAt: 'Hace 2 horas' },
  { id: '2', studentName: 'María López', programa: 'Gestión de Riesgo', submittedAt: 'Hace 5 horas' },
  { id: '3', studentName: 'Juan Pérez', programa: 'Análisis Técnico', submittedAt: 'Hace 1 día' },
];

const mockPendingComments = [
  { id: '1', studentName: 'Ana Martínez', clase: 'Teoría de Dow', content: '¿Podrían explicar más sobre los principios?', time: 'Hace 1 hora' },
  { id: '2', studentName: 'Pedro Sánchez', clase: 'Patrones de velas', content: '¿Cuál es la diferencia entre hammer y doji?', time: 'Hace 3 horas' },
];

export function InstructorDashboard() {
  return (
    <MainLayout breadcrumbs={[{ label: 'my workspace' }, { label: 'dashboard' }]}>
      <div className="max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">My Workspace</h1>
          <p className="text-muted-foreground">Resumen de tu actividad y tareas pendientes</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="stat-card">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <BookOpen className="w-5 h-5 text-primary" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground">Programas Asignados</p>
            <p className="text-3xl font-bold">{mockStats.programasAsignados}</p>
            <Link to="/instructor/programas" className="text-sm text-primary hover:underline mt-2 inline-block">
              Ver programas →
            </Link>
          </div>

          <div className="stat-card">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-warning/10 rounded-lg">
                <ClipboardCheck className="w-5 h-5 text-warning" />
              </div>
              {mockStats.evaluacionesPendientes > 0 && (
                <Badge variant="outline" className="border-warning/50 bg-warning/10 text-warning">
                  Pendiente
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground">Evaluaciones Pendientes</p>
            <p className="text-3xl font-bold">{mockStats.evaluacionesPendientes}</p>
            <Link to="/instructor/evaluaciones" className="text-sm text-primary hover:underline mt-2 inline-block">
              Revisar →
            </Link>
          </div>

          <div className="stat-card">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-destructive/10 rounded-lg">
                <MessageSquare className="w-5 h-5 text-destructive" />
              </div>
              {mockStats.comentariosSinResponder > 0 && (
                <Badge variant="outline" className="border-destructive/50 bg-destructive/10 text-destructive">
                  {mockStats.comentariosSinResponder}
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground">Comentarios por Responder</p>
            <p className="text-3xl font-bold">{mockStats.comentariosSinResponder}</p>
            <Link to="/instructor/comentarios" className="text-sm text-primary hover:underline mt-2 inline-block">
              Responder →
            </Link>
          </div>

          <div className="stat-card">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-success/10 rounded-lg">
                <Users className="w-5 h-5 text-success" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground">Estudiantes</p>
            <p className="text-3xl font-bold">{mockStats.estudiantes}</p>
            <Link to="/instructor/estudiantes" className="text-sm text-primary hover:underline mt-2 inline-block">
              Ver estudiantes →
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Pending Evaluations */}
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-foreground flex items-center gap-2">
                <ClipboardCheck className="w-5 h-5 text-warning" />
                Evaluaciones Pendientes
              </h2>
              <Link to="/instructor/evaluaciones">
                <Button variant="ghost" size="sm">
                  Ver todas
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
            <div className="space-y-3">
              {mockPendingEvaluations.map((eval_) => (
                <div key={eval_.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium">{eval_.studentName}</p>
                    <p className="text-sm text-muted-foreground">{eval_.programa}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">{eval_.submittedAt}</p>
                    <Button variant="outline" size="sm" className="mt-1">
                      Evaluar
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pending Comments */}
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-foreground flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-destructive" />
                Comentarios sin Responder
              </h2>
              <Link to="/instructor/comentarios">
                <Button variant="ghost" size="sm">
                  Ver todos
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
            <div className="space-y-3">
              {mockPendingComments.map((comment) => (
                <div key={comment.id} className="p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium">{comment.studentName}</p>
                    <span className="text-xs text-muted-foreground">{comment.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    en <span className="text-foreground">{comment.clase}</span>
                  </p>
                  <p className="text-sm line-clamp-2">{comment.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="font-semibold text-foreground mb-4">Accesos Rápidos</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link to="/instructor/evaluaciones">
              <Button variant="outline" className="w-full h-auto py-4 flex-col gap-2">
                <ClipboardCheck className="w-6 h-6" />
                <span>Evaluaciones Pendientes</span>
              </Button>
            </Link>
            <Link to="/instructor/comentarios">
              <Button variant="outline" className="w-full h-auto py-4 flex-col gap-2">
                <MessageSquare className="w-6 h-6" />
                <span>Comentarios sin Responder</span>
              </Button>
            </Link>
            <Link to="/instructor/programas">
              <Button variant="outline" className="w-full h-auto py-4 flex-col gap-2">
                <BookOpen className="w-6 h-6" />
                <span>Programas Asignados</span>
              </Button>
            </Link>
            <Link to="/instructor/estudiantes">
              <Button variant="outline" className="w-full h-auto py-4 flex-col gap-2">
                <Users className="w-6 h-6" />
                <span>Estudiantes</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default InstructorDashboard;
