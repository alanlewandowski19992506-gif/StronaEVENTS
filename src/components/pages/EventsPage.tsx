import React, { useState, useEffect } from 'react';
import { Event, SearchFilters } from '../../types';
import { EventCard } from '../events/EventCard';
import { EventDetail } from '../events/EventDetail';
import { EventSearch } from '../events/EventSearch';
import { eventService } from '../../services/eventService';
import { Grid, List } from 'lucide-react';

export const EventsPage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async (filters?: Partial<SearchFilters>) => {
    try {
      setLoading(true);
      const results = await eventService.searchEvents(filters || {});
      setEvents(results);
    } catch (error) {
      console.error('Error loading events:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (filters: Partial<SearchFilters>) => {
    loadEvents(filters);
  };

  const renderGridView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          onClick={setSelectedEvent}
        />
      ))}
    </div>
  );

  const renderListView = () => (
    <div className="space-y-4">
      {events.map((event) => (
        <div
          key={event.id}
          onClick={() => setSelectedEvent(event)}
          className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow cursor-pointer border border-gray-200 hover:border-blue-200"
        >
          <div className="p-6 md:flex md:items-center md:space-x-6">
            <div className="md:w-48 md:h-32 mb-4 md:mb-0 overflow-hidden rounded-lg">
              <img
                src={event.images[0] || 'https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?w=300&h=200&fit=crop'}
                alt={event.title}
                className="w-full h-32 md:h-full object-cover"
              />
            </div>
            
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 md:mb-0">
                  {event.title}
                </h3>
                <div className="flex items-center text-lg font-semibold text-green-600">
                  ${Math.min(...event.ticketTypes.map(t => t.price))}
                </div>
              </div>
              
              <p className="text-gray-600 mb-3 line-clamp-2">
                {event.description}
              </p>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                <span>{new Date(event.date).toLocaleDateString()}</span>
                <span>{event.location.city}, {event.location.state}</span>
                <span className="flex items-center">
                  ⭐ {event.rating.toFixed(1)} ({event.reviewCount} reviews)
                </span>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                  {event.category}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Discover Events
          </h1>
          <p className="text-gray-600">
            Find amazing events happening near you and around the world
          </p>
        </div>

        {/* Search Section */}
        <div className="mb-8">
          <EventSearch onSearch={handleSearch} loading={loading} />
        </div>

        {/* Results Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              {loading ? 'Loading...' : `${events.length} Events Found`}
            </h2>
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg ${
                viewMode === 'grid'
                  ? 'bg-blue-100 text-blue-600'
                  : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg ${
                viewMode === 'list'
                  ? 'bg-blue-100 text-blue-600'
                  : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Events Grid/List */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-xl h-80 animate-pulse"></div>
            ))}
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No events found
            </h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search criteria or browse all events
            </p>
          </div>
        ) : (
          <div>
            {viewMode === 'grid' ? renderGridView() : renderListView()}
          </div>
        )}

        {/* Event Detail Modal */}
        {selectedEvent && (
          <EventDetail
            event={selectedEvent}
            isOpen={!!selectedEvent}
            onClose={() => setSelectedEvent(null)}
          />
        )}
      </div>
    </div>
  );
};