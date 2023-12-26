import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Filters from './Filters'; // Import the Filters component
import SearchResults from './SearchResults'; // Import the SearchResults component
import DataVisualizations from './DataVisualizations'; // Import the DataVisualizations component

const ResultsPage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [filters, setFilters] = useState({}); // Store selected filters
  const [selectedEntity, setSelectedEntity] = useState('Technology'); // Default selected entity
  const [pagination, setPagination] = useState({ currentPage: 1, resultsPerPage: 10 }); // Pagination config

  useEffect(() => {
    // Fetch initial search results when component mounts
    fetchSearchResults(selectedEntity, filters);
  }, [selectedEntity, filters]); // Re-fetch results when entity or filters change

  const fetchSearchResults = async (entity, appliedFilters) => {
    try {
      const response = await axios.get(`/api/search/${entity}`, { params: appliedFilters });
      setSearchResults(response.data.results);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const handleFilterChange = (attribute, value) => {
    // Update filters when a filter option is selected
    const updatedFilters = { ...filters, [attribute]: value };
    setFilters(updatedFilters);
  };

  const handlePaginationChange = (pageNumber) => {
    // Update current page number
    setPagination({ ...pagination, currentPage: pageNumber });
  };

  const handleResultClick = (resultId) => {
    // Handle click on a search result to navigate to Entity Detail Page
    // Implement navigation logic based on your routing system
    console.log('Clicked on result ID:', resultId);
  };

  return (
    <div className="results-page">
      {/* Left Section: Dynamic Filters */}
      <div className="left-section">
        <Filters
          entity={selectedEntity}
          filters={filters}
          onChange={handleFilterChange}
          onClearFilters={() => setFilters({})}
        />
      </div>

      {/* Middle Section: Search Results */}
      <div className="middle-section">
        <SearchResults
          results={searchResults}
          currentPage={pagination.currentPage}
          resultsPerPage={pagination.resultsPerPage}
          onResultClick={handleResultClick}
          onPageChange={handlePaginationChange}
        />
      </div>

      {/* Right Section: Data Visualizations */}
      <div className="right-section">
        <DataVisualizations selectedEntity={selectedEntity} searchResults={searchResults} />
      </div>
    </div>
  );
};

export default ResultsPage;
