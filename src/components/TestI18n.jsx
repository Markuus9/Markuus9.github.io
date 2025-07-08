import React, { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { LanguageSelector } from './LanguageSelector';

const TestI18n = () => {
  const { t, ready } = useTranslation();

  if (!ready) return <div>Loading translations...</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Test Internationalization</h1>
      <LanguageSelector />
      <div className="mt-4">
        <p><strong>Navigation Home:</strong> {t('nav.home')}</p>
        <p><strong>Hero Greeting:</strong> {t('hero.greeting')}</p>
        <p><strong>About Title:</strong> {t('about.title')}</p>
      </div>
    </div>
  );
};

export default TestI18n;
