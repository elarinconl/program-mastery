import { MainLayout } from '@/components/layout/MainLayout';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Clock,
  Users,
  Layers,
  Search,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
  instructorId: string;
  instructorName: string;
}

const mockInstructores = [
  { id: 'inst1', name: 'Carlos Mendoza' },
  { id: 'inst2', name: 'Ana García' },
  { id: 'inst3', name: 'Luis Rodríguez' },
];

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
    instructorId: 'inst1',
    instructorName: 'Carlos Mendoza',
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
    instructorId: 'inst1',
    instructorName: 'Carlos Mendoza',
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
    instructorId: 'inst2',
    instructorName: 'Ana García',
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
    instructorId: 'inst3',
    instructorName: 'Luis Rodríguez',
  },
  {
    id: '5',
    name: 'Análisis Fundamental',
    ruta: 'Análisis Técnico Básico',
    fase: 'Aplicación',
    modulosCount: 4,
    clasesCount: 15,
    duration: '7h 20m',
    studentsCount: 156,
    tier: 'basic',
    pendingEvaluations: 3,
    pendingComments: 4,
    avgProgress: 72,
    instructorId: 'inst2',
    instructorName: 'Ana García',
  },
];

const tierColors = {
  free: 'border-gray-200 bg-gray-50 text-gray-700',
  basic: 'border-blue-200 bg-blue-50 text-blue-700',
  pro: 'border-purple-200 bg-purple-50 text-purple-700',
  premium: 'border-amber-200 bg-amber-50 text-amber-700',
};

export function SuperAdminProgramasPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterInstructor, setFilterInstructor] = useState<string>('all');
  const [filterPrograma, setFilterPrograma] = useState<string>('all');

  const filteredProgramas = mockProgramas.filter(prog => {
    const matchesSearch = prog.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prog.instructorName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesInstructor = filterInstructor === 'all' || prog.instructorId === filterInstructor;
    const matchesPrograma = filterPrograma === 'all' || prog.id === filterPrograma;
    return matchesSearch && matchesInstructor && matchesPrograma;
  });

  const uniqueProgramas = Array.from(new Set(mockProgramas.map(p => p.id)))
    .map(id => mockProgramas.find(p => p.id === id)!);

  return (
    <MainLayout breadcrumbs={[{ label: 'instructor workspace' }, { label: 'programas activos' }]}>
      <div className="max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">Programas Activos</h1>
          <p className="text-muted-foreground">Todos los programas asignados a instructores</p>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por programa o instructor..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={filterInstructor} onValueChange={setFilterInstructor}>
            <SelectTrigger className="w-[250px]">
              <SelectValue placeholder="Filtrar por instructor" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los instructores</SelectItem>
              {mockInstructores.map(inst => (
                <SelectItem key={inst.id} value={inst.id}>{inst.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={filterPrograma} onValueChange={setFilterPrograma}>
            <SelectTrigger className="w-[250px]">
              <SelectValue placeholder="Filtrar por programa" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los programas</SelectItem>
              {uniqueProgramas.map(prog => (
                <SelectItem key={prog.id} value={prog.id}>{prog.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Programs Table */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="font-semibold">Programa</TableHead>
                <TableHead className="font-semibold">Instructor</TableHead>
                <TableHead className="font-semibold">Tier</TableHead>
                <TableHead className="font-semibold">Fase</TableHead>
                <TableHead className="font-semibold">Ruta</TableHead>
                <TableHead className="font-semibold text-center">Módulos</TableHead>
                <TableHead className="font-semibold text-center">Clases</TableHead>
                <TableHead className="font-semibold text-center">Duración</TableHead>
                <TableHead className="font-semibold text-center">Estudiantes</TableHead>
                <TableHead className="font-semibold">Avance Prom.</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProgramas.map((programa) => (
                <TableRow 
                  key={`${programa.id}-${programa.instructorId}`} 
                  className="hover:bg-muted/30 cursor-pointer"
                  onClick={() => navigate(`/superadmin/programas/${programa.id}?instructor=${programa.instructorId}`)}
                >
                  <TableCell>
                    <span className="font-medium text-foreground">{programa.name}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-foreground">{programa.instructorName}</span>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={cn('text-xs', tierColors[programa.tier])}>
                      {programa.tier.charAt(0).toUpperCase() + programa.tier.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-foreground">{programa.fase}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-muted-foreground">{programa.ruta}</span>
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
                    <div className="w-28">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-muted-foreground">Promedio</span>
                        <span className="font-medium">{programa.avgProgress}%</span>
                      </div>
                      <Progress value={programa.avgProgress} className="h-1.5" />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filteredProgramas.length === 0 && (
                <TableRow>
                  <TableCell colSpan={10} className="text-center py-8 text-muted-foreground">
                    No hay programas que mostrar con los filtros seleccionados
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </MainLayout>
  );
}

export default SuperAdminProgramasPage;
