import React, { useState, useEffect, useRef } from 'react';
import styles from './ReactionButton.module.css';

// Tạo dữ liệu ảo cho danh sách người dùng đã like
const dummyUsers = [
  { avatar: 'https://i.pravatar.cc/30?img=1' },
  { avatar: 'https://i.pravatar.cc/30?img=2' },
  { avatar: 'https://i.pravatar.cc/30?img=3' },
  
];

// Component ReactionButton
const ReactionButton = ({ likeCount, avatars = [], users = [] }) => {
  const [showLikes, setShowLikes] = useState(false);
  const likeListRef = useRef(null);

  // Hàm để hiển thị danh sách likes
  const handleMouseEnter = () => setShowLikes(true);
  
  // Hàm để ẩn danh sách likes khi chuột rời khỏi cả nút và danh sách
  const handleMouseLeave = () => setShowLikes(false);

  // Đóng menu khi nhấn bên ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (likeListRef.current && !likeListRef.current.contains(event.target)) {
        setShowLikes(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.reactionContainer} ref={likeListRef}>
      {/* Hiển thị danh sách người dùng đã like bên trên nút like */}
      {showLikes && (
        <div 
          className={styles.likeList} 
          onMouseEnter={handleMouseEnter} 
          onMouseLeave={handleMouseLeave}
        >
          {users.map((user, index) => (
            <div key={index} className={styles.userItem}>
              <img src={user.avatar} alt="avatar" className={styles.avatar1} />
            </div>
          ))}
        </div>
      )}

      <button 
        className={styles.reactionButton} 
        onMouseEnter={handleMouseEnter} 
        onMouseLeave={handleMouseLeave}
      >
        👍 {likeCount}
      </button>
      
      {/* Hiển thị các avatar nhỏ */}
      <div className={styles.avatarContainer}>
        {avatars.slice(0, 3).map((avatar, index) => (
          <img key={index} src={avatar} alt="avatar" className={styles.avatar} />
        ))}
      </div>
    </div>
  );
};

// Sử dụng dữ liệu ảo và truyền vào component
const App = () => {
  return (
    <div>
      <ReactionButton 
        likeCount={dummyUsers.length} 
        avatars={dummyUsers.map(user => user.avatar)} 
        users={dummyUsers} 
      />
    </div>
  );
};

export default App;
