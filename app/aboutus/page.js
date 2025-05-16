'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react'; // استيراد useSession
import { useLanguage } from '../../lib/LanguageContext';
import { translations } from '../../lib/translations';

export default function AboutUs() {
  const { language } = useLanguage();
  const { data: session } = useSession(); // التحقق من حالة تسجيل الدخول
  const t = translations[language];
  const direction = language === 'ar' ? 'rtl' : 'ltr';

  // تحديد الرابط بناءً على حالة تسجيل الدخول
  const redirectPath = session ? '/materials' : '/signup';

  return (
    <div style={{ direction, padding: '20px', color: '#3A2B1F', minHeight: 'calc(100vh - 150px)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1 style={{ fontFamily: language === 'ar' ? "'Tajawal', sans-serif" : "'Roboto', sans-serif", fontWeight: 'bold', fontSize: '2em', marginBottom: '20px', color: '#3A2B1F' }}>
        {t.aboutUsTitle}
      </h1>

      <div style={{ maxWidth: '800px', textAlign: language === 'ar' ? 'right' : 'left', lineHeight: '1.6' }}>
        <p style={{ fontSize: '1.1em', marginBottom: '20px' }}>
          {t.aboutUsIntro}
        </p>
        <p style={{ fontSize: '1.1em', marginBottom: '20px' }}>
          {t.aboutUsBelief}
        </p>

        <h2 style={{ fontFamily: language === 'ar' ? "'Tajawal', sans-serif" : "'Roboto', sans-serif", fontWeight: 'bold', fontSize: '1.5em', margin: '20px 0 10px' }}>
          {t.visionTitle}
        </h2>
        <p style={{ fontSize: '1.1em', marginBottom: '20px' }}>
          {t.visionText}
        </p>

        <h2 style={{ fontFamily: language === 'ar' ? "'Tajawal', sans-serif" : "'Roboto', sans-serif", fontWeight: 'bold', fontSize: '1.5em', margin: '20px 0 10px' }}>
          {t.missionTitle}
        </h2>
        <p style={{ fontSize: '1.1em', marginBottom: '10px' }}>
          {t.missionText}
        </p>
        <ul style={{ padding: language === 'ar' ? '0 20px 0 0' : '0 0 0 20px', marginBottom: '20px', fontSize: '1.1em' }}>
          <li>{t.missionPoint1}</li>
          <li>{t.missionPoint2}</li>
          <li>{t.missionPoint3}</li>
        </ul>

        <h2 style={{ fontFamily: language === 'ar' ? "'Tajawal', sans-serif" : "'Roboto', sans-serif", fontWeight: 'bold', fontSize: '1.5em', margin: '20px 0 10px' }}>
          {t.howSkepHelpsTitle}
        </h2>
        <p style={{ fontSize: '1.1em', marginBottom: '10px' }}>
          {t.howSkepHelpsText}
        </p>
        <ul style={{ padding: language === 'ar' ? '0 20px 0 0' : '0 0 0 20px', marginBottom: '20px', fontSize: '1.1em' }}>
          <li>{t.howSkepHelpsPoint1}</li>
          <li>{t.howSkepHelpsPoint2}</li>
          <li>{t.howSkepHelpsPoint3}</li>
          <li>{t.howSkepHelpsPoint4}</li>
        </ul>

        <h2 style={{ fontFamily: language === 'ar' ? "'Tajawal', sans-serif" : "'Roboto', sans-serif", fontWeight: 'bold', fontSize: '1.5em', margin: '20px 0 10px' }}>
          {t.whatMakesSkepUniqueTitle}
        </h2>
        <ul style={{ padding: language === 'ar' ? '0 20px 0 0' : '0 0 0 20px', marginBottom: '20px', fontSize: '1.1em' }}>
          <li>{t.uniquePoint1}</li>
          <li>{t.uniquePoint2}</li>
          <li>{t.uniquePoint3}</li>
          <li>{t.uniquePoint4}</li>
          <li>{t.uniquePoint5}</li>
        </ul>

        <p style={{ fontSize: '1.1em', marginBottom: '20px', fontWeight: 'bold' }}>
          {t.joinSkepText}
        </p>

        <Link href={redirectPath}>
          <button
            style={{
              marginTop: '20px',
              backgroundColor: '#D2B48C',
              color: '#3A2B1F',
              padding: '10px 20px',
              borderRadius: '8px',
              fontWeight: 'bold',
              fontSize: '16px',
              fontFamily: language === 'ar' ? "'Amiri', serif" : "'Roboto', sans-serif",
              transition: 'padding 0.3s, font-size 0.3s',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.padding = '12px 24px';
              e.currentTarget.style.fontSize = '18px';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.padding = '10px 20px';
              e.currentTarget.style.fontSize = '16px';
            }}
          >
            {t.joinNowButton}
          </button>
        </Link>
      </div>
    </div>
  );
}