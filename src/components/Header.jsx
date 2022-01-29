import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import HeaderSearchBar from './HeaderSearchBar';

export default function Header() {
  const [isSearch, setIsSearch] = useState(false);

  return (
    <div>
      <Link to="/profile">
        <img src={ profileIcon } data-testid="profile-top-btn" alt="profile Icon" />
      </Link>
      <button
        type="button"
        onClick={ () => setIsSearch(!isSearch) }
      >
        <img src={ searchIcon } data-testid="search-top-btn" alt="Search Icon" />
      </button>
      {isSearch && <HeaderSearchBar />}
    </div>
  );
}
