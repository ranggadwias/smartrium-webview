import { useState } from "react";
import HistorySection from "./components/HistorySection";
import HistoryDetail from "./HistoryDetail";
import PageHeader from "../../components/PageHeader";

const DUMMY_HISTORY = {
  feeding: [
    { id: 1, date: "18 Mei 2026", time: "18:00", title: "Sukses Memberi Pakan Ikan", type: "auto" },
    { id: 2, date: "18 Mei 2026", time: "09:30", title: "Memberi Pakan Secara Manual", type: "manual" },
    { id: 3, date: "17 Mei 2026", time: "18:00", title: "Sukses Memberi Pakan Ikan", type: "auto" },
  ],
  pump: [
    { id: 5, date: "18 Mei 2026", time: "11:01", title: "Pompa Air Mati", type: "normal" },
    { id: 6, date: "18 Mei 2026", time: "11:00", title: "Pompa Air Menyala", type: "normal" },
    { id: 7, date: "17 Mei 2026", time: "16:16", title: "Pompa Air Mati", type: "normal" },
  ],
  alert: [
    { id: 9, date: "18 Mei 2026", time: "16:32", title: "Turbidity High (Air Keruh)", type: "alert" },
    { id: 10, date: "17 Mei 2026", time: "05:12", title: "Koneksi Pompa Terputus", type: "alert" },
  ]
};

export default function HistoryPage() {
  const [activeView, setActiveView] = useState(null);

  if (activeView === 'feeding') {
    return <HistoryDetail title="Feeding History" data={DUMMY_HISTORY.feeding} onBack={() => setActiveView(null)} />;
  }
  if (activeView === 'pump') {
    return <HistoryDetail title="Pump History" data={DUMMY_HISTORY.pump} onBack={() => setActiveView(null)} />;
  }
  if (activeView === 'alert') {
    return <HistoryDetail title="Alert History" data={DUMMY_HISTORY.alert} onBack={() => setActiveView(null)} />;
  }

  return (
    <div className="w-full text-slate-100 pb-10">
      {/* Pasang PageHeader di sini, tanpa tombol Back karena ini halaman root History */}
      <PageHeader title="History" />

      <div className="px-6 mt-6">
        <HistorySection 
          title="Feeding History" 
          data={DUMMY_HISTORY.feeding} 
          onSeeAll={() => setActiveView('feeding')} 
        />
        <HistorySection 
          title="Pump History" 
          data={DUMMY_HISTORY.pump} 
          onSeeAll={() => setActiveView('pump')} 
        />
        <HistorySection 
          title="Alert/Sensor History" 
          data={DUMMY_HISTORY.alert} 
          onSeeAll={() => setActiveView('alert')} 
        />
      </div>
    </div>
  );
}