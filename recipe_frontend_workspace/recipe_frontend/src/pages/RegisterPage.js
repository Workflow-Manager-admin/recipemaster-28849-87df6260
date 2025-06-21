import React, { useState } from 'react';

// PUBLIC_INTERFACE
function RegisterPage({ onRegister, error }) {
  /** User registration form page. Calls onRegister with (username, password, confirm). */
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [localError, setLocalError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim() || !password || !confirm)
      setLocalError("All fields required");
    else if (password !== confirm)
      setLocalError("Passwords do not match");
    else
      onRegister(username, password);
  };

  return (
    <div className="auth-page">
      <div className="auth-box">
      <h1 className="title">Register</h1>
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
        <input
          className="auth-input"
          value={confirm}
          onChange={e => setConfirm(e.target.value)}
          type="password"
          placeholder="Confirm Password"
        />
        <button className="btn btn-large" type="submit">Register</button>
      </form>
      </div>
    </div>
  );
}

export default RegisterPage;
