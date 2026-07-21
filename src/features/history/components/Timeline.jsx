import { Fish, Droplets, AlertTriangle, Info } from "lucide-react";

const HISTORY_CONFIG = {
  feeding: {
    icon: Fish,
    color: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    label: "Pakan Ikan",
  },
  pump: {
    icon: Droplets,
    color: "text-sky-400 bg-sky-500/10 border-sky-500/20",
    label: "Pompa Air",
  },
  alert: {
    icon: AlertTriangle,
    color: "text-rose-400 bg-rose-500/10 border-rose-500/20",
    label: "Peringatan",
  },
  default: {
    icon: Info,
    color: "text-slate-400 bg-slate-500/10 border-slate-500/20",
    label: "Informasi",
  },
};

export default function TimeLine({ item, isFirst, isLast }) {
  // Ambil type & ubah ke huruf kecil biar anti-miss
  const itemType = (item?.type || "").toLowerCase();
  const config = HISTORY_CONFIG[itemType] || HISTORY_CONFIG.default;
  const IconComponent = config.icon;

  return (
    <div className="relative flex items-stretch gap-4 mb-4 group">
      {/* SISI KIRI: KOLOM ICON & GARIS */}
      <div className="relative flex items-center justify-center w-10 shrink-0">
        {isFirst && !isLast && (
          <div className="absolute top-1/2 -bottom-4 w-0.5 bg-slate-800/60 left-1/2 -translate-x-1/2 z-0"></div>
        )}
        {!isFirst && !isLast && (
          <div className="absolute top-0 -bottom-4 w-0.5 bg-slate-800/60 left-1/2 -translate-x-1/2 z-0"></div>
        )}
        {!isFirst && isLast && (
          <div className="absolute top-0 h-1/2 w-0.5 bg-slate-800/60 left-1/2 -translate-x-1/2 z-0"></div>
        )}

        <div
          className={`relative z-10 h-10 w-10 rounded-full border flex items-center justify-center shadow-md backdrop-blur-md shrink-0 ${config.color}`}
        >
          <IconComponent className="w-5 h-5" />
        </div>
      </div>

      {/* SISI KANAN: KOTAK KONTEN (CARD) */}
      <div className="flex-1 grid grid-cols-[1fr,auto] gap-3 items-center bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 shadow-sm hover:border-slate-700 transition-colors min-h-18">
        <div className="min-w-0 flex flex-col justify-center">
          <p className="text-[10px] text-slate-500 font-black uppercase leading-none tracking-widest">
            {config.label}
          </p>
          <h4 className="text-[13px] font-semibold text-slate-200 mt-1.5 truncate leading-tight">
            {item?.title || "-"}
          </h4>
        </div>

        <div className="text-right">
          <span className="text-xs font-black text-slate-400 tracking-wider">
            {item?.time || "--:--"}
          </span>
        </div>
      </div>
    </div>
  );
}