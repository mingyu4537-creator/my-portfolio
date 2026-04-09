'use client';

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Eye, Edit3 } from 'lucide-react';

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function MarkdownEditor({ value, onChange }: MarkdownEditorProps) {
  const [preview, setPreview] = useState(false);

  return (
    <div className="border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
      <div className="flex items-center gap-1 p-2 border-b border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
        <button
          type="button"
          onClick={() => setPreview(false)}
          className={`flex items-center gap-1.5 px-3 py-1 rounded text-sm ${
            !preview ? 'bg-white dark:bg-gray-700 shadow-sm' : ''
          }`}
        >
          <Edit3 className="w-3.5 h-3.5" /> 편집
        </button>
        <button
          type="button"
          onClick={() => setPreview(true)}
          className={`flex items-center gap-1.5 px-3 py-1 rounded text-sm ${
            preview ? 'bg-white dark:bg-gray-700 shadow-sm' : ''
          }`}
        >
          <Eye className="w-3.5 h-3.5" /> 미리보기
        </button>
      </div>

      {preview ? (
        <div className="p-4 min-h-[200px] prose dark:prose-invert max-w-none">
          <ReactMarkdown>{value || '*내용이 없습니다*'}</ReactMarkdown>
        </div>
      ) : (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full p-4 min-h-[200px] bg-white dark:bg-gray-900 outline-none resize-y font-mono text-sm"
          placeholder="마크다운으로 상세 설명을 작성하세요..."
        />
      )}
    </div>
  );
}
