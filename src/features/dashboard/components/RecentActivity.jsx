import { useState, useEffect } from "react";
import { ref, query, orderByChild, limitToLast, onValue } from "firebase/database";
import { db } from "../../../config/firebase";
import { CheckCircle2, ShieldAlert, Info } from 'lucide-react';

export default function RecentActivity() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const logsRef = ref(db, 'aquarium/aquarium_logs');
    const logsQuery = query(logsRef, orderByChild('timestamp'), limitToLast(5));

    const unsubscribe = onValue(logsQuery, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const logsArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));

        logsArray.sort((a, b) => b.timestamp - a.timestamp);
        setLogs(logsArray);
      } else {
        setLogs([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const formatTime = (timestamp) => {
    if (!timestamp) return "--:--";
    const dateObj = new Date(timestamp * 1000); 
    
    return dateObj.toLocaleTimeString('id-ID', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <section className="space-y-3">
      <div className="flex items-center space-x-2">
        <span className="h-px w-4 bg-sky-500/50"></span>
        <h2 className="text-xs font-bold tracking-widest text-sky-400 uppercase">
          Riwayat Sistem
        </h2>
      </div>

      <div className="bg-slate-900/50 border border-slate-800/60 rounded-2xl p-4 shadow-inner">
        {loading ? (
          <div className="flex justify-center py-6">
            <div className="w-5 h-5 border-2 border-sky-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : logs.length === 0 ? (
          <p className="text-center text-xs text-slate-500 py-4">Belum ada riwayat tercatat.</p>
        ) : (
          
          /* CONTAINER UTAMA TIMELINE */
          <div className="relative">
            
            {/* TIANG GARIS UTUH DI BELAKANG (Anti-putus) */}
            {/* top-4 dan bottom-4 biar garisnya nggak bablas keluar area icon pertama & terakhir */}
            <div className="absolute left-3.75 top-4 bottom-4 w-0.5 bg-slate-800 z-0"></div>

            <div className="space-y-3 relative z-10">
              {logs.map((log) => (
                // PAKE items-center BIAR RATA TENGAH SAMA BOX
                <div key={log.id} className="group flex items-center space-x-3">
                  
                  {/* WRAPPER ICON: Ukuran fixed w-8 h-8 bikin posisi buletan presisi di tengah tiang */}
                  <div className="shrink-0 w-8 h-8 bg-slate-950 border border-slate-800 shadow-sm rounded-full flex items-center justify-center transition-transform group-hover:scale-110 z-10">
                    {log.tipe === 'success' ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : log.tipe === 'warning' ? (
                      <ShieldAlert className="w-4 h-4 text-amber-400" />
                    ) : (
                      <Info className="w-4 h-4 text-sky-400" />
                    )}
                  </div>

                  {/* BOX KONTEN */}
                  <div className="flex-1 bg-slate-800/20 hover:bg-slate-800/40 border border-slate-800/50 py-2.5 px-3 rounded-xl transition-colors cursor-default">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                      <p className="text-xs font-medium text-slate-300 group-hover:text-slate-100 transition-colors">
                        {log.pesan}
                      </p>
                      <span className="text-[10px] text-slate-500 whitespace-nowrap">
                        {formatTime(log.timestamp)}
                      </span>
                    </div>
                  </div>
                  
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}