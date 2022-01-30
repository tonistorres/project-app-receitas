import React, { useEffect, useState } from 'react';
import { nameSearch } from '../services/fetch';
import './Carrousel.css';

export default function CarrouselDrinks() {
  const [carrousel, setCarrousel] = useState([]);

  const fetchCarrousel = async () => {
    const result = await nameSearch('', '/drinks');
    const newArr = [];
    result.forEach((i, index) => {
      const NO_MAGIC_NUMBER = 6;
      if (index < NO_MAGIC_NUMBER) {
        newArr.push(i);
      }
      setCarrousel(newArr);
    });
  };

  useEffect(() => {
    fetchCarrousel();
  }, []);

  return (
    <div className="scrollCarrousel">
      {carrousel.map((i, index) => (
        <div data-testid={ `${index}-recomendation-card` } key={ index }>
          <p>{i.strDrink}</p>
          <img className="imgCarrousel" src={ i.strDrinkThumb } alt={ i.strDrink } />
        </div>))}
    </div>
  );
}
