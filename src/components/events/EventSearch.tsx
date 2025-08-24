import React, { useState } from 'react';
import { SearchFilters } from '../../types';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Search, Filter, Calendar, MapPin, DollarSign } from 'lucide-react';

interface EventSearchProps {
  onSearch: (filters: Partial<SearchFilters>) => void;
  loading?: boolean;
}

export const EventSearch: React.FC<EventSearchProps> = ({ onSearch, loading }) => {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<Partial<SearchFilters>>({
    query: '',
    category: '',
    location: '',
    dateRange: { start: '', end: '' },
    priceRange: { min: 0, max: 1000 },
    sortBy: 'date',
    sortOrder: 'asc'
  });

  const categories = [
    'Technology', 'Music', 'Business', 'Art', 'Sports', 'Food', 'Education', 'Health'
  ];

  const handleInputChange = (field: string, value: any) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleDateRangeChange = (field: 'start' | 'end', value: string) => {
    setFilters(prev => ({
      ...prev,
      dateRange: { ...prev.dateRange, [field]: value }
    }));
  };

  const handlePriceRangeChange = (field: 'min' | 'max', value: number) => {
    setFilters(prev => ({
      ...prev,
      priceRange: { ...prev.priceRange, [field]: value }
    }));
  };

  const handleSearch = () => {
    onSearch(filters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      query: '',
      category: '',
      location: '',
      dateRange: { start: '', end: '' },
      priceRange: { min: 0, max: 1000 },
      sortBy: 'date' as const,
      sortOrder: 'asc' as const
    };
    setFilters(clearedFilters);
    onSearch(clearedFilters);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex flex-col lg:flex-row gap-4 items-end">
        {/* Search Input */}
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search events..."
              value={filters.query}
              onChange={(e) => handleInputChange('query', e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Filter Toggle */}
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center"
        >
          <Filter className="w-4 h-4 mr-2" />
          Filters
        </Button>

        {/* Search Button */}
        <Button onClick={handleSearch} loading={loading}>
          Search
        </Button>
      </div>

      {/* Advanced Filters */}
      {showFilters && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                value={filters.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Location Filter */}
            <div>
              <div className="relative">
                <MapPin className="absolute left-3 top-8 w-4 h-4 text-gray-400" />
                <Input
                  label="Location"
                  type="text"
                  placeholder="City or state"
                  value={filters.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            {/* Date Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date From
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-2 w-4 h-4 text-gray-400" />
                <input
                  type="date"
                  value={filters.dateRange?.start || ''}
                  onChange={(e) => handleDateRangeChange('start', e.target.value)}
                  className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date To
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-2 w-4 h-4 text-gray-400" />
                <input
                  type="date"
                  value={filters.dateRange?.end || ''}
                  onChange={(e) => handleDateRangeChange('end', e.target.value)}
                  className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Min Price ($)
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-2 w-4 h-4 text-gray-400" />
                <input
                  type="number"
                  min="0"
                  value={filters.priceRange?.min || ''}
                  onChange={(e) => handlePriceRangeChange('min', parseInt(e.target.value) || 0)}
                  className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Max Price ($)
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-2 w-4 h-4 text-gray-400" />
                <input
                  type="number"
                  min="0"
                  value={filters.priceRange?.max || ''}
                  onChange={(e) => handlePriceRangeChange('max', parseInt(e.target.value) || 1000)}
                  className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Sort By */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sort By
              </label>
              <select
                value={filters.sortBy}
                onChange={(e) => handleInputChange('sortBy', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="date">Date</option>
                <option value="price">Price</option>
                <option value="rating">Rating</option>
                <option value="popularity">Popularity</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sort Order
              </label>
              <select
                value={filters.sortOrder}
                onChange={(e) => handleInputChange('sortOrder', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <Button variant="ghost" onClick={clearFilters} className="mr-2">
              Clear All
            </Button>
            <Button onClick={handleSearch} loading={loading}>
              Apply Filters
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};