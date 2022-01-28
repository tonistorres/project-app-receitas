import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import context from '../context/context';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import { ingredientsSearch, letterSearch, nameSearch } from '../services/fetch';

export default function Header() {
  const [isSearch, setIsSearch] = useState(false);
  const { searchByFilter, setSearchByFilter } = useContext(context);
  const [searchState, setSearchState] = useState({
    search: '',
    radioSearch: '',
  });
  const [redirect, setRedirect] = useState(false);
  const { search, radioSearch } = searchState;
  const history = useHistory();
  const { location: { pathname } } = history;

  function handleChange({ target }) {
    const { name } = target;
    const value = target.type === 'radio' ? target.id : target.value;
    setSearchState({ ...searchState, [name]: value });
  }

  const verifyPushHistory = () => {
    setRedirect(false);
    switch (pathname) {
    case '/foods':
      if (searchByFilter !== null && searchByFilter.length === 1) {
        history.push(`/foods/${searchByFilter[0].idMeal}`);
      }
      break;
    default:
      if (searchByFilter !== null && searchByFilter.length === 1) {
        history.push(`/drinks/${searchByFilter[0].idDrink}`);
      }
    }
  };

  /* eslint-disable */
  useEffect(() => {
    if (redirect) {
      verifyPushHistory();

    }
  }, [searchByFilter]);
  /* eslint-enable */
  const searchIngredient = async () => {
    const answer = await ingredientsSearch(search, pathname);
    setSearchByFilter(answer);
  };
  const searchName = async () => {
    const answer = await nameSearch(search, pathname);
    setSearchByFilter(answer);
  };
  const letterhName = async () => {
    const answer = await letterSearch(search, pathname);
    setSearchByFilter(answer);
  };

  function submitRequest() {
    setRedirect(true);
    switch (radioSearch) {
    case 'ingredient':
      searchIngredient();
      break;
    case 'name':
      searchName();
      break;
    default:
      if (search.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      }
      letterhName();
    }
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
            name="search"
            data-testid="search-input"
          />
        </label>)}
      {isSearch && (
        <div>
          <label htmlFor="ingredient">
            ingredient
            <input
              onChange={ (e) => handleChange(e) }
              type="radio"
              data-testid="ingredient-search-radio"
              id="ingredient"
              name="radioSearch"
            />
          </label>
          <label htmlFor="name">
            name
            <input
              onChange={ (e) => handleChange(e) }
              type="radio"
              data-testid="name-search-radio"
              id="name"
              name="radioSearch"
            />
          </label>
          <label htmlFor="letter">
            letter
            <input
              onChange={ (e) => handleChange(e) }
              type="radio"
              data-testid="first-letter-search-radio"
              id="letter"
              name="radioSearch"
            />
          </label>
          <button
            type="button"
            data-testid="exec-search-btn"
            onClick={ () => submitRequest() }
          >
            Search
          </button>
        </div>
      )}
    </div>
  );
}
