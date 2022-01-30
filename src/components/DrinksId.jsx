import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { searchDrinkById } from '../services/fetch';
import CarrouselDrinks from './CarrouselDrinks';
import FavoriteBtn from './FavoriteBtn';
import IngredientsAndMeasures from './IngredientsAndMeasures';
import ShareBtn from './ShareBtn';

export default function DrinksId() {
  // pegar params da url https://backefront.com.br/como-usar-useparams-react/
  const { id } = useParams();
  const history = useHistory();
  const [drinkInProgress, setDrinkInProgress] = useState([]);
  const [done, setDone] = useState(false);
  const [init, setInit] = useState(false);

  const convertUrl = (url) => {
    const index = url.indexOf('=');
    const result = url.substr(index + 1);
    return `https://www.youtube.com/embed/${result}`;
  };

  const requestDrinks = async () => {
    const result = await searchDrinkById(id);
    setDrinkInProgress(result);
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
  const verifyInit = () => {
    const getInit = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const findInitItem = getInit && Object.keys(getInit.cocktails).find((i) => i === id);
    if (findInitItem) {
      setInit(true);
    } else {
      setInit(false);
    }
  };

  useEffect(() => {
    requestDrinks();
    verifyDoneRecipe();
    verifyInit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // tag de video = https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/embed
  return (
    <div>
      {drinkInProgress.map((i, index) => (
        <div key={ index }>
          <img src={ i.strDrinkThumb } alt={ i.strDrink } data-testid="recipe-photo" />
          <h1 data-testid="recipe-title">{i.strDrink}</h1>
          <p data-testid="recipe-category">{i.strAlcoholic}</p>
          <ShareBtn />
          <FavoriteBtn item={ i } local="drinks" />
          <IngredientsAndMeasures item={ i } />
          <p data-testid="instructions">{i.strInstructions}</p>
          {i.strVideo && (
            <embed data-testid="video" src={ convertUrl(i.strVideo) } type="video" />)}
          <CarrouselDrinks />
          {!done && (
            <button
              data-testid="start-recipe-btn"
              type="button"
              onClick={ () => history.push(`/drinks/${id}/in-progress`) }
            >
              {!init ? 'Start Recipe' : 'Continue Recipe' }
            </button>)}
        </div>
      ))}
    </div>);
}
