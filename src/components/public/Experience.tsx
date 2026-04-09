'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import type { Experience as ExperienceType } from '@/types';

export default function Experience({ experiences }: { experiences: ExperienceType[] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="experience" className="py-20 px-4 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-3xl mx-auto" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-3xl font-bold text-center mb-12"
        >
          Work <span className="text-primary-600">Experience</span>
        </motion.h2>

        <div className="relative">
          {/* 타임라인 선 */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-800 -translate-x-1/2" />

          <div className="space-y-8">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.15 }}
                className={`relative flex items-start gap-6 ${
                  i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* 점 */}
                <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-primary-600 rounded-full -translate-x-1/2 mt-2 ring-4 ring-white dark:ring-gray-950 z-10" />

                <div className={`ml-10 md:ml-0 md:w-1/2 ${i % 2 === 0 ? 'md:pr-10 md:text-right' : 'md:pl-10'}`}>
                  <div className="bg-white dark:bg-gray-900 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-800">
                    <span className="text-xs text-primary-600 font-medium">{exp.period}</span>
                    <h3 className="text-lg font-semibold mt-1">{exp.company}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{exp.role}</p>
                    {exp.description && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{exp.description}</p>
                    )}
                    {exp.highlights?.length > 0 && (
                      <div className={`flex flex-wrap gap-1.5 mt-3 ${i % 2 === 0 ? 'md:justify-end' : ''}`}>
                        {exp.highlights.map((h, j) => (
                          <span key={j} className="px-2 py-0.5 bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded text-xs">
                            {h}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {experiences.length === 0 && (
          <p className="text-center py-10 text-gray-500">등록된 경력이 없습니다.</p>
        )}
      </div>
    </section>
  );
}
