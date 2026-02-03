import { MainLayout } from '@/components/layout/MainLayout';
import { useRole } from '@/contexts/RoleContext';
import { 
  Layers, 
  Route, 
  BookOpen, 
  Video, 
  Building2,
  ArrowRight,
  ClipboardCheck,
  MessageSquare,
  Upload,
  Users
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface StatCardProps {
  label: string;
  value: number | string;
  sublabel?: string;
  trend?: 'up' | 'down' | 'neutral';
}

function StatCard({ label, value, sublabel }: StatCardProps) {
  return (
    <div className="stat-card">
      <p className="text-sm text-muted-foreground mb-1">{label}</p>
      <p className="text-3xl font-bold text-foreground">{value}</p>
      {sublabel && (
        <p className="text-sm text-primary mt-1">{sublabel}</p>
      )}
    </div>
  );
}

interface ContentCardProps {
  title: string;
  description: string;
  stats: string;
  icon: React.ReactNode;
  iconBg: string;
  href: string;
}

function ContentCard({ title, description, stats, icon, iconBg, href }: ContentCardProps) {
  return (
    <Link to={href} className="content-card group flex items-start gap-4">
      <div className={cn('icon-wrapper', iconBg)}>
        {icon}
      </div>
      <div className="flex-1">
        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
        <p className="text-sm text-primary mt-2">{stats}</p>
      </div>
      <ArrowRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
    </Link>
  );
}

interface QuickActionProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  badge?: number;
}

function QuickAction({ title, description, icon, href, badge }: QuickActionProps) {
  return (
    <Link 
      to={href}
      className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card hover:bg-muted/50 transition-colors"
    >
      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
        {icon}
      </div>
      <div className="flex-1">
        <h4 className="font-medium text-foreground">{title}</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      {badge !== undefined && badge > 0 && (
        <span className="bg-destructive text-destructive-foreground text-xs font-medium px-2.5 py-1 rounded-full">
          {badge}
        </span>
      )}
    </Link>
  );
}

function HierarchyBadge({ label, color }: { label: string; color: string }) {
  return (
    <span className={cn(
      'px-3 py-1.5 rounded-lg text-sm font-medium border',
      color
    )}>
      {label}
    </span>
  );
}

export function EducationOverview() {
  const { isSuperAdmin, isInstructor } = useRole();

  return (
    <MainLayout breadcrumbs={[{ label: 'education' }]}>
      <div className="max-w-7xl">
        {/* Page header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 3v18h18" />
              <path d="M18 17V9" />
              <path d="M13 17V5" />
              <path d="M8 17v-3" />
            </svg>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              {isInstructor ? 'Mi Espacio de Trabajo' : 'Educación'}
            </h1>
            <p className="text-muted-foreground">
              {isInstructor 
                ? 'Gestiona tus programas, evaluaciones y comentarios'
                : 'Hub central del módulo educativo de Cronoss'
              }
            </p>
          </div>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {isSuperAdmin && (
            <>
              <StatCard label="Fases" value={3} sublabel="3 publicadas" />
              <StatCard label="Rutas" value={18} sublabel="18 publicadas" />
            </>
          )}
          <StatCard label="Programas" value={isInstructor ? 5 : 72} sublabel={isInstructor ? '5 asignados' : '3 publicados'} />
          <StatCard label="Clases" value={isInstructor ? 48 : 411} sublabel={isInstructor ? '48 en programas' : '411 publicadas'} />
          {isSuperAdmin && (
            <StatCard label="Organizaciones" value={4} sublabel="3 activas" />
          )}
          {isInstructor && (
            <>
              <StatCard label="Evaluaciones" value={5} sublabel="Pendientes" />
              <StatCard label="Comentarios" value={12} sublabel="Por responder" />
            </>
          )}
        </div>

        {/* Quick actions for instructor */}
        {isInstructor && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-foreground mb-4">Acciones Pendientes</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <QuickAction 
                title="Evaluaciones"
                description="Exámenes finales pendientes"
                icon={<ClipboardCheck className="w-5 h-5" />}
                href="/evaluaciones"
                badge={5}
              />
              <QuickAction 
                title="Comentarios"
                description="Comentarios sin responder"
                icon={<MessageSquare className="w-5 h-5" />}
                href="/comentarios"
                badge={12}
              />
              <QuickAction 
                title="Actividades"
                description="Entregas por revisar"
                icon={<Upload className="w-5 h-5" />}
                href="/actividades"
                badge={3}
              />
            </div>
          </div>
        )}

        {/* Content cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {isSuperAdmin && (
            <>
              <ContentCard 
                title="Fases"
                description="Etapas del journey educativo (Fundamentación, Aplicación, Dominio)"
                stats="3/3 publicadas"
                icon={<Layers className="w-6 h-6 text-emerald-600" />}
                iconBg="bg-emerald-50"
                href="/fases"
              />
              <ContentCard 
                title="Rutas de Aprendizaje"
                description="Colecciones de programas ordenados por nivel y tier"
                stats="18/18 publicadas"
                icon={<Route className="w-6 h-6 text-teal-600" />}
                iconBg="bg-teal-50"
                href="/rutas"
              />
            </>
          )}
          <ContentCard 
            title="Programas"
            description="Cursos completos con módulos y clases"
            stats={isInstructor ? '5 programas asignados' : '3/72 publicados'}
            icon={<BookOpen className="w-6 h-6 text-orange-600" />}
            iconBg="bg-orange-50"
            href="/programas"
          />
          {isSuperAdmin && (
            <>
              <ContentCard 
                title="Clases"
                description="Contenido individual: videos, artículos, quizzes"
                stats="411/411 publicadas"
                icon={<Video className="w-6 h-6 text-blue-600" />}
                iconBg="bg-blue-50"
                href="/clases"
              />
              <ContentCard 
                title="Organizaciones B2B"
                description="Empresas con acceso corporativo al contenido"
                stats="3/4 activas"
                icon={<Building2 className="w-6 h-6 text-purple-600" />}
                iconBg="bg-purple-50"
                href="/organizaciones"
              />
            </>
          )}
          <ContentCard 
            title="Estudiantes"
            description={isInstructor ? 'Estudiantes de tus programas' : 'Todos los estudiantes inscritos'}
            stats={isInstructor ? '128 estudiantes' : '2,450 estudiantes'}
            icon={<Users className="w-6 h-6 text-indigo-600" />}
            iconBg="bg-indigo-50"
            href="/estudiantes"
          />
        </div>

        {/* Quick access for admin */}
        {isSuperAdmin && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-foreground mb-4">Accesos Rápidos</h2>
            <div className="grid md:grid-cols-4 gap-4">
              <QuickAction 
                title="Programas"
                description="Gestionar cursos"
                icon={<BookOpen className="w-5 h-5" />}
                href="/programas"
              />
              <QuickAction 
                title="Evaluaciones"
                description="Pendientes de revisión"
                icon={<ClipboardCheck className="w-5 h-5" />}
                href="/evaluaciones"
                badge={5}
              />
              <QuickAction 
                title="Comentarios"
                description="Moderación y respuestas"
                icon={<MessageSquare className="w-5 h-5" />}
                href="/comentarios"
                badge={12}
              />
              <QuickAction 
                title="Batch Upload"
                description="Carga masiva de contenido"
                icon={<Upload className="w-5 h-5" />}
                href="/batch-upload"
              />
            </div>
          </div>
        )}

        {/* Content hierarchy */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Jerarquía de Contenido</h2>
          <div className="flex items-center gap-3 flex-wrap mb-4">
            <HierarchyBadge label="Fase" color="border-emerald-200 bg-emerald-50 text-emerald-700" />
            <ArrowRight className="w-4 h-4 text-muted-foreground" />
            <HierarchyBadge label="Ruta de Aprendizaje" color="border-teal-200 bg-teal-50 text-teal-700" />
            <ArrowRight className="w-4 h-4 text-muted-foreground" />
            <HierarchyBadge label="Programa" color="border-orange-200 bg-orange-50 text-orange-700" />
            <ArrowRight className="w-4 h-4 text-muted-foreground" />
            <HierarchyBadge label="Clase" color="border-blue-200 bg-blue-50 text-blue-700" />
          </div>
          <p className="text-sm text-muted-foreground">
            Las fases representan las etapas del journey educativo según la taxonomía de Bloom. 
            Cada fase contiene rutas de aprendizaje, que a su vez agrupan programas. 
            Los programas contienen clases organizadas por módulos (agrupación numérica).
          </p>
        </div>
      </div>
    </MainLayout>
  );
}

export default EducationOverview;
