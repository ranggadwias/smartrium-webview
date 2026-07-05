import { CheckCircle2, ShieldAlert, Info } from 'lucide-react';

export default function RecentActivity({ data }) {
  // Ambil data logs dari object Firebase dan ubah jadi Array biar bisa di-map()
  // Di-reverse() biar aktivitas terbaru ada di paling atas
  const logsArray = data?.logs ? Object.values(data.logs).reverse() : [];

  return (
    <section className="space-y-3">
      <div className="flex items-center space-x-2">
        <span className="h-px w-4 bg-sky-500/50"></span>
        <h2 className="text-xs font-bold tracking-widest text-sky-400 uppercase">Aktivitas Terakhir</h2>
      </div>

      <div className="bg-slate-900/50 border border-slate-800/60 rounded-2xl p-4 space-y-4 shadow-inner">
        {logsArray.length === 0 ? (
          <p className="text-center text-xs text-slate-500 py-2">Belum ada aktivitas tercatat.</p>
        ) : (
          logsArray.slice(0, 5).map((log, index) => ( // Ambil 5 data terbaru aja biar ga kepanjangan
            <div key={index} className="flex items-start space-x-3">
              <div className="flex flex-col items-center mt-1">
                {/* Render icon sesuai tipe log */}
                {log.tipe === 'success' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 z-10 bg-slate-950 rounded-full" />
                ) : log.tipe === 'warning' ? (
                  <ShieldAlert className="w-4 h-4 text-amber-400 z-10 bg-slate-950 rounded-full" />
                ) : (
                  <Info className="w-4 h-4 text-sky-400 z-10 bg-slate-950 rounded-full" />
                )}
                {/* Garis konektor (jangan tampilkan di item terakhir) */}
                {index !== Math.min(logsArray.length, 5) - 1 && (
                  <div className="w-0.5 h-10 bg-slate-800 mt-1"></div>
                )}
              </div>
              <div className="flex-1 bg-slate-900/40 border border-slate-800 p-2.5 rounded-xl">
                <div className="flex justify-between items-center">
                  <p className="text-xs font-semibold text-slate-200">{log.pesan}</p>
                  <span className="text-[10px] text-slate-500">{log.waktu}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}