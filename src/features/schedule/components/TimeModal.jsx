import { X, Clock } from 'lucide-react';

export default function TimeModal({ 
  isOpen, 
  onClose, 
  onSave, 
  time, 
  setTime, 
  isEditing, 
  isLoading 
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-end justify-center sm:items-center bg-slate-950/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-sm rounded-3xl p-6 relative shadow-2xl shadow-teal-500/10">
        
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-2 text-teal-400">
            <Clock className="w-5 h-5" />
            <h3 className="text-base font-bold text-slate-100">
              {isEditing ? 'Edit Jadwal' : 'Set Jadwal Baru'}
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-slate-500 hover:text-rose-400 bg-slate-800/50 hover:bg-rose-500/10 rounded-xl transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        
        <div className="flex justify-center mb-8 relative group">
          <div className="absolute inset-0 bg-teal-500/20 blur-2xl rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div className="relative w-full">
            
            {/* 1. ICON LUCIDE BUATAN KITA */}
            <div className="absolute left-5 top-1/2 -translate-y-1/2 pointer-events-none text-teal-500/40 group-hover:text-teal-400 transition-colors z-10">
              <Clock className="w-6 h-6" />
            </div>

            <input 
              type="time" 
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="appearance-none block w-full bg-slate-950/80 border-2 border-slate-800 group-hover:border-teal-500/50 text-teal-400 text-5xl font-black text-center rounded-2xl py-6 focus:outline-none focus:border-teal-400 shadow-inner transition-all tracking-widest [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-datetime-edit]:flex [&::-webkit-datetime-edit]:justify-center"
            />
          </div>
        </div>

        <div className="flex space-x-3">
          <button 
            onClick={onClose}
            className="w-1/3 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-sm rounded-xl transition-all"
          >
            Batal
          </button>
          <button 
            onClick={onSave}
            disabled={isLoading}
            className="w-2/3 py-3.5 bg-linear-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-slate-950 font-extrabold text-sm rounded-xl shadow-lg shadow-teal-500/20 disabled:opacity-50 transition-all flex justify-center items-center"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-slate-950/20 border-t-slate-950 rounded-full animate-spin"></div>
            ) : (
              'Simpan Jadwal'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}