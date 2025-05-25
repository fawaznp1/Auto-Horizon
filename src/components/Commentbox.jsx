import React, { useState } from 'react';
import { Heart, MessageCircle, Send, User } from 'lucide-react';

const LikesCommentsComponent = () => {
  const [likes, setLikes] = useState(42);
  const [isLiked, setIsLiked] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([
    {
      id: 1,
      author: 'Sarah Chen',
      avatar: 'SC',
      content: 'This is absolutely amazing! Love the design choices here.',
      timestamp: '2h ago',
      bgColor: 'bg-purple-500'
    },
    {
      id: 2,
      author: 'Mike Rodriguez',
      avatar: 'MR',
      content: 'Great work! The attention to detail is incredible. Keep it up! 🔥',
      timestamp: '4h ago',
      bgColor: 'bg-blue-500'
    },
    {
      id: 3,
      author: 'Emma Thompson',
      avatar: 'ET',
      content: 'I had the same issue before, this really helps solve it elegantly.',
      timestamp: '6h ago',
      bgColor: 'bg-green-500'
    },
    {
      id: 4,
      author: 'Alex Kim',
      avatar: 'AK',
      content: 'Brilliant approach! Thanks for sharing this with the community.',
      timestamp: '1d ago',
      bgColor: 'bg-orange-500'
    }
  ]);

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setIsLiked(!isLiked);
  };

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      const comment = {
        id: comments.length + 1,
        author: 'You',
        avatar: 'YU',
        content: newComment,
        timestamp: 'now',
        bgColor: 'bg-indigo-500'
      };
      setComments([comment, ...comments]);
      setNewComment('');
    }
  };

  return (
    <div className="max-w-4xl mx-auto mb-3 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      {/* Header with likes */}
      <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleLike}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 transform hover:scale-105 ${
                isLiked
                  ? 'bg-red-50 text-red-500 shadow-lg shadow-red-100'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Heart
                className={`w-5 h-5 transition-all duration-300 ${
                  isLiked ? 'fill-current animate-pulse' : ''
                }`}
              />
              <span className="font-semibold">{likes}</span>
            </button>
            <div className="flex items-center space-x-2 text-gray-600">
              <MessageCircle className="w-5 h-5" />
              <span className="font-semibold">{comments.length} comments</span>
            </div>
          </div>
        </div>
      </div>

      {/* Comment form */}
      <div className="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-blue-50/30 to-purple-50/30">
        <div className="space-y-4">
          <div className="flex space-x-3">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Share your thoughts..."
                className="w-full px-4 py-3 border border-gray-200 rounded-xl resize-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm"
                rows="3"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                    handleSubmitComment(e);
                  }
                }}
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              onClick={handleSubmitComment}
              disabled={!newComment.trim()}
              className="flex items-center space-x-2 px-6 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl"
            >
              <Send className="w-4 h-4" />
              <span className="font-medium">Post Comment</span>
            </button>
          </div>
        </div>
      </div>

      {/* Comments list */}
      <div className="max-h-96 overflow-y-auto">
        {comments.map((comment, index) => (
          <div
            key={comment.id}
            className={`px-6 py-4 border-b border-gray-50 last:border-b-0 hover:bg-gray-25 transition-colors duration-200 ${
              index === 0 && comment.author === 'You' ? 'bg-indigo-25 animate-fadeIn' : ''
            }`}
          >
            <div className="flex space-x-3">
              <div className="flex-shrink-0">
                <div className={`w-10 h-10 ${comment.bgColor} rounded-full flex items-center justify-center shadow-md`}>
                  <span className="text-white font-semibold text-sm">
                    {comment.avatar}
                  </span>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="font-semibold text-gray-900 text-sm">
                    {comment.author}
                  </h4>
                  <span className="text-gray-500 text-xs">{comment.timestamp}</span>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {comment.content}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="px-6 py-3 bg-gray-50 text-center">
        <p className="text-xs text-gray-500">
          Join the conversation and share your thoughts!
        </p>
      </div>
    </div>
  );
};

export default LikesCommentsComponent;