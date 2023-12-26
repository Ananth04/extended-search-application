import React from 'react';

const SearchResults = ({ results, handleResultClick }) => {
  return (
    <div className="search-results">
      <h2>Search Results Displayed as Cards</h2>
      {results.map((result) => (
        <div key={result.id} className="card" onClick={() => handleResultClick(result.id)}>
          <h3>{result.name}</h3>
          <p>Price: {result.price}</p>
          <p>Average Rating: {result.rating}</p>
          {/* Display other attributes */}
        </div>
      ))}
      <div className="pagination">Pagination here</div>
    </div>
  );
};

export default SearchResults;
