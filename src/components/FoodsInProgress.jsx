import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { searchFoodById } from '../services/fetch';
import FavoriteBtn from './FavoriteBtn';
import IngredientsStep from './IngredientsStep';
import ShareBtn from './ShareBtn';

export default function FoodsInProgress() {
  const [currentFood, setCurrentFood] = useState([]);
  const history = useHistory();
  const { id } = useParams();

  const fetchFood = async () => {
    const result = await searchFoodById(id);
    setCurrentFood(result);
  };
  const saveLocalStorage = (i) => {
    const getLocal = JSON.parse(localStorage.getItem('doneRecipes'));
    const obj = {
      id: i.idMeal,
      type: 'foods',
      nationality: i.strArea,
      category: i.strCategory,
      alcoholicOrNot: '',
      name: i.strMeal,
      image: i.strMealThumb,
      doneDate: Date.now(),
      tags: i.strTags ? [i.strTags] : [],
    };
    const newArr = [...getLocal, obj];
    localStorage.setItem('doneRecipes', JSON.stringify(newArr));
    history.push('/done-recipes');
  };

  useEffect(() => {
    const getLocal = JSON.parse(localStorage.getItem('doneRecipes'));
    if (!getLocal) {
      localStorage.setItem('doneRecipes', JSON.stringify([]));
    }
    fetchFood();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {currentFood && currentFood.map((i, index) => (
        <div key={ index }>
          <img
            data-testid="recipe-photo"
            style={ { width: 50 } }
            src={ i.strMealThumb }
            alt={ i.strMeal }
          />
          <p data-testid="recipe-title">{i.strMeal}</p>
          <ShareBtn />
          <FavoriteBtn item={ i } local="foods" />
          <p data-testid="recipe-category">{i.strCategory}</p>
          <p data-testid="instructions">{i.strInstructions}</p>
          <button
            data-testid="finish-recipe-btn"
            onClick={ () => saveLocalStorage(i) }
            type="button"
          >
            Finish
          </button>
          <IngredientsStep item={ i } index={ index } />
        </div>
      ))}
    </div>
  );
}
