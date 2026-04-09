'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Download, ChevronLeft, ChevronRight } from 'lucide-react';
import { GithubIcon } from '@/components/ui/SocialIcons';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import type { Project } from '@/types';
import { useState, useEffect } from 'react';

interface ModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectDetailModal({ project, onClose }: ModalProps) {
  const [currentImage, setCurrentImage] = useState(0);
  const [codeContent, setCodeContent] = useState<Record<string, string>>({});

  const images = project?.files?.filter((f) => f.file_type === 'image') || [];
  const codeFiles = project?.files?.filter((f) => f.file_type === 'code') || [];
  const documents = project?.files?.filter((f) => f.file_type === 'document') || [];

  useEffect(() => {
    if (!project) return;
    setCurrentImage(0);
    // 코드 파일 내용 로드
    codeFiles.forEach(async (f) => {
      try {
        const res = await fetch(f.file_url);
        const text = await res.text();
        setCodeContent((prev) => ({ ...prev, [f.id]: text }));
      } catch {
        // 무시
      }
    });
  }, [project]);

  if (!project) return null;

  const getLanguage = (fileName: string) => {
    const ext = fileName.split('.').pop()?.toLowerCase();
    const map: Record<string, string> = {
      js: 'javascript', ts: 'typescript', tsx: 'tsx', jsx: 'jsx',
      py: 'python', java: 'java', cpp: 'cpp', c: 'c',
      html: 'html', css: 'css', json: 'json', md: 'markdown',
    };
    return map[ext || ''] || 'text';
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white dark:bg-gray-900 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* 이미지 갤러리 */}
          {images.length > 0 && (
            <div className="relative aspect-video bg-gray-100 dark:bg-gray-800 rounded-t-2xl overflow-hidden">
              <img
                src={images[currentImage].file_url}
                alt={images[currentImage].file_name}
                className="w-full h-full object-contain"
              />
              {images.length > 1 && (
                <>
                  <button
                    onClick={() => setCurrentImage((p) => (p - 1 + images.length) % images.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-black/50 rounded-full text-white hover:bg-black/70"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setCurrentImage((p) => (p + 1) % images.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-black/50 rounded-full text-white hover:bg-black/70"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                    {images.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentImage(i)}
                        className={`w-2 h-2 rounded-full ${i === currentImage ? 'bg-white' : 'bg-white/50'}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          <div className="p-6 space-y-6">
            {/* 헤더 */}
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold">{project.title}</h2>
                {project.category && (
                  <span className="px-2 py-0.5 bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded text-xs mt-2 inline-block">
                    {project.category}
                  </span>
                )}
              </div>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 기술 스택 */}
            {project.tech_stack?.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {project.tech_stack.map((t) => (
                  <span key={t} className="px-2.5 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-xs font-medium">
                    {t}
                  </span>
                ))}
              </div>
            )}

            {/* 링크 */}
            <div className="flex gap-3">
              {project.github_url && (
                <a href={project.github_url} target="_blank" className="flex items-center gap-1.5 px-4 py-2 bg-gray-900 dark:bg-gray-700 text-white rounded-lg text-sm hover:opacity-90 transition">
                  <GithubIcon className="w-4 h-4" /> GitHub
                </a>
              )}
              {project.live_url && (
                <a href={project.live_url} target="_blank" className="flex items-center gap-1.5 px-4 py-2 bg-primary-600 text-white rounded-lg text-sm hover:bg-primary-700 transition">
                  <ExternalLink className="w-4 h-4" /> Live Demo
                </a>
              )}
            </div>

            {/* 상세 설명 (마크다운) */}
            {project.detail && (
              <div className="prose dark:prose-invert max-w-none">
                <ReactMarkdown>{project.detail}</ReactMarkdown>
              </div>
            )}

            {/* 코드 파일 뷰어 */}
            {codeFiles.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-semibold">코드 파일</h3>
                {codeFiles.map((f) => (
                  <div key={f.id} className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between px-4 py-2 bg-gray-100 dark:bg-gray-800 text-sm">
                      <span className="font-mono">{f.file_name}</span>
                      <a href={f.file_url} download className="text-primary-600 hover:underline text-xs">다운로드</a>
                    </div>
                    <SyntaxHighlighter
                      language={getLanguage(f.file_name)}
                      style={oneDark}
                      customStyle={{ margin: 0, maxHeight: '300px', fontSize: '13px' }}
                    >
                      {codeContent[f.id] || '로딩 중...'}
                    </SyntaxHighlighter>
                  </div>
                ))}
              </div>
            )}

            {/* 문서 다운로드 */}
            {documents.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-semibold">첨부 문서</h3>
                {documents.map((f) => (
                  <a
                    key={f.id}
                    href={f.file_url}
                    download
                    className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                  >
                    <Download className="w-4 h-4 text-primary-600" />
                    <span className="text-sm">{f.file_name}</span>
                  </a>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
