'use client';

import Image from 'next/image';
import Link from 'next/link';
import { translations } from '../../lib/translations';
import { useLanguage } from '../../lib/LanguageContext';

export default function Materials() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: 'calc(100vh - 120px)' }}>
      <h1 style={{ margin: '20px 0' }}>{t.subjectHeader}</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
        <Link href="/materials/arabic" style={{ textDecoration: 'none' }}>
          <div className="card" style={{ textAlign: 'center', cursor: 'pointer' }}>
            <Image src="/arabic.jpg" alt="Arabic" width={200} height={200} />
            <h2>{t.arabic}</h2>
          </div>
        </Link>
        <Link href="/materials/math" style={{ textDecoration: 'none' }}>
          <div className="card" style={{ textAlign: 'center', cursor: 'pointer' }}>
            <Image src="/math.jpg" alt="Math" width={200} height={200} />
            <h2>{t.math}</h2>
          </div>
        </Link>
        <Link href="/materials/science" style={{ textDecoration: 'none' }}>
          <div className="card" style={{ textAlign: 'center', cursor: 'pointer' }}>
            <Image src="/science.jpg" alt="Science" width={200} height={200} />
            <h2>{t.science}</h2>
          </div>
        </Link>
      </div>
    </div>
  );
}