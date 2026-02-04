import { useState } from 'react';
import { Plus, Trash2, Save, GripVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface Nivel {
  nivel: number;
  descripcion: string;
  puntaje: number;
}

interface Competencia {
  id: string;
  name: string;
  peso: number;
  niveles: Nivel[];
}

interface RubricaEditorProps {
  competencias: Competencia[];
  onSave: (competencias: Competencia[]) => void;
  readOnly?: boolean;
}

const defaultNiveles: Nivel[] = [
  { nivel: 1, descripcion: '', puntaje: 2.5 },
  { nivel: 2, descripcion: '', puntaje: 5 },
  { nivel: 3, descripcion: '', puntaje: 7.5 },
  { nivel: 4, descripcion: '', puntaje: 10 },
];

export function RubricaEditor({ competencias: initialCompetencias, onSave, readOnly = false }: RubricaEditorProps) {
  const [competencias, setCompetencias] = useState<Competencia[]>(initialCompetencias);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const totalPeso = competencias.reduce((acc, comp) => acc + comp.peso, 0);

  const addCompetencia = () => {
    const newComp: Competencia = {
      id: `comp-${Date.now()}`,
      name: 'Nueva Competencia',
      peso: 0,
      niveles: [...defaultNiveles],
    };
    setCompetencias([...competencias, newComp]);
    setHasChanges(true);
  };

  const updateCompetencia = (id: string, field: keyof Competencia, value: any) => {
    setCompetencias(competencias.map(comp => 
      comp.id === id ? { ...comp, [field]: value } : comp
    ));
    setHasChanges(true);
  };

  const updateNivel = (compId: string, nivelIndex: number, field: keyof Nivel, value: any) => {
    setCompetencias(competencias.map(comp => {
      if (comp.id === compId) {
        const newNiveles = [...comp.niveles];
        newNiveles[nivelIndex] = { ...newNiveles[nivelIndex], [field]: value };
        return { ...comp, niveles: newNiveles };
      }
      return comp;
    }));
    setHasChanges(true);
  };

  const removeCompetencia = (id: string) => {
    setCompetencias(competencias.filter(comp => comp.id !== id));
    setHasChanges(true);
  };

  const handleSave = () => {
    onSave(competencias);
    setHasChanges(false);
    setIsDialogOpen(false);
  };

  if (readOnly) {
    return (
      <div className="space-y-4">
        {competencias.map((comp) => (
          <div key={comp.id} className="border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium">{comp.name}</h4>
              <span className="text-sm text-muted-foreground">Peso: {comp.peso}%</span>
            </div>
            <div 
              className="grid gap-3"
              style={{ gridTemplateColumns: `repeat(${comp.niveles.length}, minmax(0, 1fr))` }}
            >
              {comp.niveles.map((nivel) => (
                <div key={nivel.nivel} className="p-3 bg-muted/50 rounded-lg">
                  <p className="font-medium text-sm mb-1">
                    Nivel {nivel.nivel} ({nivel.puntaje} pts)
                  </p>
                  <p className="text-xs text-muted-foreground">{nivel.descripcion}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
        <div>
          <p className="font-medium">{competencias.length} Competencias</p>
          <p className={`text-sm ${totalPeso === 100 ? 'text-success' : 'text-destructive'}`}>
            Peso total: {totalPeso}% {totalPeso !== 100 && '(debe ser 100%)'}
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              Configurar Rúbrica
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Configurar Rúbrica</DialogTitle>
              <DialogDescription>
                Define las competencias, pesos y niveles de evaluación
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 py-4">
              {/* Weight summary */}
              <div className={`p-3 rounded-lg ${totalPeso === 100 ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'}`}>
                <p className="text-sm font-medium">
                  Peso total: {totalPeso}% {totalPeso !== 100 && '- Ajusta los pesos para que sumen 100%'}
                </p>
              </div>

              {/* Competencias */}
              <Accordion type="multiple" className="space-y-4">
                {competencias.map((comp, index) => (
                  <AccordionItem 
                    key={comp.id} 
                    value={comp.id}
                    className="border border-border rounded-lg px-4"
                  >
                    <AccordionTrigger className="hover:no-underline py-4">
                      <div className="flex items-center gap-3 flex-1">
                        <GripVertical className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium">{comp.name || 'Sin nombre'}</span>
                        <span className="text-sm text-muted-foreground ml-auto mr-4">
                          Peso: {comp.peso}%
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-4 space-y-4">
                      {/* Competencia fields */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Nombre de la Competencia</Label>
                          <Input
                            value={comp.name}
                            onChange={(e) => updateCompetencia(comp.id, 'name', e.target.value)}
                            placeholder="Ej: Análisis Técnico"
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label>Peso (%)</Label>
                          <Input
                            type="number"
                            min="0"
                            max="100"
                            value={comp.peso}
                            onChange={(e) => updateCompetencia(comp.id, 'peso', parseInt(e.target.value) || 0)}
                            className="mt-1"
                          />
                        </div>
                      </div>

                      {/* Niveles */}
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <Label>Niveles de Desempeño</Label>
                          <div className="flex items-center gap-2">
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                const newNiveles = [...comp.niveles];
                                const newNivelNum = newNiveles.length + 1;
                                newNiveles.push({
                                  nivel: newNivelNum,
                                  descripcion: '',
                                  puntaje: newNivelNum * 2.5,
                                });
                                updateCompetencia(comp.id, 'niveles', newNiveles);
                              }}
                            >
                              <Plus className="w-3 h-3 mr-1" />
                              Agregar Nivel
                            </Button>
                            {comp.niveles.length > 1 && (
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  const newNiveles = comp.niveles.slice(0, -1);
                                  updateCompetencia(comp.id, 'niveles', newNiveles);
                                }}
                              >
                                <Trash2 className="w-3 h-3 mr-1" />
                                Eliminar Nivel
                              </Button>
                            )}
                          </div>
                        </div>
                        <div 
                          className="grid gap-4"
                          style={{ gridTemplateColumns: `repeat(${comp.niveles.length}, minmax(0, 1fr))` }}
                        >
                          {comp.niveles.map((nivel, nivelIndex) => (
                            <div key={nivel.nivel} className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Nivel {nivel.nivel}</span>
                                <Input
                                  type="number"
                                  step="0.5"
                                  min="0"
                                  max="10"
                                  value={nivel.puntaje}
                                  onChange={(e) => updateNivel(comp.id, nivelIndex, 'puntaje', parseFloat(e.target.value) || 0)}
                                  className="w-20 h-8 text-sm"
                                  placeholder="Pts"
                                />
                              </div>
                              <Textarea
                                value={nivel.descripcion}
                                onChange={(e) => updateNivel(comp.id, nivelIndex, 'descripcion', e.target.value)}
                                placeholder={`Descripción del nivel ${nivel.nivel}...`}
                                className="text-sm"
                                rows={4}
                              />
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Remove button */}
                      <div className="flex justify-end">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:text-destructive"
                          onClick={() => removeCompetencia(comp.id)}
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Eliminar Competencia
                        </Button>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              {/* Add competencia button */}
              <Button variant="outline" onClick={addCompetencia} className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Agregar Competencia
              </Button>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleSave} disabled={totalPeso !== 100}>
                <Save className="w-4 h-4 mr-2" />
                Guardar Rúbrica
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Current competencias display */}
      <div className="space-y-4">
        {competencias.map((comp) => (
          <div key={comp.id} className="border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium">{comp.name}</h4>
              <span className="text-sm text-muted-foreground">Peso: {comp.peso}%</span>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {comp.niveles.map((nivel) => (
                <div key={nivel.nivel} className="p-3 bg-muted/50 rounded-lg">
                  <p className="font-medium text-sm mb-1">
                    Nivel {nivel.nivel} ({nivel.puntaje} pts)
                  </p>
                  <p className="text-xs text-muted-foreground line-clamp-3">{nivel.descripcion}</p>
                </div>
              ))}
            </div>
          </div>
        ))}

        {competencias.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <p>No hay competencias configuradas</p>
            <p className="text-sm">Haz clic en "Configurar Rúbrica" para comenzar</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default RubricaEditor;
