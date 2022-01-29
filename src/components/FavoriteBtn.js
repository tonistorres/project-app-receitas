import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

const createNewObj = (local, item, id) => {
  if (local === 'foods') {
    return {
      id,
      type: 'meals',
      nationality: item.strArea ? item.strArea : '',
      category: item.strCategory ? item.strCategory : '',
      alcoholicOrNot: item.strAlcoholic ? item.strAlcoholic : '',
      name: item.strMeal,
      image: item.strMealThumb,
    };
  }
  return {
    id,
    type: 'drinks',
    nationality: item.strArea ? item.strArea : '',
    category: item.strCategory,
    alcoholicOrNot: item.strAlcoholic ? item.strAlcoholic : '',
    name: item.strDrink,
    image: item.strDrinkThumb,
  };
};

export default function FavoriteBtn({ item, local }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const { id } = useParams();
  const verifyFavorite = () => {
    const favRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const findFav = favRecipes && favRecipes.find((i) => i.id === id);
    if (findFav) {
      setIsFavorite(true);
    }
  };

  const handleClick = () => {
    const favRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const findFav = favRecipes.find((i) => i.id === id);
    if (findFav) {
      const newArr = favRecipes.filter((i) => i.id !== id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newArr));
      setIsFavorite(false);
    } else {
      const newObj = createNewObj(local, item, id);
      const newArr = favRecipes && [...favRecipes, newObj];
      localStorage.setItem('favoriteRecipes', JSON.stringify(newArr));
      setIsFavorite(true);
    }
  };

  /* eslint-disable */
  useEffect(() => {
    const favRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if(!favRecipes) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }
    verifyFavorite();
    
  }, []);
    /* eslint-enable */

  return (
    <div>
      <button data-testid="favorite-btn" type="button" onClick={ () => handleClick() }>
        <img src={ isFavorite ? blackHeartIcon : whiteHeartIcon } alt="favorite Btn" />
      </button>
    </div>
  );
}

FavoriteBtn.propTypes = {
  item: PropTypes.any,
  local: PropTypes.string,
}.isRequired;
