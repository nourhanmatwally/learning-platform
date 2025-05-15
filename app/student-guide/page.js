'use client';

import Link from 'next/link';
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
        {language === 'ar' ? 'دليل الطالب' : 'Student Guide'}
      </h1>
      <div style={{ textAlign: language === 'ar' ? 'right' : 'left', maxWidth: '800px', margin: '0 auto' }}>
        <h2 style={{ color: '#3A2B1F', fontWeight: 'bold', fontSize: '20px', marginTop: '20px' }}>
          {language === 'ar' ? ' مقدمة الدليل' : ' Introduction to the Guide'}
        </h2>
        <p style={{ color: '#3A2B1F', fontSize: '16px', lineHeight: '1.6' }}>
          {language === 'ar' ? 
            'منصة التعلم التشاركي هي بيئة تعليمية إلكترونية تهدف إلى تحسين تجربة التعلم لطلاب المرحلة الإعدادية، من خلال توفير أدوات ووسائل تفاعلية تتيح لهم التفاعل مع المعلم والزملاء ومتابعة الأنشطة الدراسية عن بُعد. ستُستخدم هذه المنصة بشكل رئيسي عبر Google Classroom، بالإضافة إلى بعض الأدوات التقنية الأخرى مثل Microsoft Teams وMoodle، بهدف تعزيز تجربة التعلم التفاعلي.' : 
            'The Collaborative Learning Platform is an electronic educational environment aimed at enhancing the learning experience for preparatory stage students by providing interactive tools and resources that enable interaction with teachers and peers, as well as remote tracking of academic activities. The platform will primarily utilize Google Classroom, along with other technical tools such as Microsoft Teams and Moodle, to enhance the interactive learning experience.'}
        </p>

        <h2 style={{ color: '#3A2B1F', fontWeight: 'bold', fontSize: '20px', marginTop: '20px' }}>
          {language === 'ar' ? ' أهمية استخدام الدليل' : 'Second: Importance of Using the Guide'}
        </h2>
        <p style={{ color: '#3A2B1F', fontSize: '16px', lineHeight: '1.6' }}>
          {language === 'ar' ? 
            'يُعتبر هذا الدليل أداة هامة للطلاب ليتعرفوا على كيفية استخدام المنصة بفعالية. من خلال اتباع الخطوات البسيطة والمباشرة التي يقدمها، يمكن للطلاب التفاعل بسهولة مع الصفوف الدراسية، إتمام الأنشطة في الوقت المحدد، والتواصل مع المعلمين والزملاء. يهدف هذا الدليل إلى تسهيل عملية استخدام المنصة، وتحقيق أقصى استفادة من جميع الأدوات المتاحة، مما يساعد الطلاب على تحسين تجربتهم التعليمية وتنمية مهاراتهم التقنية.' : 
            'This guide serves as an essential tool for students to learn how to effectively use the platform. By following the simple and straightforward steps it provides, students can easily interact with classes, complete activities on time, and communicate with teachers and peers. The guide aims to simplify the platform usage process, maximize the benefits of available tools, and help students improve their educational experience and develop their technical skills.'}
        </p>

        <h2 style={{ color: '#3A2B1F', fontWeight: 'bold', fontSize: '20px', marginTop: '20px' }}>
          {language === 'ar' ? ' التعليمات العامة للاستخدام' : ' General Usage Instructions'}
        </h2>
        <ol style={{ color: '#3A2B1F', fontSize: '16px', lineHeight: '1.6', textAlign: language === 'ar' ? 'right' : 'left' }}>
          <li>استخدم جهاز مناسب: تأكد من أنك تستخدم جهاز (كمبيوتر، لاب توب، أو تابلت) يعمل بشكل جيد ومتصل بالإنترنت.</li>
          <li>تأكد من اتصالك بالإنترنت: تأكد من وجود اتصال إنترنت مستقر أثناء التفاعل مع المنصة.</li>
          <li>تسجيل الدخول ببياناتك الصحيحة: استخدم اسم المستخدم وكلمة المرور الخاصين بك.</li>
          <li>احترام قواعد السلوك: حافظ على سلوك جيد وتفاعل بإيجابية.</li>
          <li>تسليم الأنشطة في الموعد المحدد: أكمل الواجبات في الوقت المطلوب.</li>
          <li>استخدام أدوات المنصة بشكل صحيح: تعامل مع الفيديوهات والملفات حسب تعليمات المعلم.</li>
          <li>احفظ عملك بشكل دوري: احفظ تقدمك لتجنب فقدان البيانات.</li>
          <li>طرح الأسئلة في حال الحاجة: لا تتردد في السؤال إذا واجهت مشكلة.</li>
          <li>تأكد من الخصوصية والأمان: تجنب مشاركة معلومات شخصية غير لائقة.</li>
          <li>احترم مواعيد الصفوف الافتراضية: حضر في الوقت المحدد أو شاهد المسجل لاحقًا.</li>
        </ol>
        <p style={{ color: '#3A2B1F', fontSize: '14px', fontStyle: 'italic', marginTop: '10px' }}>
          {language === 'ar' ? 'ملاحظة إضافية: استخدم هذه التعليمات كإطار للعمل اليومي في المنصة لضمان تجربة تعلم سلسة. إذا واجهتك أي مشكلة فنية، تواصل مع المعلم أو الدعم الفني فوراً.' : 'Additional Note: Use these instructions as a daily framework for a smooth learning experience. If you encounter any technical issues, contact your teacher or technical support immediately.'}
        </p>

        <h2 style={{ color: '#3A2B1F', fontWeight: 'bold', fontSize: '20px', marginTop: '20px' }}>
          {language === 'ar' ? ' التعرف على المنصة والدخول إليها' : ' Getting to Know the Platform and Accessing It'}
        </h2>
        <ol style={{ color: '#3A2B1F', fontSize: '16px', lineHeight: '1.6', textAlign: language === 'ar' ? 'right' : 'left' }}>
          <li>التسجيل على المنصة:
            <ul style={{ marginTop: '5px' }}>
              <li>فتح المتصفح: أولاً، افتح متصفح الإنترنت المفضل لك (مثل Google Chrome، Firefox).</li>
              <li>الدخول إلى الرابط: اكتب رابط المنصة (Google Classroom) في شريط العنوان أو اضغط على الرابط الذي تم توفيره من قبل المعلم.</li>
              <li>التسجيل بحسابك: إذا كنت تستخدم Google Classroom، اضغط على "تسجيل الدخول" وأدخل بيانات حسابك (البريد الإلكتروني وكلمة المرور الخاصة بالمدرسة).</li>
            </ul>
          </li>
          <li>صفحة تسجيل الدخول:
            <ul style={{ marginTop: '5px' }}>
              <li>إدخال البريد الإلكتروني: في صفحة تسجيل الدخول، ستظهر لك خانة لإدخال بريدك (مثال: Student@school.edu).</li>
              <li>إدخال كلمة المرور: بعد إدخال البريد الإلكتروني، سيطلب منك إدخال كلمة المرور.</li>
              <li>الضغط على "تسجيل الدخول": بعد إدخال البيانات اضغط على "تسجيل الدخول" للوصول إلى حسابك.</li>
            </ul>
          </li>
          <li>التنقل داخل المنصة:
            <ul style={{ marginTop: '5px' }}>
              <li>الصفحة الرئيسية: بعد تسجيل الدخول، ستظهر لك صفحة رئيسية تحتوي على الفصول الدراسية التي تم دعوتك إليها.</li>
              <li>الانتقال بين الفصول: اضغط على اسم الفصل الدراسي الذي ترغب في دخوله.</li>
              <li>الدخول إلى المادة: داخل الفصل، ستجد المواد الدراسية، الواجبات، التقييمات، والتقويمات.</li>
            </ul>
          </li>
          <li>إعدادات الحساب:
            <ul style={{ marginTop: '5px' }}>
              <li>تخصيص ملفك الشخصي: يمكنك إضافة صورة شخصية أو تعديل بياناتك الشخصية.</li>
              <li>إعدادات الإشعارات: قم بضبط الإشعارات لتلقي إشعارات عن الواجبات.</li>
            </ul>
          </li>
          <li>التأكد من وجود الأدوات المطلوبة:
            <ul style={{ marginTop: '5px' }}>
              <li>تأكد من أن لديك جميع الأدوات مثل Google Docs أو Google Meet.</li>
            </ul>
          </li>
        </ol>
        <p style={{ color: '#3A2B1F', fontSize: '14px', fontStyle: 'italic', marginTop: '10px' }}>
          {language === 'ar' ? 'ملاحظة إضافية: تأكد من أن لديك اتصال إنترنت مستقر لتتمكن من الدخول إلى المنصة والعمل بدون مشاكل. في حال واجهت مشكلة أثناء تسجيل الدخول، يمكنك التواصل مع المعلم أو الدعم الفني لحل المشكلة.' : 'Additional Note: Ensure you have a stable internet connection to access the platform and work without issues. If you encounter any login problems, contact your teacher or technical support for assistance.'}
        </p>

        <h2 style={{ color: '#3A2B1F', fontWeight: 'bold', fontSize: '20px', marginTop: '20px' }}>
          {language === 'ar' ? ' التنقل عبر الصف الافتراضي' : ' Navigating the Virtual Class'}
        </h2>
        <ol style={{ color: '#3A2B1F', fontSize: '16px', lineHeight: '1.6', textAlign: language === 'ar' ? 'right' : 'left' }}>
          <li>الدخول إلى الصفحة الرئيسية للصف: بعد تسجيل الدخول إلى Google Classroom، ستظهر لك الصفحة الرئيسية.</li>
          <li>التنقل بين الفصول الدراسية: إذا كنت مشتركاً في أكثر من فصل، يمكنك التنقل بسهولة.</li>
          <li>الانتقال إلى المواد الدراسية: داخل كل فصل، ستجد الملفات الدراسية والواجبات.</li>
          <li>الوصول إلى الواجبات والأنشطة: ضمن قسم Classwork، ستجد الواجبات.</li>
          <li>التفاعل مع المحتوى: يمكنك فتح المواد الدراسية أو المشاركة في المناقشات.</li>
          <li>البحث عن المحتوى باستخدام شريط البحث: استخدم شريط البحث للعثور على المواد.</li>
          <li>التنقل بين الدروس والموارد الأخرى: استخدم التبويبات للتنقل بين الدروس.</li>
          <li>إغلاق المنصة والخروج منها: اختر Sign out للخروج.</li>
        </ol>
        <p style={{ color: '#3A2B1F', fontSize: '14px', fontStyle: 'italic', marginTop: '10px' }}>
          {language === 'ar' ? 'ملاحظة إضافية: إذا كان لديك مشكلة في التنقل داخل الصف الافتراضي أو إذا لم تجد مادة دراسية، تأكد من أنك مسجل في الفصل بشكل صحيح أو تواصل مع المعلم للمساعدة.' : 'Additional Note: If you have trouble navigating the virtual class or cannot find study material, ensure you are correctly enrolled or contact your teacher for assistance.'}
        </p>

        <h2 style={{ color: '#3A2B1F', fontWeight: 'bold', fontSize: '20px', marginTop: '20px' }}>
          {language === 'ar' ? ' التفاعل داخل الصف الافتراضي' : 'Interacting in the Virtual Class'}
        </h2>
        <ol style={{ color: '#3A2B1F', fontSize: '16px', lineHeight: '1.6', textAlign: language === 'ar' ? 'right' : 'left' }}>
          <li>التفاعل مع المعلم: تابع التعليمات وشارك في الأنشطة.</li>
          <li>المشاركة في المناقشات الصفية: شارك بردود مفيدة ومحترمة.</li>
          <li>التعليق على الأنشطة والمنشورات: استخدم لغة واضحة ومحترمة.</li>
          <li>التفاعل أثناء اللقاءات المباشرة: افتح الكاميرا والميكروفون حسب التعليمات.</li>
          <li>الإجابة على الأنشطة والاختبارات: شارك وحل المهام في الوقت المحدد.</li>
          <li>التفاعل مع الزملاء: شارك في المشاريع وأحترم آراء الآخرين.</li>
        </ol>
        <p style={{ color: '#3A2B1F', fontSize: '14px', fontStyle: 'italic', marginTop: '10px' }}>
          {language === 'ar' ? 'ملاحظة إضافية: التفاعل الجيد مع الصف يظهر اهتمامك بالدرس ويزيد من فرصك في التعلم والاستفادة.' : 'Additional Note: Good interaction with the class shows your interest in the lesson and increases your learning opportunities.'}
        </p>

        <h2 style={{ color: '#3A2B1F', fontWeight: 'bold', fontSize: '20px', marginTop: '20px' }}>
          {language === 'ar' ? ' تسليم الأنشطة في الوقت المحدد' : ' Submitting Activities on Time'}
        </h2>
        <ol style={{ color: '#3A2B1F', fontSize: '16px', lineHeight: '1.6', textAlign: language === 'ar' ? 'right' : 'left' }}>
          <li>متابعة المهام المطلوبة: راجع قسم Classwork بانتظام.</li>
          <li>قراءة تعليمات المهمة: اقرأ التفاصيل الكاملة قبل البدء.</li>
          <li>تنفيذ النشاط: أعد الحل بالطريقة المطلوبة.</li>
          <li>رفع النشاط على المنصة: استخدم زر Add or Create لرفع الملف.</li>
          <li>مراجعة الملف قبل التسليم: تأكد من صحة الملف.</li>
          <li>تسليم النشاط: اضغط على Turn In لتأكيد التسليم.</li>
          <li>مراعاة الوقت: راقب مواعيد التسليم.</li>
          <li>التعامل مع التأخير: تواصل مع المعلم إذا واجهت مشكلة.</li>
        </ol>
        <p style={{ color: '#3A2B1F', fontSize: '14px', fontStyle: 'italic', marginTop: '10px' }}>
          {language === 'ar' ? 'ملاحظات إضافية: الالتزام بتسليم الأنشطة في مواعيدها يعكس جديتك واحتراك للنظام التعليمي.' : 'Additional Notes: Submitting activities on time reflects your seriousness and respect for the educational system.'}
        </p>

        <h2 style={{ color: '#3A2B1F', fontWeight: 'bold', fontSize: '20px', marginTop: '20px' }}>
          {language === 'ar' ? ' التعامل مع الوسائط الرقمية' : ' Interacting with Digital Media'}
        </h2>
        <ol style={{ color: '#3A2B1F', fontSize: '16px', lineHeight: '1.6', textAlign: language === 'ar' ? 'right' : 'left' }}>
          <li>التعرف على أنواع الوسائط الرقمية: تشمل ملفات نصية، عروض، صور، فيديوهات، وروابط.</li>
          <li>فتح الملفات والمرفقات: اضغط على الملف لعرضه.</li>
          <li>تحميل الملفات عند الحاجة: استخدم خيار Download إذا كان متاحاً.</li>
          <li>تشغيل مقاطع الفيديو أو التسجيلات: تأكد من عمل الصوت.</li>
          <li>استخدام العروض التقديمية: استعرض الشرائح بتركيز.</li>
          <li>التفاعل مع المحتوى الرقمي: اتبع التعليمات وشارك بردودك.</li>
          <li>الانتباه لحجم الملفات: تأكد من وجود مساحة كافية.</li>
          <li>احترام حقوق النشر: استخدم الوسائط لأغراض الدراسة فقط.</li>
        </ol>
        <p style={{ color: '#3A2B1F', fontSize: '14px', fontStyle: 'italic', marginTop: '10px' }}>
          {language === 'ar' ? 'ملاحظات إضافية: التعامل السليم مع الوسائط يساعدك على استيعاب الدروس بسهولة.' : 'Additional Notes: Proper handling of digital media helps you understand lessons more easily.'}
        </p>

        <h2 style={{ color: '#3A2B1F', fontWeight: 'bold', fontSize: '20px', marginTop: '20px' }}>
          {language === 'ar' ? ' حلول المشكلات الشائعة' : ' Solutions for Common Issues'}
        </h2>
        <ol style={{ color: '#3A2B1F', fontSize: '16px', lineHeight: '1.6', textAlign: language === 'ar' ? 'right' : 'left' }}>
          <li>مشكلة عدم القدرة على تسجيل الدخول: تأكد من البيانات واستعد كلمة المرور.</li>
          <li>عدم ظهور الصف الافتراضي: تحقق من التسجيل وحدث الصفحة.</li>
          <li>عدم تحميل الملفات: تأكد من الإنترنت والتخزين.</li>
          <li>مشاكل أثناء إرسال الأنشطة: تأكد من الضغط على Turn In.</li>
          <li>تعليق الصفحة: قم بتحديث الصفحة أو أعد تشغيل الجهاز.</li>
          <li>صعوبة في تشغيل الفيديوهات: تأكد من الصوت أو خفض الجودة.</li>
        </ol>
        <p style={{ color: '#3A2B1F', fontSize: '14px', fontStyle: 'italic', marginTop: '10px' }}>
          {language === 'ar' ? 'ملاحظات إضافية: تأكد من جهازك قبل افتراض خطأ في المنصة.' : 'Additional Notes: Check your device before assuming a platform error.'}
        </p>

        <h2 style={{ color: '#3A2B1F', fontWeight: 'bold', fontSize: '20px', marginTop: '20px' }}>
          {language === 'ar' ? ' التواصل مع الدعم الفني' : ' Contacting Technical Support'}
        </h2>
        <ol style={{ color: '#3A2B1F', fontSize: '16px', lineHeight: '1.6', textAlign: language === 'ar' ? 'right' : 'left' }}>
          <li>متى تحتاج التواصل مع الدعم: عند استمرار المشكلة أو عند منع الوصول.</li>
          <li>طرق التواصل: أرسل رسالة عبر البريد أو أبلغ المعلم.</li>
          <li>ماذا تكتب: وضح المشكلة وأرفق لقطة شاشة إن أمكن.</li>
          <li>بعد التواصل: تابع بريدك واتبع الإرشادات.</li>
        </ol>
        <p style={{ color: '#3A2B1F', fontSize: '14px', fontStyle: 'italic', marginTop: '10px' }}>
          {language === 'ar' ? 'ملاحظات إضافية: التواصل مع الدعم يساعدك على الاستمرار في التعلم بدون معوقات.' : 'Additional Notes: Contacting support helps you continue learning without obstacles.'}
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
            <span>{language === 'ar' ? 'تحميل الدليل كـ PDF' : 'Download Guide as PDF'}</span>
          </a>
        </div>
      </div>
    </div>
  );
}