import React, { useState, useEffect } from 'react';
import { Event, Review } from '../../types';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { BookingForm } from '../booking/BookingForm';
import { ReviewSection } from '../reviews/ReviewSection';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Star, 
  Share2, 
  Heart,
  Clock,
  Tag,
  User
} from 'lucide-react';
import { reviewService } from '../../services/reviewService';

interface EventDetailProps {
  event: Event;
  isOpen: boolean;
  onClose: () => void;
}

export const EventDetail: React.FC<EventDetailProps> = ({ event, isOpen, onClose }) => {
  const { user } = useAuth();
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isFavorited, setIsFavorited] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen && event) {
      loadReviews();
      // Check if event is favorited (mock implementation)
      const favorites = JSON.parse(localStorage.getItem('eventify_favorites') || '[]');
      setIsFavorited(favorites.includes(event.id));
    }
  }, [isOpen, event]);

  const loadReviews = async () => {
    try {
      setLoading(true);
      const eventReviews = await reviewService.getEventReviews(event.id);
      setReviews(eventReviews);
    } catch (error) {
      console.error('Error loading reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFavoriteToggle = () => {
    const favorites = JSON.parse(localStorage.getItem('eventify_favorites') || '[]');
    if (isFavorited) {
      const updated = favorites.filter((id: string) => id !== event.id);
      localStorage.setItem('eventify_favorites', JSON.stringify(updated));
      setIsFavorited(false);
    } else {
      favorites.push(event.id);
      localStorage.setItem('eventify_favorites', JSON.stringify(favorites));
      setIsFavorited(true);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: event.title,
          text: event.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      // You could show a toast notification here
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeStr: string) => {
    return new Date(`2000-01-01T${timeStr}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const availableTickets = event.ticketTypes.reduce((sum, t) => sum + (t.quantity - t.sold), 0);
  const minPrice = Math.min(...event.ticketTypes.map(t => t.price));

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} title="" size="xl">
        <div className="max-h-[80vh] overflow-y-auto">
          {/* Event Image */}
          <div className="relative h-64 md:h-80 mb-6 rounded-lg overflow-hidden">
            <img
              src={event.images[0] || 'https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?w=800&h=400&fit=crop'}
              alt={event.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 flex space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleFavoriteToggle}
                className="bg-white bg-opacity-90 backdrop-blur-sm hover:bg-opacity-100"
              >
                <Heart className={`w-4 h-4 ${isFavorited ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleShare}
                className="bg-white bg-opacity-90 backdrop-blur-sm hover:bg-opacity-100"
              >
                <Share2 className="w-4 h-4 text-gray-600" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="space-y-6">
                {/* Header */}
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded">
                      {event.category}
                    </span>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 mr-1" />
                      <span className="text-sm font-medium text-gray-700">
                        {event.rating.toFixed(1)} ({event.reviewCount} reviews)
                      </span>
                    </div>
                  </div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-4">
                    {event.title}
                  </h1>
                </div>

                {/* Event Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-5 h-5 mr-3 text-blue-600" />
                    <div>
                      <div className="font-medium">{formatDate(event.date)}</div>
                      <div className="text-sm">{formatTime(event.time)}</div>
                    </div>
                  </div>

                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-5 h-5 mr-3 text-blue-600" />
                    <div>
                      <div className="font-medium">{event.location.address}</div>
                      <div className="text-sm">{event.location.city}, {event.location.state}</div>
                    </div>
                  </div>

                  <div className="flex items-center text-gray-600">
                    <Users className="w-5 h-5 mr-3 text-blue-600" />
                    <div>
                      <div className="font-medium">{availableTickets} spots available</div>
                      <div className="text-sm">of {event.capacity} total capacity</div>
                    </div>
                  </div>

                  <div className="flex items-center text-gray-600">
                    <User className="w-5 h-5 mr-3 text-blue-600" />
                    <div>
                      <div className="font-medium">{event.organizer.name}</div>
                      <div className="text-sm">{event.organizer.email}</div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">About this event</h2>
                  <p className="text-gray-700 leading-relaxed">{event.description}</p>
                </div>

                {/* Tags */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {event.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                      >
                        <Tag className="w-3 h-3 mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Reviews Section */}
                <ReviewSection 
                  eventId={event.id} 
                  reviews={reviews}
                  onReviewAdded={loadReviews}
                />
              </div>
            </div>

            {/* Booking Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-lg p-6 sticky top-4">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-gray-900">
                    {minPrice === 0 ? 'Free' : `$${minPrice}`}
                  </div>
                  <div className="text-gray-600">Starting from</div>
                </div>

                {/* Ticket Types */}
                <div className="space-y-3 mb-6">
                  <h3 className="font-semibold text-gray-900">Available Tickets</h3>
                  {event.ticketTypes.map((ticket) => (
                    <div key={ticket.id} className="bg-white rounded-lg p-3 border border-gray-200">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-gray-900">{ticket.name}</h4>
                          <p className="text-sm text-gray-600 mb-2">{ticket.description}</p>
                          <div className="text-sm text-gray-500">
                            {ticket.quantity - ticket.sold} available
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-gray-900">
                            ${ticket.price}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {user ? (
                  <Button
                    onClick={() => setShowBookingForm(true)}
                    className="w-full"
                    disabled={availableTickets === 0}
                  >
                    {availableTickets === 0 ? 'Sold Out' : 'Book Now'}
                  </Button>
                ) : (
                  <div className="text-center">
                    <p className="text-gray-600 text-sm mb-3">
                      Please sign in to book tickets
                    </p>
                    <Button className="w-full" disabled>
                      Sign In to Book
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {/* Booking Form Modal */}
      {showBookingForm && user && (
        <BookingForm
          isOpen={showBookingForm}
          onClose={() => setShowBookingForm(false)}
          event={event}
          onBookingComplete={() => {
            setShowBookingForm(false);
            // Could refresh event data here
          }}
        />
      )}
    </>
  );
};