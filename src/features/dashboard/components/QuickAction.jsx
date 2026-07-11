import { Fish, Fan } from "lucide-react";
import { ref, set } from "firebase/database";
import { db } from "../../../config/firebase";
import { useState } from "react";

export default function QuickAction({ data }) {
  // Local state buat nanganin delay UI (Optimistic UI)
  const [sending, setSending] = useState({ pakan: false, kuras: false });

  // Handler buat ngirim perintah ke Firebase
  const handleCommand = async (path, key) => {
    // 1. Set local state ke true (UI langsung berubah "Mengirim...")
    setSending((prev) => ({ ...prev, [key]: true }));
    
    // 2. Push ke Firebase
    await set(ref(db, path), true);

    // 3. Failsafe: Reset otomatis ke false setelah 3 detik
    // Ini gunanya kalau ESP32 lu mati, tombol gak selamanya "Mengirim..."
    setTimeout(async () => {
      await set(ref(db, path), false);
      setSending((prev) => ({ ...prev, [key]: false }));
    }, 3000);
  };

  // Logika buat disable tombol & animasi
  const isFeeding = sending.pakan || data?.pakan === "SEDANG MEMBERI";
  const isPumping = sending.kuras || data?.relay1 === "ON" || data?.relay2 === "ON";

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="h-px w-4 bg-sky-500/50"></span>
          <h2 className="text-xs font-bold tracking-widest text-sky-400 uppercase">
            Kontrol Manual
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Tombol Beri Pakan */}
        <button
          onClick={() => handleCommand("aquarium/manual_pakan", "pakan")}
          disabled={isFeeding}
          className="flex flex-col items-center justify-center p-4 bg-slate-900/60 hover:bg-sky-500/10 border border-slate-800 disabled:opacity-30 disabled:hover:bg-slate-900/60 disabled:hover:border-slate-800 rounded-2xl transition-all duration-300 group active:scale-95 disabled:active:scale-100"
        >
          <div className="p-3 bg-slate-800 group-hover:bg-sky-500/20 group-disabled:group-hover:bg-slate-800 rounded-xl text-slate-400 group-hover:text-sky-400 group-disabled:group-hover:text-slate-400 transition-colors mb-2">
            <Fish className={`w-6 h-6 ${isFeeding ? "animate-bounce text-sky-400" : ""}`} />
          </div>
          <span className="text-xs font-semibold text-slate-300 group-hover:text-sky-300 group-disabled:group-hover:text-slate-300 text-center whitespace-pre-line">
            {sending.pakan ? "Mengirim..." : data?.pakan === "SEDANG MEMBERI" ? "Menyuapi..." : "Beri Pakan"}
          </span>
        </button>

        {/* Tombol Kuras Air */}
        <button
          onClick={() => handleCommand("aquarium/manual_kuras", "kuras")}
          disabled={isPumping}
          className="flex flex-col items-center justify-center p-4 bg-slate-900/60 hover:bg-amber-500/10 border border-slate-800 disabled:opacity-30 disabled:hover:bg-slate-900/60 disabled:hover:border-slate-800 rounded-2xl transition-all duration-300 group active:scale-95 disabled:active:scale-100"
        >
          <div className="p-3 bg-slate-800 group-hover:bg-amber-500/20 group-disabled:group-hover:bg-slate-800 rounded-xl text-slate-400 group-hover:text-amber-400 group-disabled:group-hover:text-slate-400 transition-colors mb-2">
            <Fan className={`w-6 h-6 ${isPumping ? "animate-spin text-amber-400" : ""}`} />
          </div>
          <span className="text-xs font-semibold text-slate-300 group-hover:text-amber-300 group-disabled:group-hover:text-slate-300 text-center whitespace-pre-line">
            {sending.kuras 
              ? "Mengirim..." 
              : data?.relay1 === "ON" 
                ? "Membuang..." 
                : data?.relay2 === "ON" 
                  ? "Mengisi..." 
                  : "Kuras Air"}
          </span>
        </button>
      </div>
    </section>
  );
}