import React from 'react';

// PUBLIC_INTERFACE
function RecipeListPage({ recipes, onSelectRecipe, onSearch, searchTerm, category }) {
  /** Displays a list of recipes with clickable titles for detail view. */
  return (
    <div className="recipe-list-page">
      <div className="recipe-list-header">
        <h2>Recipes {category ? `– ${category}` : ""}</h2>
        <input
          className="search-input"
          type="text"
          placeholder="Search recipes..."
          value={searchTerm}
          onChange={e => onSearch(e.target.value)}
        />
      </div>
      <ul className="recipe-list">
        {recipes.length === 0 ? (
          <div className="no-recipes">No recipes found.</div>
        ) : recipes.map(recipe => (
          <li 
            key={recipe.id} 
            className="recipe-list-item"
            onClick={() => onSelectRecipe(recipe)}
          >
            <div className="recipe-list-title">{recipe.title}</div>
            <div className="recipe-list-meta">{recipe.category}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecipeListPage;
