import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import RecipeListPage from './pages/RecipeListPage';
import RecipeDetailPage from './pages/RecipeDetailPage';
import RecipeModal from './components/RecipeModal';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { AuthProvider, useAuth } from './contexts/AuthContext';

import {
  login, register, logout,
  getRecipes, createRecipe, updateRecipe, deleteRecipe
} from './services/api';

function MainApp() {
  // UI state
  const [current, setCurrent] = useState("recipes"); // recipes | login | register
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalRecipe, setModalRecipe] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [err, setErr] = useState(null);

  // Auth state
  const { user, setUser, clearUser } = useAuth();

  useEffect(() => {
    if (user) fetchRecipes();
    // eslint-disable-next-line
  }, [user, selectedCategory, searchTerm]);

  async function fetchRecipes() {
    try {
      const params = {};
      if (selectedCategory) params.category = selectedCategory;
      if (searchTerm) params.search = searchTerm;
      let data = await getRecipes(params);
      setRecipes(Array.isArray(data) ? data : []);
      setCategories([...new Set((Array.isArray(data) ? data : []).map(r => r.category || "General"))]);
    } catch {
      setRecipes([]);
    }
  }

  function handleSelectRecipe(recipe) {
    setSelectedRecipe(recipe);
  }

  function handleAddRecipe() {
    setModalRecipe(null);
    setModalOpen(true);
  }
  function handleEditRecipe() {
    setModalRecipe(selectedRecipe);
    setModalOpen(true);
  }
  async function handleDeleteRecipe() {
    if (!window.confirm("Delete this recipe permanently?")) return;
    await deleteRecipe(selectedRecipe.id);
    setSelectedRecipe(null);
    fetchRecipes();
  }
  async function handleSaveRecipe(newRecipe) {
    try {
      if (modalRecipe) await updateRecipe(modalRecipe.id, newRecipe);
      else await createRecipe(newRecipe);
      setModalOpen(false);
      setSelectedRecipe(null);
      fetchRecipes();
    } catch (e) {
      setErr("Unable to save recipe");
    }
  }

  // Auth flows
  async function handleLogin(username, password) {
    try {
      const data = await login(username, password);
      setUser({ username: username, ...data });
      setCurrent("recipes");
      setErr(null);
    } catch {
      setErr("Login failed.");
    }
  }
  async function handleRegister(username, password) {
    try {
      await register(username, password);
      setCurrent("login");
      setErr("Registration complete. Please log in.");
    } catch {
      setErr("Registration failed.");
    }
  }
  function handleLogout() {
    logout();
    clearUser();
    setCurrent("login");
  }

  if (!user) {
    return current === "register"
      ? <RegisterPage onRegister={handleRegister} error={err} />
      : <LoginPage onLogin={handleLogin} error={err} />;
  }
  return (
    <div className="app">
      <Header user={user} onLogout={handleLogout} />
      <div className="layout">
        <Sidebar
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onAddRecipe={handleAddRecipe}
        />
        <main className="main">
          <RecipeListPage
            recipes={recipes}
            category={selectedCategory}
            onSelectRecipe={handleSelectRecipe}
            onSearch={setSearchTerm}
            searchTerm={searchTerm}
          />
          <RecipeDetailPage
            recipe={selectedRecipe}
            onEdit={handleEditRecipe}
            onDelete={handleDeleteRecipe}
          />
          <RecipeModal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            onSave={handleSaveRecipe}
            initial={modalRecipe}
          />
        </main>
      </div>
    </div>
  );
}

/**
 * Wrap the main app with authentication provider/context.
 */
function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
export default App;