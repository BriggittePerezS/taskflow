import React from 'react';
import TaskForm from '../../components/TaskForm';
import TaskItem from '../../components/TaskItem';
import Dashboard from '../../components/Dashboard';
import { useTasks } from '../../hooks/useTasks';
import { Calendar as CalendarIcon, List, LayoutDashboard } from 'lucide-react';
// Importamos el calendario que configuramos
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

export default function TaskDashboard() {
  const { tasks, addTask, deleteTask, updateStatus, updateTask } = useTasks();
  const [view, setView] = React.useState<'list' | 'calendar' | 'dashboard'>('dashboard');

  // Mapeamos las tareas para el calendario
  const calendarEvents = tasks.map(task => ({
    title: task.title,
    start: task.startDate,
    end: task.endDate,
    backgroundColor: task.priority === 'alta' ? '#ef4444' : task.priority === 'media' ? '#eab308' : '#14b8a6',
    borderColor: 'transparent'
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header con Tabs */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
        <div>
          <h1 className="text-4xl font-black italic tracking-tighter text-white">
            TASKFLOW <span className="text-teal-500 underline decoration-2 underline-offset-8">ENTERPRISE</span>
          </h1>
          <p className="text-gray-500 text-sm mt-2 font-medium">Panel de Control Operativo v3.0</p>
        </div>

        <div className="flex bg-white/5 p-1.5 rounded-2xl border border-white/10 backdrop-blur-md">
          <button 
            onClick={() => setView('dashboard')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black transition-all ${view === 'dashboard' ? 'bg-teal-500 text-black shadow-lg shadow-teal-500/20' : 'text-gray-400 hover:text-white'}`}
          >
            <LayoutDashboard size={14} /> DASHBOARD
          </button>
          <button 
            onClick={() => setView('list')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black transition-all ${view === 'list' ? 'bg-teal-500 text-black shadow-lg shadow-teal-500/20' : 'text-gray-400 hover:text-white'}`}
          >
            <List size={14} /> PROYECTOS
          </button>
          <button 
            onClick={() => setView('calendar')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black transition-all ${view === 'calendar' ? 'bg-teal-500 text-black shadow-lg shadow-teal-500/20' : 'text-gray-400 hover:text-white'}`}
          >
            <CalendarIcon size={14} /> CALENDARIO
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Columna Izquierda: Formulario */}
        <div className="lg:col-span-4">
          <TaskForm onAdd={addTask} />
        </div>

        {/* Columna Derecha: Contenido Dinámico */}
        <div className="lg:col-span-8">
          {view === 'dashboard' && <Dashboard tasks={tasks} />}

          {view === 'list' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tasks.length === 0 ? (
                <div className="col-span-full py-20 text-center bg-white/5 rounded-[3rem] border border-dashed border-white/10">
                  <p className="text-gray-500 font-bold italic">No hay proyectos activos en el sistema.</p>
                </div>
              ) : (
                tasks.map(task => (
                  <TaskItem 
                    key={task.id} 
                    task={task} 
                    onDelete={deleteTask}
                    onToggle={(id) => {
                      const newStatus = task.status === 'completada' ? 'pendiente' : 'completada';
                      updateStatus(id, newStatus);
                    }}
                    onEdit={(id, fields) => updateTask(id, fields)}
                  />
                ))
              )}
            </div>
          )}

          {view === 'calendar' && (
            <div className="bg-white/5 p-6 rounded-[2.5rem] border border-white/10 backdrop-blur-md overflow-hidden text-white calendar-custom">
              <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                events={calendarEvents}
                locale="es"
                height="600px"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}