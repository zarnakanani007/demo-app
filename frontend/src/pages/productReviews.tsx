import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../redux/store';
import { fetchProductReviews, addReview } from '../redux/reviewSlice';
import { toast } from 'react-hot-toast';
import axios from 'axios';

// Simple Star Rating Component
const StarRating: React.FC<{ 
  rating: number; 
  onRatingChange?: (rating: number) => void; 
  readonly?: boolean;
}> = ({ rating, onRatingChange, readonly = false }) => {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => !readonly && onRatingChange?.(star)}
          disabled={readonly}
          className={`text-2xl ${readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110'}`}
        >
          {star <= rating ? '⭐' : '☆'}
        </button>
      ))}
    </div>
  );
};

// Review Item Component
const ReviewItem: React.FC<{ review: any }> = ({ review }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-4">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h4 className="font-semibold text-lg">{review.user.name}</h4>
          <StarRating rating={review.rating} readonly />
        </div>
        <span className="text-sm text-gray-500">
          {new Date(review.createdAt).toLocaleDateString()}
        </span>
      </div>
      <p className="text-gray-700">{review.comment}</p>
    </div>
  );
};

// Review Form Component
const ReviewForm: React.FC<{ productId: string; onReviewAdded: () => void }> = ({ 
  productId, 
  onReviewAdded 
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { token } = useSelector((state: RootState) => state.auth);
  
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!rating) {
      toast.error('Please select a rating');
      return;
    }

    if (!comment.trim()) {
      toast.error('Please write a review');
      return;
    }

    try {
      setLoading(true);
      
      await dispatch(addReview({
        productId,
        rating,
        comment: comment.trim(),
        token
      })).unwrap();

      toast.success('Review added successfully!');
      setRating(0);
      setComment('');
      onReviewAdded(); // Refresh reviews
      
    } catch (error: any) {
      toast.error(error.message || 'Failed to add review');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-4">Write a Review</h3>
      
      <form onSubmit={handleSubmit}>
        {/* Star Rating */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Your Rating</label>
          <StarRating rating={rating} onRatingChange={setRating} />
        </div>

        {/* Comment */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Your Review</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your experience with this product..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows={4}
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading ? 'Submitting...' : 'Submit Review'}
        </button>
      </form>
    </div>
  );
};

// Main Product Reviews Page
const ProductReviews: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  
  const { reviews, loading, error } = useSelector((state: RootState) => state.reviews);
  const [stats, setStats] = useState({ averageRating: 0, totalReviews: 0 });

  // Fetch reviews and stats
  const fetchReviews = async () => {
    if (id) {
      await dispatch(fetchProductReviews(id));
      
      // Fetch stats separately
      try {
        const statsResponse = await axios.get(`http://localhost:5000/api/reviews/stats/${id}`);
        setStats(statsResponse.data.stats);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [id, dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Loading reviews...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
        >
          ← Back to Product
        </button>

        {/* Product Review Header */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h1 className="text-2xl font-bold mb-4">Product Reviews</h1>
          
          {/* Rating Summary */}
          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600">
                {stats.averageRating}
              </div>
              <StarRating rating={Math.round(stats.averageRating)} readonly />
              <div className="text-sm text-gray-600 mt-1">
                {stats.totalReviews} reviews
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Reviews List - 2/3 width */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold mb-4">Customer Reviews</h2>
            
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}

            {reviews.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No reviews yet. Be the first to review!
              </div>
            ) : (
              <div>
                {reviews.map((review) => (
                  <ReviewItem key={review._id} review={review} />
                ))}
              </div>
            )}
          </div>

          {/* Review Form - 1/3 width */}
          <div className="lg:col-span-1">
            <ReviewForm productId={id!} onReviewAdded={fetchReviews} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductReviews;