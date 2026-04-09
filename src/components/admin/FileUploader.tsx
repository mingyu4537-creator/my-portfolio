'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, FileText, Image as ImageIcon, Code, Film } from 'lucide-react';
import { getFileType, formatFileSize, MAX_FILE_SIZE } from '@/lib/constants';

interface UploadedFile {
  file_name: string;
  file_url: string;
  file_type: string;
  file_size: number;
}

interface FileUploaderProps {
  onFilesUploaded: (files: UploadedFile[]) => void;
  existingFiles?: UploadedFile[];
  bucket?: string;
  maxFiles?: number;
}

const typeIcons = {
  image: ImageIcon,
  code: Code,
  document: FileText,
  video: Film,
};

export default function FileUploader({
  onFilesUploaded,
  existingFiles = [],
  bucket = 'project-files',
  maxFiles = 20,
}: FileUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [files, setFiles] = useState<UploadedFile[]>(existingFiles);
  const [progress, setProgress] = useState(0);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setUploading(true);
    setProgress(0);

    const uploaded: UploadedFile[] = [];
    const total = acceptedFiles.length;

    for (let i = 0; i < total; i++) {
      const file = acceptedFiles[i];
      const fileType = getFileType(file.name);
      const maxSize = MAX_FILE_SIZE[fileType];

      if (file.size > maxSize) {
        alert(`${file.name} 파일이 너무 큽니다. (최대 ${formatFileSize(maxSize)})`);
        continue;
      }

      const formData = new FormData();
      formData.append('file', file);
      formData.append('bucket', bucket);

      try {
        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (res.ok) {
          const data = await res.json();
          uploaded.push({
            file_name: file.name,
            file_url: data.url,
            file_type: fileType,
            file_size: file.size,
          });
        }
      } catch (err) {
        console.error('Upload failed:', file.name, err);
      }

      setProgress(Math.round(((i + 1) / total) * 100));
    }

    const newFiles = [...files, ...uploaded];
    setFiles(newFiles);
    onFilesUploaded(newFiles);
    setUploading(false);
    setProgress(0);
  }, [files, bucket, onFilesUploaded]);

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    onFilesUploaded(newFiles);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles,
    disabled: uploading,
  });

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition ${
          isDragActive
            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
            : 'border-gray-300 dark:border-gray-700 hover:border-primary-400'
        } ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <input {...getInputProps()} />
        <Upload className="w-10 h-10 mx-auto mb-3 text-gray-400" />
        {isDragActive ? (
          <p className="text-primary-600 font-medium">파일을 놓으세요</p>
        ) : (
          <>
            <p className="font-medium">파일을 드래그하거나 클릭하여 업로드</p>
            <p className="text-sm text-gray-500 mt-1">
              이미지, 코드, 문서 파일 지원
            </p>
          </>
        )}
      </div>

      {uploading && (
        <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2">
          <div
            className="bg-primary-600 h-2 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file, i) => {
            const Icon = typeIcons[file.file_type as keyof typeof typeIcons] || FileText;
            return (
              <div
                key={i}
                className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg"
              >
                <Icon className="w-5 h-5 text-gray-500 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{file.file_name}</p>
                  <p className="text-xs text-gray-500">
                    {file.file_type} · {formatFileSize(file.file_size)}
                  </p>
                </div>
                {file.file_type === 'image' && (
                  <img
                    src={file.file_url}
                    alt={file.file_name}
                    className="w-10 h-10 object-cover rounded"
                  />
                )}
                <button
                  onClick={() => removeFile(i)}
                  className="p-1 hover:bg-red-100 dark:hover:bg-red-900/30 rounded text-red-500"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
