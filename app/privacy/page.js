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
        {language === 'ar' ? 'سياسة الخصوصية – منصة سكيب (SKEP)' : 'Privacy Policy – SKEP Platform'}
      </h1>

      <div style={{ maxWidth: '800px', textAlign: language === 'ar' ? 'right' : 'left', lineHeight: '1.6' }}>
        <p style={{ fontSize: '1.1em', marginBottom: '20px' }}>
          {language === 'ar'
            ? 'نحن في منصة سكيب نولي أهمية قصوى لخصوصية مستخدمينا، ونسعى لضمان تجربة تعلم إلكتروني آمنة ومحترمة لجميع الطلاب والمعلمين والزوار. توضح هذه السياسة كيف نقوم بجمع المعلومات، واستخدامها، وحمايتها.'
            : 'At SKEP, we place the utmost importance on the privacy of our users, striving to ensure a safe and respectful e-learning experience for all students, teachers, and visitors. This policy explains how we collect, use, and protect your information.'}
        </p>

        <h2 style={{ fontFamily: language === 'ar' ? "'Tajawal', sans-serif" : "'Roboto', sans-serif", fontWeight: 'bold', fontSize: '1.5em', margin: '20px 0 10px' }}>
          {language === 'ar' ? '1. ما البيانات التي نقوم بجمعها؟' : '1. What Data Do We Collect?'}
        </h2>
        <p style={{ fontSize: '1.1em', marginBottom: '10px' }}>
          {language === 'ar' ? 'عند استخدامك لمنصة سكيب، قد نقوم بجمع البيانات التالية:' : 'When you use the SKEP platform, we may collect the following data:'}
        </p>
        <ul style={{ padding: language === 'ar' ? '0 20px 0 0' : '0 0 0 20px', marginBottom: '20px', fontSize: '1.1em' }}>
          <li>{language === 'ar' ? 'بيانات شخصية مثل الاسم، البريد الإلكتروني، والصف الدراسي.' : 'Personal information such as your name, email address, and grade level.'}</li>
          <li>{language === 'ar' ? 'بيانات استخدام مثل الصفحات التي تزورها، ومدة التفاعل مع المنصة، وأنواع الأنشطة التعليمية المنفذة.' : 'Usage data such as the pages you visit, the duration of your interaction with the platform, and the types of educational activities you engage in.'}</li>
          <li>{language === 'ar' ? 'بيانات الجهاز مثل نوع المتصفح، عنوان IP، ونظام التشغيل.' : 'Device data such as browser type, IP address, and operating system.'}</li>
        </ul>

        <h2 style={{ fontFamily: language === 'ar' ? "'Tajawal', sans-serif" : "'Roboto', sans-serif", fontWeight: 'bold', fontSize: '1.5em', margin: '20px 0 10px' }}>
          {language === 'ar' ? '2. كيف نستخدم هذه البيانات؟' : '2. How Do We Use This Data?'}
        </h2>
        <p style={{ fontSize: '1.1em', marginBottom: '10px' }}>
          {language === 'ar' ? 'نستخدم البيانات بهدف:' : 'We use the data for the following purposes:'}
        </p>
        <ul style={{ padding: language === 'ar' ? '0 20px 0 0' : '0 0 0 20px', marginBottom: '20px', fontSize: '1.1em' }}>
          <li>{language === 'ar' ? 'تحسين تجربة المستخدم وتقديم محتوى تعليمي مناسب.' : 'Improving the user experience and providing appropriate educational content.'}</li>
          <li>{language === 'ar' ? 'تتبع التقدم الدراسي وتخصيص التعلم.' : 'Tracking academic progress and personalizing learning.'}</li>
          <li>{language === 'ar' ? 'التواصل مع المستخدمين في حال وجود تحديثات أو دعم تقني.' : 'Communicating with users regarding updates or technical support.'}</li>
          <li>{language === 'ar' ? 'ضمان أمان المنصة ومراقبة الأداء.' : 'Ensuring the platform’s security and monitoring performance.'}</li>
        </ul>

        <h2 style={{ fontFamily: language === 'ar' ? "'Tajawal', sans-serif" : "'Roboto', sans-serif", fontWeight: 'bold', fontSize: '1.5em', margin: '20px 0 10px' }}>
          {language === 'ar' ? '3. هل نشارك بياناتك مع أطراف أخرى؟' : '3. Do We Share Your Data with Third Parties?'}
        </h2>
        <p style={{ fontSize: '1.1em', marginBottom: '10px' }}>
          {language === 'ar' ? 'لا نقوم ببيع أو مشاركة بيانات المستخدمين مع أي جهة خارجية، باستثناء:' : 'We do not sell or share user data with any third parties, except in the following cases:'}
        </p>
        <ul style={{ padding: language === 'ar' ? '0 20px 0 0' : '0 0 0 20px', marginBottom: '20px', fontSize: '1.1em' }}>
          <li>{language === 'ar' ? 'في حال الضرورة القانونية.' : 'When required by law.'}</li>
          <li>{language === 'ar' ? 'مع مزودي خدمات موثوقين يساعدوننا في تشغيل المنصة (مع الالتزام الكامل بالسرية).' : 'With trusted service providers who assist us in operating the platform (with a full commitment to confidentiality).'}</li>
        </ul>

        <h2 style={{ fontFamily: language === 'ar' ? "'Tajawal', sans-serif" : "'Roboto', sans-serif", fontWeight: 'bold', fontSize: '1.5em', margin: '20px 0 10px' }}>
          {language === 'ar' ? '4. حماية البيانات' : '4. Data Protection'}
        </h2>
        <p style={{ fontSize: '1.1em', marginBottom: '20px' }}>
          {language === 'ar'
            ? 'نلتزم باستخدام أعلى معايير الأمان الرقمي لحماية بياناتك من الوصول غير المصرح به أو التعديل أو الإتلاف.'
            : 'We are committed to using the highest digital security standards to protect your data from unauthorized access, modification, or destruction.'}
        </p>

        <h2 style={{ fontFamily: language === 'ar' ? "'Tajawal', sans-serif" : "'Roboto', sans-serif", fontWeight: 'bold', fontSize: '1.5em', margin: '20px 0 10px' }}>
          {language === 'ar' ? '5. ملفات تعريف الارتباط (Cookies)' : '5. Cookies'}
        </h2>
        <p style={{ fontSize: '1.1em', marginBottom: '20px' }}>
          {language === 'ar'
            ? 'تستخدم المنصة ملفات تعريف الارتباط لتحسين الأداء وتخصيص المحتوى، ويمكنك ضبط إعدادات المتصفح للتحكم في قبول هذه الملفات.'
            : 'The platform uses cookies to improve performance and personalize content. You can adjust your browser settings to control the acceptance of these cookies.'}
        </p>

        <h2 style={{ fontFamily: language === 'ar' ? "'Tajawal', sans-serif" : "'Roboto', sans-serif", fontWeight: 'bold', fontSize: '1.5em', margin: '20px 0 10px' }}>
          {language === 'ar' ? '6. حقوق المستخدمين' : '6. User Rights'}
        </h2>
        <p style={{ fontSize: '1.1em', marginBottom: '10px' }}>
          {language === 'ar' ? 'لك الحق في:' : 'You have the right to:'}
        </p>
        <ul style={{ padding: language === 'ar' ? '0 20px 0 0' : '0 0 0 20px', marginBottom: '20px', fontSize: '1.1em' }}>
          <li>{language === 'ar' ? 'الوصول إلى بياناتك الشخصية.' : 'Access your personal data.'}</li>
          <li>{language === 'ar' ? 'طلب تعديل أو حذف بياناتك.' : 'Request the modification or deletion of your data.'}</li>
          <li>{language === 'ar' ? 'سحب الموافقة على استخدام بياناتك في أي وقت.' : 'Withdraw your consent for the use of your data at any time.'}</li>
        </ul>

        <h2 style={{ fontFamily: language === 'ar' ? "'Tajawal', sans-serif" : "'Roboto', sans-serif", fontWeight: 'bold', fontSize: '1.5em', margin: '20px 0 10px' }}>
          {language === 'ar' ? '7. التعديلات على السياسة' : '7. Policy Updates'}
        </h2>
        <p style={{ fontSize: '1.1em', marginBottom: '20px' }}>
          {language === 'ar'
            ? 'قد نقوم بتحديث سياسة الخصوصية من وقت لآخر، وسيتم إخطارك في حال وجود أي تغييرات جوهرية.'
            : 'We may update the privacy policy from time to time, and you will be notified of any significant changes.'}
        </p>

        <h2 style={{ fontFamily: language === 'ar' ? "'Tajawal', sans-serif" : "'Roboto', sans-serif", fontWeight: 'bold', fontSize: '1.5em', margin: '20px 0 10px' }}>
          {language === 'ar' ? '8. تواصل معنا' : '8. Contact Us'}
        </h2>
        <p style={{ fontSize: '1.1em', marginBottom: '20px' }}>
          {language === 'ar'
            ? 'للاستفسارات أو الدعم بخصوص الخصوصية، يُرجى التواصل عبر البريد الإلكتروني:'
            : 'For inquiries or support regarding privacy, please contact us via email:'}
        </p>
        <p style={{ fontSize: '1.1em', marginBottom: '20px' }}>
          📩 <a href="mailto:Nourhanmatwally09@gmail.com" style={{ color: '#C19A6B', textDecoration: 'none' }}>
            Nourhanmatwally09@gmail.com
          </a>
        </p>
      </div>
    </div>
  );
}