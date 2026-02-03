import { MainLayout } from '@/components/layout/MainLayout';
import { useRole } from '@/contexts/RoleContext';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Clock,
  Users,
  BookOpen,
  Upload
} from 'lucide-react';
import { BatchUploadDialog } from '@/components/education/BatchUploadDialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface Programa {
  id: string;
  name: string;
  nameEn: string;
  ruta: string;
  tier: 'free' | 'basic' | 'pro' | 'premium';
  status: 'published' | 'draft';
  modulosCount: number;
  clasesCount: number;
  duracion: string;
  studentsCount: number;
  completionEs: number;
  completionEn: number;
  pendingEvaluations: number;
  pendingComments: number;
}

const mockProgramas: Programa[] = [
  {
    id: '1',
    name: 'Fundamentos del Análisis Técnico',
    nameEn: 'Technical Analysis Fundamentals',
    ruta: 'Análisis Técnico Básico',
    tier: 'basic',
    status: 'published',
    modulosCount: 3,
    clasesCount: 24,
    duracion: '8h 30m',
    studentsCount: 342,
    completionEs: 100,
    completionEn: 85,
    pendingEvaluations: 5,
    pendingComments: 3,
  },
  {
    id: '2',
    name: 'Introducción a los Mercados Financieros',
    nameEn: 'Introduction to Financial Markets',
    ruta: 'Introducción al Trading',
    tier: 'free',
    status: 'published',
    modulosCount: 2,
    clasesCount: 16,
    duracion: '5h 15m',
    studentsCount: 1205,
    completionEs: 100,
    completionEn: 100,
    pendingEvaluations: 0,
    pendingComments: 8,
  },
  {
    id: '3',
    name: 'Gestión de Portafolio Avanzada',
    nameEn: 'Advanced Portfolio Management',
    ruta: 'Gestión de Riesgo',
    tier: 'pro',
    status: 'draft',
    modulosCount: 4,
    clasesCount: 32,
    duracion: '12h 45m',
    studentsCount: 89,
    completionEs: 75,
    completionEn: 45,
    pendingEvaluations: 2,
    pendingComments: 1,
  },
];

const tierColors = {
  free: 'border-gray-200 bg-gray-50 text-gray-700',
  basic: 'border-blue-200 bg-blue-50 text-blue-700',
  pro: 'border-purple-200 bg-purple-50 text-purple-700',
  premium: 'border-amber-200 bg-amber-50 text-amber-700',
};

export function ProgramasPage() {
  const { isInstructor } = useRole();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProgramas = mockProgramas.filter(programa =>
    programa.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    programa.nameEn.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <MainLayout breadcrumbs={[{ label: 'education' }, { label: 'programas' }]}>
      <div className="max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              {isInstructor ? 'Mis Programas' : 'Programas'}
            </h1>
            <p className="text-muted-foreground">
              {isInstructor 
                ? 'Programas asignados a tu cuenta de instructor'
                : 'Cursos completos con módulos y clases'
              }
            </p>
          </div>
          <div className="flex items-center gap-2">
            <BatchUploadDialog
              contentType="programas"
              onComplete={(data) => console.log('Imported programas:', data)}
              trigger={
                <Button variant="outline">
                  <Upload className="w-4 h-4 mr-2" />
                  Carga Masiva
                </Button>
              }
            />
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Nuevo Programa
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar programas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="w-4 h-4" />
          </Button>
        </div>

        {/* Cards view for quick overview */}
        {isInstructor && (
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {filteredProgramas.slice(0, 3).map((programa) => (
              <Link 
                key={programa.id}
                to={`/programas/${programa.id}`}
                className="bg-card border border-border rounded-xl p-5 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <Badge variant="outline" className={cn(tierColors[programa.tier])}>
                    {programa.tier.charAt(0).toUpperCase() + programa.tier.slice(1)}
                  </Badge>
                  {programa.pendingEvaluations > 0 && (
                    <span className="bg-destructive text-destructive-foreground text-xs font-medium px-2 py-0.5 rounded-full">
                      {programa.pendingEvaluations} eval.
                    </span>
                  )}
                </div>
                <h3 className="font-semibold text-foreground mb-2">{programa.name}</h3>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    {programa.modulosCount} módulos
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {programa.duracion}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span>{programa.studentsCount} estudiantes</span>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Table */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Programa</TableHead>
                {!isInstructor && <TableHead>Ruta</TableHead>}
                <TableHead>Tier</TableHead>
                <TableHead>Módulos</TableHead>
                <TableHead>Estudiantes</TableHead>
                <TableHead>Completitud</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProgramas.map((programa) => (
                <TableRow key={programa.id}>
                  <TableCell>
                    <Link to={`/programas/${programa.id}`} className="hover:text-primary transition-colors">
                      <p className="font-medium text-foreground">{programa.name}</p>
                      <p className="text-sm text-muted-foreground">{programa.nameEn}</p>
                    </Link>
                  </TableCell>
                  {!isInstructor && (
                    <TableCell className="text-muted-foreground">{programa.ruta}</TableCell>
                  )}
                  <TableCell>
                    <Badge variant="outline" className={cn(tierColors[programa.tier])}>
                      {programa.tier.charAt(0).toUpperCase() + programa.tier.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span>{programa.modulosCount}</span>
                    <span className="text-muted-foreground text-sm ml-1">({programa.clasesCount} clases)</span>
                  </TableCell>
                  <TableCell>{programa.studentsCount}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground w-6">ES</span>
                        <Progress value={programa.completionEs} className="h-2 flex-1" />
                        <span className="text-xs text-muted-foreground w-8">{programa.completionEs}%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground w-6">EN</span>
                        <Progress value={programa.completionEn} className="h-2 flex-1" />
                        <span className="text-xs text-muted-foreground w-8">{programa.completionEn}%</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline"
                      className={cn(
                        programa.status === 'published' 
                          ? 'border-success/50 bg-success/10 text-success' 
                          : 'border-muted-foreground/50 bg-muted text-muted-foreground'
                      )}
                    >
                      {programa.status === 'published' ? 'Publicado' : 'Borrador'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link to={`/programas/${programa.id}`}>
                            <Eye className="w-4 h-4 mr-2" />
                            Ver detalle
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="w-4 h-4 mr-2" />
                          Editar
                        </DropdownMenuItem>
                        {!isInstructor && (
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Eliminar
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
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

export default ProgramasPage;
