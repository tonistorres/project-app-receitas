import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';

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
      <Header />
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

    </div>
  );
}
