import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useRole } from '@/contexts/RoleContext';
import {
  LayoutDashboard,
  Layers,
  Route,
  BookOpen,
  Video,
  Users,
  MessageSquare,
  Upload,
  ClipboardCheck,
  Settings,
  GraduationCap,
  Building2,
  Home,
} from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: number;
  section?: string;
}

// Superadmin navigation
const superadminNavItems: NavItem[] = [
  { label: 'Overview', href: '/', icon: <LayoutDashboard className="w-5 h-5" />, section: 'EDUCACIÓN' },
  { label: 'Fases', href: '/fases', icon: <Layers className="w-5 h-5" /> },
  { label: 'Rutas', href: '/rutas', icon: <Route className="w-5 h-5" /> },
  { label: 'Programas', href: '/programas', icon: <BookOpen className="w-5 h-5" /> },
  { label: 'Clases', href: '/clases', icon: <Video className="w-5 h-5" /> },
  { label: 'Estudiantes', href: '/estudiantes', icon: <Users className="w-5 h-5" />, section: 'GESTIÓN' },
  { label: 'Evaluaciones', href: '/evaluaciones', icon: <ClipboardCheck className="w-5 h-5" />, badge: 5 },
  { label: 'Comentarios', href: '/comentarios', icon: <MessageSquare className="w-5 h-5" />, badge: 12 },
  { label: 'Organizaciones', href: '/organizaciones', icon: <Building2 className="w-5 h-5" />, section: 'HERRAMIENTAS' },
];

// Instructor navigation
const instructorNavItems: NavItem[] = [
  { label: 'Dashboard', href: '/instructor', icon: <Home className="w-5 h-5" />, section: 'MY WORKSPACE' },
  { label: 'Mis Programas', href: '/instructor/programas', icon: <BookOpen className="w-5 h-5" /> },
  { label: 'Estudiantes', href: '/instructor/estudiantes', icon: <Users className="w-5 h-5" /> },
  { label: 'Evaluaciones', href: '/instructor/evaluaciones', icon: <ClipboardCheck className="w-5 h-5" />, badge: 3 },
  { label: 'Comentarios', href: '/instructor/comentarios', icon: <MessageSquare className="w-5 h-5" />, badge: 8 },
  { label: 'Overview', href: '/instructor/educacion', icon: <LayoutDashboard className="w-5 h-5" />, section: 'EDUCACIÓN' },
  { label: 'Fases', href: '/instructor/educacion/fases', icon: <Layers className="w-5 h-5" /> },
  { label: 'Rutas', href: '/instructor/educacion/rutas', icon: <Route className="w-5 h-5" /> },
  { label: 'Programas', href: '/instructor/educacion/programas', icon: <BookOpen className="w-5 h-5" /> },
  { label: 'Clases', href: '/instructor/educacion/clases', icon: <Video className="w-5 h-5" /> },
];

export function Sidebar() {
  const location = useLocation();
  const { isSuperAdmin, isInstructor } = useRole();

  const navItems = isSuperAdmin ? superadminNavItems : instructorNavItems;

  let currentSection = '';

  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col h-screen fixed left-0 top-0">
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">Cronoss</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const showSection = item.section && item.section !== currentSection;
            if (item.section) currentSection = item.section;

            const isActive = location.pathname === item.href || 
              (item.href !== '/' && item.href !== '/instructor' && location.pathname.startsWith(item.href));

            return (
              <li key={item.href}>
                {showSection && (
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 pt-4 pb-2">
                    {item.section}
                  </div>
                )}
                <Link
                  to={item.href}
                  className={cn(
                    'nav-item',
                    isActive && 'active'
                  )}
                >
                  {item.icon}
                  <span className="flex-1">{item.label}</span>
                  {item.badge && (
                    <span className="bg-primary text-primary-foreground text-xs font-medium px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border">
        <Link to="/settings" className="nav-item">
          <Settings className="w-5 h-5" />
          <span>Configuración</span>
        </Link>
        <div className="mt-4 px-3 text-xs text-muted-foreground">
          Cronoss Nexus v1.0
        </div>
      </div>
    </aside>
  );
}
