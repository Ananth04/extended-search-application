import React from 'react';

const Filters = ({ attributes, handleFilterChange }) => {
  return (
    <div className="filters">
      <h2>Dynamic Filters</h2>
      {Object.keys(attributes).map((attribute) => (
        <div key={attribute}>
          <h3>{attribute}</h3>
          {attributes[attribute].map((option) => (
            <label key={option}>
              <input
                type="checkbox"
                value={option}
                onChange={(e) => handleFilterChange(attribute, e.target.value)}
              />
              {option}
            </label>
          ))}
        </div>
      ))}
      <button onClick={() => handleFilterChange('clear', null)}>Clear Filters</button>
    </div>
  );
};

export default Filters;
