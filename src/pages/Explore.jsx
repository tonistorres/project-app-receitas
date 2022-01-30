import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import profileIcon from '../images/profileIcon.svg';

export default function Explore() {
  return (
    <div>
      <h1 data-testid="page-title">
        Explore
      </h1>
      <Link to="/profile">
        <img src={ profileIcon } data-testid="profile-top-btn" alt="profile Icon" />
      </Link>
      <Footer />
    </div>);
}
