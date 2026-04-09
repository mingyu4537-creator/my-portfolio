'use client';

import { motion } from 'framer-motion';
import { ArrowDown, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/ui/SocialIcons';
import { useEffect, useState } from 'react';

interface HeroProps {
  config: Record<string, string>;
}

export default function Hero({ config }: HeroProps) {
  const [typedText, setTypedText] = useState('');
  const fullText = config.title || 'Full-Stack Developer';

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTypedText(fullText.slice(0, i + 1));
      i++;
      if (i >= fullText.length) clearInterval(interval);
    }, 80);
    return () => clearInterval(interval);
  }, [fullText]);

  return (
    <section className="min-h-screen flex items-center justify-center relative px-4">
      <div className="text-center max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {config.profile_image && (
            <img
              src={config.profile_image}
              alt={config.name}
              className="w-28 h-28 rounded-full mx-auto mb-6 object-cover ring-4 ring-primary-500/20"
            />
          )}

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
            안녕하세요,{' '}
            <span className="text-primary-600">{config.name || '개발자'}</span>
            입니다
          </h1>

          <div className="text-xl sm:text-2xl text-gray-500 dark:text-gray-400 mb-6 h-8">
            {typedText}
            <span className="animate-pulse">|</span>
          </div>

          <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto mb-8 leading-relaxed">
            {config.bio || ''}
          </p>

          <div className="flex items-center justify-center gap-3 mb-12">
            {config.github && (
              <a href={config.github} target="_blank" className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-primary-100 dark:hover:bg-primary-900/30 transition">
                <GithubIcon className="w-5 h-5" />
              </a>
            )}
            {config.linkedin && (
              <a href={config.linkedin} target="_blank" className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-primary-100 dark:hover:bg-primary-900/30 transition">
                <LinkedinIcon className="w-5 h-5" />
              </a>
            )}
            {config.email && (
              <a href={`mailto:${config.email}`} className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-primary-100 dark:hover:bg-primary-900/30 transition">
                <Mail className="w-5 h-5" />
              </a>
            )}
            {config.resume_url && (
              <a
                href={config.resume_url}
                target="_blank"
                className="px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-full text-sm font-medium transition"
              >
                이력서 다운로드
              </a>
            )}
          </div>
        </motion.div>

        <motion.a
          href="#about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="inline-block animate-bounce"
        >
          <ArrowDown className="w-6 h-6 text-gray-400" />
        </motion.a>
      </div>
    </section>
  );
}
