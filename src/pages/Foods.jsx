import React, { useContext } from 'react';
import FoodCard from '../components/FoodCard';
import Header from '../components/Header';
import context from '../context/context';

export default function Foods() {
  const { searchByFilter } = useContext(context);
  const alerta = 'Sorry, we haven\'t found any recipes for these filters.';
  return (
    <div>
      <Header />
      {searchByFilter !== null ? searchByFilter
        .map((food, index) => (
          <FoodCard
            key={ index }
            index={ index }
            food={ food }
          />)) : global.alert(alerta)}
    </div>
  );
}
