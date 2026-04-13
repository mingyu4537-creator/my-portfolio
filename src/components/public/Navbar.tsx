'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '/resume', label: 'Resume' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#works', label: 'Works' },
  { href: '#ai-works', label: 'AI Works' },
  { href: '#ai-chatbot', label: 'AI Chatbot' },
  { href: '#illustrations', label: 'Illustrations' },
  { href: '#emoticons', label: 'Emoticons' },
  { href: '#youtube', label: 'YouTube' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar({ name }: { name: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 dark:bg-gray-950/80 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <a href="#" className="text-xl font-bold text-primary-600">
            {name || 'Portfolio'}
          </a>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition"
              >
                {link.label}
              </a>
            ))}
            <ThemeToggle />
          </div>

          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2">
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800"
          >
            <div className="px-4 py-2 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary-600 rounded-lg"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
