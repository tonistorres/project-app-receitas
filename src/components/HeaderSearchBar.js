import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import context from '../context/context';
import { ingredientsSearch, letterSearch, nameSearch } from '../services/fetch';
import './HeaderSearchBar.css';

export default function HeaderSearchBar() {
  const { searchByFilter, setSearchByFilter } = useContext(context);
  const [redirect, setRedirect] = useState(false);
  const [searchState, setSearchState] = useState({
    search: '',
    radioSearch: '',
  });
  const history = useHistory();
  const {
    location: { pathname },
  } = history;
  const { search, radioSearch } = searchState;
  function handleChange({ target }) {
    const { name } = target;
    const value = target.type === 'radio' ? target.id : target.value;
    setSearchState({ ...searchState, [name]: value });
  }
  const alerta = 'Sorry, we haven\'t found any recipes for these filters.';
  const searchIngredient = async () => {
    const answer = await ingredientsSearch(search, pathname);
    if (answer === null) {
      global.alert(alerta);
    } else {
      setSearchByFilter(answer);
    }
  };
  const searchName = async () => {
    const answer = await nameSearch(search, pathname);
    if (answer === null) {
      global.alert(alerta);
    } else {
      setSearchByFilter(answer);
    }
  };
  const letterhName = async () => {
    const answer = await letterSearch(search, pathname);
    if (answer === null) {
      global.alert(alerta);
    } else {
      setSearchByFilter(answer);
    }
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
      } else {
        letterhName();
      }
    }
  }
  const verifyPushHistory = () => {
    setRedirect(false);
    switch (pathname) {
    case '/foods':
      if (searchByFilter !== null && searchByFilter.length === 1) {
        history.push(`/foods/${searchByFilter[0].idMeal}`);
      }
      break;
    case '/drinks':
      if (searchByFilter !== null && searchByFilter.length === 1) {
        history.push(`/drinks/${searchByFilter[0].idDrink}`);
      }
      break;
    default:
      return null;
    }
  };

  useEffect(() => {
    if (redirect) {
      verifyPushHistory();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchByFilter]);

  return (
    <div className="container-main-searc">
      <div className="container-input-search">
        <label htmlFor="searchInput">
          <input
            id="searchInput"
            type="text"
            onChange={ (e) => handleChange(e) }
            value={ search }
            name="search"
            data-testid="search-input"
            className="input-searc-header"
            placeholder="Search"
          />
        </label>
      </div>
      <div className="container-radio-horizontal">

        <label htmlFor="ingredient">
          <div className="containers-radio-vertical">
            item
            <input
              onChange={ (e) => handleChange(e) }
              type="radio"
              data-testid="ingredient-search-radio"
              id="ingredient"
              name="radioSearch"
            />
          </div>
        </label>

        <label htmlFor="name">
          <div className="containers-radio-vertical">
            name
            <input
              onChange={ (e) => handleChange(e) }
              type="radio"
              data-testid="name-search-radio"
              id="name"
              name="radioSearch"
            />
          </div>
        </label>

        <label htmlFor="letter">
          <div className="containers-radio-vertical">
            letter
            <input
              onChange={ (e) => handleChange(e) }
              type="radio"
              data-testid="first-letter-search-radio"
              id="letter"
              name="radioSearch"
            />
          </div>
        </label>

        <button
          type="button"
          data-testid="exec-search-btn"
          onClick={ () => submitRequest() }
          className="btn-search-foods"
        >
          Search
        </button>
      </div>
    </div>
  );
}
