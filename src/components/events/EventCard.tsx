import React from 'react';
import { Event } from '../../types';
import { Calendar, MapPin, Users, Star, DollarSign } from 'lucide-react';

interface EventCardProps {
  event: Event;
  onClick: (event: Event) => void;
}

export const EventCard: React.FC<EventCardProps> = ({ event, onClick }) => {
  const minPrice = Math.min(...event.ticketTypes.map(t => t.price));
  const availableTickets = event.ticketTypes.reduce((sum, t) => sum + (t.quantity - t.sold), 0);
  
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
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

  return (
    <div
      onClick={() => onClick(event)}
      className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-100 hover:border-blue-200 group"
    >
      <div className="relative overflow-hidden rounded-t-xl">
        <img
          src={event.images[0] || 'https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?w=400&h=200&fit=crop'}
          alt={event.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3 bg-white bg-opacity-90 backdrop-blur-sm px-2 py-1 rounded-lg">
          <div className="text-xs font-semibold text-blue-600">{formatDate(event.date)}</div>
          <div className="text-xs text-gray-600">{formatTime(event.time)}</div>
        </div>
        <div className="absolute top-3 right-3 bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium">
          {event.category}
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {event.title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {event.description}
        </p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="w-4 h-4 mr-2 text-gray-400" />
            {event.location.city}, {event.location.state}
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <Users className="w-4 h-4 mr-2 text-gray-400" />
            {availableTickets} spots available
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 mr-1" />
            <span className="text-sm font-medium text-gray-700">
              {event.rating.toFixed(1)}
            </span>
            <span className="text-sm text-gray-500 ml-1">
              ({event.reviewCount})
            </span>
          </div>
          
          <div className="flex items-center">
            <DollarSign className="w-4 h-4 text-green-600 mr-1" />
            <span className="font-semibold text-gray-900">
              {minPrice === 0 ? 'Free' : `$${minPrice}`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};