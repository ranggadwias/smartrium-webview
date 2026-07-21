import { useState, useEffect } from "react";
import { Clock, Plus, AlertTriangle, CheckCircle2 } from "lucide-react";
import { ref, set } from "firebase/database";
import { db } from "../../config/firebase";
import PageHeader from "../../components/PageHeader";
import TimeModal from "./components/TimeModal";
import ScheduleCard from "./components/ScheduleCard";

export default function SchedulePage({ data }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState("08:00");
  const [editingSlot, setEditingSlot] = useState(null);

  const [loading, setLoading] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [toastMsg, setToastMsg] = useState("");

  const schedsData = data?.schedules || {};
  const schedule1 = schedsData.schedule1;
  const schedule2 = schedsData.schedule2;

  const schedules = [];
  if (schedule1?.isActive)
    schedules.push({ id: "schedule1", label: "Pakan Slot 1", ...schedule1 });
  if (schedule2?.isActive)
    schedules.push({ id: "schedule2", label: "Pakan Slot 2", ...schedule2 });

  const formatTime = (h, m) =>
    `${String(h || 0).padStart(2, "0")}:${String(m || 0).padStart(2, "0")}`;

  useEffect(() => {
    if (toastMsg) {
      const timer = setTimeout(() => setToastMsg(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMsg]);

  const handleOpenModal = (
    slotId = null,
    currentHour = 8,
    currentMinute = 0,
  ) => {
    setEditingSlot(slotId);
    setSelectedTime(formatTime(currentHour, currentMinute));
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    setLoading(true);
    const [hour, minute] = selectedTime.split(":").map(Number);

    let targetSlot =
      editingSlot ||
      (!schedules.find((s) => s.id === "schedule1")
        ? "schedule1"
        : "schedule2");

    try {
      await set(ref(db, `aquarium/schedules/${targetSlot}`), {
        hour,
        minute,
        isActive: true,
      });
      setIsModalOpen(false);
      setToastMsg(
        editingSlot ? "Jadwal berhasil diubah!" : "Jadwal baru ditambahkan!",
      );
    } catch (error) {
      console.error("Gagal menyimpan jadwal:", error);
    }
    setLoading(false);
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    const targetData = schedsData[deleteTarget];
    try {
      await set(ref(db, `aquarium/schedules/${deleteTarget}`), {
        hour: targetData?.hour || 0,
        minute: targetData?.minute || 0,
        isActive: false,
      });
      setDeleteTarget(null);
      setToastMsg("Jadwal berhasil dinonaktifkan!");
    } catch (error) {
      console.error("Gagal menonaktifkan jadwal:", error);
    }
  };

  return (
    <div className="w-full text-slate-100 pb-10">
      <PageHeader title="Schedule" />

      <div className="px-6 mt-6 max-w-md mx-auto space-y-6 relative">
        {/* Toast Notifikasi */}
        {toastMsg && (
          <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 flex items-center space-x-2 bg-emerald-950/90 border border-emerald-500/30 text-emerald-400 px-4 py-2.5 rounded-full shadow-xl backdrop-blur-md animate-fade-in-down">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span className="text-xs font-bold whitespace-nowrap">
              {toastMsg}
            </span>
          </div>
        )}

        {/* Header List */}
        <div className="flex items-center space-x-2">
          <span className="h-px w-4 bg-teal-500/50"></span>
          <h2 className="text-[11px] font-bold tracking-widest text-teal-400 uppercase">
            Automasi Pakan
          </h2>
        </div>

        {/* List Jadwal */}
        <div className="space-y-4">
          {schedules.length === 0 ? (
            <div className="text-center p-8 bg-slate-900/40 border border-slate-800/60 border-dashed rounded-2xl backdrop-blur-md">
              <Clock className="w-8 h-8 text-slate-600 mx-auto mb-3" />
              <p className="text-sm font-semibold text-slate-400">
                Belum ada jadwal pakan.
              </p>
              <p className="text-[11px] text-slate-500 mt-1">
                Ikan lu masih nunggu disuapin manual.
              </p>
            </div>
          ) : (
            schedules.map((sched) => (
              <ScheduleCard
                key={sched.id}
                sched={sched}
                formatTime={formatTime}
                onEdit={handleOpenModal}
                onDelete={setDeleteTarget}
              />
            ))
          )}
        </div>

        {/* Tombol Tambah */}
        {schedules.length < 2 && (
          <button
            onClick={() => handleOpenModal(null)}
            className="w-full flex items-center justify-center space-x-2 py-4 bg-slate-900/50 hover:bg-teal-500/10 border border-slate-700 hover:border-teal-500/40 border-dashed rounded-2xl text-slate-300 hover:text-teal-400 text-xs font-bold tracking-wide transition-all duration-300 group"
          >
            <div className="p-1 bg-slate-800 group-hover:bg-teal-500/20 rounded-md transition-colors">
              <Plus className="w-4 h-4" />
            </div>
            <span>Tambah Jadwal ({2 - schedules.length} Tersisa)</span>
          </button>
        )}
      </div>

      {/* Komponen Modal Edit/Add Jam */}
      <TimeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        time={selectedTime}
        setTime={setSelectedTime}
        isEditing={!!editingSlot}
        isLoading={loading}
      />

      {/* MODAL KONFIRMASI HAPUS */}
      {deleteTarget && (
        <div className="fixed inset-0 z-110 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-xs rounded-3xl p-6 text-center shadow-2xl">
            <div className="w-14 h-14 bg-rose-500/10 border border-rose-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-6 h-6 text-rose-400" />
            </div>
            <h3 className="text-base font-bold text-slate-100 mb-1">
              Nonaktifkan Jadwal?
            </h3>
            <p className="text-[11px] text-slate-400 mb-6 leading-relaxed">
              Jadwal ini akan dimatikan. Ikan tidak akan dapet makan otomatis di
              jam ini.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setDeleteTarget(null)}
                className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-xl transition-colors"
              >
                Batal
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 py-3 bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold rounded-xl transition-colors shadow-lg shadow-rose-500/20"
              >
                Ya, Matikan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
