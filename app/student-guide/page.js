'use client';

import { useLanguage } from '../../lib/LanguageContext';
import { translations } from '../../lib/translations';
import Image from 'next/image';

export default function StudentGuide() {
  const { language } = useLanguage();
  const t = translations[language];
  const direction = language === 'ar' ? 'rtl' : 'ltr';

  return (
    <div style={{ 
      padding: '20px', 
      textAlign: 'center', 
      backgroundColor: '#F5F5DC', 
      minHeight: '100vh', 
      direction,
      fontFamily: language === 'ar' ? "'Cairo', sans-serif" : "'Roboto', sans-serif'",
    }}>
      <h1 style={{ color: '#3A2B1F', fontWeight: '900', fontSize: '28px' }}>
        {t.studentGuideTitle}
      </h1>
      <div style={{ textAlign: language === 'ar' ? 'right' : 'left', maxWidth: '800px', margin: '0 auto' }}>
        <h2 style={{ color: '#3A2B1F', fontWeight: 'bold', fontSize: '20px', marginTop: '20px' }}>
          {t.guideIntroductionTitle}
        </h2>
        <p style={{ color: '#3A2B1F', fontSize: '16px', lineHeight: '1.6' }}>
          {t.guideIntroductionText}
        </p>

        <h2 style={{ color: '#3A2B1F', fontWeight: 'bold', fontSize: '20px', marginTop: '20px' }}>
          {t.guideImportanceTitle}
        </h2>
        <p style={{ color: '#3A2B1F', fontSize: '16px', lineHeight: '1.6' }}>
          {t.guideImportanceText}
        </p>

        <h2 style={{ color: '#3A2B1F', fontWeight: 'bold', fontSize: '20px', marginTop: '20px' }}>
          {t.generalUsageInstructionsTitle}
        </h2>
        <ol style={{ color: '#3A2B1F', fontSize: '16px', lineHeight: '1.6', textAlign: language === 'ar' ? 'right' : 'left' }}>
          <li>{t.generalUsageInstruction1}</li>
          <li>{t.generalUsageInstruction2}</li>
          <li>{t.generalUsageInstruction3}</li>
          <li>{t.generalUsageInstruction4}</li>
          <li>{t.generalUsageInstruction5}</li>
          <li>{t.generalUsageInstruction6}</li>
          <li>{t.generalUsageInstruction7}</li>
          <li>{t.generalUsageInstruction8}</li>
          <li>{t.generalUsageInstruction9}</li>
          <li>{t.generalUsageInstruction10}</li>
        </ol>
        <p style={{ color: '#3A2B1F', fontSize: '14px', fontStyle: 'italic', marginTop: '10px' }}>
          {t.generalUsageNote}
        </p>

        <h2 style={{ color: '#3A2B1F', fontWeight: 'bold', fontSize: '20px', marginTop: '20px' }}>
          {t.platformAccessTitle}
        </h2>
        <ol style={{ color: '#3A2B1F', fontSize: '16px', lineHeight: '1.6', textAlign: language === 'ar' ? 'right' : 'left' }}>
          <li>{t.platformAccessStep1}
            <ul style={{ marginTop: '5px' }}>
              <li>{t.platformAccessStep1Sub1}</li>
              <li>{t.platformAccessStep1Sub2}</li>
              <li>{t.platformAccessStep1Sub3}</li>
            </ul>
          </li>
          <li>{t.platformAccessStep2}
            <ul style={{ marginTop: '5px' }}>
              <li>{t.platformAccessStep2Sub1}</li>
              <li>{t.platformAccessStep2Sub2}</li>
              <li>{t.platformAccessStep2Sub3}</li>
            </ul>
          </li>
          <li>{t.platformAccessStep3}
            <ul style={{ marginTop: '5px' }}>
              <li>{t.platformAccessStep3Sub1}</li>
              <li>{t.platformAccessStep3Sub2}</li>
              <li>{t.platformAccessStep3Sub3}</li>
            </ul>
          </li>
          <li>{t.platformAccessStep4}
            <ul style={{ marginTop: '5px' }}>
              <li>{t.platformAccessStep4Sub1}</li>
              <li>{t.platformAccessStep4Sub2}</li>
            </ul>
          </li>
          <li>{t.platformAccessStep5}
            <ul style={{ marginTop: '5px' }}>
              <li>{t.platformAccessStep5Sub1}</li>
            </ul>
          </li>
        </ol>
        <p style={{ color: '#3A2B1F', fontSize: '14px', fontStyle: 'italic', marginTop: '10px' }}>
          {t.platformAccessNote}
        </p>

        <h2 style={{ color: '#3A2B1F', fontWeight: 'bold', fontSize: '20px', marginTop: '20px' }}>
          {t.virtualClassNavigationTitle}
        </h2>
        <ol style={{ color: '#3A2B1F', fontSize: '16px', lineHeight: '1.6', textAlign: language === 'ar' ? 'right' : 'left' }}>
          <li>{t.virtualClassNavigationStep1}</li>
          <li>{t.virtualClassNavigationStep2}</li>
          <li>{t.virtualClassNavigationStep3}</li>
          <li>{t.virtualClassNavigationStep4}</li>
          <li>{t.virtualClassNavigationStep5}</li>
          <li>{t.virtualClassNavigationStep6}</li>
          <li>{t.virtualClassNavigationStep7}</li>
          <li>{t.virtualClassNavigationStep8}</li>
        </ol>
        <p style={{ color: '#3A2B1F', fontSize: '14px', fontStyle: 'italic', marginTop: '10px' }}>
          {t.virtualClassNavigationNote}
        </p>

        <h2 style={{ color: '#3A2B1F', fontWeight: 'bold', fontSize: '20px', marginTop: '20px' }}>
          {t.virtualClassInteractionTitle}
        </h2>
        <ol style={{ color: '#3A2B1F', fontSize: '16px', lineHeight: '1.6', textAlign: language === 'ar' ? 'right' : 'left' }}>
          <li>{t.virtualClassInteractionStep1}</li>
          <li>{t.virtualClassInteractionStep2}</li>
          <li>{t.virtualClassInteractionStep3}</li>
          <li>{t.virtualClassInteractionStep4}</li>
          <li>{t.virtualClassInteractionStep5}</li>
          <li>{t.virtualClassInteractionStep6}</li>
        </ol>
        <p style={{ color: '#3A2B1F', fontSize: '14px', fontStyle: 'italic', marginTop: '10px' }}>
          {t.virtualClassInteractionNote}
        </p>

        <h2 style={{ color: '#3A2B1F', fontWeight: 'bold', fontSize: '20px', marginTop: '20px' }}>
          {t.activitySubmissionTitle}
        </h2>
        <ol style={{ color: '#3A2B1F', fontSize: '16px', lineHeight: '1.6', textAlign: language === 'ar' ? 'right' : 'left' }}>
          <li>{t.activitySubmissionStep1}</li>
          <li>{t.activitySubmissionStep2}</li>
          <li>{t.activitySubmissionStep3}</li>
          <li>{t.activitySubmissionStep4}</li>
          <li>{t.activitySubmissionStep5}</li>
          <li>{t.activitySubmissionStep6}</li>
          <li>{t.activitySubmissionStep7}</li>
          <li>{t.activitySubmissionStep8}</li>
        </ol>
        <p style={{ color: '#3A2B1F', fontSize: '14px', fontStyle: 'italic', marginTop: '10px' }}>
          {t.activitySubmissionNote}
        </p>

        <h2 style={{ color: '#3A2B1F', fontWeight: 'bold', fontSize: '20px', marginTop: '20px' }}>
          {t.digitalMediaInteractionTitle}
        </h2>
        <ol style={{ color: '#3A2B1F', fontSize: '16px', lineHeight: '1.6', textAlign: language === 'ar' ? 'right' : 'left' }}>
          <li>{t.digitalMediaInteractionStep1}</li>
          <li>{t.digitalMediaInteractionStep2}</li>
          <li>{t.digitalMediaInteractionStep3}</li>
          <li>{t.digitalMediaInteractionStep4}</li>
          <li>{t.digitalMediaInteractionStep5}</li>
          <li>{t.digitalMediaInteractionStep6}</li>
          <li>{t.digitalMediaInteractionStep7}</li>
          <li>{t.digitalMediaInteractionStep8}</li>
        </ol>
        <p style={{ color: '#3A2B1F', fontSize: '14px', fontStyle: 'italic', marginTop: '10px' }}>
          {t.digitalMediaInteractionNote}
        </p>

        <h2 style={{ color: '#3A2B1F', fontWeight: 'bold', fontSize: '20px', marginTop: '20px' }}>
          {t.commonIssuesTitle}
        </h2>
        <ol style={{ color: '#3A2B1F', fontSize: '16px', lineHeight: '1.6', textAlign: language === 'ar' ? 'right' : 'left' }}>
          <li>{t.commonIssuesStep1}</li>
          <li>{t.commonIssuesStep2}</li>
          <li>{t.commonIssuesStep3}</li>
          <li>{t.commonIssuesStep4}</li>
          <li>{t.commonIssuesStep5}</li>
          <li>{t.commonIssuesStep6}</li>
        </ol>
        <p style={{ color: '#3A2B1F', fontSize: '14px', fontStyle: 'italic', marginTop: '10px' }}>
          {t.commonIssuesNote}
        </p>

        <h2 style={{ color: '#3A2B1F', fontWeight: 'bold', fontSize: '20px', marginTop: '20px' }}>
          {t.technicalSupportTitle}
        </h2>
        <ol style={{ color: '#3A2B1F', fontSize: '16px', lineHeight: '1.6', textAlign: language === 'ar' ? 'right' : 'left' }}>
          <li>{t.technicalSupportStep1}</li>
          <li>{t.technicalSupportStep2}</li>
          <li>{t.technicalSupportStep3}</li>
          <li>{t.technicalSupportStep4}</li>
        </ol>
        <p style={{ color: '#3A2B1F', fontSize: '14px', fontStyle: 'italic', marginTop: '10px' }}>
          {t.technicalSupportNote}
        </p>

        {/* PDF Download Link */}
        <div style={{ marginTop: '40px' }}>
          <a
            href="https://drive.google.com/file/d/12AnFeX3uul9cODGSfY6FQUu6kh5xRMDC/preview"
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '10px', 
              backgroundColor: '#D2B48C', 
              padding: '10px 20px', 
              borderRadius: '8px', 
              cursor: 'pointer',
              color: '#3A2B1F',
              fontWeight: 'bold',
              textDecoration: 'none',
              transition: 'transform 0.3s ease',
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src="/pdf-icon.png" alt="PDF Icon" width={24} height={24} />
            <span>{t.downloadPdfText}</span>
          </a>
        </div>
      </div>
    </div>
  );
}