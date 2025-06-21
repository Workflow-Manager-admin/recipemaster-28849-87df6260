import React from 'react';

// PUBLIC_INTERFACE
function Header({ onLogout, user }) {
  /** Main header with navigation and optional user/logout. Modern/minimal. */
  return (
    <header className="navbar">
      <div className="container" style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
        <div className="logo">
          <span className="logo-symbol" style={{ color: 'var(--accent, #f4a261)' }}>🍲</span> RecipeMaster
        </div>
        <nav style={{ display: "flex", gap: "18px", alignItems: "center" }}>
          {user ? <>
            <span style={{ color: 'var(--text-secondary)' }}>{user.username}</span>
            <button className="btn" onClick={onLogout}>Logout</button>
          </> : null}
        </nav>
      </div>
    </header>
  );
}

export default Header;
