import { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../../config/firebase"; // Sesuaikan path ini
import HistorySection from "./components/HistorySection";
import HistoryDetail from "./HistoryDetail";
import PageHeader from "../../components/PageHeader";

export default function HistoryPage() {
  const [activeView, setActiveView] = useState(null);
  const [historyData, setHistoryData] = useState({ feeding: [], pump: [], alert: [] });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Path sesuai struktur DB lu (asumsi di aquarium/history)
    const historyRef = ref(db, "aquarium/history");

    const unsubscribe = onValue(historyRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Fungsi pembantu buat ubah object Firebase {id: {data}} jadi array [{id, data}]
        const formatData = (obj) => {
          if (!obj) return [];
          return Object.keys(obj).map((key) => ({
            id: key,
            ...obj[key],
          })).sort((a, b) => b.timestamp - a.timestamp); // Sort berdasarkan waktu terbaru
        };

        setHistoryData({
          feeding: formatData(data.feeding),
          pump: formatData(data.pump),
          alert: formatData(data.alert),
        });
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Handler Navigasi
  if (activeView === 'feeding') {
    return <HistoryDetail title="Feeding History" data={historyData.feeding} onBack={() => setActiveView(null)} />;
  }
  if (activeView === 'pump') {
    return <HistoryDetail title="Pump History" data={historyData.pump} onBack={() => setActiveView(null)} />;
  }
  if (activeView === 'alert') {
    return <HistoryDetail title="Alert History" data={historyData.alert} onBack={() => setActiveView(null)} />;
  }

  return (
    <div className="w-full text-slate-100 pb-10">
      <PageHeader title="History" />

      {isLoading ? (
        <div className="px-6 mt-10 text-center text-slate-500 animate-pulse">Memuat riwayat...</div>
      ) : (
        <div className="px-6 mt-6">
          <HistorySection 
            title="Feeding History" 
            data={historyData.feeding} 
            onSeeAll={() => setActiveView('feeding')} 
          />
          <HistorySection 
            title="Pump History" 
            data={historyData.pump} 
            onSeeAll={() => setActiveView('pump')} 
          />
          <HistorySection 
            title="Alert/Sensor History" 
            data={historyData.alert} 
            onSeeAll={() => setActiveView('alert')} 
          />
        </div>
      )}
    </div>
  );
}