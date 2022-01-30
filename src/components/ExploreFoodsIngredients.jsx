import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import Footer from './Footer';

export default function ExploreFoodsIngredients() {
  const [ingredients, setIngredients] = useState([]);
  const fetchIngredients = async () => {
    const result = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list')
      .then((r) => r.json()).then((d) => d.meals);
    const newArr = [];
    result.forEach((i, index) => {
      const NO_MAGIC_NUMBER = 12;
      if (index < NO_MAGIC_NUMBER) {
        newArr.push(i);
      }
    });
    setIngredients(newArr);
  };

  useEffect(() => {
    fetchIngredients();
  }, []);
  return (
    <div>
      <h1 data-testid="page-title">Explore Ingredients</h1>
      <Link to="/profile">
        <img src={ profileIcon } data-testid="profile-top-btn" alt="profile Icon" />
      </Link>
      {ingredients.map((i, index) => (
        <div key={ index } data-testid={ `${index}-ingredient-card` }>
          <img
            data-testid={ `${index}-card-img` }
            src={ i.strIngredientThumb }
            alt={ i.strIngredient }
          />
          <p data-testid={ `${index}-card-name` }>{i.strIngredient}</p>
        </div>
      ))}
      <Footer />
    </div>);
}
