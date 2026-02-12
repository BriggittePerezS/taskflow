export type Priority = 'baja' | 'media' | 'alta';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pendiente' | 'en-progreso' | 'completada';
  priority: Priority; 
  createdAt: string;
}