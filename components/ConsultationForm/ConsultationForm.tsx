'use client';

import { Modal, Form, Input, Button } from 'antd';
import { UserOutlined, PhoneOutlined, MailOutlined } from '@ant-design/icons';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';

interface ConsultationFormProps {
  open: boolean;
  onClose: () => void;
}

export function ConsultationForm({ open, onClose }: ConsultationFormProps) {
  const [form] = Form.useForm();
  const { t, language } = useLanguage();

  const handleSubmit = (values: Record<string, string>) => {
    console.log('Form submitted:', values);
    toast.success(t('form.success'));
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={600}
      centered
      title={
        <h3 className="text-2xl font-bold" style={{ color: '#FF5A2F' }}>
          {language === 'en' ? 'Pre-Order Details' : 'Деталі попереднього замовлення'}
        </h3>
      }
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit} className="mt-6" size="large">
        <Form.Item
          name="name"
          label={language === 'en' ? 'Full Name' : "Повне ім'я"}
          rules={[{ required: true, message: language === 'en' ? 'Please enter your name' : "Введіть ваше ім'я" }]}
        >
          <Input prefix={<UserOutlined style={{ color: '#FF5A2F' }} />} placeholder={t('form.namePlaceholder')} />
        </Form.Item>
        <Form.Item
          name="phone"
          label={language === 'en' ? 'Phone Number' : 'Номер телефону'}
          rules={[{ required: true, message: language === 'en' ? 'Please enter your phone number' : 'Введіть ваш номер телефону' }]}
        >
          <Input prefix={<PhoneOutlined style={{ color: '#FF5A2F' }} />} placeholder={t('form.phonePlaceholder')} />
        </Form.Item>
        <Form.Item
          name="email"
          label={language === 'en' ? 'Email' : 'Електронна пошта'}
          rules={[
            { required: true, message: language === 'en' ? 'Please enter your email' : 'Введіть вашу пошту' },
            { type: 'email', message: language === 'en' ? 'Please enter a valid email' : 'Введіть правильну адресу' },
          ]}
        >
          <Input prefix={<MailOutlined style={{ color: '#FF5A2F' }} />} placeholder={t('form.emailPlaceholder')} />
        </Form.Item>
        <Form.Item className="mb-0">
          <Button
            type="primary"
            htmlType="submit"
            block
            size="large"
            className="h-12 font-semibold"
            style={{ backgroundColor: '#FF5A2F', borderColor: '#FF5A2F' }}
          >
            {language === 'en' ? 'Submit' : 'Надіслати'}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
