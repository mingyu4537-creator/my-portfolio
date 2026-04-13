'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Mail } from 'lucide-react';
import { GithubIcon } from '@/components/ui/SocialIcons';

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="contact" className="py-20 px-4">
      <div className="max-w-xl mx-auto text-center" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-4">
            Get In <span className="text-primary-600">Touch</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8">
            프로젝트 의뢰나 문의가 있으시면 편하게 연락해주세요.
          </p>

          <a
            href="mailto:mingyu4537@gmail.com"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-medium transition"
          >
            <Mail className="w-5 h-5" /> 이메일 보내기
          </a>

          <div className="flex justify-center gap-3 mt-6">
            <a
              href="https://github.com/mingyu4537-creator"
              target="_blank"
              className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            >
              <GithubIcon className="w-5 h-5" />
            </a>
          </div>

          <p className="text-sm text-gray-400 dark:text-gray-500 mt-4">
            mingyu4537@gmail.com
          </p>
        </motion.div>
      </div>
    </section>
  );
}
