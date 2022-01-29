import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

export default function FoodCard({ index, food }) {
  const { strMealThumb, strMeal, idMeal } = food;
  const NO_MAGIC_NUMBER = 12;
  if (index >= NO_MAGIC_NUMBER) return null;
  return (
    <Link to={ `/foods/${idMeal}` }>
      <p data-testid={ `${index}-recipe-card` }>{index}</p>
      <img src={ strMealThumb } data-testid={ `${index}-card-img` } alt={ strMeal } />
      <p data-testid={ `${index}-card-name` }>{strMeal}</p>
    </Link>);
}

FoodCard.propTypes = {
  food: PropTypes.any,
  index: PropTypes.any,
}.isRequired;
