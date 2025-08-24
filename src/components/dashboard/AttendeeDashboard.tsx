import React, { useState, useEffect } from 'react';
import { Booking, Event } from '../../types';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/Button';
import { bookingService } from '../../services/bookingService';
import { eventService } from '../../services/eventService';
import { 
  Calendar, 
  MapPin, 
  CreditCard,
  Download,
  Star,
  Clock
} from 'lucide-react';

export const AttendeeDashboard: React.FC = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [events, setEvents] = useState<{[key: string]: Event}>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadUserData();
    }
  }, [user]);

  const loadUserData = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const userBookings = await bookingService.getUserBookings(user.id);
      setBookings(userBookings);

      // Load event details for each booking
      const eventData: {[key: string]: Event} = {};
      for (const booking of userBookings) {
        if (!eventData[booking.eventId]) {
          const event = await eventService.getEventById(booking.eventId);
          if (event) {
            eventData[booking.eventId] = event;
          }
        }
      }
      setEvents(eventData);
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId: string) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      try {
        await bookingService.cancelBooking(bookingId);
        await loadUserData();
      } catch (error) {
        console.error('Error canceling booking:', error);
      }
    }
  };

  const upcomingBookings = bookings.filter(booking => {
    const event = events[booking.eventId];
    if (!event) return false;
    const eventDate = new Date(event.date);
    return eventDate >= new Date() && booking.status === 'confirmed';
  });

  const pastBookings = bookings.filter(booking => {
    const event = events[booking.eventId];
    if (!event) return false;
    const eventDate = new Date(event.date);
    return eventDate < new Date() && booking.status === 'confirmed';
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            My Dashboard
          </h1>
          <p className="text-gray-600">
            Manage your bookings and discover new events
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">Upcoming Events</h3>
                <p className="text-2xl font-semibold text-gray-900">{upcomingBookings.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CreditCard className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">Total Spent</h3>
                <p className="text-2xl font-semibold text-gray-900">
                  ${bookings.reduce((sum, b) => sum + b.totalAmount, 0)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Star className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">Events Attended</h3>
                <p className="text-2xl font-semibold text-gray-900">{pastBookings.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Upcoming Events</h2>
          </div>

          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading bookings...</p>
            </div>
          ) : upcomingBookings.length === 0 ? (
            <div className="p-8 text-center">
              <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No upcoming events</h3>
              <p className="text-gray-600 mb-4">
                Discover and book events that interest you
              </p>
              <Button onClick={() => window.location.href = '#events'}>
                Browse Events
              </Button>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {upcomingBookings.map((booking) => {
                const event = events[booking.eventId];
                if (!event) return null;

                return (
                  <div key={booking.id} className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <img
                          src={event.images[0] || 'https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?w=100&h=100&fit=crop'}
                          alt={event.title}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {event.title}
                          </h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {new Date(event.date).toLocaleDateString()}
                            </div>
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {event.time}
                            </div>
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />
                              {event.location.city}, {event.location.state}
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 mt-2">
                            <span className="text-sm font-medium text-gray-900">
                              Booking ID: {booking.id}
                            </span>
                            <span className="text-sm font-medium text-gray-900">
                              QR: {booking.qrCode}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="text-lg font-semibold text-gray-900">
                            ${booking.totalAmount}
                          </div>
                          <div className="text-sm text-gray-500">
                            {booking.quantity} ticket{booking.quantity > 1 ? 's' : ''}
                          </div>
                        </div>

                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4 mr-1" />
                            Ticket
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleCancelBooking(booking.id)}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Past Events */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Past Events</h2>
          </div>

          {pastBookings.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No past events yet
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {pastBookings.map((booking) => {
                const event = events[booking.eventId];
                if (!event) return null;

                return (
                  <div key={booking.id} className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <img
                          src={event.images[0] || 'https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?w=100&h=100&fit=crop'}
                          alt={event.title}
                          className="w-16 h-16 rounded-lg object-cover opacity-75"
                        />
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {event.title}
                          </h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                            <span>{new Date(event.date).toLocaleDateString()}</span>
                            <span>{event.location.city}, {event.location.state}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="text-lg font-semibold text-gray-900">
                            ${booking.totalAmount}
                          </div>
                          <div className="text-sm text-gray-500">
                            {booking.quantity} ticket{booking.quantity > 1 ? 's' : ''}
                          </div>
                        </div>

                        <Button variant="outline" size="sm">
                          <Star className="w-4 h-4 mr-1" />
                          Review
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};