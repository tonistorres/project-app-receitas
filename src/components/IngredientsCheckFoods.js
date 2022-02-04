import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

export default function IngredientsCheckFoods({ ingredient, measure, index }) {
  const [stateClass, setStateClass] = useState('');
  const { id } = useParams();

  const addLocalStorage = () => { // meals ou cocktails
    const getLocalStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const getArrLocal = getLocalStorage.meals[id].concat(ingredient);
    getLocalStorage.meals[id] = getArrLocal;
    localStorage.setItem('inProgressRecipes', JSON.stringify(getLocalStorage));
  };

  const removeLocalStorage = () => {
    const getLocalStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const getArrLocal = getLocalStorage.meals[id].filter((i) => i !== ingredient);
    getLocalStorage.meals[id] = getArrLocal;
    localStorage.setItem('inProgressRecipes', JSON.stringify(getLocalStorage));
  };

  const handleChange = () => {
    if (stateClass === 'inProgress') {
      removeLocalStorage();
      setStateClass('');
    } else {
      setStateClass('inProgress');
      addLocalStorage();
    }
  };

  const verifyUseEffect = () => {
    const getLocalStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (getLocalStorage.meals && !getLocalStorage.meals[id]) {
      getLocalStorage.meals[id] = [];
      localStorage.setItem('inProgressRecipes', JSON.stringify(getLocalStorage));
    }
  };

  const verifyLocal = () => {
    const getLocalStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (getLocalStorage.meals[id].includes(ingredient)) {
      setStateClass('inProgress');
    }
  };

  useEffect(() => {
    const getLocalStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (getLocalStorage) {
      verifyUseEffect();
      verifyLocal();
    } else {
      const obj = { cocktails: {}, meals: { [id]: [] } };
      localStorage
        .setItem('inProgressRecipes', JSON.stringify(obj));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <label htmlFor="check" data-testid={ `data-testid=${index}-ingredient-step` }>
        <span
          style={ stateClass === '' ? {} : { textDecorationLine: 'line-through' } }
        >
          {`${measure} - ${ingredient}`}
        </span>
        <input
          type="checkbox"
          checked={ stateClass !== '' }
          id="check"
          onChange={ () => handleChange() }
        />
      </label>
    </div>);
}

IngredientsCheckFoods.propTypes = {
  index: PropTypes.any,
  ingredient: PropTypes.any,
  measure: PropTypes.any,
}.isRequired;
