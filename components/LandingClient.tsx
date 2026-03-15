'use client';

import { useState } from 'react';
import { ConfigProvider } from 'antd';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { Navbar } from '@/components/Navbar/Navbar';
import { Hero } from '@/components/Hero/Hero';
import { TrailerTypes, TrailerType } from '@/components/TrailerTypes/TrailerTypes';
import { Configurations, ConfigType } from '@/components/Configurations/Configurations';
import { TechnicalSpecs } from '@/components/TechnicalSpecs/TechnicalSpecs';
import { Advantages } from '@/components/Advantages/Advantages';
import { PriceCalculator } from '@/components/PriceCalculator/PriceCalculator';
import { CTASection } from '@/components/CTASection/CTASection';
import { Footer } from '@/components/Footer/Footer';
import { ConsultationForm } from '@/components/ConsultationForm/ConsultationForm';
import { FloatingFeedbackButton } from '@/components/FloatingFeedbackButton/FloatingFeedbackButton';

export function LandingClient() {
  const [selectedTrailerType, setSelectedTrailerType] = useState<TrailerType>('wide');
  const [selectedConfig, setSelectedConfig] = useState<ConfigType>(null);
  const [consultationFormOpen, setConsultationFormOpen] = useState(false);

  const handleTrailerTypeSelect = (type: TrailerType) => {
    setSelectedTrailerType(type);
    setTimeout(() => {
      const element = document.getElementById('configurations');
      if (element) {
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({ top: elementPosition - offset, behavior: 'smooth' });
      }
    }, 100);
  };

  const handleConfigSelect = (config: ConfigType) => {
    setSelectedConfig(config);
    setTimeout(() => {
      const element = document.getElementById('specs');
      if (element) {
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({ top: elementPosition - offset, behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <LanguageProvider>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#FF5A2F',
            colorLink: '#FF5A2F',
            borderRadius: 8,
            fontFamily: 'Arial, Helvetica, sans-serif',
            fontFamilyCode: 'Arial, Helvetica, sans-serif',
          },
          components: {
            Button: {
              primaryShadow: '0 4px 12px rgba(255, 90, 47, 0.3)',
              fontFamily: "'Berthold Akzidenz Grotesk', 'Akzidenz-Grotesk', 'Helvetica Neue', Helvetica, Arial, sans-serif",
            },
            Typography: {
              fontFamilyCode: 'Arial, Helvetica, sans-serif',
            },
          },
        }}
      >
        <div className="min-h-screen bg-white">
          <Navbar />
          <Hero onCTAClick={() => setConsultationFormOpen(true)} />
          <TrailerTypes selectedType={selectedTrailerType} onSelectType={handleTrailerTypeSelect} />
          <Configurations
            selectedConfig={selectedConfig}
            onSelectConfig={handleConfigSelect}
            onOrderClick={() => setConsultationFormOpen(true)}
            selectedTrailerType={selectedTrailerType}
          />
          <TechnicalSpecs trailerType={selectedTrailerType} configType={selectedConfig} />
          <Advantages />
          <PriceCalculator
            trailerType={selectedTrailerType}
            configType={selectedConfig}
            onGetProposal={() => setConsultationFormOpen(true)}
          />
          <CTASection onCTAClick={() => setConsultationFormOpen(true)} />
          <Footer />
          <FloatingFeedbackButton onClick={() => setConsultationFormOpen(true)} />
          <ConsultationForm open={consultationFormOpen} onClose={() => setConsultationFormOpen(false)} />
        </div>
      </ConfigProvider>
    </LanguageProvider>
  );
}
