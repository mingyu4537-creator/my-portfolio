import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('projects')
    .select('*, files:project_files(*)')
    .order('sort_order', { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const supabase = createClient();
  const body = await request.json();
  const { files, ...projectData } = body;

  const { data: project, error } = await supabase
    .from('projects')
    .insert(projectData)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  if (files && files.length > 0) {
    const fileRecords = files.map((f: Record<string, string | number>, i: number) => ({
      project_id: project.id,
      file_name: f.file_name,
      file_url: f.file_url,
      file_type: f.file_type,
      file_size: f.file_size,
      sort_order: i,
    }));
    await supabase.from('project_files').insert(fileRecords);
  }

  return NextResponse.json(project, { status: 201 });
}
