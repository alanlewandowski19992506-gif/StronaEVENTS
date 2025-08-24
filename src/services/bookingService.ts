import { Booking, Payment } from '../types';

class BookingService {
  private bookings: Booking[] = [];
  private payments: Payment[] = [];

  constructor() {
    this.initializeData();
  }

  private initializeData() {
    const storedBookings = localStorage.getItem('eventify_bookings');
    const storedPayments = localStorage.getItem('eventify_payments');
    
    if (storedBookings) {
      this.bookings = JSON.parse(storedBookings);
    }
    
    if (storedPayments) {
      this.payments = JSON.parse(storedPayments);
    }
  }

  async createBooking(bookingData: Omit<Booking, 'id' | 'bookedAt' | 'qrCode' | 'paymentId' | 'status'>): Promise<{ booking: Booking; payment: Payment }> {
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Create payment first
    const payment: Payment = {
      id: `pay_${Date.now()}`,
      amount: bookingData.totalAmount,
      currency: 'USD',
      status: 'completed', // Simulate successful payment
      method: 'card',
      createdAt: new Date().toISOString()
    };

    const booking: Booking = {
      ...bookingData,
      id: `booking_${Date.now()}`,
      bookedAt: new Date().toISOString(),
      qrCode: this.generateQRCode(),
      paymentId: payment.id,
      status: 'confirmed'
    };

    this.bookings.push(booking);
    this.payments.push(payment);

    localStorage.setItem('eventify_bookings', JSON.stringify(this.bookings));
    localStorage.setItem('eventify_payments', JSON.stringify(this.payments));

    return { booking, payment };
  }

  async getUserBookings(userId: string): Promise<Booking[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return this.bookings.filter(booking => booking.userId === userId);
  }

  async getEventBookings(eventId: string): Promise<Booking[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return this.bookings.filter(booking => booking.eventId === eventId);
  }

  async getBookingById(id: string): Promise<Booking | null> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return this.bookings.find(booking => booking.id === id) || null;
  }

  async cancelBooking(id: string): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 500));

    const bookingIndex = this.bookings.findIndex(booking => booking.id === id);
    if (bookingIndex === -1) return false;

    this.bookings[bookingIndex].status = 'cancelled';
    
    // Create refund payment record
    const originalPayment = this.payments.find(p => p.id === this.bookings[bookingIndex].paymentId);
    if (originalPayment) {
      const refundPayment: Payment = {
        id: `refund_${Date.now()}`,
        amount: -originalPayment.amount,
        currency: originalPayment.currency,
        status: 'completed',
        method: originalPayment.method,
        createdAt: new Date().toISOString()
      };
      this.payments.push(refundPayment);
    }

    localStorage.setItem('eventify_bookings', JSON.stringify(this.bookings));
    localStorage.setItem('eventify_payments', JSON.stringify(this.payments));
    
    return true;
  }

  async processPayment(amount: number, paymentMethod: 'card' | 'paypal'): Promise<Payment> {
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    const payment: Payment = {
      id: `pay_${Date.now()}`,
      amount,
      currency: 'USD',
      status: Math.random() > 0.1 ? 'completed' : 'failed', // 90% success rate
      method: paymentMethod,
      createdAt: new Date().toISOString()
    };

    this.payments.push(payment);
    localStorage.setItem('eventify_payments', JSON.stringify(this.payments));

    return payment;
  }

  private generateQRCode(): string {
    // Generate a simple QR code string (in a real app, this would be a proper QR code)
    return `QR_${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  }

  async validateTicket(qrCode: string): Promise<{ valid: boolean; booking?: Booking }> {
    await new Promise(resolve => setTimeout(resolve, 500));

    const booking = this.bookings.find(b => b.qrCode === qrCode && b.status === 'confirmed');
    return {
      valid: !!booking,
      booking: booking
    };
  }
}

export const bookingService = new BookingService();