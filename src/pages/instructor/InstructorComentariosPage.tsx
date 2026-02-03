import { MainLayout } from '@/components/layout/MainLayout';
import { useState } from 'react';
import { 
  CommentsTabContent, 
  type Comentario, 
  type Clase 
} from '@/components/instructor/CommentsTabContent';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const mockProgramas = [
  { id: 'p1', name: 'Fundamentos del Análisis Técnico' },
  { id: 'p2', name: 'Gestión de Riesgo' },
];

const mockClases: Clase[] = [
  { id: 'c1', name: 'Teoría de Dow', modulo: 'Módulo 1: Fundamentos' },
  { id: 'c2', name: 'Patrones de velas', modulo: 'Módulo 2: Patrones' },
  { id: 'c3', name: 'Cálculo de posición', modulo: 'Módulo 1: Fundamentos de Riesgo' },
  { id: 'c4', name: 'Medias Móviles', modulo: 'Módulo 3: Indicadores' },
];

const mockComentarios: Comentario[] = [
  {
    id: '1',
    studentName: 'Ana Martínez',
    studentEmail: 'ana@email.com',
    programa: 'Fundamentos del Análisis Técnico',
    programaId: 'p1',
    modulo: 'Módulo 1: Fundamentos',
    clase: 'Teoría de Dow',
    claseId: 'c1',
    content: '¿Podrían explicar más sobre los principios de Dow? No me queda claro cómo aplicarlo en la práctica. Especialmente el principio de confirmación entre índices.',
    date: '2024-01-15 10:30',
    status: 'open',
    replies: [],
  },
  {
    id: '2',
    studentName: 'Pedro Sánchez',
    studentEmail: 'pedro@email.com',
    programa: 'Fundamentos del Análisis Técnico',
    programaId: 'p1',
    modulo: 'Módulo 2: Patrones',
    clase: 'Patrones de velas',
    claseId: 'c2',
    content: 'Excelente explicación del hammer y doji. ¿Podrían agregar más ejemplos de patrones de reversión? Me gustaría ver ejemplos en diferentes timeframes.',
    date: '2024-01-14 15:20',
    status: 'resolved',
    replies: [
      {
        id: 'r1',
        author: 'Instructor Carlos',
        content: '¡Gracias por tu comentario! Agregaremos más ejemplos en diferentes timeframes pronto. Por ahora, te recomiendo revisar los gráficos de 4H y diario para identificar estos patrones.',
        date: '2024-01-14 16:45',
        isInstructor: true,
      },
    ],
  },
  {
    id: '3',
    studentName: 'Carmen Ruiz',
    studentEmail: 'carmen@email.com',
    programa: 'Gestión de Riesgo',
    programaId: 'p2',
    modulo: 'Módulo 1: Fundamentos de Riesgo',
    clase: 'Cálculo de posición',
    claseId: 'c3',
    content: '¿Cuál es la diferencia entre una orden limit y una stop limit? En el video se mencionan pero no queda clara la diferencia práctica.',
    date: '2024-01-12 14:00',
    status: 'open',
    replies: [],
  },
  {
    id: '4',
    studentName: 'Luis García',
    studentEmail: 'luis@email.com',
    programa: 'Fundamentos del Análisis Técnico',
    programaId: 'p1',
    modulo: 'Módulo 3: Indicadores',
    clase: 'Medias Móviles',
    claseId: 'c4',
    content: '¿Es mejor usar EMA o SMA para identificar tendencias? El video menciona ambas pero no explica cuándo usar cada una.',
    date: '2024-01-16 09:15',
    status: 'open',
    replies: [],
  },
];

export function InstructorComentariosPage() {
  const [filterPrograma, setFilterPrograma] = useState<string>('all');
  const [comentarios, setComentarios] = useState(mockComentarios);

  const openCount = comentarios.filter(c => c.status === 'open').length;

  // Filter comentarios by programa
  const filteredComentarios = filterPrograma === 'all' 
    ? comentarios 
    : comentarios.filter(c => c.programaId === filterPrograma);

  // Filter clases by programa
  const availableClases = filterPrograma === 'all'
    ? mockClases
    : mockClases.filter((_, index) => {
        // Match clases to programas based on mock data structure
        if (filterPrograma === 'p1') return index !== 2;
        if (filterPrograma === 'p2') return index === 2;
        return true;
      });

  return (
    <MainLayout breadcrumbs={[{ label: 'my workspace' }, { label: 'comentarios' }]}>
      <div className="max-w-4xl">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Comentarios
              {openCount > 0 && (
                <span className="ml-3 bg-warning text-warning-foreground text-sm px-2.5 py-1 rounded-full">
                  {openCount} abiertos
                </span>
              )}
            </h1>
            <p className="text-muted-foreground">Comentarios en tus clases y programas</p>
          </div>
        </div>

        {/* Programa filter */}
        <div className="mb-4">
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
        </div>

        {/* Comments content using shared component */}
        <CommentsTabContent
          comentarios={filteredComentarios}
          clases={availableClases}
          programas={mockProgramas}
          showSearch={true}
          showClaseFilter={true}
          showProgramaBreadcrumb={true}
          showNewCommentButton={true}
          onCommentsChange={setComentarios}
        />
      </div>
    </MainLayout>
  );
}

export default InstructorComentariosPage;
