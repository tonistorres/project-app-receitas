import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <div>
      <h1 data-testid="page-title">Profile</h1>
      <Link to="/profile">
        <button type="button" data-testid="profile-top-btn">
          Profile
        </button>
      </Link>
      <button type="button" data-testid="search-top-btn">Searh</button>
    </div>
  );
}
