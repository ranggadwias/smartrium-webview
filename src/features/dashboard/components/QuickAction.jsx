import { useState, useEffect } from "react";
import { Fish, Fan } from "lucide-react";
import { ref, set } from "firebase/database";
import { db } from "../../../config/firebase";

// =========================================================================
// DEMO CONFIG (Pastikan ini disetting sama dengan yang di StatusSection)
// =========================================================================
const IS_DEMO_MODE = true;

export default function QuickAction({ data }) {
  // Pake lazy initialization () => Date.now() biar linter lu tetep anteng
  const [ticker, setTicker] = useState(() => Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setTicker(Date.now());
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // =========================================================================
  // LOGIKA DERIVED STATE
  // =========================================================================
  const isOnline = IS_DEMO_MODE 
    ? true 
    : data?.lastSeen ? (ticker - data.lastSeen < 15000) : false;

  const handleBeriPakan = async () => {
    if (!isOnline) return;
    await set(ref(db, "aquarium/manual_pakan"), true);
  };

  const handleNyalakanPompa = async () => {
    if (!isOnline) return;
    await set(ref(db, "aquarium/manual_kuras"), true);
  };

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="h-px w-4 bg-sky-500/50"></span>
          <h2 className="text-xs font-bold tracking-widest text-sky-400 uppercase">
            Kontrol Manual
          </h2>
        </div>
        
        {/* Indikator status kalau offline */}
        {/* {!isOnline && (
          <span className="flex items-center space-x-1 text-[10px] font-bold tracking-wider text-rose-400 uppercase bg-rose-500/10 px-2 py-0.5 rounded-md border border-rose-500/20">
            <CloudOff className="w-3 h-3" />
            <span>Alat Offline</span>
          </span>
        )} */}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Tombol Beri Pakan */}
        <button
          onClick={handleBeriPakan}
          disabled={!isOnline || data?.pakan === "SEDANG MEMBERI"}
          className="flex flex-col items-center justify-center p-4 bg-slate-900/60 hover:bg-sky-500/10 border border-slate-800 disabled:opacity-30 disabled:hover:bg-slate-900/60 disabled:hover:border-slate-800 rounded-2xl transition-all duration-300 group active:scale-95 disabled:active:scale-100"
        >
          <div className="p-3 bg-slate-800 group-hover:bg-sky-500/20 group-disabled:group-hover:bg-slate-800 rounded-xl text-slate-400 group-hover:text-sky-400 group-disabled:group-hover:text-slate-400 transition-colors mb-2">
            <Fish
              className={`w-6 h-6 ${data?.pakan === "SEDANG MEMBERI" ? "animate-bounce text-sky-400" : ""}`}
            />
          </div>
          <span className="text-xs font-semibold text-slate-300 group-hover:text-sky-300 group-disabled:group-hover:text-slate-300 text-center whitespace-pre-line">
            {!isOnline ? "Pakan\n(Offline)" : data?.pakan === "SEDANG MEMBERI" ? "Menyuapi..." : "Beri Pakan"}
          </span>
        </button>

        {/* Tombol Kuras Air */}
        <button
          onClick={handleNyalakanPompa}
          disabled={!isOnline || data?.relay1 === "ON" || data?.relay2 === "ON"}
          className="flex flex-col items-center justify-center p-4 bg-slate-900/60 hover:bg-amber-500/10 border border-slate-800 disabled:opacity-30 disabled:hover:bg-slate-900/60 disabled:hover:border-slate-800 rounded-2xl transition-all duration-300 group active:scale-95 disabled:active:scale-100"
        >
          <div className="p-3 bg-slate-800 group-hover:bg-amber-500/20 group-disabled:group-hover:bg-slate-800 rounded-xl text-slate-400 group-hover:text-amber-400 group-disabled:group-hover:text-slate-400 transition-colors mb-2">
            <Fan
              className={`w-6 h-6 ${(data?.relay1 === "ON" || data?.relay2 === "ON") ? "animate-spin text-amber-400" : ""}`}
            />
          </div>
          <span className="text-xs font-semibold text-slate-300 group-hover:text-amber-300 group-disabled:group-hover:text-slate-300 text-center whitespace-pre-line">
            {!isOnline ? "Kuras\n(Offline)" : data?.relay1 === "ON" ? "Membuang..." : data?.relay2 === "ON" ? "Mengisi..." : "Kuras Air"}
          </span>
        </button>
      </div>
    </section>
  );
}