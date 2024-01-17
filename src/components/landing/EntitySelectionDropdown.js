import React, {useState} from 'react';

function EntitySelectionDropdown() {
  const [selectedEntity, setSelectedEntity] = useState('Technology');

  const handleEntityChange = (event) => {
    setSelectedEntity(event.target.value);
    // You can perform additional actions based on the selected entity if needed
  };

  return (
    <div className='entity-dropdown'>
      <label htmlFor="entityDropdown">Select Entity: </label>
      <select id="entityDropdown" value={selectedEntity} onChange={handleEntityChange}>
        <option value="Technology">Technology</option>
        <option value="Country">Country</option>
        <option value="Manufacturer">Manufacturer</option>
        <option value="Retailer">Retailer</option>
        <option value="UserReviews">User Reviews</option>
      </select>
    </div>
  );
}

export default EntitySelectionDropdown;