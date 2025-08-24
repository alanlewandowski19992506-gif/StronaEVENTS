import { Review } from '../types';

class ReviewService {
  private reviews: Review[] = [];

  constructor() {
    this.initializeData();
  }

  private initializeData() {
    const storedReviews = localStorage.getItem('eventify_reviews');
    if (storedReviews) {
      this.reviews = JSON.parse(storedReviews);
    } else {
      // Sample reviews
      this.reviews = [
        {
          id: '1',
          eventId: '1',
          userId: 'user1',
          rating: 5,
          comment: 'Amazing conference! Great speakers and networking opportunities.',
          createdAt: '2025-01-10T00:00:00Z',
          helpful: 12,
          userName: 'Sarah Johnson',
          userAvatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?w=50&h=50&fit=crop&crop=face'
        },
        {
          id: '2',
          eventId: '1',
          userId: 'user2',
          rating: 4,
          comment: 'Very informative sessions. The venue was perfect and well organized.',
          createdAt: '2025-01-12T00:00:00Z',
          helpful: 8,
          userName: 'Mike Chen',
          userAvatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?w=50&h=50&fit=crop&crop=face'
        }
      ];
      localStorage.setItem('eventify_reviews', JSON.stringify(this.reviews));
    }
  }

  async createReview(reviewData: Omit<Review, 'id' | 'createdAt' | 'helpful'>): Promise<Review> {
    await new Promise(resolve => setTimeout(resolve, 500));

    const newReview: Review = {
      ...reviewData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      helpful: 0
    };

    this.reviews.push(newReview);
    localStorage.setItem('eventify_reviews', JSON.stringify(this.reviews));

    return newReview;
  }

  async getEventReviews(eventId: string): Promise<Review[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return this.reviews
      .filter(review => review.eventId === eventId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async markHelpful(reviewId: string): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 200));

    const reviewIndex = this.reviews.findIndex(review => review.id === reviewId);
    if (reviewIndex === -1) return false;

    this.reviews[reviewIndex].helpful += 1;
    localStorage.setItem('eventify_reviews', JSON.stringify(this.reviews));

    return true;
  }

  async deleteReview(reviewId: string, userId: string): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 300));

    const reviewIndex = this.reviews.findIndex(
      review => review.id === reviewId && review.userId === userId
    );
    
    if (reviewIndex === -1) return false;

    this.reviews.splice(reviewIndex, 1);
    localStorage.setItem('eventify_reviews', JSON.stringify(this.reviews));

    return true;
  }

  async getUserReviews(userId: string): Promise<Review[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return this.reviews
      .filter(review => review.userId === userId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }
}

export const reviewService = new ReviewService();