import { createClient } from '@/lib/supabase/server';
import PortfolioClient from '@/components/public/PortfolioClient';

// 빌드 시 정적 생성 (SSG) - 콜드 스타트 없음
export const dynamic = 'force-static';
export const revalidate = false;

export default async function HomePage() {
  const supabase = createClient();

  const configRes = await supabase.from('site_config').select('*');

  const config: Record<string, string> = {};
  configRes.data?.forEach((row) => {
    config[row.key] = row.value;
  });

  return (
    <PortfolioClient config={config} />
  );
}
