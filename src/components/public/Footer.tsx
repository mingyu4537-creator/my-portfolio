export default function Footer({ name }: { name: string }) {
  return (
    <footer className="py-8 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-6xl mx-auto px-4 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>&copy; {new Date().getFullYear()} {name || 'Portfolio'}. All rights reserved.</p>
      </div>
    </footer>
  );
}
