export type TaskStatus = "pending" | "completed";
export type TaskPriority = "low" | "medium" | "high";

export interface Task {
  id: string;
  title: string;

  // 👤 Responsable
  assignee: string;

  // 📅 Fechas
  startDate: string; // ISO string
  endDate: string;   // ISO string

  // 📊 Estado y prioridad
  status: TaskStatus;
  priority: TaskPriority;

  // 🔁 Compatibilidad con lo anterior
  completed: boolean;
}
