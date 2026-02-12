import { motion } from 'framer-motion';
import { Trash2, User, Calendar, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import type { Task } from '../types/index';

interface Props {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  // onEdit está preparado para futuras expansiones
  onEdit: (id: string, updates: Partial<Task>) => void; 
}

export default function TaskItem({ task, onToggle, onDelete }: Props) {
  // Estilos dinámicos según la prioridad
  const priorityStyles = {
    alta: 'border-red-500/30 text-red-400 bg-red-400/5',
    media: 'border-yellow-500/30 text-yellow-400 bg-yellow-400/5',
    baja: 'border-teal-500/30 text-teal-400 bg-teal-400/5',
  };

  // Lógica para detectar si el proyecto está vencido (Fecha fin < Hoy)
  const isOverdue = new Date(task.endDate) < new Date() && task.status !== 'completada';

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="bg-white/5 border border-white/10 p-5 rounded-[2rem] hover:border-teal-500/30 transition-all group relative overflow-hidden backdrop-blur-sm"
    >
      {/* Indicador lateral de estado */}
      <div className={`absolute left-0 top-0 bottom-0 w-1 ${
        task.status === 'completada' ? 'bg-teal-500' : 
        task.status === 'en-progreso' ? 'bg-yellow-500' : 'bg-gray-700'
      }`} />

      <div className="flex justify-between items-start mb-4">
        <div className="flex items-start gap-4">
          {/* Botón de Checkbox Personalizado */}
          <button 
            onClick={() => onToggle(task.id)} 
            className="mt-1 transition-transform active:scale-90"
          >
            {task.status === 'completada' ? (
              <CheckCircle2 className="text-teal-400 shadow-[0_0_10px_rgba(45,212,191,0.3)]" size={24} />
            ) : (
              <div className="w-6 h-6 rounded-full border-2 border-gray-600 group-hover:border-teal-500/50 flex items-center justify-center transition-colors">
                <div className="w-2 h-2 bg-teal-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            )}
          </button>

          <div>
            <h3 className={`font-black tracking-tight text-base ${
              task.status === 'completada' ? 'line-through text-gray-600' : 'text-white'
            }`}>
              {task.title}
            </h3>
            
            {/* Responsable con Badge */}
            <div className="flex items-center gap-2 mt-1.5">
              <div className="flex items-center gap-1 bg-teal-500/10 px-2 py-0.5 rounded-md border border-teal-500/20">
                <User size={10} className="text-teal-400" />
                <span className="text-[10px] font-black text-teal-400 uppercase tracking-tighter">
                  {task.assignee}
                </span>
              </div>
              {isOverdue && (
                <div className="flex items-center gap-1 text-red-400 animate-pulse">
                  <AlertCircle size={10} />
                  <span className="text-[9px] font-bold uppercase">Atrasado</span>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Acción de eliminar (Solo visible al pasar el mouse) */}
        <button 
          onClick={() => onDelete(task.id)} 
          className="opacity-0 group-hover:opacity-100 p-2 text-gray-600 hover:text-red-400 transition-all rounded-xl hover:bg-red-400/10"
        >
          <Trash2 size={18} />
        </button>
      </div>

      {/* Descripción técnica */}
      <p className="text-xs text-gray-400 mb-5 px-1 leading-relaxed italic">
        {task.description || "N/A: Sin especificaciones registradas."}
      </p>

      {/* Footer de la tarjeta: Fechas y Prioridad */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/5 pt-4">
        <div className="flex items-center gap-3 text-gray-500 bg-black/30 px-3 py-2 rounded-2xl border border-white/5">
          <div className="flex items-center gap-1.5">
            <Calendar size={12} className="text-gray-600" />
            <span className="text-[10px] font-mono font-bold">{task.startDate}</span>
          </div>
          <ArrowRight size={12} className="text-gray-700" />
          <div className="flex items-center gap-1.5">
            <span className={`text-[10px] font-mono font-bold ${isOverdue ? 'text-red-400' : 'text-gray-300'}`}>
              {task.endDate}
            </span>
          </div>
        </div>

        <div className={`text-[9px] font-black uppercase px-3 py-1.5 rounded-xl border tracking-[0.15em] shadow-sm ${priorityStyles[task.priority]}`}>
          {task.priority}
        </div>
      </div>
    </motion.div>
  );
}