'use client';

import Image from 'next/image';
import { Card, Row, Col, Button } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'motion/react';

export type TrailerType = 'wide' | 'offroad' | null;

interface TrailerTypesProps {
  selectedType: TrailerType;
  onSelectType: (type: TrailerType) => void;
}

export function TrailerTypes({ selectedType, onSelectType }: TrailerTypesProps) {
  const { language, t } = useLanguage();

  const trailers = [
    {
      type: 'wide' as const,
      name: language === 'en' ? 'Camper Wide' : 'Camper Wide',
      image: '/images/trailer-wide.jpg',
      specs: [
        '2.90 × 1.87 m',
        language === 'en' ? '800 kg (can be towed with category B license)' : '800 кг (можна тягнути з правами категорії B)',
        language === 'en' ? 'Tires: 155R13' : 'Шини: 155R13',
        language === 'en' ? 'Thermal insulation' : 'Теплова ізоляція',
        language === 'en' ? 'Wide stable base' : 'Широка стабільна база',
      ],
    },
    {
      type: 'offroad' as const,
      name: language === 'en' ? 'Camper Off-Road' : 'Camper Off-Road',
      image: '/images/trailer-offroad.jpg',
      specs: [
        '2.90 × 1.43 m',
        '1350 kg',
        language === 'en' ? 'Off-road tires: M/S 225/75 R15' : 'Позашляхові шини: M/S 225/75 R15',
        language === 'en' ? 'Thermal insulation' : 'Теплова ізоляція',
        language === 'en' ? 'Coil spring suspension (reduces vibration)' : 'Підвіска на пружинах (зменшує вібрацію)',
      ],
    },
  ];

  return (
    <section id="types" className="py-12 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3">{language === 'en' ? 'Choose your camper' : 'Оберіть ваш кемпер'}</h2>
          <div className="w-20 h-0.5 mx-auto" style={{ backgroundColor: '#FF5A2F' }} />
        </motion.div>

        <Row gutter={[24, 24]}>
          {trailers.map((trailer, index) => (
            <Col xs={24} lg={12} key={trailer.type}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
              >
                <Card
                  hoverable
                  className={`h-full transition-all duration-300 overflow-hidden ${
                    selectedType === trailer.type ? 'shadow-2xl' : 'hover:shadow-xl'
                  }`}
                  style={{ border: selectedType === trailer.type ? '3px solid #FF5A2F' : '1px solid #e5e7eb' }}
                  styles={{ body: { padding: 0 } }}
                >
                  <div className="relative bg-white flex items-center justify-center px-6" style={{ height: '240px', paddingTop: '24px', paddingBottom: '24px' }}>
                    <div className="relative w-full h-[200px]">
                      <Image
                        alt={trailer.name}
                        src={trailer.image}
                        fill
                        className="object-contain"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        quality={80}
                      />
                    </div>
                  </div>
                  <div className="px-6 pb-6 pt-4">
                    <h3 className="text-2xl font-bold mb-4 text-center" style={{ color: '#000000' }}>
                      {trailer.name}
                    </h3>
                    <div className="mb-6 space-y-2 text-center">
                      {trailer.specs.map((spec, idx) => (
                        <div key={idx} className="flex items-center justify-center">
                          <span className="text-gray-700 text-sm">{spec}</span>
                        </div>
                      ))}
                    </div>
                    <Button
                      type={selectedType === trailer.type ? 'primary' : 'default'}
                      size="large"
                      block
                      onClick={() => onSelectType(trailer.type)}
                      className="h-11 font-semibold transition-all duration-300"
                      style={{
                        backgroundColor: selectedType === trailer.type ? '#FF5A2F' : '#ffffff',
                        borderColor: selectedType === trailer.type ? '#FF5A2F' : '#d9d9d9',
                        color: selectedType === trailer.type ? '#ffffff' : '#000000',
                      }}
                    >
                      {selectedType === trailer.type ? (
                        <>
                          <CheckOutlined /> {t('types.selected')}
                        </>
                      ) : (
                        t('types.select')
                      )}
                    </Button>
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
