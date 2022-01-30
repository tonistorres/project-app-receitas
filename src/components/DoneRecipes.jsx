import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import ShareBtnDone from './ShareBtnDone';

export default function DoneRecipes() {
  const [doneState, setDoneState] = useState([]);
  const getDoneRecipes = () => {
    const getDone = JSON.parse(localStorage.getItem('doneRecipes'));
    setDoneState(getDone);
  };
  useEffect(() => {
    const getLocal = JSON.parse(localStorage.getItem('doneRecipes'));
    if (!getLocal) {
      localStorage.setItem('doneRecipes', JSON.stringify([]));
    }
    getDoneRecipes();
  }, []);

  return (
    <div>
      <h1 data-testid="page-title">Done Recipes</h1>
      <Link to="/profile">
        <img src={ profileIcon } data-testid="profile-top-btn" alt="profile Icon" />
      </Link>
      <button type="button" data-testid="filter-by-all-btn">All</button>
      <button type="button" data-testid="filter-by-food-btn">Food</button>
      <button type="button" data-testid="filter-by-drink-btn">Drink</button>
      {doneState.map((i, index) => (
        <div key={ index }>
          <img
            src={ i.image }
            data-testid={ `${index}-horizontal-image` }
            alt={ i.name }
          />
          <p data-testid={ `${index}-horizontal-top-text` }>
            {i.type.includes('drink') ? i.alcoholicOrNot : i.category }
          </p>
          <p data-testid={ `${index}-horizontal-name` }>{i.name}</p>
          <p data-testid={ `${index}-horizontal-done-date` }>{i.doneDate}</p>
          <ShareBtnDone
            index={ index }
            local={ i.type }
            id={ i.id }
          />
          {i.tags.filter((_item, ind) => ind < 2).map((tag, indice) => (
            <p key={ indice } data-testid={ `${indice}-${tag}-horizontal-tag` }>{tag}</p>
          ))}
        </div>
      ))}
    </div>);
}
