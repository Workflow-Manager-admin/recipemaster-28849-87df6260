import React, { useState, useEffect } from 'react';

// PUBLIC_INTERFACE
function RecipeModal({ open, onClose, onSave, initial }) {
  /** Modal dialog for adding/editing a recipe. */
  const [title, setTitle] = useState(initial?.title || "");
  const [category, setCategory] = useState(initial?.category || "");
  const [ingredients, setIngredients] = useState(initial?.ingredients?.join('\n') || "");
  const [steps, setSteps] = useState(initial?.steps?.join('\n') || "");
  const [error, setError] = useState(null);

  useEffect(() => {
    setTitle(initial?.title || "");
    setCategory(initial?.category || "");
    setIngredients(initial?.ingredients?.join('\n') || "");
    setSteps(initial?.steps?.join('\n') || "");
    setError(null);
  }, [open, initial]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !category.trim() || !ingredients.trim() || !steps.trim()) {
      setError("All fields required");
      return;
    }
    onSave({
      title: title.trim(),
      category: category.trim(),
      ingredients: ingredients.split('\n').map(s => s.trim()).filter(Boolean),
      steps: steps.split('\n').map(s => s.trim()).filter(Boolean),
    });
  };

  if (!open) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <h2>{initial ? "Edit Recipe" : "Add Recipe"}</h2>
        <form className="modal-form" onSubmit={handleSubmit}>
          {error && <div className="auth-error">{error}</div>}
          <input
            className="auth-input"
            type="text"
            value={title}
            placeholder="Title"
            onChange={e => setTitle(e.target.value)}
          />
          <input
            className="auth-input"
            type="text"
            value={category}
            placeholder="Category"
            onChange={e => setCategory(e.target.value)}
          />
          <textarea
            className="auth-input"
            value={ingredients}
            placeholder="Ingredients (one per line)"
            onChange={e => setIngredients(e.target.value)}
            rows={4}
          />
          <textarea
            className="auth-input"
            value={steps}
            placeholder="Steps (one per line)"
            onChange={e => setSteps(e.target.value)}
            rows={6}
          />
          <div style={{ marginTop: 12, display: 'flex', gap: 10 }}>
            <button className="btn" type="submit">{initial ? "Save" : "Add"}</button>
            <button className="btn" type="button" style={{ background: '#bbb', color: '#222' }} onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RecipeModal;
