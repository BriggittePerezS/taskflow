import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle, Clock, Trash2, Edit3, Check } from 'lucide-react';
import type { Task } from '../types/index';

interface Props {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, title: string, desc: string) => void;
}

export default function TaskItem({ task, onToggle, onDelete, onEdit }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempTitle, setTempTitle] = useState(task.title);
  const [tempDesc, setTempDesc] = useState(task.description);

  const handleSave = () => {
    onEdit(task.id, tempTitle, tempDesc);
    setIsEditing(false);
  };

  const priorityColors = {
    alta: 'text-red-400 border-red-400/30 bg-red-400/10',
    media: 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10',
    baja: 'text-teal-400 border-teal-400/30 bg-teal-400/10'
  };

  return (
    <motion.div layout className="bg-white/5 border border-white/10 p-4 rounded-2xl flex items-start gap-4 hover:border-teal-500/30 transition-all group">
      <button onClick={() => onToggle(task.id)} className="mt-1">
        {task.status === 'completada' ? 
          <CheckCircle2 className="text-teal-400" size={20} /> : 
          <Circle className="text-gray-600" size={20} />
        }
      </button>

      <div className="flex-1 min-w-0">
        {isEditing ? (
          <div className="space-y-2">
            <input 
              className="bg-black/60 border border-teal-500 rounded px-2 py-1 text-white w-full text-sm outline-none"
              value={tempTitle} onChange={(e) => setTempTitle(e.target.value)}
            />
            <textarea 
              className="bg-black/60 border border-teal-500 rounded px-2 py-1 text-white w-full text-xs outline-none"
              value={tempDesc} onChange={(e) => setTempDesc(e.target.value)}
            />
          </div>
        ) : (
          <>
            <h3 className={`font-bold text-sm ${task.status === 'completada' ? 'line-through text-gray-600' : 'text-white'}`}>
              {task.title}
            </h3>
            <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{task.description}</p>
          </>
        )}
        
        <div className="flex items-center gap-3 mt-2">
          <span className={`text-[9px] uppercase font-black px-2 py-0.5 rounded-full border tracking-widest ${priorityColors[task.priority]}`}>
            {task.priority}
          </span>
          <span className="text-[9px] text-gray-600 font-mono uppercase">{task.status.replace('-', ' ')}</span>
        </div>
      </div>

      <div className="flex gap-1">
        <button onClick={() => isEditing ? handleSave() : setIsEditing(true)} className="p-2 text-gray-500 hover:text-teal-400">
          {isEditing ? <Check size={16} /> : <Edit3 size={16} />}
        </button>
        <button onClick={() => onDelete(task.id)} className="p-2 text-gray-500 hover:text-red-400">
          <Trash2 size={16} />
        </button>
      </div>
    </motion.div>
  );
}