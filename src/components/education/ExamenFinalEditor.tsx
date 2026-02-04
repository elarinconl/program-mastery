import { useState } from 'react';
import { Save, Edit, FileText } from 'lucide-react';
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface ExamenFinalConfig {
  objetivo: string;
  instrucciones: string;
  formatoEntrega: string;
  umbralAprobacion: number;
}

interface ExamenFinalEditorProps {
  config: ExamenFinalConfig;
  onSave: (config: ExamenFinalConfig) => void;
  readOnly?: boolean;
}

const formatosEntrega = [
  { value: 'pdf', label: 'Documento PDF' },
  { value: 'video', label: 'Video' },
  { value: 'link', label: 'Enlace externo' },
  { value: 'zip', label: 'Archivo comprimido (ZIP)' },
  { value: 'presentation', label: 'Presentación (PPT/PPTX)' },
];

export function ExamenFinalEditor({ config: initialConfig, onSave, readOnly = false }: ExamenFinalEditorProps) {
  const [config, setConfig] = useState<ExamenFinalConfig>(initialConfig);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSave = () => {
    onSave(config);
    setIsDialogOpen(false);
  };

  const updateConfig = (field: keyof ExamenFinalConfig, value: any) => {
    setConfig(prev => ({ ...prev, [field]: value }));
  };

  if (readOnly) {
    return (
      <div className="space-y-6">
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="font-semibold text-foreground mb-4">Configuración del Examen Final</h3>
          <dl className="space-y-4">
            <div>
              <dt className="text-sm text-muted-foreground mb-1">Objetivo</dt>
              <dd className="text-foreground">{config.objetivo || 'No configurado'}</dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground mb-1">Instrucciones</dt>
              <dd className="text-foreground whitespace-pre-wrap">{config.instrucciones || 'No configurado'}</dd>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <dt className="text-sm text-muted-foreground mb-1">Formato de Entrega</dt>
                <dd className="text-foreground">
                  {formatosEntrega.find(f => f.value === config.formatoEntrega)?.label || 'No configurado'}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-muted-foreground mb-1">Umbral de Aprobación</dt>
                <dd className="text-foreground">{config.umbralAprobacion}/10</dd>
              </div>
            </div>
          </dl>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button variant={config.objetivo ? "outline" : "default"} className="w-full sm:w-auto">
            <Edit className="w-4 h-4 mr-2" />
            {config.objetivo ? 'Editar Configuración' : 'Configurar Examen Final'}
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Configurar Examen Final</DialogTitle>
            <DialogDescription>
              Define el objetivo, instrucciones y parámetros de la evaluación final
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Objetivo */}
            <div>
              <Label>Objetivo del Examen</Label>
              <Textarea
                value={config.objetivo}
                onChange={(e) => updateConfig('objetivo', e.target.value)}
                placeholder="Describe el objetivo principal que el estudiante debe demostrar..."
                className="mt-1"
                rows={3}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Ejemplo: Demostrar dominio en la identificación de patrones de análisis técnico y su aplicación práctica.
              </p>
            </div>

            {/* Instrucciones */}
            <div>
              <Label>Instrucciones Detalladas</Label>
              <Textarea
                value={config.instrucciones}
                onChange={(e) => updateConfig('instrucciones', e.target.value)}
                placeholder="Escribe las instrucciones paso a paso para completar el examen..."
                className="mt-1"
                rows={8}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Incluye: descripción de la actividad, qué debe entregar, formato esperado, criterios de evaluación.
              </p>
            </div>

            {/* Formato de Entrega y Umbral */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Formato de Entrega</Label>
                <Select
                  value={config.formatoEntrega}
                  onValueChange={(value) => updateConfig('formatoEntrega', value)}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Selecciona formato" />
                  </SelectTrigger>
                  <SelectContent>
                    {formatosEntrega.map((formato) => (
                      <SelectItem key={formato.value} value={formato.value}>
                        {formato.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Umbral de Aprobación (sobre 10)</Label>
                <Input
                  type="number"
                  min="1"
                  max="10"
                  step="0.5"
                  value={config.umbralAprobacion}
                  onChange={(e) => updateConfig('umbralAprobacion', parseFloat(e.target.value) || 6)}
                  className="mt-1"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Calificación mínima para aprobar
                </p>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" />
              Guardar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Vista unificada de la configuración */}
      {config.objetivo ? (
        <div className="bg-card border border-border rounded-xl p-6 space-y-6">
          <div>
            <Label className="text-sm font-semibold text-muted-foreground mb-2 block">Objetivo</Label>
            <p className="text-foreground">{config.objetivo}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label className="text-sm font-semibold text-muted-foreground mb-2 block">Formato de Entrega</Label>
              <p className="text-foreground">
                {formatosEntrega.find(f => f.value === config.formatoEntrega)?.label || 'No definido'}
              </p>
            </div>
            <div>
              <Label className="text-sm font-semibold text-muted-foreground mb-2 block">Umbral de Aprobación</Label>
              <p className="text-foreground">{config.umbralAprobacion}/10</p>
            </div>
          </div>

          {config.instrucciones && (
            <div>
              <Label className="text-sm font-semibold text-muted-foreground mb-2 block">Instrucciones</Label>
              <div className="p-4 bg-muted/30 rounded-lg whitespace-pre-wrap text-sm text-foreground">
                {config.instrucciones}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-card border border-border rounded-xl p-8 text-center">
          <FileText className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
          <p className="text-muted-foreground mb-4">No hay configuración de examen final</p>
          <p className="text-sm text-muted-foreground">Haz clic en "Configurar Examen Final" para comenzar</p>
        </div>
      )}
    </div>
  );
}

export default ExamenFinalEditor;
