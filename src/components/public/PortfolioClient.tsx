'use client';

import Navbar from './Navbar';
import Hero from './Hero';
import About from './About';
import Skills from './Skills';
import Projects from './Projects';
import Experience from './Experience';
import Contact from './Contact';
import Footer from './Footer';
import ScrollProgress from '@/components/ui/ScrollProgress';
import type { Project, Experience as ExperienceType, Skill } from '@/types';

interface Props {
  projects: Project[];
  experiences: ExperienceType[];
  skills: Skill[];
  config: Record<string, string>;
}

export default function PortfolioClient({ projects, experiences, skills, config }: Props) {
  return (
    <>
      <ScrollProgress />
      <Navbar name={config.name || ''} />
      <main>
        <Hero config={config} />
        <About bio={config.bio || ''} />
        <Skills skills={skills} />
        <Projects projects={projects} />
        <Experience experiences={experiences} />
        <Contact config={config} />
      </main>
      <Footer name={config.name || ''} />
    </>
  );
}
