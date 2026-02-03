import { MainLayout } from '@/components/layout/MainLayout';
import { useState } from 'react';
import { 
  Upload, 
  FileSpreadsheet, 
  CheckCircle2, 
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  Download,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
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
import { cn } from '@/lib/utils';

type UploadStep = 'upload' | 'mapping' | 'preview' | 'complete';
type ContentType = 'fases' | 'rutas' | 'programas' | 'modulos' | 'clases';

interface PreviewRow {
  id: number;
  data: Record<string, string>;
  status: 'valid' | 'error' | 'warning';
  action: 'create' | 'update';
  errors?: string[];
}

const mockPreviewData: PreviewRow[] = [
  { id: 1, data: { nombre: 'Análisis Técnico Avanzado', nombreEn: 'Advanced Technical Analysis', tier: 'pro', duracion: '10h' }, status: 'valid', action: 'create' },
  { id: 2, data: { nombre: 'Gestión de Riesgo', nombreEn: 'Risk Management', tier: 'basic', duracion: '6h' }, status: 'valid', action: 'update' },
  { id: 3, data: { nombre: 'Trading Algorítmico', nombreEn: '', tier: 'premium', duracion: '15h' }, status: 'warning', action: 'create', errors: ['Falta nombre en inglés'] },
  { id: 4, data: { nombre: '', nombreEn: 'Scalping Strategies', tier: 'pro', duracion: '8h' }, status: 'error', action: 'create', errors: ['Nombre en español es requerido'] },
];

const columnOptions = [
  { value: 'nombre', label: 'Nombre (ES)' },
  { value: 'nombreEn', label: 'Nombre (EN)' },
  { value: 'descripcion', label: 'Descripción (ES)' },
  { value: 'descripcionEn', label: 'Descripción (EN)' },
  { value: 'tier', label: 'Tier' },
  { value: 'duracion', label: 'Duración' },
  { value: 'orden', label: 'Orden' },
  { value: 'ignore', label: 'Ignorar columna' },
];

export function BatchUploadPage() {
  const [step, setStep] = useState<UploadStep>('upload');
  const [contentType, setContentType] = useState<ContentType>('programas');
  const [file, setFile] = useState<File | null>(null);
  const [mapping, setMapping] = useState<Record<string, string>>({
    'Column A': 'nombre',
    'Column B': 'nombreEn',
    'Column C': 'tier',
    'Column D': 'duracion',
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const validRows = mockPreviewData.filter(r => r.status === 'valid').length;
  const errorRows = mockPreviewData.filter(r => r.status === 'error').length;
  const warningRows = mockPreviewData.filter(r => r.status === 'warning').length;

  return (
    <MainLayout breadcrumbs={[{ label: 'herramientas' }, { label: 'batch upload' }]}>
      <div className="max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-2">Carga Masiva de Contenido</h1>
          <p className="text-muted-foreground">
            Importa fases, rutas, programas, módulos y clases desde archivos CSV o Excel
          </p>
        </div>

        {/* Progress steps */}
        <div className="flex items-center gap-4 mb-8">
          {(['upload', 'mapping', 'preview', 'complete'] as UploadStep[]).map((s, i) => (
            <div key={s} className="flex items-center">
              <div className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium',
                step === s && 'bg-primary text-primary-foreground',
                ((['upload', 'mapping', 'preview', 'complete'] as UploadStep[]).indexOf(step) > i) && 'bg-success text-success-foreground',
                ((['upload', 'mapping', 'preview', 'complete'] as UploadStep[]).indexOf(step) < i) && 'bg-muted text-muted-foreground'
              )}>
                {((['upload', 'mapping', 'preview', 'complete'] as UploadStep[]).indexOf(step) > i) ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : (
                  i + 1
                )}
              </div>
              <span className={cn(
                'ml-2 text-sm',
                step === s ? 'font-medium text-foreground' : 'text-muted-foreground'
              )}>
                {s === 'upload' && 'Subir archivo'}
                {s === 'mapping' && 'Mapeo de columnas'}
                {s === 'preview' && 'Previsualización'}
                {s === 'complete' && 'Completado'}
              </span>
              {i < 3 && <ArrowRight className="w-4 h-4 text-muted-foreground mx-4" />}
            </div>
          ))}
        </div>

        {/* Step content */}
        <div className="bg-card border border-border rounded-xl p-6">
          {/* Upload step */}
          {step === 'upload' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Tipo de contenido</label>
                <Select value={contentType} onValueChange={(v) => setContentType(v as ContentType)}>
                  <SelectTrigger className="w-64">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fases">Fases</SelectItem>
                    <SelectItem value="rutas">Rutas de Aprendizaje</SelectItem>
                    <SelectItem value="programas">Programas</SelectItem>
                    <SelectItem value="modulos">Módulos</SelectItem>
                    <SelectItem value="clases">Clases</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="border-2 border-dashed border-border rounded-xl p-12 text-center">
                <input
                  type="file"
                  accept=".csv,.xlsx,.xls"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Upload className="w-8 h-8 text-primary" />
                  </div>
                  <p className="text-lg font-medium text-foreground mb-2">
                    Arrastra un archivo o haz clic para seleccionar
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Formatos soportados: CSV, Excel (.xlsx, .xls)
                  </p>
                </label>
              </div>

              {file && (
                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileSpreadsheet className="w-8 h-8 text-primary" />
                    <div>
                      <p className="font-medium">{file.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {(file.size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => setFile(null)}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t">
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Descargar plantilla
                </Button>
                <Button onClick={() => setStep('mapping')} disabled={!file}>
                  Continuar
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {/* Mapping step */}
          {step === 'mapping' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-foreground mb-2">Mapeo de columnas</h3>
                <p className="text-sm text-muted-foreground">
                  Asocia las columnas de tu archivo con los campos del sistema
                </p>
              </div>

              <div className="space-y-3">
                {Object.entries(mapping).map(([column, field]) => (
                  <div key={column} className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
                    <div className="w-32 font-medium text-sm">{column}</div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground" />
                    <Select value={field} onValueChange={(v) => setMapping({ ...mapping, [column]: v })}>
                      <SelectTrigger className="flex-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {columnOptions.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <Button variant="outline" onClick={() => setStep('upload')}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Volver
                </Button>
                <Button onClick={() => setStep('preview')}>
                  Continuar
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {/* Preview step */}
          {step === 'preview' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Previsualización</h3>
                  <p className="text-sm text-muted-foreground">
                    Revisa los datos antes de confirmar la importación
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-success"></div>
                    <span className="text-sm">{validRows} válidos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-warning"></div>
                    <span className="text-sm">{warningRows} advertencias</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-destructive"></div>
                    <span className="text-sm">{errorRows} errores</span>
                  </div>
                </div>
              </div>

              <div className="border border-border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">#</TableHead>
                      <TableHead>Nombre (ES)</TableHead>
                      <TableHead>Nombre (EN)</TableHead>
                      <TableHead>Tier</TableHead>
                      <TableHead>Duración</TableHead>
                      <TableHead>Acción</TableHead>
                      <TableHead>Estado</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockPreviewData.map((row) => (
                      <TableRow 
                        key={row.id}
                        className={cn(
                          row.status === 'error' && 'bg-destructive/5',
                          row.status === 'warning' && 'bg-warning/5'
                        )}
                      >
                        <TableCell className="font-medium">{row.id}</TableCell>
                        <TableCell className={cn(!row.data.nombre && 'text-destructive')}>
                          {row.data.nombre || '(vacío)'}
                        </TableCell>
                        <TableCell className={cn(!row.data.nombreEn && 'text-warning')}>
                          {row.data.nombreEn || '(vacío)'}
                        </TableCell>
                        <TableCell>{row.data.tier}</TableCell>
                        <TableCell>{row.data.duracion}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={cn(
                            row.action === 'create' && 'border-success/50 bg-success/10 text-success',
                            row.action === 'update' && 'border-blue-200 bg-blue-50 text-blue-700'
                          )}>
                            {row.action === 'create' ? 'Crear' : 'Actualizar'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {row.status === 'valid' && (
                            <CheckCircle2 className="w-5 h-5 text-success" />
                          )}
                          {row.status === 'warning' && (
                            <div className="flex items-center gap-2">
                              <AlertTriangle className="w-5 h-5 text-warning" />
                              <span className="text-xs text-warning">{row.errors?.[0]}</span>
                            </div>
                          )}
                          {row.status === 'error' && (
                            <div className="flex items-center gap-2">
                              <X className="w-5 h-5 text-destructive" />
                              <span className="text-xs text-destructive">{row.errors?.[0]}</span>
                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <Button variant="outline" onClick={() => setStep('mapping')}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Volver
                </Button>
                <Button onClick={() => setStep('complete')} disabled={errorRows > 0}>
                  Confirmar importación ({validRows + warningRows} registros)
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {/* Complete step */}
          {step === 'complete' && (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-success" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                ¡Importación completada!
              </h3>
              <p className="text-muted-foreground mb-6">
                Se han importado {validRows + warningRows} registros exitosamente.
              </p>
              <div className="flex items-center justify-center gap-4">
                <Button variant="outline" onClick={() => {
                  setStep('upload');
                  setFile(null);
                }}>
                  Nueva importación
                </Button>
                <Button>
                  Ver {contentType}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}

export default BatchUploadPage;
