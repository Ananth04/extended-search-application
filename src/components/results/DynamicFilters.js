import React, { useState, useEffect } from 'react';

function DynamicFilters({ onFilterChange, selectedFilters }) {
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    // Fetch dynamic filters from the API
    const fetchFilters = async () => {
      try {
        const response = await fetch('http://your-api-endpoint/filters');
        const data = await response.json();
        setFilters(data);
      } catch (error) {
        console.error('Error fetching filters:', error);
      }
    };

    fetchFilters();
  }, []);

  return (
    <div>
      <h3>Dynamic Filters</h3>
      {filters.length > 0 ? (
        <ul>
          {filters.map((filter) => (
            <li key={filter.id}>
              <label>
                <input
                  type="checkbox"
                  value={filter.value}
                  checked={selectedFilters.includes(filter.value)}
                  onChange={() => onFilterChange(filter.value)}
                />
                {filter.label}
              </label>
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading filters...</p>
      )}
      <button onClick={() => onFilterChange(null)}>Clear Filters</button>
    </div>
  );
}

export default DynamicFilters;