'use client';

import Image from 'next/image';
import { Card, Row, Col, Button } from 'antd';
import { CheckOutlined, StarOutlined } from '@ant-design/icons';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'motion/react';
import type { TrailerType } from '@/components/TrailerTypes/TrailerTypes';

export type ConfigType = 'base' | 'mid' | 'performance' | null;

interface ConfigurationsProps {
  selectedConfig: ConfigType;
  onSelectConfig: (config: ConfigType) => void;
  onOrderClick: () => void;
  selectedTrailerType?: TrailerType;
}

export function Configurations({
  selectedConfig,
  onSelectConfig,
  onOrderClick,
}: ConfigurationsProps) {
  const { t, language } = useLanguage();

  const configs = [
    {
      type: 'base' as const,
      name: t('config.base.name'),
      image:
        'https://images.unsplash.com/photo-1716919875151-674390e0dd57?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      price: '€8,500',
      features: [t('config.base.feature1'), t('config.base.feature2'), t('config.base.feature3')],
      popular: false,
    },
    {
      type: 'mid' as const,
      name: t('config.mid.name'),
      image:
        'https://images.unsplash.com/photo-1692279952914-e8416fa6697b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      price: '€11,500',
      features: [t('config.mid.feature1'), t('config.mid.feature2'), t('config.mid.feature3')],
      popular: true,
    },
    {
      type: 'performance' as const,
      name: t('config.performance.name'),
      image:
        'https://images.unsplash.com/photo-1692279952778-00ce5c3ce02c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      price: '€15,500',
      features: [
        t('config.performance.feature1'),
        t('config.performance.feature2'),
        t('config.performance.feature3'),
      ],
      popular: false,
    },
  ];

  return (
    <section id="configurations" className="py-12 px-4 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/config-section-bg.jpg"
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
          quality={70}
          priority={false}
        />
        <div className="absolute inset-0 bg-white/88" aria-hidden />
      </div>
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            {language === 'en' ? 'Choose Configuration' : 'Оберіть комплектацію'}
          </h2>
          <div className="w-20 h-0.5 mx-auto" style={{ backgroundColor: '#FF5A2F' }} />
        </motion.div>

        <Row gutter={[24, 24]}>
          {configs.map((config, index) => (
            <Col xs={24} md={12} lg={8} key={config.type}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                className="h-full"
              >
                <Card
                  hoverable
                  className={`h-full relative transition-all duration-300 ${
                    selectedConfig === config.type
                      ? 'ring-4 ring-[#FF5A2F] shadow-2xl'
                      : 'hover:shadow-xl'
                  }`}
                  style={{
                    borderColor: selectedConfig === config.type ? '#FF5A2F' : '#e5e7eb',
                  }}
                  cover={
                    <div className="relative overflow-hidden h-64 bg-gray-100">
                      <Image
                        alt={config.name}
                        src={config.image}
                        fill
                        className="object-cover transition-transform duration-500 hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        quality={75}
                      />
                      {config.popular && (
                        <div
                          className="absolute top-4 left-4 px-4 py-2 rounded-full text-white font-semibold text-sm shadow-lg flex items-center"
                          style={{ backgroundColor: '#FF5A2F' }}
                        >
                          <StarOutlined className="mr-2" />
                          Popular
                        </div>
                      )}
                      {selectedConfig === config.type && (
                        <div
                          className="absolute top-4 right-4 w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
                          style={{ backgroundColor: '#FF5A2F' }}
                        >
                          <CheckOutlined className="text-white text-2xl" />
                        </div>
                      )}
                    </div>
                  }
                >
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-bold">{config.name}</h3>
                      <span className="text-2xl font-bold" style={{ color: '#FF5A2F' }}>
                        {config.price}
                      </span>
                    </div>
                    <ul className="space-y-3 mb-8">
                      {config.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <CheckOutlined className="mt-1 mr-3 flex-shrink-0" style={{ color: '#FF5A2F' }} />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="space-y-2">
                      <Button
                        type={selectedConfig === config.type ? 'default' : 'primary'}
                        size="large"
                        block
                        onClick={() => onSelectConfig(config.type)}
                        className="h-12 font-semibold"
                        style={{
                          backgroundColor: selectedConfig === config.type ? undefined : '#FF5A2F',
                          borderColor: '#FF5A2F',
                          color: selectedConfig === config.type ? '#FF5A2F' : 'white',
                        }}
                      >
                        {selectedConfig === config.type ? (
                          <>
                            <CheckOutlined /> {t('config.selected')}
                          </>
                        ) : (
                          t('types.select')
                        )}
                      </Button>
                      {selectedConfig === config.type && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} transition={{ duration: 0.3 }}>
                          <Button type="primary" size="large" block onClick={onOrderClick} className="h-12 font-semibold" style={{ backgroundColor: '#000000' }}>
                            {t('config.order')}
                          </Button>
                        </motion.div>
                      )}
                    </div>
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
