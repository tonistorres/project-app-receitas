import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

export default function IngredientsCheck({ ingredient, measure, index }) {
  const [stateClass, setStateClass] = useState('');
  const { id } = useParams();
  const history = useHistory();
  const { location: { pathname } } = history;
  console.log(pathname.includes('drink'));

  const addLocalStorage = (cocktails) => { // meals ou cocktails
    const getLocalStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const getArrLocal = getLocalStorage[cocktails].concat(ingredient);
    const obj = {
      ...getLocalStorage,
      [cocktails]: { ...getLocalStorage[cocktails], [id]: getArrLocal },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(obj));
  };

  const removeLocalStorage = (cocktails) => {
    const getLocalStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const getArrLocal = getLocalStorage[cocktails].filter((i) => i !== ingredient);
    const obj = {
      ...getLocalStorage,
      [cocktails]: { ...getLocalStorage[cocktails], [id]: getArrLocal },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(obj));
  };

  const handleChange = () => {
    if (stateClass === 'inProgress') {
      const path = pathname.includes('drink') ? 'cocktails' : 'meals';
      removeLocalStorage(path);
      setStateClass('');
    } else {
      setStateClass('inProgress');
      const path = pathname.includes('drink') ? 'cocktails' : 'meals';
      addLocalStorage(path);
    }
  };

  useEffect(() => {
    const getLocalStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    let obj = { cocktails: {}, meals: {} };
    if (pathname.includes('drink')) {
      obj = { cocktails: { [id]: [] }, meals: {} };
    } else {
      obj = { cocktails: {}, meals: { [id]: [] } };
    }
    if (!getLocalStorage) {
      localStorage
        .setItem('inProgressRecipes', JSON.stringify(obj));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={ stateClass === '' ? {} : { textDecorationLine: 'line-through' } }>
      <p
        data-testid={ `data-testid=${index}-ingredient-step` }
      >
        {`${measure} - ${ingredient}`}
      </p>
      <label htmlFor="check">
        <input type="checkbox" id="check" onChange={ () => handleChange() } />
      </label>
    </div>);
}

IngredientsCheck.propTypes = {
  index: PropTypes.any,
  ingredient: PropTypes.any,
  measure: PropTypes.any,
}.isRequired;
