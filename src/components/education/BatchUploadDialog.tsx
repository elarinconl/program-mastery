import { useState, useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Upload, 
  FileSpreadsheet, 
  Check, 
  X, 
  AlertCircle,
  Download,
  ArrowRight,
  ArrowLeft,
  CheckCircle2
} from 'lucide-react';
import { cn } from '@/lib/utils';

export type ContentType = 'fases' | 'rutas' | 'programas' | 'clases' | 'rubricas' | 'examenes';

interface ColumnMapping {
  field: string;
  label: string;
  required: boolean;
}

const columnMappings: Record<ContentType, ColumnMapping[]> = {
  fases: [
    { field: 'nombre', label: 'Nombre (ES)', required: true },
    { field: 'nombreEn', label: 'Nombre (EN)', required: false },
    { field: 'descripcion', label: 'Descripción', required: false },
    { field: 'orden', label: 'Orden', required: true },
    { field: 'estado', label: 'Estado', required: false },
  ],
  rutas: [
    { field: 'nombre', label: 'Nombre (ES)', required: true },
    { field: 'nombreEn', label: 'Nombre (EN)', required: false },
    { field: 'fase', label: 'Fase', required: true },
    { field: 'tier', label: 'Tier', required: true },
    { field: 'estado', label: 'Estado', required: false },
  ],
  programas: [
    { field: 'nombre', label: 'Nombre (ES)', required: true },
    { field: 'nombreEn', label: 'Nombre (EN)', required: false },
    { field: 'ruta', label: 'Ruta', required: true },
    { field: 'tier', label: 'Tier', required: true },
    { field: 'duracion', label: 'Duración', required: false },
    { field: 'estado', label: 'Estado', required: false },
  ],
  clases: [
    { field: 'nombre', label: 'Nombre (ES)', required: true },
    { field: 'nombreEn', label: 'Nombre (EN)', required: false },
    { field: 'tipo', label: 'Tipo (video/text/quiz/pdf)', required: true },
    { field: 'programa', label: 'Programa', required: true },
    { field: 'modulo', label: 'Módulo', required: true },
    { field: 'esActividad', label: 'Es Actividad', required: false },
    { field: 'duracion', label: 'Duración', required: false },
  ],
  rubricas: [
    { field: 'competencia', label: 'Competencia', required: true },
    { field: 'peso', label: 'Peso (%)', required: true },
    { field: 'nivel1Desc', label: 'Nivel 1 - Descripción', required: true },
    { field: 'nivel1Pts', label: 'Nivel 1 - Puntos', required: true },
    { field: 'nivel2Desc', label: 'Nivel 2 - Descripción', required: true },
    { field: 'nivel2Pts', label: 'Nivel 2 - Puntos', required: true },
    { field: 'nivel3Desc', label: 'Nivel 3 - Descripción', required: true },
    { field: 'nivel3Pts', label: 'Nivel 3 - Puntos', required: true },
    { field: 'nivel4Desc', label: 'Nivel 4 - Descripción', required: true },
    { field: 'nivel4Pts', label: 'Nivel 4 - Puntos', required: true },
  ],
  examenes: [
    { field: 'objetivo', label: 'Objetivo', required: true },
    { field: 'instrucciones', label: 'Instrucciones', required: true },
    { field: 'formatoEntrega', label: 'Formato de Entrega', required: true },
    { field: 'umbralAprobacion', label: 'Umbral de Aprobación', required: true },
  ],
};

const contentTypeLabels: Record<ContentType, string> = {
  fases: 'Fases',
  rutas: 'Rutas',
  programas: 'Programas',
  clases: 'Clases',
  rubricas: 'Rúbrica',
  examenes: 'Examen Final',
};

interface PreviewRow {
  data: Record<string, string>;
  errors: string[];
  isValid: boolean;
}

interface BatchUploadDialogProps {
  contentType: ContentType;
  programId?: string;
  onComplete?: (data: Record<string, string>[]) => void;
  trigger: React.ReactNode;
}

export function BatchUploadDialog({ 
  contentType, 
  programId, 
  onComplete,
  trigger 
}: BatchUploadDialogProps) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<'upload' | 'mapping' | 'preview' | 'complete'>('upload');
  const [file, setFile] = useState<File | null>(null);
  const [csvHeaders, setCsvHeaders] = useState<string[]>([]);
  const [csvData, setCsvData] = useState<string[][]>([]);
  const [mapping, setMapping] = useState<Record<string, string>>({});
  const [previewData, setPreviewData] = useState<PreviewRow[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const requiredFields = columnMappings[contentType];

  const resetState = () => {
    setStep('upload');
    setFile(null);
    setCsvHeaders([]);
    setCsvData([]);
    setMapping({});
    setPreviewData([]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      parseCSV(selectedFile);
    }
  };

  const parseCSV = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const lines = text.split('\n').filter(line => line.trim());
      if (lines.length > 0) {
        const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
        const data = lines.slice(1).map(line => 
          line.split(',').map(cell => cell.trim().replace(/"/g, ''))
        );
        setCsvHeaders(headers);
        setCsvData(data);
        
        // Auto-map matching column names
        const autoMapping: Record<string, string> = {};
        requiredFields.forEach(field => {
          const matchingHeader = headers.find(h => 
            h.toLowerCase() === field.field.toLowerCase() ||
            h.toLowerCase() === field.label.toLowerCase()
          );
          if (matchingHeader) {
            autoMapping[field.field] = matchingHeader;
          }
        });
        setMapping(autoMapping);
        
        setStep('mapping');
      }
    };
    reader.readAsText(file);
  };

  const handleMappingChange = (field: string, header: string) => {
    setMapping(prev => ({ ...prev, [field]: header }));
  };

  const validateAndPreview = () => {
    const preview: PreviewRow[] = csvData.map(row => {
      const rowData: Record<string, string> = {};
      const errors: string[] = [];
      
      requiredFields.forEach(field => {
        const headerIndex = csvHeaders.indexOf(mapping[field.field] || '');
        const value = headerIndex >= 0 ? row[headerIndex] : '';
        rowData[field.field] = value;
        
        if (field.required && !value) {
          errors.push(`${field.label} es requerido`);
        }
      });
      
      return {
        data: rowData,
        errors,
        isValid: errors.length === 0,
      };
    });
    
    setPreviewData(preview);
    setStep('preview');
  };

  const handleImport = () => {
    const validData = previewData
      .filter(row => row.isValid)
      .map(row => row.data);
    
    onComplete?.(validData);
    setStep('complete');
  };

  const handleClose = () => {
    setOpen(false);
    setTimeout(resetState, 300);
  };

  const downloadTemplate = () => {
    const headers = requiredFields.map(f => f.field).join(',');
    const exampleRow = requiredFields.map(f => `"ejemplo_${f.field}"`).join(',');
    const csv = `${headers}\n${exampleRow}`;
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `plantilla_${contentType}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const validCount = previewData.filter(r => r.isValid).length;
  const errorCount = previewData.filter(r => !r.isValid).length;
  const mappedFieldsCount = Object.keys(mapping).filter(k => mapping[k]).length;
  const requiredMappedCount = requiredFields
    .filter(f => f.required)
    .filter(f => mapping[f.field])
    .length;
  const allRequiredMapped = requiredFields
    .filter(f => f.required)
    .every(f => mapping[f.field]);

  return (
    <Dialog open={open} onOpenChange={(o) => {
      setOpen(o);
      if (!o) setTimeout(resetState, 300);
    }}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            Carga Masiva - {contentTypeLabels[contentType]}
          </DialogTitle>
          <DialogDescription>
            Importa múltiples registros desde un archivo CSV o Excel
          </DialogDescription>
        </DialogHeader>

        {/* Step Progress */}
        <div className="flex items-center justify-between px-4 py-3 bg-muted/50 rounded-lg mb-4">
          {['upload', 'mapping', 'preview', 'complete'].map((s, i) => (
            <div key={s} className="flex items-center">
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
                step === s && "bg-primary text-primary-foreground",
                ['upload', 'mapping', 'preview', 'complete'].indexOf(step) > i && "bg-success text-success-foreground",
                ['upload', 'mapping', 'preview', 'complete'].indexOf(step) < i && "bg-muted text-muted-foreground"
              )}>
                {['upload', 'mapping', 'preview', 'complete'].indexOf(step) > i ? (
                  <Check className="w-4 h-4" />
                ) : (
                  i + 1
                )}
              </div>
              <span className={cn(
                "ml-2 text-sm hidden sm:inline",
                step === s ? "text-foreground font-medium" : "text-muted-foreground"
              )}>
                {s === 'upload' && 'Subir archivo'}
                {s === 'mapping' && 'Mapear columnas'}
                {s === 'preview' && 'Previsualizar'}
                {s === 'complete' && 'Completado'}
              </span>
              {i < 3 && <ArrowRight className="w-4 h-4 mx-4 text-muted-foreground hidden sm:block" />}
            </div>
          ))}
        </div>

        {/* Step 1: Upload */}
        {step === 'upload' && (
          <div className="space-y-6">
            <div 
              onClick={() => fileInputRef.current?.click()}
              className={cn(
                "border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-colors",
                "hover:border-primary/50 hover:bg-primary/5",
                file ? "border-success bg-success/5" : "border-border"
              )}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv,.xlsx,.xls"
                onChange={handleFileChange}
                className="hidden"
              />
              {file ? (
                <div className="space-y-2">
                  <FileSpreadsheet className="w-12 h-12 mx-auto text-success" />
                  <p className="font-medium text-foreground">{file.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {(file.size / 1024).toFixed(1)} KB
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  <Upload className="w-12 h-12 mx-auto text-muted-foreground" />
                  <p className="font-medium text-foreground">
                    Arrastra tu archivo aquí o haz clic para seleccionar
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Formatos soportados: CSV, Excel (.xlsx, .xls)
                  </p>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div>
                <p className="font-medium text-sm">¿No tienes un archivo?</p>
                <p className="text-sm text-muted-foreground">
                  Descarga nuestra plantilla con el formato correcto
                </p>
              </div>
              <Button variant="outline" onClick={downloadTemplate}>
                <Download className="w-4 h-4 mr-2" />
                Descargar Plantilla
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Mapping */}
        {step === 'mapping' && (
          <div className="space-y-6">
            <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
              <p className="text-sm">
                <strong>Archivo cargado:</strong> {file?.name} ({csvData.length} filas encontradas)
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Mapea las columnas de tu archivo con los campos requeridos
              </p>
            </div>

            <div className="space-y-3">
              {requiredFields.map((field) => (
                <div key={field.field} className="flex items-center gap-4">
                  <div className="w-48 flex items-center gap-2">
                    <Label className="text-sm">
                      {field.label}
                      {field.required && <span className="text-destructive ml-1">*</span>}
                    </Label>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground" />
                  <Select
                    value={mapping[field.field] || ''}
                    onValueChange={(v) => handleMappingChange(field.field, v)}
                  >
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Seleccionar columna" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Sin mapear</SelectItem>
                      {csvHeaders.map((header) => (
                        <SelectItem key={header} value={header}>
                          {header}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {mapping[field.field] && (
                    <Check className="w-4 h-4 text-success" />
                  )}
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <AlertCircle className="w-4 h-4" />
              <span>
                {mappedFieldsCount} de {requiredFields.length} columnas mapeadas 
                ({requiredMappedCount} de {requiredFields.filter(f => f.required).length} requeridas)
              </span>
            </div>
          </div>
        )}

        {/* Step 3: Preview */}
        {step === 'preview' && (
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="border-success/50 bg-success/10 text-success">
                <Check className="w-3 h-3 mr-1" />
                {validCount} válidos
              </Badge>
              {errorCount > 0 && (
                <Badge variant="outline" className="border-destructive/50 bg-destructive/10 text-destructive">
                  <X className="w-3 h-3 mr-1" />
                  {errorCount} con errores
                </Badge>
              )}
            </div>

            <div className="border border-border rounded-lg overflow-hidden max-h-80 overflow-y-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">Estado</TableHead>
                    {requiredFields.slice(0, 4).map((field) => (
                      <TableHead key={field.field}>{field.label}</TableHead>
                    ))}
                    {requiredFields.length > 4 && (
                      <TableHead>+{requiredFields.length - 4} más</TableHead>
                    )}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {previewData.slice(0, 10).map((row, index) => (
                    <TableRow key={index} className={!row.isValid ? 'bg-destructive/5' : ''}>
                      <TableCell>
                        {row.isValid ? (
                          <Check className="w-4 h-4 text-success" />
                        ) : (
                          <X className="w-4 h-4 text-destructive" />
                        )}
                      </TableCell>
                      {requiredFields.slice(0, 4).map((field) => (
                        <TableCell key={field.field} className="max-w-32 truncate">
                          {row.data[field.field] || '-'}
                        </TableCell>
                      ))}
                      {requiredFields.length > 4 && (
                        <TableCell className="text-muted-foreground text-sm">...</TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {previewData.length > 10 && (
              <p className="text-sm text-muted-foreground">
                Mostrando 10 de {previewData.length} registros
              </p>
            )}

            {errorCount > 0 && (
              <div className="p-4 bg-destructive/5 rounded-lg border border-destructive/20">
                <p className="text-sm font-medium text-destructive mb-2">
                  Errores encontrados:
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {previewData
                    .filter(r => !r.isValid)
                    .slice(0, 3)
                    .map((r, i) => (
                      <li key={i}>• Fila {i + 1}: {r.errors.join(', ')}</li>
                    ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Step 4: Complete */}
        {step === 'complete' && (
          <div className="text-center py-8">
            <CheckCircle2 className="w-16 h-16 mx-auto text-success mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              ¡Importación completada!
            </h3>
            <p className="text-muted-foreground mb-4">
              Se importaron {validCount} registros exitosamente
            </p>
            {errorCount > 0 && (
              <p className="text-sm text-muted-foreground">
                {errorCount} registros fueron omitidos por errores
              </p>
            )}
          </div>
        )}

        <DialogFooter className="gap-2">
          {step !== 'complete' && (
            <Button variant="outline" onClick={handleClose}>
              Cancelar
            </Button>
          )}
          
          {step === 'mapping' && (
            <>
              <Button variant="outline" onClick={() => setStep('upload')}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Atrás
              </Button>
              <Button 
                onClick={validateAndPreview}
                disabled={!allRequiredMapped}
              >
                Continuar
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </>
          )}

          {step === 'preview' && (
            <>
              <Button variant="outline" onClick={() => setStep('mapping')}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Atrás
              </Button>
              <Button 
                onClick={handleImport}
                disabled={validCount === 0}
              >
                Importar {validCount} registros
              </Button>
            </>
          )}

          {step === 'complete' && (
            <Button onClick={handleClose}>
              Cerrar
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
