'use client';

import { useState, useEffect } from 'react';
import { translations } from '../../lib/translations';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { FaComments } from 'react-icons/fa';

const DiscussionsContent = ({ language }) => {
  const { data: session } = useSession();
  const t = translations[language];
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get('/api/discussions');
        setComments(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching comments:', error);
        setLoading(false);
      }
    };
    fetchComments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !session?.user?.id) return;

    try {
      const response = await axios.post('/api/discussions', {
        userId: session.user.id,
        userName: session.user.name,
        role: session.user.role,
        comment: newComment,
      });
      setComments([...comments, response.data]);
      setNewComment('');
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  if (loading) return <div style={{ textAlign: 'center', padding: '20px' }}>{t.loading}</div>;

  return (
    <div style={{ padding: '20px', textAlign: language === 'ar' ? 'right' : 'left', backgroundColor: '#FFF5E1', borderRadius: '15px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', minHeight: '200px', height: 'auto', display: 'flex', flexDirection: 'column', maxHeight: '600px', overflowY: 'auto' }}>
      <h2 style={{ color: '#3A2B1F', fontSize: '24px', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <FaComments color="#D2B48C" /> {t.discussions}
      </h2>
      <p style={{ color: '#4A3728', fontSize: '16px', marginBottom: '20px' }}>
        {language === 'ar' ? 'شارك أفكارك وناقش مع زملائك في هذا المكان التفاعلي!' : 'Share your ideas and discuss with your peers in this interactive space!'}
      </p>
      {session && (
        <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
          <textarea value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder={language === 'ar' ? 'اكتب تعليقك هنا...' : 'Write your comment here...'} style={{ padding: '10px', borderRadius: '5px', border: '1px solid #D2B48C', width: '100%', marginBottom: '10px' }} />
          <button type="submit" style={{ backgroundColor: '#D2B48C', color: '#3A2B1F', padding: '8px 16px', borderRadius: '8px', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>
            {language === 'ar' ? 'إرسال' : 'Submit'}
          </button>
        </form>
      )}
      <div>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment._id} style={{ borderBottom: '1px solid #D2B48C', padding: '10px 0' }}>
              <strong>{comment.userName} ({comment.role})</strong> - <span style={{ color: '#666' }}>{new Date(comment.createdAt).toLocaleString()}</span>
              <p>{comment.comment}</p>
            </div>
          ))
        ) : (
          <p>{language === 'ar' ? 'لا توجد تعليقات بعد' : 'No comments yet'}</p>
        )}
      </div>
    </div>
  );
};

export default DiscussionsContent;