'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ExternalLink } from 'lucide-react';

interface Contribution {
  task: string;
  percent: number;
}

interface WorkItem {
  title: string;
  role: string;
  category: string;
  description: string;
  thumbnail: string;
  link: string | null;
  details: string;
  contributions: Contribution[];
}

const works: WorkItem[] = [
  {
    title: '오늘 저녁은 너다',
    role: '채색 작가',
    category: '웹툰',
    description: '탑툰 연재 | 글: 활화산 · 그림: 권모양',
    thumbnail: '/works/today-dinner.webp',
    link: 'https://toptoon.com/comic/ep_list/TodayDinner',
    details: '64화~106화 채색 담당 (완결작, 총 106화 + 에필로그)',
    contributions: [{ task: '채색', percent: 100 }],
  },
  {
    title: '야간병원 애니메이션',
    role: 'AI 캐릭터 디자인 · T2I 이미지 제작 · I2V 영상 제작',
    category: '영상',
    description: '탑툰 애니메이션 | 원작: 야간병원',
    thumbnail: '/works/night-hospital.webp',
    link: 'https://toptoon.com/comic/ep_view/night_hospital_anime/1/',
    details: 'AI 기반 캐릭터 디자인 + 이미지 생성(T2I) + 애니메이션 영상 제작(I2V)',
    contributions: [
      { task: '캐릭터 시트 제작', percent: 100 },
      { task: 'I2V 영상 제작', percent: 50 },
    ],
  },
  {
    title: '모비딕 애니메이션',
    role: 'T2I 이미지 제작 · I2V 영상 제작',
    category: '영상',
    description: '탑툰 애니메이션 | 원작: 모비딕 · 글/그림: 얀새',
    thumbnail: '/works/mobydick.webp',
    link: 'https://toptoon.com/comic/ep_view/Mobydick_anime/12/',
    details: 'AI 이미지 생성(T2I) + 애니메이션 영상 제작(I2V)',
    contributions: [{ task: 'T2I · I2V 영상 제작', percent: 50 }],
  },
  {
    title: '사내연애 금지 애니메이션',
    role: 'T2I 이미지 제작 · I2V 영상 제작',
    category: '영상',
    description: '탑툰 애니메이션 | 원작: 사내연애 금지',
    thumbnail: '',
    link: 'https://toptoon.com/comic/ep_view/no_office_romance_anime/2/',
    details: 'AI 이미지 생성(T2I) + 애니메이션 영상 제작(I2V)',
    contributions: [{ task: 'I2V 서포트 · 수정', percent: 20 }],
  },
  {
    title: '탑툰 챗봇 - 은혜',
    role: 'I2V 에셋 제작',
    category: '챗봇',
    description: '탑툰 챗 | 아트 팀장 은혜 캐릭터',
    thumbnail: '/works/chatbot-eunhye.webp',
    link: 'https://toptoon.chat/detail/character/129',
    details: '캐릭터가 움직이는 I2V 애니메이션 에셋 제작',
    contributions: [{ task: 'I2V 에셋 제작', percent: 50 }],
  },
  {
    title: '탑툰 챗봇 - 차수민',
    role: 'LoRA 학습 · 에셋 제작 · I2V 제작',
    category: '챗봇',
    description: '탑툰 챗 | 차수민 캐릭터',
    thumbnail: '/works/chatbot-sumin.webp',
    link: 'https://toptoon.chat/detail/character/97',
    details: 'LoRA 학습부터 캐릭터 에셋 전체 제작 + I2V 애니메이션 제작',
    contributions: [
      { task: '캐릭터 제작', percent: 100 },
      { task: 'LoRA 학습', percent: 100 },
      { task: '에셋 제작', percent: 100 },
      { task: 'I2V 제작', percent: 100 },
    ],
  },
];

export default function Works() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: '-100px' });
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

                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  {work.details}
                </p>

                {/* 기여도 */}
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">기여도</p>
                  {work.contributions.map((c) => (
                    <div key={c.task} className="flex items-center gap-3">
                      <span className="text-xs text-gray-600 dark:text-gray-300 w-28 flex-shrink-0 truncate" title={c.task}>
                        {c.task}
                      </span>
                      <div className="flex-1 h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-700 ${
                            c.percent === 100
                              ? 'bg-primary-500'
                              : c.percent >= 50
                              ? 'bg-primary-400'
                              : 'bg-primary-300'
                          }`}
                          style={{ width: `${c.percent}%` }}
                        />
                      </div>
                      <span className="text-xs font-bold text-primary-600 dark:text-primary-400 w-10 text-right">
                        {c.percent}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
