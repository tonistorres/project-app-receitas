import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import profileIcon from '../images/profileIcon.svg';

export default function Profile() {
  const [email, setEmail] = useState('');
  const history = useHistory();
  /* eslint-disable */
  useEffect(() => {
    const getEmailLocalStorage = JSON.parse(localStorage.getItem('user'));
    if (getEmailLocalStorage) {
      setEmail(getEmailLocalStorage.email);
    }
  }, []);
   /* eslint-enable */
  function logoutClick() {
    localStorage.clear();
    history.push('/');
  }

  return (
    <div>
      <h1 data-testid="page-title">Profile</h1>
      <p data-testid="profile-email">{email}</p>
      <Link to="/profile">
        <img src={ profileIcon } data-testid="profile-top-btn" alt="profile Icon" />
      </Link>
      <button
        type="button"
        data-testid="profile-done-btn"
        onClick={ () => history.push('/done-recipes') }
      >
        Done Recipes
      </button>
      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ () => history.push('/favorite-recipes') }
      >
        Favorite Recipes
      </button>
      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ () => logoutClick() }
      >
        Logout
      </button>
      <Footer />
    </div>
  );
}
