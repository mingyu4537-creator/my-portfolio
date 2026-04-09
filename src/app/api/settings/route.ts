import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('site_config')
    .select('*');

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const config: Record<string, string> = {};
  data?.forEach((row) => {
    config[row.key] = row.value;
  });

  return NextResponse.json(config);
}

export async function PUT(request: NextRequest) {
  const supabase = createClient();
  const body = await request.json();

  const updates = Object.entries(body).map(([key, value]) =>
    supabase
      .from('site_config')
      .upsert({ key, value: value as string }, { onConflict: 'key' })
  );

  await Promise.all(updates);
  return NextResponse.json({ success: true });
}
