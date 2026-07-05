import { ChevronRight } from "lucide-react";
import TimeLine from "./TimeLine";

export default function HistorySection({ title, data, onSeeAll }) {
  // Ambil 2 data teratas aja buat preview di halaman utama
  const previewData = data.slice(0, 2);

  return (
    <div className="mb-8 bg-slate-900/30 border border-slate-800/50 rounded-3xl p-5">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-sm font-bold text-slate-100">{title}</h2>
        <button 
          onClick={onSeeAll}
          className="flex items-center text-[11px] font-bold text-teal-400 hover:text-teal-300 transition-colors"
        >
          Lihat Semua
          <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
        </button>
      </div>

      <div className="space-y-1">
        {previewData.length > 0 ? (
          previewData.map((item, index) => (
            <TimeLine 
              key={item.id} 
              item={item} 
              isLast={index === previewData.length - 1} 
            />
          ))
        ) : (
          <p className="text-xs text-slate-500 text-center py-4">Belum ada riwayat.</p>
        )}
      </div>
    </div>
  );
}