'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const experiences = [
  {
    period: '2022.12 ~ 현재',
    company: '탑툰 (TopToon)',
    role: '채색 작가 → AI 영상 제작',
    description: '웹툰 채색으로 시작하여 AI 기반 이미지·영상 제작으로 업무 전환',
    highlights: [
      '웹툰 채색 (64~106화)',
      'T2I / I2V 영상 제작',
      'AI 캐릭터 디자인',
      'LoRA 학습 프로그램 개발',
      'ComfyUI 커스텀 노드 개발',
      '챗봇 에셋 제작',
    ],
  },
];

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: '-100px' });

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

        <div className="space-y-6">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15 }}
              className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-xl font-bold">{exp.company}</h3>
                  <p className="text-gray-500 dark:text-gray-400">{exp.role}</p>
                </div>
                <span className="text-sm text-primary-600 font-medium whitespace-nowrap">{exp.period}</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{exp.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {exp.highlights.map((h) => (
                  <span key={h} className="px-2.5 py-1 bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-lg text-xs font-medium">
                    {h}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
