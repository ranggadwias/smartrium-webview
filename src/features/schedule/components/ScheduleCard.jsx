import { Clock, Edit, Trash2 } from 'lucide-react';

export default function ScheduleCard({ sched, formatTime, onEdit, onDelete }) {
  return (
    <div className="bg-linear-to-r from-slate-900/80 to-slate-900/40 backdrop-blur-md border border-slate-800 rounded-2xl p-4 flex items-center justify-between shadow-lg relative overflow-hidden group">
      {/* Aksen garis pinggir ala smart home */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-teal-500/50 group-hover:bg-teal-400 transition-colors"></div>
      
      <div className="flex items-center space-x-4 pl-2">
        <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-teal-400 shadow-inner group-hover:scale-110 transition-transform">
          <Clock className="w-5 h-5" />
        </div>
        <div>
          <p className="text-[11px] text-slate-400 font-bold mb-0.5">{sched.label}</p>
          <p className="text-2xl font-black text-slate-100 tracking-wide">
            {formatTime(sched.jam, sched.menit)}
          </p>
        </div>
      </div>
      
      <div className="flex space-x-2 relative z-10">
        <button 
          onClick={() => onEdit(sched.id, sched.jam, sched.menit)}
          className="p-2.5 bg-slate-950/40 hover:bg-teal-500/20 text-slate-400 hover:text-teal-400 border border-slate-800/60 hover:border-teal-500/30 rounded-xl transition-all"
        >
          <Edit className="w-4 h-4" />
        </button>
        <button 
          onClick={() => onDelete(sched.id)}
          className="p-2.5 bg-slate-950/40 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 border border-slate-800/60 hover:border-rose-500/30 rounded-xl transition-all"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}