import { MainLayout } from '@/components/layout/MainLayout';
import { useState } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import { 
  ArrowLeft,
  BookOpen,
  Clock,
  Users,
  Upload,
  ChevronRight,
  Layers,
  ClipboardCheck,
  MessageSquare,
  ArrowRight,
  User,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { RubricaEditor } from '@/components/education/RubricaEditor';
import { ExamenFinalEditor } from '@/components/education/ExamenFinalEditor';
import { BatchUploadDialog } from '@/components/education/BatchUploadDialog';
import { Card } from '@/components/ui/card';
import type { Competencia, Submission } from '@/components/instructor/EvaluationsTabContent';
import type { Estudiante } from '@/components/instructor/StudentsTabContent';
import type { Comentario } from '@/components/instructor/CommentsTabContent';

// Mock data
const mockInstructores = [
  { id: 'inst1', name: 'Carlos Mendoza' },
  { id: 'inst2', name: 'Ana García' },
  { id: 'inst3', name: 'Luis Rodríguez' },
];

const mockPrograma = {
  id: '1',
  name: 'Fundamentos del Análisis Técnico',
  description: 'Aprende los conceptos fundamentales del análisis técnico para operar en los mercados financieros.',
  ruta: 'Análisis Técnico Básico',
  fase: 'Fundamentación',
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
};

const mockCompetencias: Competencia[] = [
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
];

const mockSubmissions: Submission[] = [
  {
    id: '1',
    studentName: 'Carlos García',
    studentEmail: 'carlos@email.com',
    currentStatus: 'pending',
    attempts: [
      {
        id: 'a1',
        attemptNumber: 1,
        submittedAt: '2024-01-15 14:30',
        status: 'pending',
        fileUrl: '/placeholder.pdf',
      },
    ],
  },
  {
    id: '2',
    studentName: 'María López',
    studentEmail: 'maria@email.com',
    currentStatus: 'approved',
    currentScore: 8.5,
    attempts: [
      {
        id: 'a1',
        attemptNumber: 1,
        submittedAt: '2024-01-05 09:00',
        status: 'rejected',
        feedback: 'El análisis de patrones está incompleto. Falta identificar los gaps y no se mencionan los indicadores técnicos utilizados para confirmar las tendencias.',
        fileUrl: '/placeholder_v1.pdf',
      },
      {
        id: 'a2',
        attemptNumber: 2,
        submittedAt: '2024-01-08 11:30',
        status: 'rejected',
        feedback: 'Mejoraste en la identificación de gaps, pero el análisis de indicadores sigue siendo superficial. Necesitas explicar cómo el RSI y MACD confirman tus conclusiones.',
        fileUrl: '/placeholder_v2.pdf',
      },
      {
        id: 'a3',
        attemptNumber: 3,
        submittedAt: '2024-01-11 16:45',
        status: 'rejected',
        feedback: 'Buen progreso en indicadores, pero la estructura del documento es confusa. Organiza las secciones: 1) Identificación de patrones, 2) Análisis de indicadores, 3) Conclusiones.',
        fileUrl: '/placeholder_v3.pdf',
      },
      {
        id: 'a4',
        attemptNumber: 4,
        submittedAt: '2024-01-14 09:15',
        status: 'approved',
        score: 8.5,
        feedback: '¡Excelente trabajo! El análisis está completo y bien estructurado. La identificación de patrones es precisa y los indicadores están correctamente aplicados.',
        fileUrl: '/placeholder_v4.pdf',
      },
    ],
  },
  {
    id: '3',
    studentName: 'Juan Pérez',
    studentEmail: 'juan@email.com',
    currentStatus: 'approved',
    currentScore: 8.5,
    attempts: [
      {
        id: 'a1',
        attemptNumber: 1,
        submittedAt: '2024-01-13 16:45',
        status: 'approved',
        score: 8.5,
        feedback: 'Muy buen trabajo. Análisis completo y bien estructurado.',
        fileUrl: '/placeholder.pdf',
      },
    ],
  },
];

const mockEstudiantes: Estudiante[] = [
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
    estadoExamen: 'approved',
    estadoCert: 'pending',
  },
  {
    id: 'e3',
    name: 'Juan Pérez',
    email: 'juan@email.com',
    pais: 'Argentina',
    tier: 'Basic',
    registro: '2024-01-10',
    avance: 45,
    moduloActual: 'Patrones y Modelos',
    claseActual: 'Gaps',
    estadoExamen: 'pending',
    estadoCert: 'pending',
  },
  {
    id: 'e4',
    name: 'Ana Rodríguez',
    email: 'ana@email.com',
    pais: 'Colombia',
    tier: 'Pro',
    registro: '2024-01-12',
    avance: 60,
    moduloActual: 'Fundamentos',
    claseActual: 'Teoría de Dow',
    estadoExamen: 'rejected',
    estadoCert: 'pending',
  },
];

const mockComentarios: Comentario[] = [
  {
    id: 'com1',
    studentName: 'Ana Martínez',
    studentEmail: 'ana@email.com',
    modulo: 'Módulo 1: Fundamentos',
    clase: 'Teoría de Dow',
    claseId: 'c2',
    content: '¿Podrían explicar más sobre los principios de Dow? No me queda claro cómo aplicarlo en la práctica.',
    date: '2024-01-15 10:30',
    status: 'open',
    replies: [],
  },
  {
    id: 'com2',
    studentName: 'Pedro Sánchez',
    studentEmail: 'pedro@email.com',
    modulo: 'Módulo 2: Patrones',
    clase: 'Patrones de velas',
    claseId: 'c3',
    content: 'Excelente explicación del hammer y doji. ¿Podrían agregar más ejemplos de patrones de reversión?',
    date: '2024-01-14 15:20',
    status: 'resolved',
    replies: [
      {
        id: 'r1',
        author: 'Instructor Carlos',
        content: '¡Gracias por tu comentario! Agregaremos más ejemplos pronto. Por ahora, te recomiendo revisar los gráficos de 4H.',
        date: '2024-01-14 16:45',
        isInstructor: true,
      },
    ],
  },
  {
    id: 'com3',
    studentName: 'Luis García',
    studentEmail: 'luis@email.com',
    modulo: 'Módulo 3: Indicadores',
    clase: 'Medias móviles',
    claseId: 'c4',
    content: '¿Es mejor usar EMA o SMA para identificar tendencias? El video menciona ambas pero no explica cuándo usar cada una.',
    date: '2024-01-16 09:15',
    status: 'open',
    replies: [],
  },
];

const tierColors = {
  free: 'border-gray-200 bg-gray-50 text-gray-700',
  basic: 'border-blue-200 bg-blue-50 text-blue-700',
  pro: 'border-purple-200 bg-purple-50 text-purple-700',
  premium: 'border-amber-200 bg-amber-50 text-amber-700',
};

export function SuperAdminProgramaDetail() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const instructorId = searchParams.get('instructor');
  const [activeTab, setActiveTab] = useState('evaluacion');

  const programa = mockPrograma;
  const instructor = mockInstructores.find(inst => inst.id === instructorId) || mockInstructores[0];
  const pendingEvaluations = mockSubmissions.filter(s => s.currentStatus === 'pending').length;
  const openComments = mockComentarios.filter(c => c.status === 'open').length;
  
  // Calcular métricas
  const estudiantesInscritos = programa.studentsCount;
  const avancePromedio = mockEstudiantes.length > 0
    ? Math.round(mockEstudiantes.reduce((acc, est) => acc + est.avance, 0) / mockEstudiantes.length)
    : 0;

  return (
    <MainLayout breadcrumbs={[{ label: 'instructor workspace' }, { label: 'programas activos' }, { label: programa.name }]}>
      <div className="max-w-7xl">
        {/* Back button */}
        <Link 
          to="/superadmin/programas" 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver a programas activos
        </Link>

        {/* Header */}
        <div className="bg-card border border-border rounded-xl p-6 mb-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
            <span className="font-medium text-primary">{programa.fase}</span>
            <ChevronRight className="w-3 h-3" />
            <span>{programa.ruta}</span>
          </div>
          
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-bold text-foreground">{programa.name}</h1>
            <Badge variant="outline" className={cn(tierColors[programa.tier])}>
              {programa.tier.charAt(0).toUpperCase() + programa.tier.slice(1)}
            </Badge>
          </div>

          <div className="flex items-center gap-2 mb-4">
            <User className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Instructor: <span className="font-medium text-foreground">{instructor.name}</span></span>
          </div>
          
          <p className="text-muted-foreground mb-4">{programa.description}</p>
          
          <div className="flex items-center gap-6 text-sm">
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <Layers className="w-4 h-4" />
              <span className="font-medium text-foreground">{programa.modulos.length}</span> módulos
            </span>
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <BookOpen className="w-4 h-4" />
              <span className="font-medium text-foreground">{programa.clases.length}</span> clases
            </span>
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span className="font-medium text-foreground">{programa.duracion}</span>
            </span>
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <Users className="w-4 h-4" />
              <span className="font-medium text-foreground">{programa.studentsCount}</span> estudiantes
            </span>
          </div>
        </div>

        {/* Métricas simplificadas - solo una vez */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <Link to={`/estudiantes?programa=${id}&instructor=${instructorId}`}>
                <Button variant="ghost" size="sm">
                  Ver todos
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
            <p className="text-sm text-muted-foreground mb-1">Estudiantes Inscritos</p>
            <p className="text-3xl font-bold">{estudiantesInscritos}</p>
            <p className="text-sm text-muted-foreground mt-2">Avance promedio: {avancePromedio}%</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-warning/10 rounded-lg">
                <ClipboardCheck className="w-5 h-5 text-warning" />
              </div>
              <Link to={`/evaluaciones?programa=${id}&instructor=${instructorId}`}>
                <Button variant="ghost" size="sm">
                  Ver todas
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
            <p className="text-sm text-muted-foreground mb-1">Evaluaciones Pendientes</p>
            <p className="text-3xl font-bold">{pendingEvaluations}</p>
            {pendingEvaluations > 0 && (
              <Badge variant="outline" className="mt-2 border-warning/50 bg-warning/10 text-warning">
                Requiere atención
              </Badge>
            )}
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-destructive/10 rounded-lg">
                <MessageSquare className="w-5 h-5 text-destructive" />
              </div>
              <Link to={`/comentarios?programa=${id}&instructor=${instructorId}`}>
                <Button variant="ghost" size="sm">
                  Ver todos
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
            <p className="text-sm text-muted-foreground mb-1">Comentarios Abiertos</p>
            <p className="text-3xl font-bold">{openComments}</p>
            {openComments > 0 && (
              <Badge variant="outline" className="mt-2 border-destructive/50 bg-destructive/10 text-destructive">
                Requiere atención
              </Badge>
            )}
          </Card>
        </div>

        {/* Configuración del Programa - Tabs más visibles */}
        <div className="bg-card border border-border rounded-xl p-6 mb-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6 w-full justify-start">
              <TabsTrigger value="evaluacion" className="flex items-center gap-2">
                <ClipboardCheck className="w-4 h-4" />
                Evaluación Final
              </TabsTrigger>
              <TabsTrigger value="rubrica" className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Rúbrica
              </TabsTrigger>
            </TabsList>

            {/* Evaluación Final Tab */}
            <TabsContent value="evaluacion" className="mt-0">
              <div className="flex justify-end mb-4">
                <BatchUploadDialog
                  contentType="examenes"
                  programId={id}
                  onComplete={(data) => console.log('Imported examen config:', data)}
                  trigger={
                    <Button variant="outline" size="sm">
                      <Upload className="w-4 h-4 mr-2" />
                      Importar
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
            <TabsContent value="rubrica" className="mt-0">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-foreground">Rúbrica de Evaluación</h3>
                <BatchUploadDialog
                  contentType="rubricas"
                  programId={id}
                  onComplete={(data) => console.log('Imported rubrica:', data)}
                  trigger={
                    <Button variant="outline" size="sm">
                      <Upload className="w-4 h-4 mr-2" />
                      Importar
                    </Button>
                  }
                />
              </div>
              <RubricaEditor
                competencias={mockCompetencias.map(comp => ({
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
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
}

export default SuperAdminProgramaDetail;
