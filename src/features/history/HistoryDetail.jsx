import PageHeader from "../../components/PageHeader";
import TimelineGroup from "./components/TimelineGroup";

export default function HistoryDetail({ title, data, onBack }) {
  const groupedData = data.reduce((acc, curr) => {
    if (!acc[curr.date]) acc[curr.date] = [];
    acc[curr.date].push(curr);
    return acc;
  }, {});

  return (
    <div className="w-full text-slate-100 pb-10">
      <PageHeader title={title} onBack={onBack} />

      <div className="px-6 mt-6">
        {Object.keys(groupedData).length > 0 ? (
          Object.keys(groupedData).map((date) => (
            <TimelineGroup key={date} date={date} items={groupedData[date]} />
          ))
        ) : (
          <div className="text-center mt-20 text-slate-500 text-sm">
            Belum ada riwayat tercatat.
          </div>
        )}
      </div>
    </div>
  );
}
