import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { searchFoodById } from '../services/fetch';
import CarrouselFoods from './CarrouselFoods';

export default function FoodsId() {
  const { id } = useParams();
  const [foodsInProgress, setFoodsInProgress] = useState([]);
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

/* eslint-disable */
  useEffect(() => {
    requestFoods();
  }, []);
  /* eslint-enable */

  return (
    <div>
      {foodsInProgress.map((i, index) => (
        <div key={ index }>
          <img src={ i.strMealThumb } alt={ i.strMeal } data-testid="recipe-photo" />
          <h1 data-testid="recipe-title">{i.strMeal}</h1>
          <p data-testid="recipe-category">{i.strCategory}</p>
          <button data-testid="share-btn" type="button">Share</button>
          <button data-testid="favorite-btn" type="button">Favoritar</button>
          {inProgress.ingredients
            .map((item, ind) => (
              <p
                key={ ind }
                data-testid={ `${ind}-ingredient-name-and-measure` }
              >
                {`${inProgress.measures[index]} - ${item}`}
              </p>))}
          <p data-testid="instructions">{i.strInstructions}</p>
          {i.strYoutube && (
            <embed data-testid="video" src={ convertUrl(i.strYoutube) } />)}
          <CarrouselFoods />
          <button data-testid="start-recipe-btn" type="button">start</button>
        </div>
      ))}
    </div>
  );
}
