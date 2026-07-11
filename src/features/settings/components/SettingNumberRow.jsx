import { useState } from "react";
import { Check, X } from "lucide-react"; // Tambah icon X

export default function SettingNumberRow({
  icon: Icon,
  title,
  subtitle,
  value,
  settingKey,
  iconColorClass,
  focusColorClass,
  onSave,
}) {
  const [localVal, setLocalVal] = useState(value);
  const isEdited = Number(localVal) !== Number(value);

  const handleSave = () => {
    const finalValue = localVal === "" ? 0 : Number(localVal);
    onSave(settingKey, finalValue);
  };

  const handleCancel = () => {
    setLocalVal(value); // Balikin ke nilai asli dari props
  };

  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-slate-800/50 rounded-lg">
          <Icon className={`w-4 h-4 ${iconColorClass}`} />
        </div>
        <div className="space-y-0.5">
          <p className="text-sm font-medium text-slate-200">{title}</p>
          <p className="text-[11px] text-slate-500">{subtitle}</p>
        </div>
      </div>
      
      <div className="flex items-center space-x-1">
        <input
          type="number"
          min="0"
          value={localVal}
          onFocus={(e) => e.target.select()}
          onChange={(e) => setLocalVal(e.target.value)}
          className={`w-16 px-2 py-1.5 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-sm font-semibold focus:outline-none transition-colors ${focusColorClass}`}
        />

        {/* Kalau lagi diedit, munculin dua tombol: Save dan Cancel */}
        {isEdited && (
          <div className="flex items-center space-x-1">
            <button 
              onClick={handleCancel}
              className="p-2 bg-red-500/10 text-red-400 rounded-xl hover:bg-red-500/20 transition-all active:scale-90"
            >
              <X className="w-4 h-4" />
            </button>
            <button 
              onClick={handleSave}
              className="p-2 bg-emerald-500/20 text-emerald-400 rounded-xl hover:bg-emerald-500/30 transition-all active:scale-90"
            >
              <Check className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}