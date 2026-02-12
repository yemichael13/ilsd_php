import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import am from './locales/am.json';

const resources = {
  en: { translation: en },
  am: { translation: am },
};

const savedLng = typeof window !== 'undefined' ? localStorage.getItem('i18nextLng') : null;

i18n.use(initReactI18next).init({
  resources,
  lng: savedLng || 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
  react: { useSuspense: false },
});

// keep lang persisted and reflect on document element for font-css hooks
if (typeof window !== 'undefined') {
  document.documentElement.lang = i18n.language || 'en';
  i18n.on('languageChanged', (lng) => {
    try {
      localStorage.setItem('i18nextLng', lng);
    } catch (e) {
      /* ignore */
    }
    document.documentElement.lang = lng;
  });
}

export default i18n;
