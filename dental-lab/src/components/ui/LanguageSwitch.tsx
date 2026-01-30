'use client';

import { useLanguage } from '@/lib/i18n';

export default function LanguageSwitch() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2 text-xs">
      <button
        onClick={() => setLanguage('pl')}
        className={`px-3 py-1 rounded-full transition-colors ${
          language === 'pl'
            ? 'bg-white text-black'
            : 'text-zinc-500 hover:text-white'
        }`}
      >
        PL
      </button>
      <button
        onClick={() => setLanguage('en')}
        className={`px-3 py-1 rounded-full transition-colors ${
          language === 'en'
            ? 'bg-white text-black'
            : 'text-zinc-500 hover:text-white'
        }`}
      >
        EN
      </button>
    </div>
  );
}
