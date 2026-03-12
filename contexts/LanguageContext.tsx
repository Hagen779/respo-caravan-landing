'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'ua';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    'nav.types': 'Camper Types',
    'nav.configurations': 'Configurations',
    'nav.specs': 'Specifications',
    'nav.advantages': 'Advantages',
    'nav.options': 'Additional Options',
    'hero.slogan': 'One camper. Different life scenarios.',
    'hero.cta': 'Request a Consultation',
    'types.title': 'Choose your camper',
    'types.wide.name': 'Camper Wide',
    'types.wide.feature1': 'Spacious interior design',
    'types.wide.feature2': 'Perfect for families',
    'types.wide.feature3': 'Enhanced comfort',
    'types.offroad.name': 'Camper Off-Road',
    'types.offroad.feature1': 'All-terrain capability',
    'types.offroad.feature2': 'Rugged construction',
    'types.offroad.feature3': 'Adventure ready',
    'types.select': 'Choose',
    'types.selected': 'Selected',
    'config.title': 'Choose Your Configuration',
    'config.subtitle': 'Select a configuration to see detailed technical specifications',
    'config.base.name': 'Base',
    'config.base.feature1': 'Essential equipment',
    'config.base.feature2': 'Compact design',
    'config.base.feature3': 'Great value',
    'config.mid.name': 'Mid',
    'config.mid.feature1': 'Enhanced comfort',
    'config.mid.feature2': 'Additional features',
    'config.mid.feature3': 'Best balance',
    'config.performance.name': 'Performance',
    'config.performance.feature1': 'Premium materials',
    'config.performance.feature2': 'Full equipment',
    'config.performance.feature3': 'Maximum comfort',
    'config.basePrice': 'From €8,500',
    'config.order': 'Order Now',
    'config.selected': 'Selected',
    'specs.title': 'Technical Specifications',
    'cta.title': 'Start Your Adventure with Respo Caravan',
    'cta.subtitle': 'Get a free consultation and personalized offer',
    'cta.button': 'Request a Consultation',
    'form.title': 'Request Consultation',
    'form.name': 'Full Name',
    'form.phone': 'Phone Number',
    'form.email': 'Email',
    'form.message': 'Message (optional)',
    'form.submit': 'Submit Request',
    'form.success': 'Thank you! We will contact you soon.',
    'form.namePlaceholder': 'Enter your name',
    'form.phonePlaceholder': '+380',
    'form.emailPlaceholder': 'your@email.com',
    'form.messagePlaceholder': 'Tell us about your plans...',
    'feedback.callBack': 'Request a Call Back',
    'footer.contacts': 'Contacts',
    'footer.followUs': 'Follow Us',
    'footer.legal': 'Legal',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.copyright': '© 2026 Respo Caravan. All rights reserved.',
    'advantages.title': 'Why Choose Respo Caravan',
    'advantages.1.title': 'Lightweight & Compact',
    'advantages.1.desc': 'Easy to tow with any regular car',
    'advantages.2.title': 'Modern Design',
    'advantages.2.desc': 'Minimalist aesthetic with premium finish',
    'advantages.3.title': 'Quick Setup',
    'advantages.3.desc': 'Ready to use in minutes',
    'advantages.4.title': 'All-Season Use',
    'advantages.4.desc': 'Insulated for year-round comfort',
    'advantages.5.title': 'Autonomous',
    'advantages.5.desc': 'Independent power and water systems',
    'advantages.6.title': 'Quality Materials',
    'advantages.6.desc': 'Built to last with premium components',
    'advantages.7.title': 'Easy Storage',
    'advantages.7.desc': 'Compact size for convenient storage',
    'advantages.8.title': 'Versatile',
    'advantages.8.desc': 'Perfect for camping, travel, and shelter',
  },
  ua: {
    'nav.types': 'Типи кемперів',
    'nav.configurations': 'Комплектації',
    'nav.specs': 'Характеристики',
    'nav.advantages': 'Переваги',
    'nav.options': 'Додаткові опції',
    'hero.slogan': 'Один кемпер. Різні сценарії життя.',
    'hero.cta': 'Отримати консультацію',
    'types.title': 'Оберіть ваш кемпер',
    'types.wide.name': 'Camper Wide',
    'types.wide.feature1': "Просторий інтер'єр",
    'types.wide.feature2': "Ідеально для сім'ї",
    'types.wide.feature3': 'Підвищений комфорт',
    'types.offroad.name': 'Camper Off-Road',
    'types.offroad.feature1': 'Прохідність по бездоріжжю',
    'types.offroad.feature2': 'Міцна конструкція',
    'types.offroad.feature3': 'Готовий до пригод',
    'types.select': 'Обрати',
    'types.selected': 'Обрано',
    'config.title': 'Оберіть комплектацію',
    'config.subtitle': 'Виберіть комплектацію, щоб побачити детальні технічні характеристики',
    'config.base.name': 'Base',
    'config.base.feature1': 'Базове обладнання',
    'config.base.feature2': 'Компактний дизайн',
    'config.base.feature3': 'Чудова ціна',
    'config.mid.name': 'Mid',
    'config.mid.feature1': 'Покращений комфорт',
    'config.mid.feature2': 'Додаткові функції',
    'config.mid.feature3': 'Кращий баланс',
    'config.performance.name': 'Performance',
    'config.performance.feature1': 'Преміум матеріали',
    'config.performance.feature2': 'Повна комплектація',
    'config.performance.feature3': 'Максимум комфорту',
    'config.basePrice': 'Від €8,500',
    'config.order': 'Замовити',
    'config.selected': 'Обрано',
    'specs.title': 'Технічні характеристики',
    'cta.title': 'Почніть свою пригоду з Respo Caravan',
    'cta.subtitle': 'Отримайте безкоштовну консультацію та персональну пропозицію',
    'cta.button': 'Замовити дзвінок',
    'form.title': 'Запит на консультацію',
    'form.name': "Повне ім'я",
    'form.phone': 'Номер телефону',
    'form.email': 'Електронна пошта',
    'form.message': 'Повідомлення (опціонально)',
    'form.submit': 'Надіслати запит',
    'form.success': "Дякуємо! Ми зв'яжемося з вами найближчим часом.",
    'form.namePlaceholder': "Введіть ваше ім'я",
    'form.phonePlaceholder': '+380',
    'form.emailPlaceholder': 'ваша@пошта.com',
    'form.messagePlaceholder': 'Розкажіть про ваші плани...',
    'feedback.callBack': 'Замовити дзвінок',
    'footer.contacts': 'Контакти',
    'footer.followUs': 'Слідкуйте за нами',
    'footer.legal': 'Правова інформація',
    'footer.privacy': 'Політика конфіденційності',
    'footer.terms': 'Умови використання',
    'footer.copyright': '© 2026 Respo Caravan. Всі права захищені.',
    'advantages.title': 'Чому Respo Caravan',
    'advantages.1.title': 'Легкий і компактний',
    'advantages.1.desc': 'Буксирується будь-яким легковим авто',
    'advantages.2.title': 'Сучасний дизайн',
    'advantages.2.desc': 'Мінімалістична естетика з преміум оздобленням',
    'advantages.3.title': 'Швидке розгортання',
    'advantages.3.desc': 'Готовий до використання за хвилини',
    'advantages.4.title': 'Всесезонний',
    'advantages.4.desc': 'Утеплений для комфорту цілий рік',
    'advantages.5.title': 'Автономний',
    'advantages.5.desc': 'Незалежні системи живлення та води',
    'advantages.6.title': 'Якісні матеріали',
    'advantages.6.desc': 'Зроблено надовго з преміум компонентів',
    'advantages.7.title': 'Зручне зберігання',
    'advantages.7.desc': 'Компактний розмір для зручного зберігання',
    'advantages.8.title': 'Універсальний',
    'advantages.8.desc': 'Ідеально для кемпінгу, подорожей та укриття',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('useLanguage called outside LanguageProvider - using fallback');
      return {
        language: 'en' as Language,
        setLanguage: () => {},
        t: (key: string) => key,
      };
    }
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key] ?? key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
