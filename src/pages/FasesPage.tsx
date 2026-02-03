import { MainLayout } from '@/components/layout/MainLayout';
import { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  ArrowUpDown,
  Upload
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BatchUploadDialog } from '@/components/education/BatchUploadDialog';
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
import { cn } from '@/lib/utils';

interface Fase {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  order: number;
  status: 'published' | 'draft';
  rutasCount: number;
  programasCount: number;
}

const mockFases: Fase[] = [
  {
    id: '1',
    name: 'Fundamentación',
    nameEn: 'Foundation',
    description: 'Bases teóricas y conceptuales del análisis de mercados',
    order: 1,
    status: 'published',
    rutasCount: 6,
    programasCount: 24,
  },
  {
    id: '2',
    name: 'Aplicación',
    nameEn: 'Application',
    description: 'Implementación práctica de estrategias y herramientas',
    order: 2,
    status: 'published',
    rutasCount: 8,
    programasCount: 32,
  },
  {
    id: '3',
    name: 'Dominio',
    nameEn: 'Mastery',
    description: 'Especialización y perfeccionamiento avanzado',
    order: 3,
    status: 'published',
    rutasCount: 4,
    programasCount: 16,
  },
];

export function FasesPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFases = mockFases.filter(fase =>
    fase.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    fase.nameEn.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <MainLayout breadcrumbs={[{ label: 'education' }, { label: 'fases' }]}>
      <div className="max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Fases</h1>
            <p className="text-muted-foreground">
              Etapas del journey educativo según la taxonomía de Bloom
            </p>
          </div>
          <div className="flex items-center gap-2">
            <BatchUploadDialog
              contentType="fases"
              onComplete={(data) => console.log('Imported fases:', data)}
              trigger={
                <Button variant="outline">
                  <Upload className="w-4 h-4 mr-2" />
                  Carga Masiva
                </Button>
              }
            />
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Nueva Fase
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar fases..."
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
                <TableHead className="w-16">
                  <Button variant="ghost" size="sm" className="h-8 -ml-3">
                    Orden
                    <ArrowUpDown className="w-3 h-3 ml-1" />
                  </Button>
                </TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Nombre (EN)</TableHead>
                <TableHead>Rutas</TableHead>
                <TableHead>Programas</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredFases.map((fase) => (
                <TableRow key={fase.id}>
                  <TableCell className="font-medium">{fase.order}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium text-foreground">{fase.name}</p>
                      <p className="text-sm text-muted-foreground">{fase.description}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{fase.nameEn}</TableCell>
                  <TableCell>{fase.rutasCount}</TableCell>
                  <TableCell>{fase.programasCount}</TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline"
                      className={cn(
                        fase.status === 'published' 
                          ? 'border-success/50 bg-success/10 text-success' 
                          : 'border-muted-foreground/50 bg-muted text-muted-foreground'
                      )}
                    >
                      {fase.status === 'published' ? 'Publicada' : 'Borrador'}
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
                          Ver detalle
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="w-4 h-4 mr-2" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Eliminar
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

export default FasesPage;
