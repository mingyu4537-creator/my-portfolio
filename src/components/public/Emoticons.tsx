'use client';

import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { X } from 'lucide-react';

const emoticons = [
  { src: '/emoticons/emoticon-v1.webp', title: '이모티콘 Vol.1' },
  { src: '/emoticons/emoticon-v2.webp', title: '이모티콘 Vol.2' },
];

export default function Emoticons() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: '-100px' });
  const [selected, setSelected] = useState<typeof emoticons[0] | null>(null);

  return (
    <section id="emoticons" className="py-20 px-4">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-3xl font-bold text-center mb-4"
        >
          My <span className="text-primary-600">Emoticons</span>
        </motion.h2>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-2">
          직접 그린 이모티콘
        </p>
        <p className="text-center mb-10">
          <span className="inline-block px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full text-xs font-bold">
            기여도 100%
          </span>
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {emoticons.map((item, i) => (
            <motion.div
              key={item.src}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.1 }}
              className="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-lg transition-all cursor-pointer"
              onClick={() => setSelected(item)}
            >
              <div className="p-4">
                <img
                  src={item.src}
                  alt={item.title}
                  loading="lazy"
                  className="w-full rounded-xl group-hover:scale-[1.02] transition-transform duration-300"
                />
              </div>
              <div className="px-4 pb-4">
                <h3 className="text-center font-semibold">{item.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-2xl max-h-[90vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selected.src}
                alt={selected.title}
                className="w-full max-h-[85vh] object-contain rounded-xl"
              />
              <p className="text-white text-center font-semibold mt-3">{selected.title}</p>
              <button
                onClick={() => setSelected(null)}
                className="absolute -top-2 -right-2 p-2 bg-white/10 hover:bg-white/20 rounded-full transition text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
