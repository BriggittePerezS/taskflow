import { useEffect, useState } from "react";
import type { Task } from "../types/task";

const STORAGE_KEY = "tasks";

function getDefaultTask(title: string): Task {
  const today = new Date().toISOString().split("T")[0];

  return {
    id: Date.now().toString(),
    title,

    assignee: "Sin asignar",
    startDate: today,
    endDate: today,

    status: "pending",
    priority: "medium",

    // 👈 compatibilidad total
    completed: false,
  };
}

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];

    try {
      const parsed: Task[] = JSON.parse(stored);

      // 🛡️ Normalizar tareas viejas
      return parsed.map(task => ({
        ...getDefaultTask(task.title),
        ...task,
        completed: task.completed ?? false,
        status: task.completed ? "completed" : "pending",
      }));
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (title: string) => {
    if (!title.trim()) return;
    setTasks(prev => [...prev, getDefaultTask(title)]);
  };

  const toggleTask = (id: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
              status: task.completed ? "pending" : "completed",
            }
          : task
      )
    );
  };

 const updateTask = (id: string, field: string, value: string) => {
  setTasks(prev =>
    prev.map(task =>
      task.id === id
        ? { ...task, [field]: value }
        : task
    )
  );
};


  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  return {
    tasks,
    addTask,
    toggleTask,
    updateTask,
    deleteTask,
  };
}
