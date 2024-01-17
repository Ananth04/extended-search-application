import React, { useState } from 'react';

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEntity, setSelectedEntity] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    const newTab = window.open('', '_blank');
    newTab.location.href = `/results?search=${searchTerm}&selectedEntity=${selectedEntity}`;
    // Perform the search action and pass the search term to the parent component
    onSearch({ searchTerm, selectedEntity });
  };

  return (
    <div className='search-bar'>
      <form onSubmit={handleSearchSubmit}>
        <label htmlFor="searchInput">Search:</label>
        <input
          type="text"
          id="searchInput"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Enter your search term"
        />
        <input type="hidden" name="selectedEntity" value={selectedEntity} />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}

export default SearchBar;
