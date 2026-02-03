import { useState } from 'react';
import { 
  Search, 
  MessageSquare,
  Send,
  Flag,
  CheckCircle,
  BookOpen,
  Video,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export interface Reply {
  id: string;
  author: string;
  content: string;
  date: string;
  isInstructor: boolean;
}

export interface Comentario {
  id: string;
  studentName: string;
  studentEmail?: string;
  programa?: string;
  programaId?: string;
  modulo: string;
  clase: string;
  claseId?: string;
  content: string;
  date: string;
  status: 'open' | 'resolved' | 'reported';
  replies: Reply[];
}

export interface Clase {
  id: string;
  name: string;
  modulo?: string;
}

interface CommentCardProps {
  comentario: Comentario;
  onReply: (id: string, reply: string) => void;
  onMarkResolved: (id: string) => void;
  showProgramaBreadcrumb?: boolean;
}

function CommentCard({ 
  comentario, 
  onReply, 
  onMarkResolved,
  showProgramaBreadcrumb = true
}: CommentCardProps) {
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState('');

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
      {/* Location Badge - Programa > Módulo > Clase */}
      <div className="flex items-center gap-2 mb-4 p-3 bg-muted/50 rounded-lg flex-wrap">
        {showProgramaBreadcrumb && comentario.programa && (
          <>
            <BookOpen className="w-4 h-4 text-primary shrink-0" />
            <span className="text-sm font-medium text-primary">{comentario.programa}</span>
            <ChevronRight className="w-3 h-3 text-muted-foreground shrink-0" />
          </>
        )}
        <span className="text-sm text-muted-foreground">{comentario.modulo}</span>
        <ChevronRight className="w-3 h-3 text-muted-foreground shrink-0" />
        <Video className="w-3 h-3 text-muted-foreground shrink-0" />
        <span className="text-sm font-medium">{comentario.clase}</span>
      </div>

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
            {comentario.studentEmail && (
              <span className="text-sm text-muted-foreground">{comentario.studentEmail}</span>
            )}
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
          <Button 
            variant="outline" 
            size="sm" 
            className="text-success"
            onClick={() => onMarkResolved(comentario.id)}
          >
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
      </div>
    </div>
  );
}

interface CommentsTabContentProps {
  comentarios: Comentario[];
  clases?: Clase[];
  showSearch?: boolean;
  showClaseFilter?: boolean;
  showProgramaBreadcrumb?: boolean;
  onCommentsChange?: (comments: Comentario[]) => void;
}

export function CommentsTabContent({ 
  comentarios: initialComentarios,
  clases = [],
  showSearch = true,
  showClaseFilter = true,
  showProgramaBreadcrumb = true,
  onCommentsChange
}: CommentsTabContentProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'open' | 'resolved'>('all');
  const [filterClase, setFilterClase] = useState<string>('all');
  const [comentarios, setComentarios] = useState(initialComentarios);

  const filteredComentarios = comentarios.filter(com => {
    const matchesSearch = com.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      com.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      com.clase.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || com.status === filterStatus;
    const matchesClase = filterClase === 'all' || com.clase === filterClase || com.claseId === filterClase;
    return matchesSearch && matchesStatus && matchesClase;
  });

  const openCount = comentarios.filter(c => c.status === 'open').length;

  const handleReply = (id: string, reply: string) => {
    const updated = comentarios.map(com => {
      if (com.id === id) {
        return {
          ...com,
          replies: [...com.replies, {
            id: `r${Date.now()}`,
            author: 'Instructor',
            content: reply,
            date: new Date().toLocaleString('es-ES', { 
              year: 'numeric', 
              month: '2-digit', 
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit'
            }),
            isInstructor: true,
          }],
        };
      }
      return com;
    });
    setComentarios(updated);
    onCommentsChange?.(updated);
  };

  const handleMarkResolved = (id: string) => {
    const updated = comentarios.map(com => {
      if (com.id === id) {
        return { ...com, status: 'resolved' as const };
      }
      return com;
    });
    setComentarios(updated);
    onCommentsChange?.(updated);
  };

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 mb-4">
        {showSearch && (
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar comentarios..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        )}
        {showClaseFilter && clases.length > 0 && (
          <Select value={filterClase} onValueChange={setFilterClase}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filtrar por clase" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las clases</SelectItem>
              {clases.map(c => (
                <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
        <div className="flex gap-2">
          {(['all', 'open', 'resolved'] as const).map((status) => (
            <Button
              key={status}
              variant={filterStatus === status ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterStatus(status)}
              className="relative"
            >
              {status === 'all' && 'Todos'}
              {status === 'open' && (
                <>
                  Abiertos
                  {openCount > 0 && (
                    <span className="ml-1.5 bg-destructive text-destructive-foreground text-xs px-1.5 py-0.5 rounded-full">
                      {openCount}
                    </span>
                  )}
                </>
              )}
              {status === 'resolved' && 'Resueltos'}
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
            onMarkResolved={handleMarkResolved}
            showProgramaBreadcrumb={showProgramaBreadcrumb}
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
  );
}
