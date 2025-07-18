import React from 'react';
import { Link } from 'react-router';
function HomePage() {
  return (
    <div>
      <h1>LinguaLink: Language Exchange Platform</h1>
      <Link to="/login">Login</Link> |
      <Link to="/register">Register</Link> |
      <Link to="/match">Find Partner</Link>
    </div>
  );
}
export default HomePage;