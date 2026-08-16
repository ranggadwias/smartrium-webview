import { AlertTriangle, Check, Fan } from 'lucide-react';

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

  const getIconConfig = (category) => {
    switch (category) {
      case 'alert':
        return { icon: <AlertTriangle className="w-5 h-5 text-rose-600" />, bg: 'bg-rose-50', border: 'border-rose-200' };
      case 'feeding':
        return { icon: <Check className="w-5 h-5 text-emerald-600" />, bg: 'bg-emerald-50', border: 'border-emerald-200' };
      case 'pump':
        return { icon: <Fan className="w-5 h-5 text-sky-600" />, bg: 'bg-sky-50', border: 'border-sky-200' };
      default:
        return { icon: <Check className="w-5 h-5 text-slate-500" />, bg: 'bg-slate-100', border: 'border-slate-200' };
    }
  };

  const config = getIconConfig(data.category);

  return (
    <div 
      onClick={onClick}
      className={`relative flex items-center justify-between p-4 rounded-2xl border mb-3 transition-all cursor-pointer hover:scale-[1.01] active:scale-[0.99] ${
        !data.isRead 
          ? 'bg-white border-teal-200 shadow-sm hover:border-teal-300' 
          : 'bg-slate-50/70 border-slate-200 opacity-70 hover:opacity-100'
      }`}
    >
      <div className="flex items-center space-x-4 flex-1 min-w-0 pr-8">
        <div className={`shrink-0 p-2.5 rounded-xl border ${config.bg} ${config.border} flex items-center justify-center`}>
          {config.icon}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className={`text-sm font-bold truncate pr-6 ${!data.isRead ? 'text-slate-800' : 'text-slate-500'}`}>
            {data.title}
          </h3>
          <p className={`text-xs mt-1 font-medium leading-relaxed ${!data.isRead ? 'text-slate-600' : 'text-slate-400'}`}>
            {data.message}
          </p>
        </div>
      </div>

      <div className="absolute top-4 right-4 flex flex-col items-end justify-between h-[calc(100%-2rem)]">
        <span className={`text-[10px] font-semibold whitespace-nowrap ${!data.isRead ? 'text-teal-600' : 'text-slate-400'}`}>
          {formatTime(data.timestamp)}
        </span>
        
        {!data.isRead && (
          <span className="w-2 h-2 rounded-full bg-rose-500 shadow-sm mt-auto"></span>
        )}
      </div>
    </div>
  );
}