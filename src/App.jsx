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
      },
    );

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center space-y-3">
        <div className="w-10 h-10 border-4 border-sky-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-sm text-sky-400/70 font-medium animate-pulse">
          Menghubungkan ke Akuarium...
        </p>
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
      // ----------------------------------------
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