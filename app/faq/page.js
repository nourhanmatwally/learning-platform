'use client';

import { useLanguage } from '../../lib/LanguageContext';

export default function FAQ() {
  const { language } = useLanguage();
  const direction = language === 'ar' ? 'rtl' : 'ltr';

  const faqs = language === 'ar' ? [
    { question: 'كيف أبدأ استخدام المنصة؟', answer: 'يمكنك البدء بتسجيل الدخول، ثم الانتقال إلى صفحة المواد الدراسية واختيار المادة التي تريد دراستها.' },
    { question: 'هل المنصة مجانية؟', answer: 'المنصة تقدم محتوى مجاني أساسي، ولكن هناك اشتراكات مدفوعة توفر ميزات إضافية.' },
    { question: 'كيف أتواصل مع الدعم؟', answer: 'يمكنك التواصل معنا عبر الإيميل أو الواتساب من خلال أيقونات التواصل في الفوتر.' },
  ] : [
    { question: 'How do I start using the platform?', answer: 'You can start by signing in, then navigating to the Materials page and selecting a subject to study.' },
    { question: 'Is the platform free?', answer: 'The platform offers basic free content, but there are paid subscriptions for additional features.' },
    { question: 'How can I contact support?', answer: 'You can reach us via email or WhatsApp using the contact icons in the footer.' },
  ];

  return (
    <div className="container" style={{ direction, minHeight: 'calc(100vh - 120px)', padding: '20px' }}>
      <h1 style={{ fontFamily: language === 'ar' ? "'Tajawal', sans-serif" : "'Roboto', sans-serif", fontWeight: 'bold', textAlign: 'center' }}>
        {language === 'ar' ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
      </h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '800px', margin: '0 auto' }}>
        {faqs.map((faq, index) => (
          <div key={index} style={{ backgroundColor: '#FFF5E1', padding: '20px', borderRadius: '10px' }}>
            <h3 style={{ margin: '0 0 10px 0', fontWeight: 'bold' }}>{faq.question}</h3>
            <p style={{ margin: 0 }}>{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}