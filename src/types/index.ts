// Core type definitions for the event management platform

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'organizer' | 'attendee';
  avatar?: string;
  createdAt: string;
  preferences?: {
    categories: string[];
    location: string;
  };
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
    coordinates?: { lat: number; lng: number; };
  };
  capacity: number;
  category: string;
  organizer: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  };
  images: string[];
  ticketTypes: TicketType[];
  tags: string[];
  status: 'draft' | 'published' | 'cancelled' | 'completed';
  createdAt: string;
  updatedAt: string;
  bookingsCount: number;
  rating: number;
  reviewCount: number;
}

export interface TicketType {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  sold: number;
  saleStartDate: string;
  saleEndDate: string;
  features: string[];
}

export interface Booking {
  id: string;
  eventId: string;
  userId: string;
  ticketTypeId: string;
  quantity: number;
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'refunded';
  paymentId: string;
  qrCode: string;
  bookedAt: string;
  attendeeInfo: {
    name: string;
    email: string;
    phone?: string;
  };
}

export interface Review {
  id: string;
  eventId: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: string;
  helpful: number;
  userName: string;
  userAvatar?: string;
}

export interface Payment {
  id: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  method: 'card' | 'paypal' | 'bank_transfer';
  createdAt: string;
}

export interface SearchFilters {
  query: string;
  category: string;
  location: string;
  dateRange: {
    start: string;
    end: string;
  };
  priceRange: {
    min: number;
    max: number;
  };
  sortBy: 'date' | 'price' | 'rating' | 'popularity';
  sortOrder: 'asc' | 'desc';
}

export interface EventAnalytics {
  eventId: string;
  views: number;
  bookings: number;
  revenue: number;
  conversionRate: number;
  dailyStats: Array<{
    date: string;
    views: number;
    bookings: number;
    revenue: number;
  }>;
  demographicsData: {
    ageGroups: Record<string, number>;
    locations: Record<string, number>;
  };
}