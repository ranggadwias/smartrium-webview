import { useState, useEffect } from "react";
import {
  ref,
  query,
  orderByChild,
  limitToLast,
  onValue,
} from "firebase/database";
import { db } from "../../../config/firebase";
import { Info, Fish, Droplet } from "lucide-react";

export default function RecentActivity() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const logsRef = ref(db, "aquarium/events/history");

    const logsQuery = query(
      logsRef,
      orderByChild("timestamp"),
      limitToLast(20),
    );

    const unsubscribe = onValue(logsQuery, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();

        let logsArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));

        logsArray = logsArray
          .filter((log) => log.category !== "alert")
          .sort((a, b) => b.timestamp - a.timestamp)
          .slice(0, 5);

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

    return dateObj
      .toLocaleTimeString("id-ID", {
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      })
      .replace(/\./g, ":");
  };

  const renderIcon = (category) => {
    switch (category) {
      case "feeding":
        return <Fish className="w-4 h-4 text-amber-500" />;
      case "pump":
        return <Droplet className="w-4 h-4 text-emerald-500" />;
      case "info":
      default:
        return <Info className="w-4 h-4 text-sky-500" />;
    }
  };

  return (
    <section className="space-y-3">
      <div className="flex items-center space-x-2">
        <span className="h-px w-4 bg-sky-400"></span>
        <h2 className="text-xs font-bold tracking-widest text-sky-600 uppercase">
          Riwayat Sistem
        </h2>
      </div>

      <div className="bg-white/70 backdrop-blur-md border border-white/80 rounded-2xl p-4 shadow-xs">
        {loading ? (
          <div className="flex justify-center py-6">
            <div className="w-5 h-5 border-2 border-sky-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : logs.length === 0 ? (
          <p className="text-center text-xs text-slate-500 py-4">
            Belum ada aktivitas operasional tercatat.
          </p>
        ) : (
          <div className="relative">
            <div className="absolute left-3.75 top-4 bottom-4 w-0.5 bg-slate-200/60 z-0"></div>

            <div className="space-y-3 relative z-10">
              {logs.map((log) => (
                <div key={log.id} className="group flex items-center space-x-3">
                  <div className="shrink-0 w-8 h-8 bg-white/90 backdrop-blur-md border border-white shadow-xs rounded-full flex items-center justify-center transition-transform group-hover:scale-110 z-10">
                    {renderIcon(log.category)}
                  </div>

                  <div className="flex-1 bg-white/50 backdrop-blur-md hover:bg-white/80 border border-white/60 py-2.5 px-3 rounded-xl transition-colors cursor-default shadow-2xs">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                      <p className="text-xs font-medium text-slate-700 group-hover:text-slate-900 transition-colors">
                        {log.title}
                      </p>
                      <span className="text-[10px] text-slate-400 whitespace-nowrap">
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