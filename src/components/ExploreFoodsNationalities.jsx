import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';

export default function ExploreFoodsNationalities() {
  const [dropsDown, setDropDown] = useState([]);
  const [meals, setMeals] = useState([]);
  const getNacionalities = async () => {
    const result = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
      .then((r) => r.json()).then((d) => d.meals);
    const newObj = [...result, { strArea: 'All' }];
    setDropDown(newObj);
    const getMeals = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${result[0].strArea}`)
      .then((r) => r.json()).then((d) => d.meals);
    setMeals(getMeals);
  };

  const handleChange = async ({ target }) => {
    const { value } = target;
    if (value === 'All') {
      const result = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
        .then((r) => r.json()).then((d) => d.meals);
      const NO_MAGIC_NUMBER = 12;
      const newArr = result.filter((_i, index) => index < NO_MAGIC_NUMBER);
      setMeals(newArr);
    } else {
      const result = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${value}`)
        .then((r) => r.json()).then((d) => d.meals);
      setMeals(result);
    }
  };

  useEffect(() => {
    getNacionalities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1 data-testid="page-title">Explore Nationalities</h1>
      <Header />
      <select
        data-testid="explore-by-nationality-dropdown"
        onChange={ (e) => handleChange(e) }
      >
        {dropsDown.map((i, index) => (
          <option
            key={ index }
            data-testid={ `${i.strArea}-option` }
          >
            {i.strArea}
          </option>))}
      </select>
      {meals.map((i, index) => (
        <Link to={ `/foods/${i.idMeal}` } key={ index }>
          <div data-testid={ `${index}-recipe-card` }>
            <p data-testid={ `${index}-card-name` }>{ i.strMeal }</p>
            <img
              data-testid={ `${index}-card-img` }
              src={ i.strMealThumb }
              alt={ i.strMeal }
            />
          </div>
        </Link>
      ))}
      <Footer />
    </div>);
}
