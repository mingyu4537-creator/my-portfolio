'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Bot, MessageSquare, Sparkles, Palette } from 'lucide-react';

const features = [
  {
    icon: Bot,
    title: 'Gemini API 연동',
    description: 'Google Gemini API를 활용한 자연스러운 AI 대화',
  },
  {
    icon: MessageSquare,
    title: '캐릭터 페르소나',
    description: '캐릭터별 성격·말투를 설정하여 개성 있는 채팅 경험',
  },
  {
    icon: Palette,
    title: 'I2V 에셋 직접 제작',
    description: 'AI로 캐릭터 애니메이션 에셋을 직접 생성하여 적용',
  },
  {
    icon: Sparkles,
    title: 'Claude Code로 개발',
    description: 'Electron 기반 데스크톱 앱을 Claude Code로 설계·구현',
  },
];

const characters = [
  { name: '한교동 펫', gif: '/works/chatbot-hangyodon.gif', persona: '엉뚱하고 순수한 산리오 캐릭터' },
  { name: '미쿠 펫', gif: '/works/chatbot-miku.gif', persona: '밝고 활발한 보컬로이드 캐릭터' },
];

export default function AIChatbot() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: '-100px' });

  return (
    <section id="ai-chatbot" className="py-20 px-4">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-3xl font-bold text-center mb-4"
        >
          AI <span className="text-primary-600">챗봇 제작</span>
        </motion.h2>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-10 max-w-2xl mx-auto">
          바탕화면 위에 움직이는 캐릭터가 상주하며 AI 채팅이 가능한 데스크톱 펫 앱.
          Claude Code로 개발하고, Gemini API로 캐릭터의 성격까지 반영한 대화를 구현했습니다.
        </p>

        {/* 기능 카드 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {features.map((feat, i) => (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              className="p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 text-center"
            >
              <div className="inline-flex p-2.5 bg-primary-100 dark:bg-primary-900/30 rounded-xl mb-3">
                <feat.icon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-sm font-bold mb-1">{feat.title}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">{feat.description}</p>
            </motion.div>
          ))}
        </div>

        {/* 캐릭터 미리보기 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden"
        >
          <div className="p-6">
            <h3 className="text-lg font-bold mb-6 text-center">캐릭터 에셋</h3>
            <div className="flex items-center justify-center gap-12 mb-8">
              {characters.map((char) => (
                <motion.div
                  key={char.name}
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="w-36 h-36 mx-auto mb-3 flex items-center justify-center">
                    <img src={char.gif} alt={char.name} className="max-w-full max-h-full object-contain" />
                  </div>
                  <p className="font-medium text-sm">{char.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{char.persona}</p>
                </motion.div>
              ))}
            </div>

            <h3 className="text-lg font-bold mb-3 text-center">데모 영상</h3>
            <div className="rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 max-w-2xl mx-auto">
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

        {/* 기술 스택 */}
        <div className="flex flex-wrap justify-center gap-2 mt-6">
          {['Electron', 'Gemini API', 'Claude Code', 'I2V', 'JavaScript'].map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 rounded-full text-xs font-medium"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
