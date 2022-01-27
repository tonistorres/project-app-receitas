import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import context from './context';
import { getMealsCategory, getDrinksCategory } from '../services/fetch';

export default function Provider({ children }) {
  const [foodCategory, setFoodCategory] = useState([]);
  const [drinkCategory, setDrinkCategory] = useState([]);

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
