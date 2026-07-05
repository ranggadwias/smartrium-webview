import { useState, useEffect } from "react";
import { Check } from "lucide-react";
import { ref, onValue, update } from "firebase/database";
import { db } from "../../config/firebase";
import NotificationCard from "./components/NotificationCard";
import PageHeader from "../../components/PageHeader";

const TABS = [
  { id: "all", label: "All" },
  { id: "feeding", label: "Feeding" },
  { id: "pump", label: "Pump" },
  { id: "alert", label: "Alert" },
];

export default function NotificationPage({ setCurrentPage }) {
  const [activeTab, setActiveTab] = useState("all");
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const firebasePath = "aquarium/notifications";

  // Dictionary untuk teks Empty State (Hanya Title biar Clean)
  const emptyStateContent = {
    all: "Tidak Ada Notifikasi",
    feeding: "Tidak Ada Notifikasi Pakan",
    pump: "Tidak Ada Notifikasi Pompa",
    alert: "Tidak Ada Notifikasi Peringatan",
  };

  useEffect(() => {
    const notifRef = ref(db, firebasePath);
    const unsubscribe = onValue(notifRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const formattedData = Object.keys(data)
          .map((key) => ({
            id: key,
            ...data[key],
          }))
          .sort((a, b) => b.timestamp - a.timestamp);
        setNotifications(formattedData);
      } else {
        setNotifications([]);
      }
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleMarkAllAsRead = () => {
    const updates = {};
    notifications.forEach((notif) => {
      if (!notif.isRead) {
        updates[`${firebasePath}/${notif.id}/isRead`] = true;
      }
    });
    if (Object.keys(updates).length > 0) {
      update(ref(db), updates).catch((err) => console.error(err));
    }
  };

  const handleMarkAsRead = (id, isRead) => {
    if (!isRead) {
      update(ref(db), {
        [`${firebasePath}/${id}/isRead`]: true,
      }).catch((err) => console.error("Gagal update read status:", err));
    }
  };

  const filteredNotifs = notifications.filter((notif) =>
    activeTab === "all" ? true : notif.type === activeTab,
  );

  return (
    <div className="w-full text-slate-100 pb-10">
      <PageHeader
        title="Notifications"
        onBack={() => setCurrentPage("dashboard")}
      />

      <div className="px-6 mt-6">
        <div className="flex justify-between items-center mb-6">
          {/* TABS MENU */}
          <div className="flex space-x-2 overflow-x-auto scrollbar-hide pb-1">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-300 border ${
                  activeTab === tab.id
                    ? "bg-teal-500/20 text-teal-300 border-teal-500/30 shadow-lg shadow-teal-500/5"
                    : "bg-slate-900/50 text-slate-400 border-slate-800/80 hover:bg-slate-800 hover:text-slate-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* MARK ALL READ */}
          <button
            onClick={handleMarkAllAsRead}
            className="text-[10px] font-bold text-teal-400 hover:text-teal-300 whitespace-nowrap ml-4 transition-colors"
          >
            Mark all read
          </button>
        </div>

        {/* LIST NOTIFIKASI */}
        <div className="mt-4">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center mt-20 opacity-50 animate-pulse">
              <div className="w-8 h-8 border-4 border-teal-500/20 border-t-teal-500 rounded-full animate-spin mb-4"></div>
              <p className="text-xs font-medium text-slate-400">
                Memuat riwayat...
              </p>
            </div>
          ) : filteredNotifs.length === 0 ? (
            
            /* EMPTY STATE DINAMIS (TITLE ONLY) */
            <div className="flex flex-col items-center justify-center mt-24 text-center animate-fade-in-up">
              <div className="w-16 h-16 bg-slate-900/50 border border-slate-800/80 rounded-full flex items-center justify-center mb-4 shadow-inner">
                <Check className="w-8 h-8 text-teal-500/40" />
              </div>
              <p className="text-sm font-bold text-slate-300">
                {emptyStateContent[activeTab]}
              </p>
            </div>

          ) : (
            <div className="space-y-3">
              {filteredNotifs.map((notif) => (
                <NotificationCard
                  key={notif.id}
                  data={notif}
                  onClick={() => handleMarkAsRead(notif.id, notif.isRead)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}