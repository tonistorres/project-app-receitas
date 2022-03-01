import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import CarrouselFoods from './CarrouselFoods';
import FavoriteBtn from './FavoriteBtn';
import IngredientsAndMeasures from './IngredientsAndMeasures';
import ShareBtn from './ShareBtn';
import './FoodsId.css';
import Footer from './Footer';

export default function FoodsId() {
  const { id } = useParams();
  const history = useHistory();
  const [foodsInProgress, setFoodsInProgress] = useState([]);
  const [done, setDone] = useState(false);
  const [init, setInit] = useState(false);

  const convertUrl = (url) => {
    const index = url.indexOf('=');
    const result = url.substr(index + 1);
    return `https://www.youtube.com/embed/${result}`;
  };
  const fetchAleatorioParaCypress = async () => {
    const teste = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
      .then((r) => r.json()).then((d) => d);
    return teste;
  };
  const requestFoods = async () => {
    const result = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((r) => r.json())
      .then((data) => data.meals);
    setFoodsInProgress(result);
    fetchAleatorioParaCypress();
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
    const findInitItem = getInit && Object.keys(getInit.meals).find((i) => i === id);
    if (findInitItem) {
      setInit(true);
    } else {
      setInit(false);
    }
  };

  useEffect(() => {
    requestFoods();
    verifyDoneRecipe();
    verifyInit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container-main-foods-id">

      {foodsInProgress.map((i, index) => (

        <div key={ index } className="container-conteudo-foods-id">
          <img
            src={ i.strMealThumb }
            alt={ i.strMeal }
            data-testid="recipe-photo"
            id="img-cardapio"
          />

          <div className="container-barra-foods-id">

            <h1
              data-testid="recipe-title"
            >
              {i.strMeal}
            </h1>

            <div className="container-barra-interna-foods-id">

              <ShareBtn />

              <FavoriteBtn
                item={ i }
                local="foods"
              />

            </div>
          </div>

          <p data-testid="recipe-category" id="categoria-receitas">{i.strCategory}</p>
          <div className="scroll-body-id-foods">

            <IngredientsAndMeasures
              item={ i }
            />
            <div className="scroll-container-instructions">
              <h1>Instructions:</h1>
              <p data-testid="instructions">{i.strInstructions}</p>
            </div>
            <h1 id="video-instruction-h1">Vídeo Instruction:</h1>
            {i.strYoutube && (
              <embed
                data-testid="video"
                src={ convertUrl(i.strYoutube) }
                id="youtbe-video"
              />)}

            <CarrouselFoods />

            {!done && (
              <button
                data-testid="start-recipe-btn"
                onClick={ () => history.push(`/foods/${id}/in-progress`) }
                style={ { color: '#333' } }
                type="button"
                id="btn-start-recipe"
              >

                {!init ? 'Start Recipe' : 'Continue Recipe' }

              </button>)}

          </div>
        </div>
      ))}

      <Footer />
    </div>
  );
}
