import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { searchDrinkById } from '../services/fetch';
import FavoriteBtn from './FavoriteBtn';
import ShareBtn from './ShareBtn';

export default function DrinksInProgress() {
  const [currentDrink, setCurrentDrink] = useState([]);
  const { id } = useParams();

  const fetchDrink = async () => {
    const result = await searchDrinkById(id);
    setCurrentDrink(result);
  };
  return (
    <div>
      {currentDrink.map((i, index) => (
        <div key={ index }>
          <img data-testid="recipe-photo" src={ i.strDrinkThumb } alt={ i.strDrink } />
          <p data-testid="recipe-title">{i.strDrink}</p>
          <ShareBtn />
          <FavoriteBtn item={ i } local="drinks" />
          <p data-testid="recipe-category">{i.strAlcoholic}</p>

        </div>
      ))}
    </div>
  );
}
