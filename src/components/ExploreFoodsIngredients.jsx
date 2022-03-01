import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import './ExploreFoodsIngredients.css';
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
    <div className="container-main-explore-foods-ingredients">

      <header className="header-explore-ingredients">
        <Link to="/profile">
          <img src={ profileIcon } data-testid="profile-top-btn" alt="profile Icon" />
        </Link>
        <h1 data-testid="page-title">Ingredients</h1>
      </header>
      <div className="container-body-ingredients">
        {ingredients.map((i, index) => (
          // eslint-disable-next-line react/jsx-key
          <div className="container-card-ingredients">
            <Link
              to={ { pathname: '/foods', state: i.strIngredient } }
              data-testid={ `${index}-recipe-card` }
              key={ index }
            >
              <label htmlFor="inputID">
                <img
                  data-testid={ `${index}-card-img` }
                  src={ `https://www.themealdb.com/images/ingredients/${i.strIngredient}-Small.png` }
                  alt={ i.strIngredient }
                />
                <p data-testid={ `${index}-card-name` }>{i.strIngredient}</p>
              </label>
            </Link>
          </div>
        ))}
      </div>
      <Footer />
    </div>);
}
