import { useState } from 'react';
import { 
  Search, 
  Download,
  CheckCircle2,
  XCircle,
  FileText,
  History,
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

export interface SubmissionAttempt {
  id: string;
  attemptNumber: number;
  submittedAt: string;
  status: 'pending' | 'approved' | 'rejected';
  score?: number;
  feedback?: string;
  fileUrl: string;
}

export interface Submission {
  id: string;
  studentName: string;
  studentEmail: string;
  programa?: string;
  programaId?: string;
  currentStatus: 'pending' | 'approved' | 'rejected';
  currentScore?: number;
  attempts: SubmissionAttempt[];
}

export interface Competencia {
  id: string;
  name: string;
  peso: number;
  scorePerLevel: { 1: number; 2: number; 3: number; 4: number };
  niveles: { nivel: number; descripcion: string }[];
}

function HistoryDialog({ submission }: { submission: Submission }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="text-muted-foreground">
          <History className="w-4 h-4 mr-1" />
          {submission.attempts.length} intentos
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Historial de Intentos</DialogTitle>
          <DialogDescription>
            {submission.studentName} {submission.programa && `- ${submission.programa}`}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {submission.attempts.map((attempt) => (
            <div 
              key={attempt.id}
              className={cn(
                "border rounded-lg p-4",
                attempt.status === 'approved' && "border-success/50 bg-success/5",
                attempt.status === 'rejected' && "border-destructive/50 bg-destructive/5",
                attempt.status === 'pending' && "border-warning/50 bg-warning/5"
              )}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="font-medium">Intento #{attempt.attemptNumber}</span>
                  <Badge 
                    variant="outline"
                    className={cn(
                      attempt.status === 'pending' && 'border-warning/50 bg-warning/10 text-warning',
                      attempt.status === 'approved' && 'border-success/50 bg-success/10 text-success',
                      attempt.status === 'rejected' && 'border-destructive/50 bg-destructive/10 text-destructive'
                    )}
                  >
                    {attempt.status === 'pending' && 'Pendiente'}
                    {attempt.status === 'approved' && 'Aprobado'}
                    {attempt.status === 'rejected' && 'Rechazado'}
                  </Badge>
                  {attempt.score && (
                    <span className="font-bold text-success">{attempt.score}/10</span>
                  )}
                </div>
                <span className="text-sm text-muted-foreground">{attempt.submittedAt}</span>
              </div>

              <div className="flex items-center gap-2 mb-3">
                <FileText className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  TrabajoFinal_{submission.studentName.replace(' ', '_')}_v{attempt.attemptNumber}.pdf
                </span>
                <Button variant="ghost" size="sm" className="h-6 px-2">
                  <Download className="w-3 h-3" />
                </Button>
              </div>

              {attempt.feedback && (
                <div className="bg-background rounded-lg p-3 border border-border">
                  <p className="text-sm font-medium mb-1">Feedback del instructor:</p>
                  <p className="text-sm text-muted-foreground">{attempt.feedback}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

interface EvaluationDialogProps {
  submission: Submission;
  competencias: Competencia[];
}

function EvaluationDialog({ submission, competencias }: EvaluationDialogProps) {
  const [isApproved, setIsApproved] = useState<boolean | null>(null);
  const [feedback, setFeedback] = useState('');
  const [competencyScores, setCompetencyScores] = useState<Record<string, number>>({});

  const currentAttempt = submission.attempts[submission.attempts.length - 1];

  const handleCompetencyScore = (compId: string, level: number) => {
    setCompetencyScores(prev => ({ ...prev, [compId]: level }));
  };

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
            {submission.studentName} {submission.programa && `- ${submission.programa}`} (Intento #{currentAttempt.attemptNumber})
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Previous attempts warning */}
          {submission.attempts.length > 1 && (
            <div className="p-4 bg-warning/10 rounded-lg border border-warning/20">
              <p className="text-sm font-medium text-warning">
                Este estudiante ha tenido {submission.attempts.length - 1} intento(s) previo(s) rechazado(s).
              </p>
              <HistoryDialog submission={submission} />
            </div>
          )}

          {/* Download file */}
          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
            <div>
              <p className="font-medium">Archivo del estudiante</p>
              <p className="text-sm text-muted-foreground">
                TrabajoFinal_{submission.studentName.replace(' ', '_')}_v{currentAttempt.attemptNumber}.pdf
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
                  Selecciona el nivel alcanzado para cada competencia.
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
                ? "Explica los motivos del rechazo y qué debe mejorar..."
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

interface EvaluationsTabContentProps {
  submissions: Submission[];
  competencias: Competencia[];
  showSearch?: boolean;
  showProgramaColumn?: boolean;
}

export function EvaluationsTabContent({ 
  submissions, 
  competencias,
  showSearch = true,
  showProgramaColumn = false 
}: EvaluationsTabContentProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');

  const filteredSubmissions = submissions.filter(sub => {
    const matchesSearch = sub.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.studentEmail.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || sub.currentStatus === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const pendingCount = submissions.filter(s => s.currentStatus === 'pending').length;

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 mb-4">
        {showSearch && (
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por estudiante..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        )}
        <div className="flex gap-2">
          {(['all', 'pending', 'approved', 'rejected'] as const).map((status) => (
            <Button
              key={status}
              variant={filterStatus === status ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterStatus(status)}
              className="relative"
            >
              {status === 'all' && 'Todos'}
              {status === 'pending' && (
                <>
                  Pendientes
                  {pendingCount > 0 && (
                    <span className="ml-1.5 bg-destructive text-destructive-foreground text-xs px-1.5 py-0.5 rounded-full">
                      {pendingCount}
                    </span>
                  )}
                </>
              )}
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
              {showProgramaColumn && <TableHead>Programa</TableHead>}
              <TableHead>Último Envío</TableHead>
              <TableHead>Intentos</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Calificación</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSubmissions.map((sub) => {
              const currentAttempt = sub.attempts[sub.attempts.length - 1];
              return (
                <TableRow key={sub.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{sub.studentName}</p>
                      <p className="text-sm text-muted-foreground">{sub.studentEmail}</p>
                    </div>
                  </TableCell>
                  {showProgramaColumn && (
                    <TableCell>
                      <p className="text-sm">{sub.programa}</p>
                    </TableCell>
                  )}
                  <TableCell className="text-muted-foreground text-sm">
                    {currentAttempt.submittedAt}
                  </TableCell>
                  <TableCell>
                    <HistoryDialog submission={sub} />
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline"
                      className={cn(
                        sub.currentStatus === 'pending' && 'border-warning/50 bg-warning/10 text-warning',
                        sub.currentStatus === 'approved' && 'border-success/50 bg-success/10 text-success',
                        sub.currentStatus === 'rejected' && 'border-destructive/50 bg-destructive/10 text-destructive'
                      )}
                    >
                      {sub.currentStatus === 'pending' && 'Pendiente'}
                      {sub.currentStatus === 'approved' && 'Aprobado'}
                      {sub.currentStatus === 'rejected' && 'Rechazado'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {sub.currentScore ? (
                      <span className="font-bold text-success">{sub.currentScore}/10</span>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Download className="w-4 h-4" />
                      </Button>
                      {sub.currentStatus === 'pending' && (
                        <EvaluationDialog 
                          submission={sub}
                          competencias={competencias}
                        />
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
            {filteredSubmissions.length === 0 && (
              <TableRow>
                <TableCell colSpan={showProgramaColumn ? 7 : 6} className="text-center py-8 text-muted-foreground">
                  No hay evaluaciones que mostrar
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
