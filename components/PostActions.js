// PostActions.js
import { useState } from 'react';
import './PostActions.css';
import ReactionButton from './ReactionButton';

const PostActions = () => {
    const avatars = [
        '/images/truyen1.jpg',
        '/images/person.jpg',
        '/images/person.jpg'
      ];
      

  return (
    <div className="post-actions-container">
      <div className="post-actions-header">
        <div className="like-count">
          <ReactionButton likeCount={203} avatars={avatars} /> {/* Truyền số lượt thích và danh sách avatar */}
        </div>

        <div className="comment-count">
          <span className="text-black">39 bình luận</span>
        </div>
      </div>
    </div>
  );
};

export default PostActions;
