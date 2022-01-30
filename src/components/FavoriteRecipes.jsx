import React from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';

export default function FavoriteRecipes() {
  return (
    <div>
      <h1 data-testid="page-title">Favorite Recipes</h1>
      <Link to="/profile">
        <img src={ profileIcon } data-testid="profile-top-btn" alt="profile Icon" />
      </Link>
    </div>);
}
