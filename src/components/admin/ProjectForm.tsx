'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import FileUploader from './FileUploader';
import MarkdownEditor from './MarkdownEditor';
import { CATEGORIES } from '@/lib/constants';
import type { Project } from '@/types';
import { Save, ArrowLeft } from 'lucide-react';

interface ProjectFormProps {
  project?: Project & { files?: { file_name: string; file_url: string; file_type: string; file_size: number }[] };
  isEdit?: boolean;
}

export default function ProjectForm({ project, isEdit }: ProjectFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: project?.title || '',
    description: project?.description || '',
    detail: project?.detail || '',
    category: project?.category || '',
    tech_stack: project?.tech_stack?.join(', ') || '',
    thumbnail_url: project?.thumbnail_url || '',
    github_url: project?.github_url || '',
    live_url: project?.live_url || '',
    is_featured: project?.is_featured || false,
    sort_order: project?.sort_order || 0,
  });
  const [files, setFiles] = useState<{ file_name: string; file_url: string; file_type: string; file_size: number }[]>(
    project?.files?.map((f) => ({
      file_name: f.file_name,
      file_url: f.file_url,
      file_type: f.file_type,
      file_size: f.file_size || 0,
    })) || []
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      ...form,
      tech_stack: form.tech_stack.split(',').map((s) => s.trim()).filter(Boolean),
      files,
    };

    const url = isEdit ? `/api/projects/${project?.id}` : '/api/projects';
    const method = isEdit ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      router.push('/admin/projects');
      router.refresh();
    } else {
      alert('저장에 실패했습니다.');
      setSaving(false);
    }
  };

  const handleThumbnailUpload = (uploaded: { file_url: string }[]) => {
    if (uploaded.length > 0) {
      setForm({ ...form, thumbnail_url: uploaded[uploaded.length - 1].file_url });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <button type="button" onClick={() => router.back()} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-bold">{isEdit ? '프로젝트 수정' : '새 프로젝트'}</h1>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 space-y-5">
        <div>
          <label className="block text-sm font-medium mb-1.5">제목 *</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 outline-none focus:ring-2 focus:ring-primary-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">간단 설명</label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 outline-none focus:ring-2 focus:ring-primary-500 resize-y"
            rows={2}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1.5">카테고리</label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">선택</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">정렬 순서</label>
            <input
              type="number"
              value={form.sort_order}
              onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">기술 스택 (쉼표 구분)</label>
          <input
            type="text"
            value={form.tech_stack}
            onChange={(e) => setForm({ ...form, tech_stack: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="React, TypeScript, Tailwind CSS"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1.5">GitHub URL</label>
            <input
              type="url"
              value={form.github_url}
              onChange={(e) => setForm({ ...form, github_url: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">라이브 URL</label>
            <input
              type="url"
              value={form.live_url}
              onChange={(e) => setForm({ ...form, live_url: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="featured"
            checked={form.is_featured}
            onChange={(e) => setForm({ ...form, is_featured: e.target.checked })}
            className="rounded"
          />
          <label htmlFor="featured" className="text-sm">메인 페이지에 노출</label>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
        <h2 className="font-semibold">썸네일 이미지</h2>
        {form.thumbnail_url && (
          <img src={form.thumbnail_url} alt="썸네일" className="w-40 h-28 object-cover rounded-lg" />
        )}
        <FileUploader
          onFilesUploaded={handleThumbnailUpload}
          bucket="thumbnails"
          maxFiles={1}
        />
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
        <h2 className="font-semibold">프로젝트 파일</h2>
        <FileUploader
          onFilesUploaded={setFiles}
          existingFiles={files}
          bucket="project-files"
        />
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
        <h2 className="font-semibold">상세 설명 (마크다운)</h2>
        <MarkdownEditor
          value={form.detail}
          onChange={(v) => setForm({ ...form, detail: v })}
        />
      </div>

      <button
        type="submit"
        disabled={saving}
        className="flex items-center gap-2 px-6 py-2.5 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white font-medium rounded-lg transition"
      >
        <Save className="w-4 h-4" />
        {saving ? '저장 중...' : '저장'}
      </button>
    </form>
  );
}
