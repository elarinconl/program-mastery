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
  ArrowUpDown
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
import { cn } from '@/lib/utils';

interface Ruta {
  id: string;
  name: string;
  nameEn: string;
  fase: string;
  tier: 'free' | 'basic' | 'pro' | 'premium';
  status: 'published' | 'draft';
  programasCount: number;
  clasesCount: number;
}

const mockRutas: Ruta[] = [
  {
    id: '1',
    name: 'Introducción al Trading',
    nameEn: 'Introduction to Trading',
    fase: 'Fundamentación',
    tier: 'free',
    status: 'published',
    programasCount: 4,
    clasesCount: 32,
  },
  {
    id: '2',
    name: 'Análisis Técnico Básico',
    nameEn: 'Basic Technical Analysis',
    fase: 'Fundamentación',
    tier: 'basic',
    status: 'published',
    programasCount: 3,
    clasesCount: 28,
  },
  {
    id: '3',
    name: 'Gestión de Riesgo',
    nameEn: 'Risk Management',
    fase: 'Aplicación',
    tier: 'pro',
    status: 'published',
    programasCount: 5,
    clasesCount: 45,
  },
  {
    id: '4',
    name: 'Estrategias Avanzadas',
    nameEn: 'Advanced Strategies',
    fase: 'Dominio',
    tier: 'premium',
    status: 'draft',
    programasCount: 2,
    clasesCount: 18,
  },
];

const tierColors = {
  free: 'border-gray-200 bg-gray-50 text-gray-700',
  basic: 'border-blue-200 bg-blue-50 text-blue-700',
  pro: 'border-purple-200 bg-purple-50 text-purple-700',
  premium: 'border-amber-200 bg-amber-50 text-amber-700',
};

export function RutasPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRutas = mockRutas.filter(ruta =>
    ruta.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ruta.nameEn.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <MainLayout breadcrumbs={[{ label: 'education' }, { label: 'rutas' }]}>
      <div className="max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Rutas de Aprendizaje</h1>
            <p className="text-muted-foreground">
              Colecciones de programas ordenados por nivel y tier
            </p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Nueva Ruta
          </Button>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar rutas..."
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
                <TableHead>Nombre</TableHead>
                <TableHead>Nombre (EN)</TableHead>
                <TableHead>Fase</TableHead>
                <TableHead>Tier</TableHead>
                <TableHead>Programas</TableHead>
                <TableHead>Clases</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRutas.map((ruta) => (
                <TableRow key={ruta.id}>
                  <TableCell>
                    <p className="font-medium text-foreground">{ruta.name}</p>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{ruta.nameEn}</TableCell>
                  <TableCell>{ruta.fase}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={cn(tierColors[ruta.tier])}>
                      {ruta.tier.charAt(0).toUpperCase() + ruta.tier.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>{ruta.programasCount}</TableCell>
                  <TableCell>{ruta.clasesCount}</TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline"
                      className={cn(
                        ruta.status === 'published' 
                          ? 'border-success/50 bg-success/10 text-success' 
                          : 'border-muted-foreground/50 bg-muted text-muted-foreground'
                      )}
                    >
                      {ruta.status === 'published' ? 'Publicada' : 'Borrador'}
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

export default RutasPage;
