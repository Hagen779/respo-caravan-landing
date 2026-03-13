'use client';

import { useState } from 'react';
import { Card, Checkbox, Row, Col, Button, Divider } from 'antd';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'motion/react';
import type { TrailerType } from '@/components/TrailerTypes/TrailerTypes';
import type { ConfigType } from '@/components/Configurations/Configurations';

interface PriceCalculatorProps {
  trailerType: TrailerType;
  configType: ConfigType;
  onGetProposal: () => void;
}

interface AdditionalOption {
  id: string;
  name: string;
  price: number;
  category: 'exterior' | 'interior';
}

const basePrices: Record<string, number> = {
  base: 60000,
  mid: 85000,
  performance: 115000,
};

export function PriceCalculator({ trailerType, configType, onGetProposal }: PriceCalculatorProps) {
  const { language } = useLanguage();
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const options: AdditionalOption[] = [
    { id: 'solar', name: language === 'en' ? 'Solar panel' : 'Сонячна панель', price: 9000, category: 'exterior' },
    { id: 'roof', name: language === 'en' ? 'Roof rack' : 'Багажник на даху', price: 3500, category: 'exterior' },
    { id: 'awning', name: language === 'en' ? 'Awning' : 'Тент', price: 6000, category: 'exterior' },
    { id: 'storage', name: language === 'en' ? 'Storage box' : 'Ящик для зберігання', price: 2500, category: 'exterior' },
    { id: 'bike', name: language === 'en' ? 'Bike rack' : 'Кріплення для велосипедів', price: 2700, category: 'exterior' },
    { id: 'kitchen', name: language === 'en' ? 'Portable kitchen' : 'Портативна кухня', price: 6700, category: 'interior' },
    { id: 'heating', name: language === 'en' ? 'Heating system' : 'Система опалення', price: 11000, category: 'interior' },
    { id: 'bed', name: language === 'en' ? 'Bed extension' : 'Розширення ліжка', price: 4500, category: 'interior' },
    { id: 'lighting', name: language === 'en' ? 'Interior lighting' : 'Внутрішнє освітлення', price: 3200, category: 'interior' },
    { id: 'electric', name: language === 'en' ? 'Electric system' : 'Електрична система', price: 8500, category: 'interior' },
  ];

  const handleOptionChange = (optionId: string, checked: boolean) => {
    setSelectedOptions((prev) => (checked ? [...prev, optionId] : prev.filter((id) => id !== optionId)));
  };

  const basePrice = configType ? basePrices[configType] : 0;
  const optionsPrice = options.filter((opt) => selectedOptions.includes(opt.id)).reduce((sum, opt) => sum + opt.price, 0);
  const totalPrice = basePrice + optionsPrice;

  const exteriorOptions = options.filter((opt) => opt.category === 'exterior');
  const interiorOptions = options.filter((opt) => opt.category === 'interior');
  const selectedOptionsDetails = options.filter((opt) => selectedOptions.includes(opt.id));

  if (!trailerType || !configType) return null;

  const trailerTypeName = trailerType === 'wide' ? 'Camper Wide' : 'Camper Off-Road';
  const configName = configType === 'base' ? 'Base' : configType === 'mid' ? 'Mid' : 'Performance';

  return (
    <section id="calculator" className="py-12 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            {language === 'en' ? 'Price Calculator' : 'Калькулятор ціни'}
          </h2>
          <div className="w-20 h-0.5 mx-auto" style={{ backgroundColor: '#FF5A2F' }} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <Row gutter={[32, 32]}>
            <Col xs={24} lg={14}>
              <Card className="shadow-lg h-full">
                <h3 className="text-2xl font-bold mb-6">
                  {language === 'en' ? 'Additional Options' : 'Додаткові опції'}
                </h3>
                <div className="mb-8">
                  <h4 className="text-lg font-semibold mb-4 text-gray-600">
                    {language === 'en' ? 'Exterior options' : 'Зовнішні опції'}
                  </h4>
                  <div className="space-y-3">
                    {exteriorOptions.map((option) => (
                      <motion.div
                        key={option.id}
                        whileHover={{ x: 3 }}
                        className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0"
                      >
                        <Checkbox
                          checked={selectedOptions.includes(option.id)}
                          onChange={(e) => handleOptionChange(option.id, e.target.checked)}
                          className="flex-1"
                        >
                          <span className="text-base">{option.name}</span>
                        </Checkbox>
                        <span className="font-medium text-gray-500 ml-4">+ {option.price.toLocaleString()} ₴</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
                <Divider className="my-6" />
                <div>
                  <h4 className="text-lg font-semibold mb-4 text-gray-600">
                    {language === 'en' ? 'Interior options' : 'Внутрішні опції'}
                  </h4>
                  <div className="space-y-3">
                    {interiorOptions.map((option) => (
                      <motion.div
                        key={option.id}
                        whileHover={{ x: 3 }}
                        className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0"
                      >
                        <Checkbox
                          checked={selectedOptions.includes(option.id)}
                          onChange={(e) => handleOptionChange(option.id, e.target.checked)}
                          className="flex-1"
                        >
                          <span className="text-base">{option.name}</span>
                        </Checkbox>
                        <span className="font-medium text-gray-500 ml-4">+ {option.price.toLocaleString()} ₴</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
                <div className="mt-8">
                  <Button size="large" block onClick={onGetProposal} className="h-12">
                    {language === 'en' ? 'Get consultation' : 'Отримати консультацію'}
                  </Button>
                </div>
              </Card>
            </Col>
            <Col xs={24} lg={10}>
              <Card className="shadow-lg h-full" style={{ backgroundColor: '#f9fafb' }}>
                <h3 className="text-2xl font-bold mb-6">{language === 'en' ? 'Summary' : 'Підсумок'}</h3>
                <div className="mb-6 space-y-3">
                  <div>
                    <p className="text-gray-600 text-sm">{language === 'en' ? 'Trailer type:' : 'Тип причепа:'}</p>
                    <p className="font-bold text-lg">{trailerTypeName}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">{language === 'en' ? 'Configuration:' : 'Комплектація:'}</p>
                    <p className="font-bold text-lg">{configName}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">{language === 'en' ? 'Base price:' : 'Базова ціна:'}</p>
                    <p className="font-bold text-xl">{basePrice.toLocaleString()} ₴</p>
                  </div>
                </div>
                {selectedOptionsDetails.length > 0 && (
                  <div className="mb-6">
                    <p className="text-gray-600 text-sm mb-3 font-semibold">
                      {language === 'en' ? 'Selected options:' : 'Обрані опції:'}
                    </p>
                    <div className="space-y-2">
                      {selectedOptionsDetails.map((option) => (
                        <div key={option.id} className="flex justify-between items-center text-sm">
                          <span className="text-gray-700">{option.name}</span>
                          <span className="text-gray-600">+ {option.price.toLocaleString()} ₴</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <Divider className="my-6" />
                <motion.div
                  key={totalPrice}
                  initial={{ scale: 1.05 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                  className="mb-6"
                >
                  <div className="text-center py-4">
                    <p className="text-sm text-gray-600 mb-2">{language === 'en' ? 'Final price' : 'Фінальна ціна'}</p>
                    <p className="font-bold text-5xl" style={{ color: '#FF5A2F' }}>
                      {totalPrice.toLocaleString()} ₴
                    </p>
                  </div>
                </motion.div>
                <Button
                  type="default"
                  size="large"
                  block
                  onClick={onGetProposal}
                  className="h-14 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  style={{ backgroundColor: '#6b7280', color: 'white', borderColor: '#6b7280' }}
                >
                  {language === 'en' ? 'Order' : 'Замовити'}
                </Button>
              </Card>
            </Col>
          </Row>
        </motion.div>
      </div>
    </section>
  );
}
