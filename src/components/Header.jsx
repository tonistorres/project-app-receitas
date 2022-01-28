import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

export default function Header() {
  const [isSearch, setIsSearch] = useState(false);
  const [searchState, setSearchState] = useState({
    search: '',
  });
  const { search } = searchState;

  function handleChange({ target }) {
    const { value } = target;
    setSearchState({ search: value });
  }

  return (
    <div>
      <h1 data-testid="page-title">RECIPES</h1>
      <Link to="/profile">
        <img src={ profileIcon } data-testid="profile-top-btn" alt="profile Icon" />
      </Link>
      <button
        type="button"
        data-testid="search-top-btn"
        onClick={ () => setIsSearch(!isSearch) }
      >
        <img src={ searchIcon } data-testid="search-top-btn" alt="Search Icon" />
      </button>
      {isSearch && (
        <label htmlFor="searchInput">
          <input
            id="searchInput"
            type="text"
            onChange={ (e) => handleChange(e) }
            value={ search }
            data-testid="search-input"
          />
        </label>)}
      {isSearch && (
        <div>
          <label htmlFor="ingredient">
            ingredient
            <input
              type="radio"
              data-testid="ingredient-search-radio"
              id="ingredient"
              name="radioSearch"
            />
          </label>
          <label htmlFor="name">
            name
            <input
              type="radio"
              data-testid="name-search-radio"
              id="name"
              name="radioSearch"
            />
          </label>
          <label htmlFor="letter">
            letter
            <input
              type="radio"
              data-testid="first-letter-search-radio"
              id="letter"
              name="radioSearch"
            />
          </label>
          <button type="button" data-testid="exec-search-btn">Search</button>
        </div>
      )}
    </div>
  );
}
