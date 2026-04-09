'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { GithubIcon } from '@/components/ui/SocialIcons';
import type { Project } from '@/types';
import ProjectDetailModal from './ProjectDetailModal';

export default function Projects({ projects }: { projects: Project[] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [selected, setSelected] = useState<Project | null>(null);
  const [filter, setFilter] = useState('all');

  const categories = ['all', ...Array.from(new Set(projects.map((p) => p.category).filter(Boolean)))];
  const filtered = filter === 'all' ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="py-20 px-4">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-3xl font-bold text-center mb-8"
        >
          My <span className="text-primary-600">Projects</span>
        </motion.h2>

        {/* 카테고리 필터 */}
        <div className="flex justify-center gap-2 mb-10 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat as string)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
                filter === cat
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {cat === 'all' ? 'All' : cat}
            </button>
          ))}
        </div>

        {/* 프로젝트 그리드 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              className="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-lg transition-all cursor-pointer"
              onClick={() => setSelected(project)}
            >
              {project.thumbnail_url ? (
                <div className="aspect-video overflow-hidden bg-gray-100 dark:bg-gray-800">
                  <img
                    src={project.thumbnail_url}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ) : (
                <div className="aspect-video bg-gradient-to-br from-primary-500/20 to-primary-600/20 flex items-center justify-center">
                  <span className="text-4xl font-bold text-primary-600/30">{project.title[0]}</span>
                </div>
              )}

              <div className="p-5">
                <h3 className="font-semibold text-lg mb-1">{project.title}</h3>
                {project.description && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 line-clamp-2">
                    {project.description}
                  </p>
                )}

                <div className="flex flex-wrap gap-1.5 mb-3">
                  {project.tech_stack?.slice(0, 4).map((t) => (
                    <span key={t} className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-xs">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex gap-2">
                  {project.github_url && (
                    <a
                      href={project.github_url}
                      target="_blank"
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition"
                    >
                      <GithubIcon className="w-4 h-4" />
                    </a>
                  )}
                  {project.live_url && (
                    <a
                      href={project.live_url}
                      target="_blank"
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center py-20 text-gray-500">등록된 프로젝트가 없습니다.</p>
        )}
      </div>

      <ProjectDetailModal
        project={selected}
        onClose={() => setSelected(null)}
      />
    </section>
  );
}
