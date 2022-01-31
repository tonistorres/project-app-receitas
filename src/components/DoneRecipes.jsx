import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import ShareBtnDone from './ShareBtnDone';

export default function DoneRecipes() {
  const [filter, setFilter] = React.useState('All');
  const [elementsFilter, setElementsFilter] = useState([]);
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));

  useEffect(() => {
    if (filter === 'Drink') {
      setElementsFilter(doneRecipes.filter((item) => item.type.includes('drink')));
    }
    if (filter === 'Food') {
      setElementsFilter(doneRecipes.filter((item) => item.type.includes('food')));
    }
    if (filter === 'All') {
      setElementsFilter(doneRecipes);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const convertLink = (tipo, id) => {
    if (tipo.includes('food')) {
      return `/foods/${id}`;
    }
    return `/drinks/${id}`;
  };

  return (
    <div>
      <section>
        <h1 data-testid="page-title">Done Recipes</h1>
        <Link to="/profile">
          <img src={ profileIcon } data-testid="profile-top-btn" alt="profile Icon" />
        </Link>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => setFilter('All') }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ () => setFilter('Food') }
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => setFilter('Drink') }
        >
          Drink
        </button>
        {elementsFilter && elementsFilter.map((i, index) => (
          <div key={ index }>
            <Link
              to={ convertLink(i.type, i.id) }
            >
              <img
                style={ { width: 30 } }
                src={ i.image }
                data-testid={ `${index}-horizontal-image` }
                alt={ i.name }
              />
            </Link>
            <p data-testid={ `${index}-horizontal-top-text` }>
              {i.nationality !== ''
                ? `${i.nationality} - ${i.category}` : i.alcoholicOrNot }
            </p>
            <Link to={ convertLink(i.type, i.id) }>
              <p data-testid={ `${index}-horizontal-name` }>{i.name}</p>
            </Link>
            <ShareBtnDone
              index={ index }
              local={ i.type.includes('food') ? 'foods' : 'drinks' }
              id={ i.id }
            />

            <p data-testid={ `${index}-horizontal-done-date` }>
              {i.doneDate}
            </p>
            { i.tags && i.tags.map((item) => (
              <p
                key={ index }
                data-testid={ `${index}-${item}-horizontal-tag` }
              >
                {item}
              </p>))}
          </div>
        ))}
      </section>
    </div>
  );
}
