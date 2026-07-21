import { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../../config/firebase"; 
import HistorySection from "./components/HistorySection";
import HistoryDetail from "./HistoryDetail";
import PageHeader from "../../components/PageHeader";

export default function HistoryPage() {
  const [activeView, setActiveView] = useState(null);
  const [historyData, setHistoryData] = useState({ feeding: [], pump: [], alert: [] });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const historyRef = ref(db, "aquarium/history");

    const unsubscribe = onValue(historyRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const formatData = (obj, category) => {
          if (!obj) return [];
          return Object.keys(obj)
            .map((key) => ({
              id: key,
              type: obj[key].type || category,
              ...obj[key],
            }))
            .sort((a, b) => b.timestamp - a.timestamp);
        };

        setHistoryData({
          feeding: formatData(data.feeding, "feeding"),
          pump: formatData(data.pump, "pump"),
          alert: formatData(data.alert, "alert"),
        });
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

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