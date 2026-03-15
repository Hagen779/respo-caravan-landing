'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion, AnimatePresence } from 'motion/react';

const heroImages = [
  { src: 'https://images.unsplash.com/photo-1736709103713-0a9d0da445f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200', alt: 'Camping trailer in nature' },
  { src: 'https://images.unsplash.com/photo-1646256815071-e8e80c6abae0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200', alt: 'Camper van landscape' },
  { src: 'https://images.unsplash.com/photo-1771085167612-0f86394352ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200', alt: 'Caravan travel' },
  { src: 'https://images.unsplash.com/photo-1664132659621-4946784ccff5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200', alt: 'Camping trailer' },
  { src: 'https://images.unsplash.com/photo-1597078787820-b88375e0cd36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200', alt: 'Outdoor caravan' },
];

interface HeroProps {
  onCTAClick: () => void;
}

export function Hero({ onCTAClick }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { t } = useLanguage();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const currentImage = heroImages[currentSlide];

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <Image
            src={currentImage.src}
            alt={currentImage.alt}
            fill
            className="object-cover"
            sizes="100vw"
            priority
            quality={75}
          />
          <div className="absolute inset-0 bg-black/50" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="text-center px-4 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <h1 className="mb-8">
              <span
                className="block text-white font-bold tracking-tighter leading-[0.85] mb-3"
                style={{ fontSize: 'clamp(4rem, 15vw, 12rem)', textShadow: '0 4px 20px rgba(0, 0, 0, 0.5)' }}
              >
                RESPO
              </span>
              <span
                className="block font-bold tracking-tighter leading-[0.85]"
                style={{
                  fontSize: 'clamp(4rem, 15vw, 12rem)',
                  color: '#FF5A2F',
                  textShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
                }}
              >
                CARAVAN
              </span>
            </h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="text-white text-lg sm:text-xl md:text-2xl mb-12 font-light tracking-wider uppercase"
              style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.7)' }}
            >
              {t('hero.slogan')}
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.8 }}>
              <Button
                type="primary"
                size="large"
                onClick={onCTAClick}
                className="h-14 px-12 text-lg font-semibold border-0 shadow-2xl hover:shadow-[#FF5A2F]/50 transition-all duration-300 hover:scale-105"
                style={{ backgroundColor: '#FF5A2F' }}
                icon={<ArrowRightOutlined />}
                iconPlacement="end"
              >
                {t('hero.cta')}
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className="w-3 h-3 rounded-full transition-all duration-300"
            style={{
              backgroundColor: currentSlide === index ? '#FF5A2F' : 'rgba(255, 255, 255, 0.5)',
              transform: currentSlide === index ? 'scale(1.3)' : 'scale(1)',
            }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-24 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-1.5 h-1.5 bg-white rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
