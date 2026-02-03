import { MainLayout } from '@/components/layout/MainLayout';
import { useRole } from '@/contexts/RoleContext';
import { useState } from 'react';
import { 
  Search, 
  Filter, 
  MessageSquare,
  Send,
  Flag,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface Comentario {
  id: string;
  studentName: string;
  studentEmail: string;
  programa: string;
  clase: string;
  content: string;
  date: string;
  status: 'open' | 'resolved' | 'reported';
  replies: Reply[];
}

interface Reply {
  id: string;
  author: string;
  content: string;
  date: string;
  isInstructor: boolean;
}

const mockComentarios: Comentario[] = [
  {
    id: '1',
    studentName: 'Ana Martínez',
    studentEmail: 'ana@email.com',
    programa: 'Fundamentos del Análisis Técnico',
    clase: 'Teoría de Dow',
    content: '¿Podrían explicar más sobre los principios de Dow? No me queda claro cómo aplicarlo en la práctica.',
    date: '2024-01-15 10:30',
    status: 'open',
    replies: [],
  },
  {
    id: '2',
    studentName: 'Pedro Sánchez',
    studentEmail: 'pedro@email.com',
    programa: 'Fundamentos del Análisis Técnico',
    clase: 'Patrones de velas',
    content: 'Excelente explicación del hammer y doji. ¿Podrían agregar más ejemplos de patrones de reversión?',
    date: '2024-01-14 15:20',
    status: 'resolved',
    replies: [
      {
        id: 'r1',
        author: 'Instructor Carlos',
        content: '¡Gracias por tu comentario! Efectivamente, agregaremos más ejemplos en la próxima actualización del curso.',
        date: '2024-01-14 16:45',
        isInstructor: true,
      },
    ],
  },
  {
    id: '3',
    studentName: 'Luis Rodríguez',
    studentEmail: 'luis@email.com',
    programa: 'Gestión de Riesgo',
    clase: 'Cálculo de posición',
    content: 'Este contenido es inapropiado y no tiene nada que ver con el tema.',
    date: '2024-01-13 09:15',
    status: 'reported',
    replies: [],
  },
  {
    id: '4',
    studentName: 'Carmen Ruiz',
    studentEmail: 'carmen@email.com',
    programa: 'Introducción a los Mercados',
    clase: 'Tipos de órdenes',
    content: '¿Cuál es la diferencia entre una orden limit y una stop limit?',
    date: '2024-01-12 14:00',
    status: 'open',
    replies: [],
  },
];

function CommentCard({ comentario, onReply }: { comentario: Comentario; onReply: (id: string, reply: string) => void }) {
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState('');
  const { isSuperAdmin } = useRole();

  const handleSubmitReply = () => {
    if (replyText.trim()) {
      onReply(comentario.id, replyText);
      setReplyText('');
      setIsReplying(false);
    }
  };

  return (
    <div 
      className={cn(
        'bg-card border rounded-xl p-5',
        comentario.status === 'open' && 'border-warning/50',
        comentario.status === 'reported' && 'border-destructive/50',
        comentario.status === 'resolved' && 'border-border'
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-primary/10 text-primary">
              {comentario.studentName.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-medium">{comentario.studentName}</span>
              <span className="text-sm text-muted-foreground">•</span>
              <span className="text-sm text-muted-foreground">{comentario.date}</span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="outline" className="text-xs">{comentario.programa}</Badge>
              <span className="text-xs text-muted-foreground">→</span>
              <span className="text-xs text-muted-foreground">{comentario.clase}</span>
            </div>
          </div>
        </div>
        <Badge 
          variant="outline"
          className={cn(
            comentario.status === 'open' && 'border-warning/50 bg-warning/10 text-warning',
            comentario.status === 'resolved' && 'border-success/50 bg-success/10 text-success',
            comentario.status === 'reported' && 'border-destructive/50 bg-destructive/10 text-destructive'
          )}
        >
          {comentario.status === 'open' && 'Abierto'}
          {comentario.status === 'resolved' && 'Resuelto'}
          {comentario.status === 'reported' && 'Reportado'}
        </Badge>
      </div>

      {/* Content */}
      <p className="text-foreground mb-4">{comentario.content}</p>

      {/* Replies */}
      {comentario.replies.length > 0 && (
        <div className="border-l-2 border-primary/20 pl-4 mb-4 space-y-3">
          {comentario.replies.map((reply) => (
            <div key={reply.id} className="bg-muted/50 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <Avatar className="h-6 w-6">
                  <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                    {reply.author.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">{reply.author}</span>
                {reply.isInstructor && (
                  <Badge variant="outline" className="text-xs border-primary/50 bg-primary/10 text-primary">
                    Instructor
                  </Badge>
                )}
                <span className="text-xs text-muted-foreground">{reply.date}</span>
              </div>
              <p className="text-sm text-muted-foreground">{reply.content}</p>
            </div>
          ))}
        </div>
      )}

      {/* Reply form */}
      {isReplying && (
        <div className="mb-4">
          <Textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Escribe tu respuesta..."
            className="mb-2"
          />
          <div className="flex justify-end gap-2">
            <Button variant="outline" size="sm" onClick={() => setIsReplying(false)}>
              Cancelar
            </Button>
            <Button size="sm" onClick={handleSubmitReply}>
              <Send className="w-4 h-4 mr-2" />
              Enviar
            </Button>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-2 pt-4 border-t border-border">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setIsReplying(!isReplying)}
        >
          <MessageSquare className="w-4 h-4 mr-2" />
          Responder
        </Button>
        {comentario.status === 'open' && (
          <Button variant="outline" size="sm" className="text-success">
            <CheckCircle className="w-4 h-4 mr-2" />
            Marcar resuelto
          </Button>
        )}
        {comentario.status !== 'reported' && (
          <Button variant="outline" size="sm" className="text-destructive">
            <Flag className="w-4 h-4 mr-2" />
            Reportar
          </Button>
        )}
        {comentario.status === 'reported' && isSuperAdmin && (
          <>
            <Button variant="outline" size="sm" className="text-success">
              <CheckCircle className="w-4 h-4 mr-2" />
              Aprobar
            </Button>
            <Button variant="outline" size="sm" className="text-destructive">
              <AlertTriangle className="w-4 h-4 mr-2" />
              Eliminar
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

export function ComentariosPage() {
  const { isInstructor, isSuperAdmin } = useRole();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'open' | 'resolved' | 'reported'>('all');
  const [comentarios, setComentarios] = useState(mockComentarios);

  const filteredComentarios = comentarios.filter(com => {
    const matchesSearch = com.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      com.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      com.clase.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || com.status === filterStatus;
    // Si es instructor, solo mostrar sus programas (simulado)
    // Si es superadmin y filtro es "reported", mostrar reportados
    if (filterStatus === 'reported' && !isSuperAdmin) return false;
    return matchesSearch && matchesFilter;
  });

  const openCount = comentarios.filter(c => c.status === 'open').length;
  const reportedCount = comentarios.filter(c => c.status === 'reported').length;

  const handleReply = (id: string, reply: string) => {
    setComentarios(prev => prev.map(com => {
      if (com.id === id) {
        return {
          ...com,
          replies: [...com.replies, {
            id: `r${Date.now()}`,
            author: 'Instructor',
            content: reply,
            date: new Date().toISOString().split('T')[0],
            isInstructor: true,
          }],
        };
      }
      return com;
    }));
  };

  return (
    <MainLayout breadcrumbs={[{ label: 'gestión' }, { label: 'comentarios' }]}>
      <div className="max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Comentarios
              {openCount > 0 && (
                <span className="ml-3 bg-warning text-warning-foreground text-sm px-2.5 py-1 rounded-full">
                  {openCount} abiertos
                </span>
              )}
              {isSuperAdmin && reportedCount > 0 && (
                <span className="ml-2 bg-destructive text-destructive-foreground text-sm px-2.5 py-1 rounded-full">
                  {reportedCount} reportados
                </span>
              )}
            </h1>
            <p className="text-muted-foreground">
              {isInstructor 
                ? 'Comentarios en tus clases y programas'
                : 'Todos los comentarios de la plataforma'
              }
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar comentarios..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex gap-2">
            {(['all', 'open', 'resolved', ...(isSuperAdmin ? ['reported'] : [])] as const).map((status) => (
              <Button
                key={status}
                variant={filterStatus === status ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterStatus(status as any)}
              >
                {status === 'all' && 'Todos'}
                {status === 'open' && 'Abiertos'}
                {status === 'resolved' && 'Resueltos'}
                {status === 'reported' && 'Reportados'}
              </Button>
            ))}
          </div>
        </div>

        {/* Comments list */}
        <div className="space-y-4">
          {filteredComentarios.map((comentario) => (
            <CommentCard 
              key={comentario.id} 
              comentario={comentario}
              onReply={handleReply}
            />
          ))}

          {filteredComentarios.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No hay comentarios que mostrar</p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}

export default ComentariosPage;
