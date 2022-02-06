import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import './IngredientsAndMessaures.css';

export default function IngredientsAndMeasures({ item }) {
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

  useEffect(() => {
    const result = separeIngredientsAndMeasures(item);
    setInprogress(result);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container-main-ingredients">
      <h1>Ingredients</h1>
      {inProgress.ingredients
        .map((i, ind) => (
          <p
            key={ ind }
            data-testid={ `${ind}-ingredient-name-and-measure` }
          >
            {`${inProgress.measures[ind]} - ${i}`}
          </p>))}
    </div>
  );
}

IngredientsAndMeasures.propTypes = {
  item: PropTypes.any,
}.isRequired;
