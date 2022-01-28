import PropTypes from 'prop-types';
import React from 'react';

export default function FoodCard({ index, food }) {
  const { strMealThumb, strMeal } = food;
  const NO_MAGIC_NUMBER = 12;
  if (index >= NO_MAGIC_NUMBER) return null;
  return (
    <div>
      <p data-testid={ `${index}-recipe-card` }>{index}</p>
      <img src={ strMealThumb } data-testid={ `${index}-card-img` } alt={ strMeal } />
      <p data-testid={ `${index}-card-name` }>{strMeal}</p>
    </div>);
}

FoodCard.propTypes = {
  food: PropTypes.any,
  index: PropTypes.any,
}.isRequired;
