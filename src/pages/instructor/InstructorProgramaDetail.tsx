import { MainLayout } from '@/components/layout/MainLayout';
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft,
  BookOpen,
  Clock,
  Users,
  Download,
  CheckCircle2,
  XCircle,
  MessageSquare,
  Search,
  Filter,
  Upload
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';
import { RubricaEditor } from '@/components/education/RubricaEditor';
import { ExamenFinalEditor } from '@/components/education/ExamenFinalEditor';
import { BatchUploadDialog } from '@/components/education/BatchUploadDialog';

// Mock data
const mockPrograma = {
  id: '1',
  name: 'Fundamentos del Análisis Técnico',
  description: 'Aprende los conceptos fundamentales del análisis técnico para operar en los mercados financieros.',
  duracion: '8h 30m',
  studentsCount: 342,
  tier: 'basic' as const,
  coverImage: '/placeholder.svg',
  modulos: [
    { id: 'm1', name: 'Fundamentos del Análisis Técnico' },
    { id: 'm2', name: 'Patrones y Modelos' },
    { id: 'm3', name: 'Indicadores Técnicos' },
  ],
  clases: [
    { id: 'c1', name: 'Introducción', modulo: 'Fundamentos' },
    { id: 'c2', name: 'Teoría de Dow', modulo: 'Fundamentos' },
    { id: 'c3', name: 'Patrones de velas', modulo: 'Patrones' },
    { id: 'c4', name: 'Medias móviles', modulo: 'Indicadores' },
  ],
  competencias: [
    {
      id: 'comp1',
      name: 'Fundamentos del Análisis Técnico',
      peso: 35,
      scorePerLevel: { 1: 2.5, 2: 5, 3: 7.5, 4: 10 },
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
      peso: 35,
      scorePerLevel: { 1: 2.5, 2: 5, 3: 7.5, 4: 10 },
      niveles: [
        { nivel: 1, descripcion: 'Identifica patrones de forma imprecisa o sin contexto.' },
        { nivel: 2, descripcion: 'Reconoce patrones de velas sin explicar su implicación.' },
        { nivel: 3, descripcion: 'Interpreta patrones y gaps en contexto, anticipando posibles escenarios.' },
        { nivel: 4, descripcion: 'Integra el volumen, la fractalidad y la psicología del mercado con los patrones.' },
      ],
    },
    {
      id: 'comp3',
      name: 'Indicadores Técnicos',
      peso: 30,
      scorePerLevel: { 1: 2.5, 2: 5, 3: 7.5, 4: 10 },
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

interface EvaluationDialogProps {
  submission: typeof mockPrograma.submissions[0];
  competencias: typeof mockPrograma.competencias;
}

function EvaluationDialog({ submission, competencias }: EvaluationDialogProps) {
  const [isApproved, setIsApproved] = useState<boolean | null>(null);
  const [feedback, setFeedback] = useState('');
  const [competencyScores, setCompetencyScores] = useState<Record<string, number>>({});

  const handleCompetencyScore = (compId: string, level: number) => {
    setCompetencyScores(prev => ({ ...prev, [compId]: level }));
  };

  // Calculate total score
  const calculateTotalScore = () => {
    if (Object.keys(competencyScores).length !== competencias.length) return null;
    
    let totalScore = 0;
    competencias.forEach(comp => {
      const level = competencyScores[comp.id];
      if (level) {
        const scoreForLevel = comp.scorePerLevel[level as keyof typeof comp.scorePerLevel];
        totalScore += (scoreForLevel * comp.peso) / 100;
      }
    });
    return Math.round(totalScore * 10) / 10;
  };

  const totalScore = calculateTotalScore();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Evaluar
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Evaluar Examen Final</DialogTitle>
          <DialogDescription>
            {submission.studentName} - Enviado el {submission.submittedAt}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Download file */}
          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
            <div>
              <p className="font-medium">Archivo del estudiante</p>
              <p className="text-sm text-muted-foreground">
                TrabajoFinal_AT_{submission.studentName.split(' ')[1]}{submission.studentName.split(' ')[0]}.pdf
              </p>
            </div>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Descargar
            </Button>
          </div>

          {/* Approve/Reject Selection */}
          <div>
            <Label className="mb-3 block">Resultado</Label>
            <div className="flex gap-4">
              <Button
                type="button"
                variant={isApproved === true ? 'default' : 'outline'}
                className={cn(isApproved === true && 'bg-success hover:bg-success/90')}
                onClick={() => setIsApproved(true)}
              >
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Aprobar
              </Button>
              <Button
                type="button"
                variant={isApproved === false ? 'default' : 'outline'}
                className={cn(isApproved === false && 'bg-destructive hover:bg-destructive/90')}
                onClick={() => setIsApproved(false)}
              >
                <XCircle className="w-4 h-4 mr-2" />
                Rechazar
              </Button>
            </div>
          </div>

          {/* If Approved - Show competency evaluation */}
          {isApproved === true && (
            <div className="space-y-6">
              <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                <h4 className="font-medium mb-2">Evaluación por Competencias</h4>
                <p className="text-sm text-muted-foreground">
                  Selecciona el nivel alcanzado para cada competencia. La calificación final se calcula automáticamente.
                </p>
              </div>

              {competencias.map((comp) => (
                <div key={comp.id} className="border border-border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h5 className="font-medium">{comp.name}</h5>
                      <p className="text-sm text-muted-foreground">Peso: {comp.peso}%</p>
                    </div>
                    {competencyScores[comp.id] && (
                      <Badge variant="outline" className="bg-primary/10 text-primary">
                        Nivel {competencyScores[comp.id]} - {comp.scorePerLevel[competencyScores[comp.id] as keyof typeof comp.scorePerLevel]} pts
                      </Badge>
                    )}
                  </div>
                  <RadioGroup
                    value={competencyScores[comp.id]?.toString()}
                    onValueChange={(val) => handleCompetencyScore(comp.id, parseInt(val))}
                    className="grid grid-cols-4 gap-3"
                  >
                    {comp.niveles.map((nivel) => (
                      <div key={nivel.nivel} className="relative">
                        <RadioGroupItem
                          value={nivel.nivel.toString()}
                          id={`${comp.id}-${nivel.nivel}`}
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor={`${comp.id}-${nivel.nivel}`}
                          className={cn(
                            "flex flex-col p-3 border rounded-lg cursor-pointer transition-all",
                            "peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5",
                            "hover:border-primary/50"
                          )}
                        >
                          <span className="font-medium text-sm mb-1">
                            Nivel {nivel.nivel} ({comp.scorePerLevel[nivel.nivel as keyof typeof comp.scorePerLevel]} pts)
                          </span>
                          <span className="text-xs text-muted-foreground line-clamp-3">
                            {nivel.descripcion}
                          </span>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              ))}

              {/* Total Score Display */}
              {totalScore !== null && (
                <div className="p-6 bg-success/10 rounded-lg border border-success/20 text-center">
                  <p className="text-sm text-muted-foreground mb-1">Calificación Final</p>
                  <p className="text-4xl font-bold text-success">{totalScore}/10</p>
                </div>
              )}
            </div>
          )}

          {/* Feedback (always shown, but required for rejection) */}
          <div>
            <Label>Feedback General (Español)</Label>
            <Textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder={isApproved === false 
                ? "Explica los motivos del rechazo y qué debe mejorar el estudiante..."
                : "Comentarios adicionales para el estudiante (opcional para aprobación)..."
              }
              className="mt-1"
              rows={4}
            />
            {isApproved === false && !feedback && (
              <p className="text-sm text-destructive mt-1">El feedback es obligatorio para rechazar</p>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline">Cancelar</Button>
          <Button
            disabled={isApproved === null || (isApproved === false && !feedback) || (isApproved === true && Object.keys(competencyScores).length !== competencias.length)}
            className={cn(
              isApproved === true && 'bg-success hover:bg-success/90',
              isApproved === false && 'bg-destructive hover:bg-destructive/90'
            )}
          >
            {isApproved === true ? 'Aprobar Evaluación' : isApproved === false ? 'Rechazar Evaluación' : 'Guardar'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function InstructorProgramaDetail() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('evaluacion');
  const [filterClase, setFilterClase] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const programa = mockPrograma;

  const filteredComentarios = programa.comentarios.filter(com => {
    const matchesClase = filterClase === 'all' || com.clase === filterClase;
    const matchesSearch = com.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      com.student.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesClase && matchesSearch;
  });

  return (
    <MainLayout breadcrumbs={[{ label: 'instructor' }, { label: 'programas' }, { label: programa.name }]}>
      <div className="max-w-7xl">
        {/* Back button */}
        <Link 
          to="/instructor/programas" 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver a mis programas
        </Link>

        {/* Header */}
        <div className="flex items-start gap-6 mb-8">
          <img 
            src={programa.coverImage} 
            alt={programa.name}
            className="w-32 h-20 rounded-xl object-cover bg-muted"
          />
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl font-bold text-foreground">{programa.name}</h1>
              <Badge variant="outline" className={cn(tierColors[programa.tier])}>
                {programa.tier.charAt(0).toUpperCase() + programa.tier.slice(1)}
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
            </div>
          </div>
        </div>

        {/* Tabs - Limited for instructor */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="evaluacion">Evaluación Final</TabsTrigger>
            <TabsTrigger value="rubrica">Rúbrica</TabsTrigger>
            <TabsTrigger value="submissions" className="relative">
              Evaluaciones
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

          {/* Evaluación Final Tab */}
          <TabsContent value="evaluacion">
            <div className="flex justify-end mb-4">
              <BatchUploadDialog
                contentType="examenes"
                programId={id}
                onComplete={(data) => console.log('Imported examen config:', data)}
                trigger={
                  <Button variant="outline">
                    <Upload className="w-4 h-4 mr-2" />
                    Importar Configuración
                  </Button>
                }
              />
            </div>
            <ExamenFinalEditor
              config={{
                objetivo: 'Identificar y marcar en un gráfico real los conceptos fundamentales aprendidos durante el programa.',
                instrucciones: '1. Descarga el gráfico disponible en la plataforma.\n2. Ábrelo en una herramienta simple de edición de imágenes.\n3. Marca directamente sobre el gráfico los elementos aprendidos.\n\nFormato: PDF con la imagen del gráfico marcado + texto breve (máximo 150 palabras) describiendo lo observado.\n\nNombre del archivo: TrabajoFinal_AT_ApellidoNombre.pdf',
                formatoEntrega: 'pdf',
                umbralAprobacion: 6,
              }}
              onSave={(config) => console.log('Examen config saved:', config)}
            />
          </TabsContent>

          {/* Rúbrica Tab */}
          <TabsContent value="rubrica">
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-foreground">Rúbrica de Evaluación</h3>
                <BatchUploadDialog
                  contentType="rubricas"
                  programId={id}
                  onComplete={(data) => console.log('Imported rubrica:', data)}
                  trigger={
                    <Button variant="outline">
                      <Upload className="w-4 h-4 mr-2" />
                      Importar Rúbrica
                    </Button>
                  }
                />
              </div>
              <RubricaEditor
                competencias={programa.competencias.map(comp => ({
                  id: comp.id,
                  name: comp.name,
                  peso: comp.peso,
                  niveles: comp.niveles.map((n, i) => ({
                    nivel: n.nivel,
                    descripcion: n.descripcion,
                    puntaje: comp.scorePerLevel[(i + 1) as keyof typeof comp.scorePerLevel] || (i + 1) * 2.5,
                  })),
                }))}
                onSave={(competencias) => console.log('Rubrica saved:', competencias)}
              />
              <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong>Nota:</strong> El resultado final del programa será un promedio ponderado (máximo 10) basado en los pesos de cada competencia.
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
                            <EvaluationDialog 
                              submission={sub} 
                              competencias={programa.competencias}
                            />
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
            {/* Filters */}
            <div className="flex items-center gap-4 mb-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar comentarios..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={filterClase} onValueChange={setFilterClase}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Filtrar por clase" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las clases</SelectItem>
                  {programa.clases.map(c => (
                    <SelectItem key={c.id} value={c.name}>{c.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              {filteredComentarios.map((com) => (
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

              {filteredComentarios.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No hay comentarios que mostrar</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}

export default InstructorProgramaDetail;
