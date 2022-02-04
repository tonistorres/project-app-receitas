import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import profileIcon from '../images/profileIcon.svg';
import './Profile.css';
import '../index.css';

export default function Profile() {
  const [email, setEmail] = useState('');
  const history = useHistory();

  useEffect(() => {
    const getEmailLocalStorage = JSON.parse(localStorage.getItem('user'));
    if (getEmailLocalStorage) {
      setEmail(getEmailLocalStorage.email);
    }
  }, []);

  function logoutClick() {
    localStorage.clear();
    history.push('/');
  }

  return (
    <main className="container-main-profile">

      <header className="cotainer-header-profile">
        <Link to="/profile">
          <img
            src={ profileIcon }
            data-testid="profile-top-btn"
            alt="profile Icon"
          />
        </Link>
        <h1 data-testid="page-title">Profile</h1>

      </header>
      <section className="container-conteudo-profile">
        <section className="conteiner-body-profeile">
          <p data-testid="profile-email">{email}</p>

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
        </section>
      </section>
      <Footer />
    </main>
  );
}
