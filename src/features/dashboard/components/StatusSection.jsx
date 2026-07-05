import { useState, useEffect } from 'react';
import { Fish, Droplet, Wifi, WifiOff, AlertTriangle } from 'lucide-react';

// =========================================================================
// DEMO CONFIG (Ubah jadi true pas bimbingan, ubah false pas dicolok ESP32 asli)
// =========================================================================
const IS_DEMO_MODE = true; 

// ==========================================
// PURE UTILITY FUNCTIONS (Aman dari Linter)
// ==========================================
const formatTime = (jadwal) => {
  if (!jadwal?.isActive) return '--:--';
  const h = String(jadwal.jam || 0).padStart(2, '0');
  const m = String(jadwal.menit || 0).padStart(2, '0');
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
  // State cuma buat pemicu re-render tiap 3 detik biar detektor status tetep up-to-date
  const [ticker, setTicker] = useState(() => Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setTicker(Date.now());
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // =========================================================================
  // LOGIKA DERIVED STATE (Anti-Glitcing & Langsung Bypass pas Demo Mode)
  // =========================================================================
  const isOnline = IS_DEMO_MODE 
    ? true 
    : data?.lastSeen ? (ticker - data.lastSeen < 15000) : false;

  const isRtcError = IS_DEMO_MODE 
    ? false 
    : (isOnline && (!data?.jam || data?.jam === '00:00:00'));

  // Kondisi aktif kartu pakan (kalo demo, kita loss-kan biar gak burem/opacity)
  const isJadwal1Active = IS_DEMO_MODE ? true : (isOnline && data?.jadwal1?.isActive === true);
  const isJadwal2Active = IS_DEMO_MODE ? true : (isOnline && data?.jadwal2?.isActive === true);

  return (
    <section className="space-y-4">
      
      {/* INDIKATOR STATUS UTAMA */}
      <div 
        className={`flex justify-between items-center border rounded-xl px-4 py-2.5 backdrop-blur-md transition-all duration-300 ${
          !isOnline 
            ? 'bg-rose-500/5 border-rose-500/20 text-rose-400' 
            : isRtcError 
              ? 'bg-amber-500/5 border-amber-500/20 text-amber-400' 
              : 'bg-slate-900/50 border-slate-800/80 text-slate-100'
        }`}
      >
        <div className="flex items-center space-x-2">
          {!isOnline ? (
            <WifiOff className="w-4 h-4 text-rose-400" />
          ) : isRtcError ? (
            <AlertTriangle className="w-4 h-4 text-amber-400" />
          ) : (
            <Wifi className="w-4 h-4 text-emerald-400" />
          )}
          <span className="text-xs font-medium text-slate-400">
            {IS_DEMO_MODE 
              ? 'ESP32 Terhubung (Demo Mode)' 
              : !isOnline 
                ? 'ESP32 Terputus' 
                : isRtcError 
                  ? 'RTC Hardware Error' 
                  : 'ESP32 Terhubung'
            }
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <span className={`w-2 h-2 rounded-full ${
            !isOnline 
              ? 'bg-rose-500 animate-pulse' 
              : isRtcError 
                ? 'bg-amber-500 animate-bounce' 
                : 'bg-emerald-400 animate-pulse'
          }`} />
          <span className={`text-xs font-mono font-bold ${!isOnline ? 'text-rose-400/60' : 'text-sky-400'}`}>
            {isOnline ? (data?.jam ?? '12:00:00') : 'OFFLINE'}
          </span>
        </div>
      </div>

      {/* TITLE HEADLINE */}
      <div className="flex items-center space-x-2">
        <span className="h-px w-4 bg-sky-500/50" />
        <h2 className="text-xs font-bold tracking-widest text-sky-400 uppercase">Status Akuarium</h2>
      </div>
      
      {/* GRID KARTU PAKAN */}
      <div className="grid grid-cols-2 gap-4">
        {/* KARTU PAKAN 1 */}
        <div 
          className={`backdrop-blur-xl border rounded-2xl p-4 shadow-xl transition-all duration-300 ${
            isJadwal1Active 
              ? 'bg-linear-to-br from-sky-500/10 to-blue-600/5 border-sky-500/20 shadow-sky-500/5' 
              : 'bg-slate-900/40 border-slate-800/80 opacity-40'
          }`}
        >
          <div className="flex justify-between items-start mb-3">
            <span className={`p-2 rounded-xl transition-colors duration-300 ${isJadwal1Active ? 'bg-sky-500/20 text-sky-300' : 'bg-slate-800 text-slate-500'}`}>
              <Fish className="w-5 h-5" />
            </span>
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium transition-colors duration-300 ${isJadwal1Active ? 'bg-sky-500/20 text-sky-300' : 'bg-slate-800 text-slate-500'}`}>
              {isOnline ? getSesiWaktu(data?.jadwal1) : 'Off'}
            </span>
          </div>
          <p className="text-xs text-slate-400 font-medium">Pakan Pertama</p>
          <p className={`text-2xl font-bold tracking-tight mt-1 transition-colors duration-300 ${isJadwal1Active ? 'text-sky-300' : 'text-slate-500'}`}>
            {isOnline ? formatTime(data?.jadwal1) : '--:--'}
          </p>
        </div>

        {/* KARTU PAKAN 2 */}
        <div 
          className={`backdrop-blur-xl border rounded-2xl p-4 shadow-xl transition-all duration-300 ${
            isJadwal2Active 
              ? 'bg-linear-to-br from-amber-500/10 to-amber-600/5 border-amber-500/20 shadow-amber-500/5' 
              : 'bg-slate-900/40 border-slate-800/80 opacity-40'
          }`}
        >
          <div className="flex justify-between items-start mb-3">
            <span className={`p-2 rounded-xl transition-colors duration-300 ${isJadwal2Active ? 'bg-amber-500/20 text-amber-300' : 'bg-slate-800 text-slate-500'}`}>
              <Fish className="w-5 h-5" />
            </span>
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium transition-colors duration-300 ${isJadwal2Active ? 'bg-amber-500/20 text-amber-300' : 'bg-slate-800 text-slate-500'}`}>
              {isOnline ? getSesiWaktu(data?.jadwal2) : 'Off'}
            </span>
          </div>
          <p className="text-xs text-slate-400 font-medium">Pakan Kedua</p>
          <p className={`text-2xl font-bold tracking-tight mt-1 transition-colors duration-300 ${isJadwal2Active ? 'text-amber-300' : 'text-slate-500'}`}>
            {isOnline ? formatTime(data?.jadwal2) : '--:--'}
          </p>
        </div>
      </div>

      {/* KARTU STATUS KEKERUHAN */}
      <div 
        className={`backdrop-blur-xl border rounded-2xl p-4 flex items-center justify-between transition-all duration-300 ${
          isOnline 
            ? 'bg-linear-to-r from-slate-900/90 to-sky-950/40 border-sky-500/20' 
            : 'bg-slate-900/40 border-slate-800/80 opacity-40'
        }`}
      >
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-sky-500/10 border border-sky-500/20 rounded-xl text-sky-400">
            <Droplet className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-medium">Kekeruhan Air</p>
            <div className="text-2xl font-extrabold text-sky-400 tracking-wide mt-0.5">
              {isOnline ? (data?.kekeruhan ?? '0') : '---'}
              <span className="text-xs font-normal text-slate-500 ml-1">ADC</span>
            </div>
          </div>
        </div>
        
        <span 
          className={`text-xs px-3 py-1 rounded-full font-semibold border transition-all duration-300 ${
            !isOnline 
              ? 'bg-slate-800 text-slate-500 border-slate-700' 
              : data?.statusAir === 'KERUH' 
                ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
          }`}
        >
          {isOnline ? (data?.statusAir ?? 'JERNIH') : 'OFFLINE'}
        </span>
      </div>

    </section>
  );
}