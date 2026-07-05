import StatusSection from './components/StatusSection';
import QuickAction from './components/QuickAction';
import RecentActivity from './components/RecentActivity';

export default function DashboardPage({ data }) { // <-- Terima data dari App.jsx
  return (
    <main className="p-5 space-y-6 max-w-md mx-auto">
      <StatusSection data={data} />
      <QuickAction data={data} />
      <RecentActivity data={data} />
    </main>
  );
}