import { Zap, Hand, Activity, AlertTriangle, Info } from "lucide-react";

const HISTORY_CONFIG = {
  auto: { icon: Zap, color: "text-teal-400 bg-teal-500/10 border-teal-500/20", label: "Otomatis" },
  manual: { icon: Hand, color: "text-sky-400 bg-sky-500/10 border-sky-500/20", label: "Manual" },
  normal: { icon: Activity, color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20", label: "Sistem Normal" },
  alert: { icon: AlertTriangle, color: "text-rose-400 bg-rose-500/10 border-rose-500/20", label: "Peringatan" },
  default: { icon: Info, color: "text-slate-400 bg-slate-500/10 border-slate-500/20", label: "Informasi" }
};

export default function TimeLine({ item, isFirst, isLast }) {
  const config = HISTORY_CONFIG[item.type] || HISTORY_CONFIG.default;
  const IconComponent = config.icon;

  return (
    // Parent pakai items-stretch biar tinggi Kolom Icon (Kiri) SAMA TINGGI dengan Kolom Card (Kanan)
    // Jarak antar list dikunci pakai mb-4 (16px)
    <div className="relative flex items-stretch gap-4 mb-4 group">
      
      {/* SISI KIRI: KOLOM ICON & GARIS (Ukuran dikunci w-10) */}
      <div className="relative flex items-center justify-center w-10 shrink-0">
        
        {/* RUMUS GARIS TIMELINE MATEMATIS (Anti-Mencong):
            - Jika item PERTAMA: Garis mulai dari tengah (top-1/2) ke bawah melewati gap margin (bottom-[-16px])
            - Jika item TENGAH: Garis full dari top-0 tembus ke bawah melewati gap margin (bottom-[-16px])
            - Jika item TERAKHIR: Garis cuma dari top-0 dan STOP di tengah-tengah icon (h-1/2)
        */}
        {isFirst && !isLast && (
          <div className="absolute top-1/2 -bottom-4 w-0.5 bg-slate-800/60 left-1/2 -translate-x-1/2 z-0"></div>
        )}
        {!isFirst && !isLast && (
          <div className="absolute top-0 -bottom-4 w-0.5 bg-slate-800/60 left-1/2 -translate-x-1/2 z-0"></div>
        )}
        {!isFirst && isLast && (
          <div className="absolute top-0 h-1/2 w-0.5 bg-slate-800/60 left-1/2 -translate-x-1/2 z-0"></div>
        )}

        {/* LINGKARAN ICON: Karena parent-nya flex & items-center, 
            lingkaran ini dijamin 100% tegak lurus di tengah sumbu Y Card */}
        <div className={`relative z-10 h-10 w-10 rounded-full border flex items-center justify-center shadow-md backdrop-blur-md shrink-0 ${config.color}`}>
          <IconComponent className="w-5 h-5" />
        </div>
      </div>

      {/* SISI KANAN: KOTAK KONTEN (CARD) 
          Di sini dalam card kita pakai items-center juga biar teks & jam ikut presisi di tengah */}
      <div className="flex-1 flex justify-between items-center bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 shadow-sm hover:border-slate-700 transition-colors">
        
        {/* Konten Teks */}
        <div className="min-w-0 flex-1 pr-3">
          <h4 className="text-[13px] font-semibold text-slate-200 truncate leading-tight">
            {item.title}
          </h4>
          <p className="text-[10px] text-slate-500 font-black uppercase mt-1.5 leading-none tracking-widest">
            {config.label}
          </p>
        </div>

        {/* Waktu Eksekusi */}
        <div className="shrink-0 text-right">
          <span className="text-xs font-black text-slate-400 tracking-wider">
            {item.time}
          </span>
        </div>
      </div>

    </div>
  );
}