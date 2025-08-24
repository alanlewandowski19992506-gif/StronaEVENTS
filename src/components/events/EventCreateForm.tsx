import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Modal } from '../ui/Modal';
import { eventService } from '../../services/eventService';
import { Event, TicketType } from '../../types';

interface EventCreateFormProps {
  isOpen: boolean;
  onClose: () => void;
  onEventCreated: () => void;
}

export const EventCreateForm: React.FC<EventCreateFormProps> = ({
  isOpen,
  onClose,
  onEventCreated
}) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    category: 'Technology',
    capacity: 100,
    location: {
      address: '',
      city: '',
      state: '',
      zipCode: ''
    },
    images: [''],
    tags: ''
  });

  const [ticketTypes, setTicketTypes] = useState<Partial<TicketType>[]>([
    {
      name: 'General Admission',
      description: '',
      price: 0,
      quantity: 100,
      features: []
    }
  ]);

  const categories = [
    'Technology', 'Music', 'Business', 'Art', 'Sports', 'Food', 'Education', 'Health'
  ];

  const handleInputChange = (field: string, value: any) => {
    if (field.startsWith('location.')) {
      const locationField = field.split('.')[1];
      setFormData(prev => ({
        ...prev,
        location: {
          ...prev.location,
          [locationField]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleTicketTypeChange = (index: number, field: string, value: any) => {
    setTicketTypes(prev => prev.map((ticket, i) => 
      i === index ? { ...ticket, [field]: value } : ticket
    ));
  };

  const addTicketType = () => {
    setTicketTypes(prev => [...prev, {
      name: '',
      description: '',
      price: 0,
      quantity: 50,
      features: []
    }]);
  };

  const removeTicketType = (index: number) => {
    setTicketTypes(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      const eventData = {
        ...formData,
        organizer: {
          id: user.id,
          name: user.name,
          email: user.email,
          avatar: user.avatar
        },
        ticketTypes: ticketTypes.map((ticket, index) => ({
          ...ticket,
          id: `ticket_${Date.now()}_${index}`,
          sold: 0,
          saleStartDate: new Date().toISOString().split('T')[0],
          saleEndDate: formData.date,
          features: ticket.features || []
        })) as TicketType[],
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
        status: 'published' as const
      };

      await eventService.createEvent(eventData);
      onEventCreated();
    } catch (error) {
      console.error('Error creating event:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create New Event"
      size="xl"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Event Details</h3>
          
          <Input
            label="Event Title"
            type="text"
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            required
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Date"
              type="date"
              value={formData.date}
              onChange={(e) => handleInputChange('date', e.target.value)}
              required
            />
            <Input
              label="Time"
              type="time"
              value={formData.time}
              onChange={(e) => handleInputChange('time', e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <Input
              label="Capacity"
              type="number"
              min="1"
              value={formData.capacity}
              onChange={(e) => handleInputChange('capacity', parseInt(e.target.value))}
              required
            />
          </div>
        </div>

        {/* Location */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Location</h3>
          
          <Input
            label="Address"
            type="text"
            value={formData.location.address}
            onChange={(e) => handleInputChange('location.address', e.target.value)}
            required
          />

          <div className="grid grid-cols-3 gap-4">
            <Input
              label="City"
              type="text"
              value={formData.location.city}
              onChange={(e) => handleInputChange('location.city', e.target.value)}
              required
            />
            <Input
              label="State"
              type="text"
              value={formData.location.state}
              onChange={(e) => handleInputChange('location.state', e.target.value)}
              required
            />
            <Input
              label="ZIP Code"
              type="text"
              value={formData.location.zipCode}
              onChange={(e) => handleInputChange('location.zipCode', e.target.value)}
              required
            />
          </div>
        </div>

        {/* Ticket Types */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">Ticket Types</h3>
            <Button type="button" variant="outline" onClick={addTicketType}>
              Add Ticket Type
            </Button>
          </div>

          {ticketTypes.map((ticket, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-medium text-gray-900">Ticket Type {index + 1}</h4>
                {ticketTypes.length > 1 && (
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="sm"
                    onClick={() => removeTicketType(index)}
                  >
                    Remove
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <Input
                  label="Name"
                  type="text"
                  value={ticket.name}
                  onChange={(e) => handleTicketTypeChange(index, 'name', e.target.value)}
                  required
                />
                <Input
                  label="Price ($)"
                  type="number"
                  min="0"
                  step="0.01"
                  value={ticket.price}
                  onChange={(e) => handleTicketTypeChange(index, 'price', parseFloat(e.target.value) || 0)}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Quantity"
                  type="number"
                  min="1"
                  value={ticket.quantity}
                  onChange={(e) => handleTicketTypeChange(index, 'quantity', parseInt(e.target.value) || 0)}
                  required
                />
                <Input
                  label="Description"
                  type="text"
                  value={ticket.description}
                  onChange={(e) => handleTicketTypeChange(index, 'description', e.target.value)}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Additional Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Additional Information</h3>
          
          <Input
            label="Event Image URL"
            type="url"
            value={formData.images[0]}
            onChange={(e) => handleInputChange('images', [e.target.value])}
            helperText="Provide a URL to an image for your event"
          />

          <Input
            label="Tags"
            type="text"
            value={formData.tags}
            onChange={(e) => handleInputChange('tags', e.target.value)}
            helperText="Separate tags with commas (e.g., networking, tech, innovation)"
          />
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" loading={loading}>
            Create Event
          </Button>
        </div>
      </form>
    </Modal>
  );
};