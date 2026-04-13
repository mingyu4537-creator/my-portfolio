'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ExternalLink, Code, Cpu, Workflow } from 'lucide-react';

interface AIWorkItem {
  title: string;
  role: string;
  category: string;
  description: string;
  icon: 'code' | 'cpu' | 'workflow';
  link: string | null;
  details: string;
  techStack: string[];
}

const iconMap = {
  code: Code,
  cpu: Cpu,
  workflow: Workflow,
};

const aiWorks: AIWorkItem[] = [
  {
    title: 'SDXL LoRA Web Trainer',
    role: '기획 · 개발 (Claude Code)',
    category: 'AI 도구',
    description: '웹 기반 LoRA 학습 프로그램',
    icon: 'cpu',
    link: null,
    details: '이미지 업로드 → 자동 캡션 → LoRA 학습 → 모델 내보내기까지 원스톱 웹 UI',
    techStack: ['FastAPI', 'Kohya SD Scripts', 'Python'],
  },
  {
    title: 'SDXL LoRA Trainer (CLI)',
    role: '기획 · 개발 (Claude Code)',
    category: 'AI 도구',
    description: 'CLI 기반 LoRA 학습 자동화 도구',
    icon: 'cpu',
    link: null,
    details: '얼굴 감지 → 크롭 → 자동 캡셔닝(WD-Tagger) → 학습 → 샘플 생성 파이프라인 자동화',
    techStack: ['Python', 'WD-Tagger', 'BLIP2'],
  },
  {
    title: 'ComfyUI 커스텀 노드 개발',
    role: '기획 · 개발 (Claude Code)',
    category: '커스텀 노드',
    description: 'ComfyUI 워크플로우용 커스텀 노드 제작',
    icon: 'code',
    link: null,
    details: '업무에 필요한 ComfyUI 커스텀 노드를 직접 설계 및 개발',
    techStack: ['Python', 'ComfyUI', 'Claude Code'],
  },
  {
    title: 'ComfyUI 워크플로우 제작',
    role: '워크플로우 설계 · 영상 제작',
    category: '워크플로우',
    description: 'ComfyUI 기반 AI 이미지/영상 파이프라인',
    icon: 'workflow',
    link: null,
    details: 'T2I · I2V 워크플로우 설계 및 AI 영상 제작. 상업 프로젝트에 활용',
    techStack: ['ComfyUI', 'Stable Diffusion', 'LTX Video'],
  },
];

export default function AIWorks() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [filter, setFilter] = useState('all');

  const categories = ['all', ...Array.from(new Set(aiWorks.map((w) => w.category)))];
  const filtered = filter === 'all' ? aiWorks : aiWorks.filter((w) => w.category === filter);

  return (
    <section id="ai-works" className="py-20 px-4">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-3xl font-bold text-center mb-4"
        >
          AI <span className="text-primary-600">Works</span>
        </motion.h2>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-8">
          직접 개발한 AI 도구 및 워크플로우
        </p>

        {categories.length > 2 && (
          <div className="flex justify-center gap-2 mb-10 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
                  filter === cat
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {cat === 'all' ? 'All' : cat}
              </button>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((work, i) => {
            const Icon = iconMap[work.icon];
            return (
              <motion.div
                key={work.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1 }}
                className="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-lg transition-all"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-3">
                      <div className="p-2.5 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex-shrink-0">
                        <Icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                      </div>
                      <div>
                        <span className="inline-block px-2.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded-full text-xs font-medium mb-1.5">
                          {work.category}
                        </span>
                        <h3 className="text-xl font-bold">{work.title}</h3>
                      </div>
                    </div>
                    {work.link && (
                      <a
                        href={work.link}
                        target="_blank"
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition flex-shrink-0"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                  </div>

                  <div className="inline-block px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm font-medium mb-3">
                    {work.role}
                  </div>

                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    {work.details}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {work.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 rounded text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
