// src/types/index.ts

// Definimos los niveles de urgencia permitidos
export type Priority = 'baja' | 'media' | 'alta';

// Definimos los estados del flujo de trabajo en español
export type TaskStatus = 'pendiente' | 'en-progreso' | 'completada';

// Esta es la estructura principal de cada proyecto/tarea
export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: Priority;
  createdAt: string;
  
  // 👉 CAMPOS NUEVOS (Obligatorios para que el Dashboard funcione)
  startDate: string;  // Fecha de inicio (YYYY-MM-DD)
  endDate: string;    // Fecha de entrega (YYYY-MM-DD)
  assignee: string;   // Nombre del responsable
}