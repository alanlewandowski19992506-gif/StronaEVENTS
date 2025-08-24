import React, { useState } from 'react';
import { Review } from '../../types';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/Button';
import { Star, ThumbsUp } from 'lucide-react';
import { reviewService } from '../../services/reviewService';

interface ReviewSectionProps {
  eventId: string;
  reviews: Review[];
  onReviewAdded: () => void;
}

export const ReviewSection: React.FC<ReviewSectionProps> = ({ 
  eventId, 
  reviews, 
  onReviewAdded 
}) => {
  const { user } = useAuth();
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmitReview = async () => {
    if (!user || !newReview.comment.trim()) return;

    setSubmitting(true);
    try {
      await reviewService.createReview({
        eventId,
        userId: user.id,
        userName: user.name,
        userAvatar: user.avatar,
        rating: newReview.rating,
        comment: newReview.comment.trim()
      });
      
      setNewReview({ rating: 5, comment: '' });
      setShowReviewForm(false);
      onReviewAdded();
    } catch (error) {
      console.error('Error submitting review:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleMarkHelpful = async (reviewId: string) => {
    try {
      await reviewService.markHelpful(reviewId);
      onReviewAdded(); // Refresh reviews
    } catch (error) {
      console.error('Error marking review as helpful:', error);
    }
  };

  const renderStars = (rating: number, interactive = false) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 ${
              star <= rating 
                ? 'text-yellow-400 fill-current' 
                : 'text-gray-300'
            } ${interactive ? 'cursor-pointer hover:text-yellow-400' : ''}`}
            onClick={interactive ? () => setNewReview(prev => ({ ...prev, rating: star })) : undefined}
          />
        ))}
      </div>
    );
  };

  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Reviews ({reviews.length})
          </h2>
          {reviews.length > 0 && (
            <div className="flex items-center space-x-2">
              {renderStars(Math.round(averageRating))}
              <span className="text-sm text-gray-600">
                {averageRating.toFixed(1)} out of 5
              </span>
            </div>
          )}
        </div>
        
        {user && !showReviewForm && (
          <Button onClick={() => setShowReviewForm(true)}>
            Write a Review
          </Button>
        )}
      </div>

      {/* Review Form */}
      {showReviewForm && user && (
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-medium text-gray-900 mb-3">Write a Review</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rating
              </label>
              {renderStars(newReview.rating, true)}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Comment
              </label>
              <textarea
                value={newReview.comment}
                onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
                placeholder="Share your experience with this event..."
              />
            </div>
            
            <div className="flex space-x-2">
              <Button
                onClick={handleSubmitReview}
                loading={submitting}
                disabled={!newReview.comment.trim()}
              >
                Submit Review
              </Button>
              <Button
                variant="ghost"
                onClick={() => {
                  setShowReviewForm(false);
                  setNewReview({ rating: 5, comment: '' });
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No reviews yet. Be the first to review this event!
          </div>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <img
                  src={review.userAvatar || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?w=50&h=50&fit=crop&crop=face'}
                  alt={review.userName}
                  className="w-10 h-10 rounded-full"
                />
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-medium text-gray-900">{review.userName}</h4>
                      <div className="flex items-center space-x-2">
                        {renderStars(review.rating)}
                        <span className="text-sm text-gray-500">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-3">{review.comment}</p>
                  
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => handleMarkHelpful(review.id)}
                      className="flex items-center space-x-1 text-sm text-gray-500 hover:text-gray-700"
                    >
                      <ThumbsUp className="w-4 h-4" />
                      <span>Helpful ({review.helpful})</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};