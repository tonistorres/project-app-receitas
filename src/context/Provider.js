import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { getDrinksCategory, getMealsCategory } from '../services/fetch';
import context from './context';

export default function Provider({ children }) {
  const [foodCategory, setFoodCategory] = useState([]);
  const [drinkCategory, setDrinkCategory] = useState([]);
  const [searchByFilter, setSearchByFilter] = useState([]);

  async function setCategories() {
    const drinks = await getDrinksCategory();
    const foods = await getMealsCategory();
    setFoodCategory(foods);
    setDrinkCategory(drinks);
  }

  useEffect(() => {
    setCategories();
  }, []);

  const value = {
    foodCategory,
    drinkCategory,
    searchByFilter,
    setSearchByFilter,

  };

  return (
    <context.Provider value={ value }>
      {children}
    </context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.any,
}.isRequired;
