'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ProjectForm from '@/components/admin/ProjectForm';

export default function EditProjectPage() {
  const params = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/projects/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        setProject(data);
        setLoading(false);
      });
  }, [params.id]);

  if (loading) return <div className="text-center py-20 text-gray-500">로딩 중...</div>;
  if (!project) return <div className="text-center py-20 text-red-500">프로젝트를 찾을 수 없습니다.</div>;

  return <ProjectForm project={project} isEdit />;
}
