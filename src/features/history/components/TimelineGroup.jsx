import TimeLine from "./TimeLine";

export default function TimelineGroup({ date, items }) {
  return (
    <div className="mb-6 relative">
      <div className="sticky top-0 z-20 py-2 bg-slate-950/90 backdrop-blur-md mb-2 -mx-2 px-2 rounded-lg">
        <h3 className="text-xs font-bold text-teal-500 uppercase tracking-widest flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-teal-500/50"></span>
          {date}
        </h3>
      </div>
      
      <div className="pl-1 mt-3">
        {items.map((item, index) => (
          <TimeLine 
            key={item.id} 
            item={item} 
            isFirst={index === 0} // Tambah ini bang
            isLast={index === items.length - 1} 
          />
        ))}
      </div>
    </div>
  );
}