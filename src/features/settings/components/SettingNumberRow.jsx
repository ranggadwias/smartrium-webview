export default function SettingNumberRow({
  icon: Icon,
  title,
  subtitle,
  value,
  settingKey,
  iconColorClass,
  focusColorClass,
  onChange, // Buat ngetik lokal
  onSave,   // Buat tembak DB pas beres
}) {
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
      
      <input
        type="number"
        min="0" // Cegah minus dari UI bawaan browser
        value={value ?? ""}
        onFocus={(e) => e.target.select()}
        onChange={(e) => {
          const val = e.target.value;
          // Cegah user iseng ngetik minus manual
          if (val !== "" && Number(val) < 0) return;
          onChange(settingKey, val === "" ? "" : Number(val));
        }}
        onBlur={(e) => {
          const val = e.target.value;
          // Kalau pas ditinggal inputnya kosong atau minus, paksa jadi 0 dan tembak DB
          const finalValue = val === "" || Number(val) < 0 ? 0 : Number(val);
          onSave(settingKey, finalValue);
        }}
        className={`w-16 px-2 py-1.5 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-sm font-semibold focus:outline-none transition-colors ${focusColorClass}`}
      />
    </div>
  );
}