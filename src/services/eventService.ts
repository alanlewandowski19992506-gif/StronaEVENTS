import { Event, Booking, Review, SearchFilters, EventAnalytics } from '../types';

// Mock data for demonstration
const SAMPLE_EVENTS: Event[] = [
  {
    id: '1',
    title: 'Tech Conference 2025',
    description: 'Join industry leaders for cutting-edge discussions on technology trends, AI, and innovation. Network with professionals and discover the latest developments.',
    date: '2025-03-15',
    time: '09:00',
    location: {
      address: '123 Convention Center Dr',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94103',
      coordinates: { lat: 37.7749, lng: -122.4194 }
    },
    capacity: 500,
    category: 'Technology',
    organizer: {
      id: 'org1',
      name: 'TechEvents Inc',
      email: 'contact@techevents.com',
      avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?w=100&h=100&fit=crop'
    },
    images: [
      'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?w=800&h=400&fit=crop',
      'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?w=800&h=400&fit=crop'
    ],
    ticketTypes: [
      {
        id: 'ticket1',
        name: 'General Admission',
        description: 'Access to all sessions and networking events',
        price: 199,
        quantity: 300,
        sold: 145,
        saleStartDate: '2025-01-01',
        saleEndDate: '2025-03-14',
        features: ['All Sessions', 'Networking Events', 'Lunch Included']
      },
      {
        id: 'ticket2',
        name: 'VIP Pass',
        description: 'Premium access with exclusive perks',
        price: 399,
        quantity: 100,
        sold: 67,
        saleStartDate: '2025-01-01',
        saleEndDate: '2025-03-14',
        features: ['All Sessions', 'VIP Lounge', 'Priority Seating', 'Exclusive Dinner']
      }
    ],
    tags: ['technology', 'networking', 'ai', 'innovation'],
    status: 'published',
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-05T00:00:00Z',
    bookingsCount: 212,
    rating: 4.8,
    reviewCount: 89
  },
  {
    id: '2',
    title: 'Jazz Night at Blue Moon',
    description: 'An intimate evening of smooth jazz featuring talented local musicians. Enjoy craft cocktails and exceptional music in a cozy atmosphere.',
    date: '2025-02-20',
    time: '20:00',
    location: {
      address: '456 Music Ave',
      city: 'New York',
      state: 'NY',
      zipCode: '10001'
    },
    capacity: 80,
    category: 'Music',
    organizer: {
      id: 'org2',
      name: 'Blue Moon Venue',
      email: 'events@bluemoon.com'
    },
    images: [
      'https://images.pexels.com/photos/210922/pexels-photo-210922.jpeg?w=800&h=400&fit=crop'
    ],
    ticketTypes: [
      {
        id: 'ticket3',
        name: 'Standard',
        description: 'General admission seating',
        price: 45,
        quantity: 80,
        sold: 23,
        saleStartDate: '2025-01-15',
        saleEndDate: '2025-02-19',
        features: ['Seating', 'One Drink Included']
      }
    ],
    tags: ['jazz', 'music', 'nightlife'],
    status: 'published',
    createdAt: '2025-01-15T00:00:00Z',
    updatedAt: '2025-01-15T00:00:00Z',
    bookingsCount: 23,
    rating: 4.6,
    reviewCount: 12
  }
];

class EventService {
  private events: Event[] = [];

  constructor() {
    this.initializeData();
  }

  private initializeData() {
    const storedEvents = localStorage.getItem('eventify_events');
    if (storedEvents) {
      this.events = JSON.parse(storedEvents);
    } else {
      this.events = SAMPLE_EVENTS;
      localStorage.setItem('eventify_events', JSON.stringify(this.events));
    }
  }

  async searchEvents(filters: Partial<SearchFilters>): Promise<Event[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));

    let filtered = [...this.events];

    // Apply filters
    if (filters.query) {
      const query = filters.query.toLowerCase();
      filtered = filtered.filter(event => 
        event.title.toLowerCase().includes(query) ||
        event.description.toLowerCase().includes(query) ||
        event.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    if (filters.category) {
      filtered = filtered.filter(event => event.category === filters.category);
    }

    if (filters.location) {
      filtered = filtered.filter(event => 
        event.location.city.toLowerCase().includes(filters.location.toLowerCase()) ||
        event.location.state.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.dateRange) {
      filtered = filtered.filter(event => {
        const eventDate = new Date(event.date);
        const startDate = new Date(filters.dateRange!.start);
        const endDate = new Date(filters.dateRange!.end);
        return eventDate >= startDate && eventDate <= endDate;
      });
    }

    if (filters.priceRange) {
      filtered = filtered.filter(event => {
        const minPrice = Math.min(...event.ticketTypes.map(t => t.price));
        return minPrice >= filters.priceRange!.min && minPrice <= filters.priceRange!.max;
      });
    }

    // Apply sorting
    if (filters.sortBy) {
      filtered.sort((a, b) => {
        let comparison = 0;
        switch (filters.sortBy) {
          case 'date':
            comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
            break;
          case 'price':
            const aPrice = Math.min(...a.ticketTypes.map(t => t.price));
            const bPrice = Math.min(...b.ticketTypes.map(t => t.price));
            comparison = aPrice - bPrice;
            break;
          case 'rating':
            comparison = a.rating - b.rating;
            break;
          case 'popularity':
            comparison = a.bookingsCount - b.bookingsCount;
            break;
        }
        return filters.sortOrder === 'desc' ? -comparison : comparison;
      });
    }

    return filtered;
  }

  async getEventById(id: string): Promise<Event | null> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return this.events.find(event => event.id === id) || null;
  }

  async createEvent(eventData: Omit<Event, 'id' | 'createdAt' | 'updatedAt' | 'bookingsCount' | 'rating' | 'reviewCount'>): Promise<Event> {
    await new Promise(resolve => setTimeout(resolve, 500));

    const newEvent: Event = {
      ...eventData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      bookingsCount: 0,
      rating: 0,
      reviewCount: 0
    };

    this.events.push(newEvent);
    localStorage.setItem('eventify_events', JSON.stringify(this.events));

    return newEvent;
  }

  async updateEvent(id: string, eventData: Partial<Event>): Promise<Event | null> {
    await new Promise(resolve => setTimeout(resolve, 500));

    const eventIndex = this.events.findIndex(event => event.id === id);
    if (eventIndex === -1) return null;

    this.events[eventIndex] = {
      ...this.events[eventIndex],
      ...eventData,
      updatedAt: new Date().toISOString()
    };

    localStorage.setItem('eventify_events', JSON.stringify(this.events));
    return this.events[eventIndex];
  }

  async deleteEvent(id: string): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 300));

    const eventIndex = this.events.findIndex(event => event.id === id);
    if (eventIndex === -1) return false;

    this.events.splice(eventIndex, 1);
    localStorage.setItem('eventify_events', JSON.stringify(this.events));
    return true;
  }

  async getEventsByOrganizer(organizerId: string): Promise<Event[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return this.events.filter(event => event.organizer.id === organizerId);
  }

  async getEventAnalytics(eventId: string): Promise<EventAnalytics | null> {
    await new Promise(resolve => setTimeout(resolve, 400));

    const event = this.events.find(e => e.id === eventId);
    if (!event) return null;

    // Mock analytics data
    return {
      eventId,
      views: Math.floor(Math.random() * 1000) + 100,
      bookings: event.bookingsCount,
      revenue: event.ticketTypes.reduce((sum, ticket) => sum + (ticket.sold * ticket.price), 0),
      conversionRate: Math.round((event.bookingsCount / (Math.floor(Math.random() * 1000) + 100)) * 100),
      dailyStats: Array.from({ length: 7 }, (_, i) => ({
        date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        views: Math.floor(Math.random() * 50) + 10,
        bookings: Math.floor(Math.random() * 10) + 1,
        revenue: Math.floor(Math.random() * 1000) + 100
      })),
      demographicsData: {
        ageGroups: {
          '18-24': 25,
          '25-34': 40,
          '35-44': 20,
          '45-54': 10,
          '55+': 5
        },
        locations: {
          'California': 35,
          'New York': 25,
          'Texas': 15,
          'Florida': 10,
          'Others': 15
        }
      }
    };
  }
}

export const eventService = new EventService();