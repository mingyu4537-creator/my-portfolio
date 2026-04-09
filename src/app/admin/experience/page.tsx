'use client';

import { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import type { Experience } from '@/types';

export default function ExperiencePage() {
  const [items, setItems] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState({ company: '', role: '', period: '', description: '', highlights: '' });

  const fetchData = async () => {
    const res = await fetch('/api/experience');
    setItems(await res.json());
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const resetForm = () => {
    setForm({ company: '', role: '', period: '', description: '', highlights: '' });
    setEditing(null);
  };

  const startEdit = (item: Experience) => {
    setForm({
      company: item.company,
      role: item.role,
      period: item.period,
      description: item.description || '',
      highlights: item.highlights?.join(', ') || '',
    });
    setEditing(item.id);
  };

  const handleSave = async () => {
    const payload = {
      ...form,
      highlights: form.highlights.split(',').map((s) => s.trim()).filter(Boolean),
      ...(editing && editing !== 'new' ? { id: editing } : {}),
    };

    const method = editing === 'new' ? 'POST' : 'PUT';
    await fetch('/api/experience', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    resetForm();
    fetchData();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('삭제하시겠습니까?')) return;
    await fetch('/api/experience', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    fetchData();
  };

  if (loading) return <div className="text-center py-20 text-gray-500">로딩 중...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">경력 관리</h1>
        <button
          onClick={() => { resetForm(); setEditing('new'); }}
          className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium transition"
        >
          <Plus className="w-4 h-4" /> 추가
        </button>
      </div>

      {editing && (
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 mb-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <input placeholder="회사명 *" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })}
              className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 outline-none focus:ring-2 focus:ring-primary-500" />
            <input placeholder="직책 *" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}
              className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 outline-none focus:ring-2 focus:ring-primary-500" />
            <input placeholder="기간 (예: 2023.03 - 현재)" value={form.period} onChange={(e) => setForm({ ...form, period: e.target.value })}
              className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 outline-none focus:ring-2 focus:ring-primary-500" />
          </div>
          <textarea placeholder="설명" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 outline-none focus:ring-2 focus:ring-primary-500 resize-y" rows={2} />
          <input placeholder="주요 성과 (쉼표 구분)" value={form.highlights} onChange={(e) => setForm({ ...form, highlights: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 outline-none focus:ring-2 focus:ring-primary-500" />
          <div className="flex gap-2">
            <button onClick={handleSave} className="flex items-center gap-1.5 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm">
              <Save className="w-4 h-4" /> 저장
            </button>
            <button onClick={resetForm} className="flex items-center gap-1.5 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm hover:bg-gray-50 dark:hover:bg-gray-800">
              <X className="w-4 h-4" /> 취소
            </button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold">{item.company}</h3>
                <p className="text-sm text-gray-500">{item.role} · {item.period}</p>
                {item.description && <p className="text-sm mt-2 text-gray-600 dark:text-gray-400">{item.description}</p>}
                {item.highlights?.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {item.highlights.map((h, i) => (
                      <span key={i} className="px-2 py-0.5 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded text-xs">{h}</span>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex gap-1">
                <button onClick={() => startEdit(item)} className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
                  <Edit className="w-4 h-4 text-gray-400" />
                </button>
                <button onClick={() => handleDelete(item.id)} className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded">
                  <Trash2 className="w-4 h-4 text-red-400" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
