import { Bell, Home, Calendar, History, Settings } from "lucide-react";

export default function MainLayout({
  children,
  data,
  currentPage,
  setCurrentPage,
}) {

  // REFACTOR: Hitung jumlah unread secara dinamis langsung dari props data aquarium
  const getUnreadCount = () => {
    if (data?.aquarium_notifications) {
      // 1. Ubah object jadi array
      const notifsArray = Object.values(data.aquarium_notifications);

      // 2. Urutkan berdasarkan waktu terbaru, lalu potong ambil 50 aja
      // (Biar sinkron sama batas limit di NotificationPage)
      const recentNotifs = notifsArray
        .sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0))
        .slice(0, 50);

      // 3. Hitung yang belum dibaca (pake !notif biar nangkep false, undefined, atau string "false")
      return recentNotifs.filter(
        (notif) =>
          notif.isRead === false || notif.isRead === "false" || !notif.isRead,
      ).length;
    }
    return 0;
  };

  const unreadCount = getUnreadCount();

  return (
    <div className="min-h-screen bg-linear-to-b from-teal-900 via-slate-950 to-slate-900 text-slate-100 font-sans pb-24 selection:bg-teal-500/30">
      {/* HEADER UTAMA: Sekarang HANYA muncul di halaman dashboard */}
      {currentPage === "dashboard" && (
        <header className="sticky top-0 z-50 w-full shrink-0 backdrop-blur-md bg-slate-950/40 border-b border-teal-500/10 px-6 h-20 flex justify-between items-center animate-fadeIn">
          <div>
            <h1 className="text-xl font-bold tracking-wide text-slate-100">
              Smartrium
            </h1>
          </div>

          {/* TOMBOL LONCENG NOTIFIKASI */}
          <button
            onClick={() => setCurrentPage("notifications")}
            className="relative p-2.5 bg-slate-900/80 rounded-xl border border-teal-500/20 hover:border-teal-500/40 transition-all duration-300"
          >
            <Bell className="w-5 h-5 text-teal-400" />

            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
              </span>
            )}
          </button>
        </header>
      )}

      {/* CONTENT (Halaman fitur akan merender headernya sendiri secara dinamis di sini) */}
      <main className="w-full">{children}</main>

      {/* NAVBAR BAWAH (Otomatis hilang jika di page notifications) */}
      {currentPage !== "notifications" && (
        <nav className="fixed bottom-0 left-0 right-0 z-50 max-w-md mx-auto backdrop-blur-xl bg-slate-950/80 border-t border-slate-800/80 px-6 py-2 flex justify-between items-center shadow-2xl rounded-t-3xl">
          {/* TOMBOL DASHBOARD */}
          <button
            onClick={() => setCurrentPage("dashboard")}
            className={`flex flex-col items-center p-2 transition-colors ${
              currentPage === "dashboard"
                ? "text-sky-400"
                : "text-slate-500 hover:text-slate-300"
            }`}
          >
            <Home className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] font-medium">Dashboard</span>
          </button>

          {/* TOMBOL SCHEDULE */}
          <button
            onClick={() => setCurrentPage("schedule")}
            className={`flex flex-col items-center p-2 transition-colors ${
              currentPage === "schedule"
                ? "text-sky-400"
                : "text-slate-500 hover:text-slate-300"
            }`}
          >
            <Calendar className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] font-medium">Schedule</span>
          </button>

          {/* TOMBOL HISTORY */}
          <button
            onClick={() => setCurrentPage("history")}
            className={`flex flex-col items-center p-2 transition-colors ${
              currentPage === "history"
                ? "text-sky-400"
                : "text-slate-500 hover:text-slate-300"
            }`}
          >
            <History className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] font-medium">History</span>
          </button>

          {/* TOMBOL SETTINGS */}
          <button
            onClick={() => setCurrentPage("settings")}
            className={`flex flex-col items-center p-2 transition-colors ${
              currentPage === "settings"
                ? "text-sky-400"
                : "text-slate-500 hover:text-slate-300"
            }`}
          >
            <Settings className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] font-medium">Settings</span>
          </button>
        </nav>
      )}
    </div>
  );
}
