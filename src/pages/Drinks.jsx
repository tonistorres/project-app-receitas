import React, { useContext } from 'react';
import DrinkCard from '../components/DrinkCard';
import Header from '../components/Header';
import context from '../context/context';

export default function Drinks() {
  const { searchByFilter } = useContext(context);
  const alerta = 'Sorry, we haven\'t found any recipes for these filters.';
  return (
    <div>
      <Header />
      {searchByFilter !== null ? searchByFilter
        .map((drink, index) => (
          <DrinkCard
            key={ index }
            index={ index }
            drink={ drink }
          />)) : global.alert(alerta)}
    </div>
  );
}
