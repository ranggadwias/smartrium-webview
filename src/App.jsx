import { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "./config/firebase";

import MainLayout from "./layouts/MainLayout";
import DashboardPage from "./features/dashboard/DashboardPage";
import SchedulePage from "./features/schedule/SchedulePage";
import NotificationPage from "./features/notification/NotificationPage";
import HistoryPage from "./features/history/HistoryPage";
import SettingsPage from "./features/settings/SettingsPage";

export default function App() {
  const [aquariumData, setAquariumData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState("dashboard");

  useEffect(() => {
    const aquariumRef = ref(db, "aquarium");
    const unsubscribe = onValue(
      aquariumRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setAquariumData(data);
        }
        setLoading(false);
      },
      (error) => {
        console.error("Firebase Read Error: ", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-3 bg-slate-100/70 relative overflow-hidden">
        <div className="absolute w-96 h-96 bg-sky-400/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="p-8 bg-white/80 backdrop-blur-2xl border border-white/95 rounded-3xl shadow-xl shadow-slate-200/50 flex flex-col items-center space-y-4 relative z-10">
          <div className="w-10 h-10 border-4 border-sky-100 border-t-sky-600 rounded-full animate-spin"></div>
          <p className="text-xs font-semibold text-slate-600 animate-pulse tracking-wide">
            Menghubungkan ke Akuarium...
          </p>
        </div>
      </div>
    );
  }

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <DashboardPage data={aquariumData} />;
      case "schedule":
        return <SchedulePage data={aquariumData} />;
      case "notifications":
        return <NotificationPage setCurrentPage={setCurrentPage} />;
      case "history":
        return <HistoryPage />;
      case "settings":
        return <SettingsPage />;
      default:
        return (
          <div className="p-10 flex flex-col items-center justify-center h-full text-slate-500">
            Halaman sedang dibangun...
          </div>
        );
    }
  };

  return (
    <MainLayout
      data={aquariumData}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
    >
      {renderPage()}
    </MainLayout>
  );
}