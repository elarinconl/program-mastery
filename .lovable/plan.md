

# Plan: Agregar Métricas de Programa (sin quitar las existentes)

## Resumen
Agregar las 4 nuevas métricas (Engagement Rate, Completion Rate, Approbation Rate, Average Grade) **sumándolas** a las métricas ya existentes (Estudiantes, Evaluaciones Pendientes, Comentarios Abiertos, Avance Promedio).

## Cambios por archivo

### 1. Detalle del Programa - Instructor (`InstructorProgramaDetail.tsx`)
- Agregar una **segunda fila de 4 Cards** encima de las 3 cards existentes con:
  - Engagement Rate (icono TrendingUp, color primary)
  - Completion Rate (icono CheckCircle, color success)
  - Approbation Rate (icono Award, color warning)
  - Average Grade (icono BarChart3, color blue)
- Las 3 cards actuales (Estudiantes, Evaluaciones Pendientes, Comentarios) se mantienen intactas debajo
- Agregar mock data para las 4 métricas

### 2. Detalle del Programa - Superadmin (`SuperAdminProgramaDetail.tsx`)
- Misma estructura: fila de 4 nuevas cards + las 3 cards existentes debajo
- Se mantiene la card de instructor asignado y todo lo demás

### 3. Tabla de Programas - Instructor (`InstructorProgramasPage.tsx`)
- Agregar 4 columnas nuevas a la tabla: `Engagement`, `Completion`, `Approbation`, `Nota Prom.`
- Se **mantiene** la columna "Avance Prom." existente
- Agregar los valores al mock data

### 4. Tabla de Programas - Superadmin (`SuperAdminProgramasPage.tsx`)
- Mismas 4 columnas nuevas agregadas a la tabla
- Se mantiene "Avance Prom." y todas las columnas existentes

### 5. Dashboard (`InstructorDashboard.tsx`)
- Agregar una sección "Métricas Globales" con las 4 métricas agregadas (promedio de todos los programas) como una fila de 4 stat-cards
- Se mantienen las 4 stat-cards actuales (Programas, Evaluaciones, Comentarios, Estudiantes) y las secciones de pendientes

## Archivos a modificar
1. `src/pages/instructor/InstructorProgramaDetail.tsx`
2. `src/pages/superadmin/SuperAdminProgramaDetail.tsx`
3. `src/pages/instructor/InstructorProgramasPage.tsx`
4. `src/pages/superadmin/SuperAdminProgramasPage.tsx`
5. `src/pages/instructor/InstructorDashboard.tsx`

