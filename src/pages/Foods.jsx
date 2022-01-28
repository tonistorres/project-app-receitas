import React, { useContext } from 'react';
import FoodCard from '../components/FoodCard';
import Footer from '../components/Footer';
import Header from '../components/Header';
import context from '../context/context';

export default function Foods() {
  const { searchByFilter } = useContext(context);
  const alerta = 'Sorry, we haven\'t found any recipes for these filters.';
  if (searchByFilter === null) {
    global.alert(alerta);
  }
  return (
    <div>
      <Header />
      {(searchByFilter !== null && searchByFilter.length !== 1) && searchByFilter
        .map((food, index) => (
          <FoodCard
            key={ index }
            index={ index }
            food={ food }
          />))}
      <Footer />
    </div>
  );
}
