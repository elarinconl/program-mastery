import { MainLayout } from '@/components/layout/MainLayout';
import { useRole } from '@/contexts/RoleContext';
import { useState } from 'react';
import { 
  Search, 
  Plus,
  Video,
  FileText,
  HelpCircle,
  FileIcon,
  ChevronDown,
  ChevronRight,
  Clock,
  Check,
  Eye,
  GripVertical,
  Zap,
  Upload
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import { BatchUploadDialog } from '@/components/education/BatchUploadDialog';

interface Clase {
  id: string;
  name: string;
  nameEn: string;
  type: 'video' | 'text' | 'quiz' | 'pdf';
  isActivity: boolean;
  duration: string;
  status: 'draft' | 'preview' | 'published' | 'archived';
  moduloId: string;
  moduloName: string;
  programaId: string;
  programaName: string;
  order: number;
}

interface Modulo {
  id: string;
  name: string;
  programaId: string;
  programaName: string;
  clases: Clase[];
}

interface Programa {
  id: string;
  name: string;
  modulos: Modulo[];
  totalClases: number;
}

const mockProgramas: Programa[] = [
  {
    id: 'p1',
    name: 'Mentalidad Financiera y Relación con el Dinero',
    totalClases: 6,
    modulos: [
      {
        id: 'm1',
        name: 'Modulo 1',
        programaId: 'p1',
        programaName: 'Mentalidad Financiera y Relación con el Dinero',
        clases: [
          { id: 'c1', name: 'Mercado de materias primas', nameEn: 'Market raw materials', type: 'video', isActivity: false, duration: '2m 18s', status: 'published', moduloId: 'm1', moduloName: 'Modulo 1', programaId: 'p1', programaName: 'Mentalidad Financiera', order: 1 },
          { id: 'c2', name: 'Proyecto/test', nameEn: 'Proyecto/test', type: 'video', isActivity: false, duration: '36s', status: 'published', moduloId: 'm1', moduloName: 'Modulo 1', programaId: 'p1', programaName: 'Mentalidad Financiera', order: 2 },
          { id: 'c3', name: 'Simulación de escenarios de pérdida', nameEn: 'Simulación de escenarios de pérdida', type: 'video', isActivity: false, duration: '3m 12s', status: 'published', moduloId: 'm1', moduloName: 'Modulo 1', programaId: 'p1', programaName: 'Mentalidad Financiera', order: 3 },
          { id: 'c4', name: 'Actividad: Reflexión personal', nameEn: 'Activity: Personal reflection', type: 'text', isActivity: true, duration: '15 min', status: 'published', moduloId: 'm1', moduloName: 'Modulo 1', programaId: 'p1', programaName: 'Mentalidad Financiera', order: 4 },
        ],
      },
    ],
  },
];

const claseTypeIcons = {
  video: <Video className="w-4 h-4" />,
  text: <FileText className="w-4 h-4" />,
  quiz: <HelpCircle className="w-4 h-4" />,
  pdf: <FileIcon className="w-4 h-4" />,
};

const claseTypeLabels = {
  video: 'Video',
  text: 'Texto',
  quiz: 'Quiz',
  pdf: 'PDF',
};

const statusColors = {
  draft: 'border-muted-foreground/50 bg-muted text-muted-foreground',
  preview: 'border-blue-200 bg-blue-50 text-blue-700',
  published: 'border-success/50 bg-success/10 text-success',
  archived: 'border-orange-200 bg-orange-50 text-orange-700',
};

const statusLabels = {
  draft: 'Borrador',
  preview: 'Preview',
  published: 'Publicado',
  archived: 'Archivado',
};

interface CreateClaseDialogProps {
  isActivity?: boolean;
}

function CreateClaseDialog({ isActivity = false }: CreateClaseDialogProps) {
  const [type, setType] = useState<'video' | 'text' | 'quiz' | 'pdf'>('video');
  const [isActivityChecked, setIsActivityChecked] = useState(isActivity);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          {isActivity ? 'Nueva Actividad' : 'Nueva Clase'}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{isActivity ? 'Crear Nueva Actividad' : 'Crear Nueva Clase'}</DialogTitle>
          <DialogDescription>
            {isActivity 
              ? 'Las actividades son ejercicios prácticos para los estudiantes'
              : 'Agrega una nueva clase al módulo seleccionado'
            }
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Programa */}
          <div>
            <Label>Programa</Label>
            <Select>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Seleccionar programa" />
              </SelectTrigger>
              <SelectContent>
                {mockProgramas.map(p => (
                  <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Módulo */}
          <div>
            <Label>Módulo</Label>
            <Select>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Seleccionar módulo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="m1">Módulo 1</SelectItem>
                <SelectItem value="m2">Módulo 2</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Tipo */}
          <div>
            <Label>Tipo de contenido</Label>
            <Select value={type} onValueChange={(v) => setType(v as any)}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="video">
                  <div className="flex items-center gap-2">
                    <Video className="w-4 h-4" />
                    Video
                  </div>
                </SelectItem>
                <SelectItem value="text">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Texto
                  </div>
                </SelectItem>
                <SelectItem value="quiz">
                  <div className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4" />
                    Quiz
                  </div>
                </SelectItem>
                <SelectItem value="pdf">
                  <div className="flex items-center gap-2">
                    <FileIcon className="w-4 h-4" />
                    PDF
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Is Activity Toggle */}
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-3">
              <Zap className="w-5 h-5 text-primary" />
              <div>
                <Label className="cursor-pointer">Es una Actividad</Label>
                <p className="text-xs text-muted-foreground">
                  Marcar si es un ejercicio práctico del módulo
                </p>
              </div>
            </div>
            <Switch 
              checked={isActivityChecked} 
              onCheckedChange={setIsActivityChecked}
            />
          </div>

          {/* Nombre ES */}
          <div>
            <Label>Nombre (ES)</Label>
            <Input className="mt-1" placeholder="Nombre de la clase en español" />
          </div>

          {/* Nombre EN */}
          <div>
            <Label>Nombre (EN)</Label>
            <Input className="mt-1" placeholder="Class name in English" />
          </div>

          {/* Contenido según tipo */}
          {type === 'video' && (
            <div>
              <Label>URL del video</Label>
              <Input className="mt-1" placeholder="https://..." />
            </div>
          )}

          {type === 'text' && (
            <div>
              <Label>Contenido</Label>
              <Textarea className="mt-1" placeholder="Escribe el contenido..." rows={4} />
            </div>
          )}

          {type === 'pdf' && (
            <div>
              <Label>Archivo PDF</Label>
              <Input className="mt-1" type="file" accept=".pdf" />
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline">Cancelar</Button>
          <Button>Crear {isActivityChecked ? 'Actividad' : 'Clase'}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function ClasesPage() {
  const { isSuperAdmin, isInstructor } = useRole();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterFase, setFilterFase] = useState<string>('all');
  const [filterRuta, setFilterRuta] = useState<string>('all');
  const [filterPrograma, setFilterPrograma] = useState<string>('all');
  const [filterModulo, setFilterModulo] = useState<string>('all');
  const [expandedProgramas, setExpandedProgramas] = useState<string[]>(['p1']);
  const [expandedModulos, setExpandedModulos] = useState<string[]>(['m1']);

  const togglePrograma = (id: string) => {
    setExpandedProgramas(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const toggleModulo = (id: string) => {
    setExpandedModulos(prev => 
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    );
  };

  // Stats
  const totalClases = mockProgramas.reduce((acc, p) => acc + p.totalClases, 0);

  return (
    <MainLayout breadcrumbs={[{ label: 'education' }, { label: 'classes' }]}>
      <div className="max-w-7xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-muted rounded-xl">
            <Video className="w-6 h-6 text-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Clases</h1>
            <p className="text-muted-foreground">Contenido educativo de los programas</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <div className="stat-card">
            <div className="p-2 bg-primary/10 rounded-lg w-fit mb-2">
              <Video className="w-4 h-4 text-primary" />
            </div>
            <p className="text-sm text-muted-foreground">Total Clases</p>
            <p className="text-2xl font-bold">{totalClases}</p>
          </div>
          <div className="stat-card">
            <div className="p-2 bg-muted rounded-lg w-fit mb-2">
              <FileText className="w-4 h-4 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">Borrador</p>
            <p className="text-2xl font-bold">0</p>
          </div>
          <div className="stat-card">
            <div className="p-2 bg-blue-50 rounded-lg w-fit mb-2">
              <Eye className="w-4 h-4 text-blue-600" />
            </div>
            <p className="text-sm text-muted-foreground">Preview</p>
            <p className="text-2xl font-bold">0</p>
          </div>
          <div className="stat-card">
            <div className="p-2 bg-success/10 rounded-lg w-fit mb-2">
              <Check className="w-4 h-4 text-success" />
            </div>
            <p className="text-sm text-muted-foreground">Publicado</p>
            <p className="text-2xl font-bold">{totalClases}</p>
          </div>
          <div className="stat-card">
            <div className="p-2 bg-orange-50 rounded-lg w-fit mb-2">
              <FileIcon className="w-4 h-4 text-orange-600" />
            </div>
            <p className="text-sm text-muted-foreground">Archivado</p>
            <p className="text-2xl font-bold">0</p>
          </div>
        </div>

        {/* Type Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6 max-w-md">
          <div className="stat-card flex items-center gap-3">
            <div className="p-2 bg-red-50 rounded-lg">
              <Video className="w-4 h-4 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Videos</p>
              <p className="text-xl font-bold">{totalClases}</p>
            </div>
          </div>
          <div className="stat-card flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <FileText className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Texto</p>
              <p className="text-xl font-bold">0</p>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="relative max-w-md mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por titulo..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3 mb-6">
          <Select value={filterFase} onValueChange={setFilterFase}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Todas las fases" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las fases</SelectItem>
              <SelectItem value="f1">Fase 1</SelectItem>
              <SelectItem value="f2">Fase 2</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterRuta} onValueChange={setFilterRuta}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Todas las rutas" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las rutas</SelectItem>
              <SelectItem value="r1">Ruta 1</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterPrograma} onValueChange={setFilterPrograma}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Todos los programas" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los programas</SelectItem>
              {mockProgramas.map(p => (
                <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filterModulo} onValueChange={setFilterModulo}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Todos los módulos" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los módulos</SelectItem>
              <SelectItem value="m1">Módulo 1</SelectItem>
              <SelectItem value="m2">Módulo 2</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Results count and action */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-muted-foreground">
            {totalClases} clase(s) encontrada(s)
          </p>
          <div className="flex gap-2">
            <BatchUploadDialog
              contentType="clases"
              onComplete={(data) => console.log('Imported clases:', data)}
              trigger={
                <Button variant="outline">
                  <Upload className="w-4 h-4 mr-2" />
                  Carga Masiva
                </Button>
              }
            />
            <CreateClaseDialog />
            <CreateClaseDialog isActivity />
          </div>
        </div>

        {/* Clases list */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          {mockProgramas.map((programa) => (
            <div key={programa.id} className="border-b border-border last:border-b-0">
              {/* Programa header */}
              <button
                onClick={() => togglePrograma(programa.id)}
                className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  {expandedProgramas.includes(programa.id) ? (
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  )}
                  <Video className="w-5 h-5 text-muted-foreground" />
                  <div className="text-left">
                    <p className="font-medium">{programa.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Fundamentos del Sistema Financiero y de Mercado {'>'} Base Patrimonial Personal
                    </p>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  {programa.modulos.length} modulo • {programa.totalClases} clases
                </div>
              </button>

              {/* Modulos */}
              {expandedProgramas.includes(programa.id) && (
                <div className="border-t border-border">
                  {programa.modulos.map((modulo) => (
                    <div key={modulo.id}>
                      {/* Modulo header */}
                      <button
                        onClick={() => toggleModulo(modulo.id)}
                        className="w-full flex items-center justify-between px-4 py-3 pl-12 hover:bg-muted/50 transition-colors border-b border-border"
                      >
                        <div className="flex items-center gap-3">
                          {expandedModulos.includes(modulo.id) ? (
                            <ChevronDown className="w-4 h-4 text-muted-foreground" />
                          ) : (
                            <ChevronRight className="w-4 h-4 text-muted-foreground" />
                          )}
                          <FileIcon className="w-4 h-4 text-muted-foreground" />
                          <span className="font-medium">{modulo.name}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {modulo.clases.length} clases
                        </span>
                      </button>

                      {/* Clases */}
                      {expandedModulos.includes(modulo.id) && (
                        <div>
                          {modulo.clases.map((clase) => (
                            <div
                              key={clase.id}
                              className="flex items-center justify-between px-4 py-3 pl-20 hover:bg-muted/30 transition-colors border-b border-border last:border-b-0"
                            >
                              <div className="flex items-center gap-3">
                                <GripVertical className="w-4 h-4 text-muted-foreground cursor-grab" />
                                <span className="text-sm text-muted-foreground w-10">{clase.id.replace('c', '')}</span>
                                <div>
                                  <div className="flex items-center gap-2">
                                    <p className="font-medium">{clase.name}</p>
                                    {clase.isActivity && (
                                      <Badge variant="outline" className="border-primary/50 bg-primary/10 text-primary text-xs">
                                        <Zap className="w-3 h-3 mr-1" />
                                        Actividad
                                      </Badge>
                                    )}
                                  </div>
                                  <p className="text-sm text-muted-foreground">EN: {clase.nameEn}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-4">
                                <Badge 
                                  variant="outline" 
                                  className={cn(
                                    'text-xs',
                                    clase.type === 'video' && 'border-red-200 bg-red-50 text-red-700'
                                  )}
                                >
                                  <Video className="w-3 h-3 mr-1" />
                                  {claseTypeLabels[clase.type]}
                                </Badge>
                                <Badge 
                                  variant="outline"
                                  className="border-success/50 bg-success/10 text-success text-xs"
                                >
                                  <Check className="w-3 h-3 mr-1" />
                                  Listo
                                </Badge>
                                <span className="text-sm text-muted-foreground flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {clase.duration}
                                </span>
                                <Badge variant="outline" className={cn(statusColors[clase.status], 'text-xs')}>
                                  {statusLabels[clase.status]}
                                </Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}

export default ClasesPage;
