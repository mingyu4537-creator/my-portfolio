'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ExternalLink } from 'lucide-react';

interface WorkItem {
  title: string;
  role: string;
  category: string;
  description: string;
  thumbnail: string;
  link: string | null;
  details: string;
}

const works: WorkItem[] = [
  {
    title: '오늘 저녁은 너다',
    role: '채색 작가',
    category: '웹툰',
    description: '탑툰 연재 | 글: 활화산 · 그림: 권모양',
    thumbnail: '/works/today-dinner.jpg',
    link: 'https://toptoon.com/comic/ep_list/TodayDinner',
    details: '64화~106화 채색 담당 (완결작, 총 106화 + 에필로그)',
  },
  {
    title: '야간병원 애니메이션',
    role: 'AI 캐릭터 디자인 · T2I 이미지 제작 · I2V 영상 제작',
    category: '영상',
    description: '탑툰 애니메이션 | 원작: 야간병원',
    thumbnail: '/works/night-hospital.jpg',
    link: 'https://toptoon.com/comic/ep_view/night_hospital_anime/1/',
    details: 'AI 기반 캐릭터 디자인 + 이미지 생성(T2I) + 애니메이션 영상 제작(I2V)',
  },
  {
    title: '모비딕 애니메이션',
    role: 'T2I 이미지 제작 · I2V 영상 제작',
    category: '영상',
    description: '탑툰 애니메이션 | 원작: 모비딕 · 글/그림: 얀새',
    thumbnail: '/works/mobydick.jpg',
    link: 'https://toptoon.com/comic/ep_view/Mobydick_anime/12/',
    details: 'AI 이미지 생성(T2I) + 애니메이션 영상 제작(I2V)',
  },
  {
    title: '사내연애 금지 애니메이션',
    role: 'T2I 이미지 제작 · I2V 영상 제작',
    category: '영상',
    description: '탑툰 애니메이션 | 원작: 사내연애 금지',
    thumbnail: '',
    link: 'https://toptoon.com/comic/ep_view/no_office_romance_anime/2/',
    details: 'AI 이미지 생성(T2I) + 애니메이션 영상 제작(I2V)',
  },
  {
    title: '탑툰 챗봇 - 은혜',
    role: 'I2V 에셋 제작',
    category: '챗봇',
    description: '탑툰 챗 | 아트 팀장 은혜 캐릭터',
    thumbnail: '/works/chatbot-eunhye.jpg',
    link: 'https://toptoon.chat/detail/character/129',
    details: '캐릭터가 움직이는 I2V 애니메이션 에셋 제작',
  },
  {
    title: '탑툰 챗봇 - 차수민',
    role: 'LoRA 학습 · 에셋 제작 · I2V 제작',
    category: '챗봇',
    description: '탑툰 챗 | 차수민 캐릭터',
    thumbnail: '/works/chatbot-sumin.jpg',
    link: 'https://toptoon.chat/detail/character/97',
    details: 'LoRA 학습부터 캐릭터 에셋 전체 제작 + I2V 애니메이션 제작',
  },
  {
    title: 'SDXL LoRA Web Trainer',
    role: '기획 · 개발 (Claude Code)',
    category: 'AI 도구',
    description: '웹 기반 LoRA 학습 프로그램',
    thumbnail: '',
    link: null,
    details: '이미지 업로드 → 자동 캡션 → LoRA 학습 → 모델 내보내기까지 원스톱 웹 UI. FastAPI + Kohya SD Scripts 기반',
  },
  {
    title: 'SDXL LoRA Trainer (CLI)',
    role: '기획 · 개발 (Claude Code)',
    category: 'AI 도구',
    description: 'CLI 기반 LoRA 학습 자동화 도구',
    thumbnail: '',
    link: null,
    details: '얼굴 감지 → 크롭 → 자동 캡셔닝(WD-Tagger) → 학습 → 샘플 생성 파이프라인 자동화',
  },
  {
    title: 'ComfyUI 커스텀 노드 개발',
    role: '기획 · 개발 (Claude Code)',
    category: 'AI 도구',
    description: 'ComfyUI 워크플로우용 커스텀 노드 제작',
    thumbnail: '',
    link: null,
    details: '업무에 필요한 ComfyUI 커스텀 노드를 직접 설계 및 개발. Claude Code 활용',
  },
  {
    title: 'ComfyUI 워크플로우 제작',
    role: '워크플로우 설계 · 영상 제작',
    category: 'AI 제작',
    description: 'ComfyUI 기반 AI 이미지/영상 파이프라인',
    thumbnail: '',
    link: null,
    details: 'T2I · I2V 워크플로우 설계 및 AI 영상 제작. 상업 프로젝트에 활용',
  },
];

export default function Works() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [filter, setFilter] = useState('all');

  const categories = ['all', ...Array.from(new Set(works.map((w) => w.category)))];
  const filtered = filter === 'all' ? works : works.filter((w) => w.category === filter);

  return (
    <section id="works" className="py-20 px-4">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-3xl font-bold text-center mb-4"
        >
          My <span className="text-primary-600">Works</span>
        </motion.h2>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-8">
          상업 작업 이력
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
          {filtered.map((work, i) => (
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
                  <div>
                    <span className="inline-block px-2.5 py-0.5 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full text-xs font-medium mb-2">
                      {work.category}
                    </span>
                    <h3 className="text-xl font-bold">{work.title}</h3>
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

                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  {work.description}
                </p>

                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {work.details}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
