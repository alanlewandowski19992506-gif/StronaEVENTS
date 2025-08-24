import React, { useState, useEffect } from 'react';
import { Event, EventAnalytics } from '../../types';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { EventCreateForm } from '../events/EventCreateForm';
import { eventService } from '../../services/eventService';
import { 
  Plus, 
  BarChart3, 
  Users, 
  DollarSign, 
  Calendar,
  Edit,
  Trash2,
  Eye
} from 'lucide-react';

export const OrganizerDashboard: React.FC = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);
  const [analytics, setAnalytics] = useState<{[key: string]: EventAnalytics}>({});
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.role === 'organizer') {
      loadOrganizerData();
    }
  }, [user]);

  const loadOrganizerData = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const organizerEvents = await eventService.getEventsByOrganizer(user.id);
      setEvents(organizerEvents);

      // Load analytics for each event
      const analyticsData: {[key: string]: EventAnalytics} = {};
      for (const event of organizerEvents) {
        const eventAnalytics = await eventService.getEventAnalytics(event.id);
        if (eventAnalytics) {
          analyticsData[event.id] = eventAnalytics;
        }
      }
      setAnalytics(analyticsData);
    } catch (error) {
      console.error('Error loading organizer data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEvent = async (eventId: string) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await eventService.deleteEvent(eventId);
        await loadOrganizerData();
      } catch (error) {
        console.error('Error deleting event:', error);
      }
    }
  };

  const totalRevenue = Object.values(analytics).reduce((sum, data) => sum + data.revenue, 0);
  const totalBookings = Object.values(analytics).reduce((sum, data) => sum + data.bookings, 0);
  const totalViews = Object.values(analytics).reduce((sum, data) => sum + data.views, 0);

  if (user?.role !== 'organizer') {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Access Denied
          </h1>
          <p className="text-gray-600">
            This dashboard is only available for event organizers.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Organizer Dashboard
            </h1>
            <p className="text-gray-600">
              Manage your events and track performance
            </p>
          </div>
          <Button onClick={() => setShowCreateForm(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Create Event
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">Total Events</h3>
                <p className="text-2xl font-semibold text-gray-900">{events.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">Total Revenue</h3>
                <p className="text-2xl font-semibold text-gray-900">${totalRevenue.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">Total Bookings</h3>
                <p className="text-2xl font-semibold text-gray-900">{totalBookings}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Eye className="w-6 h-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">Total Views</h3>
                <p className="text-2xl font-semibold text-gray-900">{totalViews}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Events List */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Your Events</h2>
          </div>

          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading events...</p>
            </div>
          ) : events.length === 0 ? (
            <div className="p-8 text-center">
              <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No events yet</h3>
              <p className="text-gray-600 mb-4">
                Start by creating your first event
              </p>
              <Button onClick={() => setShowCreateForm(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Create Event
              </Button>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {events.map((event) => {
                const eventAnalytics = analytics[event.id];
                return (
                  <div key={event.id} className="p-6 hover:bg-gray-50">
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
                            <span>{new Date(event.date).toLocaleDateString()}</span>
                            <span>{event.location.city}, {event.location.state}</span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              event.status === 'published' 
                                ? 'bg-green-100 text-green-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {event.status}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-6">
                        {eventAnalytics && (
                          <div className="text-right">
                            <div className="text-sm text-gray-500">Revenue</div>
                            <div className="text-lg font-semibold text-gray-900">
                              ${eventAnalytics.revenue}
                            </div>
                          </div>
                        )}

                        <div className="text-right">
                          <div className="text-sm text-gray-500">Bookings</div>
                          <div className="text-lg font-semibold text-gray-900">
                            {event.bookingsCount}
                          </div>
                        </div>

                        <div className="flex space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {/* Handle edit */}}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteEvent(event.id)}
                          >
                            <Trash2 className="w-4 h-4 text-red-500" />
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

        {/* Create Event Modal */}
        {showCreateForm && (
          <EventCreateForm
            isOpen={showCreateForm}
            onClose={() => setShowCreateForm(false)}
            onEventCreated={() => {
              setShowCreateForm(false);
              loadOrganizerData();
            }}
          />
        )}
      </div>
    </div>
  );
};