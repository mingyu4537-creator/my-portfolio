import { createClient } from '@/lib/supabase/server';
import PortfolioClient from '@/components/public/PortfolioClient';

// ISR: 60초마다 재검증 — 관리자에서 수정하면 최대 1분 후 반영
export const revalidate = 60;

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
