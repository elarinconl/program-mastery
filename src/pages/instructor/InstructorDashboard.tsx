import { MainLayout } from '@/components/layout/MainLayout';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  ClipboardCheck,
  MessageSquare,
  Users,
  ArrowRight,
  AlertCircle,
  TrendingUp,
  CheckCircle,
  Award,
  BarChart3,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useRole } from '@/contexts/RoleContext';

const mockStats = {
  programasAsignados: 4,
  evaluacionesPendientes: 3,
  comentariosSinResponder: 8,
  estudiantes: 156,
  engagementRate: 68,
  completionRate: 29,
  approbationRate: 22,
  avgGrade: 7.2,
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
  const { isSuperAdmin } = useRole();
  const workspaceLabel = isSuperAdmin ? 'instructor workspace' : 'mi workspace';
  const workspaceTitle = isSuperAdmin ? 'Instructor Workspace' : 'Mi Workspace';
  const programasLink = isSuperAdmin ? '/superadmin/programas' : '/instructor/programas';
  const evaluacionesLink = isSuperAdmin ? '/evaluaciones' : '/instructor/evaluaciones';
  const comentariosLink = isSuperAdmin ? '/comentarios' : '/instructor/comentarios';
  const estudiantesLink = isSuperAdmin ? '/estudiantes' : '/instructor/estudiantes';

  return (
    <MainLayout breadcrumbs={[{ label: workspaceLabel }, { label: 'dashboard' }]}>
      <div className="max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">{workspaceTitle}</h1>
          <p className="text-muted-foreground">
            {isSuperAdmin 
              ? 'Resumen de todos los programas activos y actividad de instructores'
              : 'Resumen de tu actividad y tareas pendientes'
            }
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="stat-card">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <BookOpen className="w-5 h-5 text-primary" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground">{isSuperAdmin ? 'Programas Activos' : 'Programas Asignados'}</p>
            <p className="text-3xl font-bold">{mockStats.programasAsignados}</p>
            <Link to={programasLink} className="text-sm text-primary hover:underline mt-2 inline-block">
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
            <Link to={evaluacionesLink} className="text-sm text-primary hover:underline mt-2 inline-block">
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
            <Link to={comentariosLink} className="text-sm text-primary hover:underline mt-2 inline-block">
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
            <Link to={estudiantesLink} className="text-sm text-primary hover:underline mt-2 inline-block">
              Ver estudiantes →
            </Link>
          </div>
        </div>

        {/* Métricas Globales */}
        <div className="mb-8">
          <h2 className="font-semibold text-foreground mb-4">Métricas Globales</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="stat-card">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-primary" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground">Engagement Rate</p>
              <p className="text-3xl font-bold">{mockStats.engagementRate}%</p>
              <p className="text-xs text-muted-foreground mt-1">Promedio todos los programas</p>
            </div>
            <div className="stat-card">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 bg-success/10 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-success" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground">Completion Rate</p>
              <p className="text-3xl font-bold">{mockStats.completionRate}%</p>
              <p className="text-xs text-muted-foreground mt-1">Promedio todos los programas</p>
            </div>
            <div className="stat-card">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 bg-warning/10 rounded-lg">
                  <Award className="w-5 h-5 text-warning" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground">Approbation Rate</p>
              <p className="text-3xl font-bold">{mockStats.approbationRate}%</p>
              <p className="text-xs text-muted-foreground mt-1">Promedio todos los programas</p>
            </div>
            <div className="stat-card">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <BarChart3 className="w-5 h-5 text-blue-500" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground">Nota Promedio</p>
              <p className="text-3xl font-bold">{mockStats.avgGrade}</p>
              <p className="text-xs text-muted-foreground mt-1">Sobre 10 · todos los programas</p>
            </div>
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
              <Link to={evaluacionesLink}>
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
              <Link to={comentariosLink}>
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
            <Link to={evaluacionesLink}>
              <Button variant="outline" className="w-full h-auto py-4 flex-col gap-2">
                <ClipboardCheck className="w-6 h-6" />
                <span>Evaluaciones Pendientes</span>
              </Button>
            </Link>
            <Link to={comentariosLink}>
              <Button variant="outline" className="w-full h-auto py-4 flex-col gap-2">
                <MessageSquare className="w-6 h-6" />
                <span>Comentarios sin Responder</span>
              </Button>
            </Link>
            <Link to={programasLink}>
              <Button variant="outline" className="w-full h-auto py-4 flex-col gap-2">
                <BookOpen className="w-6 h-6" />
                <span>{isSuperAdmin ? 'Programas Activos' : 'Programas Asignados'}</span>
              </Button>
            </Link>
            <Link to={estudiantesLink}>
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
