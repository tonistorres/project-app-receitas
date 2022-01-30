import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

export default function IngredientsCheck({ ingredient, measure, index }) {
  const [stateClass, setStateClass] = useState('');
  // const { id } = useParams();
  const history = useHistory();
  const { location: { pathname } } = history;
  console.log(pathname.includes('drink'));

  // const addLocalStorage = (cocktails) => {
  //   const getLocalStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
  //   const arrId = getLocalStorage[cocktails][id];
  //   if (arrId[0]) {
  //     const newArr = [...arrId, `${measure} - ${ingredient}`];
  //     const newObj = {
  //       ...getLocalStorage,
  //       [cocktails]: { ...getLocalStorage[cocktails], [id]: newArr },
  //     };
  //     JSON.setItem('inProgressRecipes', JSON.stringify(newObj));
  //   } else {
  //     const newArr = [`${measure} - ${ingredient}`];
  //     const newObj = {
  //       ...getLocalStorage,
  //       [cocktails]: { ...getLocalStorage[cocktails], [id]: newArr },
  //     };
  //     JSON.setItem('inProgressRecipes', JSON.stringify(newObj));
  //   }
  // };

  // const removeLocalStorage = (cocktails) => {
  //   const getLocalStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
  //   const arrId = getLocalStorage[cocktails][id];
  //   if (arrId[0]) {
  //     const newArr = getLocalStorage.filter((i) => i !== `${measure} - ${ingredient}`);
  //     const newObj = {
  //       ...getLocalStorage,
  //       [cocktails]: { ...getLocalStorage[cocktails], [id]: newArr },
  //     };
  //     JSON.setItem('inProgressRecipes', JSON.stringify(newObj));
  //   }
  // };

  const handleChange = () => {
    if (stateClass === 'complete') {
      setStateClass('');
    } else {
      setStateClass('complete');
    }
  };

  useEffect(() => {
    const getLocalStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (!getLocalStorage) {
      localStorage
        .setItem('inProgressRecipes', JSON.stringify({ cocktails: {}, meals: {} }));
    }
  }, []);

  return (
    <div>
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
