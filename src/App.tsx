import { useState } from "react";
import { useTasks } from "./hooks/useTasks";
import type { Task } from "./types/task";

type Filter = "all" | "active" | "completed";

function App() {
  const { tasks, addTask, toggleTask, deleteTask, updateTask } = useTasks();

  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState("");

  // 🔢 CONTADORES
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  // 🔍 FILTRO + ORDEN PROFESIONAL
  const filteredTasks = tasks
    .filter(task => {
      if (filter === "active") return !task.completed;
      if (filter === "completed") return task.completed;
      return true;
    })
    .sort((a, b) => {
      // 1️⃣ Pendientes arriba
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1;
      }
      // 2️⃣ Orden alfabético
      return a.title.localeCompare(b.title);
    });

  const handleAddTask = () => {
    if (!newTask.trim()) return;
    addTask(newTask);
    setNewTask("");
  };

  const handleEditSave = (task: Task) => {
    updateTask(task.id, editingTitle);
    setEditingId(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 p-6">
      <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-extrabold text-blue-700 mb-6 text-center tracking-tight">
          Gestor de Tareas
        </h1>

        {/* 🔢 CONTADOR */}
      <div className="flex justify-center gap-6 text-sm text-gray-600 mb-8">
        <span className="bg-gray-100 px-3 py-1 rounded-full">
        Total: {totalTasks}
        </span>
        <span className="bg-yellow-100 px-3 py-1 rounded-full">
        Pendientes: {pendingTasks}
        </span>
        <span className="bg-green-100 px-3 py-1 rounded-full">
        Completadas: {completedTasks}
        </span>
      </div>


        {/* ➕ AÑADIR */}
        <div className="flex gap-2 mb-4">
          <input
            value={newTask}
            onChange={e => setNewTask(e.target.value)}
            placeholder="Nueva tarea..."
            className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleAddTask}
            className="bg-blue-600 hover:bg-blue-700 transition text-white px-5 rounded-lg font-medium"
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
              className={`px-3 py-1 rounded ${
                filter === f ? "bg-blue-600 text-white" : "bg-gray-200"
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

        {/* 📋 LISTA */}
        <ul className="space-y-3">
          {filteredTasks.map(task => (
            <li
              key={task.id}
              className="flex justify-between items-center bg-gray-50 p-4 rounded-xl hover:shadow transition"
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
                      ? "line-through text-gray-400 transition-all"

                      : ""
                  }`}
                >
                  {task.title}
                </span>
              )}

              <button
                onClick={() => deleteTask(task.id)}
                className="ml-3 text-red-500 font-bold hover:scale-110 transition"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
