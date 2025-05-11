'use client';

import Link from 'next/link';
import { useLanguage } from '../../lib/LanguageContext';
import { translations } from '../../lib/translations';

export default function AboutUs() {
  const { language } = useLanguage();
  const t = translations[language];
  const direction = language === 'ar' ? 'rtl' : 'ltr';

  return (
    <div style={{ direction, padding: '20px', color: '#3A2B1F', minHeight: 'calc(100vh - 150px)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1 style={{ fontFamily: language === 'ar' ? "'Tajawal', sans-serif" : "'Roboto', sans-serif", fontWeight: 'bold', fontSize: '2em', marginBottom: '20px', color: '#3A2B1F' }}>
        {language === 'ar' ? 'من نحن – منصة سكيب للتعلم' : 'About Us – SKEP Learning Platform'}
      </h1>

      <div style={{ maxWidth: '800px', textAlign: language === 'ar' ? 'right' : 'left', lineHeight: '1.6' }}>
        <p style={{ fontSize: '1.1em', marginBottom: '20px' }}>
          {language === 'ar'
            ? 'مرحبًا بكم في سكيب (SKEP)، منصتكم التعليمية المصممة خصيصًا لتواكب احتياجات طلاب المرحلة الإعدادية، وتدعمهم في اكتساب مهارات القرن الحادي والعشرين من خلال بيئة تعلم إلكترونية تشاركية، تركز على تنمية مهارات استخدام الفصول الافتراضية والوعي التقني.'
            : 'Welcome to SKEP, your educational platform specifically designed to meet the needs of middle school students, supporting them in acquiring 21st-century skills through a collaborative e-learning environment that focuses on developing virtual classroom skills and technological awareness.'}
        </p>
        <p style={{ fontSize: '1.1em', marginBottom: '20px' }}>
          {language === 'ar'
            ? 'نحن نؤمن بأن التعلم لم يعد مقصورًا على الجدران الأربعة للفصل الدراسي، بل أصبح ممتدًا ومتصلًا، يدمج بين المعرفة، والتكنولوجيا، والتفاعل البنّاء. ومن هذا المنطلق، تم تأسيس سكيب لتكون أكثر من مجرد منصة تعليمية؛ بل مساحة رقمية آمنة، داعمة، وملهمة تُشجع الطلاب على النمو والتطور.'
            : 'We believe that learning is no longer confined to the four walls of a classroom; it has become extended and interconnected, integrating knowledge, technology, and constructive interaction. With this in mind, SKEP was founded to be more than just an educational platform—it’s a safe, supportive, and inspiring digital space that encourages students to grow and thrive.'}
        </p>

        <h2 style={{ fontFamily: language === 'ar' ? "'Tajawal', sans-serif" : "'Roboto', sans-serif", fontWeight: 'bold', fontSize: '1.5em', margin: '20px 0 10px' }}>
          {language === 'ar' ? 'رؤيتنا' : 'Our Vision'}
        </h2>
        <p style={{ fontSize: '1.1em', marginBottom: '20px' }}>
          {language === 'ar'
            ? 'أن نكون منصة رائدة في دعم التعلم الإلكتروني التشاركي، من خلال تصميم تجارب تعليمية تدمج التكنولوجيا بالمهارات العملية، وتُعدّ الطلاب لمستقبل رقمي متسارع.'
            : 'To be a leading platform in supporting collaborative e-learning by designing educational experiences that integrate technology with practical skills, preparing students for a fast-paced digital future.'}
        </p>

        <h2 style={{ fontFamily: language === 'ar' ? "'Tajawal', sans-serif" : "'Roboto', sans-serif", fontWeight: 'bold', fontSize: '1.5em', margin: '20px 0 10px' }}>
          {language === 'ar' ? 'رسالتنا' : 'Our Mission'}
        </h2>
        <p style={{ fontSize: '1.1em', marginBottom: '10px' }}>
          {language === 'ar'
            ? 'توفير بيئة تعليمية إلكترونية تشاركية تُنمي لدى طلاب المرحلة الإعدادية:'
            : 'To provide a collaborative e-learning environment that fosters the following skills for middle school students:'}
        </p>
        <ul style={{ padding: language === 'ar' ? '0 20px 0 0' : '0 0 0 20px', marginBottom: '20px', fontSize: '1.1em' }}>
          <li>{language === 'ar' ? 'القدرة على التعامل بكفاءة مع أدوات الفصول الافتراضية.' : 'The ability to efficiently use virtual classroom tools.'}</li>
          <li>{language === 'ar' ? 'الفهم السليم للتقنيات الرقمية المستخدمة في التعلم.' : 'A solid understanding of digital technologies used in learning.'}</li>
          <li>{language === 'ar' ? 'مهارات المشاركة والتفاعل والتعاون مع الزملاء والمعلمين في بيئة رقمية.' : 'Skills for participation, interaction, and collaboration with peers and teachers in a digital environment.'}</li>
        </ul>

        <h2 style={{ fontFamily: language === 'ar' ? "'Tajawal', sans-serif" : "'Roboto', sans-serif", fontWeight: 'bold', fontSize: '1.5em', margin: '20px 0 10px' }}>
          {language === 'ar' ? 'كيف تساعدك منصة سكيب؟' : 'How Does SKEP Help You?'}
        </h2>
        <p style={{ fontSize: '1.1em', marginBottom: '10px' }}>
          {language === 'ar' ? 'من خلال منهجية تعلم حديثة تعتمد على:' : 'Through a modern learning methodology that relies on:'}
        </p>
        <ul style={{ padding: language === 'ar' ? '0 20px 0 0' : '0 0 0 20px', marginBottom: '20px', fontSize: '1.1em' }}>
          <li>{language === 'ar' ? 'دروس تفاعلية تضم أنشطة عملية وتمارين تطبيقية.' : 'Interactive lessons with practical activities and applied exercises.'}</li>
          <li>{language === 'ar' ? 'محاكاة للفصول الافتراضية ليكتسب الطلاب خبرة مباشرة في استخدام الأدوات التعليمية الرقمية مثل Google Classroom وMicrosoft Teams.' : 'Virtual classroom simulations to give students hands-on experience with digital educational tools like Google Classroom and Microsoft Teams.'}</li>
          <li>{language === 'ar' ? 'محتوى مرئي وجذاب يسهل فهم المفاهيم التقنية بأسلوب مبسط ومرح.' : 'Engaging visual content that simplifies technical concepts in a fun and easy way.'}</li>
          <li>{language === 'ar' ? 'دعم مستمر وإرشاد تعليمي من خلال واجهة تفاعلية سهلة الاستخدام.' : 'Continuous support and educational guidance through an easy-to-use interactive interface.'}</li>
        </ul>

        <h2 style={{ fontFamily: language === 'ar' ? "'Tajawal', sans-serif" : "'Roboto', sans-serif", fontWeight: 'bold', fontSize: '1.5em', margin: '20px 0 10px' }}>
          {language === 'ar' ? 'ماذا يميز سكيب؟' : 'What Makes SKEP Unique?'}
        </h2>
        <ul style={{ padding: language === 'ar' ? '0 20px 0 0' : '0 0 0 20px', marginBottom: '20px', fontSize: '1.1em' }}>
          <li>{language === 'ar' ? '✔ واجهة سهلة وبسيطة' : '✔ Simple and Easy Interface'}</li>
          <li>{language === 'ar' ? '✔ تصميم يتماشى مع احتياجات الطلاب الإعداديين' : '✔ Design Tailored to Middle School Students’ Needs'}</li>
          <li>{language === 'ar' ? '✔ محتوى تربوي مدروس ومتجدد' : '✔ Well-Planned and Updated Educational Content'}</li>
          <li>{language === 'ar' ? '✔ دعم فني وتعليمي متكامل' : '✔ Comprehensive Technical and Educational Support'}</li>
          <li>{language === 'ar' ? '✔ بيئة تحفز على الإبداع والتشارك' : '✔ An Environment That Encourages Creativity and Collaboration'}</li>
        </ul>

        <p style={{ fontSize: '1.1em', marginBottom: '20px', fontWeight: 'bold' }}>
          {language === 'ar'
            ? 'انضم إلى سكيب اليوم وابدأ رحلتك في عالم التعلم الإلكتروني، واكتشف كيف يمكن للتكنولوجيا أن تكون بوابتك للتميز والنمو!'
            : 'Join SKEP today and start your journey in the world of e-learning, discovering how technology can be your gateway to excellence and growth!'}
        </p>

        <Link href="/signup">
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
            {language === 'ar' ? 'انضم الآن' : 'Join Now'}
          </button>
        </Link>
      </div>
    </div>
  );
}