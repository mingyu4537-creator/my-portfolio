'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { FileText } from 'lucide-react';

const bio = `웹툰 플랫폼 탑툰에서 채색 작가로 시작하여, 현재는 AI 기반 이미지·영상 제작까지 업무 영역을 확장해온 크리에이터입니다.

「오늘 저녁은 너다」 채색(64~106화)을 담당하며 상업 웹툰 제작 파이프라인을 익혔고, 이후 T2I·I2V 기술을 활용한 웹툰 애니메이션 제작으로 전환하여 「야간병원」, 「모비딕」, 「사내연애 금지」 등의 영상을 제작했습니다.

단순히 AI 도구를 사용하는 데 그치지 않고, 필요한 도구는 직접 만듭니다. LoRA 학습 프로그램을 개발하여 팀 전체가 사용 중이며, ComfyUI 커스텀 노드도 직접 설계·개발합니다. 새로운 AI 기술이 나오면 즉시 테스트하고, 업무에 적용할 수 있는지 검토하는 것이 일상입니다.`;

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: '-100px' });

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
              {bio}
            </p>
            <div className="mt-6 text-center">
              <a
                href="/resume"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition font-medium text-sm"
              >
                <FileText className="w-4 h-4" />
                자기소개서 자세히 보기
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
