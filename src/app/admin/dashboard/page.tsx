export const dynamic = 'force-dynamic';

import { createClient } from '@/lib/supabase/server';
import { FolderOpen, Briefcase, Zap, FileText } from 'lucide-react';

export default async function DashboardPage() {
  const supabase = createClient();

  const [projects, experiences, skills, files] = await Promise.all([
    supabase.from('projects').select('id', { count: 'exact', head: true }),
    supabase.from('experiences').select('id', { count: 'exact', head: true }),
    supabase.from('skills').select('id', { count: 'exact', head: true }),
    supabase.from('project_files').select('id', { count: 'exact', head: true }),
  ]);

  const stats = [
    { label: '프로젝트', count: projects.count ?? 0, icon: FolderOpen, color: 'bg-blue-500' },
    { label: '경력', count: experiences.count ?? 0, icon: Briefcase, color: 'bg-green-500' },
    { label: '기술 스택', count: skills.count ?? 0, icon: Zap, color: 'bg-yellow-500' },
    { label: '첨부파일', count: files.count ?? 0, icon: FileText, color: 'bg-purple-500' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">대시보드</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white dark:bg-gray-900 rounded-xl p-5 border border-gray-200 dark:border-gray-800"
          >
            <div className="flex items-center gap-4">
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.count}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
