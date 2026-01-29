import { useEffect, useState } from "react";
import type { Task } from "../types/task";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const stored = localStorage.getItem("tasks");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (title: string) => {
    if (!title.trim()) return;

    const newTask: Task = {
      id: Date.now().toString(),
      title,
      completed: false,
    };

    setTasks(prev => [...prev, newTask]);
  };

  const toggleTask = (id: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const updateTask = (id: string, newTitle: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, title: newTitle } : task
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
