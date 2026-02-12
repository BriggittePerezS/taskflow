import { CheckCircle, Clock, ListTodo } from "lucide-react";
import type { Task } from "../types/index"; // Importación corregida con 'type'

interface Props {
  tasks: Task[];
}

export default function Dashboard({ tasks }: Props) {
  const stats = [
    { 
      label: "Total Proyectos", 
      value: tasks.length, 
      icon: <ListTodo size={20} />, 
      color: "text-blue-400",
      bg: "bg-blue-400/10"
    },
    { 
      label: "En Ejecución", 
      value: tasks.filter(t => t.status === 'in-progress').length, 
      icon: <Clock size={20} />, 
      color: "text-yellow-400",
      bg: "bg-yellow-400/10"
    },
    { 
      label: "Completados", 
      value: tasks.filter(t => t.status === 'completed').length, 
      icon: <CheckCircle size={20} />, 
      color: "text-teal-400",
      bg: "bg-teal-400/10"
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      {stats.map((s, i) => (
        <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-[2rem] backdrop-blur-xl flex items-center gap-5">
          <div className={`${s.bg} ${s.color} p-4 rounded-2xl`}>
            {s.icon}
          </div>
          <div>
            <div className="text-3xl font-black text-white">{s.value}</div>
            <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{s.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
}