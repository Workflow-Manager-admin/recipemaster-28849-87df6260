// PUBLIC_INTERFACE
export const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:3001";

function toJSON(r) { return r.json(); }

// PUBLIC_INTERFACE
export async function login(username, password) {
  /* Send login to backend. Stores token if provided. */
  // Example: POST /auth/login {username, password}
  // Notional, should match backend.
  let res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ username, password })
  });
  if (!res.ok) throw new Error("Bad credentials");
  let data = await res.json();
  if (data.token)
    localStorage.setItem("token", data.token);
  return data;
}

// PUBLIC_INTERFACE
export async function register(username, password) {
  let res = await fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ username, password })
  });
  if (!res.ok) throw new Error("Failed to register");
  return await res.json();
}

// PUBLIC_INTERFACE
export function logout() {
  localStorage.removeItem("token");
}

// PUBLIC_INTERFACE
function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// PUBLIC_INTERFACE
export async function getRecipes(params={}) {
  let q = "";
  if (params.category) q += `?category=${encodeURIComponent(params.category)}`;
  if (params.search) q += (q ? "&" : "?") + `search=${encodeURIComponent(params.search)}`;
  let res = await fetch(`${API_BASE}/recipes${q}`, { headers: getAuthHeaders() });
  if (!res.ok) throw new Error("Failed to fetch recipes");
  return toJSON(res);
}

// PUBLIC_INTERFACE
export async function getRecipe(id) {
  let res = await fetch(`${API_BASE}/recipes/${id}`, { headers: getAuthHeaders() });
  if (!res.ok) throw new Error("Not found");
  return toJSON(res);
}

// PUBLIC_INTERFACE
export async function createRecipe(recipe) {
  let res = await fetch(`${API_BASE}/recipes`, {
    method: "POST",
    headers: {"Content-Type": "application/json", ...getAuthHeaders()},
    body: JSON.stringify(recipe),
  });
  if (!res.ok) throw new Error("Failed to create recipe");
  return toJSON(res);
}

// PUBLIC_INTERFACE
export async function updateRecipe(id, recipe) {
  let res = await fetch(`${API_BASE}/recipes/${id}`, {
    method: "PUT",
    headers: {"Content-Type": "application/json", ...getAuthHeaders()},
    body: JSON.stringify(recipe),
  });
  if (!res.ok) throw new Error("Failed to update recipe");
  return toJSON(res);
}

// PUBLIC_INTERFACE
export async function deleteRecipe(id) {
  let res = await fetch(`${API_BASE}/recipes/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Delete failed");
  return toJSON(res);
}
