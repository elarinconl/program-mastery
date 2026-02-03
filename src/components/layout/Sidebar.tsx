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
} from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: number;
  adminOnly?: boolean;
  section?: string;
}

const navItems: NavItem[] = [
  { label: 'Overview', href: '/', icon: <LayoutDashboard className="w-5 h-5" />, section: 'EDUCACIÓN' },
  { label: 'Fases', href: '/fases', icon: <Layers className="w-5 h-5" />, adminOnly: true },
  { label: 'Rutas', href: '/rutas', icon: <Route className="w-5 h-5" />, adminOnly: true },
  { label: 'Programas', href: '/programas', icon: <BookOpen className="w-5 h-5" /> },
  { label: 'Clases', href: '/clases', icon: <Video className="w-5 h-5" />, adminOnly: true },
  { label: 'Estudiantes', href: '/estudiantes', icon: <Users className="w-5 h-5" />, section: 'GESTIÓN' },
  { label: 'Evaluaciones', href: '/evaluaciones', icon: <ClipboardCheck className="w-5 h-5" />, badge: 5 },
  { label: 'Comentarios', href: '/comentarios', icon: <MessageSquare className="w-5 h-5" />, badge: 12 },
  { label: 'Batch Upload', href: '/batch-upload', icon: <Upload className="w-5 h-5" />, adminOnly: true, section: 'HERRAMIENTAS' },
  { label: 'Organizaciones', href: '/organizaciones', icon: <Building2 className="w-5 h-5" />, adminOnly: true },
];

export function Sidebar() {
  const location = useLocation();
  const { isSuperAdmin, isInstructor } = useRole();

  const filteredItems = navItems.filter(item => {
    if (item.adminOnly && isInstructor) return false;
    return true;
  });

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
          {filteredItems.map((item) => {
            const showSection = item.section && item.section !== currentSection;
            if (item.section) currentSection = item.section;

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
                    location.pathname === item.href && 'active'
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
