import { MainLayout } from '@/components/layout/MainLayout';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  Clock,
  Users,
  Layers,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface ProgramaCard {
  id: string;
  name: string;
  modulosCount: number;
  duration: string;
  studentsCount: number;
  tier: 'free' | 'basic' | 'pro' | 'premium';
  coverImage: string;
}

const mockProgramas: ProgramaCard[] = [
  {
    id: '1',
    name: 'Fundamentos del Análisis Técnico',
    modulosCount: 3,
    duration: '8h 30m',
    studentsCount: 342,
    tier: 'basic',
    coverImage: '/placeholder.svg',
  },
  {
    id: '2',
    name: 'Gestión de Riesgo',
    modulosCount: 4,
    duration: '6h 15m',
    studentsCount: 187,
    tier: 'pro',
    coverImage: '/placeholder.svg',
  },
  {
    id: '3',
    name: 'Introducción a los Mercados',
    modulosCount: 5,
    duration: '10h 00m',
    studentsCount: 521,
    tier: 'free',
    coverImage: '/placeholder.svg',
  },
  {
    id: '4',
    name: 'Psicología del Trading',
    modulosCount: 3,
    duration: '5h 45m',
    studentsCount: 298,
    tier: 'premium',
    coverImage: '/placeholder.svg',
  },
];

const tierColors = {
  free: 'border-gray-200 bg-gray-50 text-gray-700',
  basic: 'border-blue-200 bg-blue-50 text-blue-700',
  pro: 'border-purple-200 bg-purple-50 text-purple-700',
  premium: 'border-amber-200 bg-amber-50 text-amber-700',
};

export function InstructorProgramasPage() {
  return (
    <MainLayout breadcrumbs={[{ label: 'instructor' }, { label: 'mis programas' }]}>
      <div className="max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">Mis Programas</h1>
          <p className="text-muted-foreground">Programas asignados para gestionar</p>
        </div>

        {/* Programs Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockProgramas.map((programa) => (
            <Link
              key={programa.id}
              to={`/instructor/programas/${programa.id}`}
              className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all hover:border-primary/50 group"
            >
              <div className="aspect-video bg-muted relative">
                <img
                  src={programa.coverImage}
                  alt={programa.name}
                  className="w-full h-full object-cover"
                />
                <Badge 
                  variant="outline" 
                  className={cn('absolute top-3 right-3', tierColors[programa.tier])}
                >
                  {programa.tier.charAt(0).toUpperCase() + programa.tier.slice(1)}
                </Badge>
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {programa.name}
                </h3>
                <div className="grid grid-cols-3 gap-3 text-sm">
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Layers className="w-4 h-4" />
                    <span>{programa.modulosCount} módulos</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{programa.duration}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span>{programa.studentsCount}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}

export default InstructorProgramasPage;
