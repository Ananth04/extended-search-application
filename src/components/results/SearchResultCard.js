import React from 'react';

function SearchResultCard({ result }) {
  return (
    <li>
      <div className="search-result-card">
        <h4>{result.name}</h4>
        <p>Price: {result.price}</p>
        <p>Rating: {result.rating}</p>
        {/* Add more details as needed */}
      </div>
    </li>
  );
}

export default SearchResultCard;
