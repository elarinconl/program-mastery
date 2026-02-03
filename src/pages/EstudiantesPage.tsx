import { MainLayout } from '@/components/layout/MainLayout';
import { useRole } from '@/contexts/RoleContext';
import { useState } from 'react';
import { 
  Search, 
  Filter, 
  MoreHorizontal,
  Eye,
  Download
} from 'lucide-react';
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

interface Estudiante {
  id: string;
  name: string;
  email: string;
  pais: string;
  tier: 'free' | 'basic' | 'pro' | 'premium';
  registro: string;
  avance: number;
  moduloActual: string;
  claseActual: string;
  estadoExamen: 'pending' | 'submitted' | 'approved' | 'rejected';
  estadoCert: 'pending' | 'issued';
  programa: string;
}

const mockEstudiantes: Estudiante[] = [
  {
    id: '1',
    name: 'Carlos García',
    email: 'carlos@email.com',
    pais: 'México',
    tier: 'pro',
    registro: '2024-01-01',
    avance: 75,
    moduloActual: 'Indicadores Técnicos',
    claseActual: 'Medias móviles',
    estadoExamen: 'pending',
    estadoCert: 'pending',
    programa: 'Fundamentos del Análisis Técnico',
  },
  {
    id: '2',
    name: 'María López',
    email: 'maria@email.com',
    pais: 'España',
    tier: 'premium',
    registro: '2024-01-05',
    avance: 100,
    moduloActual: 'Completado',
    claseActual: '-',
    estadoExamen: 'submitted',
    estadoCert: 'pending',
    programa: 'Fundamentos del Análisis Técnico',
  },
  {
    id: '3',
    name: 'Juan Pérez',
    email: 'juan@email.com',
    pais: 'Argentina',
    tier: 'basic',
    registro: '2024-01-10',
    avance: 45,
    moduloActual: 'Patrones y Modelos',
    claseActual: 'Gaps',
    estadoExamen: 'pending',
    estadoCert: 'pending',
    programa: 'Introducción a los Mercados',
  },
  {
    id: '4',
    name: 'Ana Martínez',
    email: 'ana@email.com',
    pais: 'Colombia',
    tier: 'pro',
    registro: '2024-01-15',
    avance: 100,
    moduloActual: 'Completado',
    claseActual: '-',
    estadoExamen: 'approved',
    estadoCert: 'issued',
    programa: 'Fundamentos del Análisis Técnico',
  },
];

const tierColors = {
  free: 'border-gray-200 bg-gray-50 text-gray-700',
  basic: 'border-blue-200 bg-blue-50 text-blue-700',
  pro: 'border-purple-200 bg-purple-50 text-purple-700',
  premium: 'border-amber-200 bg-amber-50 text-amber-700',
};

export function EstudiantesPage() {
  const { isInstructor } = useRole();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEstudiantes = mockEstudiantes.filter(est =>
    est.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    est.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <MainLayout breadcrumbs={[{ label: 'gestión' }, { label: 'estudiantes' }]}>
      <div className="max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Estudiantes</h1>
            <p className="text-muted-foreground">
              {isInstructor 
                ? 'Estudiantes inscritos en tus programas'
                : 'Todos los estudiantes inscritos en la plataforma'
              }
            </p>
          </div>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar estudiantes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="w-4 h-4" />
          </Button>
        </div>

        {/* Table */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Estudiante</TableHead>
                <TableHead>País</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Programa</TableHead>
                <TableHead>Avance</TableHead>
                <TableHead>Módulo Actual</TableHead>
                <TableHead>Examen</TableHead>
                <TableHead>Certificación</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEstudiantes.map((est) => (
                <TableRow key={est.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{est.name}</p>
                      <p className="text-sm text-muted-foreground">{est.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>{est.pais}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={cn(tierColors[est.tier])}>
                      {est.tier.charAt(0).toUpperCase() + est.tier.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="max-w-[200px]">
                    <p className="truncate text-sm">{est.programa}</p>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={est.avance} className="h-2 w-16" />
                      <span className="text-sm">{est.avance}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="text-sm">{est.moduloActual}</p>
                      <p className="text-xs text-muted-foreground">{est.claseActual}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline"
                      className={cn(
                        est.estadoExamen === 'pending' && 'border-muted-foreground/50',
                        est.estadoExamen === 'submitted' && 'border-warning/50 bg-warning/10 text-warning',
                        est.estadoExamen === 'approved' && 'border-success/50 bg-success/10 text-success',
                        est.estadoExamen === 'rejected' && 'border-destructive/50 bg-destructive/10 text-destructive'
                      )}
                    >
                      {est.estadoExamen === 'pending' && 'Pendiente'}
                      {est.estadoExamen === 'submitted' && 'Enviado'}
                      {est.estadoExamen === 'approved' && 'Aprobado'}
                      {est.estadoExamen === 'rejected' && 'Rechazado'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline"
                      className={cn(
                        est.estadoCert === 'pending' && 'border-muted-foreground/50',
                        est.estadoCert === 'issued' && 'border-success/50 bg-success/10 text-success'
                      )}
                    >
                      {est.estadoCert === 'pending' && 'Pendiente'}
                      {est.estadoCert === 'issued' && 'Emitida'}
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
                        <DropdownMenuItem>
                          <Eye className="w-4 h-4 mr-2" />
                          Ver perfil
                        </DropdownMenuItem>
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

export default EstudiantesPage;
