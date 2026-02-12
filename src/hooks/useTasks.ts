import { useState, useEffect } from 'react';
import type { Task, Priority } from '../types/index';

export const useTasks = () => {
  // 1. Inicialización inteligente con LocalStorage
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const saved = localStorage.getItem('taskflow_enterprise_v3');
      // Si hay datos los parseamos, si no, empezamos con una lista vacía
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Error al recuperar datos de LocalStorage:", error);
      return [];
    }
  });

  // 2. Persistencia: Guardar en LocalStorage cada vez que cambie la lista de tareas
  useEffect(() => {
    localStorage.setItem('taskflow_enterprise_v3', JSON.stringify(tasks));
  }, [tasks]);

  /**
   * 3. Función para añadir una nueva tarea con todos los campos Enterprise.
   * Esta firma es única porque separa la metadata del contenido.
   */
  const addTask = (
    title: string, 
    description: string, 
    priority: Priority, 
    startDate: string, 
    endDate: string, 
    assignee: string
  ) => {
    const newTask: Task = {
      id: crypto.randomUUID(), // Genera un ID único e irrepetible
      title,
      description,
      priority,
      status: 'pendiente', // Estado inicial por defecto
      createdAt: new Date().toLocaleDateString(),
      startDate,
      endDate,
      assignee
    };
    
    // Añadimos la nueva tarea al principio de la lista
    setTasks(prev => [newTask, ...prev]);
  };

  /**
   * 4. Actualización de Estado (Ciclo de vida del proyecto)
   */
  const updateStatus = (id: string, status: Task['status']) => {
    setTasks(prev => prev.map(t => 
      t.id === id ? { ...t, status } : t
    ));
  };

  /**
   * 5. Edición Flexible: Permite actualizar cualquier campo (título, fechas, etc.)
   * Usamos Partial<Task> para poder enviar solo lo que queremos cambiar.
   */
  const updateTask = (id: string, updatedFields: Partial<Task>) => {
    setTasks(prev => prev.map(t => 
      t.id === id ? { ...t, ...updatedFields } : t
    ));
  };

  /**
   * 6. Eliminación de registros
   */
  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  /**
   * 7. Mantenimiento: Limpiar proyectos finalizados
   */
  const clearCompleted = () => {
    setTasks(prev => prev.filter(t => t.status !== 'completada'));
  };

  return { 
    tasks, 
    addTask, 
    deleteTask, 
    updateStatus, 
    updateTask, 
    clearCompleted 
  };
};