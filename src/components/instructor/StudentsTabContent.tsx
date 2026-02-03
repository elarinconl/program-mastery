import { useState } from 'react';
import { Search, Download, MoreHorizontal, Eye } from 'lucide-react';
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

export interface Estudiante {
  id: string;
  name: string;
  email: string;
  pais: string;
  tier: string;
  registro: string;
  avance: number;
  moduloActual: string;
  claseActual: string;
  estadoExamen: 'pending' | 'submitted' | 'approved' | 'rejected';
  estadoCert: 'pending' | 'issued';
}

const tierColors: Record<string, string> = {
  free: 'border-gray-200 bg-gray-50 text-gray-700',
  basic: 'border-blue-200 bg-blue-50 text-blue-700',
  pro: 'border-purple-200 bg-purple-50 text-purple-700',
  premium: 'border-amber-200 bg-amber-50 text-amber-700',
  Free: 'border-gray-200 bg-gray-50 text-gray-700',
  Basic: 'border-blue-200 bg-blue-50 text-blue-700',
  Pro: 'border-purple-200 bg-purple-50 text-purple-700',
  Premium: 'border-amber-200 bg-amber-50 text-amber-700',
};

interface StudentsTabContentProps {
  estudiantes: Estudiante[];
  showExport?: boolean;
  showSearch?: boolean;
}

export function StudentsTabContent({ 
  estudiantes, 
  showExport = true,
  showSearch = true 
}: StudentsTabContentProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEstudiantes = estudiantes.filter(est => {
    const matchesSearch = est.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      est.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div>
      {/* Filters */}
      {(showSearch || showExport) && (
        <div className="flex items-center justify-between gap-4 mb-4">
          {showSearch && (
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar estudiantes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          )}
          {showExport && (
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
          )}
        </div>
      )}

      {/* Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Estudiante</TableHead>
              <TableHead>País</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Avance</TableHead>
              <TableHead>Módulo Actual</TableHead>
              <TableHead>Clase Actual</TableHead>
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
                  <Badge variant="outline" className={cn(tierColors[est.tier] || tierColors[est.tier.toLowerCase()])}>
                    {est.tier.charAt(0).toUpperCase() + est.tier.slice(1).toLowerCase()}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Progress value={est.avance} className="h-2 w-16" />
                    <span className="text-sm">{est.avance}%</span>
                  </div>
                </TableCell>
                <TableCell>
                  <p className="text-sm">{est.moduloActual}</p>
                </TableCell>
                <TableCell>
                  <p className="text-sm text-muted-foreground">{est.claseActual}</p>
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
            {filteredEstudiantes.length === 0 && (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                  No hay estudiantes que mostrar
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
