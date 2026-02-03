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
      {/* Summary Card */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <FileText className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Examen Final</h3>
              <p className="text-sm text-muted-foreground">
                {config.objetivo ? 'Configurado' : 'Pendiente de configurar'}
              </p>
            </div>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Edit className="w-4 h-4 mr-2" />
                {config.objetivo ? 'Editar' : 'Configurar'}
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
                    className="mt-1 font-mono text-sm"
                    rows={10}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Incluye: descripción de la actividad, qué debe entregar, formato esperado, criterios de evaluación.
                  </p>
                </div>

                {/* Formato de Entrega */}
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

                  {/* Umbral de Aprobación */}
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
                      Calificación mínima para aprobar el examen
                    </p>
                  </div>
                </div>

                {/* Preview */}
                <div className="p-4 bg-muted/50 rounded-lg border border-border">
                  <h4 className="font-medium mb-2">Vista Previa</h4>
                  <div className="prose prose-sm max-w-none">
                    <p><strong>Objetivo:</strong> {config.objetivo || '(Sin definir)'}</p>
                    <p><strong>Formato:</strong> {formatosEntrega.find(f => f.value === config.formatoEntrega)?.label || '(Sin definir)'}</p>
                    <p><strong>Umbral:</strong> {config.umbralAprobacion}/10 para aprobar</p>
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleSave}>
                  <Save className="w-4 h-4 mr-2" />
                  Guardar Configuración
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Current config display */}
        {config.objetivo ? (
          <dl className="space-y-3 mt-4 pt-4 border-t border-border">
            <div>
              <dt className="text-sm text-muted-foreground">Objetivo</dt>
              <dd className="text-foreground mt-1">{config.objetivo}</dd>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <dt className="text-sm text-muted-foreground">Formato</dt>
                <dd className="text-foreground mt-1">
                  {formatosEntrega.find(f => f.value === config.formatoEntrega)?.label}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-muted-foreground">Umbral</dt>
                <dd className="text-foreground mt-1">{config.umbralAprobacion}/10</dd>
              </div>
            </div>
          </dl>
        ) : (
          <p className="text-muted-foreground text-sm mt-4">
            Haz clic en "Configurar" para definir el examen final
          </p>
        )}
      </div>

      {/* Instructions display when configured */}
      {config.instrucciones && (
        <div className="bg-card border border-border rounded-xl p-6">
          <h4 className="font-medium mb-3">Instrucciones para el Estudiante</h4>
          <div className="p-4 bg-muted/30 rounded-lg whitespace-pre-wrap text-sm">
            {config.instrucciones}
          </div>
        </div>
      )}
    </div>
  );
}

export default ExamenFinalEditor;
