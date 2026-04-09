'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function About({ bio }: { bio: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-center mb-12">
            About <span className="text-primary-600">Me</span>
          </h2>
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-800">
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg whitespace-pre-line">
              {bio || '자기소개가 아직 등록되지 않았습니다.'}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
