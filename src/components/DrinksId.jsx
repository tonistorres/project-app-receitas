import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { searchDrinkById } from '../services/fetch';
import CarrouselDrinks from './CarrouselDrinks';

export default function DrinksId() {
  // pegar params da url https://backefront.com.br/como-usar-useparams-react/
  const { id } = useParams();
  const [drinkInProgress, setDrinkInProgress] = useState([]);
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

  const requestDrinks = async () => {
    const result = await searchDrinkById(id);
    const answer = separeIngredientsAndMeasures(result[0]);
    setDrinkInProgress(result);
    setInprogress(answer);
  };

/* eslint-disable */
  useEffect(() => {
    requestDrinks();
  }, []);
  /* eslint-enable */

  // tag de video = https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/embed
  return (
    <div>
      {drinkInProgress.map((i, index) => (
        <div key={ index }>
          <img src={ i.strDrinkThumb } alt={ i.strDrink } data-testid="recipe-photo" />
          <h1 data-testid="recipe-title">{i.strDrink}</h1>
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
          {i.strVideo && (
            <embed data-testid="video" src={ convertUrl(i.strVideo) } type="video" />)}
          <CarrouselDrinks />
          <button data-testid="start-recipe-btn" type="button">start</button>
        </div>
      ))}
    </div>);
}
