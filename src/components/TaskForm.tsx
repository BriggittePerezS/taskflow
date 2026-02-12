import React, { useState } from 'react';
import { Plus, Calendar, User, AlignLeft, Tag, Briefcase } from 'lucide-react';
import type { Priority } from '../types/index';

interface Props {
  onAdd: (
    title: string, 
    description: string, 
    priority: Priority, 
    startDate: string, 
    endDate: string, 
    assignee: string
  ) => void;
}

export default function TaskForm({ onAdd }: Props) {
  // Estados para capturar la información
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [priority, setPriority] = useState<Priority>('media');
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
  const [assignee, setAssignee] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validación básica: título y responsable son obligatorios
    if (!title.trim() || !assignee.trim()) {
      alert("Por favor, completa el título y el responsable.");
      return;
    }

    // Enviamos los datos al Hook useTasks
    onAdd(title, desc, priority, startDate, endDate, assignee);

    // Limpiamos los campos para una nueva entrada
    setTitle('');
    setDesc('');
    setAssignee('');
    setPriority('media');
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="bg-white/5 p-6 rounded-[2.5rem] border border-white/10 shadow-2xl space-y-4 backdrop-blur-md sticky top-6"
    >
      {/* Título del Formulario */}
      <div className="flex items-center gap-2 mb-2 px-1">
        <Briefcase size={14} className="text-teal-500" />
        <h3 className="text-teal-500 text-[10px] font-black uppercase tracking-[0.3em]">
          Registro de Operaciones
        </h3>
      </div>
      
      {/* Input de Título */}
      <input 
        type="text"
        placeholder="Nombre del Proyecto / Tarea" 
        className="w-full bg-black/40 border border-white/10 p-4 rounded-2xl text-white outline-none focus:border-teal-500 transition-all text-sm placeholder:text-gray-600"
        value={title} 
        onChange={e => setTitle(e.target.value)}
      />

      {/* Input de Responsable */}
      <div className="relative">
        <User className="absolute left-4 top-4 text-gray-500" size={16} />
        <input 
          type="text"
          placeholder="Responsable asignado" 
          className="w-full bg-black/40 border border-white/10 p-4 pl-12 rounded-2xl text-white outline-none focus:border-teal-500 transition-all text-sm placeholder:text-gray-600"
          value={assignee} 
          onChange={e => setAssignee(e.target.value)}
        />
      </div>

      {/* Textarea de Descripción */}
      <div className="relative">
        <AlignLeft className="absolute left-4 top-4 text-gray-500" size={16} />
        <textarea 
          placeholder="Descripción técnica o notas..." 
          className="w-full bg-black/40 border border-white/10 p-4 pl-12 rounded-2xl text-white outline-none focus:border-teal-500 transition-all text-sm h-24 resize-none placeholder:text-gray-600"
          value={desc} 
          onChange={e => setDesc(e.target.value)}
        />
      </div>

      {/* Grid de Fechas */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-[9px] text-gray-500 font-bold uppercase ml-2 tracking-widest flex items-center gap-1">
            <Calendar size={10} /> Inicio
          </label>
          <input 
            type="date" 
            className="w-full bg-black/40 border border-white/10 p-3 rounded-xl text-xs text-white outline-none focus:border-teal-500" 
            value={startDate} 
            onChange={e => setStartDate(e.target.value)} 
          />
        </div>
        <div className="space-y-1">
          <label className="text-[9px] text-gray-500 font-bold uppercase ml-2 tracking-widest flex items-center gap-1">
            <Calendar size={10} /> Entrega
          </label>
          <input 
            type="date" 
            className="w-full bg-black/40 border border-white/10 p-3 rounded-xl text-xs text-white outline-none focus:border-teal-500" 
            value={endDate} 
            onChange={e => setEndDate(e.target.value)} 
          />
        </div>
      </div>

      {/* Selector de Prioridad */}
      <div className="space-y-1">
        <label className="text-[9px] text-gray-500 font-bold uppercase ml-2 tracking-widest flex items-center gap-1">
          <Tag size={10} /> Prioridad
        </label>
        <select 
          className="w-full bg-black/40 border border-white/10 p-4 rounded-2xl text-gray-300 outline-none focus:border-teal-500 text-sm appearance-none cursor-pointer"
          value={priority} 
          onChange={e => setPriority(e.target.value as Priority)}
        >
          <option value="baja">🟢 Prioridad Baja</option>
          <option value="media">🟡 Prioridad Media</option>
          <option value="alta">🔴 Prioridad Alta</option>
        </select>
      </div>

      {/* Botón de Envío */}
      <button 
        type="submit"
        className="w-full bg-teal-500 hover:bg-teal-400 text-black font-black py-4 rounded-2xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-teal-500/20 active:scale-95 mt-2"
      >
        <Plus size={18} /> DESPLEGAR PROYECTO
      </button>
    </form>
  );
}