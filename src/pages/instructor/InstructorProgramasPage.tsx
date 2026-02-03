import { MainLayout } from '@/components/layout/MainLayout';
import { Link } from 'react-router-dom';
import {
  Clock,
  Users,
  Layers,
  ClipboardCheck,
  MessageSquare,
  ChevronRight,
  Eye,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface ProgramaRow {
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

const mockProgramas: ProgramaRow[] = [
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

        {/* Programs Table */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="font-semibold">Programa</TableHead>
                <TableHead className="font-semibold">Fase / Ruta</TableHead>
                <TableHead className="font-semibold text-center">Módulos</TableHead>
                <TableHead className="font-semibold text-center">Clases</TableHead>
                <TableHead className="font-semibold text-center">Duración</TableHead>
                <TableHead className="font-semibold text-center">Estudiantes</TableHead>
                <TableHead className="font-semibold">Pendientes</TableHead>
                <TableHead className="font-semibold">Avance Prom.</TableHead>
                <TableHead className="font-semibold text-center">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockProgramas.map((programa) => (
                <TableRow key={programa.id} className="hover:bg-muted/30">
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground">{programa.name}</span>
                      <Badge variant="outline" className={cn('text-xs', tierColors[programa.tier])}>
                        {programa.tier.charAt(0).toUpperCase() + programa.tier.slice(1)}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">{programa.fase}</span>
                      <ChevronRight className="w-3 h-3" />
                      <span>{programa.ruta}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <Layers className="w-4 h-4 text-muted-foreground" />
                      <span>{programa.modulosCount}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">{programa.clasesCount}</TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span>{programa.duration}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span>{programa.studentsCount}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {programa.pendingEvaluations > 0 && (
                        <div className="flex items-center gap-1 text-warning">
                          <ClipboardCheck className="w-4 h-4" />
                          <span className="text-sm font-medium">{programa.pendingEvaluations}</span>
                        </div>
                      )}
                      {programa.pendingComments > 0 && (
                        <div className="flex items-center gap-1 text-destructive">
                          <MessageSquare className="w-4 h-4" />
                          <span className="text-sm font-medium">{programa.pendingComments}</span>
                        </div>
                      )}
                      {programa.pendingEvaluations === 0 && programa.pendingComments === 0 && (
                        <Badge variant="outline" className="border-success/50 bg-success/10 text-success text-xs">
                          Al día
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="w-28">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-muted-foreground">Promedio</span>
                        <span className="font-medium">{programa.avgProgress}%</span>
                      </div>
                      <Progress value={programa.avgProgress} className="h-1.5" />
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <Button asChild variant="ghost" size="sm">
                      <Link to={`/instructor/programas/${programa.id}`}>
                        <Eye className="w-4 h-4 mr-1.5" />
                        Ver
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </MainLayout>
  );
}

export default InstructorProgramasPage;
