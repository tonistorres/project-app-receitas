import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { searchFoodById } from '../services/fetch';
import CarrouselFoods from './CarrouselFoods';
import FavoriteBtn from './FavoriteBtn';
import ShareBtn from './ShareBtn';

export default function FoodsId() {
  const { id } = useParams();
  const history = useHistory();
  const [foodsInProgress, setFoodsInProgress] = useState([]);
  const [done, setDone] = useState(false);
  const [inProgress, setInprogress] = useState({
    ingredients: [],
    measures: [],
  });

  const separeIngredientsAndMeasures = (obj) => {
    const arrKeysIngredients = Object
      .keys(obj).filter((key) => key.includes('strIngredient'));
    const arrKeysMeasures = Object
      .keys(obj).filter((key) => key.includes('strMeasure'));
    const newIngArr = [];
    const newIngMea = [];
    arrKeysIngredients.forEach((i) => {
      if (obj[i] !== null && obj[i] !== '') {
        newIngArr.push(obj[i]);
      }
    });
    arrKeysMeasures.forEach((i) => {
      if (obj[i] !== null && obj[i] !== '') {
        newIngMea.push(obj[i]);
      }
    });

    const result = {
      ingredients: newIngArr,
      measures: newIngMea,
    };
    return result;
  };
  const convertUrl = (url) => {
    const index = url.indexOf('=');
    const result = url.substr(index + 1);
    return `https://www.youtube.com/embed/${result}`;
  };

  const requestFoods = async () => {
    const result = await searchFoodById(id);
    const answer = separeIngredientsAndMeasures(result[0]);
    setFoodsInProgress(result);
    setInprogress(answer);
  };

  const verifyDoneRecipe = () => {
    const doneRec = JSON.parse(localStorage.getItem('doneRecipes'));
    const findItem = doneRec && doneRec.find((i) => i.id === id);
    if (findItem) {
      setDone(true);
    } else {
      setDone(false);
    }
  };

/* eslint-disable */
  useEffect(() => {
    requestFoods();
    verifyDoneRecipe()
  }, []);
  /* eslint-enable */

  return (
    <div>
      {foodsInProgress.map((i, index) => (
        <div key={ index }>
          <img src={ i.strMealThumb } alt={ i.strMeal } data-testid="recipe-photo" />
          <h1 data-testid="recipe-title">{i.strMeal}</h1>
          <p data-testid="recipe-category">{i.strCategory}</p>
          <ShareBtn />
          <FavoriteBtn item={ i } local="foods" />
          {inProgress.ingredients
            .map((item, ind) => (
              <p
                key={ ind }
                data-testid={ `${ind}-ingredient-name-and-measure` }
              >
                {`${inProgress.measures[ind]} - ${item}`}
              </p>))}
          <p data-testid="instructions">{i.strInstructions}</p>
          {i.strYoutube && (
            <embed data-testid="video" src={ convertUrl(i.strYoutube) } />)}
          <CarrouselFoods />
          {!done && (
            <button
              data-testid="start-recipe-btn"
              onClick={ () => history.push(`/foods/${id}/in-progress`) }
              type="button"
            >
              Start Recipe
            </button>)}
        </div>
      ))}
    </div>
  );
}
