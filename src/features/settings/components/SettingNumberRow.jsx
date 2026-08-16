import { useState } from "react";
import { Check, X } from "lucide-react";

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
  const [prevValue, setPrevValue] = useState(value); 

  if (value !== prevValue) {
    setPrevValue(value);
    setLocalVal(value);
  }

  const isEdited = Number(localVal) !== Number(value);

  const handleSave = () => {
    const finalValue = localVal === "" ? 0 : Number(localVal);
    onSave(settingKey, finalValue);
  };

  const handleCancel = () => {
    setLocalVal(value); 
  };

  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex items-center space-x-3">
        <div className="p-2.5 bg-slate-100 rounded-xl">
          <Icon className={`w-4 h-4 ${iconColorClass}`} />
        </div>
        <div className="space-y-0.5">
          <p className="text-sm font-semibold text-slate-800">{title}</p>
          <p className="text-[11px] text-slate-400">{subtitle}</p>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <input
          type="number"
          min="0"
          value={localVal}
          onFocus={(e) => e.target.select()}
          onChange={(e) => setLocalVal(e.target.value)}
          className={`w-16 px-2.5 py-1.5 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm font-bold focus:outline-none transition-colors shadow-xs ${focusColorClass}`}
        />

        {isEdited && (
          <div className="flex items-center space-x-1">
            <button 
              onClick={handleCancel}
              className="p-2 bg-rose-50 text-rose-600 border border-rose-200 rounded-xl hover:bg-rose-100 transition-all active:scale-90 shadow-xs"
            >
              <X className="w-4 h-4" />
            </button>
            <button 
              onClick={handleSave}
              className="p-2 bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-xl hover:bg-emerald-100 transition-all active:scale-90 shadow-xs"
            >
              <Check className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}