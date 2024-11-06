// components/Comments.tsx
import React, { useState } from 'react';

interface Comment {
  id: number;
  text: string;
}

const Comments: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    if (newComment.trim() !== '') {
      setComments([...comments, { id: comments.length + 1, text: newComment }]);
      setNewComment('');
    }
  };

  return (
    <div className="comments-section">
      <input
        type="text"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Thêm bình luận..."
      />
      <button onClick={handleAddComment}>Gửi</button>
      <div>
        {comments.map((comment) => (
          <div key={comment.id} className="comment">
            {comment.text}
          </div>
        ))}
      </div>
    </div>
  );
  
};

export default Comments;
