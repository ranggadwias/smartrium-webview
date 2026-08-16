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
    <div className="fixed inset-0 z-100 flex items-end justify-center sm:items-center bg-slate-900/25 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-white border border-slate-200 w-full max-w-sm rounded-3xl p-6 relative shadow-xl">
        
        {/* HEADER MODAL */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-2 text-teal-600">
            <Clock className="w-5 h-5" />
            <h3 className="text-base font-bold text-slate-800">
              {isEditing ? 'Edit Jadwal' : 'Set Jadwal Baru'}
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-rose-600 bg-slate-100 hover:bg-rose-50 rounded-xl transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        
        <div className="flex justify-center mb-8 relative group">
          <div className="absolute inset-0 bg-teal-100/50 blur-2xl rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
          <input 
            type="time" 
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="relative bg-slate-50 border-2 border-slate-200 group-hover:border-teal-300 text-teal-700 text-5xl font-black text-center rounded-2xl py-6 px-8 focus:outline-none focus:border-teal-500 shadow-sm transition-all tracking-widest [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:cursor-pointer"
          />
        </div>

        {/* TOMBOL ACTION */}
        <div className="flex space-x-3">
          <button 
            onClick={onClose}
            className="w-1/3 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm rounded-xl transition-all"
          >
            Batal
          </button>
          <button 
            onClick={onSave}
            disabled={isLoading}
            className="w-2/3 py-3.5 bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-sm rounded-xl shadow-sm disabled:opacity-50 transition-all flex justify-center items-center"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              'Simpan Jadwal'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}