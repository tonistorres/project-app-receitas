import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import Footer from './Footer';

export default function ExploreDrink() {
  const history = useHistory();
  const fetchRandom = async () => {
    const result = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
      .then((r) => r.json()).then((d) => d.drinks);
    history.push(`/drinks/${result[0].idDrink}`);
  };
  return (
    <div>
      <h1 data-testid="page-title">Explore Drinks</h1>
      <Link to="/profile">
        <img src={ profileIcon } data-testid="profile-top-btn" alt="profile Icon" />
      </Link>
      <button
        data-testid="explore-by-ingredient"
        onClick={ () => history.push('/explore/drinks/ingredients') }
        type="button"
      >
        By Ingredient
      </button>
      {/* <button
        data-testid="explore-by-nationality"
        onClick={ () => history.push('/explore/drinks/nationalities') }
        type="button"
      >
        By Nationality
      </button> */}
      <button
        data-testid="explore-surprise"
        onClick={ () => fetchRandom() }
        type="button"
      >
        Surprise me!
      </button>
      <Footer />
    </div>);
}
