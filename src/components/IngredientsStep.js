import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import IngredientsCheck from './IngredientsCheck';

export default function IngredientsStep({ item }) {
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
/* eslint-disable */
  useEffect(() => {
    const result = separeIngredientsAndMeasures(item);
    setInprogress(result);
  }, []);
  /* eslint-enable */

  return (
    <div>
      {inProgress.ingredients
        .map((i, ind) => (
          <div key={ ind }>
            <IngredientsCheck
              index={ ind }
              ingredient={ i }
              measure={ inProgress.measures[ind] }
            />
          </div>))}
    </div>
  );
}

IngredientsStep.propTypes = {
  item: PropTypes.any,
}.isRequired;
