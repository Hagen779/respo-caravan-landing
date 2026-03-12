'use client';

import { Row, Col, Card } from 'antd';
import {
  ThunderboltOutlined,
  StarOutlined,
  RocketOutlined,
  SafetyOutlined,
  SunOutlined,
  CrownOutlined,
  SaveOutlined,
  AppstoreOutlined,
} from '@ant-design/icons';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'motion/react';

export function Advantages() {
  const { t } = useLanguage();

  const advantages = [
    { icon: <ThunderboltOutlined className="text-3xl" />, title: t('advantages.1.title'), description: t('advantages.1.desc') },
    { icon: <StarOutlined className="text-3xl" />, title: t('advantages.2.title'), description: t('advantages.2.desc') },
    { icon: <RocketOutlined className="text-3xl" />, title: t('advantages.3.title'), description: t('advantages.3.desc') },
    { icon: <SafetyOutlined className="text-3xl" />, title: t('advantages.4.title'), description: t('advantages.4.desc') },
    { icon: <SunOutlined className="text-3xl" />, title: t('advantages.5.title'), description: t('advantages.5.desc') },
    { icon: <CrownOutlined className="text-3xl" />, title: t('advantages.6.title'), description: t('advantages.6.desc') },
    { icon: <SaveOutlined className="text-3xl" />, title: t('advantages.7.title'), description: t('advantages.7.desc') },
    { icon: <AppstoreOutlined className="text-3xl" />, title: t('advantages.8.title'), description: t('advantages.8.desc') },
  ];

  return (
    <section id="advantages" className="py-12 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3">{t('advantages.title')}</h2>
          <div className="w-20 h-0.5 mx-auto" style={{ backgroundColor: '#FF5A2F' }} />
        </motion.div>

        <Row gutter={[24, 32]}>
          {advantages.map((advantage, index) => (
            <Col xs={24} sm={12} lg={6} key={index} style={{ display: 'flex' }}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                style={{ width: '100%', display: 'flex', flexDirection: 'column' }}
              >
                <Card
                  hoverable
                  className="transition-all duration-300 hover:shadow-lg"
                  style={{ borderColor: '#e5e7eb', flex: 1, display: 'flex', flexDirection: 'column' }}
                  styles={{ body: { flex: 1, display: 'flex', flexDirection: 'column' } }}
                >
                  <div className="text-center flex flex-col h-full">
                    <div
                      className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: '#FF5A2F', color: '#ffffff' }}
                    >
                      {advantage.icon}
                    </div>
                    <h3 className="text-lg font-bold mb-2 text-black">{advantage.title}</h3>
                    <p className="text-gray-500 text-sm flex-1">{advantage.description}</p>
                  </div>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
}
