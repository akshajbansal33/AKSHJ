import { useState, useMemo } from 'react';

/* 
  Custom React Hook: useCarFilter
  Demonstrates:
  1. Custom Hooks (Lec 41-42): Bundling stateful logic for reusability.
  2. useMemo (Lec 36-40): Memoizing computed values to avoid unnecessary re-calculations on every render.
  3. Array Methods: Chaining .filter() and .map() with string operations (.toLowerCase(), .includes()).
*/
export function useCarFilter(initialCars) {
  // 1. Search Query state (text search input)
  const [searchQuery, setSearchQuery] = useState('');

  // 2. Active Tab state ('new' or 'used')
  const [activeTab, setActiveTab] = useState('new');

  // 3. Search Mode ('budget' or 'brand')
  const [searchMode, setSearchMode] = useState('budget');

  // 4. Dropdown filters state
  const [filters, setFilters] = useState({
    brand: '',
    budget: '',
    bodyType: '',
    fuel: '',
    transmission: ''
  });

  // Handler to update a single key in the filters object
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  // Reset all search parameters and filters to default
  const resetFilters = () => {
    setSearchQuery('');
    setSearchMode('budget');
    setFilters({
      brand: '',
      budget: '',
      bodyType: '',
      fuel: '',
      transmission: ''
    });
  };

  /* 
    Memoized filtered cars array
    Recalculates only when initialCars, searchQuery, activeTab, or filters change.
  */
  const filteredCars = useMemo(() => {
    return initialCars.filter((car) => {
      // A. Filter by Tab (New vs Used)
      const matchesTab = activeTab === 'new' ? !car.isUsed : car.isUsed;
      if (!matchesTab) return false;

      // B. Filter by Search Query (Name/Brand)
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesName = car.name.toLowerCase().includes(query);
        const matchesBrand = car.brand.toLowerCase().includes(query);
        if (!matchesName && !matchesBrand) return false;
      }

      // C. Filter by Brand Dropdown
      if (filters.brand && car.brand !== filters.brand) {
        return false;
      }

      // D. Filter by Body Type Dropdown
      if (filters.bodyType && car.bodyType !== filters.bodyType) {
        return false;
      }

      // E. Filter by Fuel Type
      if (filters.fuel && car.fuel !== filters.fuel) {
        return false;
      }

      // F. Filter by Transmission
      if (filters.transmission && car.transmission !== filters.transmission) {
        return false;
      }

      // G. Filter by Budget Range
      if (filters.budget) {
        if (filters.budget === '500000') {
          if (car.price > 500000) return false;
        } else if (filters.budget === '1000000') {
          if (car.price <= 500000 || car.price > 1000000) return false;
        } else if (filters.budget === '1500000') {
          if (car.price <= 1000000 || car.price > 1500000) return false;
        } else if (filters.budget === '2000000') {
          if (car.price <= 1500000 || car.price > 2000000) return false;
        } else if (filters.budget === '3000000') {
          if (car.price <= 2000000 || car.price > 3000000) return false;
        } else if (filters.budget === 'luxury') {
          if (car.price <= 3000000) return false;
        }
      }

      return true; // Car matches all criteria
    });
  }, [initialCars, searchQuery, activeTab, filters]);

  return {
    searchQuery,
    setSearchQuery,
    activeTab,
    setActiveTab,
    filters,
    setFilters,
    handleFilterChange,
    resetFilters,
    filteredCars,
    searchMode,
    setSearchMode
  };
}
