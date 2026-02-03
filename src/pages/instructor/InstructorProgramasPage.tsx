import { MainLayout } from '@/components/layout/MainLayout';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  Clock,
  Users,
  Layers,
  ClipboardCheck,
  MessageSquare,
  ChevronRight,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';

interface ProgramaCard {
  id: string;
  name: string;
  ruta: string;
  fase: string;
  modulosCount: number;
  clasesCount: number;
  duration: string;
  studentsCount: number;
  tier: 'free' | 'basic' | 'pro' | 'premium';
  pendingEvaluations: number;
  pendingComments: number;
  avgProgress: number;
}

const mockProgramas: ProgramaCard[] = [
  {
    id: '1',
    name: 'Fundamentos del Análisis Técnico',
    ruta: 'Análisis Técnico Básico',
    fase: 'Fundamentación',
    modulosCount: 3,
    clasesCount: 12,
    duration: '8h 30m',
    studentsCount: 342,
    tier: 'basic',
    pendingEvaluations: 2,
    pendingComments: 5,
    avgProgress: 68,
  },
  {
    id: '2',
    name: 'Gestión de Riesgo',
    ruta: 'Gestión de Portafolio',
    fase: 'Aplicación',
    modulosCount: 4,
    clasesCount: 16,
    duration: '6h 15m',
    studentsCount: 187,
    tier: 'pro',
    pendingEvaluations: 1,
    pendingComments: 2,
    avgProgress: 54,
  },
  {
    id: '3',
    name: 'Introducción a los Mercados',
    ruta: 'Introducción al Trading',
    fase: 'Fundamentación',
    modulosCount: 5,
    clasesCount: 20,
    duration: '10h 00m',
    studentsCount: 521,
    tier: 'free',
    pendingEvaluations: 0,
    pendingComments: 1,
    avgProgress: 82,
  },
  {
    id: '4',
    name: 'Psicología del Trading',
    ruta: 'Mindset del Trader',
    fase: 'Dominio',
    modulosCount: 3,
    clasesCount: 9,
    duration: '5h 45m',
    studentsCount: 298,
    tier: 'premium',
    pendingEvaluations: 0,
    pendingComments: 0,
    avgProgress: 45,
  },
];

const tierColors = {
  free: 'border-gray-200 bg-gray-50 text-gray-700',
  basic: 'border-blue-200 bg-blue-50 text-blue-700',
  pro: 'border-purple-200 bg-purple-50 text-purple-700',
  premium: 'border-amber-200 bg-amber-50 text-amber-700',
};

export function InstructorProgramasPage() {
  return (
    <MainLayout breadcrumbs={[{ label: 'my workspace' }, { label: 'mis programas' }]}>
      <div className="max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">Mis Programas</h1>
          <p className="text-muted-foreground">Programas asignados para gestionar</p>
        </div>

        {/* Programs List */}
        <div className="space-y-4">
          {mockProgramas.map((programa) => (
            <Link
              key={programa.id}
              to={`/instructor/programas/${programa.id}`}
              className="block bg-card border border-border rounded-xl p-5 hover:shadow-lg transition-all hover:border-primary/50 group"
            >
              <div className="flex items-start justify-between gap-6">
                {/* Left: Main info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors truncate">
                      {programa.name}
                    </h3>
                    <Badge variant="outline" className={cn(tierColors[programa.tier])}>
                      {programa.tier.charAt(0).toUpperCase() + programa.tier.slice(1)}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <span>{programa.fase}</span>
                    <ChevronRight className="w-3 h-3" />
                    <span>{programa.ruta}</span>
                  </div>

                  <div className="grid grid-cols-4 gap-6 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-muted rounded">
                        <Layers className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-muted-foreground">Módulos</p>
                        <p className="font-medium">{programa.modulosCount}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-muted rounded">
                        <BookOpen className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-muted-foreground">Clases</p>
                        <p className="font-medium">{programa.clasesCount}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-muted rounded">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-muted-foreground">Duración</p>
                        <p className="font-medium">{programa.duration}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-muted rounded">
                        <Users className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-muted-foreground">Estudiantes</p>
                        <p className="font-medium">{programa.studentsCount}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Stats and alerts */}
                <div className="flex flex-col items-end gap-4 shrink-0">
                  {/* Pending items */}
                  <div className="flex items-center gap-3">
                    {programa.pendingEvaluations > 0 && (
                      <div className="flex items-center gap-1.5 text-warning">
                        <ClipboardCheck className="w-4 h-4" />
                        <span className="text-sm font-medium">{programa.pendingEvaluations} eval.</span>
                      </div>
                    )}
                    {programa.pendingComments > 0 && (
                      <div className="flex items-center gap-1.5 text-destructive">
                        <MessageSquare className="w-4 h-4" />
                        <span className="text-sm font-medium">{programa.pendingComments} com.</span>
                      </div>
                    )}
                    {programa.pendingEvaluations === 0 && programa.pendingComments === 0 && (
                      <Badge variant="outline" className="border-success/50 bg-success/10 text-success">
                        Al día
                      </Badge>
                    )}
                  </div>

                  {/* Average progress */}
                  <div className="w-40">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Avance promedio</span>
                      <span className="font-medium">{programa.avgProgress}%</span>
                    </div>
                    <Progress value={programa.avgProgress} className="h-2" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}

export default InstructorProgramasPage;
