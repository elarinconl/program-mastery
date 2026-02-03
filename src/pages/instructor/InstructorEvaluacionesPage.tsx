import { MainLayout } from '@/components/layout/MainLayout';
import { useState } from 'react';
import { 
  Search, 
  Download,
  CheckCircle2,
  XCircle,
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
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';

interface Submission {
  id: string;
  studentName: string;
  studentEmail: string;
  programa: string;
  programaId: string;
  submittedAt: string;
  status: 'pending' | 'approved' | 'rejected';
  score?: number;
  fileUrl: string;
}

const mockSubmissions: Submission[] = [
  {
    id: '1',
    studentName: 'Carlos García',
    studentEmail: 'carlos@email.com',
    programa: 'Fundamentos del Análisis Técnico',
    programaId: 'p1',
    submittedAt: '2024-01-15 14:30',
    status: 'pending',
    fileUrl: '/placeholder.pdf',
  },
  {
    id: '2',
    studentName: 'María López',
    studentEmail: 'maria@email.com',
    programa: 'Fundamentos del Análisis Técnico',
    programaId: 'p1',
    submittedAt: '2024-01-14 09:15',
    status: 'pending',
    fileUrl: '/placeholder.pdf',
  },
  {
    id: '3',
    studentName: 'Juan Pérez',
    studentEmail: 'juan@email.com',
    programa: 'Gestión de Riesgo',
    programaId: 'p2',
    submittedAt: '2024-01-13 16:45',
    status: 'approved',
    score: 8.5,
    fileUrl: '/placeholder.pdf',
  },
];

const mockProgramas = [
  { id: 'p1', name: 'Fundamentos del Análisis Técnico' },
  { id: 'p2', name: 'Gestión de Riesgo' },
];

const mockCompetencias = [
  {
    id: 'comp1',
    name: 'Fundamentos del Análisis Técnico',
    peso: 35,
    scorePerLevel: { 1: 2.5, 2: 5, 3: 7.5, 4: 10 },
    niveles: [
      { nivel: 1, descripcion: 'Reconoce algunos elementos de forma incompleta.' },
      { nivel: 2, descripcion: 'Marca los elementos principales con claridad parcial.' },
      { nivel: 3, descripcion: 'Identifica y organiza los elementos correctamente.' },
      { nivel: 4, descripcion: 'Interpreta todos los elementos con criterio propio.' },
    ],
  },
  {
    id: 'comp2',
    name: 'Patrones y Modelos',
    peso: 35,
    scorePerLevel: { 1: 2.5, 2: 5, 3: 7.5, 4: 10 },
    niveles: [
      { nivel: 1, descripcion: 'Identifica patrones de forma imprecisa.' },
      { nivel: 2, descripcion: 'Reconoce patrones sin explicar su implicación.' },
      { nivel: 3, descripcion: 'Interpreta patrones anticipando escenarios.' },
      { nivel: 4, descripcion: 'Integra volumen y psicología del mercado.' },
    ],
  },
  {
    id: 'comp3',
    name: 'Indicadores Técnicos',
    peso: 30,
    scorePerLevel: { 1: 2.5, 2: 5, 3: 7.5, 4: 10 },
    niveles: [
      { nivel: 1, descripcion: 'Usa indicadores sin comprender su lógica.' },
      { nivel: 2, descripcion: 'Explica qué hace un indicador sin aplicarlo.' },
      { nivel: 3, descripcion: 'Aplica indicadores adecuados.' },
      { nivel: 4, descripcion: 'Combina indicadores mostrando dominio integral.' },
    ],
  },
];

interface EvaluationDialogProps {
  submission: Submission;
}

function EvaluationDialog({ submission }: EvaluationDialogProps) {
  const [isApproved, setIsApproved] = useState<boolean | null>(null);
  const [feedback, setFeedback] = useState('');
  const [competencyScores, setCompetencyScores] = useState<Record<string, number>>({});

  const handleCompetencyScore = (compId: string, level: number) => {
    setCompetencyScores(prev => ({ ...prev, [compId]: level }));
  };

  const calculateTotalScore = () => {
    if (Object.keys(competencyScores).length !== mockCompetencias.length) return null;
    
    let totalScore = 0;
    mockCompetencias.forEach(comp => {
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
            {submission.studentName} - {submission.programa}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Download file */}
          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
            <div>
              <p className="font-medium">Archivo del estudiante</p>
              <p className="text-sm text-muted-foreground">TrabajoFinal_{submission.studentName.replace(' ', '_')}.pdf</p>
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

              {mockCompetencias.map((comp) => (
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

              {totalScore !== null && (
                <div className="p-6 bg-success/10 rounded-lg border border-success/20 text-center">
                  <p className="text-sm text-muted-foreground mb-1">Calificación Final</p>
                  <p className="text-4xl font-bold text-success">{totalScore}/10</p>
                </div>
              )}
            </div>
          )}

          {/* Feedback */}
          <div>
            <Label>Feedback General (Español)</Label>
            <Textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder={isApproved === false 
                ? "Explica los motivos del rechazo..."
                : "Comentarios adicionales (opcional)..."
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
            disabled={isApproved === null || (isApproved === false && !feedback) || (isApproved === true && Object.keys(competencyScores).length !== mockCompetencias.length)}
            className={cn(
              isApproved === true && 'bg-success hover:bg-success/90',
              isApproved === false && 'bg-destructive hover:bg-destructive/90'
            )}
          >
            {isApproved === true ? 'Aprobar' : isApproved === false ? 'Rechazar' : 'Guardar'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function InstructorEvaluacionesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterPrograma, setFilterPrograma] = useState<string>('all');

  const filteredSubmissions = mockSubmissions.filter(sub => {
    const matchesSearch = sub.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.programa.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || sub.status === filterStatus;
    const matchesPrograma = filterPrograma === 'all' || sub.programaId === filterPrograma;
    return matchesSearch && matchesStatus && matchesPrograma;
  });

  const pendingCount = mockSubmissions.filter(s => s.status === 'pending').length;

  return (
    <MainLayout breadcrumbs={[{ label: 'instructor' }, { label: 'evaluaciones' }]}>
      <div className="max-w-7xl">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground">
            Evaluaciones
            {pendingCount > 0 && (
              <span className="ml-3 bg-destructive text-destructive-foreground text-sm px-2.5 py-1 rounded-full">
                {pendingCount} pendientes
              </span>
            )}
          </h1>
          <p className="text-muted-foreground">Exámenes finales de tus estudiantes</p>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar evaluaciones..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={filterPrograma} onValueChange={setFilterPrograma}>
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="Filtrar por programa" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los programas</SelectItem>
              {mockProgramas.map(p => (
                <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex gap-2">
            {(['all', 'pending', 'approved', 'rejected'] as const).map((status) => (
              <Button
                key={status}
                variant={filterStatus === status ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterStatus(status)}
              >
                {status === 'all' && 'Todos'}
                {status === 'pending' && 'Pendientes'}
                {status === 'approved' && 'Aprobados'}
                {status === 'rejected' && 'Rechazados'}
              </Button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Estudiante</TableHead>
                <TableHead>Programa</TableHead>
                <TableHead>Fecha de Envío</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Calificación</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSubmissions.map((sub) => (
                <TableRow key={sub.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{sub.studentName}</p>
                      <p className="text-sm text-muted-foreground">{sub.studentEmail}</p>
                    </div>
                  </TableCell>
                  <TableCell>{sub.programa}</TableCell>
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
                      <span className={cn(
                        'font-medium',
                        sub.score >= 6 ? 'text-success' : 'text-destructive'
                      )}>
                        {sub.score}/10
                      </span>
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
                        <EvaluationDialog submission={sub} />
                      )}
                    </div>
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

export default InstructorEvaluacionesPage;
