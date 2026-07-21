import { useState, useEffect } from "react";
import { ref, onValue, set } from "firebase/database";
import { db } from "../../config/firebase";
import PageHeader from "../../components/PageHeader";
import SettingNumberRow from "./components/SettingNumberRow";
import { Activity, Droplets, Fish, Settings2 } from "lucide-react";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    turbidityThreshold: 0,
    drainDuration: 0,
    fillDuration: 0,
    feedDuration: 0,
    isAutoClean: true,
  });

  const settingConfigs = [
    {
      key: "turbidityThreshold",
      icon: Activity,
      title: "Batas Kekeruhan",
      subtitle: "Nilai ADC sensor",
      iconColorClass: "text-sky-400",
      focusColorClass: "focus:border-sky-500",
    },
    {
      key: "drainDuration",
      icon: Droplets,
      title: "Durasi Buang (detik)",
      subtitle: "Lama pompa buang nyala",
      iconColorClass: "text-amber-400",
      focusColorClass: "focus:border-amber-500",
    },
    {
      key: "fillDuration",
      icon: Droplets,
      title: "Durasi Isi (detik)",
      subtitle: "Lama pompa isi nyala",
      iconColorClass: "text-blue-400",
      focusColorClass: "focus:border-blue-500",
    },
    {
      key: "feedDuration",
      icon: Fish,
      title: "Durasi Pakan (detik)",
      subtitle: "Lama katup servo buka",
      iconColorClass: "text-orange-400",
      focusColorClass: "focus:border-orange-500",
    },
  ];

  useEffect(() => {
    const settingsRef = ref(db, "aquarium/settings");
    const unsubscribe = onValue(settingsRef, (snapshot) => {
      if (snapshot.exists()) setSettings(snapshot.val());
    });
    return () => unsubscribe();
  }, []);

  const saveToFirebase = async (key, value) => {
    try {
      await set(ref(db, `aquarium/settings/${key}`), value);
    } catch (error) {
      console.error("Gagal simpan:", error);
    }
  };

  return (
    <div className="w-full text-slate-100 pb-10">
      <PageHeader title="Settings" />
      <div className="px-6 mt-6 max-w-md mx-auto space-y-6 relative">
        <div className="flex items-center space-x-2">
          <span className="h-px w-4 bg-sky-500/50"></span>
          <h2 className="text-[11px] font-bold tracking-widest text-sky-400 uppercase">
            Parameter Perangkat
          </h2>
        </div>

        <div className="bg-slate-900/40 border border-slate-800/60 rounded-2xl p-4 space-y-2 divide-y divide-slate-800/50 backdrop-blur-md">
          {settingConfigs.map((cfg) => (
            <SettingNumberRow
              key={cfg.key}
              icon={cfg.icon}
              title={cfg.title}
              subtitle={cfg.subtitle}
              value={settings[cfg.key]}
              settingKey={cfg.key}
              iconColorClass={cfg.iconColorClass}
              focusColorClass={cfg.focusColorClass}
              onSave={saveToFirebase}
            />
          ))}
        </div>

        <div className="flex items-center space-x-2 pt-2">
          <span className="h-px w-4 bg-emerald-500/50"></span>
          <h2 className="text-[11px] font-bold tracking-widest text-emerald-400 uppercase">
            Sistem Automasi
          </h2>
        </div>

        <div className="bg-slate-900/40 border border-slate-800/60 rounded-2xl p-4 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-slate-800/50 rounded-lg">
                <Settings2 className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="space-y-0.5">
                <p className="text-sm font-medium text-slate-200">
                  Kuras Air Otomatis
                </p>
                <p className="text-[11px] text-slate-500">
                  Berdasarkan sensor kekeruhan
                </p>
              </div>
            </div>
            <button
              onClick={() =>
                saveToFirebase("isAutoClean", !settings.isAutoClean)
              }
              className="focus:outline-none transition-all active:scale-95"
            >
              {settings.isAutoClean ? (
                <div className="flex items-center space-x-1 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-xs font-bold uppercase tracking-wider">
                  <span>ON</span>
                  <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"></div>
                </div>
              ) : (
                <div className="flex items-center space-x-1 px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-xl text-slate-400 text-xs font-bold uppercase tracking-wider">
                  <span>OFF</span>
                  <div className="w-2 h-2 rounded-full bg-slate-500"></div>
                </div>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
