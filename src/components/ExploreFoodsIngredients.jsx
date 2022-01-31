import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import context from '../context/context';
import profileIcon from '../images/profileIcon.svg';
import Footer from './Footer';

export default function ExploreFoodsIngredients() {
  const [ingredients, setIngredients] = useState([]);
  const { setSearchByFilter } = useContext(context);
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

  const submitClick = async (param) => {
    const result = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${param}`)
      .then((r) => r.json())
      .then((data) => data.meals);
    setSearchByFilter(result);
  };

  return (
    <div>
      <h1 data-testid="page-title">Explore Ingredients</h1>
      <Link to="/profile">
        <img src={ profileIcon } data-testid="profile-top-btn" alt="profile Icon" />
      </Link>
      {ingredients.map((i, index) => (
        <Link
          to={ { pathname: '/foods', state: i.strIngredient } }
          data-testid={ `${index}-recipe-card` }
          key={ index }
        >
          <label htmlFor="inputID">
            <input
              id="inputID"
              type="button"
              onClick={ () => submitClick(i.strIngredient) }
              data-testid={ `${index}-ingredient-card` }
            />
            <img
              data-testid={ `${index}-card-img` }
              src={ `https://www.themealdb.com/images/ingredients/${i.strIngredient}-Small.png` }
              alt={ i.strIngredient }
            />
            <p data-testid={ `${index}-card-name` }>{i.strIngredient}</p>
          </label>
        </Link>
      ))}
      <Footer />
    </div>);
}
