import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = {
  code: string;
  name: string;
  flag: string;
  direction: 'ltr' | 'rtl';
};

export const languages: Record<string, Language> = {
  en: {
    code: 'en',
    name: 'English',
    flag: '🇬🇧',
    direction: 'ltr',
  },
  ar: {
    code: 'ar',
    name: 'العربية',
    flag: '🇦🇪',
    direction: 'rtl',
  },
  ru: {
    code: 'ru',
    name: 'Русский',
    flag: '🇷🇺',
    direction: 'ltr',
  },
  zh: {
    code: 'zh',
    name: '中文',
    flag: '🇨🇳',
    direction: 'ltr',
  },
  hi: {
    code: 'hi',
    name: 'हिन्दी',
    flag: '🇮🇳',
    direction: 'ltr',
  },
};

interface LanguageContextType {
  currentLanguage: Language;
  changeLanguage: (code: string) => void;
}

const LanguageContext = createContext<LanguageContextType>({
  currentLanguage: languages.en,
  changeLanguage: () => {},
});

export const LanguageProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(languages.en);

  const changeLanguage = (code: string) => {
    if (languages[code]) {
      setCurrentLanguage(languages[code]);
      
      // Update document direction for RTL/LTR support
      document.documentElement.dir = languages[code].direction;
      
      // You would typically load translations here
      // and update the app's text content
    }
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);