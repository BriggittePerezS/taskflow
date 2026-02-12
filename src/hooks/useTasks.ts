import { useState, useEffect } from 'react';
import type { Task, Priority } from '../types/index';

export const useTasks = () => {
  // Inicializamos intentando leer de LocalStorage directamente
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('taskflow_enterprise_v3');
    return saved ? JSON.parse(saved) : [];
  });

  // Guardar cada vez que la lista de tareas cambie
  useEffect(() => {
    localStorage.setItem('taskflow_enterprise_v3', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (title: string, description: string, priority: Priority) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      description,
      priority,
      status: 'pending',
      createdAt: new Date().toLocaleDateString(),
    };
    setTasks([newTask, ...tasks]);
  };

  const updateTask = (id: string, newTitle: string, newDesc: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, title: newTitle, description: newDesc } : t));
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const updateStatus = (id: string, status: Task['status']) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, status } : t));
  };

  const clearCompleted = () => {
    setTasks(prev => prev.filter(t => t.status !== 'completed'));
  };

  return { tasks, addTask, deleteTask, updateStatus, updateTask, clearCompleted };
};