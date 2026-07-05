import { ChevronLeft } from "lucide-react";

export default function PageHeader({ title, onBack }) {
  return (
    <header className="sticky top-0 z-50 w-full shrink-0 backdrop-blur-md bg-slate-950/40 border-b border-teal-500/10 px-6 h-20 flex items-center">
      {onBack && (
        <button 
          onClick={onBack} 
          className="mr-4 p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 transition-all flex items-center justify-center"
        >
          <ChevronLeft className="w-5 h-5 text-teal-400" />
        </button>
      )}
      
      <h1 className="text-xl font-bold text-slate-100 tracking-wide">
        {title}
      </h1>
    </header>
  );
}