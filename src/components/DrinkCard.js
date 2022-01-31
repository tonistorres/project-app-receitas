import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

export default function DrinkCard({ index, drink }) {
  const { strDrinkThumb, strDrink, idDrink } = drink;
  const NO_MAGIC_NUMBER = 12;
  if (index >= NO_MAGIC_NUMBER) return null;
  return (
    <Link to={ `/drinks/${idDrink}` } data-testid={ `${index}-recipe-card` }>
      <p>{index}</p>
      <img
        src={ strDrinkThumb }
        style={ { width: 30 } }
        data-testid={ `${index}-card-img` }
        alt={ strDrink }
      />
      <p data-testid={ `${index}-card-name` }>{strDrink}</p>
    </Link>);
}

DrinkCard.propTypes = {
  food: PropTypes.any,
  index: PropTypes.any,
}.isRequired;
