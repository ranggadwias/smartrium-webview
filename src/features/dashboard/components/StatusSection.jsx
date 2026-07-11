import { Fish, Droplet, Clock } from "lucide-react";

// ==========================================
// PURE UTILITY FUNCTIONS (Aman dari Linter)
// ==========================================
const formatTime = (jadwal) => {
  if (!jadwal?.isActive) return "--:--";
  const h = String(jadwal.jam || 0).padStart(2, "0");
  const m = String(jadwal.menit || 0).padStart(2, "0");
  return `${h}:${m}`;
};

const getSesiWaktu = (jadwal) => {
  if (!jadwal?.isActive) return "Off";
  const jam = jadwal.jam;
  if (jam >= 4 && jam <= 10) return "Pagi";
  if (jam >= 11 && jam <= 14) return "Siang";
  if (jam >= 15 && jam <= 18) return "Sore";
  return "Malam";
};

// ==========================================
// MAIN COMPONENT
// ==========================================
export default function StatusSection({ data }) {
  // Semua logic useState, useEffect, heartbeat, isOnline udah DIBABAT HABIS.
  
  const isJadwal1Active = data?.jadwal1?.isActive === true;
  const isJadwal2Active = data?.jadwal2?.isActive === true;

  return (
    <section className="space-y-4">
      
      {/* INDIKATOR WAKTU (Pengganti Indikator WiFi Online/Offline) */}
      <div className="flex justify-between items-center border rounded-xl px-4 py-2.5 backdrop-blur-md transition-all duration-300 bg-slate-900/50 border-slate-800/80 text-slate-100">
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4 text-sky-400" />
          <span className="text-xs font-medium text-slate-400">
            Waktu Alat
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
          <span className="text-xs font-mono font-bold text-sky-400">
            {data?.jam ?? "--:--:--"}
          </span>
        </div>
      </div>

      {/* TITLE HEADLINE */}
      <div className="flex items-center space-x-2">
        <span className="h-px w-4 bg-sky-500/50" />
        <h2 className="text-xs font-bold tracking-widest text-sky-400 uppercase">
          Status Akuarium
        </h2>
      </div>

      {/* GRID KARTU PAKAN */}
      <div className="grid grid-cols-2 gap-4">
        {/* KARTU PAKAN 1 */}
        <div
          className={`backdrop-blur-xl border rounded-2xl p-4 shadow-xl transition-all duration-300 ${
            isJadwal1Active
              ? "bg-linear-to-br from-sky-500/10 to-blue-600/5 border-sky-500/20 shadow-sky-500/5"
              : "bg-slate-900/40 border-slate-800/80"
          }`}
        >
          <div className="flex justify-between items-start mb-3">
            <span
              className={`p-2 rounded-xl transition-colors duration-300 ${isJadwal1Active ? "bg-sky-500/20 text-sky-300" : "bg-slate-800 text-slate-500"}`}
            >
              <Fish className="w-5 h-5" />
            </span>

            <span
              className={`text-[10px] px-2 py-0.5 rounded-full font-medium transition-colors duration-300 ${isJadwal1Active ? "bg-sky-500/20 text-sky-300" : "bg-slate-800 text-slate-500"}`}
            >
              {getSesiWaktu(data?.jadwal1)}
            </span>
          </div>

          <p className="text-xs text-slate-400 font-medium">Pakan Pertama</p>

          <p
            className={`text-2xl font-bold tracking-tight mt-1 transition-colors duration-300 ${isJadwal1Active ? "text-sky-300" : "text-slate-500"}`}
          >
            {formatTime(data?.jadwal1)}
          </p>
        </div>

        {/* KARTU PAKAN 2 */}
        <div
          className={`backdrop-blur-xl border rounded-2xl p-4 shadow-xl transition-all duration-300 ${
            isJadwal2Active
              ? "bg-linear-to-br from-amber-500/10 to-amber-600/5 border-amber-500/20 shadow-amber-500/5"
              : "bg-slate-900/40 border-slate-800/80"
          }`}
        >
          <div className="flex justify-between items-start mb-3">
            <span
              className={`p-2 rounded-xl transition-colors duration-300 ${isJadwal2Active ? "bg-amber-500/20 text-amber-300" : "bg-slate-800 text-slate-500"}`}
            >
              <Fish className="w-5 h-5" />
            </span>

            <span
              className={`text-[10px] px-2 py-0.5 rounded-full font-medium transition-colors duration-300 ${isJadwal2Active ? "bg-amber-500/20 text-amber-300" : "bg-slate-800 text-slate-500"}`}
            >
              {getSesiWaktu(data?.jadwal2)}
            </span>
          </div>

          <p className="text-xs text-slate-400 font-medium">Pakan Kedua</p>

          <p
            className={`text-2xl font-bold tracking-tight mt-1 transition-colors duration-300 ${isJadwal2Active ? "text-amber-300" : "text-slate-500"}`}
          >
            {formatTime(data?.jadwal2)}
          </p>
        </div>
      </div>

      {/* KARTU STATUS KEKERUHAN */}
      <div
        className={`backdrop-blur-xl border rounded-2xl p-4 flex items-center justify-between transition-all duration-300 ${
          data?.kekeruhan
            ? "bg-linear-to-r from-slate-900/90 to-sky-950/40 border-sky-500/20"
            : "bg-slate-900/40 border-slate-800/80"
        }`}
      >
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-sky-500/10 border border-sky-500/20 rounded-xl text-sky-400">
            <Droplet className="w-5 h-5" />
          </div>

          <div>
            <p className="text-xs text-slate-400 font-medium">Kekeruhan Air</p>

            <div className="text-2xl font-extrabold text-sky-400 tracking-wide mt-0.5">
              {data?.kekeruhan ?? "---"}
              <span className="text-xs font-normal text-slate-500 ml-1">
                ADC
              </span>
            </div>
          </div>
        </div>

        <span
          className={`text-xs px-3 py-1 rounded-full font-semibold border transition-all duration-300 ${
            data?.statusAir === "JERNIH"
              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
              : data?.statusAir === "KOTOR " || data?.statusAir === "KERUH"
                ? "bg-rose-500/10 text-rose-400 border-rose-500/20 animate-pulse"
                : "bg-slate-800 text-slate-500 border-slate-700"
          }`}
        >
          {data?.statusAir ?? "MEMUAT"}
        </span>
      </div>
    </section>
  );
}