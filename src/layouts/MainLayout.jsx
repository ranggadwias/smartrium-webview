import { Bell, Home, Calendar, History, Settings } from "lucide-react";

export default function MainLayout({
  children,
  data,
  currentPage,
  setCurrentPage,
}) {
  const getUnreadCount = () => {
    if (data?.events?.notifications) {
      const notifsArray = Object.values(data.events.notifications);
      const recentNotifs = notifsArray
        .sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0))
        .slice(0, 50);

      return recentNotifs.filter(
        (notif) =>
          notif.isRead === false || notif.isRead === "false" || !notif.isRead
      ).length;
    }
    return 0;
  };

  const unreadCount = getUnreadCount();

  return (
    <div className="min-h-screen bg-slate-100/60 text-slate-800 font-sans pb-32 selection:bg-sky-500/20 relative overflow-hidden">
      
      {/* Background Ambient Glows for Glassmorphism Depth */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-lg h-128 bg-sky-400/10 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute bottom-1/4 right-12 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl pointer-events-none -z-10"></div>

      {/* HEADER UTAMA */}
      {currentPage === "dashboard" && (
        <header className="sticky top-0 z-50 w-full shrink-0 backdrop-blur-2xl bg-white/75 border-b border-white/80 shadow-xs px-6 h-20 flex justify-between items-center transition-all">
          <div>
            <h1 className="text-xl font-black tracking-tight bg-linear-to-r from-sky-600 to-indigo-600 bg-clip-text text-transparent">
              Smartrium
            </h1>
          </div>

          {/* TOMBOL LONCENG NOTIFIKASI */}
          <button
            onClick={() => setCurrentPage("notifications")}
            className="relative p-2.5 bg-white/80 backdrop-blur-md shadow-xs rounded-2xl border border-white/90 hover:border-sky-300 hover:bg-white transition-all duration-300 group"
          >
            <Bell className="w-5 h-5 text-sky-600 group-hover:scale-105 transition-transform" />

            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
              </span>
            )}
          </button>
        </header>
      )}

      {/* CONTENT */}
      <main className="w-full">{children}</main>

      {/* NAVBAR BAWAH (Floating Glass Nav) */}
      {currentPage !== "notifications" && (
        <nav className="fixed bottom-5 left-4 right-4 z-50 max-w-md mx-auto backdrop-blur-2xl bg-white/85 border border-white/90 px-4 py-2.5 flex justify-between items-center shadow-xl shadow-slate-300/40 rounded-3xl">
          
          {/* TOMBOL DASHBOARD */}
          <button
            onClick={() => setCurrentPage("dashboard")}
            className={`flex flex-col items-center py-2 px-3 rounded-2xl transition-all duration-300 ${
              currentPage === "dashboard"
                ? "text-sky-600 bg-sky-50/90 shadow-xs scale-105 font-bold"
                : "text-slate-400 hover:text-slate-600 font-medium"
            }`}
          >
            <Home className="w-5 h-5 mb-0.5" />
            <span className="text-[10px]">Dashboard</span>
          </button>

          {/* TOMBOL SCHEDULE */}
          <button
            onClick={() => setCurrentPage("schedule")}
            className={`flex flex-col items-center py-2 px-3 rounded-2xl transition-all duration-300 ${
              currentPage === "schedule"
                ? "text-sky-600 bg-sky-50/90 shadow-xs scale-105 font-bold"
                : "text-slate-400 hover:text-slate-600 font-medium"
            }`}
          >
            <Calendar className="w-5 h-5 mb-0.5" />
            <span className="text-[10px]">Schedule</span>
          </button>

          {/* TOMBOL HISTORY */}
          <button
            onClick={() => setCurrentPage("history")}
            className={`flex flex-col items-center py-2 px-3 rounded-2xl transition-all duration-300 ${
              currentPage === "history"
                ? "text-sky-600 bg-sky-50/90 shadow-xs scale-105 font-bold"
                : "text-slate-400 hover:text-slate-600 font-medium"
            }`}
          >
            <History className="w-5 h-5 mb-0.5" />
            <span className="text-[10px]">History</span>
          </button>

          {/* TOMBOL SETTINGS */}
          <button
            onClick={() => setCurrentPage("settings")}
            className={`flex flex-col items-center py-2 px-3 rounded-2xl transition-all duration-300 ${
              currentPage === "settings"
                ? "text-sky-600 bg-sky-50/90 shadow-xs scale-105 font-bold"
                : "text-slate-400 hover:text-slate-600 font-medium"
            }`}
          >
            <Settings className="w-5 h-5 mb-0.5" />
            <span className="text-[10px]">Settings</span>
          </button>
        </nav>
      )}
    </div>
  );
}