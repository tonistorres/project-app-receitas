import React from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import Footer from './Footer';

export default function ExploreFood() {
  return (
    <div>
      <h1 data-testid="page-title">Explore Foods</h1>
      <Link to="/profile">
        <img src={ profileIcon } data-testid="profile-top-btn" alt="profile Icon" />
      </Link>
      <Footer />
    </div>);
}
