'use client';

import { Button } from 'antd';
import { PhoneOutlined } from '@ant-design/icons';
import { motion } from 'motion/react';
import { useLanguage } from '@/contexts/LanguageContext';

interface FloatingFeedbackButtonProps {
  onClick: () => void;
}

export function FloatingFeedbackButton({ onClick }: FloatingFeedbackButtonProps) {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 260, damping: 20 }}
      className="fixed bottom-8 right-8 z-40"
    >
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative">
        <Button
          type="primary"
          size="large"
          icon={<PhoneOutlined className="text-xl" />}
          onClick={onClick}
          className="h-14 px-20 shadow-2xl hover:shadow-[#FF5A2F]/50 transition-all duration-300 font-semibold"
          style={{ backgroundColor: '#FF5A2F', border: 'none', borderRadius: '100px' }}
        >
          {t('feedback.callBack')}
        </Button>
        <motion.div
          animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{ backgroundColor: '#FF5A2F', zIndex: -1 }}
        />
      </motion.div>
    </motion.div>
  );
}
