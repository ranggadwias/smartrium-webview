import { Fish, Droplet, Clock } from "lucide-react";

const formatTime = (jadwal) => {
  if (!jadwal?.isActive) return "--:--";
  const h = String(jadwal.hour || 0).padStart(2, "0");
  const m = String(jadwal.minute || 0).padStart(2, "0");
  return `${h}:${m}`;
};

const getSesiWaktu = (jadwal) => {
  if (!jadwal?.isActive) return "Off";
  const jam = jadwal.hour;
  if (jam >= 4 && jam <= 10) return "Pagi";
  if (jam >= 11 && jam <= 14) return "Siang";
  if (jam >= 15 && jam <= 18) return "Sore";
  return "Malam";
};

export default function StatusSection({ data }) {
  const isJadwal1Active = data?.schedules?.schedule1?.isActive === true;
  const isJadwal2Active = data?.schedules?.schedule2?.isActive === true;

  return (
    <section className="space-y-4">
      <div className="flex justify-between items-center border rounded-2xl px-4 py-3 transition-all duration-300 bg-white/70 backdrop-blur-md shadow-xs border-white/80 text-slate-800">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 bg-sky-50 border border-sky-100 rounded-xl">
            <Clock className="w-4 h-4 text-sky-600" />
          </div>
          <span className="text-xs font-medium text-slate-500">Waktu Alat</span>
        </div>

        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
          <span className="text-xs font-mono font-bold text-sky-600">
            {data?.deviceState?.currentTime ?? "--:--:--"}
          </span>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <span className="h-px w-4 bg-sky-400" />
        <h2 className="text-xs font-bold tracking-widest text-sky-600 uppercase">
          Status Akuarium
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div
          className={`border rounded-2xl p-4 transition-all duration-300 backdrop-blur-md ${
            isJadwal1Active
              ? "bg-linear-to-r from-sky-50/80 to-white/70 border-sky-200/80 shadow-xs shadow-sky-100/50"
              : "bg-white/70 border-white/80 shadow-xs"
          }`}
        >
          <div className="flex justify-between items-start mb-3">
            <span
              className={`p-2.5 rounded-xl transition-colors duration-300 ${isJadwal1Active ? "bg-sky-100 text-sky-600" : "bg-slate-100 text-slate-400"}`}
            >
              <Fish className="w-5 h-5" />
            </span>

            <span
              className={`text-[10px] px-2.5 py-0.5 rounded-full font-medium transition-colors duration-300 ${isJadwal1Active ? "bg-sky-100 text-sky-600" : "bg-slate-100 text-slate-400"}`}
            >
              {getSesiWaktu(data?.schedules?.schedule1)}
            </span>
          </div>

          <p className="text-xs text-slate-500 font-medium">Pakan Pertama</p>

          <p
            className={`text-2xl font-bold tracking-tight mt-1 transition-colors duration-300 ${isJadwal1Active ? "text-sky-600" : "text-slate-400"}`}
          >
            {formatTime(data?.schedules?.schedule1)}
          </p>
        </div>

        <div
          className={`border rounded-2xl p-4 transition-all duration-300 backdrop-blur-md ${
            isJadwal2Active
              ? "bg-linear-to-r from-amber-50/80 to-white/70 border-amber-200/80 shadow-xs shadow-amber-100/50"
              : "bg-white/70 border-white/80 shadow-xs"
          }`}
        >
          <div className="flex justify-between items-start mb-3">
            <span
              className={`p-2.5 rounded-xl transition-colors duration-300 ${isJadwal2Active ? "bg-amber-100 text-amber-600" : "bg-slate-100 text-slate-400"}`}
            >
              <Fish className="w-5 h-5" />
            </span>

            <span
              className={`text-[10px] px-2.5 py-0.5 rounded-full font-medium transition-colors duration-300 ${isJadwal2Active ? "bg-amber-100 text-amber-600" : "bg-slate-100 text-slate-400"}`}
            >
              {getSesiWaktu(data?.schedules?.schedule2)}
            </span>
          </div>

          <p className="text-xs text-slate-500 font-medium">Pakan Kedua</p>

          <p
            className={`text-2xl font-bold tracking-tight mt-1 transition-colors duration-300 ${isJadwal2Active ? "text-amber-600" : "text-slate-400"}`}
          >
            {formatTime(data?.schedules?.schedule2)}
          </p>
        </div>
      </div>

      <div
        className={`border rounded-2xl p-4 flex items-center justify-between transition-all duration-300 backdrop-blur-md shadow-xs ${
          data?.deviceState?.turbidity
            ? "bg-white/70 border-white/80"
            : "bg-white/50 border-white/80"
        }`}
      >
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-sky-50 border border-sky-100 rounded-xl text-sky-600">
            <Droplet className="w-5 h-5" />
          </div>

          <div>
            <p className="text-xs text-slate-500 font-medium">Kekeruhan Air</p>

            <div className="text-2xl font-extrabold text-sky-600 tracking-wide mt-0.5">
              {data?.deviceState?.turbidity ?? "---"}
              <span className="text-xs font-normal text-slate-400 ml-1">
                ADC
              </span>
            </div>
          </div>
        </div>

        <span
          className={`text-xs px-3 py-1 rounded-full font-semibold border transition-all duration-300 ${
            data?.deviceState?.waterStatus === "JERNIH"
              ? "bg-emerald-50 text-emerald-600 border-emerald-200"
              : data?.deviceState?.waterStatus === "KOTOR " ||
                data?.deviceState?.waterStatus === "KERUH"
              ? "bg-rose-50 text-rose-600 border-rose-200 animate-pulse"
              : "bg-slate-100 text-slate-500 border-slate-200"
          }`}
        >
          {data?.deviceState?.waterStatus ?? "MEMUAT"}
        </span>
      </div>
    </section>
  );
}