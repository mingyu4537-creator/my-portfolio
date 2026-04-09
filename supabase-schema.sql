-- ============================================
-- 포트폴리오 사이트 DB 스키마
-- Supabase SQL Editor에서 실행
-- ============================================

-- 프로젝트 테이블
CREATE TABLE projects (
  id            UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title         TEXT NOT NULL,
  description   TEXT,
  detail        TEXT,
  category      TEXT,
  tech_stack    TEXT[] DEFAULT '{}',
  thumbnail_url TEXT,
  github_url    TEXT,
  live_url      TEXT,
  is_featured   BOOLEAN DEFAULT false,
  sort_order    INTEGER DEFAULT 0,
  created_at    TIMESTAMPTZ DEFAULT now(),
  updated_at    TIMESTAMPTZ DEFAULT now()
);

-- 프로젝트 첨부파일 테이블
CREATE TABLE project_files (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id  UUID REFERENCES projects(id) ON DELETE CASCADE,
  file_name   TEXT NOT NULL,
  file_url    TEXT NOT NULL,
  file_type   TEXT NOT NULL,
  file_size   INTEGER,
  sort_order  INTEGER DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT now()
);

-- 경력 테이블
CREATE TABLE experiences (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company     TEXT NOT NULL,
  role        TEXT NOT NULL,
  period      TEXT NOT NULL,
  description TEXT,
  highlights  TEXT[] DEFAULT '{}',
  sort_order  INTEGER DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT now()
);

-- 기술 스택 테이블
CREATE TABLE skills (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  category    TEXT NOT NULL,
  name        TEXT NOT NULL,
  level       INTEGER DEFAULT 50,
  icon_name   TEXT,
  sort_order  INTEGER DEFAULT 0
);

-- 사이트 설정 테이블
CREATE TABLE site_config (
  key         TEXT PRIMARY KEY,
  value       TEXT NOT NULL,
  updated_at  TIMESTAMPTZ DEFAULT now()
);

-- 기본 사이트 설정 데이터
INSERT INTO site_config (key, value) VALUES
  ('name', '홍길동'),
  ('title', 'Full-Stack Developer'),
  ('email', 'hello@example.com'),
  ('bio', '안녕하세요! 웹 개발자입니다.'),
  ('github', 'https://github.com'),
  ('linkedin', ''),
  ('profile_image', ''),
  ('resume_url', '');

-- ============================================
-- RLS (Row Level Security) 정책
-- ============================================

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_config ENABLE ROW LEVEL SECURITY;

-- 공개 읽기 정책
CREATE POLICY "Public read projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Public read project_files" ON project_files FOR SELECT USING (true);
CREATE POLICY "Public read experiences" ON experiences FOR SELECT USING (true);
CREATE POLICY "Public read skills" ON skills FOR SELECT USING (true);
CREATE POLICY "Public read site_config" ON site_config FOR SELECT USING (true);

-- 관리자 쓰기 정책
CREATE POLICY "Admin insert projects" ON projects FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admin update projects" ON projects FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admin delete projects" ON projects FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Admin insert project_files" ON project_files FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admin update project_files" ON project_files FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admin delete project_files" ON project_files FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Admin insert experiences" ON experiences FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admin update experiences" ON experiences FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admin delete experiences" ON experiences FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Admin insert skills" ON skills FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admin update skills" ON skills FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admin delete skills" ON skills FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Admin insert site_config" ON site_config FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admin update site_config" ON site_config FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admin delete site_config" ON site_config FOR DELETE USING (auth.role() = 'authenticated');

-- updated_at 자동 갱신 트리거
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER site_config_updated_at
  BEFORE UPDATE ON site_config
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================
-- Storage 버킷 (Supabase 대시보드에서 수동 생성 또는 아래 실행)
-- ============================================
-- INSERT INTO storage.buckets (id, name, public) VALUES ('thumbnails', 'thumbnails', true);
-- INSERT INTO storage.buckets (id, name, public) VALUES ('project-files', 'project-files', true);
-- INSERT INTO storage.buckets (id, name, public) VALUES ('profile', 'profile', true);
-- INSERT INTO storage.buckets (id, name, public) VALUES ('resume', 'resume', true);

-- Storage RLS: 누구나 읽기, 인증된 사용자만 쓰기
CREATE POLICY "Public read storage" ON storage.objects FOR SELECT USING (true);
CREATE POLICY "Admin upload storage" ON storage.objects FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admin update storage" ON storage.objects FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admin delete storage" ON storage.objects FOR DELETE USING (auth.role() = 'authenticated');
