'use client';

import Navbar from './Navbar';
import Hero from './Hero';
import About from './About';
import Skills from './Skills';
import Projects from './Projects';
import Works from './Works';
import Illustrations from './Illustrations';
import YouTubeShorts from './YouTubeShorts';
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

// public/illustrations/ 폴더의 이미지 목록
// 새 이미지 추가 시 여기에 추가하면 됨
const illustrationImages: { src: string; title: string }[] = [
  { src: '/illustrations/77260439_p0_master1200.jpg', title: 'Illustration 1' },
  { src: '/illustrations/81487200_p0_master1200.jpg', title: 'Illustration 2' },
  { src: '/illustrations/82251967_p0_master1200.jpg', title: 'Illustration 3' },
  { src: '/illustrations/82648293_p0_master1200.jpg', title: 'Illustration 4' },
  { src: '/illustrations/94278439_p0_master1200.jpg', title: 'Illustration 5' },
  { src: '/illustrations/139489092_p0_master1200.jpg', title: 'Illustration 6' },
  { src: '/illustrations/139608851_p0_master1200.jpg', title: 'Illustration 7' },
  { src: '/illustrations/139640221_p0_master1200.jpg', title: 'Illustration 8' },
  { src: '/illustrations/139896476_p0_master1200.jpg', title: 'Illustration 9' },
  { src: '/illustrations/140003591_p0_master1200.jpg', title: 'Illustration 10' },
  { src: '/illustrations/140132484_p0_master1200.jpg', title: 'Illustration 11' },
  { src: '/illustrations/140207533_p0_master1200.jpg', title: 'Illustration 12' },
  { src: '/illustrations/140285644_p0_master1200.jpg', title: 'Illustration 13' },
  { src: '/illustrations/140362392_p0_master1200.jpg', title: 'Illustration 14' },
  { src: '/illustrations/140476366_p0_master1200.jpg', title: 'Illustration 15' },
  { src: '/illustrations/140601149_p0_master1200.jpg', title: 'Illustration 16' },
  { src: '/illustrations/140766084_p0_master1200.jpg', title: 'Illustration 17' },
  { src: '/illustrations/140966734_p0_master1200.jpg', title: 'Illustration 18' },
  { src: '/illustrations/141407419_p0_master1200.jpg', title: 'Illustration 19' },
];

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
        <Works />
        <Illustrations images={illustrationImages} />
        <YouTubeShorts />
        <Experience experiences={experiences} />
        <Contact config={config} />
      </main>
      <Footer name={config.name || ''} />
    </>
  );
}
