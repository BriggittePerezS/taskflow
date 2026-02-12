import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import type { Priority } from '../types/index';

export default function TaskForm({ onAdd }: { onAdd: (t: string, d: string, p: Priority) => void }) {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [priority, setPriority] = useState<Priority>('media');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd(title, desc, priority);
    setTitle('');
    setDesc('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white/5 p-6 rounded-[2rem] border border-white/10 shadow-xl">
      <div className="space-y-4">
        <div>
          <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Título del Proyecto</label>
          <input 
            placeholder="Ej: Análisis de Datos" 
            className="w-full bg-black/40 border border-white/10 p-3 rounded-xl text-white outline-none focus:border-teal-500 transition-all mt-1"
            value={title} onChange={e => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Descripción</label>
          <textarea 
            placeholder="Detalles técnicos del proyecto..." 
            className="w-full bg-black/40 border border-white/10 p-3 rounded-xl text-white outline-none focus:border-teal-500 transition-all mt-1 h-20 resize-none"
            value={desc} onChange={e => setDesc(e.target.value)}
          />
        </div>

        <div>
          <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Nivel de Prioridad</label>
          <select 
            className="w-full bg-black/40 border border-white/10 p-3 rounded-xl text-gray-300 outline-none focus:border-teal-500 mt-1 cursor-pointer"
            value={priority} onChange={e => setPriority(e.target.value as Priority)}
          >
            <option value="baja">🟢 Prioridad Baja</option>
            <option value="media">🟡 Prioridad Media</option>
            <option value="alta">🔴 Prioridad Alta</option>
          </select>
        </div>

        <button className="w-full bg-teal-500 hover:bg-teal-400 text-black font-black py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-teal-500/20 active:scale-95">
          <Plus size={18} /> REGISTRAR PROYECTO
        </button>
      </div>
    </form>
  );
}