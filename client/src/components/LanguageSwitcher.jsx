import React from 'react';
import { useTranslation } from 'react-i18next';

// Single-toggle language switcher: shows the NEXT language to switch to.
const LanguageSwitcher = ({ className = '' }) => {
  const { i18n } = useTranslation();
  const lang = (i18n.language || 'en').split('-')[0];

  const toggle = () => {
    const next = lang === 'en' ? 'am' : 'en';
    i18n.changeLanguage(next);
    try {
      localStorage.setItem('i18nextLng', next);
    } catch (e) {}
  };

  // display label is the language code the button will switch TO
  const nextLabel = lang === 'en' ? 'አማ' : 'EN';

  return (
    <button
      onClick={toggle}
      aria-label={`Switch language to ${lang === 'en' ? 'Amharic' : 'English'}`}
      className={`px-3 py-1 rounded-md transition-colors ${className} bg-white border text-black`}
    >
      {nextLabel}
    </button>
  );
};

export default LanguageSwitcher;
