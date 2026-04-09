'use client';

import { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import type { Skill } from '@/types';

export default function SkillsPage() {
  const [items, setItems] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState({ category: '', name: '', level: 50, icon_name: '' });

  const fetchData = async () => {
    const res = await fetch('/api/skills');
    setItems(await res.json());
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const resetForm = () => {
    setForm({ category: '', name: '', level: 50, icon_name: '' });
    setEditing(null);
  };

  const startEdit = (item: Skill) => {
    setForm({ category: item.category, name: item.name, level: item.level, icon_name: item.icon_name || '' });
    setEditing(item.id);
  };

  const handleSave = async () => {
    const payload = {
      ...form,
      ...(editing && editing !== 'new' ? { id: editing } : {}),
    };

    const method = editing === 'new' ? 'POST' : 'PUT';
    await fetch('/api/skills', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    resetForm();
    fetchData();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('삭제하시겠습니까?')) return;
    await fetch('/api/skills', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    fetchData();
  };

  // 카테고리별 그룹핑
  const grouped = items.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, Skill[]>);

  if (loading) return <div className="text-center py-20 text-gray-500">로딩 중...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">기술 스택 관리</h1>
        <button
          onClick={() => { resetForm(); setEditing('new'); }}
          className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium transition"
        >
          <Plus className="w-4 h-4" /> 추가
        </button>
      </div>

      {editing && (
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 mb-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input placeholder="카테고리 (Frontend, Backend 등)" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 outline-none focus:ring-2 focus:ring-primary-500" />
            <input placeholder="기술명 *" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 outline-none focus:ring-2 focus:ring-primary-500" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">숙련도: {form.level}%</label>
            <input type="range" min={0} max={100} value={form.level} onChange={(e) => setForm({ ...form, level: Number(e.target.value) })}
              className="w-full" />
          </div>
          <input placeholder="아이콘 이름 (선택)" value={form.icon_name} onChange={(e) => setForm({ ...form, icon_name: e.target.value })}
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

      {Object.entries(grouped).map(([category, skills]) => (
        <div key={category} className="mb-6">
          <h2 className="text-lg font-semibold mb-3">{category}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {skills.map((item) => (
              <div key={item.id} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{item.name}</span>
                  <div className="flex gap-1">
                    <button onClick={() => startEdit(item)} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
                      <Edit className="w-3.5 h-3.5 text-gray-400" />
                    </button>
                    <button onClick={() => handleDelete(item.id)} className="p-1 hover:bg-red-50 dark:hover:bg-red-900/20 rounded">
                      <Trash2 className="w-3.5 h-3.5 text-red-400" />
                    </button>
                  </div>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2">
                  <div className="bg-primary-500 h-2 rounded-full" style={{ width: `${item.level}%` }} />
                </div>
                <span className="text-xs text-gray-500 mt-1">{item.level}%</span>
              </div>
            ))}
          </div>
        </div>
      ))}

      {items.length === 0 && (
        <div className="text-center py-20 text-gray-500">등록된 기술 스택이 없습니다.</div>
      )}
    </div>
  );
}
