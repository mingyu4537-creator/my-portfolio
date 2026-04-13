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
  thumbnail: string;
  links: { label: string; url: string }[];
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
    thumbnail: '/works/lora-trainer-ui.png',
    links: [],
    details: '이미지 업로드 → 자동 캡션 → LoRA 학습 → 모델 내보내기까지 원스톱 웹 UI. 직접 LoRA를 제작하며, 실제 업무에서 팀원 전체가 사용 중인 사내 도구',
    techStack: ['FastAPI', 'Kohya SD Scripts', 'Python'],
  },
  {
    title: 'SDXL LoRA Trainer (CLI)',
    role: '기획 · 개발 (Claude Code)',
    category: 'AI 도구',
    description: 'CLI 기반 LoRA 학습 자동화 도구',
    icon: 'cpu',
    thumbnail: '',
    links: [],
    details: '얼굴 감지 → 크롭 → 자동 캡셔닝(WD-Tagger) → 학습 → 샘플 생성 파이프라인 자동화. 직접 LoRA를 제작하며, 실제 업무에서 팀원 전체가 사용 중',
    techStack: ['Python', 'WD-Tagger', 'BLIP2'],
  },
  {
    title: 'ComfyUI-HairOverlay',
    role: '기획 · 개발 (Claude Code)',
    category: '커스텀 노드',
    description: '머리카락 색상 오버레이 노드',
    icon: 'code',
    thumbnail: '',
    links: [{ label: 'GitHub', url: 'https://github.com/mingyu4537-creator/ComfyUI-HairOverlay' }],
    details: '얼굴 주변 머리카락에 에어브러시처럼 부드러운 색상 오버레이. 필요한 기능은 직접 만든다 — 회사에서 원하는 기능을 커스텀 노드로 직접 개발',
    techStack: ['Python', 'ComfyUI', 'PIL'],
  },
  {
    title: 'ComfyUI-PinkBlushOverlay',
    role: '기획 · 개발 (Claude Code)',
    category: '커스텀 노드',
    description: '웹툰 스타일 핑크 블러시 노드',
    icon: 'code',
    thumbnail: '',
    links: [{ label: 'GitHub', url: 'https://github.com/mingyu4537-creator/ComfyUI-PinkBlushOverlay' }],
    details: '피부 영역에 웹툰 스타일 핑크 에어브러시 자동 적용. Photoshop 오버레이 블렌딩 모드 구현. 업무에 필요한 노드를 직접 설계 및 개발',
    techStack: ['Python', 'ComfyUI', 'OpenCV'],
  },
  {
    title: 'ComfyUI-SkinHighlightRemover',
    role: '기획 · 개발 (Claude Code)',
    category: '커스텀 노드',
    description: '피부 하이라이트 제거 노드',
    icon: 'code',
    thumbnail: '',
    links: [{ label: 'GitHub', url: 'https://github.com/mingyu4537-creator/ComfyUI-SkinHighlightRemover' }],
    details: '피부 위 하이라이트를 감지하고 블러 브러시로 자연스럽게 제거. 라인아트 보호 기능 포함. 회사에서 필요한 후처리 기능을 노드로 직접 구현',
    techStack: ['Python', 'ComfyUI', 'OpenCV'],
  },
  {
    title: 'ComfyUI 워크플로우 제작',
    role: '워크플로우 설계 · 영상 제작',
    category: '워크플로우',
    description: 'ComfyUI 기반 AI 이미지/영상 파이프라인',
    icon: 'workflow',
    thumbnail: '',
    links: [],
    details: 'T2I · I2V 워크플로우 설계 및 AI 영상 제작. 상업 프로젝트에 활용',
    techStack: ['ComfyUI', 'Stable Diffusion', 'LTX Video'],
  },
  {
    title: '데스크톱 펫 챗봇',
    role: '기획 · 개발 (Claude Code)',
    category: '챗봇',
    description: 'Electron + Gemini API 데스크톱 펫 앱',
    icon: 'cpu',
    thumbnail: '',
    links: [],
    details: '바탕화면 위에 움직이는 캐릭터가 상주하며 AI 채팅 가능. Gemini API 연동, 캐릭터별 페르소나 설정, 메모 기능 포함. I2V로 캐릭터 애니메이션 에셋 직접 제작',
    techStack: ['Electron', 'Gemini API', 'I2V', 'JavaScript'],
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
                {work.thumbnail && (
                  <div className="aspect-video overflow-hidden bg-gray-100 dark:bg-gray-800">
                    <img
                      src={work.thumbnail}
                      alt={work.title}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
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
                    <div className="flex gap-1">
                      {work.links.map((link) => (
                        <a
                          key={link.url}
                          href={link.url}
                          target="_blank"
                          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition flex-shrink-0"
                          title={link.label}
                        >
                          <ExternalLink className="w-5 h-5" />
                        </a>
                      ))}
                    </div>
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

        {/* 챗봇 캐릭터 & 데모 */}
        {(filter === 'all' || filter === '챗봇') && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="mt-10 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden"
          >
            <div className="p-6">
              <h3 className="text-lg font-bold mb-4">캐릭터 에셋 미리보기</h3>
              <div className="flex items-center justify-center gap-8 mb-6">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-2">
                    <img src="/works/chatbot-hangyodon.gif" alt="한교동 펫" className="w-full h-full object-contain" />
                  </div>
                  <p className="text-sm text-gray-500">한교동 펫</p>
                </div>
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-2">
                    <img src="/works/chatbot-miku.gif" alt="미쿠 펫" className="w-full h-full object-contain" />
                  </div>
                  <p className="text-sm text-gray-500">미쿠 펫</p>
                </div>
              </div>
              <h3 className="text-lg font-bold mb-3">데모 영상</h3>
              <div className="rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800">
                <video
                  src="/works/chatbot-demo.mp4"
                  controls
                  muted
                  loop
                  playsInline
                  className="w-full max-h-[400px] object-contain"
                />
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
