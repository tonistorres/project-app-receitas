import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import context from '../context/context';
import profileIcon from '../images/profileIcon.svg';
import { ingredientsSearch } from '../services/fetch';
import Footer from './Footer';

export default function ExploreDrinksIngredients() {
  const [ingredients, setIngredients] = useState([]);
  const history = useHistory();
  const { setSearchByFilter } = useContext(context);
  const fetchIngredients = async () => {
    const result = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list')
      .then((r) => r.json()).then((d) => d.drinks);
    const newArr = [];
    result.forEach((i, index) => {
      const NO_MAGIC_NUMBER = 12;
      if (index < NO_MAGIC_NUMBER) {
        newArr.push(i);
      }
    });
    setIngredients(newArr);
  };
  const submitClick = async (param) => {
    const result = await ingredientsSearch(param, '/drinks');
    setSearchByFilter(result);
    history.push('/drinks');
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
        <button
          type="button"
          onClick={ () => submitClick(i.strIngredient1) }
          key={ index }
          data-testid={ `${index}-ingredient-card` }
        >
          <img
            data-testid={ `${index}-card-img` }
            src={ i.strIngredient1Thumb }
            alt={ i.strIngredient1 }
          />
          <p data-testid={ `${index}-card-name` }>{i.strIngredient1}</p>
        </button>
      ))}
      <Footer />
    </div>);
}
