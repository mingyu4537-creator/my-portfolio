export const dynamic = 'force-dynamic';

import { createClient } from '@/lib/supabase/server';
import PortfolioClient from '@/components/public/PortfolioClient';

export default async function HomePage() {
  const supabase = createClient();

  const [projectsRes, experiencesRes, skillsRes, configRes] = await Promise.all([
    supabase.from('projects').select('*, files:project_files(*)').order('sort_order'),
    supabase.from('experiences').select('*').order('sort_order'),
    supabase.from('skills').select('*').order('sort_order'),
    supabase.from('site_config').select('*'),
  ]);

  const config: Record<string, string> = {};
  configRes.data?.forEach((row) => {
    config[row.key] = row.value;
  });

  return (
    <PortfolioClient
      projects={projectsRes.data || []}
      experiences={experiencesRes.data || []}
      skills={skillsRes.data || []}
      config={config}
    />
  );
}
