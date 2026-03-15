'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button, Drawer } from 'antd';
import { MenuOutlined, GlobalOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'motion/react';

export function Navbar() {
  const [isSticky, setIsSticky] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
      const sections = ['hero', 'types', 'configurations', 'specs', 'advantages', 'calculator'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top: elementPosition - offset, behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const menuItems = [
    { key: 'types', label: t('nav.types') },
    { key: 'configurations', label: t('nav.configurations') },
    { key: 'advantages', label: t('nav.advantages') },
    { key: 'calculator', label: t('nav.options') },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          isSticky
            ? 'bg-black/95 backdrop-blur-md shadow-lg'
            : 'bg-white md:bg-transparent shadow-md md:shadow-none'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <div className="flex items-center space-x-2 md:space-x-4">
              <Button
                type="text"
                icon={<ArrowLeftOutlined className={isSticky ? 'text-white' : 'text-black md:text-white'} />}
                className={`${isSticky ? 'text-white' : 'text-black md:text-white'} hover:text-[#FF5A2F] transition-colors hidden sm:flex items-center`}
                style={isSticky ? { color: 'white' } : undefined}
                onClick={() => (window.location.href = '/')}
              >
                <span className="ml-2 text-sm md:text-base" style={isSticky ? { color: 'white' } : undefined}>Respo Trailers</span>
              </Button>
              <div
                className={`h-6 md:h-8 w-px ${isSticky ? 'bg-white/30' : 'bg-gray-300 md:bg-white/30'} hidden sm:block`}
              />
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center cursor-pointer relative h-8 md:h-10 w-auto"
                onClick={() => scrollToSection('hero')}
              >
                <Image
                  src="/images/logo-vertical.png"
                  alt="Respo Logo"
                  width={120}
                  height={40}
                  className={`h-8 md:h-10 w-auto object-contain ${!isSticky ? 'invert brightness-0 md:invert-0 md:brightness-100' : ''}`}
                  priority
                />
              </motion.div>
            </div>

            <div className="hidden md:flex items-center space-x-1">
              {menuItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => scrollToSection(item.key)}
                  className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                    activeSection === item.key ? 'text-white' : isSticky ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                  }`}
                  style={{ backgroundColor: activeSection === item.key ? '#FF5A2F' : 'transparent' }}
                >
                  {item.label}
                </button>
              ))}
              <div className="ml-4 flex items-center space-x-2">
                <GlobalOutlined className={`text-lg ${isSticky ? 'text-white' : 'text-gray-700'}`} />
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-3 py-1 rounded transition-colors ${
                    language === 'en' ? 'bg-[#FF5A2F] text-white' : isSticky ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => setLanguage('ua')}
                  className={`px-3 py-1 rounded transition-colors ${
                    language === 'ua' ? 'bg-[#FF5A2F] text-white' : isSticky ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  UA
                </button>
              </div>
            </div>

            <motion.div whileTap={{ scale: 0.95 }} className="md:hidden">
              <Button
                type="text"
                size="large"
                icon={<MenuOutlined className="text-2xl" style={{ color: '#FF5A2F' }} />}
                onClick={() => setMobileMenuOpen(true)}
                className="flex items-center justify-center w-12 h-12 hover:bg-orange-50/50 active:bg-orange-100/50 transition-all duration-200 rounded-lg"
              />
            </motion.div>
          </div>
        </div>
      </motion.nav>

      <Drawer
        title={
          <div className="flex items-center relative h-7 w-[140px]">
            <Image
              src="/images/logo-horizontal.png"
              alt="Respo Logo"
              width={140}
              height={28}
              className="object-contain object-left"
            />
          </div>
        }
        placement="right"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        styles={{ body: { padding: '24px 16px' }, wrapper: { width: '85%' } }}
        closeIcon={<span className="text-2xl">×</span>}
      >
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col space-y-3"
        >
          <Button
            type="default"
            icon={<ArrowLeftOutlined />}
            onClick={() => (window.location.href = '/')}
            className="justify-start h-12 text-base"
            size="large"
          >
            Respo Trailers
          </Button>
          <div className="h-px bg-gray-200 my-2" />
          {menuItems.map((item, index) => (
            <motion.button
              key={item.key}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => scrollToSection(item.key)}
              className={`px-5 py-4 rounded-lg text-left transition-all text-base font-medium ${
                activeSection === item.key ? 'text-white shadow-md' : 'text-gray-700 hover:bg-gray-100'
              }`}
              style={{ backgroundColor: activeSection === item.key ? '#FF5A2F' : 'transparent' }}
            >
              {item.label}
            </motion.button>
          ))}
          <div className="pt-6 border-t border-gray-200 mt-4">
            <div className="flex items-center space-x-2 mb-3">
              <GlobalOutlined className="text-xl text-gray-700" />
              <span className="font-semibold text-base">Language</span>
            </div>
            <div className="flex space-x-3">
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => setLanguage('en')}
                className={`flex-1 px-4 py-3 rounded-lg transition-colors font-medium ${
                  language === 'en' ? 'bg-[#FF5A2F] text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                English
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => setLanguage('ua')}
                className={`flex-1 px-4 py-3 rounded-lg transition-colors font-medium ${
                  language === 'ua' ? 'bg-[#FF5A2F] text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Українська
              </motion.button>
            </div>
          </div>
        </motion.div>
      </Drawer>
    </>
  );
}
