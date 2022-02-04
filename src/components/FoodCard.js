import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import './FoodCard.css';

export default function FoodCard({ index, food }) {
  const { strMealThumb, strMeal, idMeal } = food;
  const NO_MAGIC_NUMBER = 12;
  if (index >= NO_MAGIC_NUMBER) return null;

  return (
    <div className="container-main-food-card">
      <div className="container-conteudo">
        <Link to={ `/foods/${idMeal}` } data-testid={ `${index}-recipe-card` }>
          <img
            src={ strMealThumb }
            data-testid={ `${index}-card-img` }
            alt={ strMeal }
          />
          <p data-testid={ `${index}-card-name` }>{strMeal}</p>
        </Link>
      </div>
    </div>);
}

FoodCard.propTypes = {
  food: PropTypes.any,
  index: PropTypes.any,
}.isRequired;
