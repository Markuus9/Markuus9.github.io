import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown, Languages } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useClickOutside } from '@/hooks/useLanguage';

const languages = [
    {   code: 'en', 
        name: 'English', 
        flag: (
            <img 
                src="/images/Bandera_EEUU_emoji.png" 
                className="h-[18px] w-[22px] ml-0.5 p-0" 
                alt="Catalan flag"
            /> 
        ),
    },
    {   code: 'es', 
        name: 'Español', 
        flag: (
            <img 
                src="/images/Bandera_española_emoji.png" 
                className="h-[20px] w-[22px] ml-0.5 p-0" 
                alt="Spanish flag"
            />
        ) 
    },
    { 
        code: 'ca', 
        name: 'Català', 
        flag: (
            <img 
                src="/images/Bandera_catalana_emoji.png" 
                className="h-[16px] w-[22px] ml-0.5 p-0 -scale-x-100" 
                alt="Catalan flag"
            />
        ),
    },
];

export const LanguageSelector = () => {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);
  const ref = useClickOutside(closeMenu);

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const handleLanguageChange = (languageCode) => {
    i18n.changeLanguage(languageCode);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-md bg-card border border-border hover:bg-card/80 transition-colors duration-200"
        aria-label={t('language.select')}
      >
        <Languages className="h-4 w-4" />
        <span className="text-sm font-medium m-0 p-0">{currentLanguage.flag}</span>
        <ChevronDown className={cn(
          "h-4 w-4 transition-transform duration-200",
          isOpen && "rotate-180"
        )} />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-1 w-48 bg-card border border-border rounded-md shadow-lg z-50">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => handleLanguageChange(language.code)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-card/80 transition-colors duration-200 first:rounded-t-md last:rounded-b-md",
                i18n.language === language.code && "bg-primary/10 text-primary"
              )}
            >
              <span className="text-lg">{language.flag}</span>
              <span className="text-sm font-medium">{language.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
