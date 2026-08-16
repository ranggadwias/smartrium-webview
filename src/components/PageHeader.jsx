import { ChevronLeft } from "lucide-react";

export default function PageHeader({ title, onBack }) {
  return (
    <header className="sticky top-0 z-50 w-full shrink-0 backdrop-blur-xl bg-white/70 border-b border-white/80 shadow-xs px-6 h-20 flex items-center transition-all">
      {onBack && (
        <button 
          onClick={onBack} 
          className="mr-4 p-2.5 rounded-2xl bg-white/80 backdrop-blur-md hover:bg-white border border-slate-200 shadow-xs transition-all flex items-center justify-center group"
        >
          <ChevronLeft className="w-5 h-5 text-sky-600 group-hover:-translate-x-0.5 transition-transform" />
        </button>
      )}
      
      <h1 className="text-xl font-bold text-slate-800 tracking-wide">
        {title}
      </h1>
    </header>
  );
}