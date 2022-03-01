import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import IngredientsCheckDrinks from './IngredientsCheckDrinks';
import IngredientsCheckFoods from './IngredientsCheckFoods';
import './IngredientsStep.css';

export default function IngredientsStep({ item, index }) {
  const [inProgress, setInprogress] = useState({
    ingredients: [],
    measures: [],
  });
  const history = useHistory();

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

  useEffect(() => {
    const result = separeIngredientsAndMeasures(item);
    setInprogress(result);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { location: { pathname } } = history;

  return (
    <div className="container-main-ingredient-step">
      <h3 id="label-scratch">Scratch Ingredients</h3>
      {inProgress.ingredients
        .map((i, ind) => (
          <div key={ ind }>
            {pathname.includes('drinks') ? (
              <IngredientsCheckDrinks
                index={ index }
                ingredient={ i }
                measure={ inProgress.measures[ind] }
              />
            ) : (
              <IngredientsCheckFoods
                index={ index }
                ingredient={ i }
                measure={ inProgress.measures[ind] }
              />)}
          </div>))}
    </div>
  );
}

IngredientsStep.propTypes = {
  item: PropTypes.any,
}.isRequired;
