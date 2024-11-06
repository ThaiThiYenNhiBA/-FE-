// components/ReactionTooltip.js

const ReactionTooltip = () => {
    return (
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex space-x-5 bg-gray-800 p-5 rounded-full shadow-lg">
        {/* Tăng kích thước icon và thêm khoảng cách */}
        <span role="img" aria-label="like" className="text-5xl cursor-pointer hover:scale-125 transition-transform">👍</span>
        <span role="img" aria-label="heart" className="text-5xl cursor-pointer hover:scale-125 transition-transform">❤️</span>
        <span role="img" aria-label="haha" className="text-5xl cursor-pointer hover:scale-125 transition-transform">😂</span>
        <span role="img" aria-label="wow" className="text-5xl cursor-pointer hover:scale-125 transition-transform">😮</span>
        <span role="img" aria-label="sad" className="text-5xl cursor-pointer hover:scale-125 transition-transform">😢</span>
        <span role="img" aria-label="angry" className="text-5xl cursor-pointer hover:scale-125 transition-transform">😡</span>
      </div>
    );
  };
  
export default ReactionTooltip;
