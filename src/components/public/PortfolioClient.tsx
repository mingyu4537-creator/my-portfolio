'use client';

import Navbar from './Navbar';
import Hero from './Hero';
import About from './About';
import Works from './Works';
import AIWorks from './AIWorks';
import AIChatbot from './AIChatbot';
import Illustrations from './Illustrations';
import Emoticons from './Emoticons';
import YouTubeShorts from './YouTubeShorts';
import Experience from './Experience';
import Contact from './Contact';
import Footer from './Footer';
import ScrollProgress from '@/components/ui/ScrollProgress';
interface Props {
  config: Record<string, string>;
}

// public/illustrations/ 폴더의 이미지 목록
// 새 이미지 추가 시 여기에 추가하면 됨
const illustrationImages: { src: string; title: string }[] = [
  { src: '/illustrations/77260439_p0_master1200.webp', title: '나비와 검사' },
  { src: '/illustrations/81487200_p0_master1200.webp', title: '카페 소녀' },
  { src: '/illustrations/82251967_p0_master1200.webp', title: '전통 의상 소녀' },
  { src: '/illustrations/82648293_p0_master1200.webp', title: '여름밤의 해변' },
  { src: '/illustrations/94278439_p0_master1200.webp', title: '고양이 메이드' },
  { src: '/illustrations/139489092_p0_master1200.webp', title: '바니걸 블루' },
  { src: '/illustrations/139608851_p0_master1200.webp', title: '바니걸 다크' },
  { src: '/illustrations/139640221_p0_master1200.webp', title: '바니걸 네이비' },
  { src: '/illustrations/139896476_p0_master1200.webp', title: '여름 수영장' },
  { src: '/illustrations/140003591_p0_master1200.webp', title: '바니걸 포즈' },
  { src: '/illustrations/140132484_p0_master1200.webp', title: '핑크 엔젤' },
  { src: '/illustrations/140207533_p0_master1200.webp', title: '교복 소녀' },
  { src: '/illustrations/140285644_p0_master1200.webp', title: '실버 캣' },
  { src: '/illustrations/140362392_p0_master1200.webp', title: '수줍은 미소' },
  { src: '/illustrations/140476366_p0_master1200.webp', title: '피스 사인' },
  { src: '/illustrations/140601149_p0_master1200.webp', title: '하교길' },
  { src: '/illustrations/140766084_p0_master1200.webp', title: '두 소녀' },
  { src: '/illustrations/140966734_p0_master1200.webp', title: '바니걸 블랙' },
  { src: '/illustrations/141407419_p0_master1200.webp', title: '차이나 드레스' },
];

export default function PortfolioClient({ config }: Props) {
  return (
    <>
      <ScrollProgress />
      <Navbar name={config.name || ''} />
      <main>
        <Hero />
        <About />
        <Works />
        <AIWorks />
        <AIChatbot />
        <Illustrations images={illustrationImages} />
        <Emoticons />
        <YouTubeShorts />
        <Experience />
        <Contact />
      </main>
      <Footer name={config.name || ''} />
    </>
  );
}
