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
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
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
