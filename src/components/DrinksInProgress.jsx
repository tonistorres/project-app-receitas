import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { searchDrinkById } from '../services/fetch';
import FavoriteBtn from './FavoriteBtn';
import IngredientsStep from './IngredientsStep';
import ShareBtn from './ShareBtn';

export default function DrinksInProgress() {
  const [currentDrink, setCurrentDrink] = useState([]);
  const { id } = useParams();

  const fetchDrink = async () => {
    const result = await searchDrinkById(id);
    setCurrentDrink(result);
  };

  const saveLocalStorage = (i) => {
    const getLocal = JSON.parse(localStorage.getItem('doneRecipes'));
    const obj = {
      id: i.idDrink,
      type: 'drinks',
      nationality: '',
      category: i.strCategory,
      alcoholicOrNot: i.strAlcoholic,
      name: i.strDrink,
      image: i.strDrinkThumb,
      doneDate: Date.now(),
      tags: i.strTags ? i.strTags : [],
    };
    const newArr = [...getLocal, obj];
    localStorage.setItem('doneRecipes', JSON.stringify(newArr));
  };

  useEffect(() => {
    const getLocal = JSON.parse(localStorage.getItem('doneRecipes'));
    if (!getLocal) {
      localStorage.setItem('doneRecipes', JSON.stringify([]));
    }
    fetchDrink();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {currentDrink.map((i, index) => (
        <div key={ index }>
          <img
            data-testid="recipe-photo"
            style={ { width: 50 } }
            src={ i.strDrinkThumb }
            alt={ i.strDrink }
          />
          <p data-testid="recipe-title">{i.strDrink}</p>
          <ShareBtn />
          <FavoriteBtn item={ i } local="drinks" />
          <p data-testid="recipe-category">{i.strAlcoholic}</p>
          <p data-testid="instructions">{i.strInstructions}</p>
          <button
            data-testid="finish-recipe-btn"
            onClick={ () => saveLocalStorage(i) }
            type="button"
          >
            Finish
          </button>
          <IngredientsStep item={ i } />
        </div>
      ))}
    </div>
  );
}
