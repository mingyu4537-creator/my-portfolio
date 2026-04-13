'use client';

import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

const roles = ['AI Creator', 'Webtoon Artist', 'Tool Builder'];

const letterVariants = {
  hidden: { opacity: 0, y: 80, rotateX: -90 } as const,
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      delay: 0.5 + i * 0.04,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

const wordVariants = {
  hidden: { opacity: 0, x: -40, filter: 'blur(10px)' } as const,
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: {
      delay: 1.8 + i * 0.2,
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

export default function Hero() {
  const greeting = '안녕하세요,';
  const name = '김민규';
  const suffix = '입니다';

  return (
    <section className="min-h-screen flex items-center justify-center relative px-4 overflow-hidden">
      {/* 배경 장식 */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.05 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        className="absolute w-[800px] h-[800px] rounded-full bg-primary-500 blur-3xl"
      />

      <div className="text-center max-w-3xl relative z-10">
        {/* 인사 - 한 글자씩 날아오기 */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-2" style={{ perspective: '600px' }}>
          <span className="inline-block">
            {greeting.split('').map((char, i) => (
              <motion.span
                key={`g-${i}`}
                custom={i}
                variants={letterVariants}
                initial="hidden"
                animate="visible"
                className="inline-block"
                style={{ transformOrigin: 'bottom' }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </span>
        </h1>

        {/* 이름 - 강조 + 슬라이드 업 */}
        <motion.h1
          initial={{ opacity: 0, y: 60, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 1.0, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-2"
        >
          <motion.span
            className="text-primary-600 inline-block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            {name}
          </motion.span>
          <motion.span
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.4, duration: 0.5 }}
            className="inline-block"
          >
            {suffix}
          </motion.span>
        </motion.h1>

        {/* 구분선 */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.6, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="w-20 h-1 bg-primary-600 mx-auto my-6 origin-left rounded-full"
        />

        {/* 역할 태그 - 하나씩 슬라이드 인 */}
        <div className="flex items-center justify-center gap-3 mb-8 flex-wrap">
          {roles.map((role, i) => (
            <motion.span
              key={role}
              custom={i}
              variants={wordVariants}
              initial="hidden"
              animate="visible"
              className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              {role}
            </motion.span>
          ))}
        </div>

        {/* 소개 문구 */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 0.8 }}
          className="text-gray-500 dark:text-gray-400 max-w-lg mx-auto mb-12 leading-relaxed"
        >
          웹툰 채색부터 AI 영상 제작, 필요한 도구는 직접 만드는 크리에이터
        </motion.p>

        {/* 스크롤 화살표 */}
        <motion.a
          href="#about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.0 }}
          className="inline-block animate-bounce"
        >
          <ArrowDown className="w-6 h-6 text-gray-400" />
        </motion.a>
      </div>
    </section>
  );
}
