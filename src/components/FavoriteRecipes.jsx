import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import FavoriteBtn from './FavoriteBtn';
import ShareBtnDone from './ShareBtnDone';

export default function FavoriteRecipes() {
  const [favoriteState, setFavoriteState] = useState([]);
  const [filterState, setFilterState] = useState([]);
  const getFavoriteRecipes = () => {
    const getFav = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFavoriteState(getFav);
    setFilterState(getFav);
  };
  useEffect(() => {
    getFavoriteRecipes();
  }, []);

  const filterAll = () => {
    const newArr = [...favoriteState];
    setFilterState(newArr);
  };

  const filterByFood = () => {
    const newArr = [...favoriteState].filter((i) => i.tag !== 'drinks');
    setFilterState(newArr);
  };

  const getByDrink = () => {
    const newArr = [...favoriteState].filter((i) => i.tag === 'drinks');
    setFilterState(newArr);
  };

  return (
    <div>
      <h1 data-testid="page-title">Favorite Recipes</h1>
      <Link to="/profile">
        <img src={ profileIcon } data-testid="profile-top-btn" alt="profile Icon" />
      </Link>
      <button
        type="button"
        onClick={ () => filterAll() }
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      <button
        type="button"
        onClick={ () => filterByFood() }
        data-testid="filter-by-food-btn"
      >
        Food
      </button>
      <button
        type="button"
        onClick={ () => getByDrink() }
        data-testid="filter-by-drink-btn"
      >
        Drink
      </button>
      {filterState !== null && filterState.map((i, index) => (
        <div key={ index }>
          <Link to={ `/${i.type}/${i.id}` }>
            <img
              src={ i.image }
              data-testid={ `${index}-horizontal-image` }
              alt={ i.name }
            />
            <p data-testid={ `${index}-horizontal-name` }>{i.name}</p>
          </Link>
          <p data-testid={ `${index}-horizontal-top-text` }>
            {i.type.includes('drink') ? i.alcoholicOrNot : i.category }
          </p>
          <p data-testid={ `${index}-horizontal-done-date` }>{i.doneDate}</p>
          <ShareBtnDone
            index={ index }
            local={ i.type }
            id={ i.id }
          />
          <FavoriteBtn />
        </div>
      ))}
    </div>);
}
