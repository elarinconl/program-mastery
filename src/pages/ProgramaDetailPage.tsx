import { MainLayout } from '@/components/layout/MainLayout';
import { useRole } from '@/contexts/RoleContext';
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft,
  BookOpen,
  Clock,
  Users,
  Globe,
  Edit,
  Plus,
  GripVertical,
  Video,
  FileText,
  HelpCircle,
  FileIcon,
  MoreHorizontal,
  Trash2,
  Save,
  Upload,
  CheckCircle2,
  XCircle,
  MessageSquare,
  Download
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { cn } from '@/lib/utils';

// Mock data
const mockPrograma = {
  id: '1',
  name: 'Fundamentos del Análisis Técnico',
  nameEn: 'Technical Analysis Fundamentals',
  description: 'Aprende los conceptos fundamentales del análisis técnico para operar en los mercados financieros.',
  descriptionEn: 'Learn the fundamental concepts of technical analysis to trade in financial markets.',
  ruta: 'Análisis Técnico Básico',
  tier: 'basic' as const,
  status: 'published' as const,
  duracion: '8h 30m',
  studentsCount: 342,
  completionEs: 100,
  completionEn: 85,
  coverImage: '/placeholder.svg',
  modulos: [
    {
      id: 'm1',
      order: 1,
      name: 'Fundamentos del Análisis Técnico',
      nameEn: 'Technical Analysis Fundamentals',
      clases: [
        { id: 'c1', order: 1, name: 'Introducción', type: 'video', duration: '15:30' },
        { id: 'c2', order: 2, name: 'Teoría de Dow', type: 'video', duration: '22:45' },
        { id: 'c3', order: 3, name: 'Tipos de gráficos', type: 'video', duration: '18:20' },
        { id: 'c4', order: 4, name: 'Lectura complementaria', type: 'text', duration: '10 min' },
      ],
    },
    {
      id: 'm2',
      order: 2,
      name: 'Patrones y Modelos',
      nameEn: 'Patterns and Models',
      clases: [
        { id: 'c5', order: 1, name: 'Patrones de velas', type: 'video', duration: '28:15' },
        { id: 'c6', order: 2, name: 'Gaps', type: 'video', duration: '16:40' },
        { id: 'c7', order: 3, name: 'Quiz de repaso', type: 'quiz', duration: '15 min' },
      ],
    },
    {
      id: 'm3',
      order: 3,
      name: 'Indicadores Técnicos',
      nameEn: 'Technical Indicators',
      clases: [
        { id: 'c8', order: 1, name: 'Medias móviles', type: 'video', duration: '24:10' },
        { id: 'c9', order: 2, name: 'Osciladores', type: 'video', duration: '20:55' },
        { id: 'c10', order: 3, name: 'Fibonacci', type: 'video', duration: '19:30' },
        { id: 'c11', order: 4, name: 'Material PDF', type: 'pdf', duration: '15 páginas' },
      ],
    },
  ],
  competencias: [
    {
      id: 'comp1',
      name: 'Fundamentos del Análisis Técnico',
      nameEn: 'Technical Analysis Fundamentals',
      peso: 35,
      niveles: [
        { nivel: 1, descripcion: 'Reconoce algunos elementos del gráfico de forma incompleta o incorrecta.' },
        { nivel: 2, descripcion: 'Marca los elementos principales, con claridad parcial.' },
        { nivel: 3, descripcion: 'Identifica y organiza los elementos del gráfico, explicando su relación con el movimiento del precio.' },
        { nivel: 4, descripcion: 'Interpreta todos los elementos con claridad, los organiza de forma coherente y describe el comportamiento del precio con criterio propio.' },
      ],
    },
    {
      id: 'comp2',
      name: 'Patrones y Modelos',
      nameEn: 'Patterns and Models',
      peso: 35,
      niveles: [
        { nivel: 1, descripcion: 'Identifica patrones de forma imprecisa o sin contexto.' },
        { nivel: 2, descripcion: 'Reconoce patrones de velas sin explicar su implicación.' },
        { nivel: 3, descripcion: 'Interpreta patrones y gaps en contexto, anticipando posibles escenarios.' },
        { nivel: 4, descripcion: 'Integra el volumen, la fractalidad y la psicología del mercado con los patrones, explicando con precisión y criterio.' },
      ],
    },
    {
      id: 'comp3',
      name: 'Indicadores Técnicos',
      nameEn: 'Technical Indicators',
      peso: 30,
      niveles: [
        { nivel: 1, descripcion: 'Usa indicadores sin comprender su lógica ni contexto.' },
        { nivel: 2, descripcion: 'Explica qué hace un indicador sin aplicarlo correctamente.' },
        { nivel: 3, descripcion: 'Aplica indicadores adecuados para confirmar tendencias y evaluar fuerza.' },
        { nivel: 4, descripcion: 'Combina indicadores con el precio y estructura del mercado, mostrando dominio integral.' },
      ],
    },
  ],
  submissions: [
    {
      id: 's1',
      studentName: 'Carlos García',
      studentEmail: 'carlos@email.com',
      submittedAt: '2024-01-15 14:30',
      status: 'pending',
      fileUrl: '/placeholder.pdf',
    },
    {
      id: 's2',
      studentName: 'María López',
      studentEmail: 'maria@email.com',
      submittedAt: '2024-01-14 09:15',
      status: 'pending',
      fileUrl: '/placeholder.pdf',
    },
    {
      id: 's3',
      studentName: 'Juan Pérez',
      studentEmail: 'juan@email.com',
      submittedAt: '2024-01-13 16:45',
      status: 'approved',
      score: 8.5,
      fileUrl: '/placeholder.pdf',
    },
  ],
  estudiantes: [
    {
      id: 'e1',
      name: 'Carlos García',
      email: 'carlos@email.com',
      pais: 'México',
      tier: 'Pro',
      registro: '2024-01-01',
      avance: 75,
      moduloActual: 'Indicadores Técnicos',
      claseActual: 'Medias móviles',
      estadoExamen: 'pending',
      estadoCert: 'pending',
    },
    {
      id: 'e2',
      name: 'María López',
      email: 'maria@email.com',
      pais: 'España',
      tier: 'Premium',
      registro: '2024-01-05',
      avance: 100,
      moduloActual: 'Completado',
      claseActual: '-',
      estadoExamen: 'submitted',
      estadoCert: 'pending',
    },
  ],
  comentarios: [
    {
      id: 'com1',
      student: 'Ana Martínez',
      clase: 'Teoría de Dow',
      content: '¿Podrían explicar más sobre los principios de Dow?',
      date: '2024-01-15 10:30',
      status: 'open',
      replies: 0,
    },
    {
      id: 'com2',
      student: 'Pedro Sánchez',
      clase: 'Patrones de velas',
      content: 'Excelente explicación del hammer y doji',
      date: '2024-01-14 15:20',
      status: 'resolved',
      replies: 1,
    },
  ],
};

const tierColors = {
  free: 'border-gray-200 bg-gray-50 text-gray-700',
  basic: 'border-blue-200 bg-blue-50 text-blue-700',
  pro: 'border-purple-200 bg-purple-50 text-purple-700',
  premium: 'border-amber-200 bg-amber-50 text-amber-700',
};

const claseTypeIcons = {
  video: <Video className="w-4 h-4" />,
  text: <FileText className="w-4 h-4" />,
  quiz: <HelpCircle className="w-4 h-4" />,
  pdf: <FileIcon className="w-4 h-4" />,
};

export function ProgramaDetailPage() {
  const { id } = useParams();
  const { isInstructor, isSuperAdmin } = useRole();
  const [activeTab, setActiveTab] = useState('overview');

  const programa = mockPrograma;

  return (
    <MainLayout breadcrumbs={[{ label: 'education' }, { label: 'programas' }, { label: programa.name }]}>
      <div className="max-w-7xl">
        {/* Back button */}
        <Link 
          to="/programas" 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver a programas
        </Link>

        {/* Header */}
        <div className="flex items-start gap-6 mb-8">
          <img 
            src={programa.coverImage} 
            alt={programa.name}
            className="w-32 h-20 rounded-xl object-cover bg-muted"
          />
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-2xl font-bold text-foreground">{programa.name}</h1>
                  <Badge variant="outline" className={cn(tierColors[programa.tier])}>
                    {programa.tier.charAt(0).toUpperCase() + programa.tier.slice(1)}
                  </Badge>
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
                </div>
                <p className="text-muted-foreground mb-3">{programa.description}</p>
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    {programa.modulos.length} módulos
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {programa.duracion}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {programa.studentsCount} estudiantes
                  </span>
                  <span className="flex items-center gap-1">
                    <Globe className="w-4 h-4" />
                    ES: {programa.completionEs}% | EN: {programa.completionEn}%
                  </span>
                </div>
              </div>
              <Button variant="outline">
                <Edit className="w-4 h-4 mr-2" />
                Editar
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="contenido">Contenido</TabsTrigger>
            <TabsTrigger value="actividades">Actividades</TabsTrigger>
            <TabsTrigger value="evaluacion">Evaluación Final</TabsTrigger>
            <TabsTrigger value="rubrica">Rúbrica</TabsTrigger>
            <TabsTrigger value="submissions" className="relative">
              Submissions
              {programa.submissions.filter(s => s.status === 'pending').length > 0 && (
                <span className="ml-2 bg-destructive text-destructive-foreground text-xs px-1.5 py-0.5 rounded-full">
                  {programa.submissions.filter(s => s.status === 'pending').length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="estudiantes">Estudiantes</TabsTrigger>
            <TabsTrigger value="comentarios" className="relative">
              Comentarios
              {programa.comentarios.filter(c => c.status === 'open').length > 0 && (
                <span className="ml-2 bg-destructive text-destructive-foreground text-xs px-1.5 py-0.5 rounded-full">
                  {programa.comentarios.filter(c => c.status === 'open').length}
                </span>
              )}
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="font-semibold text-foreground mb-4">Información General</h3>
                <dl className="space-y-3">
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Ruta</dt>
                    <dd className="font-medium">{programa.ruta}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Duración</dt>
                    <dd className="font-medium">{programa.duracion}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Tier</dt>
                    <dd><Badge variant="outline" className={cn(tierColors[programa.tier])}>{programa.tier}</Badge></dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Estado</dt>
                    <dd><Badge variant="outline" className="border-success/50 bg-success/10 text-success">Publicado</Badge></dd>
                  </div>
                </dl>
              </div>
              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="font-semibold text-foreground mb-4">Completitud de Contenido</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Español</span>
                      <span className="font-medium">{programa.completionEs}%</span>
                    </div>
                    <Progress value={programa.completionEs} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Inglés</span>
                      <span className="font-medium">{programa.completionEn}%</span>
                    </div>
                    <Progress value={programa.completionEn} className="h-2" />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Contenido Tab */}
          <TabsContent value="contenido">
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-foreground">Módulos y Clases</h3>
                {isSuperAdmin && (
                  <Button size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Nuevo Módulo
                  </Button>
                )}
              </div>
              <Accordion type="multiple" defaultValue={['m1']} className="space-y-4">
                {programa.modulos.map((modulo) => (
                  <AccordionItem 
                    key={modulo.id} 
                    value={modulo.id}
                    className="border border-border rounded-lg px-4"
                  >
                    <AccordionTrigger className="hover:no-underline py-4">
                      <div className="flex items-center gap-3">
                        <GripVertical className="w-4 h-4 text-muted-foreground" />
                        <span className="bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded">
                          Módulo {modulo.order}
                        </span>
                        <span className="font-medium">{modulo.name}</span>
                        <span className="text-sm text-muted-foreground">({modulo.clases.length} clases)</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-4">
                      <div className="space-y-2 ml-7">
                        {modulo.clases.map((clase) => (
                          <div 
                            key={clase.id}
                            className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <GripVertical className="w-4 h-4 text-muted-foreground" />
                              <span className="text-muted-foreground">
                                {claseTypeIcons[clase.type as keyof typeof claseTypeIcons]}
                              </span>
                              <span>{clase.name}</span>
                              <span className="text-sm text-muted-foreground">{clase.duration}</span>
                            </div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreHorizontal className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Edit className="w-4 h-4 mr-2" />
                                  Editar
                                </DropdownMenuItem>
                                {isSuperAdmin && (
                                  <DropdownMenuItem className="text-destructive">
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Eliminar
                                  </DropdownMenuItem>
                                )}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        ))}
                        <Button variant="ghost" size="sm" className="w-full mt-2">
                          <Plus className="w-4 h-4 mr-2" />
                          Agregar clase
                        </Button>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </TabsContent>

          {/* Actividades Tab */}
          <TabsContent value="actividades">
            <div className="space-y-4">
              {programa.modulos.map((modulo) => (
                <div key={modulo.id} className="bg-card border border-border rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded mr-2">
                        Módulo {modulo.order}
                      </span>
                      <span className="font-semibold text-foreground">{modulo.name}</span>
                    </div>
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4 mr-2" />
                      Editar Actividad
                    </Button>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-muted-foreground mb-2 block">Actividad (ES)</Label>
                      <div className="bg-muted/50 rounded-lg p-4 text-sm">
                        <p className="text-muted-foreground italic">
                          Identifica y marca los elementos técnicos aprendidos en este módulo sobre un gráfico real.
                        </p>
                      </div>
                    </div>
                    <div>
                      <Label className="text-muted-foreground mb-2 block">Actividad (EN)</Label>
                      <div className="bg-muted/50 rounded-lg p-4 text-sm">
                        <p className="text-muted-foreground italic">
                          Identify and mark the technical elements learned in this module on a real chart.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Evaluación Final Tab */}
          <TabsContent value="evaluacion">
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-foreground">Consigna de Evaluación Final</h3>
                <Button variant="outline" size="sm">
                  <Edit className="w-4 h-4 mr-2" />
                  Editar
                </Button>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <Label className="text-muted-foreground mb-2 block">Objetivo (ES)</Label>
                  <div className="bg-muted/50 rounded-lg p-4">
                    <p className="font-medium mb-2">Objetivo:</p>
                    <p className="text-sm text-muted-foreground">
                      Identificar y marcar en un gráfico real los conceptos fundamentales aprendidos durante el programa.
                    </p>
                  </div>
                </div>
                <div>
                  <Label className="text-muted-foreground mb-2 block">Objective (EN)</Label>
                  <div className="bg-muted/50 rounded-lg p-4">
                    <p className="font-medium mb-2">Objective:</p>
                    <p className="text-sm text-muted-foreground">
                      Identify and mark on a real chart the fundamental concepts learned during the program.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t border-border pt-6">
                <Label className="text-muted-foreground mb-2 block">Instrucciones Completas (ES)</Label>
                <div className="bg-muted/50 rounded-lg p-4 mb-4">
                  <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                    <li>Descarga el gráfico disponible en la plataforma.</li>
                    <li>Ábrelo en una herramienta simple de edición de imágenes.</li>
                    <li>Marca directamente sobre el gráfico los elementos aprendidos.</li>
                  </ol>
                </div>
                
                <Label className="text-muted-foreground mb-2 block mt-4">Formato de Entrega</Label>
                <div className="bg-muted/50 rounded-lg p-4">
                  <p className="text-sm text-muted-foreground">
                    PDF con la imagen del gráfico marcado + texto breve (máximo 150 palabras) describiendo lo observado.
                  </p>
                  <p className="text-sm font-medium mt-2">Nombre del archivo: TrabajoFinal_AT_ApellidoNombre.pdf</p>
                </div>
              </div>

              <div className="border-t border-border pt-6 mt-6">
                <h4 className="font-medium mb-4">Configuración</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Reintentos permitidos</Label>
                    <Input type="number" defaultValue={2} className="mt-1" />
                  </div>
                  <div>
                    <Label>Umbral de aprobación (1-10)</Label>
                    <Input type="number" defaultValue={6} min={1} max={10} className="mt-1" />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Rúbrica Tab */}
          <TabsContent value="rubrica">
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-foreground">Rúbrica de Evaluación</h3>
                <Button variant="outline" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Nueva Competencia
                </Button>
              </div>

              <div className="space-y-6">
                {programa.competencias.map((comp) => (
                  <div key={comp.id} className="border border-border rounded-lg overflow-hidden">
                    <div className="bg-muted/50 p-4 flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{comp.name}</h4>
                        <p className="text-sm text-muted-foreground">{comp.nameEn}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                          Peso: {comp.peso}%
                        </Badge>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="grid grid-cols-4 gap-4">
                        {comp.niveles.map((nivel) => (
                          <div key={nivel.nivel} className="p-3 bg-muted/30 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="bg-primary text-primary-foreground text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                                {nivel.nivel}
                              </span>
                              <span className="text-sm font-medium">Nivel {nivel.nivel}</span>
                            </div>
                            <p className="text-xs text-muted-foreground">{nivel.descripcion}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong>Nota:</strong> El resultado final del programa será un promedio ponderado (1-10) basado en los pesos de cada competencia.
                </p>
              </div>
            </div>
          </TabsContent>

          {/* Submissions Tab */}
          <TabsContent value="submissions">
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Estudiante</TableHead>
                    <TableHead>Fecha de Envío</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Calificación</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {programa.submissions.map((sub) => (
                    <TableRow key={sub.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{sub.studentName}</p>
                          <p className="text-sm text-muted-foreground">{sub.studentEmail}</p>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{sub.submittedAt}</TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline"
                          className={cn(
                            sub.status === 'pending' && 'border-warning/50 bg-warning/10 text-warning',
                            sub.status === 'approved' && 'border-success/50 bg-success/10 text-success',
                            sub.status === 'rejected' && 'border-destructive/50 bg-destructive/10 text-destructive'
                          )}
                        >
                          {sub.status === 'pending' && 'Pendiente'}
                          {sub.status === 'approved' && 'Aprobado'}
                          {sub.status === 'rejected' && 'Rechazado'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {sub.score ? (
                          <span className="font-medium">{sub.score}/10</span>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Download className="w-4 h-4" />
                          </Button>
                          {sub.status === 'pending' && (
                            <>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-success">
                                <CheckCircle2 className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                                <XCircle className="w-4 h-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {/* Estudiantes Tab */}
          <TabsContent value="estudiantes">
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Estudiante</TableHead>
                    <TableHead>País</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead>Avance</TableHead>
                    <TableHead>Módulo Actual</TableHead>
                    <TableHead>Examen</TableHead>
                    <TableHead>Certificación</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {programa.estudiantes.map((est) => (
                    <TableRow key={est.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{est.name}</p>
                          <p className="text-sm text-muted-foreground">{est.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>{est.pais}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{est.tier}</Badge>
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
                            est.estadoExamen === 'approved' && 'border-success/50 bg-success/10 text-success'
                          )}
                        >
                          {est.estadoExamen === 'pending' && 'Pendiente'}
                          {est.estadoExamen === 'submitted' && 'Enviado'}
                          {est.estadoExamen === 'approved' && 'Aprobado'}
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
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {/* Comentarios Tab */}
          <TabsContent value="comentarios">
            <div className="space-y-4">
              {programa.comentarios.map((com) => (
                <div 
                  key={com.id}
                  className={cn(
                    'bg-card border rounded-xl p-4',
                    com.status === 'open' ? 'border-warning/50' : 'border-border'
                  )}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-medium">{com.student}</span>
                        <span className="text-sm text-muted-foreground">en</span>
                        <Badge variant="outline">{com.clase}</Badge>
                        <span className="text-sm text-muted-foreground">{com.date}</span>
                      </div>
                      <p className="text-muted-foreground">{com.content}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant="outline"
                        className={cn(
                          com.status === 'open' 
                            ? 'border-warning/50 bg-warning/10 text-warning' 
                            : 'border-success/50 bg-success/10 text-success'
                        )}
                      >
                        {com.status === 'open' ? 'Abierto' : 'Resuelto'}
                      </Badge>
                      <Button variant="outline" size="sm">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Responder
                      </Button>
                    </div>
                  </div>
                  {com.replies > 0 && (
                    <div className="mt-3 pt-3 border-t border-border">
                      <span className="text-sm text-muted-foreground">{com.replies} respuesta(s)</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}

export default ProgramaDetailPage;
