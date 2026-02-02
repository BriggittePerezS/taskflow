import { useState } from "react";
import { useTasks } from "../../hooks/useTasks";
import { motion, AnimatePresence } from "framer-motion";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

export default function TaskDashboard() {
  const {
    tasks,
    addTask,
    toggleTask,
    deleteTask,
    updateTask,
  } = useTasks();

  const [newTask, setNewTask] = useState("");
  const [search, setSearch] = useState("");

  // 👉 filtro lateral: todas | pending | completed
  const [statusFilter, setStatusFilter] = useState<
    "all" | "pending" | "completed"
  >("all");

  // 👉 edición inline
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editingField, setEditingField] = useState<string | null>(null);

  const handleAddTask = () => {
    if (!newTask.trim()) return;
    addTask(newTask);
    setNewTask("");
  };

  // 🔢 CONTADORES
  const pendingCount = tasks.filter(t => !t.completed).length;
  const completedCount = tasks.filter(t => t.completed).length;

  // 🔍 FILTRO GLOBAL + FILTRO POR ESTADO
  const filteredTasks = tasks.filter(task => {
    if (statusFilter === "pending" && task.completed) return false;
    if (statusFilter === "completed" && !task.completed) return false;

    const text = `
      ${task.title}
      ${task.assignee}
      ${task.priority}
      ${task.completed ? "completada" : "pendiente"}
      ${task.startDate}
      ${task.endDate}
    `.toLowerCase();

    return text.includes(search.toLowerCase());
  });

  const isEditing = (id: string, field: string) =>
    editingTaskId === id && editingField === field;

  // 📅 eventos para calendario (NO rompe nada)
  const calendarEvents = tasks
    .filter(task => task.startDate)
    .map(task => ({
      title: task.title,
      start: task.startDate,
      end: task.endDate || task.startDate,
    }));

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* ⬅️ SIDEBAR DESKTOP */}
      <aside className="hidden md:flex w-64 bg-white border-r px-4 py-6 flex-col gap-6">
        <h3 className="text-lg font-bold text-gray-800">
          Resumen
        </h3>

        <div className="space-y-2">
          <button
            onClick={() => setStatusFilter("all")}
            className={`w-full flex justify-between items-center px-3 py-2 rounded-lg text-sm ${
              statusFilter === "all"
                ? "bg-gray-200 font-semibold"
                : "hover:bg-gray-100"
            }`}
          >
            <span>Todas</span>
            <span>{tasks.length}</span>
          </button>

          <button
            onClick={() => setStatusFilter("pending")}
            className={`w-full flex justify-between items-center px-3 py-2 rounded-lg text-sm ${
              statusFilter === "pending"
                ? "bg-blue-100 text-blue-700 font-semibold"
                : "hover:bg-gray-100"
            }`}
          >
            <span>Pendientes</span>
            <span>{pendingCount}</span>
          </button>

          <button
            onClick={() => setStatusFilter("completed")}
            className={`w-full flex justify-between items-center px-3 py-2 rounded-lg text-sm ${
              statusFilter === "completed"
                ? "bg-green-100 text-green-700 font-semibold"
                : "hover:bg-gray-100"
            }`}
          >
            <span>Completadas</span>
            <span>{completedCount}</span>
          </button>
        </div>

        {/* 📅 CALENDARIO REAL */}
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-2">
            Calendario
          </h4>

          <div className="bg-white rounded-lg border p-2 overflow-hidden">
            <FullCalendar
              plugins={[dayGridPlugin]}
              initialView="dayGridMonth"
              height="auto"
              events={calendarEvents}
              headerToolbar={{
                left: "prev,next",
                center: "title",
                right: "",
              }}
            />
          </div>
        </div>
      </aside>

      {/* 👉 CONTENIDO */}
      <motion.main
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex-1 px-4 py-6"
      >
        <div className="max-w-7xl mx-auto">
          {/* HEADER */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-2xl font-bold text-gray-800 text-left">
              Panel de tareas
            </h2>

            <div className="flex flex-col sm:flex-row gap-2">
              <input
                value={newTask}
                onChange={e => setNewTask(e.target.value)}
                placeholder="Nueva tarea..."
                className="border rounded-lg px-3 py-2 w-full sm:w-56 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button
                onClick={handleAddTask}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Añadir
              </button>
            </div>
          </div>

          {/* 🔍 BUSCADOR */}
          <div className="mb-6">
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Buscar por tarea, responsable, prioridad, estado..."
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* 📱 MOBILE CARDS */}
          <div className="space-y-4 sm:hidden">
            <AnimatePresence>
              {filteredTasks.map(task => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white rounded-xl shadow p-4 space-y-2"
                >
                  <h3 className="font-semibold">{task.title}</h3>
                  <p className="text-sm">Responsable: {task.assignee}</p>
                  <p className="text-sm">Inicio: {task.startDate}</p>
                  <p className="text-sm">Fin: {task.endDate}</p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* 🖥️ TABLA DESKTOP */}
          <div className="hidden sm:block bg-white rounded-xl shadow overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="px-4 py-3 text-left">Tarea</th>
                  <th className="px-4 py-3 text-left">Responsable</th>
                  <th className="px-4 py-3 text-left">Inicio</th>
                  <th className="px-4 py-3 text-left">Fin</th>
                  <th className="px-4 py-3 text-left">Estado</th>
                  <th className="px-4 py-3 text-left">Prioridad</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>

              <tbody>
                {filteredTasks.map(task => (
                  <tr
                    key={task.id}
                    className="border-t hover:bg-gray-50"
                  >
                    <td className="px-4 py-3 font-medium">
                      {task.title}
                    </td>

                    {/* RESPONSABLE */}
                    <td
                      className="px-4 py-3 cursor-pointer"
                      onClick={() => {
                        setEditingTaskId(task.id);
                        setEditingField("assignee");
                      }}
                    >
                      {isEditing(task.id, "assignee") ? (
                        <input
                          autoFocus
                          defaultValue={task.assignee}
                          onBlur={e => {
                            updateTask(
                              task.id,
                              "assignee",
                              e.target.value
                            );
                            setEditingTaskId(null);
                            setEditingField(null);
                          }}
                          className="border rounded px-2 py-1 w-full"
                        />
                      ) : (
                        task.assignee
                      )}
                    </td>

                    {/* INICIO */}
                    <td
                      className="px-4 py-3 cursor-pointer"
                      onClick={() => {
                        setEditingTaskId(task.id);
                        setEditingField("startDate");
                      }}
                    >
                      {isEditing(task.id, "startDate") ? (
                        <input
                          type="date"
                          autoFocus
                          defaultValue={task.startDate}
                          onBlur={e => {
                            updateTask(
                              task.id,
                              "startDate",
                              e.target.value
                            );
                            setEditingTaskId(null);
                            setEditingField(null);
                          }}
                          className="border rounded px-2 py-1"
                        />
                      ) : (
                        task.startDate
                      )}
                    </td>

                    {/* FIN */}
                    <td
                      className="px-4 py-3 cursor-pointer"
                      onClick={() => {
                        setEditingTaskId(task.id);
                        setEditingField("endDate");
                      }}
                    >
                      {isEditing(task.id, "endDate") ? (
                        <input
                          type="date"
                          autoFocus
                          defaultValue={task.endDate}
                          onBlur={e => {
                            updateTask(
                              task.id,
                              "endDate",
                              e.target.value
                            );
                            setEditingTaskId(null);
                            setEditingField(null);
                          }}
                          className="border rounded px-2 py-1"
                        />
                      ) : (
                        task.endDate
                      )}
                    </td>

                    {/* ESTADO */}
                    <td className="px-4 py-3">
                      <button
                        onClick={() => toggleTask(task.id)}
                        className={`px-2 py-1 rounded text-xs ${
                          task.completed
                            ? "bg-green-100 text-green-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {task.completed
                          ? "Completada"
                          : "Pendiente"}
                      </button>
                    </td>

                    {/* PRIORIDAD */}
                    <td
                      className="px-4 py-3 cursor-pointer capitalize"
                      onClick={() => {
                        setEditingTaskId(task.id);
                        setEditingField("priority");
                      }}
                    >
                      {isEditing(task.id, "priority") ? (
                        <select
                          autoFocus
                          defaultValue={task.priority}
                          onBlur={e => {
                            updateTask(
                              task.id,
                              "priority",
                              e.target.value
                            );
                            setEditingTaskId(null);
                            setEditingField(null);
                          }}
                          className="border rounded px-2 py-1"
                        >
                          <option value="baja">Baja</option>
                          <option value="media">Media</option>
                          <option value="alta">Alta</option>
                        </select>
                      ) : (
                        task.priority
                      )}
                    </td>

                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="text-red-500 font-bold"
                      >
                        ✕
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.main>
    </div>
  );
}
