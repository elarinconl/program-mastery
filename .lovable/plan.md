
# Plan: Carga Batch Integrada en Secciones Educativas

## Resumen
Integrar la funcionalidad de carga masiva (batch upload) directamente dentro de cada sección de contenido educativo (Fases, Rutas, Programas, Clases), ocultar el menú "Batch Upload" del sidebar del superadmin, y habilitar la carga batch para Rúbricas y Exámenes Finales dentro de los programas.

---

## Cambios Principales

### 1. Actualizar Sidebar del Superadmin
**Archivo:** `src/components/layout/Sidebar.tsx`

- Eliminar el item "Batch Upload" de la navegación `superadminNavItems`
- Mantener la ruta `/organizaciones` en la sección "HERRAMIENTAS" (sin batch upload)

### 2. Crear Componente Reutilizable de Batch Upload
**Nuevo archivo:** `src/components/education/BatchUploadDialog.tsx`

Componente de diálogo modal reutilizable con el wizard de 4 pasos:
- **Props:** `contentType` (fases/rutas/programas/clases/rubricas/examenes), `onComplete`
- **Funcionalidades:**
  - Selector de tipo de contenido (según contexto)
  - Upload de archivo (CSV/Excel)
  - Mapeo de columnas dinámico según el tipo
  - Previsualización con validación de errores
  - Confirmación y resumen

### 3. Integrar Batch Upload en Fases
**Archivo:** `src/pages/FasesPage.tsx`

- Agregar botón "Carga Masiva" junto al botón "Nueva Fase"
- El botón abre el `BatchUploadDialog` preconfigurado para fases
- Columnas mapeables: nombre, nombreEn, descripcion, orden, estado

### 4. Integrar Batch Upload en Rutas
**Archivo:** `src/pages/RutasPage.tsx`

- Agregar botón "Carga Masiva" junto al botón "Nueva Ruta"
- El botón abre el `BatchUploadDialog` preconfigurado para rutas
- Columnas mapeables: nombre, nombreEn, fase, tier, estado

### 5. Integrar Batch Upload en Programas
**Archivo:** `src/pages/ProgramasPage.tsx`

- Agregar botón "Carga Masiva" junto al botón "Nuevo Programa"
- El botón abre el `BatchUploadDialog` preconfigurado para programas
- Columnas mapeables: nombre, nombreEn, ruta, tier, duracion, estado

### 6. Integrar Batch Upload en Clases
**Archivo:** `src/pages/ClasesPage.tsx`

- Agregar botón "Carga Masiva" junto a los botones existentes
- El botón abre el `BatchUploadDialog` preconfigurado para clases
- Columnas mapeables: nombre, nombreEn, tipo, programa, modulo, esActividad, duracion

### 7. Batch Upload para Rúbricas en Detalle de Programa
**Archivo:** `src/pages/ProgramaDetailPage.tsx`

En la pestaña "Rúbrica":
- Agregar botón "Importar Rúbrica" que abre `BatchUploadDialog` para rúbricas
- Columnas mapeables: competencia, peso, nivel1Descripcion, nivel1Puntos, nivel2Descripcion, nivel2Puntos, nivel3Descripcion, nivel3Puntos, nivel4Descripcion, nivel4Puntos
- Al importar, reemplaza o agrega competencias a la rúbrica actual

### 8. Batch Upload para Examen Final en Detalle de Programa
**Archivo:** `src/pages/ProgramaDetailPage.tsx`

En la pestaña "Evaluación Final":
- Agregar botón "Importar Configuración" que abre `BatchUploadDialog` para exámenes
- Permite cargar múltiples configuraciones de examen para diferentes programas
- Columnas mapeables: objetivo, instrucciones, formatoEntrega, umbralAprobacion

### 9. Actualizar Instructor Program Detail
**Archivo:** `src/pages/instructor/InstructorProgramaDetail.tsx`

- Agregar los mismos botones de batch upload para rúbrica y examen final
- El instructor puede importar configuraciones para sus programas asignados

---

## Flujo Visual

```text
┌─────────────────────────────────────────────────────────────┐
│  Página de Fases/Rutas/Programas/Clases                     │
├─────────────────────────────────────────────────────────────┤
│  [Nueva Fase] [📥 Carga Masiva] [🔽 Descargar Plantilla]   │
│                                                              │
│  Al hacer clic en "Carga Masiva":                           │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Dialog: Batch Upload Wizard                          │ │
│  │  ├── Paso 1: Subir archivo (CSV/Excel)               │ │
│  │  ├── Paso 2: Mapear columnas                          │ │
│  │  ├── Paso 3: Previsualizar y validar                 │ │
│  │  └── Paso 4: Confirmar importación                    │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

```text
┌─────────────────────────────────────────────────────────────┐
│  Detalle de Programa > Pestaña Rúbrica                      │
├─────────────────────────────────────────────────────────────┤
│  [Configurar Rúbrica] [📥 Importar Rúbrica]                │
│                                                              │
│  Al hacer clic en "Importar Rúbrica":                       │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Dialog: Importar Competencias                         │ │
│  │  Formato esperado:                                      │ │
│  │  competencia | peso | nivel1_desc | nivel1_pts | ...   │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

---

## Detalles Técnicos

### Estructura del BatchUploadDialog

```text
BatchUploadDialog
├── Props
│   ├── contentType: 'fases' | 'rutas' | 'programas' | 'clases' | 'rubricas' | 'examenes'
│   ├── programId?: string (para rúbricas/exámenes)
│   ├── onComplete: (data) => void
│   └── trigger: ReactNode (botón que abre el dialog)
├── Estado interno
│   ├── step: 'upload' | 'mapping' | 'preview' | 'complete'
│   ├── file: File | null
│   ├── mapping: Record<string, string>
│   └── previewData: PreviewRow[]
└── Mapeos dinámicos según contentType
    ├── fases: [nombre, nombreEn, descripcion, orden, estado]
    ├── rutas: [nombre, nombreEn, fase, tier, estado]
    ├── programas: [nombre, nombreEn, ruta, tier, duracion, estado]
    ├── clases: [nombre, nombreEn, tipo, programa, modulo, esActividad, duracion]
    ├── rubricas: [competencia, peso, nivel1-4 con desc y puntos]
    └── examenes: [objetivo, instrucciones, formatoEntrega, umbralAprobacion]
```

### Archivos a Crear
1. `src/components/education/BatchUploadDialog.tsx` - Componente reutilizable

### Archivos a Modificar
1. `src/components/layout/Sidebar.tsx` - Ocultar Batch Upload del menú
2. `src/pages/FasesPage.tsx` - Agregar botón de carga masiva
3. `src/pages/RutasPage.tsx` - Agregar botón de carga masiva
4. `src/pages/ProgramasPage.tsx` - Agregar botón de carga masiva
5. `src/pages/ClasesPage.tsx` - Agregar botón de carga masiva
6. `src/pages/ProgramaDetailPage.tsx` - Agregar imports de rúbrica y examen
7. `src/pages/instructor/InstructorProgramaDetail.tsx` - Agregar imports de rúbrica y examen

### Archivo a Eliminar (opcional)
- `src/pages/BatchUploadPage.tsx` - Ya no es necesario como página independiente (se puede mantener para referencia)

---

## Orden de Implementación

1. Crear `BatchUploadDialog.tsx` con toda la lógica del wizard
2. Actualizar `Sidebar.tsx` para ocultar el menú
3. Integrar en `FasesPage.tsx`
4. Integrar en `RutasPage.tsx`
5. Integrar en `ProgramasPage.tsx`
6. Integrar en `ClasesPage.tsx`
7. Integrar en `ProgramaDetailPage.tsx` (rúbrica + examen)
8. Integrar en `InstructorProgramaDetail.tsx` (rúbrica + examen)
9. Actualizar rutas en `App.tsx` si es necesario
