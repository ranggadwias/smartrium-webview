import { ChevronRight } from "lucide-react";
import Timeline from "./Timeline";

export default function HistorySection({ title, data, onSeeAll }) {
  const previewData = data.slice(0, 2);

  return (
    <div className="mb-8 bg-white border border-slate-200 rounded-3xl p-5 shadow-sm">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-sm font-bold text-slate-800">{title}</h2>
        <button
          onClick={onSeeAll}
          className="flex items-center text-[11px] font-bold text-teal-600 hover:text-teal-700 transition-colors"
        >
          Lihat Semua
          <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
        </button>
      </div>

      <div className="space-y-1">
        {previewData.length > 0 ? (
          previewData.map((item, index) => (
            <Timeline
              key={item.id}
              item={item}
              isFirst={index === 0}
              isLast={index === previewData.length - 1}
            />
          ))
        ) : (
          <p className="text-xs text-slate-400 text-center py-4">
            Belum ada riwayat.
          </p>
        )}
      </div>
    </div>
  );
}