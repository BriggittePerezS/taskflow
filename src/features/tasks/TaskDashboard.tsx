import { useState } from "react";
import { useTasks } from "../../hooks/useTasks";
import type { Task } from "../../types/task";

type Filter = "all" | "active" | "completed";

export default function TaskDashboard() {
  const { tasks, addTask, toggleTask, deleteTask, updateTask } = useTasks();

  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState("");

  // 📊 CONTADORES
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  // 🔍 FILTRO + ORDEN
  const filteredTasks = tasks
    .filter(task => {
      if (filter === "active") return !task.completed;
      if (filter === "completed") return task.completed;
      return true;
    })
    .sort((a, b) => {
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1;
      }
      return a.title.localeCompare(b.title);
    });

  const handleAddTask = () => {
    if (!newTask.trim()) return;
    addTask(newTask);
    setNewTask("");
  };

  const handleEditSave = (task: Task) => {
    if (!editingTitle.trim()) return;
    updateTask(task.id, editingTitle);
    setEditingId(null);
  };

  return (
    <main className="flex-1 bg-gray-50 py-10 px-4">
      <div className="w-full max-w-xl mx-auto bg-white rounded-xl shadow-md p-4 sm:p-6">
        
        {/* 📊 RESUMEN */}
        <div className="flex justify-between text-sm text-gray-600 mb-6">
          <span>Total: {totalTasks}</span>
          <span>Pendientes: {pendingTasks}</span>
          <span>Completadas: {completedTasks}</span>
        </div>

        {/* ➕ AÑADIR TAREA */}
        <div className="flex flex-col sm:flex-row gap-2 mb-4">
          <input
            value={newTask}
            onChange={e => setNewTask(e.target.value)}
            placeholder="Añadir nueva tarea..."
            className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleAddTask}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
          >
            Añadir
          </button>
        </div>

        {/* 🔘 FILTROS */}
        <div className="flex justify-center gap-3 mb-6">
          {["all", "active", "completed"].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f as Filter)}
              className={`px-3 py-1 rounded-full text-sm transition ${
                filter === f
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {f === "all"
                ? "Todas"
                : f === "active"
                ? "Pendientes"
                : "Completadas"}
            </button>
          ))}
        </div>

        {/* 📋 LISTA DE TAREAS */}
        <ul className="space-y-3">
          {filteredTasks.map(task => (
            <li
              key={task.id}
              className="flex items-center justify-between bg-gray-50 border rounded-lg px-3 py-2"
            >
              {editingId === task.id ? (
                <input
                  value={editingTitle}
                  onChange={e => setEditingTitle(e.target.value)}
                  onBlur={() => handleEditSave(task)}
                  onKeyDown={e => e.key === "Enter" && handleEditSave(task)}
                  autoFocus
                  className="flex-1 border px-2 py-1 rounded"
                />
              ) : (
                <span
                  onDoubleClick={() => {
                    setEditingId(task.id);
                    setEditingTitle(task.title);
                  }}
                  onClick={() => toggleTask(task.id)}
                  className={`flex-1 cursor-pointer select-none ${
                    task.completed
                      ? "line-through text-gray-400"
                      : "text-gray-800"
                  }`}
                >
                  {task.title}
                </span>
              )}

              <button
                onClick={() => deleteTask(task.id)}
                className="ml-3 text-red-500 hover:text-red-700 font-bold"
                aria-label="Eliminar tarea"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>

        {/* 📭 EMPTY STATE */}
        {filteredTasks.length === 0 && (
          <p className="text-center text-gray-400 mt-6 text-sm">
            No hay tareas para mostrar
          </p>
        )}
      </div>
    </main>
  );
}
