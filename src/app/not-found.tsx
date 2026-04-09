import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-primary-600 mb-4">404</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          페이지를 찾을 수 없습니다.
        </p>
        <Link
          href="/"
          className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-medium transition"
        >
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  );
}
