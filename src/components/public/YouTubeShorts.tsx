'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ExternalLink } from 'lucide-react';

interface ShortItem {
  id: string;
  title: string;
}

const shorts: ShortItem[] = [
  { id: 'aMVShv4-5TE', title: 'Still Here — 그 자리에' },
  { id: 'Ocgr-SJFtkk', title: 'Cortisol meme anime!!' },
  { id: 'kgitDcMYazU', title: 'SET JET! Uma Musume' },
  { id: 'sGE6YVBpgS8', title: 'aka! siro! pink~ #아카 #시로 #마제따라' },
];

export default function YouTubeShorts() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: '-100px' });

  return (
    <section id="youtube" className="py-20 px-4">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-3xl font-bold text-center mb-4"
        >
          My <span className="text-primary-600">Animations</span>
        </motion.h2>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-2">
          직접 제작한 쇼츠 애니메이션
        </p>
        <p className="text-center mb-10">
          <span className="inline-block px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full text-xs font-bold">
            기여도 100%
          </span>
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          {shorts.map((short, i) => (
            <motion.div
              key={short.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              className="w-full max-w-[320px]"
            >
              <div className="relative aspect-[9/16] rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 shadow-lg">
                <iframe
                  src={`https://www.youtube.com/embed/${short.id}`}
                  title={short.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
              <div className="mt-3 flex items-center justify-between px-1">
                <h3 className="font-medium text-sm truncate flex-1">{short.title}</h3>
                <a
                  href={`https://www.youtube.com/shorts/${short.id}`}
                  target="_blank"
                  className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition flex-shrink-0 ml-2"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <a
            href="https://www.youtube.com/@norazura0214"
            target="_blank"
            className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition font-medium"
          >
            YouTube 채널 방문
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
