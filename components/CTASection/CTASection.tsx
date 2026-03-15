'use client';

import Image from 'next/image';
import { Button } from 'antd';
import { RocketOutlined } from '@ant-design/icons';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'motion/react';

const ctaBackgroundSrc =
  'https://images.unsplash.com/photo-1760715142712-85521c19e587?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200';

interface CTASectionProps {
  onCTAClick: () => void;
}

export function CTASection({ onCTAClick }: CTASectionProps) {
  const { t } = useLanguage();

  return (
    <section className="relative py-20 px-4 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src={ctaBackgroundSrc}
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
          quality={75}
        />
      </div>
      <div className="absolute inset-0 bg-black/70 z-[1]" />

      <div className="relative z-[2] max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">{t('cta.title')}</h2>
          <p className="text-lg md:text-xl text-gray-300 mb-8">{t('cta.subtitle')}</p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              type="primary"
              size="large"
              onClick={onCTAClick}
              icon={<RocketOutlined />}
              iconPlacement="end"
              className="h-14 px-20 shadow-2xl hover:shadow-[#FF5A2F]/50 transition-all duration-300 font-semibold"
              style={{ backgroundColor: '#FF5A2F' }}
            >
              {t('cta.button')}
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
