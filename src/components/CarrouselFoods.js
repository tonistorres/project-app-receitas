import React, { useEffect, useState } from 'react';
import './CarrouselFoods.css';

export default function CarrouselFoods() {
  const [carrousel, setCarrousel] = useState([]);
  const fetchCarrousel = async () => {
    const result = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
      .then((r) => r.json()).then((d) => d.meals);
    const newArr = [];
    result.forEach((i, index) => {
      const NO_MAGIC_NUMBER = 6;
      if (index < NO_MAGIC_NUMBER) {
        newArr.push(i);
      }
    });
    setCarrousel(newArr);
  };

  useEffect(() => {
    fetchCarrousel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="scrollCarrousel">
      {carrousel.filter((_item, ind) => ind < 2).map((i, index) => (
        <div data-testid={ `${index}-recomendation-card` } key={ index }>
          <p>{i.strMeal}</p>
          <img className="imgCarrousel" src={ i.strMealThumb } alt={ i.strMeal } />
        </div>))}
    </div>
  );
}
