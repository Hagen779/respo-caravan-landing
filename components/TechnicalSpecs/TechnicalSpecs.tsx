'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { motion, AnimatePresence } from 'motion/react';
import type { TrailerType } from '@/components/TrailerTypes/TrailerTypes';
import type { ConfigType } from '@/components/Configurations/Configurations';

interface TechnicalSpecsProps {
  trailerType: TrailerType;
  configType: ConfigType;
}

export function TechnicalSpecs({ trailerType, configType }: TechnicalSpecsProps) {
  const { t } = useLanguage();

  if (!configType) return null;

  const specsData: Record<string, Record<string, Record<string, string>>> = {
    wide: {
      base: {
        Weight: '600 kg',
        Size: '450 × 500 × 125 cm',
        'Sleeping capacity': '2 persons',
        'Ground clearance': '450 mm',
        'Axle type': 'Torsion suspension',
        'Battery capacity': '100 Ah',
        'Water tank': '40 L',
        'Door size': '870 × 720 mm',
        'Rear door size': '1140 × 930 mm',
        'Maximum speed': '140 km/h',
      },
      mid: {
        Weight: '650 kg',
        Size: '480 × 520 × 130 cm',
        'Sleeping capacity': '3 persons',
        'Ground clearance': '450 mm',
        'Axle type': 'Torsion suspension',
        'Battery capacity': '150 Ah',
        'Water tank': '60 L',
        'Door size': '870 × 720 mm',
        'Rear door size': '1140 × 930 mm',
        'Maximum speed': '140 km/h',
      },
      performance: {
        Weight: '700 kg',
        Size: '500 × 540 × 135 cm',
        'Sleeping capacity': '4 persons',
        'Ground clearance': '450 mm',
        'Axle type': 'Reinforced torsion suspension',
        'Battery capacity': '200 Ah',
        'Water tank': '80 L',
        'Door size': '870 × 720 mm',
        'Rear door size': '1140 × 930 mm',
        'Maximum speed': '140 km/h',
      },
    },
    offroad: {
      base: {
        Weight: '620 kg',
        Size: '450 × 500 × 130 cm',
        'Sleeping capacity': '2 persons',
        'Ground clearance': '500 mm',
        'Axle type': 'Reinforced torsion suspension',
        'Battery capacity': '100 Ah',
        'Water tank': '50 L',
        'Door size': '870 × 720 mm',
        'Rear door size': '1140 × 930 mm',
        'Maximum speed': '140 km/h',
      },
      mid: {
        Weight: '680 kg',
        Size: '480 × 520 × 135 cm',
        'Sleeping capacity': '3 persons',
        'Ground clearance': '500 mm',
        'Axle type': 'Reinforced torsion suspension',
        'Battery capacity': '150 Ah',
        'Water tank': '70 L',
        'Door size': '870 × 720 mm',
        'Rear door size': '1140 × 930 mm',
        'Maximum speed': '140 km/h',
      },
      performance: {
        Weight: '750 kg',
        Size: '500 × 540 × 140 cm',
        'Sleeping capacity': '4 persons',
        'Ground clearance': '500 mm',
        'Axle type': 'Reinforced torsion suspension',
        'Battery capacity': '200 Ah',
        'Water tank': '100 L',
        'Door size': '870 × 720 mm',
        'Rear door size': '1140 × 930 mm',
        'Maximum speed': '140 km/h',
      },
    },
  };

  const specs = trailerType ? specsData[trailerType]?.[configType] : null;
  if (!specs) return null;

  const specEntries = Object.entries(specs);

  return (
    <AnimatePresence mode="wait">
      <motion.section
        key={`${trailerType}-${configType}`}
        id="specs"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="py-12 px-4 bg-white"
      >
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-black">{t('specs.title')}</h2>
            <div className="w-20 h-0.5 mx-auto mb-4" style={{ backgroundColor: '#FF5A2F' }} />
            <div className="flex items-center justify-center gap-3 mt-6">
              <div
                className="px-6 py-3 rounded-lg font-semibold text-white shadow-md"
                style={{ backgroundColor: '#FF5A2F' }}
              >
                {trailerType === 'wide' ? 'Camper Wide' : 'Camper Off-Road'}
              </div>
              <span className="text-2xl text-gray-400">•</span>
              <div
                className="px-6 py-3 rounded-lg font-semibold text-white shadow-md"
                style={{ backgroundColor: '#FF5A2F' }}
              >
                {configType.charAt(0).toUpperCase() + configType.slice(1)}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
              {specEntries.map(([key, value], index) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.05, duration: 0.4 }}
                  className="grid grid-cols-2 gap-6 py-4 px-6 border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition-colors"
                >
                  <span className="text-gray-600 text-base">{key}</span>
                  <span className="font-bold text-lg text-right" style={{ color: '#FF5A2F' }}>
                    {value}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>
    </AnimatePresence>
  );
}
