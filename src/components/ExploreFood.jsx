import React from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import profileIcon from '../images/profileIcon.svg';
import './ExploreFoods.css';
import Footer from './Footer';

export default function ExploreFood() {
  const history = useHistory();
  const fetchRandom = async () => {
    const result = await fetch('https://www.themealdb.com/api/json/v1/1/random.php')
      .then((r) => r.json()).then((d) => d.meals);
    history.push(`/foods/${result[0].idMeal}`);
  };
  return (
    <div className="container-main-explore-foods">

      <header className="container-header-explore-foods">
        <Link to="/profile">
          <img src={ profileIcon } data-testid="profile-top-btn" alt="profile Icon" />
        </Link>
        <h1 data-testid="page-title">Explore Foods</h1>
      </header>
      <section className="container-buttons-explore-foods">
        <button
          data-testid="explore-by-ingredient"
          onClick={ () => history.push('/explore/foods/ingredients') }
          type="button"
        >
          By Ingredient
        </button>
        <button
          data-testid="explore-by-nationality"
          onClick={ () => history.push('/explore/foods/nationalities') }
          type="button"
        >
          By Nationality
        </button>
        <button
          data-testid="explore-surprise"
          onClick={ () => fetchRandom() }
          type="button"
        >
          Surprise me!
        </button>
      </section>
      <Footer />
    </div>);
}
