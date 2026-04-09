import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('projects')
    .select('*, files:project_files(*)')
    .eq('id', params.id)
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 404 });
  return NextResponse.json(data);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const supabase = createClient();
  const body = await request.json();
  const { files, ...projectData } = body;

  const { data, error } = await supabase
    .from('projects')
    .update(projectData)
    .eq('id', params.id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // 파일 교체: 기존 삭제 후 새로 삽입
  if (files !== undefined) {
    await supabase.from('project_files').delete().eq('project_id', params.id);
    if (files.length > 0) {
      const fileRecords = files.map((f: Record<string, string | number>, i: number) => ({
        project_id: params.id,
        file_name: f.file_name,
        file_url: f.file_url,
        file_type: f.file_type,
        file_size: f.file_size,
        sort_order: i,
      }));
      await supabase.from('project_files').insert(fileRecords);
    }
  }

  return NextResponse.json(data);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const supabase = createClient();
  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', params.id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
