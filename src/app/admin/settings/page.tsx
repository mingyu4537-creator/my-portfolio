'use client';

import { useEffect, useState } from 'react';
import { Save } from 'lucide-react';
import FileUploader from '@/components/admin/FileUploader';

export default function SettingsPage() {
  const [config, setConfig] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch('/api/settings')
      .then((res) => res.json())
      .then((data) => {
        setConfig(data);
        setLoading(false);
      });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    await fetch('/api/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(config),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const updateField = (key: string, value: string) => {
    setConfig({ ...config, [key]: value });
  };

  if (loading) return <div className="text-center py-20 text-gray-500">로딩 중...</div>;

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">사이트 설정</h1>

      <div className="space-y-6">
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
          <h2 className="font-semibold">기본 정보</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">이름</label>
              <input value={config.name || ''} onChange={(e) => updateField('name', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 outline-none focus:ring-2 focus:ring-primary-500" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">직함</label>
              <input value={config.title || ''} onChange={(e) => updateField('title', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 outline-none focus:ring-2 focus:ring-primary-500" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">이메일</label>
            <input value={config.email || ''} onChange={(e) => updateField('email', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 outline-none focus:ring-2 focus:ring-primary-500" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">자기소개</label>
            <textarea value={config.bio || ''} onChange={(e) => updateField('bio', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 outline-none focus:ring-2 focus:ring-primary-500 resize-y" rows={4} />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
          <h2 className="font-semibold">소셜 링크</h2>
          <div>
            <label className="block text-sm font-medium mb-1.5">GitHub</label>
            <input value={config.github || ''} onChange={(e) => updateField('github', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 outline-none focus:ring-2 focus:ring-primary-500" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">LinkedIn</label>
            <input value={config.linkedin || ''} onChange={(e) => updateField('linkedin', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 outline-none focus:ring-2 focus:ring-primary-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
          <h2 className="font-semibold">프로필 사진</h2>
          {config.profile_image && (
            <img src={config.profile_image} alt="프로필" className="w-24 h-24 rounded-full object-cover" />
          )}
          <FileUploader
            onFilesUploaded={(files) => {
              if (files.length > 0) updateField('profile_image', files[files.length - 1].file_url);
            }}
            bucket="profile"
            maxFiles={1}
          />
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
          <h2 className="font-semibold">이력서</h2>
          {config.resume_url && (
            <a href={config.resume_url} target="_blank" className="text-primary-600 text-sm underline">현재 이력서 보기</a>
          )}
          <FileUploader
            onFilesUploaded={(files) => {
              if (files.length > 0) updateField('resume_url', files[files.length - 1].file_url);
            }}
            bucket="resume"
            maxFiles={1}
          />
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-6 py-2.5 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white font-medium rounded-lg transition"
        >
          <Save className="w-4 h-4" />
          {saving ? '저장 중...' : saved ? '저장 완료!' : '저장'}
        </button>
      </div>
    </div>
  );
}
