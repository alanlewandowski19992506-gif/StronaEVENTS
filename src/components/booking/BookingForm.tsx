import React, { useState } from 'react';
import { Event, Booking } from '../../types';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Modal } from '../ui/Modal';
import { bookingService } from '../../services/bookingService';
import { CreditCard, User, Mail, Phone } from 'lucide-react';

interface BookingFormProps {
  isOpen: boolean;
  onClose: () => void;
  event: Event;
  onBookingComplete: () => void;
}

export const BookingForm: React.FC<BookingFormProps> = ({
  isOpen,
  onClose,
  event,
  onBookingComplete
}) => {
  const { user } = useAuth();
  const [step, setStep] = useState<'select' | 'details' | 'payment' | 'confirmation'>('select');
  const [selectedTickets, setSelectedTickets] = useState<{[key: string]: number}>({});
  const [attendeeInfo, setAttendeeInfo] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: ''
  });
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal'>('card');
  const [loading, setLoading] = useState(false);
  const [booking, setBooking] = useState<Booking | null>(null);

  const totalQuantity = Object.values(selectedTickets).reduce((sum, qty) => sum + qty, 0);
  const totalAmount = Object.entries(selectedTickets).reduce((sum, [ticketId, qty]) => {
    const ticket = event.ticketTypes.find(t => t.id === ticketId);
    return sum + (ticket ? ticket.price * qty : 0);
  }, 0);

  const handleTicketQuantityChange = (ticketId: string, quantity: number) => {
    setSelectedTickets(prev => ({
      ...prev,
      [ticketId]: Math.max(0, quantity)
    }));
  };

  const handleAttendeeInfoChange = (field: string, value: string) => {
    setAttendeeInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step === 'select' && totalQuantity > 0) {
      setStep('details');
    } else if (step === 'details') {
      setStep('payment');
    }
  };

  const handleBack = () => {
    if (step === 'payment') setStep('details');
    else if (step === 'details') setStep('select');
  };

  const handlePayment = async () => {
    setLoading(true);
    
    try {
      // Process payment first
      const payment = await bookingService.processPayment(totalAmount, paymentMethod);
      
      if (payment.status === 'completed') {
        // Create booking for each ticket type
        const firstTicketType = Object.keys(selectedTickets)[0];
        const bookingData = {
          eventId: event.id,
          userId: user!.id,
          ticketTypeId: firstTicketType,
          quantity: totalQuantity,
          totalAmount,
          attendeeInfo
        };

        const result = await bookingService.createBooking(bookingData);
        setBooking(result.booking);
        setStep('confirmation');
      } else {
        alert('Payment failed. Please try again.');
      }
    } catch (error) {
      console.error('Booking error:', error);
      alert('Booking failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = () => {
    onBookingComplete();
    onClose();
    // Reset state
    setStep('select');
    setSelectedTickets({});
    setBooking(null);
  };

  const renderTicketSelection = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Tickets</h3>
      
      {event.ticketTypes.map((ticket) => (
        <div key={ticket.id} className="border border-gray-200 rounded-lg p-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h4 className="font-medium text-gray-900">{ticket.name}</h4>
              <p className="text-sm text-gray-600">{ticket.description}</p>
              <div className="text-sm text-gray-500 mt-1">
                {ticket.quantity - ticket.sold} available
              </div>
            </div>
            <div className="text-right">
              <div className="font-semibold text-gray-900 mb-2">
                ${ticket.price}
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleTicketQuantityChange(ticket.id, (selectedTickets[ticket.id] || 0) - 1)}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                  disabled={(selectedTickets[ticket.id] || 0) === 0}
                >
                  -
                </button>
                <span className="w-8 text-center font-medium">
                  {selectedTickets[ticket.id] || 0}
                </span>
                <button
                  onClick={() => handleTicketQuantityChange(ticket.id, (selectedTickets[ticket.id] || 0) + 1)}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                  disabled={(selectedTickets[ticket.id] || 0) >= (ticket.quantity - ticket.sold)}
                >
                  +
                </button>
              </div>
            </div>
          </div>
          {ticket.features.length > 0 && (
            <div className="mt-2">
              <div className="text-sm text-gray-600">Includes:</div>
              <ul className="text-sm text-gray-500 list-disc list-inside">
                {ticket.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}

      {totalQuantity > 0 && (
        <div className="bg-gray-50 rounded-lg p-4 mt-6">
          <div className="flex justify-between items-center">
            <span className="font-medium">Total</span>
            <span className="text-xl font-bold">${totalAmount}</span>
          </div>
          <div className="text-sm text-gray-600">
            {totalQuantity} ticket{totalQuantity > 1 ? 's' : ''}
          </div>
        </div>
      )}
    </div>
  );

  const renderAttendeeDetails = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Attendee Information</h3>
      
      <div className="relative">
        <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
        <Input
          label="Full Name"
          type="text"
          value={attendeeInfo.name}
          onChange={(e) => handleAttendeeInfoChange('name', e.target.value)}
          className="pl-10"
          required
        />
      </div>

      <div className="relative">
        <Mail className="absolute left-3 top-8 w-5 h-5 text-gray-400" />
        <Input
          label="Email"
          type="email"
          value={attendeeInfo.email}
          onChange={(e) => handleAttendeeInfoChange('email', e.target.value)}
          className="pl-10"
          required
        />
      </div>

      <div className="relative">
        <Phone className="absolute left-3 top-8 w-5 h-5 text-gray-400" />
        <Input
          label="Phone Number"
          type="tel"
          value={attendeeInfo.phone}
          onChange={(e) => handleAttendeeInfoChange('phone', e.target.value)}
          className="pl-10"
          helperText="Optional - for booking updates"
        />
      </div>
    </div>
  );

  const renderPayment = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h3>
      
      <div className="space-y-3">
        <div className="flex items-center space-x-3">
          <input
            type="radio"
            id="card"
            name="payment"
            value="card"
            checked={paymentMethod === 'card'}
            onChange={(e) => setPaymentMethod(e.target.value as 'card')}
            className="w-4 h-4 text-blue-600"
          />
          <label htmlFor="card" className="flex items-center space-x-2 cursor-pointer">
            <CreditCard className="w-5 h-5 text-gray-600" />
            <span>Credit Card</span>
          </label>
        </div>
        
        <div className="flex items-center space-x-3">
          <input
            type="radio"
            id="paypal"
            name="payment"
            value="paypal"
            checked={paymentMethod === 'paypal'}
            onChange={(e) => setPaymentMethod(e.target.value as 'paypal')}
            className="w-4 h-4 text-blue-600"
          />
          <label htmlFor="paypal" className="cursor-pointer">PayPal</label>
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
        <p className="text-sm text-yellow-800">
          This is a demo. No actual payment will be processed.
        </p>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 mt-6">
        <h4 className="font-medium text-gray-900 mb-2">Order Summary</h4>
        <div className="space-y-2">
          {Object.entries(selectedTickets).map(([ticketId, quantity]) => {
            if (quantity === 0) return null;
            const ticket = event.ticketTypes.find(t => t.id === ticketId);
            if (!ticket) return null;
            
            return (
              <div key={ticketId} className="flex justify-between text-sm">
                <span>{ticket.name} × {quantity}</span>
                <span>${ticket.price * quantity}</span>
              </div>
            );
          })}
          <div className="border-t border-gray-200 pt-2 flex justify-between font-semibold">
            <span>Total</span>
            <span>${totalAmount}</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderConfirmation = () => (
    <div className="text-center space-y-4">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      
      <h3 className="text-xl font-semibold text-gray-900">Booking Confirmed!</h3>
      
      <p className="text-gray-600">
        Your booking has been successfully confirmed. You will receive an email with your ticket details.
      </p>

      {booking && (
        <div className="bg-gray-50 rounded-lg p-4 mt-6">
          <h4 className="font-medium text-gray-900 mb-2">Booking Details</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Booking ID:</span>
              <span className="font-mono">{booking.id}</span>
            </div>
            <div className="flex justify-between">
              <span>QR Code:</span>
              <span className="font-mono">{booking.qrCode}</span>
            </div>
            <div className="flex justify-between">
              <span>Total Amount:</span>
              <span>${booking.totalAmount}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={step === 'confirmation' ? '' : 'Book Tickets'}
      size="lg"
    >
      <div className="min-h-[400px]">
        {step === 'select' && renderTicketSelection()}
        {step === 'details' && renderAttendeeDetails()}
        {step === 'payment' && renderPayment()}
        {step === 'confirmation' && renderConfirmation()}

        {step !== 'confirmation' && (
          <div className="flex justify-between mt-8 pt-6 border-t">
            <Button
              variant="ghost"
              onClick={step === 'select' ? onClose : handleBack}
            >
              {step === 'select' ? 'Cancel' : 'Back'}
            </Button>
            
            {step === 'select' && (
              <Button onClick={handleNext} disabled={totalQuantity === 0}>
                Continue
              </Button>
            )}
            
            {step === 'details' && (
              <Button 
                onClick={handleNext}
                disabled={!attendeeInfo.name || !attendeeInfo.email}
              >
                Continue to Payment
              </Button>
            )}
            
            {step === 'payment' && (
              <Button onClick={handlePayment} loading={loading}>
                Complete Booking
              </Button>
            )}
          </div>
        )}

        {step === 'confirmation' && (
          <div className="flex justify-center mt-8 pt-6 border-t">
            <Button onClick={handleComplete}>
              Done
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
};