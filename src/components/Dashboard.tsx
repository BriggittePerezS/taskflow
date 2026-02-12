import type { Task } from '../types/index';
import { BarChart3, CheckSquare, Clock, Target } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Dashboard({ tasks }: { tasks: Task[] }) {
  const total = tasks.length;
  const completed = tasks.filter(t => t.status === 'completada').length;
  const inProgress = tasks.filter(t => t.status === 'en-progreso').length;
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  const stats = [
    { label: 'Proyectos Totales', value: total, icon: BarChart3, color: 'text-blue-400' },
    { label: 'En Ejecución', value: inProgress, icon: Clock, color: 'text-yellow-400' },
    { label: 'Completados', value: completed, icon: CheckSquare, color: 'text-teal-400' },
  ];

  return (
    <div className="space-y-6 mb-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white/5 border border-white/10 p-5 rounded-[2rem] flex items-center gap-4">
            <div className={`p-3 rounded-xl bg-black/40 ${stat.color}`}>
              <stat.icon size={20} />
            </div>
            <div>
              <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest">{stat.label}</p>
              <p className="text-2xl font-black italic">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white/5 border border-white/10 p-6 rounded-[2.5rem]">
        <div className="flex justify-between items-center mb-4 px-2">
          <div className="flex items-center gap-2">
            <Target size={14} className="text-teal-500" />
            <h4 className="text-[10px] font-black text-white uppercase tracking-widest">Progreso de Objetivos</h4>
          </div>
          <span className="text-2xl font-black italic text-teal-500">{percentage}%</span>
        </div>
        <div className="h-3 w-full bg-black/60 rounded-full overflow-hidden border border-white/5">
          <motion.div 
            initial={{ width: 0 }} animate={{ width: `${percentage}%` }}
            transition={{ duration: 1 }}
            className="h-full bg-gradient-to-r from-teal-600 to-teal-400 rounded-full"
          />
        </div>
      </div>
    </div>
  );
}