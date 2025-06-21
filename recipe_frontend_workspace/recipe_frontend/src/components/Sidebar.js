import React from 'react';

// PUBLIC_INTERFACE
function Sidebar({ categories, selectedCategory, onSelectCategory, onAddRecipe }) {
  /** Sidebar listing recipe categories. Allows filter and new recipe creation. Minimal, fixed to the left. */
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <span className="sidebar-title">Categories</span>
        <button className="btn" onClick={onAddRecipe}>+ New</button>
      </div>
      <ul className="sidebar-list">
        <li 
          className={selectedCategory === null ? "active" : ""}
          onClick={() => onSelectCategory(null)}
        >
          All
        </li>
        {categories.map(cat => (
          <li 
            key={cat}
            className={selectedCategory === cat ? "active" : ""}
            onClick={() => onSelectCategory(cat)}
          >
            {cat}
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;
