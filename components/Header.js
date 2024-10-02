import React, { useState } from 'react';
import './Header.css';

function Header({ groupBy, sortBy, onGroupChange, onSortChange }) {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleGroupSelection = (option) => {
    onGroupChange(option);
    setShowDropdown(false);
  };

  const handleSortSelection = (option) => {
    onSortChange(option);
    setShowDropdown(false);
  };

  return (
    <div className="header">
      <div className="dropdown-container">
        <button className="dropdown-button" onClick={() => setShowDropdown(!showDropdown)}>
          <span className="icon">≡</span> Display
        </button>
        {showDropdown && (
          <div className="dropdown-menu">
            <div className="dropdown-item">
              <span>Grouping</span>
              <select value={groupBy} onChange={(e) => handleGroupSelection(e.target.value)}>
                <option value="status">Status</option>
                <option value="user">User</option>
                <option value="priority">Priority</option>
              </select>
            </div>
            <div className="dropdown-item">
              <span>Ordering</span>
              <select value={sortBy} onChange={(e) => handleSortSelection(e.target.value)}>
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
