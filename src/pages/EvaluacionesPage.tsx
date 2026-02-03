import { MainLayout } from '@/components/layout/MainLayout';
import { useRole } from '@/contexts/RoleContext';
import { useState } from 'react';
import { 
  Search, 
  Filter, 
  CheckCircle2,
  XCircle,
  Download,
  Eye
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
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';

interface Submission {
  id: string;
  studentName: string;
  studentEmail: string;
  programa: string;
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
    submittedAt: '2024-01-15 14:30',
    status: 'pending',
    fileUrl: '/placeholder.pdf',
  },
  {
    id: '2',
    studentName: 'María López',
    studentEmail: 'maria@email.com',
    programa: 'Fundamentos del Análisis Técnico',
    submittedAt: '2024-01-14 09:15',
    status: 'pending',
    fileUrl: '/placeholder.pdf',
  },
  {
    id: '3',
    studentName: 'Juan Pérez',
    studentEmail: 'juan@email.com',
    programa: 'Introducción a los Mercados',
    submittedAt: '2024-01-13 16:45',
    status: 'approved',
    score: 8.5,
    fileUrl: '/placeholder.pdf',
  },
  {
    id: '4',
    studentName: 'Ana Martínez',
    studentEmail: 'ana@email.com',
    programa: 'Gestión de Riesgo',
    submittedAt: '2024-01-12 11:20',
    status: 'rejected',
    score: 4.5,
    fileUrl: '/placeholder.pdf',
  },
];

function EvaluationDialog({ submission }: { submission: Submission }) {
  const [score, setScore] = useState([7]);
  const [feedbackEs, setFeedbackEs] = useState('');
  const [feedbackEn, setFeedbackEn] = useState('');

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Eye className="w-4 h-4 mr-2" />
          Evaluar
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
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
              <p className="text-sm text-muted-foreground">TrabajoFinal_AT_{submission.studentName.split(' ')[1]}{submission.studentName.split(' ')[0]}.pdf</p>
            </div>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Descargar
            </Button>
          </div>

          {/* Score */}
          <div>
            <Label className="mb-4 block">Calificación Final: <span className="text-2xl font-bold text-primary">{score[0]}</span>/10</Label>
            <Slider
              value={score}
              onValueChange={setScore}
              max={10}
              min={1}
              step={0.5}
              className="py-4"
            />
          </div>

          {/* Feedback ES */}
          <div>
            <Label>Feedback General (ES)</Label>
            <Textarea
              value={feedbackEs}
              onChange={(e) => setFeedbackEs(e.target.value)}
              placeholder="Escribe el feedback en español..."
              className="mt-1"
            />
          </div>

          {/* Feedback EN */}
          <div>
            <Label>Feedback General (EN)</Label>
            <Textarea
              value={feedbackEn}
              onChange={(e) => setFeedbackEn(e.target.value)}
              placeholder="Write the feedback in English..."
              className="mt-1"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" className="text-destructive">
              <XCircle className="w-4 h-4 mr-2" />
              Rechazar
            </Button>
            <Button className="bg-success text-success-foreground hover:bg-success/90">
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Aprobar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function EvaluacionesPage() {
  const { isInstructor } = useRole();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');

  const filteredSubmissions = mockSubmissions.filter(sub => {
    const matchesSearch = sub.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.programa.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || sub.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const pendingCount = mockSubmissions.filter(s => s.status === 'pending').length;

  return (
    <MainLayout breadcrumbs={[{ label: 'gestión' }, { label: 'evaluaciones' }]}>
      <div className="max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Evaluaciones
              {pendingCount > 0 && (
                <span className="ml-3 bg-destructive text-destructive-foreground text-sm px-2.5 py-1 rounded-full">
                  {pendingCount} pendientes
                </span>
              )}
            </h1>
            <p className="text-muted-foreground">
              {isInstructor 
                ? 'Exámenes finales de tus estudiantes'
                : 'Todos los exámenes finales enviados'
              }
            </p>
          </div>
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

export default EvaluacionesPage;
