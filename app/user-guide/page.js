import Link from 'next/link';
import Image from 'next/image';

export default function UserGuide() {
  return (
    <div style={{ padding: '20px', textAlign: 'center', backgroundColor: '#F5F5DC', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
      <h1 style={{ color: '#3A2B1F', fontFamily: "'Cairo', sans-serif", fontWeight: '900', fontSize: '28px' }}>دليل الاستخدام</h1>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
        <Link href="/student-guide">
          <div style={{ borderRadius: '15px', overflow: 'hidden', border: '2px solid #D2B48C', cursor: 'pointer', width: '300px', textAlign: 'center', backgroundColor: '#FFF5E1' }}>
            <div style={{ position: 'relative', paddingTop: '177.78%' }}>
              <Image src="/student-icon.png" alt="Student Guide" layout="fill" objectFit="cover" />
              <span style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: '#3A2B1F', fontFamily: "'Amiri', serif", fontSize: '20px' }}>دليل الطالب</span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}