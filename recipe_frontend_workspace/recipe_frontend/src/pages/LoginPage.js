import React, { useState } from 'react';

// PUBLIC_INTERFACE
function LoginPage({ onLogin, error }) {
  /** User login form page. Calls onLogin with (username, password). */
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim() && password) {
      onLogin(username, password);
    } else {
      setLocalError("Username and password required");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-box">
      <h1 className="title">Sign In</h1>
      <form onSubmit={handleSubmit} className="auth-form">
        {error && <div className="auth-error">{error}</div>}
        {localError && <div className="auth-error">{localError}</div>}
        <input
          className="auth-input"
          value={username}
          onChange={e => setUsername(e.target.value)}
          type="text"
          placeholder="Username"
        />
        <input
          className="auth-input"
          value={password}
          onChange={e => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />
        <button className="btn btn-large" type="submit">Login</button>
      </form>
      </div>
    </div>
  );
}

export default LoginPage;
