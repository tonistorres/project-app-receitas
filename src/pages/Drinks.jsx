import React, { useContext } from 'react';
import CategoryBtn from '../components/CategoryBtn';
import DrinkCard from '../components/DrinkCard';
import Footer from '../components/Footer';
import Header from '../components/Header';
import context from '../context/context';

export default function Drinks() {
  const { searchByFilter, drinkCategory } = useContext(context);
  const alerta = 'Sorry, we haven\'t found any recipes for these filters.';
  return (
    <div>
      <Header />
      {drinkCategory
        .map((i, index) => <CategoryBtn category={ i } index={ index } key={ index } />)}
      {searchByFilter !== null ? searchByFilter
        .map((drink, index) => (
          <DrinkCard
            key={ index }
            index={ index }
            drink={ drink }
          />)) : global.alert(alerta)}
      <Footer />
    </div>
  );
}
