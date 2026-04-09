'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Edit, Trash2, Star, ExternalLink } from 'lucide-react';
import type { Project } from '@/types';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    const res = await fetch('/api/projects');
    const data = await res.json();
    setProjects(data);
    setLoading(false);
  };

  useEffect(() => { fetchProjects(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;
    await fetch(`/api/projects/${id}`, { method: 'DELETE' });
    fetchProjects();
  };

  if (loading) return <div className="text-center py-20 text-gray-500">로딩 중...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">프로젝트 관리</h1>
        <Link
          href="/admin/projects/new"
          className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium transition"
        >
          <Plus className="w-4 h-4" /> 새 프로젝트
        </Link>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <p>등록된 프로젝트가 없습니다.</p>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-800 text-left text-sm text-gray-500">
                <th className="px-4 py-3">제목</th>
                <th className="px-4 py-3 hidden sm:table-cell">카테고리</th>
                <th className="px-4 py-3 hidden md:table-cell">기술스택</th>
                <th className="px-4 py-3 text-center">주요</th>
                <th className="px-4 py-3 text-right">관리</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id} className="border-b border-gray-100 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800/30">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {project.thumbnail_url && (
                        <img src={project.thumbnail_url} alt="" className="w-10 h-10 rounded object-cover" />
                      )}
                      <span className="font-medium">{project.title}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-xs">
                      {project.category || '-'}
                    </span>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <div className="flex flex-wrap gap-1">
                      {project.tech_stack?.slice(0, 3).map((t) => (
                        <span key={t} className="px-1.5 py-0.5 bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded text-xs">
                          {t}
                        </span>
                      ))}
                      {(project.tech_stack?.length || 0) > 3 && (
                        <span className="text-xs text-gray-400">+{project.tech_stack.length - 3}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    {project.is_featured && <Star className="w-4 h-4 text-yellow-500 mx-auto fill-yellow-500" />}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      {project.live_url && (
                        <a href={project.live_url} target="_blank" className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
                          <ExternalLink className="w-4 h-4 text-gray-400" />
                        </a>
                      )}
                      <Link href={`/admin/projects/${project.id}/edit`} className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
                        <Edit className="w-4 h-4 text-gray-400" />
                      </Link>
                      <button onClick={() => handleDelete(project.id)} className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded">
                        <Trash2 className="w-4 h-4 text-red-400" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
