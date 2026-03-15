'use client';

import Image from 'next/image';
import { Row, Col } from 'antd';
import {
  FacebookOutlined,
  InstagramOutlined,
  YoutubeOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
} from '@ant-design/icons';
import { useLanguage } from '@/contexts/LanguageContext';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-black text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <Row gutter={[32, 32]}>
          <Col xs={24} md={8}>
            <div className="mb-4 relative h-20 w-40">
              <Image
                src="/images/respo-logo.png"
                alt="Respo Caravan Logo"
                width={160}
                height={80}
                className="object-contain object-left"
              />
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Compact camping trailers for those who value freedom, comfort, and modern design.
            </p>
          </Col>
          <Col xs={24} md={8}>
            <h4 className="text-lg font-bold mb-3">{t('footer.contacts')}</h4>
            <div className="space-y-2">
              <div className="flex items-center text-gray-400 hover:text-white transition-colors text-sm">
                <PhoneOutlined className="mr-2" style={{ color: '#FF5A2F' }} />
                <span>+380 XX XXX XX XX</span>
              </div>
              <div className="flex items-center text-gray-400 hover:text-white transition-colors text-sm">
                <MailOutlined className="mr-2" style={{ color: '#FF5A2F' }} />
                <span>info@respocaravan.com</span>
              </div>
              <div className="flex items-start text-gray-400 hover:text-white transition-colors text-sm">
                <EnvironmentOutlined className="mr-2 mt-1" style={{ color: '#FF5A2F' }} />
                <span>Kyiv, Ukraine</span>
              </div>
            </div>
          </Col>
          <Col xs={24} md={8}>
            <h4 className="text-lg font-bold mb-3">{t('footer.followUs')}</h4>
            <div className="flex space-x-3">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#FF5A2F] flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <FacebookOutlined className="text-lg" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#FF5A2F] flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <InstagramOutlined className="text-lg" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#FF5A2F] flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <YoutubeOutlined className="text-lg" />
              </a>
            </div>
            <div className="mt-4 space-y-1">
              <a href="#" className="block text-gray-400 hover:text-white transition-colors text-sm">
                {t('footer.privacy')}
              </a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors text-sm">
                {t('footer.terms')}
              </a>
            </div>
          </Col>
        </Row>
        <div className="mt-8 pt-6 border-t border-white/10 text-center text-gray-400 text-sm">
          <p>{t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  );
}
