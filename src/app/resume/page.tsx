'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import ThemeToggle from '@/components/ui/ThemeToggle';

const sections = [
  {
    title: '성장 과정',
    content: `캐나다 Urban International School을 졸업하며 다양한 문화와 소통하는 법을 자연스럽게 익혔습니다. 이 경험은 이후 협업 환경에서 상대방의 의도를 빠르게 파악하고, 원활하게 소통하는 데 큰 도움이 되었습니다.`,
  },
  {
    title: '지원 동기 및 직무 역량',
    content: `저는 웹툰 플랫폼 탑툰에서 채색 작가로 시작하여, 현재는 AI 기반 이미지·영상 제작까지 업무 영역을 확장해온 크리에이터입니다.`,
    subsections: [
      {
        subtitle: '채색 작가로서의 기반',
        text: '입사 초기, 성인 웹툰 「오늘 저녁은 너다」의 채색을 64화부터 106화 완결까지 담당하며 상업 웹툰의 제작 파이프라인과 마감 관리 능력을 체득했습니다.',
      },
      {
        subtitle: 'AI 영상 제작으로의 전환',
        text: '이후 T2I(Text to Image)와 I2V(Image to Video) 기술을 활용한 웹툰 애니메이션 제작 업무를 맡게 되었습니다. 「야간병원」에서는 AI 캐릭터 디자인부터 영상 제작까지 전 과정을 주도했으며, 「모비딕」, 「사내연애 금지」 등의 작품에서도 애니메이션 영상을 제작했습니다. 또한 탑툰 챗봇 서비스의 캐릭터 에셋을 제작하며, LoRA 학습부터 I2V 애니메이션까지 전체 워크플로우를 직접 수행하고 있습니다.',
      },
    ],
  },
  {
    title: '핵심 역량: 필요한 도구는 직접 만든다',
    content: '단순히 AI 도구를 사용하는 데 그치지 않고, 업무에 필요한 도구를 직접 설계하고 개발합니다.',
    bullets: [
      {
        label: 'LoRA 학습 프로그램 개발',
        text: '이미지 업로드부터 자동 캡셔닝, 학습, 모델 내보내기까지 원스톱으로 처리하는 웹 기반 도구를 제작했습니다. 현재 팀원 전체가 실무에서 사용 중인 사내 핵심 도구입니다.',
      },
      {
        label: 'ComfyUI 커스텀 노드 개발',
        text: '업무 중 필요한 기능이 기존 노드에 없을 때, 직접 커스텀 노드를 설계·개발하여 해결합니다. 머리색 오버레이, 피부 핑크 블러시, 하이라이트 제거 등 웹툰 후처리에 특화된 노드를 제작하여 GitHub에 공개했습니다.',
      },
      {
        label: '데스크톱 AI 챗봇 개발',
        text: 'Electron과 Gemini API를 활용하여 캐릭터 성격이 반영된 대화가 가능한 데스크톱 펫 앱을 개발했습니다.',
      },
    ],
    footer: '이 모든 개발은 Claude Code를 활용하여 진행했으며, 프로그래밍 도구 역시 AI를 적극적으로 활용하는 저의 작업 방식을 보여줍니다.',
  },
  {
    title: '개인 창작 활동',
    content: '업무 외에도 꾸준히 창작 활동을 이어가고 있습니다.',
    list: [
      '일러스트 및 이모티콘 직접 제작 (Pixiv 활동)',
      '쇼츠 애니메이션 제작 (YouTube 채널 운영)',
      '포트폴리오 웹사이트 직접 기획·제작',
    ],
  },
  {
    title: 'AI와 함께 성장하는 자세',
    content: `저의 가장 큰 강점은 끊임없이 새로운 기술을 찾고 익히는 자세입니다. 새로운 AI 모델이 출시되면 즉시 테스트해보고, 업무에 적용할 수 있는지 검토합니다. 잠들기 전에도 AI 관련 최신 정보를 탐색하는 것이 일상이 되었습니다. AI 시대에 뒤처지지 않기 위해 노력하는 것이 아니라, AI 시대를 이끌어가는 사람이 되고 싶습니다.

협업에서는 최대한 많이 소통하고, 맡은 일에 책임감을 가지고 끝까지 해내는 것을 중요하게 생각합니다. 담담한 성격 덕분에 급한 상황에서도 침착하게 대응할 수 있으며, 팀 내 갈등 상황에서도 감정적으로 흔들리지 않고 문제 해결에 집중합니다.`,
  },
];

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      {/* 상단 바 */}
      <nav className="sticky top-0 z-40 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-primary-600 transition">
            <ArrowLeft className="w-4 h-4" />
            포트폴리오로 돌아가기
          </Link>
          <ThemeToggle />
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-3">자기소개서</h1>
          <div className="flex items-center justify-center gap-3 text-gray-500 dark:text-gray-400">
            <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">김민규</span>
            <span className="text-sm">|</span>
            <span className="text-sm">1998년생</span>
            <span className="text-sm">|</span>
            <span className="text-sm">탑툰 AI 영상 제작 (3년 4개월)</span>
          </div>
        </motion.div>

        {/* 본문 */}
        <div className="space-y-8">
          {sections.map((section, i) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm"
            >
              <h2 className="text-xl font-bold mb-4 text-primary-600">{section.title}</h2>

              <p className="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                {section.content}
              </p>

              {section.subsections && (
                <div className="mt-4 space-y-4">
                  {section.subsections.map((sub) => (
                    <div key={sub.subtitle}>
                      <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">{sub.subtitle}</h3>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{sub.text}</p>
                    </div>
                  ))}
                </div>
              )}

              {section.bullets && (
                <ul className="mt-4 space-y-3">
                  {section.bullets.map((bullet) => (
                    <li key={bullet.label} className="flex gap-2">
                      <span className="text-primary-600 mt-1.5 flex-shrink-0">•</span>
                      <div>
                        <span className="font-semibold text-gray-800 dark:text-gray-200">{bullet.label}</span>
                        <span className="text-gray-600 dark:text-gray-300">: {bullet.text}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}

              {section.footer && (
                <p className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed">{section.footer}</p>
              )}

              {section.list && (
                <ul className="mt-3 space-y-1.5">
                  {section.list.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                      <span className="text-primary-600">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
