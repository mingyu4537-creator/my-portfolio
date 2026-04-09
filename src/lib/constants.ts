export const FILE_TYPES = {
  image: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'],
  code: ['js', 'ts', 'tsx', 'jsx', 'py', 'java', 'cpp', 'c', 'html', 'css', 'json', 'md'],
  document: ['pdf', 'docx', 'pptx', 'xlsx'],
  video: ['mp4', 'webm'],
} as const;

export const MAX_FILE_SIZE = {
  image: 10 * 1024 * 1024,    // 10MB
  code: 5 * 1024 * 1024,      // 5MB
  document: 20 * 1024 * 1024,  // 20MB
  video: 50 * 1024 * 1024,     // 50MB
} as const;

export const CATEGORIES = ['web', 'app', 'design', 'ai', 'game', 'other'] as const;

export function getFileType(fileName: string): keyof typeof FILE_TYPES {
  const ext = fileName.split('.').pop()?.toLowerCase() || '';
  for (const [type, extensions] of Object.entries(FILE_TYPES)) {
    if ((extensions as readonly string[]).includes(ext)) {
      return type as keyof typeof FILE_TYPES;
    }
  }
  return 'document';
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}
