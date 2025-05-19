'use client';

import { useSession, update } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '../../../lib/LanguageContext';
import { translations } from '../../../lib/translations';
import { useState } from 'react';
import { FiSave } from 'react-icons/fi';
import styled from 'styled-components';

const FormContainer = styled.div`
  font-family: 'Montserrat', sans-serif;
  color: #333;
  padding: 20px;
  background: #F9F5EB;
  min-height: calc(100vh - 200px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FormCard = styled.div`
  background: linear-gradient(to bottom right, #EDE4D3, #F9F5EB);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  width: 300px;
`;

export default function EditProfile() {
  const { data: session, update: updateSession } = useSession();
  const { language } = useLanguage();
  const t = translations[language];
  const isArabic = language === 'ar';
  const router = useRouter();
  const [name, setName] = useState(session?.user.name || '');
  const [email, setEmail] = useState(session?.user.email || ''); // read-only فقط للعرض

  if (!session) {
    return <div style={{ textAlign: 'center', padding: '50px' }}>{t.pleaseSignIn}</div>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/update-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });
      const data = await response.json();
      if (response.ok) {
        await updateSession({ user: { ...session.user, name } }); // تحديث الجلسة بالاسم فقط
        alert(isArabic ? 'تم تحديث البيانات بنجاح!' : 'Profile updated successfully!');
        router.push('/profile');
        router.refresh();
      } else {
        alert(data.error || (isArabic ? 'فشل في تحديث البيانات' : 'Failed to update profile'));
      }
    } catch {
      alert(isArabic ? 'حدث خطأ أثناء التحديث' : 'An error occurred during update');
    }
  };

  return (
    <FormContainer>
      <FormCard>
        <h2 style={{ color: '#4A704A', textAlign: 'center', fontWeight: 600 }}>{isArabic ? 'تعديل البيانات' : 'Edit Profile'}</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div>
            <label style={{ fontWeight: 500 }}>{isArabic ? 'الاسم' : 'Name'}</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #6B8A6B', fontSize: '0.9em' }}
            />
          </div>
          <div>
            <label style={{ fontWeight: 500 }}>{isArabic ? 'البريد الإلكتروني' : 'Email'}</label>
            <input
              type="email"
              value={email}
              disabled // جعل الحقل read-only
              style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #6B8A6B', fontSize: '0.9em', backgroundColor: '#f0f0f0' }}
            />
          </div>
          <button
            type="submit"
            style={{
              backgroundColor: '#4A704A',
              color: '#fff',
              padding: '10px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              transition: 'background-color 0.3s',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              justifyContent: 'center',
              fontWeight: 600,
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#3A5A3A')}
            onMouseOut={(e) => (e.target.style.backgroundColor = '#4A704A')}
          >
            <FiSave /> {isArabic ? 'حفظ التغييرات' : 'Save Changes'}
          </button>
        </form>
      </FormCard>
    </FormContainer>
  );
}