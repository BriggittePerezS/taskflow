import { useState } from 'react';
import { useTasks } from './hooks/useTasks';
import TaskForm from './components/TaskForm';
import TaskItem from './components/TaskItem';
import Dashboard from './components/Dashboard';
import { Search, Terminal, ShieldCheck, Trash2 } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

function App() {
  const { tasks, addTask, deleteTask, updateStatus, updateTask, clearCompleted } = useTasks();
  
  // Estados para los filtros en español
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<'todas' | 'pendiente' | 'en-progreso' | 'completada'>('todas');

  // Lógica de filtrado inteligente (Buscador + Estado)
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = 
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      task.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'todas' || task.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-[#030712] text-gray-100 p-6 md:p-12 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Enterprise con Badge de Sincronización */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-teal-500 p-2 rounded-xl shadow-lg shadow-teal-500/20">
              <Terminal size={24} className="text-gray-900" />
            </div>
            <div>
              <h1 className="text-2xl font-black italic tracking-tighter uppercase">
                TaskFlow <span className="text-teal-500">Enterprise</span>
              </h1>
              <div className="flex items-center gap-2 text-[10px] text-gray-500 font-mono tracking-widest uppercase">
                <ShieldCheck size={12} className="text-teal-500" /> Conexión Segura Activa
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3 bg-teal-500/5 border border-teal-500/10 px-4 py-2 rounded-2xl">
            <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-black text-teal-500 uppercase tracking-[0.2em]">Sync LocalStorage OK</span>
          </div>
        </header>

        {/* Dashboard de KPIs */}
        <Dashboard tasks={tasks} />

        <div className="grid lg:grid-cols-3 gap-10">
          
          {/* Columna Izquierda: Formulario de Registro */}
          <div className="lg:col-span-1">
            <h2 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] mb-4 ml-2">
              Gestión de Entradas
            </h2>
            <TaskForm onAdd={addTask} />
          </div>

          {/* Columna Derecha: Panel de Control y Lista */}
          <div className="lg:col-span-2">
            <div className="bg-white/5 border border-white/10 p-6 rounded-[2.5rem] backdrop-blur-md shadow-2xl">
              
              {/* Controles de Filtrado */}
              <div className="flex flex-col gap-6 mb-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                  
                  {/* Pestañas de Estado */}
                  <div className="flex p-1 bg-black/40 rounded-xl border border-white/5 w-full md:w-auto overflow-x-auto">
                    {(['todas', 'pendiente', 'en-progreso', 'completada'] as const).map((status) => (
                      <button
                        key={status}
                        onClick={() => setFilterStatus(status)}
                        className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                          filterStatus === status 
                          ? 'bg-teal-500 text-black shadow-lg shadow-teal-500/20' 
                          : 'text-gray-500 hover:text-white'
                        }`}
                      >
                        {status === 'en-progreso' ? 'En Curso' : status}
                      </button>
                    ))}
                  </div>

                  {/* Buscador */}
                  <div className="relative w-full md:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" size={16} />
                    <input 
                      type="text"
                      placeholder="Buscar por título o nota..."
                      className="bg-black/40 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm text-white focus:border-teal-500 outline-none w-full transition-all"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>

                {/* Acciones Masivas */}
                <div className="flex justify-between items-center border-t border-white/5 pt-4 px-2">
                  <span className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">
                    Registros filtrados: {filteredTasks.length}
                  </span>
                  <button 
                    onClick={clearCompleted}
                    className="flex items-center gap-2 text-[10px] font-black text-red-400/80 hover:text-red-400 transition-colors uppercase tracking-[0.15em]"
                  >
                    <Trash2 size={12} /> Limpiar Finalizados
                  </button>
                </div>
              </div>

              {/* Lista de Tareas con Animación */}
              <div className="space-y-3 min-h-[300px]">
                <AnimatePresence mode="popLayout">
                  {filteredTasks.map(task => (
                    <TaskItem 
                      key={task.id} 
                      task={task} 
                      onToggle={() => {
                        // Ciclo de estados en español
                        const next = task.status === 'pendiente' ? 'en-progreso' : 
                                     task.status === 'en-progreso' ? 'completada' : 'pendiente';
                        updateStatus(task.id, next);
                      }} 
                      onDelete={deleteTask}
                      onEdit={updateTask}
                    />
                  ))}
                </AnimatePresence>

                {/* Estado vacío */}
                {filteredTasks.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-white/5 rounded-[2rem] opacity-40">
                    <p className="text-sm font-mono tracking-tighter">_SISTEMA_SIN_DATOS_</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;