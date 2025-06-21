import React from 'react';

// PUBLIC_INTERFACE
function RecipeDetailPage({ recipe, onEdit, onDelete }) {
  /** Displays details of a single recipe; allows edit and delete if user owns recipe. */
  if (!recipe)
    return <div style={{ padding: 32, textAlign: 'center' }}>Select a recipe to view details.</div>;

  return (
    <div className="recipe-detail-page">
      <div className="recipe-detail-header">
        <h2>{recipe.title}</h2>
        <div className="recipe-detail-actions">
          <button className="btn" onClick={onEdit}>Edit</button>
          <button className="btn" style={{ backgroundColor: '#e4572e' }} onClick={onDelete}>Delete</button>
        </div>
      </div>
      <div className="recipe-detail-meta">
        <span>Category: {recipe.category}</span> | <span>By: {recipe.author}</span>
      </div>
      <h4>Ingredients</h4>
      <ul className="recipe-ingredients">
        {recipe.ingredients.map((ing, i) => <li key={i}>{ing}</li>)}
      </ul>
      <h4>Steps</h4>
      <ol className="recipe-steps">
        {recipe.steps.map((step, i) => <li key={i}>{step}</li>)}
      </ol>
    </div>
  );
}

export default RecipeDetailPage;
