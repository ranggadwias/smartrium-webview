import { AlertTriangle, Check, Fan } from 'lucide-react';

// FIX: Terima props onClick
export default function NotificationCard({ data, onClick }) {
  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const now = new Date();
    
    const isToday = date.getDate() === now.getDate() && date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    const isYesterday = date.getDate() === yesterday.getDate() && date.getMonth() === yesterday.getMonth() && date.getFullYear() === yesterday.getFullYear();

    const timeStr = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;

    if (isToday) return timeStr;
    if (isYesterday) return `Yesterday ${timeStr}`;
    return `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')} ${timeStr}`;
  };

  const getIconConfig = (type) => {
    switch (type) {
      case 'alert':
        return { icon: <AlertTriangle className="w-5 h-5 text-rose-400" />, bg: 'bg-rose-500/10', border: 'border-rose-500/20' };
      case 'feeding':
        return { icon: <Check className="w-5 h-5 text-emerald-400" />, bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' };
      case 'pump':
        return { icon: <Fan className="w-5 h-5 text-sky-400" />, bg: 'bg-sky-500/10', border: 'border-sky-500/20' };
      default:
        return { icon: <Check className="w-5 h-5 text-slate-400" />, bg: 'bg-slate-800/50', border: 'border-slate-700' };
    }
  };

  const config = getIconConfig(data.type);

  return (
    <div 
      onClick={onClick} // FIX: Pasang event onClick di div utama
      className={`relative flex items-center justify-between p-4 rounded-2xl border mb-3 backdrop-blur-xl transition-all cursor-pointer hover:scale-[1.01] active:scale-[0.99] ${
        !data.isRead 
          ? 'bg-slate-800/60 border-teal-500/30 shadow-[0_0_15px_rgba(20,184,166,0.05)] hover:bg-slate-800/80' 
          : 'bg-slate-900/40 border-slate-800/80 opacity-60 hover:opacity-80'
      }`}
    >
      <div className="flex items-center space-x-4 flex-1 min-w-0 pr-8">
        <div className={`shrink-0 p-2.5 rounded-xl border ${config.bg} ${config.border} flex items-center justify-center`}>
          {config.icon}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className={`text-sm font-bold truncate pr-6 ${!data.isRead ? 'text-slate-200' : 'text-slate-400'}`}>
            {data.title}
          </h3>
          <p className={`text-xs mt-1 font-medium leading-relaxed wrap-break-word ${!data.isRead ? 'text-slate-400' : 'text-slate-500'}`}>
            {data.message}
          </p>
        </div>
      </div>

      <div className="absolute top-4 right-4 flex flex-col items-end justify-between h-[calc(100%-2rem)]">
        <span className={`text-[10px] font-semibold whitespace-nowrap ${!data.isRead ? 'text-teal-400' : 'text-slate-500'}`}>
          {formatTime(data.timestamp)}
        </span>
        
        {!data.isRead && (
          <span className="w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)] mt-auto"></span>
        )}
      </div>
    </div>
  );
}