import { Fish, Droplets, AlertTriangle, Info } from "lucide-react";

const HISTORY_CONFIG = {
  feeding: {
    icon: Fish,
    color: "text-amber-600 bg-amber-50 border-amber-200",
    label: "Pakan Ikan",
  },
  pump: {
    icon: Droplets,
    color: "text-sky-600 bg-sky-50 border-sky-200",
    label: "Pompa Air",
  },
  alert: {
    icon: AlertTriangle,
    color: "text-rose-600 bg-rose-50 border-rose-200",
    label: "Peringatan",
  },
  default: {
    icon: Info,
    color: "text-slate-500 bg-slate-100 border-slate-200",
    label: "Informasi",
  },
};

export default function Timeline({ item, isFirst, isLast }) {
  const itemCategory = (item?.category || "").toLowerCase();
  const config = HISTORY_CONFIG[itemCategory] || HISTORY_CONFIG.default;
  const IconComponent = config.icon;

  return (
    <div className="relative flex items-stretch gap-4 mb-4 group">
      {/* SISI KIRI: KOLOM ICON & GARIS */}
      <div className="relative flex items-center justify-center w-10 shrink-0">
        {isFirst && !isLast && (
          <div className="absolute top-1/2 -bottom-4 w-0.5 bg-slate-200 left-1/2 -translate-x-1/2 z-0"></div>
        )}
        {!isFirst && !isLast && (
          <div className="absolute top-0 -bottom-4 w-0.5 bg-slate-200 left-1/2 -translate-x-1/2 z-0"></div>
        )}
        {!isFirst && isLast && (
          <div className="absolute top-0 h-1/2 w-0.5 bg-slate-200 left-1/2 -translate-x-1/2 z-0"></div>
        )}

        <div
          className={`relative z-10 h-10 w-10 rounded-full border flex items-center justify-center shadow-xs shrink-0 ${config.color}`}
        >
          <IconComponent className="w-5 h-5" />
        </div>
      </div>

      {/* SISI KANAN: KOTAK KONTEN (CARD) */}
      <div className="flex-1 grid grid-cols-[1fr,auto] gap-3 items-center bg-white border border-slate-200 rounded-2xl p-4 shadow-xs hover:border-slate-300 transition-colors min-h-18">
        <div className="min-w-0 flex flex-col justify-center">
          <p className="text-[10px] text-slate-400 font-bold uppercase leading-none tracking-widest">
            {config.label}
          </p>
          <h4 className="text-[13px] font-semibold text-slate-800 mt-1.5 truncate leading-tight">
            {item?.title || "-"}
          </h4>
        </div>

        <div className="text-right">
          <span className="text-xs font-bold text-slate-500 tracking-wider">
            {item?.time || "--:--"}
          </span>
        </div>
      </div>
    </div>
  );
}