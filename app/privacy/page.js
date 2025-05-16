'use client';

import { useLanguage } from '../../lib/LanguageContext';
import { translations } from '../../lib/translations';

export default function Privacy() {
  const { language } = useLanguage();
  const t = translations[language];
  const direction = language === 'ar' ? 'rtl' : 'ltr';

  return (
    <div style={{ direction, padding: '20px', color: '#3A2B1F', minHeight: 'calc(100vh - 150px)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1 style={{ fontFamily: language === 'ar' ? "'Tajawal', sans-serif" : "'Roboto', sans-serif", fontWeight: 'bold', fontSize: '2em', marginBottom: '20px', color: '#3A2B1F' }}>
        {t.privacyTitle}
      </h1>

      <div style={{ maxWidth: '800px', textAlign: language === 'ar' ? 'right' : 'left', lineHeight: '1.6' }}>
        <p style={{ fontSize: '1.1em', marginBottom: '20px' }}>
          {t.privacyIntro}
        </p>

        <h2 style={{ fontFamily: language === 'ar' ? "'Tajawal', sans-serif" : "'Roboto', sans-serif", fontWeight: 'bold', fontSize: '1.5em', margin: '20px 0 10px' }}>
          {t.dataCollectTitle}
        </h2>
        <p style={{ fontSize: '1.1em', marginBottom: '10px' }}>
          {t.dataCollectText}
        </p>
        <ul style={{ padding: language === 'ar' ? '0 20px 0 0' : '0 0 0 20px', marginBottom: '20px', fontSize: '1.1em' }}>
          <li>{t.dataCollectPoint1}</li>
          <li>{t.dataCollectPoint2}</li>
          <li>{t.dataCollectPoint3}</li>
        </ul>

        <h2 style={{ fontFamily: language === 'ar' ? "'Tajawal', sans-serif" : "'Roboto', sans-serif", fontWeight: 'bold', fontSize: '1.5em', margin: '20px 0 10px' }}>
          {t.dataUseTitle}
        </h2>
        <p style={{ fontSize: '1.1em', marginBottom: '10px' }}>
          {t.dataUseText}
        </p>
        <ul style={{ padding: language === 'ar' ? '0 20px 0 0' : '0 0 0 20px', marginBottom: '20px', fontSize: '1.1em' }}>
          <li>{t.dataUsePoint1}</li>
          <li>{t.dataUsePoint2}</li>
          <li>{t.dataUsePoint3}</li>
          <li>{t.dataUsePoint4}</li>
        </ul>

        <h2 style={{ fontFamily: language === 'ar' ? "'Tajawal', sans-serif" : "'Roboto', sans-serif", fontWeight: 'bold', fontSize: '1.5em', margin: '20px 0 10px' }}>
          {t.dataShareTitle}
        </h2>
        <p style={{ fontSize: '1.1em', marginBottom: '10px' }}>
          {t.dataShareText}
        </p>
        <ul style={{ padding: language === 'ar' ? '0 20px 0 0' : '0 0 0 20px', marginBottom: '20px', fontSize: '1.1em' }}>
          <li>{t.dataSharePoint1}</li>
          <li>{t.dataSharePoint2}</li>
        </ul>

        <h2 style={{ fontFamily: language === 'ar' ? "'Tajawal', sans-serif" : "'Roboto', sans-serif", fontWeight: 'bold', fontSize: '1.5em', margin: '20px 0 10px' }}>
          {t.dataProtectionTitle}
        </h2>
        <p style={{ fontSize: '1.1em', marginBottom: '20px' }}>
          {t.dataProtectionText}
        </p>

        <h2 style={{ fontFamily: language === 'ar' ? "'Tajawal', sans-serif" : "'Roboto', sans-serif", fontWeight: 'bold', fontSize: '1.5em', margin: '20px 0 10px' }}>
          {t.cookiesTitle}
        </h2>
        <p style={{ fontSize: '1.1em', marginBottom: '20px' }}>
          {t.cookiesText}
        </p>

        <h2 style={{ fontFamily: language === 'ar' ? "'Tajawal', sans-serif" : "'Roboto', sans-serif", fontWeight: 'bold', fontSize: '1.5em', margin: '20px 0 10px' }}>
          {t.userRightsTitle}
        </h2>
        <p style={{ fontSize: '1.1em', marginBottom: '10px' }}>
          {t.userRightsText}
        </p>
        <ul style={{ padding: language === 'ar' ? '0 20px 0 0' : '0 0 0 20px', marginBottom: '20px', fontSize: '1.1em' }}>
          <li>{t.userRightsPoint1}</li>
          <li>{t.userRightsPoint2}</li>
          <li>{t.userRightsPoint3}</li>
        </ul>

        <h2 style={{ fontFamily: language === 'ar' ? "'Tajawal', sans-serif" : "'Roboto', sans-serif", fontWeight: 'bold', fontSize: '1.5em', margin: '20px 0 10px' }}>
          {t.policyUpdatesTitle}
        </h2>
        <p style={{ fontSize: '1.1em', marginBottom: '20px' }}>
          {t.policyUpdatesText}
        </p>

        <h2 style={{ fontFamily: language === 'ar' ? "'Tajawal', sans-serif" : "'Roboto', sans-serif", fontWeight: 'bold', fontSize: '1.5em', margin: '20px 0 10px' }}>
          {t.contactUsTitle}
        </h2>
        <p style={{ fontSize: '1.1em', marginBottom: '20px' }}>
          {t.contactUsText}
        </p>
        <p style={{ fontSize: '1.1em', marginBottom: '20px' }}>
          📩{' '}
          <a
            href={`https://mail.google.com/mail/?view=cm&fs=1&to=Nourhanmatwally@gmail.com&su=${encodeURIComponent(
              language === 'ar' ? 'استفسار حول سياسة الخصوصية' : 'Inquiry About Privacy Policy'
            )}&body=${encodeURIComponent(
              language === 'ar'
                ? 'السلام عليكم، أود الاستفسار عن [اكتب استفسارك هنا]'
                : 'Hello, I would like to inquire about [write your inquiry here]'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#C19A6B', textDecoration: 'none' }}
          >
            Nourhanmatwally@gmail.com
          </a>
        </p>
      </div>
    </div>
  );
}