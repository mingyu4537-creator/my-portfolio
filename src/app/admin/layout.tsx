export const dynamic = 'force-dynamic';

import Sidebar from '@/components/admin/Sidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
      <Sidebar />
      <main className="flex-1 p-4 lg:p-8 pt-16 lg:pt-8">
        {children}
      </main>
    </div>
  );
}
