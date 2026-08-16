import { Clock, Edit, Trash2 } from 'lucide-react';

export default function ScheduleCard({ sched, formatTime, onEdit, onDelete }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center justify-between shadow-sm relative overflow-hidden group">
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-teal-500 group-hover:bg-teal-600 transition-colors"></div>
      
      <div className="flex items-center space-x-4 pl-2">
        <div className="p-3 bg-teal-50 border border-teal-100 rounded-xl text-teal-600 shadow-xs group-hover:scale-110 transition-transform">
          <Clock className="w-5 h-5" />
        </div>
        <div>
          <p className="text-[11px] text-slate-500 font-bold mb-0.5">{sched.label}</p>
          <p className="text-2xl font-bold text-slate-800 tracking-wide">
            {formatTime(sched.hour, sched.minute)}
          </p>
        </div>
      </div>
      
      <div className="flex space-x-2 relative z-10">
        <button
          onClick={() => onEdit(sched.id, sched.hour, sched.minute)}
          className="p-2.5 bg-slate-50 hover:bg-teal-50 text-slate-500 hover:text-teal-600 border border-slate-200 hover:border-teal-200 rounded-xl transition-all"
        >
          <Edit className="w-4 h-4" />
        </button>
        <button 
          onClick={() => onDelete(sched.id)}
          className="p-2.5 bg-slate-50 hover:bg-rose-50 text-slate-500 hover:text-rose-600 border border-slate-200 hover:border-rose-200 rounded-xl transition-all"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}